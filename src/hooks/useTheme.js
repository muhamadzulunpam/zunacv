import { useCallback, useState } from 'react';
import { applyTheme, getTheme } from '../utils/theme';

/** State preset + mode yang tersinkron dengan CSS variables dan localStorage. */
export default function useTheme(defaults) {
  const [theme, setTheme] = useState(() => getTheme(defaults));

  const update = useCallback((patch) => {
    setTheme((prev) => {
      const next = { ...prev, ...patch };
      applyTheme(next);
      return next;
    });
  }, []);

  return {
    preset: theme.preset,
    mode: theme.mode,
    setPreset: (preset) => update({ preset }),
    setMode: (mode) => update({ mode }),
    toggleMode: () => update({ mode: theme.mode === 'dark' ? 'light' : 'dark' }),
  };
}
