import { Heart, QrCode } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, goToSection } from '../utils/navigation';
import { config } from '../config';
import { currentYear } from '../utils/format';
import { iconFor } from '../components/ui/icons';

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <footer className="border-t border-[var(--line)] pb-8 pt-12">
      <div className="container-x">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] text-[0.8rem] font-bold"
                style={{ backgroundImage: 'var(--brand-gradient)', color: 'var(--on-accent)' }}
                aria-hidden="true"
              >
                {config.profile.initials}
              </span>
              <span className="font-heading text-[1.05rem] font-bold">{config.profile.name}</span>
            </div>
            <p className="muted mt-3 max-w-sm text-sm">{config.footer.note}</p>
            <Link
              to="/qr"
              className="btn btn-ghost btn-sm mt-4 inline-flex"
            >
              <QrCode size={15} aria-hidden="true" />
              Kartu nama digital &amp; QR
            </Link>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="eyebrow mb-3">Halaman ini</p>
            <ul className="grid gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(item.id, navigate, pathname)}
                    className="muted text-sm transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-3">Ikuti saya</p>
            <ul className="flex flex-wrap gap-2">
              {config.socials.map((social) => {
                const Icon = iconFor(social.icon);
                return (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-icon btn-icon-sm"
                      aria-label={social.label}
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="muted mt-4 text-sm">{config.contact.email}</p>
            <p className="muted text-sm">{config.contact.whatsappLabel}</p>
          </div>
        </div>

        <div className="muted mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6 text-xs">
          <p>
            © {currentYear()} {config.profile.name}. Semua hak cipta atas karya sesuai masing-masing
            pemilik proyek.
          </p>
          <p className="flex items-center gap-1.5">
            <Heart size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <a
              href={config.footer.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors hover:text-[var(--accent)]"
            >
              {config.footer.credit}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
