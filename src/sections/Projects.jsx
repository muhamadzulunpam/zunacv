import { useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink, FolderOpen, Layers } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import ProjectModal from '../components/ProjectModal';
import { config } from '../config';

function ProjectCard({ project, index, onOpen }) {
  const isWide = Boolean(project.wide);

  return (
    <Reveal
      delay={index * 70}
      className={`h-full ${isWide ? 'lg:col-span-2' : ''}`}
    >
      <article className="card card-hover group h-full overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className={`block h-full w-full text-left ${isWide ? 'lg:grid lg:grid-cols-2 lg:items-center' : ''}`}
          aria-haspopup="dialog"
          aria-label={`Buka detail proyek ${project.title}`}
        >
          <div className="relative overflow-hidden">
            <SmartImage
              src={project.thumbnail}
              alt={project.alt}
              ratio={isWide ? '16 / 10' : '4 / 3'}
              width={600}
              height={isWide ? 375 : 450}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 34vw"
              initials={project.title.slice(0, 2).toUpperCase()}
              imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: 'linear-gradient(to top, rgba(8,6,20,.55), transparent 62%)' }}
              aria-hidden="true"
            />
            <span
              className="btn btn-primary btn-sm absolute bottom-4 right-4 translate-y-2 opacity-100 transition duration-300 md:translate-y-0 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
              aria-hidden="true"
            >
              Lihat Proyek
            </span>
          </div>

          <div className="card-pad">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-accent">{project.category}</span>
              <span className="muted text-xs">{project.year}</span>
            </div>
            <h3 className={`mt-3 ${isWide ? 'text-[1.3rem]' : 'text-[1.12rem]'}`}>{project.title}</h3>
            <p className="muted mt-2 line-clamp-3 text-sm leading-relaxed">{project.summary}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
              <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                Detail
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </div>
          </div>
        </button>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(config.projects.map((project) => project.category)));
    return ['Semua', ...unique];
  }, []);
  const [active, setActive] = useState('Semua');
  const [opened, setOpened] = useState(null);

  const list = active === 'Semua'
    ? config.projects
    : config.projects.filter((project) => project.category === active);

  return (
    <section id="proyek" className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Proyek Pilihan"
            title="Karya yang bisa Anda"
            highlight="buka sekarang"
            description="Klik kartu proyek untuk melihat peran saya, hasil terukur, dan tautan karyanya."
          />
          <Reveal delay={120} className="hidden lg:block">
            <p className="muted flex items-center gap-2 text-sm">
              <Layers size={16} style={{ color: 'var(--accent)' }} aria-hidden="true" />
              {config.projects.length} proyek · {categories.length - 1} kategori
            </p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter kategori proyek">
            {categories.map((category) => {
              const isActive = category === active;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  className={`chip transition ${isActive ? 'chip-accent' : 'hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setOpened} />
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              href="https://www.behance.net/nazlasofiah"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FolderOpen size={16} aria-hidden="true" />
              Portfolio lengkap
              <ExternalLink size={14} aria-hidden="true" />
            </Button>
            <p className="muted text-sm">Butuh contoh lain? Saya kirim file aslinya lewat WhatsApp.</p>
          </div>
        </Reveal>
      </div>

      {opened ? <ProjectModal project={opened} onClose={() => setOpened(null)} /> : null}
    </section>
  );
}
