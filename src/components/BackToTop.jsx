import { ArrowUp } from 'lucide-react';
import useScrollProgress from '../hooks/useScrollProgress';
import { scrollToTop } from '../utils/scroll';

export default function BackToTop() {
  const { y } = useScrollProgress();
  const show = y > 480;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="btn btn-icon fixed z-[74]"
      style={{
        right: 76,
        bottom: 20,
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'none' : 'translateY(10px)',
        transition: 'opacity .3s var(--ease-out), transform .3s var(--ease-out)',
      }}
      aria-label="Kembali ke atas"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={19} aria-hidden="true" />
    </button>
  );
}
