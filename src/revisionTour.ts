import type { TourStep } from './ForgeTour';

const checkpointKey = 'ironForgeTourCheckpointV1';
const views = {
  subjects: 'home', pick: 'home', stages: 'home', topic: 'stages', stage: 'stages',
  empty: 'stages', answer: 'topic', mark: 'topic', result: 'topic', daily: 'daily',
  general: 'general', themes: 'themes',
} as const;

export type TourId = keyof typeof views;
export type TourCheckpoint = { step: TourId; subjectId: string; answer?: string };
export const tourView = (step: TourId) => views[step];

export function readTour(): TourCheckpoint | null {
  try {
    const saved = JSON.parse(localStorage.getItem(checkpointKey) || 'null');
    if (saved && Object.hasOwn(views, saved.step) && typeof saved.subjectId === 'string') {
      return { step: saved.step, subjectId: saved.subjectId, answer: typeof saved.answer === 'string' ? saved.answer : undefined };
    }
  } catch { /* A fresh tour also works when storage is unavailable. */ }
  return null;
}

export function rememberTour(checkpoint: TourCheckpoint | null) {
  try {
    if (checkpoint) localStorage.setItem(checkpointKey, JSON.stringify(checkpoint));
    else localStorage.removeItem(checkpointKey);
  } catch { /* The current visit can continue without a stored checkpoint. */ }
}

type Step = TourStep & { id: TourId };
type Stage = { title: string; topicGroup: string; section: string };

export function getTourSteps(subject: string, year: string, practice: Stage, hasStages: boolean): Step[] {
  const click = (id: TourId, target: string, title: string, instruction: string): Step =>
    ({ id, target: `[data-tour="${target}"]`, title, instruction, action: 'click' });
  const read = (id: TourId, target: string, title: string, instruction: string, buttonLabel: string): Step =>
    ({ id, target: `[data-tour="${target}"]`, title, instruction, action: 'continue', buttonLabel });
  return [
    click('subjects', 'subjects', 'Pick a subject to try', 'Open Subjects in the taskbar to start your practice run.'),
    click('pick', 'subject-option', 'What do you want to revise?', 'Choose a subject from your list. We’ll use it for this walkthrough.'),
    click('stages', 'stages', 'Find your first stage', `Open Stages to see the topics for ${subject} in ${year}.`),
    ...(hasStages ? [
      click('topic', 'topic-group', 'Unfold a topic', `Click ${practice.topicGroup} to reveal its stages.`),
      click('stage', 'stage-option', 'Step into the test', `Open “${practice.title}”. You’ll try one question from the stage.`),
    ] : [
      read('empty', 'stage-list', 'Try a sample stage', `${subject} has no available stages in ${year} yet. Try a question from ${practice.section} while keeping your selected year.`, 'Try a practice question'),
    ]),
    { ...click('answer', 'practice-option', 'Try the first question', 'Choose an answer. This practice run is separate from your stage scores.'), context: '[data-tour="practice-question"]' },
    click('mark', 'mark', 'Strike the Anvil', 'Click the marking button to check your answer.'),
    read('result', 'practice-result', 'Read your feedback', 'In a full stage, marking opens the notes. Score 100% to unlock the next stage. Unlock them all to take the written Super Test.', hasStages ? 'Explore Daily Test' : 'Find revision notes'),
    ...(hasStages ? [read('daily', 'daily-intro', 'Mix up your practice', 'Daily Test draws questions from across your selected year. The clock records time on revision pages once your tour ends.', 'Find revision notes')] : []),
    read('general', 'general-notes', 'Find help between tests', 'General holds your subject notes and links to past papers. Come here to review a topic before trying again.', 'Explore themes'),
    read('themes', 'equipped-theme', 'Make the Forge yours', 'This is your equipped theme. Stage unlocks earn more looks, and unlocking Cherry Blossom and Ocean opens the colour picker. You can revisit this tour in Settings.', 'Finish tour'),
  ];
}
