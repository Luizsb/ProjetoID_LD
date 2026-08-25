interface SaberesAcaoProps {
  title?: string;
}

function SaberesAcao({ title = 'Saberes em ação' }: SaberesAcaoProps) {
  return (
    <div className="saberes-acao">
      <h2 className="saberes-acao__faixa">{title}</h2>
    </div>
  );
}

export default SaberesAcao;
