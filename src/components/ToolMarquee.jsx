import { iconFor } from './ui/icons';

/** Ticker tools berjalan pelan; baris kedua arah sebaliknya. Dijeda saat hover. */
export default function ToolMarquee({ tools = [], rows = 2 }) {
  if (!tools.length) return null;

  return (
    <div className="grid gap-3">
      <p className="sr-only">{`Perangkat yang saya pakai: ${tools.map((tool) => tool.name).join(', ')}.`}</p>
      {Array.from({ length: rows }, (_, rowIndex) => {
        const doubled = [...tools, ...tools];
        return (
          <div className="marquee" key={rowIndex} aria-hidden="true">
            <div
              className={`marquee-track ${rowIndex % 2 === 1 ? 'reverse' : ''}`}
              style={{ animationDuration: `${26 + rowIndex * 6}s` }}
            >
              {doubled.map((tool, index) => {
                const Icon = iconFor(tool.icon);
                return (
                  <span key={`${tool.name}-${index}`} className="chip chip-md whitespace-nowrap">
                    <Icon size={14} style={{ color: 'var(--accent)' }} />
                    {tool.name}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
