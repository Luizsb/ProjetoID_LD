import type { ReactNode } from 'react';

interface ParaIrAlemProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function ParaIrAlem({
  iconSrc,
  iconAlt = 'Para ir além',
  children,
}: ParaIrAlemProps) {
  return (
    <section className="para-ir-alem">
      <img className="para-ir-alem__selo" src={iconSrc} alt={iconAlt} />
      <div className="para-ir-alem__caixa">{children}</div>
    </section>
  );
}

export default ParaIrAlem;
