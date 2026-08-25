import { useMemo, useState, type DragEvent, type ReactNode } from 'react';

type Region = 'N' | 'Z' | 'Q';

type NumberChip = {
  id: string;
  label: ReactNode;
  correctRegion: Region;
};

type ChipPlacement = {
  region: Region;
  slot: number;
};

type Placement = Record<string, ChipPlacement>;

const CHIPS: NumberChip[] = [
  { id: 'm16_4', label: <span className="fracao"><span>−16</span><span>4</span></span>, correctRegion: 'Z' },
  { id: 'm3', label: '−3', correctRegion: 'Z' },
  { id: 'm2_5', label: '−2,5', correctRegion: 'Q' },
  { id: 'm2_3', label: <span className="fracao"><span>−2</span><span>3</span></span>, correctRegion: 'Q' },
  { id: 'm1_2bar', label: <>−1,<span className="dizima-barra">2</span></>, correctRegion: 'Q' },
  { id: 'zero', label: '0', correctRegion: 'N' },
  { id: '1_5', label: <span className="fracao"><span>1</span><span>5</span></span>, correctRegion: 'Q' },
  { id: '0_54bar', label: <>0,5<span className="dizima-barra">4</span></>, correctRegion: 'Q' },
  { id: '15_3', label: <span className="fracao"><span>15</span><span>3</span></span>, correctRegion: 'N' },
  { id: '7_04', label: '7,04', correctRegion: 'Q' },
  { id: 'six', label: '6', correctRegion: 'N' },
];

const SLOT_COUNT: Record<Region, number> = {
  N: 6,
  Z: 6,
  Q: 6,
};

const CORRECT_SLOTS: Record<string, ChipPlacement> = {
  zero: { region: 'N', slot: 0 },
  '15_3': { region: 'N', slot: 1 },
  six: { region: 'N', slot: 2 },
  m16_4: { region: 'Z', slot: 0 },
  m3: { region: 'Z', slot: 1 },
  m2_5: { region: 'Q', slot: 0 },
  m2_3: { region: 'Q', slot: 1 },
  m1_2bar: { region: 'Q', slot: 2 },
  '1_5': { region: 'Q', slot: 3 },
  '0_54bar': { region: 'Q', slot: 4 },
  '7_04': { region: 'Q', slot: 5 },
};

type AtividadeDiagramaRacionaisProps = {
  value?: string;
  onChange: (value: string) => void;
  showResults?: boolean;
};

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
    };

    Object.entries(parsed).forEach(([id, entry]) => {
      if (typeof entry === 'string') {
        const region = entry as Region;
        let slot = 0;
        while (usedSlots[region].has(slot) && slot < SLOT_COUNT[region]) {
          slot += 1;
        }
        usedSlots[region].add(slot);
        next[id] = { region, slot };
        return;
      }
      if (entry && typeof entry === 'object' && entry.region) {
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

function AtividadeDiagramaRacionais({
  value,
  onChange,
  showResults = false,
}: AtividadeDiagramaRacionaisProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragOverRegion, setDragOverRegion] = useState<Region | null>(null);
  const placement = useMemo(() => parsePlacement(value), [value]);

  const effectivePlacement = useMemo(() => {
    if (!showResults) {
      return placement;
    }
    return { ...CORRECT_SLOTS };
  }, [placement, showResults]);

  const updatePlacement = (next: Placement) => {
    onChange(JSON.stringify(next));
  };

  const placeChip = (id: string, region: Region) => {
    if (showResults) {
      return;
    }
    const current = placement[id];
    // Se já está na mesma região, mantém o slot (não reposiciona).
    if (current?.region === region) {
      setSelectedId(null);
      setDragOverRegion(null);
      return;
    }
    const slot = firstFreeSlot(placement, region);
    updatePlacement({
      ...placement,
      [id]: { region, slot },
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

  const onRegionClick = (region: Region) => {
    if (selectedId) {
      placeChip(selectedId, region);
    }
  };

  const renderChip = (chip: NumberChip, placed: boolean) => {
    const slot = effectivePlacement[chip.id]?.slot;
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
        {chip.label}
      </button>
    );
  };

  return (
    <div className="diagrama-racionais">
      <div className="diagrama-racionais__topo">
        <p className="diagrama-racionais__dica">
          Arraste um número até a região <strong>ℕ</strong>, <strong>ℤ</strong> ou <strong>ℚ</strong>
          {' '}(ou toque no número e depois na região). Toque em um número colocado para devolvê-lo.
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

      <div className={`diagrama-racionais__palco${selectedId ? ' has-selection' : ''}${showResults ? ' is-professor' : ''}`}>
        <div className="diagrama-racionais__anel diagrama-racionais__anel--q">
          <span className="diagrama-racionais__rotulo"><strong>ℚ</strong></span>

          <button
            type="button"
            className={`diagrama-racionais__drop diagrama-racionais__drop--q${dragOverRegion === 'Q' ? ' is-over' : ''}`}
            aria-label="Soltar em números racionais (não inteiros)"
            onDragOver={(event) => onRegionDragOver(event, 'Q')}
            onDragLeave={() => setDragOverRegion((current) => (current === 'Q' ? null : current))}
            onDrop={(event) => onRegionDrop(event, 'Q')}
            onClick={() => onRegionClick('Q')}
          />

          <div className="diagrama-racionais__slots diagrama-racionais__slots--q" aria-label="Números em Q">
            {chipsIn('Q').map((chip) => renderChip(chip, true))}
          </div>

          <div className="diagrama-racionais__anel diagrama-racionais__anel--z">
            <span className="diagrama-racionais__rotulo"><strong>ℤ</strong></span>

            <button
              type="button"
              className={`diagrama-racionais__drop diagrama-racionais__drop--z${dragOverRegion === 'Z' ? ' is-over' : ''}`}
              aria-label="Soltar em números inteiros (não naturais)"
              onDragOver={(event) => {
                event.stopPropagation();
                onRegionDragOver(event, 'Z');
              }}
              onDragLeave={() => setDragOverRegion((current) => (current === 'Z' ? null : current))}
              onDrop={(event) => {
                event.stopPropagation();
                onRegionDrop(event, 'Z');
              }}
              onClick={(event) => {
                event.stopPropagation();
                onRegionClick('Z');
              }}
            />

            <div className="diagrama-racionais__slots diagrama-racionais__slots--z" aria-label="Números em Z">
              {chipsIn('Z').map((chip) => renderChip(chip, true))}
            </div>

            <div className="diagrama-racionais__anel diagrama-racionais__anel--n">
              <span className="diagrama-racionais__rotulo"><strong>ℕ</strong></span>

              <button
                type="button"
                className={`diagrama-racionais__drop diagrama-racionais__drop--n${dragOverRegion === 'N' ? ' is-over' : ''}`}
                aria-label="Soltar em números naturais"
                onDragOver={(event) => {
                  event.stopPropagation();
                  onRegionDragOver(event, 'N');
                }}
                onDragLeave={() => setDragOverRegion((current) => (current === 'N' ? null : current))}
                onDrop={(event) => {
                  event.stopPropagation();
                  onRegionDrop(event, 'N');
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  onRegionClick('N');
                }}
              />

              <div className="diagrama-racionais__slots diagrama-racionais__slots--n" aria-label="Números em N">
                {chipsIn('N').map((chip) => renderChip(chip, true))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grade-racionais" aria-label="Números para classificar no diagrama">
        {chipsInBank.map((chip) => renderChip(chip, false))}
      </div>
    </div>
  );
}

export default AtividadeDiagramaRacionais;
