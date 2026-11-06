import { useEffect, useState } from 'react';
import { formatClock } from './revisionClock';

export default function BreakCountdown({ endsAt }: { endsAt: number }) {
  const remaining = () => Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
  const [left, setLeft] = useState(remaining);
  useEffect(() => {
    function refresh() {
      const value = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setLeft(value);
      if (value === 0) window.clearInterval(interval);
    }
    const interval = window.setInterval(refresh, 250);
    refresh();
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [endsAt]);
  return left
    ? <p className="mt-3 text-4xl font-black tabular-nums text-white" role="timer" aria-label="Break remaining">{formatClock(left)}</p>
    : <p className="mt-3 text-xl font-bold text-white" role="status">Break complete</p>;
}
