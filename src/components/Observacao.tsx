import type { ReactNode } from 'react';

interface ObservacaoProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function Observacao({
  iconSrc,
  iconAlt = 'Observação',
  children,
}: ObservacaoProps) {
  return (
    <section className="observacao">
      <img className="observacao__selo" src={iconSrc} alt={iconAlt} />
      <div className="observacao__caixa">{children}</div>
    </section>
  );
}

export default Observacao;
