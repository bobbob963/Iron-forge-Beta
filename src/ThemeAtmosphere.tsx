import type { CSSProperties } from 'react';
import './themeAtmosphere.css';

export function CherryClouds() {
  const clouds = [
    { left: '56%', top: '10%', width: '280px', height: '76px', opacity: 0.32 },
    { left: '70%', top: '22%', width: '360px', height: '98px', opacity: 0.26 },
    { left: '36%', top: '32%', width: '250px', height: '68px', opacity: 0.18 },
  ];

  return (
    <div className="theme-atmosphere" aria-hidden="true">
      {clouds.map((cloud, i) => (
        <div
          key={`cloud-${i}`}
          className="cherry-soft-cloud absolute rounded-full bg-white blur-2xl"
          style={{
            left: cloud.left,
            top: cloud.top,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            animationDelay: `${-i * 1.8}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CherryPetalsOverlay() {
  const petals = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div aria-hidden="true" className="cherry-petal-overlay pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {petals.map((_, i) => (
        <span
          key={`petal-${i}`}
          className="cherry-petal absolute block"
          style={{
            left: `${-8 + i * 5.2}%`,
            top: `${-16 - (i % 4) * 7}vh`,
            width: `${7 + (i % 3)}px`,
            height: `${11 + (i % 4)}px`,
            animationDelay: `${-i * 0.8}s`,
            animationDuration: `${11 + (i % 5) * 1.4}s`,
          }}
        />
      ))}
    </div>
  );
}

export function ValentineHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="theme-atmosphere" aria-hidden="true">
      {hearts.map((_, i) => (
        <span
          key={`heart-${i}`}
          className="valentine-heart absolute"
          style={{
            left: `${4 + ((i * 17) % 92)}%`,
            top: `${-12 - (i % 5) * 9}vh`,
            animationDelay: `${-i * 0.55}s`,
            animationDuration: `${8 + (i % 5) * 1.3}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export function JapanLeaves() {
  const leaves = Array.from({ length: 26 }, (_, i) => i);

  return (
    <div className="theme-atmosphere" aria-hidden="true">
      {leaves.map((_, i) => (
        <span
          key={`leaf-${i}`}
          className="japan-leaf absolute"
          style={{
            left: `${5 + ((i * 7) % 90)}%`,
            top: `${-20 - i * 8}px`,
            animationDelay: `${-i * 0.45}s`,
            animationDuration: `${5.6 + (i % 5) * 0.65}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CyberRain() {
  const codeRain = Array.from({ length: 26 }, (_, i) => i);

  return (
    <div className="theme-atmosphere" aria-hidden="true">
      {codeRain.map((_, i) => (
        <span
          key={`code-${i}`}
          className="cyber-code absolute font-mono text-xs font-black text-emerald-300/45"
          style={{
            left: `${2 + i * 4}%`,
            top: `${-25 - (i % 6) * 12}vh`,
            animationDelay: `${-i * 0.32}s`,
            animationDuration: `${6 + (i % 5) * 0.8}s`,
          }}
        >
          {i % 3 === 0 ? '101' : i % 3 === 1 ? '011' : 'IFM'}
        </span>
      ))}
    </div>
  );
}

export function VolcanoEruption() {
  const sparks = Array.from({ length: 26 }, (_, i) => i);
  const eruptionParticles = Array.from({ length: 70 }, (_, i) => i);

  return (
    <div className="theme-atmosphere" aria-hidden="true">
      <div className="volcano-eruption-core absolute left-1/2 top-1/2" />
      <div className="volcano-eruption-shockwave absolute left-1/2 top-1/2" />
      {eruptionParticles.map((_, i) => {
        const angle = (i / eruptionParticles.length) * Math.PI * 2;
        const distance = 360 + (i % 8) * 72;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <span
            key={`eruption-particle-${i}`}
            className="volcano-eruption-particle absolute left-1/2 top-1/2 block rounded-full"
            style={{
              '--eruption-x': `${x}px`,
              '--eruption-y': `${y}px`,
              '--eruption-delay': `${i * 0.025}s`,
              width: `${8 + (i % 5) * 4}px`,
              height: `${8 + (i % 5) * 4}px`,
            } as CSSProperties}
          />
        );
      })}

      {sparks.map((_, i) => (
        <span
          key={`spark-${i}`}
          className="volcano-spark absolute block rounded-full bg-orange-300"
          style={{
            left: `${38 + ((i * 7) % 24)}%`,
            bottom: `${12 + (i % 4) * 2}%`,
            width: `${4 + (i % 3)}px`,
            height: `${4 + (i % 3)}px`,
            animationDelay: `${-i * 0.22}s`,
            animationDuration: `${4 + (i % 5) * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GodSunAndDoves() {
  const rays = Array.from({ length: 16 }, (_, i) => i);
  const doves = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="theme-atmosphere" aria-hidden="true">
      <div className="absolute left-1/2 top-[16%] -translate-x-1/2 god-sun-wrap">
        {rays.map((_, i) => (
          <span
            key={`god-ray-${i}`}
            className="god-rotating-ray"
            style={{ transform: `rotate(${i * 22.5}deg)` }}
          />
        ))}
        <div className="god-sun-core" />
      </div>

      {doves.map((_, i) => (
        <div
          key={`god-dove-${i}`}
          className="god-dove"
          style={{
            top: `${12 + (i % 4) * 14}%`,
            animationDelay: `${-i * 4.6}s`,
            animationDuration: `${18 + (i % 3) * 3}s`,
          }}
        >
          <span className="god-dove-wing left" />
          <span className="god-dove-body" />
          <span className="god-dove-wing right" />
        </div>
      ))}
    </div>
  );
}
