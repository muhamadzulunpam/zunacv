import useReveal from '../../hooks/useReveal';

/**
 * Pembungkus animasi muncul saat discroll.
 * from: 'up' | 'left' | 'right' | 'none'
 */
export default function Reveal({
  as: Tag = 'div',
  from = 'up',
  delay = 0,
  className = '',
  once = true,
  children,
  ...rest
}) {
  const [ref, visible] = useReveal({ once });
  const positionClass =
    from === 'left' ? 'reveal-from-left' : from === 'right' ? 'reveal-from-right' : '';

  return (
    <Tag
      ref={ref}
      className={`reveal ${positionClass} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
