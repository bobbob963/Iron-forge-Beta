import { useEffect, useRef, type CSSProperties } from 'react';
import './forgeScenes.css';

export function JapanThemeBackground() {
  return (
    <div className="forge-scene japan-theme-bg" aria-hidden="true">
      <svg className="forge-scene-art" viewBox="0 0 720 280" fill="none">
        <circle cx="426" cy="98" r="56" fill="#cf5b49" />
        <path d="M70 245 194 210 279 167 306 177 376 125 411 89 435 92 473 130 539 167 573 159 720 213V280H70Z" fill="#353e49" />
        <path d="m357 140 54-51 24 3 45 45-29-20-3 7-17-13-11 9-8-9-17 12 3-10Z" fill="#e0c7b4" />
        <path d="m0 270 117-29 82-34 58 9 77-27 76 15 98-34 35 6 72-23 105 24v103H0Z" fill="#252d38" />
        <path d="m0 275 124-14 96-19 82 4 116-22 92 7 86-27 124 13v63H0Z" fill="#1a212b" />
        <g stroke="#ad9b8d" opacity=".36" strokeWidth="1.2">
          <path d="m295 192 30-18 24-11 28-20 20-9M467 144l23 21 29 12M557 194l41-14 38-7 34 5M168 236l38-12 33-4" />
          <path d="M348 68h82m-9 5h68m26 44h96m-24 5h50" />
        </g>
      </svg>
    </div>
  );
}

export function CyberThemeBackground() {
  return (
    <div className="forge-scene cyber-theme-bg" aria-hidden="true">
      <div className="cyber-grid" />
      <svg className="forge-scene-art cyber-traces" viewBox="0 0 720 280" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M34 216h80l53-53h110l59-59h109l42-42h218M98 229h58l52-52h94l56-56h100l42-42h205M266 260v-32l34-34h78l51-51h116l27-27h133M360 50h75l31-31h130" />
        <g fill="#91ebcc">{[[34,216],[98,229],[266,260],[360,50],[596,19],[545,143]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="3" />)}</g>
      </svg>
    </div>
  );
}

export function VolcanoThemeBackground() {
  return (
    <div className="forge-scene volcano-theme-bg" aria-hidden="true">
      <svg className="forge-scene-art" viewBox="0 0 720 280" fill="none">
        <ellipse cx="411" cy="127" rx="99" ry="41" fill="url(#caldera-glow)" />
        <defs>
          <radialGradient id="caldera-glow"><stop stopColor="#e6683a" stopOpacity=".58"/><stop offset="1" stopColor="#df4926" stopOpacity="0"/></radialGradient>
        </defs>
        <path d="m0 277 99-39 68-35 79-16 82-43 67-38 30 3 18-4 62 35 44 24 57 14 114 53v49H0Z" fill="#49332f" />
        <path d="m391 110 8-5 25 2 17-4 8 5-21 6-17-1-34 20-39 15 26-15Z" fill="#efa36b" />
        <path d="m413 113-18 18 5 9-28 23 4 8-45 23 38-28-3-8 26-20-4-8Z" fill="#cc6144" />
        <path d="m440 114 18 18 21 9 30 20m-42-24 8 12 17 12m-100-10-14 29-29 18m158-28 44 12 18 13" stroke="#8b5b48" />
        <path d="m0 274 120-30 117-39 69 7 79-27 75 13 100-32 112 29 48 2v83H0Z" fill="#2e2629" />
        <path d="m0 280 96-11 86-14 104 2 79-17 92 4 98-20 95 7 70-14v63Z" fill="#201c20" />
        {Array.from({length: 9}, (_,i) => (
          <circle className="volcano-ember" key={i} cx={406 + i % 5 * 5} cy={105} r={1.2 + i % 3 * .35}
            style={{'--rise-x': `${(i-4)*8}px`, '--rise-y': `${-34-i%4*12}px`, animationDelay: `${i*.12}s`} as CSSProperties} />
        ))}
      </svg>
    </div>
  );
}

