import type { ReactNode } from 'react';

interface ZoomInProps {
  iconSrc: string;
  iconAlt?: string;
  children?: ReactNode;
}

function ZoomIn({
  iconSrc,
  iconAlt = 'Zoom in',
  children,
}: ZoomInProps) {
  return (
    <section className="zoom-in" aria-label="Zoom in">
      <img className="zoom-in__selo" src={iconSrc} alt={iconAlt} />
      <div className="zoom-in__caixa">{children}</div>
    </section>
  );
}

export default ZoomIn;
