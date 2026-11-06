import { useId, useMemo, useState } from 'react';
import { ChevronDown, Lock, ShieldCheck } from 'lucide-react';

type StageSummary = { id: string; title: string; topicGroup: string };

type StageTopicListProps<T extends StageSummary> = {
  stages: T[];
  unlocked: Record<string, boolean>;
  onOpenStage: (stage: T) => void;
  activeStageId?: string;
  tourStageId?: string;
};

export default function StageTopicList<T extends StageSummary>({
  stages, unlocked, onOpenStage, activeStageId, tourStageId,
}: StageTopicListProps<T>) {
  const listId = useId();
  const groups = useMemo(() => {
    const byTopic = new Map<string, T[]>();
    for (const stage of stages) {
      const group = byTopic.get(stage.topicGroup);
      if (group) group.push(stage);
      else byTopic.set(stage.topicGroup, [stage]);
    }
    return [...byTopic];
  }, [stages]);
  const [expanded, setExpanded] = useState<string | null>(() =>
    stages.find((stage) => stage.id === activeStageId)?.topicGroup ?? null
  );

  if (!groups.length) {
    return <p data-tour="stage-list" className="rounded-2xl border border-zinc-800 p-4 text-zinc-300">No stages for this year yet. Choose another year or subject.</p>;
  }

  return (
    <div data-tour="stage-list" className="space-y-2">
      {groups.map(([title, members], index) => {
        const isOpen = expanded === title;
        const panelId = `${listId}-topic-${index}`;
        return (
          <div key={title} className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900">
            <button
              type="button"
              data-tour={members.some(stage => stage.id === tourStageId) ? 'topic-group' : undefined}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setExpanded(isOpen ? null : title)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-zinc-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-300"
            >
              <span className="min-w-0 flex-1 font-black text-white">{title}</span>
              <span className="shrink-0 text-xs font-semibold text-zinc-400">{members.length} {members.length === 1 ? 'stage' : 'stages'}</span>
              <ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-orange-300 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <ul id={panelId} hidden={!isOpen} className="divide-y divide-zinc-800 border-t border-zinc-700 bg-zinc-950">
              {members.map((stage) => {
                const isLocked = !unlocked[stage.id];
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      data-tour={stage.id === tourStageId ? 'stage-option' : undefined}
                      disabled={isLocked}
                      title={isLocked ? 'Score 100% on the preceding stage to unlock this one.' : undefined}
                      aria-current={stage.id === activeStageId ? 'step' : undefined}
                      onClick={() => onOpenStage(stage)}
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-semibold text-zinc-200 enabled:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-300 disabled:cursor-not-allowed disabled:text-zinc-400 aria-[current=step]:bg-orange-500/10"
                    >
                      {isLocked ? <Lock aria-hidden="true" className="h-4 w-4 shrink-0" /> : <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-300" />}
                      <span>{stage.title}</span>
                      {isLocked && <span className="ml-auto text-xs font-normal">Locked</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