export function GodThemeBackground() {
  return (
    <div className="forge-scene god-theme-bg" aria-hidden="true">
      <svg className="forge-scene-art" viewBox="0 0 720 280" fill="none">
        <g stroke="#a37842">
          <circle cx="438" cy="126" r="109" opacity=".42" />
          <circle cx="438" cy="126" r="99" strokeDasharray="1 7" opacity=".6" />
          <circle cx="438" cy="126" r="74" opacity=".55" />
          <ellipse cx="438" cy="126" rx="163" ry="39" transform="rotate(-25 438 126)" opacity=".55" />
          <path d="M267 174 306 131 345 144 402 81m107 47 33 19 53-38 45 7" opacity=".45" />
        </g>
        <g fill="#a37842">{[[267,174],[306,131],[345,144],[402,81],[509,128],[542,147],[595,109],[640,116]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="2" />)}</g>
        <path d="m438 88 5 30 23 8-23 6-5 32-6-32-24-6 24-8Z" fill="#b3874b" />
        <circle cx="438" cy="126" r="4" fill="#fff8df" />
      </svg>
    </div>
  );
}

// Keep pointer sampling and animation within the car so reading a page never re-renders the app per frame.
export function JapanCarOverlay({ onJumpUnlock }: { onJumpUnlock: () => void }) {
  const carRef = useRef<HTMLDivElement>(null);
  const unlockRef = useRef(onJumpUnlock);
  useEffect(() => { unlockRef.current = onJumpUnlock; }, [onJumpUnlock]);

  useEffect(() => {
    const car = carRef.current;
    if (!car) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let nextRun = 0;
    let pointerX = -Infinity;
    let pointerY = -Infinity;
    const trackPointer = (event: PointerEvent) => { pointerX = event.clientX; pointerY = event.clientY; };
    const leave = () => { pointerX = -Infinity; pointerY = -Infinity; };
    function stop() {
      cancelAnimationFrame(frame);
      clearTimeout(nextRun);
      car!.hidden = true;
      car!.classList.remove('japan-supra-burnout');
    }
    function drive() {
      if (!car || motion.matches || document.hidden) return;
      let x = -100;
      let previous = performance.now();
      let blockedAt = 0;
      let jumpedAt = 0;
      const speed = (window.innerWidth + 200) / (3800 + Math.random() * 1200);
      const laneTop = car.parentElement!.getBoundingClientRect().top;
      car.hidden = false;
      function tick(now: number) {
        const dt = Math.min(now - previous, 64);
        previous = now;
        const blocked = !jumpedAt && Math.abs(pointerX - (x + 42)) < 45 &&
          pointerY >= laneTop - 9 && pointerY <= laneTop + 15;
        blockedAt = blocked ? blockedAt || now : 0;
        if (blockedAt && now - blockedAt >= 5000) {
          jumpedAt = now;
          unlockRef.current();
        }
        if (!blocked || jumpedAt) x += dt * speed;
        car!.classList.toggle('japan-supra-burnout', Boolean(blocked && !jumpedAt));
        const lift = jumpedAt ? -13 * Math.sin(Math.PI * Math.min((now - jumpedAt) / 550, 1)) : 0;
        car!.style.transform = `translate3d(${x}px, ${lift}px, 0)`;
        if (x < window.innerWidth + 10) frame = requestAnimationFrame(tick);
        else { car!.hidden = true; nextRun = window.setTimeout(drive, 12000 + Math.random() * 14000); }
      }
      frame = requestAnimationFrame(tick);
    }
    function restart() {
      stop();
      if (!motion.matches && !document.hidden) nextRun = window.setTimeout(drive, 1100);
    }
    window.addEventListener('pointermove', trackPointer, {passive:true});
    window.addEventListener('blur', leave);
    document.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', restart);
    motion.addEventListener('change', restart);
    restart();
    return () => {
      stop();
      window.removeEventListener('pointermove', trackPointer);
      window.removeEventListener('blur', leave);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', restart);
      motion.removeEventListener('change', restart);
    };
  }, []);
  return (
    <div className="japan-car-lane" aria-hidden="true">
      <div className="japan-supra-run" ref={carRef} hidden>
        <div className="japan-smoke-pack"><span className="japan-smoke smoke-one" /><span className="japan-smoke smoke-two" /></div>
        <div className="japan-supra-hanger">
          <div className="japan-supra">
            <div className="japan-supra-wing" />
            <div className="japan-supra-roof" />
            <div className="japan-supra-window front" />
            <div className="japan-supra-window rear" />
            <div className="japan-supra-door-line" />
            <div className="japan-supra-graphic" />
            <div className="japan-supra-light front" />
            <div className="japan-supra-light rear" />
            <div className="japan-supra-wheel wheel-front" />
            <div className="japan-supra-wheel wheel-rear" />
            <div className="japan-supra-skirt" />
          </div>
        </div>
      </div>
    </div>
  );
}
