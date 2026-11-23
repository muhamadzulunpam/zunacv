import { Quote, Star } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { config } from '../config';

export default function Testimonials() {
  return (
    <section id="testimoni" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Rekomendasi"
          title="Kata mereka yang pernah"
          highlight="bekerja dengan saya"
          description="Dosen pembimbing, mentor magang, dan klien UMKM."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 90} className="h-full">
              <figure className="card card-pad card-hover flex h-full flex-col">
                <Quote
                  size={26}
                  aria-hidden="true"
                  style={{ color: 'var(--accent)', opacity: 0.55 }}
                />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed">
                  {item.quote}
                </blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--line)] pt-4">
                  <span
                    className="grid h-10 w-10 flex-none place-items-center rounded-full text-xs font-bold"
                    style={{ backgroundImage: 'var(--brand-gradient)', color: 'var(--on-accent)' }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </span>
                  <figcaption className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{item.name}</span>
                    <span className="muted block truncate text-xs">{item.role}</span>
                  </figcaption>
                </div>
                <div className="mt-3 flex gap-0.5" aria-label={`Penilaian ${item.rating} dari 5`}>
                  {Array.from({ length: item.rating }, (_, star) => (
                    <Star key={star} size={14} fill="currentColor" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  ))}
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
