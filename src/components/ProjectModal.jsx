import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, CalendarDays, Target, X } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import Button from './ui/Button';
import { config } from '../config';

/** Detail proyek: buka di atas lapisan, bisa ditutup Esc / klik latar / tombol tutup */
export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`proyek-${project.id}-judul`}
      >
        <div className="relative">
          <SmartImage
            src={project.thumbnail}
            alt={project.alt}
            ratio="16 / 9"
            width={1200}
            height={675}
            sizes="100vw"
            initials={config.profile.initials}
          />
          <button
            ref={closeRef}
            type="button"
            className="btn btn-icon btn-glass absolute right-4 top-4"
            onClick={onClose}
            aria-label="Tutup detail proyek"
          >
            <X size={19} aria-hidden="true" />
          </button>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, var(--surface), transparent)' }}
            aria-hidden="true"
          />
        </div>

        <div className="card-pad">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-accent">{project.category}</span>
            <span className="muted flex items-center gap-1.5 text-xs">
              <CalendarDays size={13} aria-hidden="true" />
              {project.year}
            </span>
          </div>

          <h3 id={`proyek-${project.id}-judul`} className="mt-4 text-[clamp(1.3rem,3.6vw,1.7rem)]">
            {project.title}
          </h3>
          <p className="muted mt-3 leading-relaxed">{project.summary}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <Target size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                Peran saya
              </p>
              <p className="mt-2 text-sm">{project.role}</p>
            </div>
            <div>
              <p className="eyebrow">Teknologi &amp; alat</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-2)] p-4">
            <p className="eyebrow">Hasil yang terukur</p>
            <ul className="mt-3 grid gap-2.5">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-2 text-sm">
                  <Check size={16} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              variant="primary"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.linkLabel || 'Lihat Proyek'}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
