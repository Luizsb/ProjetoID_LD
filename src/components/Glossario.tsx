interface GlossarioProps {
  termo: string;
  definicao: string;
  /** Fita do glossário SAE Anos Finais (`glossario.png`). */
  fitaSrc?: string;
}

function Glossario({ termo, definicao, fitaSrc }: GlossarioProps) {
  if (fitaSrc) {
    return (
      <aside className="glossario-sae-af" aria-label={`Glossário: ${termo}`}>
        <div className="glossario-sae-af__barra">
          <img className="glossario-sae-af__fita" src={fitaSrc} alt="" />
          <h2 className="glossario-sae-af__titulo">Glossário</h2>
        </div>
        <p className="glossario-sae-af__corpo">
          <strong className="glossario-sae-af__termo">{termo}</strong>
          <span>: </span>
          {definicao}
        </p>
      </aside>
    );
  }

  return (
    <aside className="glossario-caixa" aria-label={`Glossário: ${termo}`}>
      <p className="glossario-caixa__texto">
        <span className="glossario-caixa__seta" aria-hidden>
          ▶
        </span>{' '}
        <strong className="glossario-caixa__termo">{termo}</strong>
        <span className="glossario-caixa__sep">:</span> {definicao}
      </p>
    </aside>
  );
}

export default Glossario;
