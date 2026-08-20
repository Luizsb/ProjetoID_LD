import type { ReactNode } from 'react';

interface ComecoDeConversaProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

function ComecoDeConversa({
  iconSrc,
  iconAlt = 'Começo de conversa',
  children,
}: ComecoDeConversaProps) {
  return (
    <section className="comeco-conversa">
      <img className="comeco-conversa__selo" src={iconSrc} alt={iconAlt} />
      <div className="comeco-conversa__caixa">{children}</div>
    </section>
  );
}

export default ComecoDeConversa;
