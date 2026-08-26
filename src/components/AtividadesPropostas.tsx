import type { ReactNode } from 'react';

interface AtividadesPropostasProps {
  iconSrc: string;
  iconAlt?: string;
  children?: ReactNode;
}

function AtividadesPropostas({
  iconSrc,
  iconAlt = 'Atividades propostas',
  children,
}: AtividadesPropostasProps) {
  return (
    <section className="atividades-propostas" aria-label="Atividades propostas">
      <img className="atividades-propostas__selo" src={iconSrc} alt={iconAlt} />
      <div className="atividades-propostas__corpo">{children}</div>
    </section>
  );
}

export default AtividadesPropostas;
