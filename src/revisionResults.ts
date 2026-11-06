export type RecallPoint = { at: number; percent: number; id?: string };
export type RecallHistory = Record<string, Record<string, RecallPoint[]>>;
type StageCount = { unlocked: number; total: number };

export function readRecallHistory(saved: unknown): RecallHistory {
  const history: RecallHistory = {};
  if (!saved || typeof saved !== 'object') return history;
  for (const [year, subjects] of Object.entries(saved)) {
    if (!['Year 10 EOYs', 'Year 11'].includes(year) || !subjects || typeof subjects !== 'object') continue;
    const bySubject: Record<string, RecallPoint[]> = {};
    for (const [id, points] of Object.entries(subjects)) {
      if (!/^[a-z][a-z-]*$/.test(id) || !Array.isArray(points)) continue;
      const valid = points.filter(p => p && Number.isFinite(p.at) && p.at > 0 && p.at <= 8.64e15 &&
        Number.isFinite(p.percent) && p.percent >= 0 && p.percent <= 100).sort((a, b) => a.at - b.at);
      if (valid.length) bySubject[id] = valid;
    }
    history[year] = bySubject;
  }
  return history;
}

/** Keep attempts from another tab when returning to an open revision page. */
export function mergeRecallHistory(current: RecallHistory, incoming: RecallHistory): RecallHistory {
  let result = current;
  const identity = (point: RecallPoint) => point.id ?? `${point.at}:${point.percent}`;
  for (const [year, entries] of Object.entries(incoming)) {
    for (const [subject, points] of Object.entries(entries)) {
      const existing = current[year]?.[subject] ?? [];
      const known = new Set(existing.map(identity));
      const additions = points.filter(point => !known.has(identity(point)));
      if (!additions.length) continue;
      if (result === current) result = { ...current };
      result[year] = { ...result[year], [subject]: [...existing, ...additions].sort((a, b) => a.at - b.at) };
    }
  }
  return result;
}

export function countStagesForYear(
  subjects: { id: string; topics: { id: string; section: string }[] }[],
  year: string,
  unlocked: Record<string, boolean>
) {
  const bySubject: Record<string, StageCount> = {};
  const overall: StageCount = { unlocked: 0, total: 0 };
  for (const subject of subjects) {
    const stages = subject.topics.filter(stage => stage.section === year);
    const count = stages.filter(stage => unlocked[stage.id]).length;
    bySubject[subject.id] = { unlocked: count, total: stages.length };
    overall.total += stages.length;
    overall.unlocked += count;
  }
  return { bySubject, overall };
}

export function stageCountLabel(count: StageCount) {
  return count.total ? `${count.unlocked}/${count.total} stages unlocked` : 'No stages yet';
}
