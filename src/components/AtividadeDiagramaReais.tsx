import {
  createContext,
  useContext,
  useMemo,
  useState,
  type DragEvent,
  type ReactNode,
} from 'react';
import Formula from './Formula';

type Region = 'N' | 'Z' | 'Q' | 'Qp';

type NumberChip = {
  id: string;
  label: ReactNode;
  teacherLabel?: ReactNode;
  correctRegion: Region;
};

type ChipPlacement = {
  region: Region;
  slot: number;
};

type Placement = Record<string, ChipPlacement>;

const CHIPS: NumberChip[] = [
  { id: 'zero', label: '0', correctRegion: 'N' },
  {
    id: 'sqrt49',
    label: '√49',
    teacherLabel: <>√49 = 7</>,
    correctRegion: 'N',
  },
  { id: 'pi', label: 'π', correctRegion: 'Qp' },
  { id: 'rep1444', label: '1,444…', correctRegion: 'Q' },
  {
    id: 'sqrt9_16',
    label: (
      <>
        √<span className="fracao"><span>9</span><span>16</span></span>
      </>
    ),
    teacherLabel: (
      <>
        √<span className="fracao"><span>9</span><span>16</span></span> ={' '}
        <span className="fracao"><span>3</span><span>4</span></span>
      </>
    ),
    correctRegion: 'Q',
  },
  {
    id: 'sqrt2_10',
    label: (
      <span className="fracao">
        <span>√2</span>
        <span>10</span>
      </span>
    ),
    correctRegion: 'Qp',
  },
  {
    id: '12_20',
    label: <span className="fracao"><span>12</span><span>20</span></span>,
    teacherLabel: (
      <>
        <span className="fracao"><span>12</span><span>20</span></span> ={' '}
        <span className="fracao"><span>3</span><span>5</span></span>
      </>
    ),
    correctRegion: 'Q',
  },
  {
    id: 'm18_3',
    label: (
      <>
        −<span className="fracao"><span>18</span><span>3</span></span>
      </>
    ),
    teacherLabel: (
      <>
        −<span className="fracao"><span>18</span><span>3</span></span> = −6
      </>
    ),
    correctRegion: 'Z',
  },
  { id: 'm236', label: '−236', correctRegion: 'Z' },
  { id: 'm03489', label: '−0,3489', correctRegion: 'Q' },
  {
    id: '01527bar',
    label: <>0,15<span className="dizima-barra">27</span></>,
    correctRegion: 'Q',
  },
  {
    id: 'sqrt5_15',
    label: (
      <span className="fracao">
        <span>√5</span>
        <span>15</span>
      </span>
    ),
    correctRegion: 'Qp',
  },
];

const SLOT_COUNT: Record<Region, number> = {
  N: 4,
  Z: 4,
  Q: 8,
  Qp: 6,
};

const CORRECT_SLOTS: Record<string, ChipPlacement> = {
  zero: { region: 'N', slot: 0 },
  sqrt49: { region: 'N', slot: 1 },
  m236: { region: 'Z', slot: 0 },
  m18_3: { region: 'Z', slot: 1 },
  '01527bar': { region: 'Q', slot: 0 },
  m03489: { region: 'Q', slot: 1 },
  rep1444: { region: 'Q', slot: 2 },
  '12_20': { region: 'Q', slot: 3 },
  sqrt9_16: { region: 'Q', slot: 4 },
  pi: { region: 'Qp', slot: 0 },
  sqrt2_10: { region: 'Qp', slot: 1 },
  sqrt5_15: { region: 'Qp', slot: 2 },
};

type AtividadeDiagramaReaisProps = {
  value?: string;
  onChange: (value: string) => void;
  showResults?: boolean;
  children?: ReactNode;
};

