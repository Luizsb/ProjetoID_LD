interface PontoDePartidaProps {
  title?: string;
}

function PontoDePartida({ title = 'Ponto de partida' }: PontoDePartidaProps) {
  return (
    <div className="ponto-de-partida">
      <span className="ponto-de-partida__linha" aria-hidden="true" />
      <h2 className="ponto-de-partida__faixa">{title}</h2>
    </div>
  );
}

export default PontoDePartida;
