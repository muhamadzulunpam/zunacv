import { useEffect, useRef, useState } from 'react';
import { Briefcase, CalendarDays, Check, MapPin } from 'lucide-react';
import Reveal from './ui/Reveal';

/**
 * Timeline vertikal: garis warna "tergambar" mengikuti scroll,
 * kartu muncul berselang-seling kiri-kanan di layar besar dan satu kolom di HP.
 */
export default function Timeline({ items = [] }) {
  const areaRef = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const node = areaRef.current;
    if (!node) return;
    let ticking = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const passed = viewport * 0.72 - rect.top;
      const total = rect.height + viewport * 0.18;
      setFill(Math.max(0, Math.min(1, passed / total)));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items.length]);

  return (
    <div ref={areaRef} className="timeline grid gap-5">
      <span className="timeline-rail" aria-hidden="true" />
      <span
        className="timeline-progress"
        style={{ height: `${fill * 100}%` }}
        aria-hidden="true"
      />

      {items.map((item, index) => (
        <div
          key={`${item.role}-${index}`}
          className={`timeline-item ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
        >
          <span className="timeline-dot" aria-hidden="true" />
          <Reveal
            from={index % 2 === 0 ? 'left' : 'right'}
            delay={index * 60}
            className="timeline-card card card-pad card-hover h-full"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-accent">
                <Briefcase size={12} aria-hidden="true" />
                {item.type}
              </span>
              <span className="muted flex items-center gap-1.5 text-xs">
                <CalendarDays size={13} aria-hidden="true" />
                {item.period}
                {item.duration ? <span className="opacity-70">· {item.duration}</span> : null}
              </span>
            </div>

            <h3 className="mt-3 text-[1.16rem]">{item.role}</h3>
            <p className="muted mt-1 text-sm font-semibold">{item.organization}</p>
            {item.location ? (
              <p className="muted mt-1 flex items-center gap-1.5 text-xs">
                <MapPin size={12} aria-hidden="true" />
                {item.location}
              </p>
            ) : null}

            <ul className="mt-4 grid gap-2">
              {item.points.map((point) => (
                <li key={point} className="muted flex gap-2 text-sm leading-relaxed">
                  <Check size={15} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
