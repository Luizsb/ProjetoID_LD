import type { ObjectiveScore } from '../utils/scoreObjectiveAnswers';

interface GabaritoCapituloProps {
  pdfUrl: string;
  active: boolean;
  onToggle: () => void;
  score: ObjectiveScore;
}

function GabaritoCapitulo({ pdfUrl, active, onToggle, score }: GabaritoCapituloProps) {
  return (
    <section className={`gabarito-capitulo${active ? ' is-ativo' : ''}`} aria-label="Gabarito do capítulo">
      <div className="gabarito-capitulo__topo">
        <h2 className="gabarito-capitulo__titulo">Gabarito</h2>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gabarito-capitulo__pdf"
        >
          Acessar PDF gabarito
        </a>
      </div>

      <button
        type="button"
        className="gabarito-capitulo__ativar"
        onClick={onToggle}
        aria-pressed={active}
      >
        {active ? 'Gabarito ativo — clique para ocultar' : 'Clique para ativar o gabarito'}
      </button>

      {active ? (
        <div className="gabarito-capitulo__resultado" aria-live="polite">
          <p className="gabarito-capitulo__resultado-titulo">
            Desempenho nas questões objetivas
          </p>
          <div className="gabarito-capitulo__metricas">
            <div className="gabarito-capitulo__metrica gabarito-capitulo__metrica--acerto">
              <span className="gabarito-capitulo__metrica-label">Acertos</span>
              <span className="gabarito-capitulo__metrica-valor">{score.acertos}</span>
            </div>
            <div className="gabarito-capitulo__metrica gabarito-capitulo__metrica--erro">
              <span className="gabarito-capitulo__metrica-label">Erros</span>
              <span className="gabarito-capitulo__metrica-valor">{score.erros}</span>
            </div>
            <div className="gabarito-capitulo__metrica gabarito-capitulo__metrica--branco">
              <span className="gabarito-capitulo__metrica-label">Em branco</span>
              <span className="gabarito-capitulo__metrica-valor">{score.emBranco}</span>
            </div>
            <div className="gabarito-capitulo__metrica gabarito-capitulo__metrica--final">
              <span className="gabarito-capitulo__metrica-label">Pontuação final</span>
              <span className="gabarito-capitulo__metrica-valor">{score.pontuacao}</span>
            </div>
          </div>
          <p className="gabarito-capitulo__nota">
            {score.total} questões objetivas · respostas esperadas também aparecem em cada
            questão (incluindo discursivas).
          </p>
        </div>
      ) : null}
    </section>
  );
}

export default GabaritoCapitulo;
