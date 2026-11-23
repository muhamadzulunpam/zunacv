import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';
import { formatNumber } from '../utils/format';

/**
 * Angka menghitung naik saat aktif (dipakai statistik & persentase keahlian).
 * Bila preferensi reduced-motion aktif, langsung tampil nilai akhir.
 */
export default function useCountUp(target = 0, { active = true, duration = 1500, decimals = 0 } = {}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const running = useRef(false);

  useEffect(() => {
    if (!active || running.current) return;
    running.current = true;

    if (reduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
      else setValue(target);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduced]);

  return { value, display: formatNumber(value, decimals) };
}
