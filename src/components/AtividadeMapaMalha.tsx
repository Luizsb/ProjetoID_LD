import { useCallback, useRef, useState, type DragEvent } from 'react';

type FiguraId = 'escola' | 'parque' | 'cinema';

type FiguraDef = {
  id: FiguraId;
  alt: string;
  src: string;
};

type AtividadeMapaMalhaProps = {
  figuras: FiguraDef[];
  storageKey?: string;
  credito?: string;
};

type Placement = Partial<Record<string, FiguraId>>;

type State = {
  banco: FiguraId[];
  placements: Placement;
};

function pontoKey(row: number, col: number): string {
  return `${row}-${col}`;
}

function isFiguraId(value: string): value is FiguraId {
  return value === 'escola' || value === 'parque' || value === 'cinema';
}

function readStored(storageKey: string | undefined, figuras: FiguraDef[]): State {
  const defaultState: State = {
    banco: figuras.map((f) => f.id),
    placements: {},
  };
  if (!storageKey) return defaultState;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<State>;
    return {
      banco: Array.isArray(parsed.banco) ? (parsed.banco as FiguraId[]) : defaultState.banco,
      placements: parsed.placements ?? {},
    };
  } catch {
    return defaultState;
  }
}

function AtividadeMapaMalha({ figuras, storageKey, credito }: AtividadeMapaMalhaProps) {
  const [state, setState] = useState<State>(() => readStored(storageKey, figuras));
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<FiguraId | null>(null);
  const draggedIdRef = useRef<FiguraId | null>(null);

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
    (id: FiguraId) => figuras.find((f) => f.id === id),
    [figuras],
  );

  const placeFigura = useCallback(
    (targetKey: string | 'banco', figuraId: FiguraId) => {
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

  const resolveDragId = (e: DragEvent): FiguraId | null => {
    const raw = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text');
    if (raw && isFiguraId(raw)) return raw;
    return draggedIdRef.current;
  };

  const beginDrag = (id: FiguraId, e: DragEvent) => {
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

  const onDropPonto = (e: DragEvent<HTMLDivElement>, row: number, col: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverKey(null);
    const id = resolveDragId(e);
    if (!id) return;
    placeFigura(pontoKey(row, col), id);
  };

  const onDropBanco = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = resolveDragId(e);
    if (!id) return;
    placeFigura('banco', id);
  };

  const renderFigura = (id: FiguraId, size: 'banco' | 'ponto') => {
    const fig = figuraById(id);
    if (!fig) return null;
    const isSelected = selectedId === id;

    return (
      <div
        key={`${size}-${id}`}
        role="button"
        tabIndex={0}
        className={`figura-arrastavel-p62 figura-arrastavel-p62--${size}${isSelected ? ' is-selected' : ''}`}
        draggable
        aria-label={size === 'ponto' ? `Remover ${fig.alt}` : `Arrastar ${fig.alt}`}
        onDragStart={(e) => beginDrag(id, e)}
        onDragEnd={() => {
          draggedIdRef.current = null;
          setDragOverKey(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (size === 'ponto') {
            placeFigura('banco', id);
            return;
          }
          setSelectedId((current) => (current === id ? null : id));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (size === 'ponto') {
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

  const cells = Array.from({ length: 56 }, (_, i) => i + 1);
  const pontos: Array<{ row: number; col: number }> = [];
  for (let row = 1; row <= 6; row += 1) {
    for (let col = 1; col <= 7; col += 1) {
      pontos.push({ row, col });
    }
  }

  const bancoVazio = state.banco.length === 0;

  return (
    <div className="atividade-mapa-p62">
      <div
        className="banco-figuras-p62"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={onDropBanco}
      >
        <p style={{ textAlign: 'center', fontWeight: 700 }}>
          {bancoVazio
            ? 'Para tirar uma figura da malha, é só clicar sobre ela.'
            : `Arraste as figuras para os pontos azuis${selectedId ? ' — ou toque no ponto azul' : ''}:`}
        </p>
        {state.banco.map((id) => renderFigura(id, 'banco'))}
      </div>

      {credito ? (
        <p
          className="atividade-mapa-p62__credito"
          style={{ textAlign: 'center', fontWeight: 400 }}
        >
          {credito}
        </p>
      ) : null}

      <div className="mapa-grid-p62">
        {cells.map((i) => (
          <div key={i} className="mapa-cell-p62" />
        ))}

        <span className="ponto-partida vitor">↓ Vítor</span>
        <span className="ponto-partida felipe">Felipe ←</span>
        <span className="ponto-partida elisa">↑ Elisa</span>

        <span className="legenda-quadra legenda-horizontal">1 quadra</span>
        <span className="legenda-quadra legenda-vertical">1 quadra</span>

        {pontos.map(({ row, col }) => {
          const key = pontoKey(row, col);
          const placedId = state.placements[key];
          const cellWidth = 100 / 8;
          const cellHeight = 100 / 7;

          return (
            <div
              key={key}
              role="button"
              tabIndex={0}
              aria-label={`Ponto linha ${row}, coluna ${col}`}
              className={`ponto-intersecao${dragOverKey === key ? ' drag-over' : ''}${placedId ? ' has-figura' : ''}${selectedId ? ' can-receive' : ''}`}
              style={{
                left: `${col * cellWidth}%`,
                top: `${row * cellHeight}%`,
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'move';
                setDragOverKey(key);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOverKey(key);
              }}
              onDragLeave={() => setDragOverKey((current) => (current === key ? null : current))}
              onDrop={(e) => onDropPonto(e, row, col)}
              onClick={(e) => {
                e.stopPropagation();
                if (!selectedId) return;
                placeFigura(pontoKey(row, col), selectedId);
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && selectedId) {
                  e.preventDefault();
                  placeFigura(pontoKey(row, col), selectedId);
                }
              }}
            >
              {placedId ? renderFigura(placedId, 'ponto') : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AtividadeMapaMalha;
