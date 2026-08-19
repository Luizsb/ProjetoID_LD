import type { ReactNode } from 'react';

interface ConstruindoJuntosProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function ConstruindoJuntos({
  iconSrc,
  iconAlt = 'Construindo juntos',
  children,
}: ConstruindoJuntosProps) {
  return (
    <section className="construindo-juntos">
      <img className="construindo-juntos__selo" src={iconSrc} alt={iconAlt} />
      {children}
    </section>
  );
}

export default ConstruindoJuntos;
