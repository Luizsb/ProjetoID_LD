import type { ReactNode } from 'react';

interface CheckProps {
  iconSrc: string;
  iconAlt?: string;
  children?: ReactNode;
}

function Check({ iconSrc, iconAlt = 'Check', children }: CheckProps) {
  return (
    <section className="check-secao" aria-label="Check">
      <img className="check-secao__selo" src={iconSrc} alt={iconAlt} />
      <div className="check-secao__caixa">{children}</div>
    </section>
  );
}

export default Check;
