import type { ReactNode } from 'react';

interface EntrelinhaProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function Entrelinha({
  iconSrc,
  iconAlt = 'Entrelinha',
  children,
}: EntrelinhaProps) {
  return (
    <section className="entrelinha" aria-label="Entrelinha">
      <img className="entrelinha__selo" src={iconSrc} alt={iconAlt} />
      <div className="entrelinha__corpo">{children}</div>
    </section>
  );
}

export default Entrelinha;
