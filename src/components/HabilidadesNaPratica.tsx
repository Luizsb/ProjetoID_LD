import type { ReactNode } from 'react';

interface HabilidadesNaPraticaProps {
  iconSrc: string;
  children: ReactNode;
  titleHighlight?: string;
  titleRest?: string;
}

function HabilidadesNaPratica({
  iconSrc,
  children,
  titleHighlight = 'Habilidades',
  titleRest = 'na prática',
}: HabilidadesNaPraticaProps) {
  return (
    <section className="habilidades-pratica">
      <header className="habilidades-pratica__cabecalho">
        <img
          className="habilidades-pratica__icone"
          src={iconSrc}
          alt=""
          aria-hidden
        />
        <h2 className="habilidades-pratica__titulo">
          <span className="habilidades-pratica__titulo-destaque">{titleHighlight}</span>{' '}
          <span className="habilidades-pratica__titulo-resto">{titleRest}</span>
        </h2>
      </header>
      <div className="habilidades-pratica__corpo">{children}</div>
    </section>
  );
}

export default HabilidadesNaPratica;
