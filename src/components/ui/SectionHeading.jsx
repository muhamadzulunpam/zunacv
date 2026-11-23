import Reveal from './Reveal';

/** Judul bagian: label kecil + judul bergradasi + deskripsi */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  className = '',
}) {
  const isCenter = align === 'center';
  return (
    <Reveal
      className={`${isCenter ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}
    >
      {eyebrow ? (
        <div className={`eyebrow flex items-center gap-2 ${isCenter ? 'justify-center' : ''}`}>
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--brand-gradient)' }}
            aria-hidden="true"
          />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-[clamp(1.75rem,4.4vw,2.6rem)]">
        {title} {highlight ? <span className="gradient-text">{highlight}</span> : null}
      </h2>
      {description ? (
        <p className="muted mt-4 text-[1.02rem] leading-relaxed">{description}</p>
      ) : null}
    </Reveal>
  );
}
