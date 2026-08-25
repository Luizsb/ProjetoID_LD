interface EnemVestibularesProps {
  title?: string;
  /** `desafio` usa o azul #008fd5 da seção Enem e vestibulares + Desafio. */
  variant?: 'default' | 'desafio';
}

function EnemVestibulares({
  title = 'Enem e vestibulares',
  variant = 'default',
}: EnemVestibularesProps) {
  return (
    <div
      className={`enem-vestibulares${variant === 'desafio' ? ' enem-vestibulares--desafio' : ''}`}
    >
      <h2 className="enem-vestibulares__faixa">{title}</h2>
    </div>
  );
}

export default EnemVestibulares;
