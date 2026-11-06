import { useId, useMemo, useState, type KeyboardEvent } from 'react';
import { CalendarDays, ChartNoAxesCombined, ChevronDown } from 'lucide-react';
import { formatRevisionDuration } from './revisionDuration';
import { mondayStart } from './revisionActivity';
import type { RecallPoint } from './revisionResults';
import './revisionStats.css';

type WeekProps = { year: string; sessions: number; seconds: number; lifetimeSeconds: number };
type SubjectStatsProps = {
  year: string; subject: string; weeklySessions: number; weeklySeconds: number; lifetimeSeconds: number;
  yearWeeklySessions: number; yearWeeklySeconds: number; yearLifetimeSeconds: number;
  recallHistory: readonly RecallPoint[];
  stageProgress: { unlocked: number; total: number };
};

const calendarDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const resultTime = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const hoursMinutes = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });

function weekRange(today: Date) {
  const monday = new Date(mondayStart(today.getTime()));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return calendarDate.formatRange(monday, sunday);
}

function Totals({ sessions, seconds, lifetimeSeconds, stageProgress }: Omit<WeekProps, 'year'> & { stageProgress?: SubjectStatsProps['stageProgress'] }) {
  return (
    <dl className="revision-totals">
      <div title="A new session starts after 30 minutes away from revision in this year."><dt>Sessions this week</dt><dd>{sessions.toLocaleString('en-GB')}</dd></div>
      <div><dt>Time this week</dt><dd>{formatRevisionDuration(seconds)}</dd></div>
      <div><dt>Lifetime revision time</dt><dd>{formatRevisionDuration(lifetimeSeconds)}</dd></div>
      {stageProgress && <div><dt>Stages unlocked</dt><dd>{stageProgress.unlocked} <span className="revision-total-divider">/</span> {stageProgress.total}</dd></div>}
    </dl>
  );
}

export function WeeklyRevisionSummary({ year, sessions, seconds, lifetimeSeconds }: WeekProps) {
  return (
    <section aria-label="Weekly revision activity" className="revision-week">
      <header>
        <CalendarDays className="revision-disclosure-icon" aria-hidden="true" />
        <div>
          <h2>Revision this week</h2>
          <p>All {year} subjects <span aria-hidden="true">·</span> {weekRange(new Date())}</p>
        </div>
      </header>
      <Totals sessions={sessions} seconds={seconds} lifetimeSeconds={lifetimeSeconds} />
    </section>
  );
}

function nearestResult(points: readonly RecallPoint[], at: number) {
  let lo = 0, hi = points.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (points[mid].at < at) lo = mid + 1;
    else hi = mid;
  }
  return lo > 0 && at - points[lo - 1].at < points[lo].at - at ? lo - 1 : lo;
}

