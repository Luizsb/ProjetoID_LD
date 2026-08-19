import type { ReactNode } from 'react';

interface ParaRelembrarProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function ParaRelembrar({
  iconSrc,
  iconAlt = 'Para relembrar',
  children,
}: ParaRelembrarProps) {
  return (
    <section className="para-relembrar">
      <img className="para-relembrar__selo" src={iconSrc} alt={iconAlt} />
      {children}
    </section>
  );
}

export default ParaRelembrar;
