import { useEffect, useState, type ReactNode } from 'react';

export interface ImagemHotspot {
  id: string;
  /** Distância do topo da imagem, em % (0–100). */
  top: number;
  /** Distância da esquerda da imagem, em % (0–100). */
  left: number;
  label: string;
  content: ReactNode;
}

interface ImagemHotspotsProps {
  src: string;
  alt: string;
  hotspots: ImagemHotspot[];
  className?: string;
}

function ImagemHotspots({ src, alt, hotspots, className = '' }: ImagemHotspotsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = hotspots.find((h) => h.id === activeId) ?? null;

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

  return (
    <>
      <div className={`imagem-hotspots${className ? ` ${className}` : ''}`}>
        <img className="imagem-hotspots__foto" src={src} alt={alt} />
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            type="button"
            className="imagem-hotspots__ponto"
            style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
            aria-label={spot.label}
            title={spot.label}
            onClick={() => setActiveId(spot.id)}
          />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setActiveId(null)}
          role="presentation"
        >
          <div
            className="imagem-hotspots__dialog professor-button__dialog bg-white rounded-lg p-8 max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
          >
            <div className="flex justify-end items-center mb-5">
              <button
                type="button"
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold leading-none"
                onClick={() => setActiveId(null)}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <div className="prose max-w-none text-black">{active.content}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImagemHotspots;
