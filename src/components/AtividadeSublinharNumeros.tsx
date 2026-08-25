import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AtividadeSublinharContextValue {
  modoAtivo: boolean;
  setModoAtivo: (ativo: boolean) => void;
  isMarked: (id: string) => boolean;
  toggle: (id: string) => void;
  limpar: () => void;
  temMarcacao: boolean;
}

const AtividadeSublinharContext = createContext<AtividadeSublinharContextValue | null>(null);

function useAtividadeSublinhar() {
  const ctx = useContext(AtividadeSublinharContext);
  if (!ctx) {
    throw new Error('AtividadeSublinharNumeros deve ser usado dentro do Provider.');
  }
  return ctx;
}

interface ProviderProps {
  children: ReactNode;
  storageKey?: string;
}

function readStored(storageKey: string | undefined): string[] {
  if (!storageKey) return [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function AtividadeSublinharProvider({ children, storageKey }: ProviderProps) {
  const [modoAtivo, setModoAtivo] = useState(false);
  const [marcados, setMarcados] = useState<Set<string>>(() => new Set(readStored(storageKey)));

  const persist = useCallback(
    (next: Set<string>) => {
      if (!storageKey) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const toggle = useCallback(
    (id: string) => {
      setMarcados((current) => {
        const next = new Set(current);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const limpar = useCallback(() => {
    setMarcados(new Set());
    persist(new Set());
  }, [persist]);

  const value = useMemo(
    () => ({
      modoAtivo,
      setModoAtivo,
      isMarked: (id: string) => marcados.has(id),
      toggle,
      limpar,
      temMarcacao: marcados.size > 0,
    }),
    [modoAtivo, marcados, toggle, limpar],
  );

  return (
    <AtividadeSublinharContext.Provider value={value}>
      <div className={`sessao-sublinhar-numeros${modoAtivo ? ' is-modo-ativo' : ''}`}>{children}</div>
    </AtividadeSublinharContext.Provider>
  );
}

export function AtividadeSublinharArea({ children }: { children: ReactNode }) {
  return <div className="sessao-sublinhar-numeros__area">{children}</div>;
}

interface TrechoClicavelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function TrechoClicavel({ id, children, className = '' }: TrechoClicavelProps) {
  const { modoAtivo, isMarked, toggle } = useAtividadeSublinhar();
  const marcado = isMarked(id);
  const classes = [
    'trecho-clicavel',
    className,
    modoAtivo ? 'is-ativo' : '',
    marcado ? 'is-sublinhado' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role={modoAtivo ? 'button' : undefined}
      tabIndex={modoAtivo ? 0 : undefined}
      aria-pressed={modoAtivo ? marcado : undefined}
      onClick={() => {
        if (modoAtivo) toggle(id);
      }}
      onKeyDown={(event) => {
        if (!modoAtivo) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle(id);
        }
      }}
    >
      {children}
    </span>
  );
}

/** Divide um texto em palavras clicáveis, sem alterar o visual. */
export function TextoInterativo({ idPrefix, texto }: { idPrefix: string; texto: string }) {
  const partes = texto.split(/(\s+)/);

  return (
    <>
      {partes.map((parte, index) => {
        if (!parte || /^\s+$/.test(parte)) {
          return parte;
        }
        return (
          <TrechoClicavel key={`${idPrefix}-${index}`} id={`${idPrefix}-${index}`}>
            {parte}
          </TrechoClicavel>
        );
      })}
    </>
  );
}

export function BotaoModoSublinhar() {
  const { modoAtivo, setModoAtivo, limpar, temMarcacao } = useAtividadeSublinhar();

  return (
    <div className="botao-modo-sublinhar-wrap">
      <div className="botao-modo-sublinhar-acoes">
        <button
          type="button"
          className={`botao-modo-sublinhar${modoAtivo ? ' is-ativo' : ''}`}
          aria-pressed={modoAtivo}
          onClick={() => setModoAtivo(!modoAtivo)}
        >
          {modoAtivo ? 'Concluir sublinhado' : 'Ativar sublinhado'}
        </button>
        <button
          type="button"
          className="botao-limpar-sublinhado"
          disabled={!temMarcacao}
          onClick={limpar}
        >
          Limpar
        </button>
      </div>
      <p className="botao-modo-sublinhar__instrucao">
        {modoAtivo
          ? 'Toque ou clique nas palavras e números que deseja sublinhar. Clique de novo para desmarcar. Use Limpar para apagar tudo.'
          : 'Clique em “Ativar sublinhado” e, em seguida, toque nas palavras ou números do texto acima.'}
      </p>
    </div>
  );
}
