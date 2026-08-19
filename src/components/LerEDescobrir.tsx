import type { ReactNode } from 'react';

interface LerEDescobrirProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function LerEDescobrir({
  iconSrc,
  iconAlt = 'Ler e descobrir',
  children,
}: LerEDescobrirProps) {
  return (
    <section className="ler-e-descobrir">
      <img className="ler-e-descobrir__selo" src={iconSrc} alt={iconAlt} />
      {children}
    </section>
  );
}

export default LerEDescobrir;
