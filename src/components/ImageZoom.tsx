import { useEffect, useId, useState } from 'react';

interface ImageZoomProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

function ImageZoom({ src, alt, caption, className = '' }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const cycleZoom = () => {
    setScale((current) => (current >= 2.5 ? 1 : Number((current + 0.75).toFixed(2))));
  };

  return (
    <>
      <figure className={`imagem-zoom ${className}`.trim()}>
        <button
          type="button"
          className="imagem-zoom__abrir"
          onClick={() => setIsOpen(true)}
          aria-label={`Ampliar imagem: ${alt}`}
        >
          <img src={src} alt={alt} />
        </button>
        {caption ? <figcaption className="legenda-imagem">{caption}</figcaption> : null}
      </figure>

      {isOpen ? (
        <div className="imagem-zoom__overlay" role="presentation">
          <button
            type="button"
            className="imagem-zoom__fundo"
            aria-label="Fechar imagem"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="imagem-zoom__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <p id={titleId} className="sr-only">
              {alt}
            </p>
            <button
              type="button"
              className="imagem-zoom__fechar"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <div className="imagem-zoom__palco">
              <button
                type="button"
                className="imagem-zoom__ampliada"
                onClick={cycleZoom}
                aria-label={scale > 1 ? 'Reduzir zoom' : 'Aumentar zoom'}
                style={{ cursor: scale > 1 ? 'zoom-out' : 'zoom-in' }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{ transform: `scale(${scale})` }}
                />
              </button>
            </div>
            {caption ? (
              <p className="imagem-zoom__caption">{caption}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ImageZoom;
