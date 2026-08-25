import { useCallback, useEffect, useMemo, useState, type DragEvent, type ReactNode } from 'react';

type Marker = {
  id: string;
  label: ReactNode;
  value: number;
  stack: 'up' | 'down';
};

type Placement = { x: number; y: number };
type PlacementMap = Record<string, Placement>;

type AtividadeRetaReaisProps = {
  storageKey?: string;
  showResults?: boolean;
};

const NUMEROS: Marker[] = [
  { id: 'm08', label: '−0,8', value: -0.8, stack: 'up' },
  { id: 'm07', label: '−0,7', value: -0.7, stack: 'down' },
  { id: 'm05', label: '−0,5', value: -0.5, stack: 'up' },
  { id: 'm03', label: '−0,3', value: -0.3, stack: 'down' },
  { id: 'm01', label: '−0,1', value: -0.1, stack: 'up' },
  { id: 'p02', label: '0,2', value: 0.2, stack: 'up' },
  { id: 'p04', label: '0,4', value: 0.4, stack: 'up' },
  { id: 'p042', label: '0,42', value: 0.42, stack: 'down' },
  { id: 'p045', label: '0,45', value: 0.45, stack: 'up' },
  { id: 'p048', label: '0,48', value: 0.48, stack: 'down' },
  { id: 'p05', label: '0,5', value: 0.5, stack: 'up' },
  { id: 'p06', label: '0,6', value: 0.6, stack: 'up' },
  { id: 'p07', label: '0,7', value: 0.7, stack: 'up' },
  { id: 'p09', label: '0,9', value: 0.9, stack: 'up' },
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

function AtividadeRetaReais({
  storageKey = 'ch1_q19a_reta',
  showResults = false,
}: AtividadeRetaReaisProps) {
  const min = -1;
  const max = 1;
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
        x: valueToPercent(marker.value, min, max),
        y: marker.stack === 'up' ? 18 : 82,
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
    const gap = 22;
    let y = yPercent;
    if (Math.abs(y - lineY) < gap) {
      y = y <= lineY ? lineY - gap : lineY + gap;
    }
    persist({
      ...placements,
      [id]: {
        x: Math.min(96, Math.max(4, xPercent)),
        y: Math.min(90, Math.max(10, y)),
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

  const tenths: number[] = [];
  for (let v = -10; v <= 10; v += 1) {
    tenths.push(v / 10);
  }

  return (
    <div className="reta-interativa reta-interativa--reais">
      <div className="reta-interativa__topo">
        <p className="reta-interativa__dica">
          Arraste os números até a reta. Toque em um número colocado para devolvê-lo.
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

      <div className="reta-interativa__banco" aria-label="Números para arrastar">
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
          <span className="reta-interativa__banco-vazio">Todos os números estão na reta.</span>
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
        <svg
          className="reta-interativa__eixo"
          viewBox="0 0 720 160"
          aria-hidden
        >
          <line x1="36" y1="80" x2="684" y2="80" stroke="#111" strokeWidth="2" />
          <polygon points="694,80 682,75 682,85" fill="#111" />
          {tenths.map((value) => {
            const x = 36 + ((value - min) / (max - min)) * 648;
            const isInteger = Number.isInteger(value);
            return (
              <g key={value}>
                <line
                  x1={x}
                  y1={isInteger ? 70 : 74}
                  x2={x}
                  y2={isInteger ? 90 : 86}
                  stroke="#111"
                  strokeWidth={isInteger ? 2 : 1}
                />
                {isInteger ? (
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
                ) : null}
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

export default AtividadeRetaReais;
