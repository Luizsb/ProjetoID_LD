import type { ReactNode } from 'react';

interface ComecoDeConversaProps {
  iconSrc: string;
  iconAlt?: string;
  className?: string;
  children: ReactNode;
}

function ComecoDeConversa({
  iconSrc,
  iconAlt = 'Começo de conversa',
  className = '',
  children,
}: ComecoDeConversaProps) {
  return (
    <section className={`comeco-conversa${className ? ` ${className}` : ''}`}>
      <img className="comeco-conversa__selo" src={iconSrc} alt={iconAlt} />
      <div className="comeco-conversa__caixa">{children}</div>
    </section>
  );
}

export default ComecoDeConversa;