type DiagramaReaisContextValue = {
  showResults: boolean;
  selectedId: string | null;
  dragOverRegion: Region | null;
  placement: Placement;
  effectivePlacement: Placement;
  chipsIn: (region: Region) => NumberChip[];
  chipsInBank: NumberChip[];
  placeChip: (id: string, region: Region) => void;
  returnChip: (id: string) => void;
  clearAll: () => void;
  setSelectedId: (id: string | null | ((current: string | null) => string | null)) => void;
  setDragOverRegion: (region: Region | null | ((current: Region | null) => Region | null)) => void;
  onChipDragStart: (event: DragEvent<HTMLButtonElement>, id: string) => void;
  onRegionDragOver: (event: DragEvent<HTMLButtonElement>, region: Region) => void;
  onRegionDrop: (event: DragEvent<HTMLButtonElement>, region: Region) => void;
  renderChip: (chip: NumberChip, placed: boolean) => ReactNode;
  renderRegionDrop: (region: Region, label: string) => ReactNode;
};

const DiagramaReaisContext = createContext<DiagramaReaisContextValue | null>(null);

function useDiagramaReais() {
  const ctx = useContext(DiagramaReaisContext);
  if (!ctx) {
    throw new Error('DiagramaReais deve ser usado dentro de AtividadeDiagramaReais');
  }
  return ctx;
}

function parsePlacement(value?: string): Placement {
  if (!value) {
    return {};
  }
  try {
    const parsed = JSON.parse(value) as Record<string, ChipPlacement | Region>;
    if (!parsed || typeof parsed !== 'object') {
      return {};
    }
    const next: Placement = {};
    const usedSlots: Record<Region, Set<number>> = {
      N: new Set(),
      Z: new Set(),
      Q: new Set(),
      Qp: new Set(),
    };

    Object.entries(parsed).forEach(([id, entry]) => {
      if (typeof entry === 'string') {
        const region = entry as Region;
        if (!SLOT_COUNT[region]) {
          return;
        }
        let slot = 0;
        while (usedSlots[region].has(slot) && slot < SLOT_COUNT[region]) {
          slot += 1;
        }
        usedSlots[region].add(slot);
        next[id] = { region, slot };
        return;
      }
      if (entry && typeof entry === 'object' && entry.region && SLOT_COUNT[entry.region]) {
        next[id] = {
          region: entry.region,
          slot: typeof entry.slot === 'number' ? entry.slot : 0,
        };
        usedSlots[entry.region].add(next[id].slot);
      }
    });
    return next;
  } catch {
    return {};
  }
}

function firstFreeSlot(placement: Placement, region: Region): number {
  const used = new Set(
    Object.values(placement)
      .filter((item) => item.region === region)
      .map((item) => item.slot),
  );
  for (let slot = 0; slot < SLOT_COUNT[region]; slot += 1) {
    if (!used.has(slot)) {
      return slot;
    }
  }
  return Math.max(0, SLOT_COUNT[region] - 1);
}

