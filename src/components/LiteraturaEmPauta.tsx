import type { ReactNode } from 'react';

interface LiteraturaEmPautaProps {
  iconSrc: string;
  iconAlt?: string;
  children?: ReactNode;
}

function LiteraturaEmPauta({
  iconSrc,
  iconAlt = 'Literatura em pauta',
  children,
}: LiteraturaEmPautaProps) {
  return (
    <section className="literatura-pauta" aria-label="Literatura em pauta">
      <img className="literatura-pauta__selo" src={iconSrc} alt={iconAlt} />
      <div className="literatura-pauta__caixa">{children}</div>
    </section>
  );
}

export default LiteraturaEmPauta;
