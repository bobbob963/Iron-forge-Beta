import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Lock, RotateCcw } from 'lucide-react';
import './themePalette.css';

type Role = 'primary' | 'secondary';
type Colours = Partial<Record<Role, string>>;
type SavedPalettes = Record<string, Colours>;
const storageKey = 'ironForgeThemePalettesV1';
const hexColour = /^#[0-9a-f]{6}$/i;
const presets = [
  ['Slate', '#1C1F2A'], ['Sakura', '#EAA7BD'], ['Ember', '#DC793D'],
  ['Sea glass', '#469C92'], ['Iris', '#9876CC'], ['Ivory', '#F4E7CD'],
] as const;

function readPalettes(): SavedPalettes {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const result: SavedPalettes = {};
    for (const [id, fields] of Object.entries(saved)) {
      if (!/^[a-z]+$/.test(id) || !fields || typeof fields !== 'object') continue;
      const colours: Colours = {};
      for (const role of ['primary', 'secondary'] as const) {
        const value = (fields as Colours)[role];
        if (typeof value === 'string' && hexColour.test(value)) colours[role] = value.toUpperCase();
      }
      if (Object.keys(colours).length) result[id] = colours;
    }
    return result;
  } catch { return {}; }
}

export function useThemePalettes() {
  const [palettes, setPalettes] = useState<SavedPalettes>(readPalettes);
  function save(themeId: string, colours: Colours) {
    const next = { ...palettes };
    if (Object.keys(colours).length) next[themeId] = colours;
    else delete next[themeId];
    setPalettes(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Session colours still apply. */ }
  }
  return { palettes, save };
}

// Pick the higher-contrast text colour for the exact background chosen.
function ink(hex: string) {
  const [r, g, b] = [1, 3, 5].map(i => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722 > 0.179 ? '#000000' : '#FFFFFF';
}

export function paletteStyle(colours: Colours): CSSProperties {
  const style: Record<string, string> = {};
  for (const role of ['primary', 'secondary'] as const) {
    const value = colours[role];
    if (value) {
      style['--custom-' + role] = value;
      style['--custom-' + role + '-ink'] = ink(value);
    }
  }
  return style as CSSProperties;
}

type Theme = { id: string; name: string; button: string; panel: string };
type Props = { theme: Theme; unlocked: boolean; colours: Colours; onChange: (colours: Colours) => void };

export default function ThemePalette({ theme, unlocked, colours, onChange }: Props) {
  const probes = useRef<HTMLDivElement>(null);
  const [defaults, setDefaults] = useState({ primary: '#D98242', secondary: '#1C1F2A' });
  useLayoutEffect(() => {
    const canvas = document.createElement('canvas').getContext('2d');
    if (!canvas || !probes.current) return;
    function sample(element: Element) {
      canvas!.clearRect(0, 0, 1, 1);
      canvas!.fillStyle = getComputedStyle(element).backgroundColor;
      canvas!.fillRect(0, 0, 1, 1);
      return '#' + Array.from(canvas!.getImageData(0, 0, 1, 1).data.slice(0, 3), n => n.toString(16).padStart(2, '0')).join('').toUpperCase();
    }
    const [primary, secondary] = Array.from(probes.current.children, sample);
    setDefaults({ primary, secondary });
  }, [theme.id, unlocked]);
  return (
    <section aria-label="Colour palette" className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-950 p-5">
      <div ref={probes} hidden aria-hidden="true"><i className={theme.button} /><i className={theme.panel} /></div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-bold text-white">Colour palette</h3>
        {unlocked && (
          <button type="button" disabled={!colours.primary && !colours.secondary}
            onClick={() => onChange({})} title={'Restore both default colours for ' + theme.name}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm font-bold text-white enabled:hover:bg-zinc-800 disabled:opacity-45">
            <RotateCcw size={15} aria-hidden="true" /> Reset to default
          </button>
        )}
      </div>
      {unlocked ? <>
        <p className="mt-1 text-sm text-zinc-300">Personalise {theme.name}. Your colours are saved on this device.</p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {(['primary', 'secondary'] as const).map(role => {
            const label = role === 'primary' ? 'Primary' : 'Secondary';
            const value = colours[role] || defaults[role];
            return <fieldset key={role} className="min-w-0">
              <legend className="font-bold text-white">{label} <span className="ml-1 text-sm font-normal text-zinc-400">{role === 'primary' ? 'Buttons' : 'Highlight panels'}</span></legend>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-700 px-2 py-1">
                  <input type="color" value={value} aria-label={label + ' custom colour'} onChange={e => onChange({ ...colours, [role]: e.target.value.toUpperCase() })} />
                  <span className="font-mono text-xs text-zinc-200">{value}</span>
                </label>
                {presets.map(([name, hex]) => <button key={name} type="button" className="colour-swatch"
                  aria-label={label + ' ' + name + ' ' + hex} title={name + ' · ' + hex}
                  aria-pressed={colours[role] === hex} style={{ backgroundColor: hex, color: ink(hex) }}
                  onClick={() => onChange({ ...colours, [role]: hex })}>{colours[role] === hex && '✓'}</button>)}
                <button type="button" disabled={!colours[role]} aria-label={'Reset ' + role + ' to default'}
                  className="rounded-md border border-zinc-700 px-2 py-1 text-sm text-zinc-200 enabled:hover:bg-zinc-800 disabled:opacity-45"
                  onClick={() => {
                    const next = { ...colours };
                    delete next[role];
                    onChange(next);
                  }}>Default</button>
              </div>
            </fieldset>;
          })}
        </div>
      </> : <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300"><Lock size={15} aria-hidden="true" />Unlock Cherry Blossom and Ocean Forge to change your colours.</p>}
    </section>
  );
}
