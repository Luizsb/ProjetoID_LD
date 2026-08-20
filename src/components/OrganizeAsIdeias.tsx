import type { ReactNode } from 'react';

interface OrganizeAsIdeiasProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function OrganizeAsIdeias({
  iconSrc,
  iconAlt = 'Organize as ideias',
  children,
}: OrganizeAsIdeiasProps) {
  return (
    <section className="organize-ideias">
      <img className="organize-ideias__selo" src={iconSrc} alt={iconAlt} />
      <div className="organize-ideias__caixa">{children}</div>
    </section>
  );
}

export default OrganizeAsIdeias;
