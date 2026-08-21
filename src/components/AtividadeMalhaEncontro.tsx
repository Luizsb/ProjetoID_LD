import { useCallback, useState } from 'react';

const COLS = 10;
const ROWS = 11;

type Personagem = 'beto' | 'maria' | 'elisa' | 'ponto';

type CellMark = 'beto' | 'maria' | 'elisa' | 'ponto' | null;

type AtividadeMalhaEncontroProps = {
  storageKey?: string;
  /** Coluna 1–10 da seta da Elisa (topo) */
  elisaCol?: number;
  /** Linha 1–11 da seta do Beto (esquerda) */
  betoRow?: number;
  /** Coluna 1–10 da seta da Maria (base) */
  mariaCol?: number;
};

type State = {
  cells: CellMark[];
};

const PERSONAGENS: {
  id: Personagem;
  label: string;
  letter: string;
  color: string;
}[] = [
  { id: 'beto', label: 'Beto', letter: 'B', color: '#f39c12' },
  { id: 'maria', label: 'Maria', letter: 'M', color: '#e74c3c' },
  { id: 'elisa', label: 'Elisa', letter: 'E', color: '#9b59b6' },
  { id: 'ponto', label: 'Ponto de Encontro', letter: '★', color: '#5dade2' },
];

function emptyCells(): CellMark[] {
  return Array.from({ length: COLS * ROWS }, () => null);
}

function readStored(storageKey: string | undefined): State {
  const defaults: State = { cells: emptyCells() };
  if (!storageKey) return defaults;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<State>;
    if (!Array.isArray(parsed.cells) || parsed.cells.length !== COLS * ROWS) return defaults;
    return { cells: parsed.cells as CellMark[] };
  } catch {
    return defaults;
  }
}

function AtividadeMalhaEncontro({
  storageKey,
  elisaCol = 9,
  betoRow = 2,
  mariaCol = 2,
}: AtividadeMalhaEncontroProps) {
  const [selecionado, setSelecionado] = useState<Personagem>('beto');
  const [cells, setCells] = useState<CellMark[]>(() => readStored(storageKey).cells);

  const persist = useCallback(
    (next: CellMark[]) => {
      if (!storageKey) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify({ cells: next }));
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const toggleCell = useCallback(
    (index: number) => {
      setCells((prev) => {
        const next = [...prev];
        const atual = next[index];

        if (selecionado === 'ponto') {
          if (atual === 'ponto') {
            next[index] = null;
          } else {
            for (let i = 0; i < next.length; i += 1) {
              if (next[i] === 'ponto') next[i] = null;
            }
            next[index] = 'ponto';
          }
        } else if (atual === selecionado) {
          next[index] = null;
        } else {
          next[index] = selecionado;
        }

        persist(next);
        return next;
      });
    },
    [persist, selecionado],
  );

  const limpar = useCallback(() => {
    const next = emptyCells();
    setCells(next);
    persist(next);
  }, [persist]);

  // Centro da célula (1-based) em % da malha
  const colCenterPct = (col: number) => `${((col - 0.5) / COLS) * 100}%`;
  const rowCenterPct = (row: number) => `${((row - 0.5) / ROWS) * 100}%`;

  return (
    <div className="atividade-malha-encontro my-6">
      <p className="mb-3 text-center font-bold">Selecione um personagem para marcar seu caminho:</p>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        {PERSONAGENS.map((p) => {
          const ativo = selecionado === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelecionado(p.id)}
              className="rounded-[5px] border-2 px-4 py-2 font-bold transition"
              style={{
                borderColor: p.color,
                backgroundColor: ativo ? (p.id === 'ponto' ? '#0073ae' : '#000') : '#fff',
                color: ativo ? '#fff' : p.color,
              }}
            >
              {p.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={limpar}
          className="rounded-[5px] border-2 border-slate-400 bg-white px-4 py-2 font-bold text-slate-600 transition hover:bg-slate-100"
        >
          Limpar
        </button>
      </div>

      <div className="atividade-malha-encontro__wrap mx-auto">
        <div className="atividade-malha-encontro__board">
          <span
            className="atividade-malha-encontro__label atividade-malha-encontro__label--elisa"
            style={{ left: colCenterPct(elisaCol) }}
          >
            Elisa
            <span className="atividade-malha-encontro__seta" aria-hidden>
              ▼
            </span>
          </span>

          <span
            className="atividade-malha-encontro__label atividade-malha-encontro__label--beto"
            style={{ top: rowCenterPct(betoRow) }}
          >
            Beto <span aria-hidden>→</span>
          </span>

          <div
            className="atividade-malha-encontro__grid"
            role="grid"
            aria-label="Malha quadriculada de Beto, Elisa e Maria"
          >
            {cells.map((mark, index) => {
              const meta = PERSONAGENS.find((p) => p.id === mark);
              return (
                <button
                  key={index}
                  type="button"
                  role="gridcell"
                  className={`atividade-malha-encontro__cell${mark ? ` is-${mark}` : ''}`}
                  onClick={() => toggleCell(index)}
                  aria-label={`Quadriculado ${index + 1}${mark ? `, marcado ${meta?.label ?? ''}` : ''}`}
                >
                  {meta?.letter ?? ''}
                </button>
              );
            })}
          </div>

          <span
            className="atividade-malha-encontro__label atividade-malha-encontro__label--maria"
            style={{ left: colCenterPct(mariaCol) }}
          >
            <span className="atividade-malha-encontro__seta" aria-hidden>
              ▲
            </span>
            Maria
          </span>
        </div>
      </div>
    </div>
  );
}

export default AtividadeMalhaEncontro;
