import { Award, Check, ExternalLink, GraduationCap } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import Timeline from '../components/Timeline';
import { config } from '../config';

export default function Experience() {
  const featured = config.certificates.filter((cert) => cert.featured);
  const others = config.certificates.filter((cert) => !cert.featured);

  return (
    <section id="pengalaman" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Pengalaman"
          title="Jalur yang sudah saya"
          highlight="lewati"
          description="Magang di produk digital, proyek freelance untuk UMKM, dan kepanitiaan kampus. Angka di tiap poin adalah hasil yang benar-benar terukur."
        />

        <div className="mt-10">
          <Timeline items={config.experience} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <article className="card card-pad h-full">
              <p className="eyebrow flex items-center gap-2">
                <GraduationCap size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                Pendidikan
              </p>
              <h3 className="mt-4 text-[1.2rem]">{config.education.degree}</h3>
              <p className="muted mt-1 text-sm font-semibold">{config.education.institution}</p>
              <p className="muted mt-3 text-sm">{config.education.period}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip chip-accent">{config.education.gpa}</span>
                <span className="chip">{config.education.honors}</span>
              </div>
              <p className="muted mt-5 border-t border-[var(--line)] pt-4 text-sm">
                {config.education.thesis}
              </p>
            </article>
          </Reveal>

          <Reveal from="right" delay={90} className="lg:col-span-7">
            <article className="card card-pad h-full">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow flex items-center gap-2">
                  <Award size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  Sertifikat
                </p>
                <span className="chip">{config.certificates.length} tersimpan</span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {featured.map((cert) => (
                  <div
                    key={cert.name}
                    className="rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-2)] p-4"
                  >
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="muted mt-1 text-xs">{cert.issuer}</p>
                    <p className="muted mt-2 text-xs">
                      {cert.year} · ID: {cert.credentialId}
                    </p>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-[var(--accent)]"
                    >
                      Lihat sertifikat
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </div>

              <ul className="mt-4 grid gap-2.5">
                {others.map((cert) => (
                  <li key={cert.name} className="muted flex items-start gap-2 text-sm">
                    <Check size={15} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    <span>
                      {cert.name} — <span className="opacity-80">{cert.issuer}, {cert.year}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
