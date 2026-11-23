import { ArrowUpRight, Check, GraduationCap, Heart, Layers, PenTool, Search, Sparkles } from 'lucide-react';
import { config } from '../config';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import StatCard from '../components/StatCard';
import { scrollToId } from '../utils/scroll';

const SERVICES = [
  {
    Icon: Layers,
    title: 'Desain antarmuka produk digital',
    desc: 'Web & mobile app: wireframe, UI high-fidelity, sampai komponen siap development.',
  },
  {
    Icon: Search,
    title: 'Riset & usability sederhana',
    desc: 'Wawancara singkat, customer journey, dan uji pemakaian ke 5-10 orang.',
  },
  {
    Icon: PenTool,
    title: 'Identitas visual & materi promosi',
    desc: 'Logo, brand guideline, kemasan, poster, dan konten media sosial.',
  },
];

const STRENGTHS = ['Rapi detail & konsisten', 'Komunikasi jelas ke developer', 'Terbiasa deadline ketat'];

export default function About() {
  return (
    <section id="tentang" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Tentang Saya"
          title="Desain yang enak dilihat,"
          highlight="dan enak dipakai."
          description="Saya menggabungkan dasar visual komunikasi dengan kebiasaan riset kecil: bertanya ke pengguna, merapikan alur, lalu menguji hasil."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="card card-pad h-full">
              <p className="eyebrow flex items-center gap-2">
                <Heart size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                Sedikit tentang saya
              </p>
              <h3 className="mt-4 text-[clamp(1.35rem,3.4vw,1.75rem)]">
                Halo, saya <span className="gradient-text">{config.profile.name.split(' ')[0]}</span> —{' '}
                {config.profile.roles[0]} dari {config.profile.location.split(',')[0]}.
              </h3>
              <div className="mt-4 grid gap-3.5">
                {config.profile.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {STRENGTHS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check size={16} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="chip chip-accent">
                  <GraduationCap size={13} aria-hidden="true" />
                  {config.education.degree}
                </span>
                <span className="chip">{config.education.gpa}</span>
                <span className="chip">{config.education.honors}</span>
              </div>

              <button
                type="button"
                onClick={() => scrollToId('proyek')}
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--accent)]"
              >
                Lihat contoh proyek saya
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </article>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5 sm:grid-cols-2">
            {config.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 70} className="h-full">
                <StatCard {...stat} />
              </Reveal>
            ))}
          </div>

          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 80} className="lg:col-span-4 h-full">
              <article className="card card-pad card-hover h-full">
                <span
                  className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)]"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <service.Icon size={20} aria-hidden="true" />
                </span>
                <h4 className="mt-4 text-[1.06rem]">{service.title}</h4>
                <p className="muted mt-2 text-sm leading-relaxed">{service.desc}</p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={120} className="lg:col-span-12">
            <article
              className="card flex flex-wrap items-center justify-between gap-4 p-5"
              style={{ background: 'var(--accent-soft)' }}
            >
              <p className="flex items-center gap-3 text-sm font-semibold">
                <Sparkles size={18} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                Sedang mencari posisi pertama sebagai UI/UX Designer atau Desainer Produk Junior.
              </p>
              <button
                type="button"
                onClick={() => scrollToId('kontak')}
                className="btn btn-primary btn-sm"
              >
                Ajak Ngobrol
              </button>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
