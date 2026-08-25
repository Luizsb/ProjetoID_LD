import { useCallback, useEffect, useMemo, useState, type DragEvent, type ReactNode } from 'react';

type Marker = {
  id: string;
  label: ReactNode;
  value: number;
};

type Placement = { x: number; y: number };
type PlacementMap = Record<string, Placement>;

type AtividadeRetaIrracionaisProps = {
  storageKey?: string;
  showResults?: boolean;
};

const RAIZES: Marker[] = [
  { id: 'ms8', label: '−√8', value: -Math.sqrt(8) },
  { id: 'ms5', label: '−√5', value: -Math.sqrt(5) },
  { id: 'ms2', label: '−√2', value: -Math.sqrt(2) },
  { id: 'p3', label: '√3', value: Math.sqrt(3) },
  { id: 'p10', label: '√10', value: Math.sqrt(10) },
  { id: 'p15', label: '√15', value: Math.sqrt(15) },
];

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

function valueToPercent(value: number, min: number, max: number): number {
  return 5 + ((value - min) / (max - min)) * 90;
}

function AtividadeRetaIrracionais({
  storageKey = 'ch1_q19b_reta',
  showResults = false,
}: AtividadeRetaIrracionaisProps) {
  const min = -3;
  const max = 4;
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
    RAIZES.forEach((marker) => {
      next[marker.id] = {
        x: valueToPercent(marker.value, min, max),
        y: 20,
      };
    });
    return next;
  }, []);

  const effective = showResults ? teacherPlacements : placements;
  const bank = RAIZES.filter((marker) => effective[marker.id] === undefined);
  const placed = RAIZES.filter((marker) => effective[marker.id] !== undefined);

  const placeAt = (id: string, xPercent: number, yPercent: number) => {
    if (showResults) return;
    const lineY = 55;
    const gap = 22;
    let y = yPercent;
    if (Math.abs(y - lineY) < gap) {
      y = y <= lineY ? lineY - gap : lineY + gap;
    }
    persist({
      ...placements,
      [id]: {
        x: Math.min(96, Math.max(4, xPercent)),
        y: Math.min(78, Math.max(12, y)),
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

  const integers = [-3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <div className="reta-interativa reta-interativa--irracionais">
      <div className="reta-interativa__topo">
        <p className="reta-interativa__dica">
          Arraste cada raiz até a posição aproximada na reta. Toque em um marcador para devolvê-lo.
        </p>
        <button
          type="button"
          className="diagrama-racionais__limpar"
          onClick={() => {
            if (!showResults) persist({});
          }}
          disabled={showResults || Object.keys(placements).length === 0}
        >
          Limpar
        </button>
      </div>

      <div className="reta-interativa__banco" aria-label="Raízes para arrastar">
        {bank.map((marker) => (
          <button
            key={marker.id}
            type="button"
            draggable={!showResults}
            className={`reta-interativa__ficha${draggingId === marker.id ? ' is-selected' : ''}`}
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
          <span className="reta-interativa__banco-vazio">Todas as raízes estão na reta.</span>
        ) : null}
      </div>

      <div
        className={`reta-interativa__palco${draggingId ? ' is-arrastando' : ''}${showResults ? ' is-professor' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        }}
        onDrop={onDropZone}
      >
        <svg className="reta-interativa__eixo" viewBox="0 0 720 140" aria-hidden>
          <line x1="28" y1="78" x2="692" y2="78" stroke="#7b3fa0" strokeWidth="2.5" />
          <polygon points="702,78 690,73 690,83" fill="#7b3fa0" />
          {integers.map((value) => {
            const x = 28 + ((value - min) / (max - min)) * 664;
            return (
              <g key={value}>
                <circle cx={x} cy={78} r="4" fill="#111" />
                <text
                  x={x}
                  y={118}
                  textAnchor="middle"
                  fill="#111"
                  fontSize="14"
                  fontFamily="Myriad VF, sans-serif"
                  fontWeight="700"
                >
                  {value}
                </text>
              </g>
            );
          })}
        </svg>

        {placed.map((marker) => {
          const pos = effective[marker.id];
          if (!pos) return null;
          return (
            <button
              key={marker.id}
              type="button"
              className={`reta-interativa__marcador${showResults ? ' is-professor' : ''}`}
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
    </div>
  );
}

export default AtividadeRetaIrracionais;
