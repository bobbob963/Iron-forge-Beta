import { useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Compass, X } from 'lucide-react';
import './forgeTour.css';

export type TourStep = {
  id: string;
  title: string;
  instruction: string;
  target: string;
  context?: string;
  action: 'click' | 'continue';
  buttonLabel?: string;
};

type Props = { steps: TourStep[]; index: number; onAdvance: () => void; onClose?: () => void };
type Box = { left: number; top: number; right: number; bottom: number };
const gutter = 12;
const gap = 15;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

function navBottom(target: HTMLElement) {
  const nav = document.querySelector('.taskbar-solid');
  if (!nav || nav.contains(target)) return 0;
  const rect = nav.getBoundingClientRect();
  return rect.top <= 1 && rect.bottom > 0 ? rect.bottom : 0;
}

function visibleBox(target: HTMLElement): Box | null {
  const bounds = target.getBoundingClientRect();
  let left = Math.max(0, bounds.left), right = Math.min(innerWidth, bounds.right);
  let top = Math.max(navBottom(target), bounds.top), bottom = Math.min(innerHeight, bounds.bottom);
  // Subject menus and the horizontal taskbar can both clip their children.
  for (let parent = target.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    const rect = parent.getBoundingClientRect();
    if (style.overflowX !== 'visible') { left = Math.max(left, rect.left); right = Math.min(right, rect.right); }
    if (style.overflowY !== 'visible') { top = Math.max(top, rect.top); bottom = Math.min(bottom, rect.bottom); }
  }
  if (right <= left || bottom <= top) return null;
  return { left: Math.round(left), top: Math.round(top), right: Math.round(right), bottom: Math.round(bottom) };
}

function placeCard(box: Box | undefined, width: number, height: number) {
  if (!box) return { left: Math.max(gutter, (innerWidth - width) / 2), top: Math.max(gutter, (innerHeight - height) / 2), side: 'none', tip: 0 };
  const cx = (box.left + box.right) / 2, cy = (box.top + box.bottom) / 2;
  const candidates = [
    { side: 'bottom', space: innerHeight - gutter - box.bottom - gap - height, left: cx - width / 2, top: box.bottom + gap },
    { side: 'top', space: box.top - gutter - gap - height, left: cx - width / 2, top: box.top - gap - height },
    { side: 'right', space: innerWidth - gutter - box.right - gap - width, left: box.right + gap, top: cy - height / 2 },
    { side: 'left', space: box.left - gutter - gap - width, left: box.left - gap - width, top: cy - height / 2 },
  ];
  const position = candidates.find(p => p.space >= 0) ?? candidates.reduce((best, p) => p.space > best.space ? p : best);
  const left = Math.round(clamp(position.left, gutter, innerWidth - gutter - width));
  const top = Math.round(clamp(position.top, gutter, innerHeight - gutter - height));
  const vertical = position.side === 'top' || position.side === 'bottom';
  const tip = vertical ? clamp(cx - left, 18, width - 18) : clamp(cy - top, 18, height - 18);
  return { left, top, side: position.side, tip };
}

