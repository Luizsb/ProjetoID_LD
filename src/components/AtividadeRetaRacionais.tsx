import { useCallback, useEffect, useMemo, useState, type DragEvent, type ReactNode } from 'react';
import AreaDesenho from './AreaDesenho';

type Marker = {
  id: string;
  label: ReactNode;
  /** posição correta de -4 a 4 (visão do professor) */
  value: number;
  /** alterna rótulo acima/abaixo na solução */
  stack: 'up' | 'down';
};

const NUMEROS: Marker[] = [
  { id: 'm35', label: '−3,5', value: -3.5, stack: 'down' },
  { id: 'm125', label: '−1,25', value: -1.25, stack: 'down' },
  { id: 'm1_2', label: <span className="fracao"><span>−1</span><span>2</span></span>, value: -0.5, stack: 'down' },
  { id: 'm1_4', label: <span className="fracao"><span>−1</span><span>4</span></span>, value: -0.25, stack: 'up' },
  { id: 'p2_3', label: <span className="fracao"><span>2</span><span>3</span></span>, value: 2 / 3, stack: 'down' },
  { id: 'p145', label: <>1,4<span className="dizima-barra">5</span></>, value: 1.455555, stack: 'up' },
  { id: 'p10_4', label: <span className="fracao"><span>10</span><span>4</span></span>, value: 2.5, stack: 'down' },
  { id: 'p375', label: '3,75', value: 3.75, stack: 'down' },
];

type Placement = { x: number; y: number };

type PlacementMap = Record<string, Placement>;

type AtividadeRetaRacionaisProps = {
  storageKey?: string;
  showResults?: boolean;
};

function markersKey(storageKey: string) {
  return `${storageKey}_markers`;
}

function loadPlacements(storageKey: string): PlacementMap {
  try {
    const raw = localStorage.getItem(markersKey(storageKey));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as PlacementMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function valueToPercent(value: number): number {
  // margem lateral ~6% em cada lado (como uma reta desenhada)
  return 6 + ((value + 4) / 8) * 88;
}

function AtividadeRetaRacionais({
  storageKey = 'ch1_q12_reta',
  showResults = false,
}: AtividadeRetaRacionaisProps) {
  const [placements, setPlacements] = useState<PlacementMap>(() => loadPlacements(storageKey));
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    setPlacements(loadPlacements(storageKey));
  }, [storageKey]);

  const persist = useCallback(
    (next: PlacementMap) => {
      setPlacements(next);
      try {
        localStorage.setItem(markersKey(storageKey), JSON.stringify(next));
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const teacherPlacements = useMemo(() => {
    const next: PlacementMap = {};
    NUMEROS.forEach((marker) => {
      next[marker.id] = {
        x: valueToPercent(marker.value),
        y: marker.stack === 'up' ? 18 : 78,
      };
    });
    return next;
  }, []);

  const effective = showResults ? teacherPlacements : placements;

  const bank = NUMEROS.filter((marker) => effective[marker.id] === undefined);
  const placed = NUMEROS.filter((marker) => effective[marker.id] !== undefined);

  const placeAt = (id: string, xPercent: number, yPercent: number) => {
    if (showResults) return;
    const lineY = 50;
    const gap = 20;
    let y = yPercent;
    if (Math.abs(y - lineY) < gap) {
      y = y <= lineY ? lineY - gap : lineY + gap;
    }
    persist({
      ...placements,
      [id]: {
        x: Math.min(96, Math.max(4, xPercent)),
        y: Math.min(90, Math.max(8, y)),
      },
    });
    setDraggingId(null);
  };

  const returnMarker = (id: string) => {
    if (showResults) return;
    const next = { ...placements };
    delete next[id];
    persist(next);
  };

  const onDropZone = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain') || draggingId;
    if (!id) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    placeAt(id, xPercent, yPercent);
  };

  const clearMarkers = () => {
    if (showResults) return;
    persist({});
    setDraggingId(null);
  };

  return (
    <div className="reta-racionais">
      <div className="reta-racionais__topo">
        <p className="reta-racionais__dica">
          1) Desenhe a reta e as barras. 2) Arraste os números até as posições desejadas. Toque em um número colocado para devolvê-lo.
        </p>
        <button
          type="button"
          className="diagrama-racionais__limpar"
          onClick={clearMarkers}
          disabled={showResults || Object.keys(placements).length === 0}
        >
          Limpar números
        </button>
      </div>

      <div
        className="reta-racionais__banco"
        aria-label="Números racionais para arrastar"
      >
        {bank.map((marker) => (
          <button
            key={marker.id}
            type="button"
            draggable={!showResults}
            className={`reta-racionais__ficha${draggingId === marker.id ? ' is-selected' : ''}`}
            disabled={showResults}
            onDragStart={(event) => {
              event.dataTransfer.setData('text/plain', marker.id);
              event.dataTransfer.effectAllowed = 'move';
              setDraggingId(marker.id);
            }}
            onDragEnd={() => setDraggingId(null)}
          >
            {marker.label}
          </button>
        ))}
        {bank.length === 0 ? (
          <span className="reta-racionais__banco-vazio">Todos os números estão na reta.</span>
        ) : null}
      </div>

      <AreaDesenho
        storageKey={storageKey}
        width={760}
        height={280}
        maxWidth="100%"
        borderColor="#ee55af"
        enableLineTool
        hint="Use Reta para a linha e as barras; depois arraste os números"
        className={showResults ? 'reta-racionais__canvas is-professor' : 'reta-racionais__canvas'}
        canvasOverlay={
          <div
            className={`reta-racionais__dropzone${draggingId ? ' is-arrastando' : ''}${showResults ? ' is-professor' : ''}`}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = 'move';
            }}
            onDrop={onDropZone}
          >
            {placed.map((marker) => {
              const pos = effective[marker.id];
              if (!pos) return null;
              return (
                <button
                  key={marker.id}
                  type="button"
                  className={`reta-racionais__marcador${showResults ? ' is-professor' : ''}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  draggable={!showResults}
                  onDragStart={(event) => {
                    event.dataTransfer.setData('text/plain', marker.id);
                    event.dataTransfer.effectAllowed = 'move';
                    setDraggingId(marker.id);
                  }}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() => returnMarker(marker.id)}
                  title="Arraste para reposicionar ou clique para devolver"
                >
                  {marker.label}
                </button>
              );
            })}
          </div>
        }
      />
    </div>
  );
}

export default AtividadeRetaRacionais;
