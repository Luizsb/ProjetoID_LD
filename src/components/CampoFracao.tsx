interface CampoFracaoProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

function splitFraction(value: string): { num: string; den: string } {
  const slash = value.indexOf('/');
  if (slash < 0) {
    return { num: value, den: '' };
  }
  return { num: value.slice(0, slash), den: value.slice(slash + 1) };
}

function CampoFracao({ value, onChange, disabled = false, ariaLabel = 'Fração' }: CampoFracaoProps) {
  const { num, den } = splitFraction(value);

  const update = (nextNum: string, nextDen: string) => {
    if (!nextNum && !nextDen) {
      onChange('');
      return;
    }
    onChange(`${nextNum}/${nextDen}`);
  };

  return (
    <span className="campo-fracao" role="group" aria-label={ariaLabel}>
      <input
        type="text"
        inputMode="numeric"
        value={num}
        disabled={disabled}
        onChange={(event) => update(event.target.value.replace(/[^\d-]/g, ''), den)}
        aria-label={`${ariaLabel}, numerador`}
        className="campo-fracao__campo"
      />
      <span className="campo-fracao__barra" aria-hidden />
      <input
        type="text"
        inputMode="numeric"
        value={den}
        disabled={disabled}
    onChange={(event) => update(num, event.target.value.replace(/[^\d-]/g, ''))}
        aria-label={`${ariaLabel}, denominador`}
        className="campo-fracao__campo"
      />
    </span>
  );
}

export default CampoFracao;
