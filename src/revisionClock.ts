import { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';

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

interface ClockState {
  revisionSeconds: number;
  revisionSecondsBySubject: Record<string, number>;
  nextBreakAtSeconds: number;
  // null during revision, zero at the break prompt, or the break's end time in milliseconds.
  breakEndsAt: number | null;
}

function restoreClock(saved: Partial<ClockState> | null, workSeconds: number): ClockState {
  const total = seconds(saved?.revisionSeconds);
  const deadline = seconds(saved?.nextBreakAtSeconds);
  const end = saved?.breakEndsAt;
  const breakEndsAt = typeof end === 'number' && Number.isFinite(end) && end >= 0 ? end : null;
  return {
    revisionSeconds: total,
    revisionSecondsBySubject: Object.fromEntries(
      Object.entries(saved?.revisionSecondsBySubject ?? {}).map(([key, value]) => [key, seconds(value)])
    ),
    nextBreakAtSeconds: deadline > total || (breakEndsAt !== null && deadline === total)
      ? deadline : (Math.floor(total / workSeconds) + 1) * workSeconds,
    breakEndsAt,
  };
}

export function useRevisionClock(saved: Partial<ClockState> | null, view: string, subject: string, workMinutes: number) {
  const workSeconds = workMinutes * 60;
  const [clock, setClock] = useState(() => restoreClock(saved, workSeconds));
  const activeSubject = isRevisionView(view) && clock.breakEndsAt === null ? subject : null;

  useLayoutEffect(() => {
    if (!activeSubject) return;
    const subjectId = activeSubject;
    let last: number | null = null;
    let tick: number | undefined;
    function settle() {
      if (last === null) return;
      const now = Math.round(performance.now());
      const elapsed = (now - last) / 1000;
      last = now;
      if (elapsed <= 0) return;
      setClock(previous => {
        if (previous.breakEndsAt !== null) return previous;
        const total = Math.min(previous.nextBreakAtSeconds, Math.round((previous.revisionSeconds + elapsed) * 1000) / 1000);
        const subjectTime = (previous.revisionSecondsBySubject[subjectId] ?? 0) + (total - previous.revisionSeconds);
        return {
          ...previous,
          revisionSeconds: total,
          revisionSecondsBySubject: {
            ...previous.revisionSecondsBySubject,
            [subjectId]: Math.round(subjectTime * 1000) / 1000,
          },
          breakEndsAt: total >= previous.nextBreakAtSeconds ? 0 : null,
        };
      });
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
  }, [activeSubject]);

  function restartWorkBlock(minutes = workMinutes) {
    setClock(previous => ({ ...previous, breakEndsAt: null, nextBreakAtSeconds: previous.revisionSeconds + minutes * 60 }));
  }
  function startBreak(minutes: number) {
    const end = Date.now() + minutes * 60000;
    setClock(previous => ({ ...previous, breakEndsAt: end }));
  }
  function resetClock() {
    setClock(previous => ({ ...previous, revisionSeconds: 0, nextBreakAtSeconds: workSeconds, breakEndsAt: null }));
  }
  return { clock, startBreak, restartWorkBlock, resetClock };
}
