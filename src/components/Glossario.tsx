interface GlossarioProps {
  termo: string;
  definicao: string;
}

function Glossario({ termo, definicao }: GlossarioProps) {
  return (
    <aside className="glossario-caixa" aria-label={`Glossário: ${termo}`}>
      <p className="glossario-caixa__texto">
        <span className="glossario-caixa__seta" aria-hidden>
          ▶
        </span>{' '}
        <strong className="glossario-caixa__termo">{termo}:</strong> {definicao}
      </p>
    </aside>
  );
}

export default Glossario;
