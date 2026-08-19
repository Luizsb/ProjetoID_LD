interface QuestionNumberProps {
  number?: number;
  letter?: string;
  className?: string;
}

/**
 * Componente reutilizável para renderizar número/letra de questão
 */
export function QuestionNumber({ number, letter, className = '' }: QuestionNumberProps) {
  if (number !== undefined) {
    return (
      <span className={`question-number ${className}`} style={{ color: 'var(--question-number-color, #00776E)', fontWeight: 'bold' }}>
        {number}.{' '}
      </span>
    );
  }

  if (letter) {
    return (
      <span className={`question-number ${className}`} style={{ color: 'var(--question-number-color, #00776E)', fontWeight: 'bold' }}>
        {letter}){' '}
      </span>
    );
  }

  return null;
}

