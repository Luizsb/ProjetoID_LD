import { useCallback, useState } from 'react';

type CorId = 'laranja' | 'verde' | 'azul' | 'vermelho' | 'borracha';

type AtividadeMalhaCoresProps = {
  storageKey?: string;
  cols?: number;
  rows?: number;
};

const CORES: { id: CorId; label: string; color: string }[] = [
  { id: 'laranja', label: 'Laranja', color: '#e39026' },
  { id: 'verde', label: 'Verde', color: '#008a4b' },
  { id: 'azul', label: 'Azul', color: '#0073ae' },
  { id: 'vermelho', label: 'Vermelho', color: '#ed1c24' },
  { id: 'borracha', label: 'Borracha', color: '#6c757d' },
];

function emptyCells(cols: number, rows: number): (CorId | null)[] {
  return Array.from({ length: cols * rows }, () => null);
}

function readStored(storageKey: string | undefined, cols: number, rows: number) {
  const defaults = emptyCells(cols, rows);
  if (!storageKey) return defaults;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as { cells?: (CorId | null)[] };
    if (!Array.isArray(parsed.cells) || parsed.cells.length !== cols * rows) return defaults;
    return parsed.cells;
  } catch {
    return defaults;
  }
}

function AtividadeMalhaCores({ storageKey, cols = 18, rows = 7 }: AtividadeMalhaCoresProps) {
  const [cor, setCor] = useState<CorId>('laranja');
  const [cells, setCells] = useState<(CorId | null)[]>(() => readStored(storageKey, cols, rows));

  const persist = useCallback(
    (next: (CorId | null)[]) => {
      if (!storageKey) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify({ cells: next }));
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const pintar = useCallback(
    (index: number) => {
      setCells((prev) => {
        const next = [...prev];
        next[index] = cor === 'borracha' ? null : cor;
        persist(next);
        return next;
      });
    },
    [cor, persist],
  );

  const limpar = useCallback(() => {
    const next = emptyCells(cols, rows);
    setCells(next);
    persist(next);
  }, [cols, persist, rows]);

  return (
    <div className="atividade-malha-cores my-6">
      <p className="mb-3 text-center font-bold">Selecione uma cor para pintar:</p>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        {CORES.map((c) => {
          const ativo = cor === c.id;
          const isBorracha = c.id === 'borracha';
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCor(c.id)}
              className={`rounded-lg border-[3px] px-3 py-2 font-bold transition ${ativo ? 'scale-105 shadow-md' : ''}`}
              style={{
                borderColor: c.color,
                backgroundColor: isBorracha ? (ativo ? '#495057' : '#6c757d') : ativo ? c.color : '#fff',
                color: isBorracha || ativo ? '#fff' : c.color,
              }}
            >
              {c.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={limpar}
          className="rounded-lg border-[3px] border-slate-400 bg-white px-3 py-2 font-bold text-slate-600"
        >
          Limpar tudo
        </button>
      </div>

      <div
        className="atividade-malha-cores__grid mx-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
        role="grid"
        aria-label="Malha quadriculada para desenhar figuras"
      >
        {cells.map((cellCor, index) => (
          <button
            key={index}
            type="button"
            role="gridcell"
            className={`atividade-malha-cores__cell${cellCor ? ` is-${cellCor}` : ''}`}
            onClick={() => pintar(index)}
            aria-label={`Quadrado ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default AtividadeMalhaCores;
