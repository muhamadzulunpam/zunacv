/**
 * Ikon brand (SVG inline) + peta nama ikon -> komponen.
 * lucide-react v1 tidak lagi menyertakan ikon brand, jadi mark brand ditulis manual.
 */
import {
  BookOpen,
  Brush,
  Code2,
  Film,
  Layers,
  Palette,
  PenTool,
  Phone,
  Sparkles,
  StickyNote,
} from 'lucide-react';

const svgProps = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
  focusable: 'false',
});

export function LinkedInIcon({ size = 20, className = '' }) {
  return (
    <svg {...svgProps(size)} className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.2 9.2h3.6V21H3.2V9.2Zm6.1 0h3.45v1.62h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.4 4.33 5.53V21h-3.6v-5.98c0-1.43-.03-3.27-2-3.27-2.02 0-2.33 1.57-2.33 3.2V21H9.3V9.2Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg {...svgProps(size)} className={className} fill="currentColor" fillRule="evenodd">
      <path d="M7.2 2.4h9.6a4.8 4.8 0 0 1 4.8 4.8v9.6a4.8 4.8 0 0 1-4.8 4.8H7.2a4.8 4.8 0 0 1-4.8-4.8V7.2a4.8 4.8 0 0 1 4.8-4.8Zm0 2a2.8 2.8 0 0 0-2.8 2.8v9.6a2.8 2.8 0 0 0 2.8 2.8h9.6a2.8 2.8 0 0 0 2.8-2.8V7.2a2.8 2.8 0 0 0-2.8-2.8H7.2ZM12 6.9a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2Zm0 2a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-3.3a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  );
}

export function GitHubIcon({ size = 20, className = '' }) {
  return (
    <svg {...svgProps(size)} className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function BehanceIcon({ size = 20, className = '' }) {
  return (
    <svg {...svgProps(size)} className={className} fill="currentColor" fillRule="evenodd">
      <path d="M2.6 4.6h5.9c2 0 3.4 1 3.4 2.6 0 1-.5 1.8-1.4 2.2 1.2.4 2 1.4 2 2.9 0 2.3-1.8 3.4-4.2 3.4H2.6V4.6Zm2.3 4h3.2c.9 0 1.5-.5 1.5-1.3s-.6-1.2-1.5-1.2H4.9v2.5Zm0 5.5h3.3c1.1 0 1.8-.6 1.8-1.5s-.7-1.5-1.8-1.5H4.9v3ZM16.1 6.2h5.1v1.3h-5.1V6.2Zm2.5 3c2.4 0 3.9 1.8 3.6 4.4h-6.1c.2 1.1.9 1.8 1.9 1.8.9 0 1.5-.4 1.8-1h2c-.4 1.8-1.9 2.8-3.8 2.8-2.5 0-4.2-1.7-4.2-4.1s1.7-3.9 4.2-3.9c.2 0 .4 0 .6 0Zm-2.3 3.3h4.3c-.2-1.1-.9-1.9-2-1.9s-2 .7-2.3 1.9Z" />
    </svg>
  );
}

export function FigmaIcon({ size = 20, className = '' }) {
  return (
    <svg {...svgProps(size)} className={className} fill="currentColor">
      <rect x="6" y="2.6" width="6" height="4.7" rx="2.35" />
      <rect x="6" y="8.3" width="6" height="4.7" rx="2.35" />
      <rect x="6" y="14" width="6" height="4.7" rx="2.35" />
      <rect x="12" y="2.6" width="6" height="4.7" rx="2.35" />
      <circle cx="15" cy="10.65" r="2.35" />
    </svg>
  );
}

/** Field `icon` di config.js merujuk ke nama di bawah ini. */
const MAP = {
  whatsapp: Phone,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  github: GitHubIcon,
  behance: BehanceIcon,
  mail: Sparkles,
  figma: FigmaIcon,
  pen: PenTool,
  brush: Brush,
  film: Film,
  sparkles: Sparkles,
  palette: Palette,
  layers: Layers,
  sticky: StickyNote,
  book: BookOpen,
  code: Code2,
};

export function iconFor(name) {
  const Icon = MAP[name];
  return Icon || Sparkles;
}

export default iconFor;
