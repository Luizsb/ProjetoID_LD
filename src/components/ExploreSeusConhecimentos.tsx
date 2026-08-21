import type { ReactNode } from 'react';

interface ExploreSeusConhecimentosProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function ExploreSeusConhecimentos({
  iconSrc,
  iconAlt = 'Explore seus conhecimentos',
  children,
}: ExploreSeusConhecimentosProps) {
  return (
    <section className="explore-conhecimentos">
      <img className="explore-conhecimentos__selo" src={iconSrc} alt={iconAlt} />
      <div className="explore-conhecimentos__conteudo">{children}</div>
    </section>
  );
}

export default ExploreSeusConhecimentos;
