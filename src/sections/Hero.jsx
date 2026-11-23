import { ArrowDown, Briefcase, Download, MapPin, Sparkles } from 'lucide-react';
import useTypewriter from '../hooks/useTypewriter';
import { scrollToId } from '../utils/scroll';
import { config } from '../config';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import { iconFor } from '../components/ui/icons';

/** Latar: tiga blob gradien yang bergerak lambat + garis halus. Transform-only agar hemat. */
function Backdrop() {
  const blobs = [
    { size: '46vw', top: '-12vw', left: '-8vw', color: 'var(--brand-1)', dur: '19s', delay: '0s', op: 0.5 },
    { size: '38vw', top: '6vw', right: '-6vw', color: 'var(--brand-2)', dur: '23s', delay: '-6s', op: 0.42 },
    { size: '32vw', bottom: '-8vw', left: '34vw', color: 'var(--brand-3)', dur: '26s', delay: '-12s', op: 0.34 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <span
          key={index}
          className="blob"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            opacity: blob.op,
            animationDuration: blob.dur,
            animationDelay: blob.delay,
            background: `radial-gradient(circle at 35% 35%, ${blob.color}, transparent 66%)`,
          }}
        />
      ))}
      <span
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          opacity: 0.35,
          maskImage: 'radial-gradient(58% 52% at 50% 42%, #000, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(58% 52% at 50% 42%, #000, transparent 78%)',
        }}
      />
    </div>
  );
}

export default function Hero() {
  const { text } = useTypewriter(config.profile.roles);

  return (
    <section
      id="beranda"
      className="relative overflow-hidden pb-14 pt-[calc(var(--nav-h)+34px)] lg:pb-24 lg:pt-[calc(var(--nav-h)+76px)]"
    >
      <Backdrop />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <Reveal>
            <span className="badge-status">
              <span className="dot-live animate-pulse-dot" aria-hidden="true" />
              {config.profile.availability}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 text-[clamp(2.5rem,7.4vw,4.3rem)] font-extrabold">
              {config.profile.name.split(' ')[0]}{' '}
              <span className="gradient-text">{config.profile.name.split(' ').slice(1).join(' ')}</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p
              className="font-heading mt-3 flex min-h-[2.2em] flex-wrap items-center gap-2 text-[clamp(1.05rem,3vw,1.5rem)] font-semibold"
              aria-label={`Jabatan: ${config.profile.roles.join(', ')}`}
            >
              <span aria-hidden="true" className="muted">
                —
              </span>
              <span aria-hidden="true" className="gradient-text">
                {text}
              </span>
              <span
                aria-hidden="true"
                className="inline-block h-[1.05em] w-[3px] translate-y-[2px]"
                style={{
                  background: 'var(--accent)',
                  animation: 'caret-blink 1s steps(1) infinite',
                }}
              />
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="muted mt-5 max-w-xl text-[1.02rem]">{config.profile.tagline}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                href={config.links.cv}
                download={config.links.cvFileName}
              >
                <Download size={18} aria-hidden="true" />
                Unduh CV
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToId('kontak')}>
                Hubungi Saya
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="muted flex items-center gap-2 text-sm">
                <MapPin size={16} aria-hidden="true" />
                {config.profile.location}
              </span>
              <span className="muted flex items-center gap-2 text-sm">
                <Briefcase size={16} aria-hidden="true" />
                {config.profile.availabilityNote}
              </span>
              <ul className="flex items-center gap-2">
                {config.socials.map((social) => {
                  const Icon = iconFor(social.icon);
                  return (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-icon"
                        aria-label={social.label}
                      >
                        <Icon size={17} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Foto profil dalam bingkai organik + glow */}
        <Reveal from="right" delay={120} className="relative mx-auto w-full max-w-[400px]">
          <div className="avatar-shell">
            <span className="avatar-ring" aria-hidden="true" />
            <span className="avatar-orbit animate-spin-slow" aria-hidden="true">
              <span
                className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--glow)' }}
              />
            </span>
            <SmartImage
              className="avatar-frame"
              src={config.profile.photo}
              alt={config.profile.photoAlt}
              ratio="1 / 1"
              width={600}
              height={600}
              sizes="(max-width: 900px) 82vw, 400px"
              initials={config.profile.initials}
              priority
            />

            <div
              className="animate-float glass absolute -left-2 top-[16%] hidden rounded-[var(--r-md)] px-3 py-2 text-xs font-semibold shadow-[var(--shadow-1)] sm:block"
              style={{ animationDelay: '-1.5s' }}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                IPK 3,82 · Cum laude
              </span>
            </div>
            <div className="animate-float glass absolute -right-1 bottom-[14%] rounded-[var(--r-md)] px-3 py-2 text-xs font-semibold shadow-[var(--shadow-1)]">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  aria-hidden="true"
                />
                {config.stats[0].value}+ proyek selesai
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x relative mt-12 hidden lg:block">
        <button
          type="button"
          onClick={() => scrollToId('tentang')}
          className="muted flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowDown size={15} aria-hidden="true" />
          Scroll untuk jelajah
        </button>
      </div>
    </section>
  );
}
