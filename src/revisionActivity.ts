type Counts = {
  seconds: number;
  sessions: number;
  lastSession: number | null;
};

type Week = Counts & { subjects: Record<string, Counts> };

export interface YearClock {
  revisionSeconds: number;
  revisionSecondsBySubject: Record<string, number>;
  nextBreakAtSeconds: number;
  breakEndsAt: number | null;
  workSeconds: number;
  updatedAt: number;
  sessionStartedAt: number | null;
  lastActiveAt: number | null;
  weeks: Record<string, Week>;
}

interface EarlierClock {
  revisionSeconds: number;
  revisionSecondsBySubject: Record<string, number>;
}

export interface ActivityLedger {
  version: 1;
  years: Record<string, YearClock>;
  unassigned: EarlierClock;
}

export type SavedClock = Partial<EarlierClock> & {
  revisionActivity?: ActivityLedger;
  breakEndsAt?: number | null;
  selectedSection?: string;
};

export type ActivitySummary = { weekSessions: number; weekSeconds: number; lifetimeSeconds: number };
const halfHour = 30 * 60 * 1000;
const roundSeconds = (value: number) => Math.round(value * 1000) / 1000;
const nonnegative = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const seconds = (value: unknown) => nonnegative(value) ? Number(value) : 0;
const timestamp = (value: unknown) => nonnegative(value) ? Number(value) : null;

function readSubjectSeconds(value: Record<string, number> | undefined) {
  return Object.fromEntries(Object.entries(value ?? {}).map(([id, time]) => [id, seconds(time)]));
}

export function mondayStart(at: number) {
  const day = new Date(at);
  day.setHours(0, 0, 0, 0);
  day.setDate(day.getDate() - (day.getDay() + 6) % 7);
  return day.getTime();
}

export function nextMonday(at: number) {
  const date = new Date(mondayStart(at));
  date.setDate(date.getDate() + 7);
  return date.getTime();
}

function weekKey(monday: number) {
  const day = new Date(monday);
  return [day.getFullYear(), String(day.getMonth() + 1).padStart(2, '0'), String(day.getDate()).padStart(2, '0')].join('-');
}

export function selectYear(ledger: ActivityLedger, year: string, workSeconds: number): YearClock {
  const known = ledger.years[year];
  if (!known) return {
    revisionSeconds: 0, revisionSecondsBySubject: {}, nextBreakAtSeconds: workSeconds, breakEndsAt: null,
    workSeconds, updatedAt: 0, sessionStartedAt: null, lastActiveAt: null, weeks: {},
  };
  if (known.workSeconds === workSeconds) return known;
  return { ...known, workSeconds, nextBreakAtSeconds: known.revisionSeconds + workSeconds };
}

function readCounts(value: Partial<Counts> | null): Counts {
  return { seconds: seconds(value?.seconds), sessions: Math.floor(seconds(value?.sessions)), lastSession: timestamp(value?.lastSession) };
}

function readYear(value: YearClock, fallbackWorkSeconds: number): YearClock {
  const revisionSeconds = seconds(value.revisionSeconds);
  const workSeconds = seconds(value.workSeconds) || fallbackWorkSeconds;
  const breakEndsAt = timestamp(value.breakEndsAt);
  const next = seconds(value.nextBreakAtSeconds);
  const weeks = Object.fromEntries(Object.entries(value.weeks ?? {})
    .filter(([key, week]) => /^\d{4}-\d{2}-\d{2}$/.test(key) && week && typeof week === 'object')
    .map(([key, week]) => [key, {
      ...readCounts(week),
      subjects: Object.fromEntries(Object.entries(week.subjects ?? {}).map(([id, counts]) => [id, readCounts(counts)])),
    }]));
  return {
    revisionSeconds, revisionSecondsBySubject: readSubjectSeconds(value.revisionSecondsBySubject),
    nextBreakAtSeconds: next > revisionSeconds || (breakEndsAt !== null && next === revisionSeconds) ? next : revisionSeconds + workSeconds,
    breakEndsAt, workSeconds, weeks, updatedAt: seconds(value.updatedAt),
    sessionStartedAt: timestamp(value.sessionStartedAt), lastActiveAt: timestamp(value.lastActiveAt),
  };
}

