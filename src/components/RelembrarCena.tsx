import type { CSSProperties, ReactNode } from 'react';

interface RelembrarCenaProps {
  texto: ReactNode;
  avatarSrc: string;
  avatarAlt?: string;
  iconSrc: string;
  iconAlt?: string;
  fundo: string;
  sombra: string;
  corTexto?: string;
  avatarLado?: 'esquerda' | 'direita';
  iconePosicao?: 'topo-direita' | 'baixo-esquerda' | 'baixo-direita';
  numero?: number;
  alinhamento?: 'esquerda' | 'direita';
}

function RelembrarCena({
  texto,
  avatarSrc,
  avatarAlt = '',
  iconSrc,
  iconAlt = '',
  fundo,
  sombra,
  corTexto = '#111',
  avatarLado = 'esquerda',
  iconePosicao = 'topo-direita',
  numero,
  alinhamento = 'esquerda',
}: RelembrarCenaProps) {
  const caixaStyle: CSSProperties = {
    backgroundColor: fundo,
    boxShadow: `6px 7px 0 ${sombra}`,
    color: corTexto,
  };

  return (
    <article
      className={`relembrar-cena relembrar-cena--${alinhamento} relembrar-cena--avatar-${avatarLado}${numero === undefined ? ' relembrar-cena--intro' : ''}`}
    >
      {avatarLado === 'esquerda' ? (
        <img className="relembrar-cena__avatar" src={avatarSrc} alt={avatarAlt} />
      ) : null}

      <div className={`relembrar-cena__caixa relembrar-cena__caixa--icone-${iconePosicao}`} style={caixaStyle}>
        {numero !== undefined ? (
          <span className="relembrar-cena__numero" aria-hidden>
            {numero}
          </span>
        ) : null}
        <p className="relembrar-cena__texto">{texto}</p>
        <img
          className={`relembrar-cena__icone relembrar-cena__icone--${iconePosicao}`}
          src={iconSrc}
          alt={iconAlt}
        />
      </div>

      {avatarLado === 'direita' ? (
        <img className="relembrar-cena__avatar" src={avatarSrc} alt={avatarAlt} />
      ) : null}
    </article>
  );
}

export default RelembrarCena;
