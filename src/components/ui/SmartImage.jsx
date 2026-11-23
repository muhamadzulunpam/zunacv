import { useState } from 'react';

/**
 * Gambar lokal dengan:
 * - aspect-ratio cadangan (bebas layout shift)
 * - lazy loading
 * - fallback gradien + inisial bila file gagal dimuat
 */
export default function SmartImage({
  src,
  alt = '',
  ratio = '1 / 1',
  width,
  height,
  sizes,
  initials = '',
  className = '',
  imgClassName = '',
  priority = false,
  ...rest
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`img-frame ${className}`} style={{ aspectRatio: ratio }}>
      {/* Lapisan gradien: tampil saat gambar masih muat dan bila file hilang */}
      <div className="img-fallback" aria-hidden={loaded && !failed ? 'true' : undefined}>
        <span>{initials}</span>
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  );
}
