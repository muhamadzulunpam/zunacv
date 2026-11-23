import useScrollProgress from '../hooks/useScrollProgress';

/** Garis progres baca di paling atas halaman */
export default function ScrollProgressBar() {
  const { progress } = useScrollProgress();

  return (
    <div
      className="fixed left-0 top-0 z-[85] h-[3px] w-full"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <div
        className="h-full origin-left"
        style={{
          width: `${progress}%`,
          backgroundImage: 'var(--brand-gradient)',
          transition: 'width 0.12s linear',
        }}
      />
    </div>
  );
}
