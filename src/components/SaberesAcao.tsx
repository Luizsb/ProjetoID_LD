import SecaoAf from './SecaoAf';

interface SaberesAcaoProps {
  title?: string;
  imageSrc?: string;
}

function SaberesAcao({ title = 'Saberes em ação', imageSrc }: SaberesAcaoProps) {
  if (imageSrc) {
    return <SecaoAf imageSrc={imageSrc} title={title} alt={title} />;
  }

  return (
    <div className="saberes-acao">
      <h2 className="saberes-acao__faixa">{title}</h2>
    </div>
  );
}

export default SaberesAcao;
