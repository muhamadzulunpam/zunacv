import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import ScrollProgressBar from './ScrollProgressBar';
import BackToTop from './BackToTop';
import StylePanel from './StylePanel';
import Footer from '../sections/Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Setiap pindah rute kembali ke posisi paling atas
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <ScrollProgressBar />
      <Navbar onOpenMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
      {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
      <main id="konten">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <StylePanel />
    </>
  );
}
