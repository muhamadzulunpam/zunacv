import useCountUp from '../hooks/useCountUp';

/** Satu baris keahlian: nama, persen, dan batang yang terisi saat discroll */
export default function SkillBar({ skill, index, active }) {
  const { display } = useCountUp(skill.level, { active, duration: 1200 });

  return (
    <li>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="flex items-baseline gap-2">
          <span className="font-semibold">{skill.name}</span>
          <span className="muted text-xs">{skill.group}</span>
        </span>
        <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
          {display}%
        </span>
      </div>
      <div
        className="skill-track"
        role="progressbar"
        aria-label={`Keahlian ${skill.name}`}
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`skill-fill ${active ? 'is-on' : ''}`}
          style={{ '--level': `${skill.level}%`, '--reveal-delay': `${index * 90}ms` }}
        />
      </div>
    </li>
  );
}