function RecallChart({ history }: { history: readonly RecallPoint[] }) {
  const hintId = useId();
  const [chosen, setChosen] = useState<number | null>(null);
  const { points, positions, line } = useMemo(() => {
    const points = history.filter(point => Number.isFinite(point.at) && Math.abs(point.at) <= 8.64e15 && Number.isFinite(point.percent) && point.percent >= 0 && point.percent <= 100)
      .sort((a, b) => a.at - b.at);
    const span = points.length ? points[points.length - 1].at - points[0].at : 0;
    const positions = points.map((point, index) => {
      if (span) return (point.at - points[0].at) / span * 100;
      return points.length === 1 ? 50 : index / (points.length - 1) * 100;
    });
    const line = positions.map((x, index) => `${x.toFixed(3)},${100 - points[index].percent}`).join(' ');
    return { points, positions, line };
  }, [history]);
  const last = points.length - 1;
  const selected = Math.min(chosen ?? last, last);
  const point = points[selected];

  function stepThrough(event: KeyboardEvent<HTMLDivElement>) {
    const move: Record<string, number> = {
      ArrowLeft: selected - 1, ArrowRight: selected + 1, ArrowDown: selected - 1, ArrowUp: selected + 1,
      Home: 0, End: last,
    };
    if (!Object.hasOwn(move, event.key)) return;
    event.preventDefault();
    setChosen(Math.min(last, Math.max(0, move[event.key])));
  }

  const showTimes = point && new Date(points[0].at).toDateString() === new Date(points[last].at).toDateString();
  const axisDate = showTimes ? hoursMinutes : calendarDate;
  return (
    <figure className="revision-recall">
      <figcaption className="revision-recall-heading">
        <div><h3>Lifetime recall</h3><p>Percentage correct on each marked stage, Daily Test or Super Test.</p></div>
        {point && <div className="revision-recall-reading">
          <strong>{point.percent}%</strong>
          <time dateTime={new Date(point.at).toISOString()}>{resultTime.format(point.at)}</time>
        </div>}
      </figcaption>
      {!point ? <p className="revision-recall-empty">Mark your first test for this subject and year to start the graph.</p> : (
        <div className="revision-chart">
          <div aria-hidden="true" className="revision-chart-axis"><span>100%</span><span>50%</span><span>0%</span></div>
          <div className="revision-chart-track"
            role={last > 0 ? 'slider' : 'img'} tabIndex={last > 0 ? 0 : undefined}
            aria-label={last > 0 ? 'Explore lifetime recall results' : `First recorded recall: ${point.percent}% on ${resultTime.format(point.at)}`}
            aria-valuemin={last > 0 ? 1 : undefined} aria-valuemax={last > 0 ? points.length : undefined}
            aria-valuenow={last > 0 ? selected + 1 : undefined}
            aria-valuetext={last > 0 ? `${point.percent}% on ${resultTime.format(point.at)}` : undefined}
            aria-describedby={last > 0 ? hintId : undefined} onKeyDown={stepThrough}
            onPointerMove={event => {
              if (last < 1) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
              const span = points[last].at - points[0].at;
              setChosen(span ? nearestResult(points, points[0].at + ratio * span) : Math.round(ratio * last));
            }}
            onPointerLeave={() => setChosen(null)} onBlur={() => setChosen(null)}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {[0, 50, 100].map(y => <line key={y} className="revision-gridline" x1="0" x2="100" y1={y} y2={y} vectorEffect="non-scaling-stroke" />)}
              {last > 0 && <polyline points={line} fill="none" className="revision-line" vectorEffect="non-scaling-stroke" />}
            </svg>
            <span className="revision-chart-dot" aria-hidden="true" style={{ left: `${positions[selected]}%`, top: `${100 - point.percent}%` }} />
          </div>
          <div className="revision-chart-dates" aria-hidden="true">
            {last === 0 ? <span>{calendarDate.format(point.at)}</span> :
              <><span>{axisDate.format(points[0].at)}</span><span>{axisDate.format(points[last].at)}</span></>}
          </div>
          {last > 0 && <span id={hintId} className="sr-only">Use the arrow keys to inspect each test result.</span>}
        </div>
      )}
    </figure>
  );
}

export function SubjectStats(props: SubjectStatsProps) {
  const { year, subject, weeklySessions, weeklySeconds, lifetimeSeconds, recallHistory, yearWeeklySessions, yearWeeklySeconds, yearLifetimeSeconds } = props;
  const [expanded, setExpanded] = useState(false);
  return (
    <details className="revision-disclosure" onToggle={event => setExpanded(event.currentTarget.open)}>
      <summary aria-label="Stats" className="revision-disclosure-heading">
        <ChartNoAxesCombined className="revision-disclosure-icon" aria-hidden="true" />
        <h2>Stats</h2><span className="revision-disclosure-context">{subject} · {year}</span>
        <ChevronDown className="revision-disclosure-chevron" aria-hidden="true" />
      </summary>
      {expanded && <div className="revision-disclosure-body revision-stats-body">
        <Totals sessions={weeklySessions} seconds={weeklySeconds} lifetimeSeconds={lifetimeSeconds} stageProgress={props.stageProgress} />
        <RecallChart key={`${subject}/${year}`} history={recallHistory} />
        <WeeklyRevisionSummary year={year} sessions={yearWeeklySessions} seconds={yearWeeklySeconds} lifetimeSeconds={yearLifetimeSeconds} />
      </div>}
    </details>
  );
}