function AtividadeDiagramaReais({
  value,
  onChange,
  showResults = false,
  children,
}: AtividadeDiagramaReaisProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragOverRegion, setDragOverRegion] = useState<Region | null>(null);
  const placement = useMemo(() => parsePlacement(value), [value]);

  const effectivePlacement = useMemo(() => {
    if (!showResults) {
      return placement;
    }
    return { ...CORRECT_SLOTS };
  }, [placement, showResults]);

  const updatePlacement = (next: Placement) => onChange(JSON.stringify(next));

  const placeChip = (id: string, region: Region) => {
    if (showResults) {
      return;
    }
    const current = placement[id];
    if (current?.region === region) {
      setSelectedId(null);
      setDragOverRegion(null);
      return;
    }
    updatePlacement({
      ...placement,
      [id]: { region, slot: firstFreeSlot(placement, region) },
    });
    setSelectedId(null);
    setDragOverRegion(null);
  };

  const returnChip = (id: string) => {
    if (showResults) {
      return;
    }
    const next = { ...placement };
    delete next[id];
    updatePlacement(next);
    setSelectedId(null);
  };

  const clearAll = () => {
    if (showResults) {
      return;
    }
    updatePlacement({});
    setSelectedId(null);
    setDragOverRegion(null);
  };

  const chipsIn = (region: Region) =>
    CHIPS.filter((chip) => effectivePlacement[chip.id]?.region === region).sort(
      (a, b) => (effectivePlacement[a.id]?.slot ?? 0) - (effectivePlacement[b.id]?.slot ?? 0),
    );

  const chipsInBank = CHIPS.filter((chip) => !effectivePlacement[chip.id]);

  const onChipDragStart = (event: DragEvent<HTMLButtonElement>, id: string) => {
    if (showResults) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.effectAllowed = 'move';
    setSelectedId(id);
  };

  const onRegionDragOver = (event: DragEvent<HTMLButtonElement>, region: Region) => {
    if (showResults) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverRegion(region);
  };

  const onRegionDrop = (event: DragEvent<HTMLButtonElement>, region: Region) => {
    event.preventDefault();
    event.stopPropagation();
    const id = event.dataTransfer.getData('text/plain') || selectedId;
    if (id) {
      placeChip(id, region);
    }
  };

  const renderChip = (chip: NumberChip, placed: boolean) => {
    const slot = effectivePlacement[chip.id]?.slot;
    const label = showResults && chip.teacherLabel ? chip.teacherLabel : chip.label;
    return (
      <button
        key={chip.id}
        type="button"
        draggable={!showResults}
        className={`diagrama-chip${placed ? ' is-placed' : ''}${selectedId === chip.id ? ' is-selected' : ''}${showResults ? ' is-professor' : ''}${placed && typeof slot === 'number' ? ` is-slot-${slot}` : ''}`}
        onDragStart={(event) => onChipDragStart(event, chip.id)}
        onDragEnd={() => setDragOverRegion(null)}
        onClick={() => {
          if (showResults) {
            return;
          }
          if (placed) {
            returnChip(chip.id);
            return;
          }
          setSelectedId((current) => (current === chip.id ? null : chip.id));
        }}
        disabled={showResults && !placed}
      >
        {label}
      </button>
    );
  };

  const renderRegionDrop = (region: Region, label: string) => (
    <button
      type="button"
      className={`diagrama-reais__drop diagrama-reais__drop--${region.toLowerCase()}${dragOverRegion === region ? ' is-over' : ''}`}
      aria-label={`Soltar em ${label}`}
      onDragOver={(event) => {
        event.stopPropagation();
        onRegionDragOver(event, region);
      }}
      onDragLeave={() => setDragOverRegion((current) => (current === region ? null : current))}
      onDrop={(event) => {
        event.stopPropagation();
        onRegionDrop(event, region);
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (selectedId) {
          placeChip(selectedId, region);
        }
      }}
    />
  );

  const ctx: DiagramaReaisContextValue = {
    showResults,
    selectedId,
    dragOverRegion,
    placement,
    effectivePlacement,
    chipsIn,
    chipsInBank,
    placeChip,
    returnChip,
    clearAll,
    setSelectedId,
    setDragOverRegion,
    onChipDragStart,
    onRegionDragOver,
    onRegionDrop,
    renderChip,
    renderRegionDrop,
  };

  return (
    <DiagramaReaisContext.Provider value={ctx}>
      {children ?? (
        <>
          <DiagramaReaisFigura />
          <DiagramaReaisBanco />
        </>
      )}
    </DiagramaReaisContext.Provider>
  );
}

