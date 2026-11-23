import { useEffect } from 'react';
import { X, QrCode, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, goToSection } from '../utils/navigation';
import { waUrl } from '../utils/whatsapp';
import { config } from '../config';
import Button from './ui/Button';

export default function MobileMenu({ onClose }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu navigasi">
      <div className="absolute right-5 top-5 flex items-center gap-2">
        <a
          href={config.links.cv}
          download={config.links.cvFileName}
          className="btn btn-ghost btn-sm"
          onClick={onClose}
        >
          <Download size={15} aria-hidden="true" />
          CV
        </a>
        <button type="button" className="btn btn-icon" onClick={onClose} aria-label="Tutup menu">
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <p className="eyebrow mb-2">Navigasi</p>
      <nav aria-label="Navigasi utama" className="flex flex-col">
        {NAV_ITEMS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="mobile-link"
            style={{ animationDelay: `${index * 55}ms` }}
            onClick={() => {
              onClose();
              goToSection(item.id, navigate, pathname);
            }}
          >
            {item.label}
            <span className="muted text-sm font-normal">0{index + 1}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto grid gap-3 pt-8">
        <Button
          variant="outline"
          onClick={() => {
            onClose();
            navigate('/qr');
          }}
        >
          <QrCode size={17} aria-hidden="true" />
          Kartu nama & QR
        </Button>
        <Button
          variant="primary"
          href={waUrl(config.contact.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi via WhatsApp
        </Button>
      </div>
    </div>
  );
}
