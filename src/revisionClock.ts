import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  activitySummary, addRevisionTime, mergeNewerYears, mondayStart, nextMonday, restoreActivity,
  selectYear, unassignedTime, updateYear, type SavedClock, type YearClock,
} from './revisionActivity';

const revisionViews = new Set(['general', 'stages', 'topic', 'daily', 'superTest']);
export const isRevisionView = (view: string) => revisionViews.has(view);

function seconds(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export function timerMinutes(value: unknown, fallback: number, maximum: number) {
  return Math.min(maximum, Math.max(1, Math.round(seconds(value)) || fallback));
}

export function formatClock(value: number) {
  const whole = Math.floor(seconds(value));
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor(whole / 60) % 60;
  const remainder = String(whole % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${remainder}` : `${minutes}:${remainder}`;
}

function useCurrentWeek() {
  const [week, setWeek] = useState(() => mondayStart(Date.now()));
  useEffect(() => {
    let timer: number;
    function refresh() {
      window.clearTimeout(timer);
      const now = Date.now();
      setWeek(mondayStart(now));
      timer = window.setTimeout(refresh, nextMonday(now) - now);
    }
    refresh();
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refresh);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('pageshow', refresh);
    };
  }, []);
  return week;
}

export function useRevisionClock(saved: SavedClock | null, view: string, subject: string, workMinutes: number, year = saved?.selectedSection ?? 'Year 10 EOYs', saveEnabled = false) {
  const workSeconds = workMinutes * 60;
  const [ledger, setLedger] = useState(() => restoreActivity(saved, year, workSeconds));
  const yearClock = useMemo(() => selectYear(ledger, year, workSeconds), [ledger, year, workSeconds]);
  const week = useCurrentWeek();
  const activeSubject = isRevisionView(view) && yearClock.breakEndsAt === null ? subject : null;
  const clock = useMemo(() => ({
    revisionSeconds: yearClock.revisionSeconds,
    revisionSecondsBySubject: yearClock.revisionSecondsBySubject,
    nextBreakAtSeconds: yearClock.nextBreakAtSeconds,
    breakEndsAt: yearClock.breakEndsAt,
    revisionActivity: ledger,
  }), [ledger, yearClock]);

  useLayoutEffect(() => {
    if (!saveEnabled) return;
    function refreshFromOtherTab() {
      if (document.hidden) return;
      try {
        const latest = JSON.parse(localStorage.getItem('ironForgeProgressV1') || 'null');
        if (latest?.revisionActivity?.version !== 1) return;
        const remote = restoreActivity(latest, year, workSeconds);
        setLedger(previous => mergeNewerYears(previous, remote));
      } catch { /* Keep tracking this visit when storage is unavailable. */ }
    }
    document.addEventListener('visibilitychange', refreshFromOtherTab);
    window.addEventListener('focus', refreshFromOtherTab);
    window.addEventListener('pageshow', refreshFromOtherTab);
    return () => {
      document.removeEventListener('visibilitychange', refreshFromOtherTab);
      window.removeEventListener('focus', refreshFromOtherTab);
      window.removeEventListener('pageshow', refreshFromOtherTab);
    };
  }, [saveEnabled, year, workSeconds]);

  useLayoutEffect(() => {
    if (!activeSubject) return;
    const subjectId = activeSubject;
    let last: number | null = null;
    let tick: number | undefined;
    function settle() {
      if (last === null) return;
      const now = Math.round(performance.now());
      const elapsed = now - last;
      last = now;
      if (elapsed <= 0) return;
      const startAt = Date.now() - elapsed;
      setLedger(previous => addRevisionTime(previous, year, subjectId, workSeconds, startAt, elapsed));
    }
    function stop() {
      window.clearInterval(tick);
      settle();
      last = null;
    }
    function hide() {
      // Commit the last fraction of the visible session before the browser freezes the page.
      flushSync(stop);
    }
    function syncVisibility() {
      if (document.hidden) hide();
      else if (last === null) {
        last = Math.round(performance.now());
        tick = window.setInterval(settle, 1000);
      }
    }
    if (!document.hidden) syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    window.addEventListener('pagehide', hide);
    window.addEventListener('pageshow', syncVisibility);
    return () => {
      document.removeEventListener('visibilitychange', syncVisibility);
      window.removeEventListener('pagehide', hide);
      window.removeEventListener('pageshow', syncVisibility);
      stop();
    };
  }, [activeSubject, year, workSeconds]);

  function changeYearClock(update: (record: YearClock) => YearClock) {
    setLedger(previous => updateYear(previous, year, update(selectYear(previous, year, workSeconds))));
  }
  function restartWorkBlock(minutes = workMinutes) {
    changeYearClock(previous => ({ ...previous, workSeconds: minutes * 60, breakEndsAt: null, nextBreakAtSeconds: previous.revisionSeconds + minutes * 60 }));
  }
  function startBreak(minutes: number) {
    const end = Date.now() + minutes * 60000;
    changeYearClock(previous => ({ ...previous, breakEndsAt: end }));
  }
  function resetClock() {
    changeYearClock(previous => ({ ...previous, revisionSeconds: 0, nextBreakAtSeconds: workSeconds, breakEndsAt: null }));
  }
  return {
    clock, startBreak, restartWorkBlock, resetClock,
    yearActivity: activitySummary(yearClock, week),
    subjectActivity: activitySummary(yearClock, week, subject),
    legacySeconds: unassignedTime(ledger),
  };
}
