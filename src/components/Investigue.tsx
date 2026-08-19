import type { ReactNode } from 'react';

interface InvestigueProps {
  iconSrc?: string;
  iconAlt?: string;
  /** Continuação da seção, sem repetir o selo. */
  continuar?: boolean;
  children: ReactNode;
}

function Investigue({
  iconSrc,
  iconAlt = 'Investigue',
  continuar = false,
  children,
}: InvestigueProps) {
  return (
    <section className={`investigue${continuar ? ' investigue--continuar' : ''}`}>
      {!continuar && iconSrc ? (
        <img className="investigue__selo" src={iconSrc} alt={iconAlt} />
      ) : null}
      <div className="investigue__caixa">{children}</div>
    </section>
  );
}

export default Investigue;
