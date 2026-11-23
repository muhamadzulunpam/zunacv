import { Zap } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import SkillBar from '../components/SkillBar';
import ToolMarquee from '../components/ToolMarquee';
import useReveal from '../hooks/useReveal';
import { config } from '../config';

const WORKFLOW = [
  { step: '01', title: 'Pahami masalah', desc: 'Brief, tujuan bisnis, dan siapa penggunanya.' },
  { step: '02', title: 'Petakan alur', desc: 'Customer journey & wireframe kasar.' },
  { step: '03', title: 'Rancang visual', desc: 'High fidelity di Figma dengan design token.' },
  { step: '04', title: 'Uji & serahkan', desc: 'Usability test singkat, lalu handoff rapi.' },
];

export default function Skills() {
  const [ref, visible] = useReveal({ threshold: 0.22 });

  return (
    <section id="keahlian" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Keahlian"
          title="Yang bisa saya"
          highlight="kerjakan"
          description="Angka di bawah ini penilaian jujur berdasarkan latihan, proyek kuliah, dan pekerjaan nyata — bukan klaim tanpa bukti."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="card card-pad h-full">
              <p className="eyebrow mb-6">Skill bar</p>
              <ul ref={ref} className="grid gap-5 sm:grid-cols-2 sm:gap-x-8">
                {config.skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} active={visible} />
                ))}
              </ul>
              <p className="muted mt-6 text-xs">
                Di luar desain, saya terbiasa memakai Notion untuk dokumentasi dan Miro untuk sesi ideasi.
              </p>
            </article>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            <Reveal from="right" delay={90}>
              <article className="card card-pad">
                <p className="eyebrow mb-4 flex items-center gap-2">
                  <Zap size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  Perangkat harian
                </p>
                <ToolMarquee tools={config.tools} rows={2} />
              </article>
            </Reveal>

            <Reveal from="right" delay={160}>
              <article className="card card-pad h-full">
                <p className="eyebrow mb-4">Alur kerja saya</p>
                <ol className="grid gap-4">
                  {WORKFLOW.map((item) => (
                    <li key={item.step} className="flex gap-3">
                      <span
                        className="font-heading mt-0.5 h-8 w-8 flex-none rounded-[var(--r-sm)] text-[0.78rem] font-bold"
                        style={{
                          background: 'var(--accent-soft)',
                          color: 'var(--accent)',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        {item.step}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{item.title}</span>
                        <span className="muted block text-sm">{item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
