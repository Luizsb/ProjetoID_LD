import type { ReactNode } from 'react';

interface CaixaNotaProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function CaixaNota({ iconSrc, iconAlt = 'Nota', children }: CaixaNotaProps) {
  return (
    <aside className="caixa-nota" aria-label="Nota">
      <img className="caixa-nota__selo" src={iconSrc} alt={iconAlt} />
      <div className="caixa-nota__corpo">{children}</div>
    </aside>
  );
}

export default CaixaNota;
