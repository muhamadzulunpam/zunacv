import useCountUp from '../hooks/useCountUp';
import useReveal from '../hooks/useReveal';

/** Kartu statistik dengan angka menghitung naik saat masuk layar */
export default function StatCard({ value, suffix = '', decimals = 0, label, note }) {
  const [ref, visible] = useReveal({ threshold: 0.4 });
  const { display } = useCountUp(value, { active: visible, decimals, duration: 1400 });

  return (
    <div ref={ref} className="card card-pad card-hover flex flex-col justify-center gap-1 p-5">
      <div className="font-heading gradient-text text-[clamp(1.7rem,4.4vw,2.3rem)] font-bold leading-none">
        {display}
        {suffix}
      </div>
      <div className="mt-1.5 text-sm font-semibold">{label}</div>
      {note ? <div className="muted text-xs">{note}</div> : null}
    </div>
  );
}