export default function ForgeTour({ steps, index, onAdvance, onClose }: Props) {
  const step = steps[index];
  const selector = step?.target;
  const contextSelector = step?.context;
  const action = step?.action;
  const id = useId();
  const card = useRef<HTMLElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const advance = useRef(onAdvance);
  const close = useRef(onClose);
  const [layout, setLayout] = useState<{ boxes: Box[]; position: ReturnType<typeof placeCard> } | null>(null);
  useLayoutEffect(() => { advance.current = onAdvance; close.current = onClose; }, [onAdvance, onClose]);

  useLayoutEffect(() => {
    if (!selector || !action || !card.current) return;
    const targetSelector = selector;
    const panel = card.current;
    const description = id + '-instruction';
    let targets: HTMLElement[] = [];
    let advancing = false, frame = 0;
    let afterClick: number | undefined;
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    resize.observe(panel);

    function release(target: HTMLElement) {
      resize.unobserve(target);
      const remaining = (target.getAttribute('aria-describedby') || '').split(/\s+/).filter(token => token && token !== description);
      if (remaining.length) target.setAttribute('aria-describedby', remaining.join(' '));
      else target.removeAttribute('aria-describedby');
    }
    function preferredFocus() {
      return action === 'click' && targets.length ? targets[0] : nextButton.current || panel;
    }
    function measure() {
      frame = 0;
      const matches = Array.from(document.querySelectorAll<HTMLElement>(targetSelector)).filter(el =>
        el.getClientRects().length && getComputedStyle(el).visibility === 'visible' &&
        (action !== 'click' || !el.matches(':disabled, [aria-disabled="true"]'))
      );
      const context = contextSelector && matches[0] ? matches[0].closest<HTMLElement>(contextSelector) : null;
      const changed = matches.length !== targets.length || matches.some((el, i) => el !== targets[i]);
      if (changed) {
        targets.filter(el => !matches.includes(el)).forEach(release);
        for (const el of matches.filter(el => !targets.includes(el))) {
          resize.observe(el);
          if (action === 'click') {
            const existing = el.getAttribute('aria-describedby')?.split(/\s+/).filter(Boolean) || [];
            el.setAttribute('aria-describedby', [...new Set([...existing, description])].join(' '));
          }
        }
        targets = matches;
        const anchor = context ?? targets[0];
        if (anchor) {
          const rect = anchor.getBoundingClientRect();
          const visible = visibleBox(anchor);
          if (!visible || visible.bottom - visible.top < Math.min(rect.height, innerHeight * .56) - 1 || visible.right - visible.left < Math.min(rect.width, innerWidth * .8) - 1) {
            anchor.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
          }
          preferredFocus().focus({ preventScroll: true });
        }
      }
      let targetBoxes = targets.map(visibleBox).filter((box): box is Box => box !== null);
      if (!targetBoxes.length && targets.length) {
        // A page navigation can finish its own scroll after the label has mounted.
        const focused = targets.find(el => el === document.activeElement);
        (focused ?? targets[0]).scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
        targetBoxes = targets.map(visibleBox).filter((box): box is Box => box !== null);
      }
      const contextBox = context && targetBoxes.length ? visibleBox(context) : null;
      const boxes = contextBox ? [contextBox] : targetBoxes;
      const group = boxes.length ? {
        left: Math.min(...boxes.map(b => b.left)), right: Math.max(...boxes.map(b => b.right)),
        top: Math.min(...boxes.map(b => b.top)), bottom: Math.max(...boxes.map(b => b.bottom)),
      } : undefined;
      const position = placeCard(group, panel.offsetWidth, panel.offsetHeight);
      setLayout({ boxes, position });
    }

    function guardPointer(event: Event) {
      if (event.target instanceof Node && panel.contains(event.target)) return;
      const permitted = action === 'click' && targets.some(el => event.composedPath().includes(el));
      if (!permitted || advancing) {
        event.preventDefault();
        event.stopImmediatePropagation();
      } else if (event.type === 'click') {
        advancing = true;
        // A trusted click may run microtasks between capture and bubble. A new
        // task keeps the target mounted until its own click handler has run.
        afterClick = window.setTimeout(() => {
          if (!event.defaultPrevented) advance.current();
          advancing = false;
        }, 0);
      }
    }
    function guardKeys(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        close.current?.();
      } else if (event.key === 'Tab') {
        const stops = [
          ...(action === 'click' ? targets : []),
          ...panel.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
        ];
        event.preventDefault();
        if (!stops.length) { panel.focus({ preventScroll: true }); return; }
        const current = stops.indexOf(document.activeElement as HTMLElement);
        const next = current < 0 ? (event.shiftKey ? stops.length - 1 : 0) : (current + (event.shiftKey ? -1 : 1) + stops.length) % stops.length;
        stops[next].focus();
      }
    }
    function guardFocus(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof HTMLElement) || panel.contains(target) || (action === 'click' && targets.includes(target))) return;
      preferredFocus().focus({ preventScroll: true });
    }
    const app = document.getElementById('root');
    const observer = new MutationObserver(schedule);
    if (app) observer.observe(app, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'disabled', 'aria-expanded', 'class'] });
    const pointerEvents = ['pointerdown', 'mousedown', 'click', 'auxclick', 'contextmenu'];
    pointerEvents.forEach(type => document.addEventListener(type, guardPointer, true));
    document.addEventListener('keydown', guardKeys, true);
    document.addEventListener('focusin', guardFocus, true);
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    measure();
    return () => {
      window.clearTimeout(afterClick);
      observer.disconnect();
      resize.disconnect();
      targets.forEach(release);
      cancelAnimationFrame(frame);
      pointerEvents.forEach(type => document.removeEventListener(type, guardPointer, true));
      document.removeEventListener('keydown', guardKeys, true);
      document.removeEventListener('focusin', guardFocus, true);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
    };
  }, [id, step?.id, selector, contextSelector, action]);

  if (!step) return null;
  const position = layout?.position;
  function continueFromLabel() {
    // The page can update between layout and the click (e.g. after restoring a tab).
    const visible = Array.from(document.querySelectorAll<HTMLElement>(step.target))
      .some(el => getComputedStyle(el).visibility === 'visible' && visibleBox(el));
    if (visible) onAdvance();
  }
  return createPortal(
    <div className="forge-tour-layer">
      <svg className="forge-tour-light" width="100%" height="100%" aria-hidden="true">
        <defs><mask id={id + '-mask'}>
          <rect width="100%" height="100%" fill="white" />
          {layout?.boxes.map((b, i) => <rect key={i} x={b.left - 4} y={b.top - 4} width={b.right - b.left + 8} height={b.bottom - b.top + 8} rx="11" fill="black" />)}
        </mask></defs>
        <rect width="100%" height="100%" fill="#090b11" fillOpacity=".72" mask={`url(#${id}-mask)`} />
        {layout?.boxes.map((b, i) => <rect className="forge-tour-ring" key={i} x={b.left - 4} y={b.top - 4} width={b.right - b.left + 8} height={b.bottom - b.top + 8} rx="11" />)}
      </svg>
      <aside ref={card} tabIndex={-1} className="forge-tour-card" aria-label="Guided tour"
        data-tour-step={step.id} data-tour-action={step.action} data-tour-target={step.target} data-side={position?.side}
        style={{ left: position?.left ?? gutter, top: position?.top ?? gutter, '--tour-tip': (position?.tip ?? 20) + 'px' } as CSSProperties}>
        <div className="forge-tour-card-inner">
          <div className="forge-tour-header">
            <span className="forge-tour-counter"><Compass size={16} aria-hidden="true" /> Step {index + 1} of {steps.length}</span>
            {onClose && <button type="button" className="forge-tour-close" aria-label="Close tutorial" onClick={onClose}><X size={16} aria-hidden="true" /></button>}
          </div>
          <div aria-live="polite" aria-atomic="true">
            <h2>{step.title}</h2>
            <p id={id + '-instruction'}>{step.instruction}</p>
          </div>
          {step.action === 'continue' && <button ref={nextButton} type="button" data-tour-next=""
            className="forge-tour-next" disabled={!layout?.boxes.length} onClick={continueFromLabel}>
            {step.buttonLabel ?? 'Continue'} <ArrowRight size={16} aria-hidden="true" />
          </button>}
          <div className="forge-tour-progress" aria-hidden="true"><span style={{ width: `${(index + 1) / steps.length * 100}%` }} /></div>
        </div>
      </aside>
    </div>, document.body
  );
}
