import type { ReactNode } from 'react';

interface DialogarEConhecerProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function DialogarEConhecer({
  iconSrc,
  iconAlt = 'Dialogar e conhecer',
  children,
}: DialogarEConhecerProps) {
  return (
    <section className="dialogar-conhecer">
      <img className="dialogar-conhecer__selo" src={iconSrc} alt={iconAlt} />
      <div className="dialogar-conhecer__conteudo">{children}</div>
    </section>
  );
}

export default DialogarEConhecer;
