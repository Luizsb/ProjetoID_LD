import SecaoAf from './SecaoAf';

interface ConectandoPontosProps {
  imageSrc: string;
  title?: string;
}

function ConectandoPontos({
  imageSrc,
  title = 'Conectando os pontos',
}: ConectandoPontosProps) {
  return <SecaoAf imageSrc={imageSrc} title={title} alt={title} />;
}

export default ConectandoPontos;
