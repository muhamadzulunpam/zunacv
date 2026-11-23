import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Mail,
  Phone,
  Printer,
  QrCode,
  Smartphone,
} from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import SmartImage from '../components/ui/SmartImage';
import { iconFor } from '../components/ui/icons';
import { config } from '../config';
import { copyText } from '../utils/whatsapp';
import { siteUrl } from '../utils/scroll';

const TIPS = [
  'Tempel tautan ini di bio Instagram, LinkedIn, atau CV PDF Anda.',
  'Pindai dengan kamera HP untuk membuka CV online tanpa mengetik alamat.',
  'Cetak lembar ini lalu gunting bagian kartu 85 x 55 mm sebagai kartu nama.',
];

export default function QrPage() {
  const url = siteUrl(config.share.url);
  const exportCanvas = useRef(null);
  const [copied, setCopied] = useState(false);

  const fileName = `QR-CV-${config.profile.name.replace(/\s+/g, '-')}.png`;

  const handleCopy = async () => {
    const ok = await copyText(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    const canvas = exportCanvas.current || document.querySelector('.qr-sheet canvas');
    if (!canvas || typeof canvas.toDataURL !== 'function') return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-page pt-[calc(var(--nav-h)+34px)]">
      <div className="container-x pb-16">
        <Reveal>
          <Link
            to="/"
            className="muted inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke beranda
          </Link>
        </Reveal>

        <SectionHeading
          className="mt-6"
          eyebrow="Fitur Bonus"
          title="Kartu nama digital &"
          highlight="QR code"
          description="Satu QR code untuk seluruh CV online ini. Siap diunduh, dicetak, atau dibagikan."
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Lembar siap cetak */}
          <Reveal from="left">
            <section className="qr-sheet card card-pad" aria-label="Lembar QR siap cetak">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow flex items-center gap-2">
                    <QrCode size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    CV + Portfolio Online
                  </p>
                  <h2 className="mt-2 text-[1.45rem]">{config.profile.name}</h2>
                  <p className="muted text-sm">{config.profile.roles[0]}</p>
                </div>
                <SmartImage
                  src={config.profile.photo}
                  alt={config.profile.photoAlt}
                  ratio="1 / 1"
                  width={96}
                  height={96}
                  sizes="96px"
                  initials={config.profile.initials}
                  className="h-16 w-16 flex-none rounded-[var(--r-sm)]"
                />
              </div>

              <div className="mt-6 grid place-items-center rounded-[var(--r-lg)] bg-white p-6">
                <QRCodeCanvas
                  ref={(node) => {
                    exportCanvas.current = node;
                  }}
                  value={url}
                  size={480}
                  level="M"
                  marginSize={3}
                  bgColor="#ffffff"
                  fgColor="#111118"
                  style={{ width: 'min(230px, 62vw)', height: 'auto' }}
                  title={`QR code ke ${url}`}
                />
              </div>

              <p className="mt-4 text-center font-mono text-[0.8rem] break-all">{url}</p>
              <p className="muted mt-1 text-center text-sm">{config.share.caption}</p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
                <span className="flex items-center gap-1.5">
                  <Phone size={13} aria-hidden="true" />
                  {config.contact.whatsappLabel}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={13} aria-hidden="true" />
                  {config.contact.email}
                </span>
                {config.socials.slice(0, 2).map((social) => {
                  const Icon = iconFor(social.icon);
                  return (
                    <span key={social.id} className="flex items-center gap-1.5">
                      <Icon size={13} />
                      {social.handle}
                    </span>
                  );
                })}
              </div>

              <p className="muted mt-6 border-t border-[var(--line)] pt-4 text-center text-[0.7rem]">
                Ukuran cetak: A4 portrait · kartu nama 85 x 55 mm
              </p>
            </section>
          </Reveal>

          {/* Kontrol & panduan */}
          <div className="grid gap-4 hide-print">
            <Reveal from="right">
              <article className="card card-pad">
                <p className="eyebrow mb-4">Aksi</p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <Button variant="primary" onClick={handleDownload}>
                    <Download size={16} aria-hidden="true" />
                    Unduh QR (PNG)
                  </Button>
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer size={16} aria-hidden="true" />
                    Cetak lembar
                  </Button>
                  <Button variant="ghost" onClick={handleCopy}>
                    {copied ? (
                      <Check size={16} aria-hidden="true" />
                    ) : (
                      <Copy size={16} aria-hidden="true" />
                    )}
                    {copied ? 'Tautan tersalin' : 'Salin tautan'}
                  </Button>
                  <Button variant="ghost" onClick={() => window.open(url, '_blank', 'noopener')}>
                    <Smartphone size={16} aria-hidden="true" />
                    Buka di tab baru
                  </Button>
                </div>
                {copied ? (
                  <p className="mt-4 text-sm" style={{ color: 'var(--accent)' }} aria-live="polite">
                    Tautan website sudah disalin ke papan klip.
                  </p>
                ) : null}
              </article>
            </Reveal>

            <Reveal from="right" delay={90}>
              <article className="card card-pad">
                <p className="eyebrow mb-4">Cara pakai</p>
                <ol className="grid gap-3">
                  {TIPS.map((tip, index) => (
                    <li key={tip} className="flex gap-3 text-sm">
                      <span
                        className="grid h-6 w-6 flex-none place-items-center rounded-full text-[0.7rem] font-bold"
                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="muted">{tip}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>

            <Reveal from="right" delay={150}>
              <article className="card card-pad" style={{ background: 'var(--accent-softer)' }}>
                <p className="text-sm font-semibold">Sedang di HP?</p>
                <p className="muted mt-1 text-sm">
                  Pindai QR di layar lain, atau cukup bagikan tautan ini lewat WhatsApp — tampilannya
                  sudah menyesuaikan layar kecil.
                </p>
              </article>
            </Reveal>
          </div>
        </div>

        {/* Pratinjau kartu nama digital */}
        <h3 className="font-heading mt-12 text-[1.3rem]">Pratinjau kartu nama digital</h3>
        <p className="muted mt-2 text-sm">
          Tampilan kartu yang memuat QR di atas — bisa dipakai untuk cetak atau dibagikan sebagai
          gambar.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <article
              className="relative flex aspect-[85/55] flex-col justify-between overflow-hidden rounded-[var(--r-lg)] p-5"
              style={{ backgroundImage: 'var(--brand-gradient)', color: 'var(--on-accent)' }}
            >
              <div className="flex items-center gap-3">
                <SmartImage
                  src={config.profile.photo}
                  alt=""
                  ratio="1 / 1"
                  width={56}
                  height={56}
                  sizes="56px"
                  initials={config.profile.initials}
                  className="h-12 w-12 flex-none rounded-full ring-2 ring-white/60"
                />
                <div>
                  <p className="font-heading text-[1.05rem] font-bold leading-tight">
                    {config.profile.name}
                  </p>
                  <p className="text-xs opacity-90">{config.profile.roles[0]}</p>
                </div>
              </div>
              <div className="text-[0.68rem] leading-snug opacity-95">
                <p>{config.contact.whatsappLabel}</p>
                <p>{config.contact.email}</p>
                <p className="mt-1 font-semibold tracking-wide uppercase opacity-80">
                  {config.profile.location}
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <article className="card flex aspect-[85/55] flex-col items-center justify-center gap-3 p-5 text-center">
              <QRCodeCanvas
                value={url}
                size={112}
                level="M"
                marginSize={2}
                bgColor="#ffffff"
                fgColor="#111118"
                style={{ width: 96, height: 96 }}
              />
              <p className="text-xs font-semibold">Pindai untuk membuka CV</p>
              <p className="muted text-[0.65rem]">{config.footer.credit}</p>
            </article>
          </Reveal>

          <Reveal delay={160}>
            <article className="card flex aspect-[85/55] flex-col justify-between p-5">
              <div>
                <p className="eyebrow">Belum selesai?</p>
                <p className="font-heading mt-2 text-[1.05rem] font-bold leading-snug">
                  {config.profile.tagline}
                </p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {config.socials.map((social) => (
                  <li key={social.id} className="chip text-[0.62rem]">
                    {social.label}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