/** Diagrama + legenda (bullets). */
export function DiagramaReaisFigura() {
  const { selectedId, showResults, chipsIn, renderChip, renderRegionDrop } = useDiagramaReais();

  return (
    <div className="diagrama-reais diagrama-reais--figura">
      <div
        className={`diagrama-reais__palco${selectedId ? ' has-selection' : ''}${showResults ? ' is-professor' : ''}`}
      >
        <div className="diagrama-reais__r" aria-label="Conjunto dos números reais">
          <span className="diagrama-reais__selo diagrama-reais__selo--r" aria-hidden>
            <strong>ℝ</strong>
          </span>

          <div className="diagrama-reais__corpo">
            <div className="diagrama-reais__lado diagrama-reais__lado--q">
              <span className="diagrama-reais__selo diagrama-reais__selo--q" aria-hidden>
                <strong>ℚ</strong>
              </span>
              {renderRegionDrop('Q', 'números racionais não inteiros')}
              <div className="diagrama-reais__slots diagrama-reais__slots--q" aria-label="Números em Q">
                {chipsIn('Q').map((chip) => renderChip(chip, true))}
              </div>

              <div className="diagrama-reais__oval diagrama-reais__oval--z">
                <span className="diagrama-reais__selo diagrama-reais__selo--z" aria-hidden>
                  <strong>ℤ</strong>
                </span>
                {renderRegionDrop('Z', 'números inteiros não naturais')}
                <div className="diagrama-reais__slots diagrama-reais__slots--z" aria-label="Números em Z">
                  {chipsIn('Z').map((chip) => renderChip(chip, true))}
                </div>

                <div className="diagrama-reais__oval diagrama-reais__oval--n">
                  <span className="diagrama-reais__selo diagrama-reais__selo--n" aria-hidden>
                    <strong>ℕ</strong>
                  </span>
                  {renderRegionDrop('N', 'números naturais')}
                  <div className="diagrama-reais__slots diagrama-reais__slots--n" aria-label="Números em N">
                    {chipsIn('N').map((chip) => renderChip(chip, true))}
                  </div>
                </div>
              </div>
            </div>

            <div className="diagrama-reais__lado diagrama-reais__lado--qp">
              <span className="diagrama-reais__selo diagrama-reais__selo--qp" aria-hidden>
                <strong>ℚ′</strong>
              </span>
              {renderRegionDrop('Qp', 'números irracionais')}
              <div className="diagrama-reais__slots diagrama-reais__slots--qp" aria-label="Números em Q'">
                {chipsIn('Qp').map((chip) => renderChip(chip, true))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="diagrama-reais__legenda" aria-label="Legenda do diagrama">
        <ul className="diagrama-reais__lista">
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}" />
            </strong>
            : Racionais
          </li>
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Z}" />
            </strong>
            : Inteiros
          </li>
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{N}" />
            </strong>
            : Naturais
          </li>
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}'" />
            </strong>
            : Irracionais
          </li>
        </ul>
        <ul className="diagrama-reais__lista">
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}" />
            </strong>
          </li>
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}' \subset \mathbb{R}" />
            </strong>
          </li>
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q} \cup \mathbb{Q}' = \mathbb{R}" />
            </strong>
          </li>
          <li>
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q} \cap \mathbb{Q}' = \emptyset" />
            </strong>
            , isto é,{' '}
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}" />
            </strong>{' '}
            e{' '}
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}'" />
            </strong>{' '}
            são conjuntos disjuntos.
          </li>
        </ul>
      </div>
    </div>
  );
}

/** Dica + botão limpar + números para arrastar. */
export function DiagramaReaisBanco() {
  const { showResults, placement, clearAll, chipsInBank, renderChip } = useDiagramaReais();

  return (
    <div className="diagrama-reais diagrama-reais--banco">
      <div className="diagrama-reais__topo">
        <p className="diagrama-reais__dica">
          Arraste cada número até a região adequada (ℕ, ℤ, ℚ ou ℚ′) — ou toque no número e depois na
          região. Toque em um número colocado para devolvê-lo.
        </p>
        <button
          type="button"
          className="diagrama-racionais__limpar"
          onClick={clearAll}
          disabled={showResults || Object.keys(placement).length === 0}
        >
          Limpar
        </button>
      </div>

      <div className="grade-racionais grade-racionais--reais" aria-label="Números para classificar">
        {chipsInBank.map((chip) => renderChip(chip, false))}
      </div>
    </div>
  );
}

export default AtividadeDiagramaReais;