export function restoreActivity(saved: SavedClock | null, year: string, workSeconds: number): ActivityLedger {
  const stored = saved?.revisionActivity;
  const legacy = stored?.version === 1 ? stored.unassigned : saved;
  const ledger: ActivityLedger = {
    version: 1, years: {},
    unassigned: { revisionSeconds: seconds(legacy?.revisionSeconds), revisionSecondsBySubject: readSubjectSeconds(legacy?.revisionSecondsBySubject) },
  };
  if (stored?.version === 1) {
    ledger.years = Object.fromEntries(Object.entries(stored.years ?? {})
      .filter(([, value]) => value && typeof value === 'object')
      .map(([key, value]) => [key, readYear(value, workSeconds)]));
  } else if (timestamp(saved?.breakEndsAt) !== null) {
    // The former clock had one break for the device. Resume that break in its
    // last open year; the older time itself has no reliable year or dates.
    const lastYear = saved?.selectedSection || year;
    ledger.years[lastYear] = { ...selectYear(ledger, lastYear, workSeconds), breakEndsAt: timestamp(saved?.breakEndsAt) };
  }
  return ledger;
}

export function updateYear(ledger: ActivityLedger, year: string, clock: YearClock, now = Date.now()): ActivityLedger {
  const updated = { ...clock, updatedAt: Math.max(now, (ledger.years[year]?.updatedAt ?? 0) + 1) };
  return { ...ledger, years: { ...ledger.years, [year]: updated } };
}

export function mergeNewerYears(local: ActivityLedger, remote: ActivityLedger | null): ActivityLedger {
  if (!remote) return local;
  let years = local.years;
  for (const [year, record] of Object.entries(remote.years)) {
    if (record.updatedAt > (years[year]?.updatedAt ?? -1)) {
      if (years === local.years) years = { ...years };
      years[year] = record;
    }
  }
  return years === local.years ? local : { ...local, years };
}

function accumulate(previous: Counts | undefined, elapsed: number, session: number): Counts {
  return {
    seconds: roundSeconds((previous?.seconds ?? 0) + elapsed),
    sessions: (previous?.sessions ?? 0) + (previous?.lastSession === session ? 0 : 1),
    lastSession: session,
  };
}

export function addRevisionTime(ledger: ActivityLedger, year: string, subject: string, workSeconds: number, startAt: number, elapsedMs: number) {
  const record = selectYear(ledger, year, workSeconds);
  if (record.breakEndsAt !== null) return ledger;
  const creditedMs = Math.min(elapsedMs, Math.max(0, Math.round((record.nextBreakAtSeconds - record.revisionSeconds) * 1000)));
  if (creditedMs <= 0) return ledger;
  const endAt = startAt + creditedMs;
  const continues = record.lastActiveAt !== null && startAt >= record.lastActiveAt - 1000 && startAt - record.lastActiveAt < halfHour;
  const session = continues && record.sessionStartedAt !== null ? record.sessionStartedAt : startAt;
  const weeks = { ...record.weeks };
  // Split visible time at local Monday midnight, including weeks with a DST change.
  for (let cursor = startAt; cursor < endAt;) {
    const key = weekKey(mondayStart(cursor));
    const stop = Math.min(nextMonday(cursor), endAt);
    const duration = (stop - cursor) / 1000;
    const old = weeks[key];
    weeks[key] = {
      ...accumulate(old, duration, session),
      subjects: { ...old?.subjects, [subject]: accumulate(old?.subjects[subject], duration, session) },
    };
    cursor = stop;
  }
  const duration = creditedMs / 1000;
  const total = roundSeconds(record.revisionSeconds + duration);
  return updateYear(ledger, year, {
    ...record, weeks, sessionStartedAt: session, lastActiveAt: endAt, revisionSeconds: total,
    revisionSecondsBySubject: {
      ...record.revisionSecondsBySubject,
      [subject]: roundSeconds((record.revisionSecondsBySubject[subject] ?? 0) + duration),
    },
    breakEndsAt: total >= record.nextBreakAtSeconds ? 0 : null,
  }, startAt + elapsedMs);
}

export function activitySummary(clock: YearClock, monday: number, subject?: string): ActivitySummary {
  const week = clock.weeks[weekKey(monday)];
  const scope = subject ? week?.subjects[subject] : week;
  return {
    weekSessions: scope?.sessions ?? 0, weekSeconds: scope?.seconds ?? 0,
    lifetimeSeconds: subject ? clock.revisionSecondsBySubject[subject] ?? 0 : sumSubjects(clock),
  };
}

function sumSubjects(clock: EarlierClock) {
  return roundSeconds(Object.values(clock.revisionSecondsBySubject).reduce((sum, value) => sum + value, 0));
}

export function unassignedTime(ledger: ActivityLedger) {
  return Math.max(ledger.unassigned.revisionSeconds, sumSubjects(ledger.unassigned));
}
