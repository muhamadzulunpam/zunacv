import { Menu, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';
import useScrollProgress from '../hooks/useScrollProgress';
import { NAV_ITEMS, SECTION_IDS, goToSection } from '../utils/navigation';
import { config } from '../config';
import Button from './ui/Button';

export default function Navbar({ onOpenMenu, menuOpen }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { y } = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);
  const scrolled = y > 14 || pathname !== '/';

  const handle = (id) => goToSection(id, navigate, pathname);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container-x flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handle('beranda')}
          className="flex items-center gap-2.5 rounded-full"
          aria-label="Ke bagian atas"
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-xl font-heading text-[0.8rem] font-bold"
            style={{ backgroundImage: 'var(--brand-gradient)', color: 'var(--on-accent)' }}
          >
            {config.profile.initials}
          </span>
          <span className="hidden text-[0.95rem] font-semibold sm:block">
            {config.profile.name.split(' ')[0]}
            <span className="muted font-normal"> / CV</span>
          </span>
        </button>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handle(item.id)}
              className={`nav-link ${active === item.id && pathname === '/' ? 'is-active' : ''}`}
              aria-current={active === item.id && pathname === '/' ? 'true' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            href={config.links.cv}
            download={config.links.cvFileName}
          >
            <Download size={16} aria-hidden="true" />
            Unduh CV
          </Button>
          <button
            type="button"
            className="btn btn-icon lg:hidden"
            onClick={onOpenMenu}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
