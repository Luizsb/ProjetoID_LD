import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export type Ligacao = { from: string; to: string };

export type LigarOrigem = {
  id: string;
  label: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
};

export type LigarDestino = {
  id: string;
  label: string;
};

type AtividadeLigarProps = {
  left: LigarOrigem[];
  right: LigarDestino[];
  value?: Ligacao[];
  onChange: (next: Ligacao[]) => void;
  disabled?: boolean;
};

type Ponto = { x: number; y: number };

function mesmaLigacao(a: Ligacao, b: Ligacao) {
  return a.from === b.from && a.to === b.to;
}

const LIGACOES_VAZIAS: Ligacao[] = [];

function AtividadeLigar({ left, right, value, onChange, disabled = false }: AtividadeLigarProps) {
  const ligacoes = Array.isArray(value) ? value : LIGACOES_VAZIAS;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pending, setPending] = useState<{ side: 'from' | 'to'; id: string } | null>(null);
  const [linhas, setLinhas] = useState<{ key: string; a: Ponto; b: Ponto }[]>([]);

  const medir = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const next = ligacoes.flatMap((ligacao) => {
      const fromEl = pinRefs.current[`from-${ligacao.from}`];
      const toEl = pinRefs.current[`to-${ligacao.to}`];
      if (!fromEl || !toEl) return [];
      const fromBox = fromEl.getBoundingClientRect();
      const toBox = toEl.getBoundingClientRect();
      return [
        {
          key: `${ligacao.from}-${ligacao.to}`,
          a: {
            x: fromBox.left + fromBox.width / 2 - box.left,
            y: fromBox.top + fromBox.height / 2 - box.top,
          },
          b: {
            x: toBox.left + toBox.width / 2 - box.left,
            y: toBox.top + toBox.height / 2 - box.top,
          },
        },
      ];
    });
    setLinhas(next);
  }, [ligacoes]);

  useLayoutEffect(() => {
    medir();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', medir);
      return () => window.removeEventListener('resize', medir);
    }
    const observer = new ResizeObserver(() => medir());
    observer.observe(wrap);
    window.addEventListener('resize', medir);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [medir]);

  const alternar = (from: string, to: string) => {
    const ligacao = { from, to };
    const existe = ligacoes.some((item) => mesmaLigacao(item, ligacao));
    onChange(existe ? ligacoes.filter((item) => !mesmaLigacao(item, ligacao)) : [...ligacoes, ligacao]);
  };

  const clicarPino = (side: 'from' | 'to', id: string) => {
    if (disabled) return;
    if (!pending) {
      setPending({ side, id });
      return;
    }
    if (pending.side === side) {
      setPending(pending.id === id ? null : { side, id });
      return;
    }
    const from = side === 'from' ? id : pending.id;
    const to = side === 'to' ? id : pending.id;
    alternar(from, to);
    setPending(null);
  };

  return (
    <div className="ligar-grupos-wrap">
      <p className="ligar-grupos__dica">
        Toque no ponto verde da atividade e depois no ponto do grupo. Pode ligar a mesma atividade a mais de um
        grupo. Toque de novo no mesmo par para desligar.
      </p>
      <div ref={wrapRef} className="ligar-grupos">
        <svg className="ligar-grupos__svg" aria-hidden="true">
          {linhas.map((linha) => (
            <line
              key={linha.key}
              x1={linha.a.x}
              y1={linha.a.y}
              x2={linha.b.x}
              y2={linha.b.y}
              stroke="#3d4c53"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div className="ligar-grupos__col ligar-grupos__col--origens">
          {left.map((item) => {
            const pinKey = `from-${item.id}`;
            const ativo = pending?.side === 'from' && pending.id === item.id;
            return (
              <article key={item.id} className="ligar-grupos__origem">
                <div className="ligar-grupos__midia">
                  <img src={item.imageSrc} alt={item.imageAlt} onLoad={medir} />
                  <p>{item.caption}</p>
                </div>
                <button
                  type="button"
                  className={`ligar-grupos__selo${ativo ? ' is-on' : ''}`}
                  disabled={disabled}
                  onClick={() => clicarPino('from', item.id)}
                >
                  {item.label}
                </button>
                <button
                  type="button"
                  className={`ligar-grupos__pino${ativo ? ' is-on' : ''}`}
                  ref={(el) => {
                    pinRefs.current[pinKey] = el;
                  }}
                  disabled={disabled}
                  aria-label={`Ligar ${item.label}`}
                  onClick={() => clicarPino('from', item.id)}
                />
              </article>
            );
          })}
        </div>

        <div className="ligar-grupos__col ligar-grupos__col--destinos">
          {right.map((item) => {
            const pinKey = `to-${item.id}`;
            const ativo = pending?.side === 'to' && pending.id === item.id;
            return (
              <div key={item.id} className="ligar-grupos__destino">
                <button
                  type="button"
                  className={`ligar-grupos__pino${ativo ? ' is-on' : ''}`}
                  ref={(el) => {
                    pinRefs.current[pinKey] = el;
                  }}
                  disabled={disabled}
                  aria-label={`Grupo ${item.label}`}
                  onClick={() => clicarPino('to', item.id)}
                />
                <button
                  type="button"
                  className={`ligar-grupos__selo${ativo ? ' is-on' : ''}`}
                  disabled={disabled}
                  onClick={() => clicarPino('to', item.id)}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AtividadeLigar;
