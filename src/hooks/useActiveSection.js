import { useEffect, useState } from 'react';

/** Menandai bagian yang sedang dilihat (untuk highlight tautan navbar). */
export default function useActiveSection(ids = [], offset = 130) {
  const [active, setActive] = useState(ids[0] || '');

  useEffect(() => {
    if (!ids.length) return;
    let ticking = false;

    const update = () => {
      let current = ids[0];
      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        if (node.getBoundingClientRect().top - offset <= 0) current = id;
      });
      // Bila sudah di dasar halaman, anggap bagian terakhir yang aktif
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = ids[ids.length - 1];
      }
      setActive(current);
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
  }, [ids, offset]);

  return active;
}
