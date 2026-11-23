import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { iconFor } from '../components/ui/icons';
import { config } from '../config';
import { buildContactMessage, buildIntroMessage, copyText, mailtoUrl, waUrl } from '../utils/whatsapp';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const preview = buildContactMessage(form, config.profile.name.split(' ')[0]);

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = waUrl(config.contact.whatsapp, preview);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const handleCopy = async () => {
    const ok = await copyText(config.contact.email);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="kontak" className="section">
      <div className="container-x">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Kontak"
              title="Ada posisi atau proyek yang"
              highlight="cocok?"
              description="Balasan saya biasanya kurang dari 1x24 jam. Paling cepat lewat WhatsApp."
            />

            <Reveal delay={80}>
              <div className="card card-pad mt-7">
                <p className="eyebrow flex items-center gap-2">
                  <MapPin size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  Kanal langsung
                </p>

                <ul className="mt-4 grid gap-2.5">
                  <li>
                    <a
                      href={waUrl(config.contact.whatsapp, buildIntroMessage(config.profile.name.split(' ')[0]))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-2)] p-3.5 transition hover:border-[var(--accent)]"
                    >
                      <span
                        className="grid h-10 w-10 flex-none place-items-center rounded-[var(--r-sm)]"
                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                      >
                        <Phone size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">WhatsApp</span>
                        <span className="muted block truncate text-xs">
                          {config.contact.whatsappLabel}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={17}
                        className="muted flex-none transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>

                  <li className="flex items-center gap-2">
                    <a
                      href={mailtoUrl(config.contact.email, `Lamaran / kerja sama — ${config.profile.name}`)}
                      className="group flex min-w-0 flex-1 items-center gap-3 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-2)] p-3.5 transition hover:border-[var(--accent)]"
                    >
                      <span
                        className="grid h-10 w-10 flex-none place-items-center rounded-[var(--r-sm)]"
                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                      >
                        <Mail size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">Email</span>
                        <span className="muted block truncate text-xs">{config.contact.email}</span>
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="btn btn-icon flex-none"
                      aria-label={copied ? 'Email sudah disalin' : 'Salin alamat email'}
                    >
                      {copied ? (
                        <Check size={17} aria-hidden="true" />
                      ) : (
                        <Copy size={17} aria-hidden="true" />
                      )}
                    </button>
                  </li>

                  {config.socials.map((social) => {
                    const Icon = iconFor(social.icon);
                    return (
                      <li key={social.id}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-2)] p-3.5 transition hover:border-[var(--accent)]"
                        >
                          <span
                            className="grid h-10 w-10 flex-none place-items-center rounded-[var(--r-sm)]"
                            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                          >
                            <Icon size={18} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">{social.label}</span>
                            <span className="muted block truncate text-xs">{social.handle}</span>
                          </span>
                          <ArrowUpRight
                            size={17}
                            className="muted flex-none transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <p
                  className="mt-5 flex items-center gap-2 rounded-[var(--r-md)] p-3 text-sm"
                  style={{ background: 'var(--accent-softer)' }}
                >
                  <span className="dot-live animate-pulse-dot" aria-hidden="true" />
                  {config.profile.availability} · {config.profile.location}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal from="right" delay={120} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="card card-pad h-full" noValidate={false}>
              <p className="eyebrow flex items-center gap-2">
                <MessageCircle size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                Kirim pesan singkat
              </p>
              <h3 className="mt-4 text-[1.35rem]">Isi 3 kolom, tombol langsung buka WhatsApp</h3>
              <p className="muted mt-2 text-sm">
                Pesan otomatis terformat rapi, jadi Anda tidak perlu mengetik ulang saat ingin
                mengirim lamaran atau menanyakan sesuatu.
              </p>

              <div className="mt-6 grid gap-x-4 sm:grid-cols-2">
                <div className="field">
                  <label className="field-label" htmlFor="nama">
                    Nama lengkap
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    className="field-input"
                    type="text"
                    required
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Nama Anda"
                    value={form.name}
                    onChange={update('name')}
                  />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="field-input"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nama@perusahaan.com"
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="pesan">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  className="field-input"
                  required
                  maxLength={600}
                  placeholder="Contoh: selamat pagi, kami ingin mengundang interview untuk posisi UI Designer..."
                  value={form.message}
                  onChange={update('message')}
                />
              </div>

              <div className="mb-5 rounded-[var(--r-md)] border border-dashed border-[var(--line-strong)] p-4">
                <p className="eyebrow mb-2">Pratinjau pesan WhatsApp</p>
                <pre className="muted overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                  {preview}
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" type="submit" size="lg">
                  <Send size={17} aria-hidden="true" />
                  Kirim lewat WhatsApp
                </Button>
                <Button variant="outline" href={mailtoUrl(config.contact.email, 'Halo')} >
                  Lewat email
                </Button>
              </div>

              <p aria-live="polite" className="mt-4 text-sm" style={{ color: 'var(--accent)' }}>
                {sent
                  ? 'WhatsApp terbuka di tab baru. Kalau tidak terbuka, izinkan pop-up pada browser Anda.'
                  : ''}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
