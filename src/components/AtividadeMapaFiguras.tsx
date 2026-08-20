import { useCallback, useRef, useState, type DragEvent } from 'react';

export type FiguraMapaDef = {
  id: string;
  alt: string;
  src: string;
};

export type SlotMapaDef = {
  id: string;
  top: string;
  left: string;
};

type AtividadeMapaFigurasProps = {
  mapaSrc: string;
  mapaAlt: string;
  credito?: string;
  figuras: FiguraMapaDef[];
  slots?: SlotMapaDef[];
  storageKey?: string;
  dicas?: string[];
};

type Placement = Partial<Record<string, string>>;

type State = {
  banco: string[];
  placements: Placement;
};

const DEFAULT_SLOTS: SlotMapaDef[] = [
  { id: 'paz-encontro', top: '28%', left: '20%' },
  { id: 'paz-bacana', top: '28%', left: '50%' },
  { id: 'paz-rosada', top: '28%', left: '85%' },
  { id: 'amizade-encontro', top: '62%', left: '20%' },
  { id: 'amizade-bacana', top: '62%', left: '50%' },
  { id: 'amizade-rosada', top: '62%', left: '85%' },
];

function readStored(storageKey: string | undefined, figuras: FiguraMapaDef[]): State {
  const defaultState: State = {
    banco: figuras.map((f) => f.id),
    placements: {},
  };
  if (!storageKey) return defaultState;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<State>;
    const ids = new Set(figuras.map((f) => f.id));
    return {
      banco: Array.isArray(parsed.banco)
        ? parsed.banco.filter((id): id is string => typeof id === 'string' && ids.has(id))
        : defaultState.banco,
      placements: parsed.placements ?? {},
    };
  } catch {
    return defaultState;
  }
}

function AtividadeMapaFiguras({
  mapaSrc,
  mapaAlt,
  credito,
  figuras,
  slots = DEFAULT_SLOTS,
  storageKey,
  dicas = [],
}: AtividadeMapaFigurasProps) {
  const [state, setState] = useState<State>(() => readStored(storageKey, figuras));
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const draggedIdRef = useRef<string | null>(null);

  const persist = useCallback(
    (next: State) => {
      if (!storageKey) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const figuraById = useCallback(
    (id: string) => figuras.find((f) => f.id === id),
    [figuras],
  );

  const placeFigura = useCallback(
    (targetKey: string | 'banco', figuraId: string) => {
      setState((prev) => {
        const nextPlacements: Placement = { ...prev.placements };
        for (const key of Object.keys(nextPlacements)) {
          if (nextPlacements[key] === figuraId) delete nextPlacements[key];
        }

        let nextBanco = prev.banco.filter((id) => id !== figuraId);

        if (targetKey === 'banco') {
          if (!nextBanco.includes(figuraId)) nextBanco = [...nextBanco, figuraId];
        } else {
          const existing = nextPlacements[targetKey];
          if (existing && existing !== figuraId && !nextBanco.includes(existing)) {
            nextBanco = [...nextBanco, existing];
          }
          nextPlacements[targetKey] = figuraId;
        }

        const next = { banco: nextBanco, placements: nextPlacements };
        persist(next);
        return next;
      });
      setSelectedId(null);
      draggedIdRef.current = null;
    },
    [persist],
  );

  const resolveDragId = (e: DragEvent): string | null => {
    const raw = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text');
    if (raw && figuras.some((f) => f.id === raw)) return raw;
    return draggedIdRef.current;
  };

  const beginDrag = (id: string, e: DragEvent) => {
    draggedIdRef.current = id;
    setSelectedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text', id);
    } catch {
      // ignore
    }
  };

  const renderFigura = (id: string, size: 'banco' | 'slot') => {
    const fig = figuraById(id);
    if (!fig) return null;
    const isSelected = selectedId === id;

    return (
      <div
        key={`${size}-${id}`}
        role="button"
        tabIndex={0}
        className={`mapa-figuras__figura mapa-figuras__figura--${size}${isSelected ? ' is-selected' : ''}`}
        draggable
        aria-label={size === 'slot' ? `Remover ${fig.alt}` : `Arrastar ${fig.alt}`}
        onDragStart={(e) => beginDrag(id, e)}
        onDragEnd={() => {
          draggedIdRef.current = null;
          setDragOverKey(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (size === 'slot') {
            placeFigura('banco', id);
            return;
          }
          setSelectedId((current) => (current === id ? null : id));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (size === 'slot') {
              placeFigura('banco', id);
              return;
            }
            setSelectedId((current) => (current === id ? null : id));
          }
        }}
      >
        <img src={fig.src} alt="" draggable={false} />
      </div>
    );
  };

  const bancoVazio = state.banco.length === 0;

  return (
    <div className="mapa-figuras">
      {dicas.length > 0 ? (
        <ul className="mapa-figuras__dicas list-disc ml-6 mb-4">
          {dicas.map((dica) => (
            <li key={dica} className="mb-2 text-black">
              {dica}
            </li>
          ))}
        </ul>
      ) : null}

      <div
        className={`mapa-figuras__banco${bancoVazio ? ' is-empty' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = resolveDragId(e);
          if (!id) return;
          placeFigura('banco', id);
        }}
      >
        <p>
          {bancoVazio
            ? 'Para tirar uma figura do mapa, é só clicar sobre ela.'
            : `Arraste as figuras para os quadrados brancos do mapa${selectedId ? ' — ou toque no quadrado' : ''}:`}
        </p>
        {state.banco.map((id) => renderFigura(id, 'banco'))}
      </div>

      <div className="mapa-figuras__mapa-wrap">
        <img src={mapaSrc} alt={mapaAlt} className="mapa-figuras__mapa" draggable={false} />
        {slots.map((slot) => {
          const placedId = state.placements[slot.id];
          return (
            <div
              key={slot.id}
              role="button"
              tabIndex={0}
              className={`mapa-figuras__slot${dragOverKey === slot.id ? ' is-over' : ''}${placedId ? ' has-figura' : ''}${selectedId ? ' can-receive' : ''}`}
              style={{ top: slot.top, left: slot.left }}
              aria-label={`Posição ${slot.id}`}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setDragOverKey(slot.id);
              }}
              onDragLeave={() => setDragOverKey((k) => (k === slot.id ? null : k))}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOverKey(null);
                const id = resolveDragId(e);
                if (!id) return;
                placeFigura(slot.id, id);
              }}
              onClick={() => {
                if (selectedId) placeFigura(slot.id, selectedId);
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && selectedId) {
                  e.preventDefault();
                  placeFigura(slot.id, selectedId);
                }
              }}
            >
              {placedId ? renderFigura(placedId, 'slot') : null}
            </div>
          );
        })}
      </div>

      {credito ? <figcaption className="foto-com-credito-legenda">{credito}</figcaption> : null}
    </div>
  );
}

export default AtividadeMapaFiguras;
