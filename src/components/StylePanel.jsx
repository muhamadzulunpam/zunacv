import { useEffect, useRef, useState } from 'react';
import { Check, Moon, Palette, Sun, X } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import { PRESETS } from '../utils/theme';
import { config } from '../config';

/** Panel "Ganti Gaya": preset + mode terang/gelap, tersimpan di localStorage. */
export default function StylePanel() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const fabRef = useRef(null);
  const { preset, mode, setPreset, setMode } = useTheme(config.theme);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onDown = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        fabRef.current &&
        !fabRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  // Flag di config.js: matikan panel untuk website klien final
  if (!config.theme.showStylePanel) return null;

  return (
    <>
      {open ? (
        <div
          ref={panelRef}
          className="style-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Panel ganti gaya"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-heading text-[1.02rem] font-bold">Ganti Gaya</p>
              <p className="muted text-xs">Pilihan tersimpan otomatis di perangkat ini.</p>
            </div>
            <button
              type="button"
              className="btn btn-icon btn-icon-sm"
              onClick={() => setOpen(false)}
              aria-label="Tutup panel gaya"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>

          <p className="eyebrow mb-2">Preset warna &amp; font</p>
          <div className="grid gap-2">
            {PRESETS.map((item) => {
              const isActive = item.id === preset;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`preset-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => setPreset(item.id)}
                  aria-pressed={isActive}
                >
                  <span
                    className="swatch"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${item.swatch.join(', ')})`,
                      fontFamily: `'${item.fontLabel}', serif`,
                    }}
                    aria-hidden="true"
                  >
                    Aa
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span className="muted block truncate text-xs">
                      {item.tagline} · {item.fontLabel}
                    </span>
                  </span>
                  {isActive ? (
                    <Check size={17} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <p className="eyebrow mb-2 mt-4">Mode tampilan</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'light', label: 'Terang', Icon: Sun },
              { id: 'dark', label: 'Gelap', Icon: Moon },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`switch ${mode === id ? 'is-active' : ''}`}
                style={mode === id ? { borderColor: 'var(--accent)', background: 'var(--accent-soft)' } : undefined}
                onClick={() => setMode(id)}
                aria-pressed={mode === id}
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <button
        ref={fabRef}
        type="button"
        className="fab"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Tutup panel ganti gaya' : 'Buka panel ganti gaya'}
        aria-expanded={open}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Palette size={20} aria-hidden="true" />}
      </button>
    </>
  );
}
