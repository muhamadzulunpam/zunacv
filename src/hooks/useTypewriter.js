import { useEffect, useState } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Efek mengetik & menghapus bergantian untuk daftar jabatan.
 * Return: { text, wordIndex }
 */
export default function useTypewriter(
  words = [],
  { typeSpeed = 78, deleteSpeed = 38, holdTime = 1700, startDelay = 500 } = {},
) {
  const reduced = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    if (reduced) {
      setText(words[0]);
      return;
    }

    const current = words[wordIndex % words.length];
    let delay = typeSpeed;
    let next = () => {};

    if (!deleting) {
      if (text.length < current.length) {
        next = () => setText(current.slice(0, text.length + 1));
        delay = text.length === 0 ? startDelay : typeSpeed;
      } else {
        next = () => setDeleting(true);
        delay = holdTime;
      }
    } else if (text.length > 0) {
      next = () => setText(current.slice(0, text.length - 1));
      delay = deleteSpeed;
    } else {
      next = () => {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      };
      delay = 240;
    }

    const timer = window.setTimeout(next, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, wordIndex, words, reduced, typeSpeed, deleteSpeed, holdTime, startDelay]);

  return { text, wordIndex };
}
