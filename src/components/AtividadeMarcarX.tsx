import { useCallback, useRef, useState, type MouseEvent } from 'react';

type Mark = { x: number; y: number };

type AtividadeMarcarXProps = {
  imageSrc: string;
  imageAlt: string;
  credit?: string;
  storageKey?: string;
};

/** Distância máxima (% da menor dimensão) para considerar clique sobre o X */
const HIT_RADIUS_PCT = 4.5;

function readStored(storageKey: string | undefined): Mark | null {
  if (!storageKey) return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Mark>;
    if (typeof parsed.x !== 'number' || typeof parsed.y !== 'number') return null;
    return { x: parsed.x, y: parsed.y };
  } catch {
    return null;
  }
}

function AtividadeMarcarX({ imageSrc, imageAlt, credit, storageKey }: AtividadeMarcarXProps) {
  const wrapRef = useRef<HTMLButtonElement>(null);
  const [mark, setMark] = useState<Mark | null>(() => readStored(storageKey));

  const persist = useCallback(
    (next: Mark | null) => {
      if (!storageKey) return;
      try {
        if (!next) localStorage.removeItem(storageKey);
        else localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      if (mark) {
        const dist = Math.hypot(x - mark.x, y - mark.y);
        if (dist <= HIT_RADIUS_PCT) {
          setMark(null);
          persist(null);
          return;
        }
      }

      const next = { x, y };
      setMark(next);
      persist(next);
    },
    [mark, persist],
  );

  return (
    <div className="atividade-marcar-x my-6">
      <p className="mb-2 text-center text-sm text-slate-600">
        Clique no mapa para marcar o <strong>X</strong> vermelho. Clique de novo sobre o X para remover.
      </p>
      <figure className="foto-com-credito">
        <button
          ref={wrapRef}
          type="button"
          onClick={onClick}
          className="atividade-marcar-x__mapa relative mx-auto block w-full max-w-[336px] overflow-hidden border-0 bg-transparent p-0"
          aria-label="Mapa de ruas: clique para marcar ou remover o X"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="!m-0 !max-w-full block h-auto w-full"
            draggable={false}
          />
          {mark ? (
            <span
              className="atividade-marcar-x__x pointer-events-none absolute font-bold leading-none text-[#ed1c24]"
              style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
              aria-hidden
            >
              ×
            </span>
          ) : null}
        </button>
        {credit ? <figcaption>{credit}</figcaption> : null}
      </figure>
    </div>
  );
}

export default AtividadeMarcarX;
