import type { ReactNode } from 'react';

interface MergulhandoFundoProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function MergulhandoFundo({
  iconSrc,
  iconAlt = 'Mergulhando fundo',
  children,
}: MergulhandoFundoProps) {
  return (
    <section className="mergulhando-fundo">
      <img className="mergulhando-fundo__selo" src={iconSrc} alt={iconAlt} />
      <div className="mergulhando-fundo__caixa">{children}</div>
    </section>
  );
}

export default MergulhandoFundo;
