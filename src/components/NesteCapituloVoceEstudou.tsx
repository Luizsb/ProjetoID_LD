import type { ReactNode } from 'react';

interface NesteCapituloVoceEstudouProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function NesteCapituloVoceEstudou({
  iconSrc,
  iconAlt = 'Neste capítulo, você estudou...',
  children,
}: NesteCapituloVoceEstudouProps) {
  return (
    <section className="neste-capitulo">
      <img className="neste-capitulo__selo" src={iconSrc} alt={iconAlt} />
      <div className="neste-capitulo__caixa">{children}</div>
    </section>
  );
}

export default NesteCapituloVoceEstudou;
