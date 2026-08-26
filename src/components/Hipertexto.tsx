import type { ReactNode } from 'react';

interface HipertextoProps {
  iconSrc: string;
  iconAlt?: string;
  children?: ReactNode;
}

function Hipertexto({
  iconSrc,
  iconAlt = 'Hipertexto',
  children,
}: HipertextoProps) {
  return (
    <section className="hipertexto" aria-label="Hipertexto">
      <img className="hipertexto__selo" src={iconSrc} alt={iconAlt} />
      <div className="hipertexto__caixa">{children}</div>
    </section>
  );
}

export default Hipertexto;
