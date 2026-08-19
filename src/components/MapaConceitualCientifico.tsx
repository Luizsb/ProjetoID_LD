import { useState, type DragEvent } from 'react';
import type { UserAnswers } from '../types/questions';

const WORDS = ['pergunta', 'dedução', 'conclusão', 'hipótese', 'experimento'] as const;

type Word = (typeof WORDS)[number];

type Step =
  | { id: string; kind: 'blank'; prefix: string; correct: Word }
  | { id: string; kind: 'fixed'; text: string };

const STEPS: Step[] = [
  { id: 'formular', kind: 'blank', prefix: 'formular', correct: 'pergunta' },
  { id: 'elaborar', kind: 'blank', prefix: 'elaborar', correct: 'hipótese' },
  { id: 'ler', kind: 'fixed', text: 'ler e conhecer outras pesquisas' },
  { id: 'fazer', kind: 'blank', prefix: 'fazer', correct: 'dedução' },
  { id: 'realizar', kind: 'blank', prefix: 'realizar', correct: 'experimento' },
  { id: 'chegar', kind: 'blank', prefix: 'chegar a uma', correct: 'conclusão' },
  { id: 'publicar', kind: 'fixed', text: 'publicar a pesquisa' },
];

const BLANKS = STEPS.filter((step): step is Extract<Step, { kind: 'blank' }> => step.kind === 'blank');

interface MapaConceitualCientificoProps {
  questionId: string;
  characterSrc: string;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

function blankKey(questionId: string, stepId: string) {
  return `${questionId}_${stepId}`;
}

function MapaConceitualCientifico({
  questionId,
  characterSrc,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: MapaConceitualCientificoProps) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const valueOf = (stepId: string): string => {
    const step = BLANKS.find((item) => item.id === stepId);
    if (showResults && step) {
      return step.correct;
    }
    return String(userAnswers[blankKey(questionId, stepId)] ?? '');
  };

  const usedWords = new Set(
    BLANKS.map((step) => valueOf(step.id)).filter((value): value is Word => WORDS.includes(value as Word)),
  );

  const placeWord = (stepId: string, word: Word) => {
    const current = valueOf(stepId);
    if (current === word) {
      return;
    }

    const occupying = BLANKS.find((step) => step.id !== stepId && valueOf(step.id) === word);
    if (occupying) {
      onAnswerChange(blankKey(questionId, occupying.id), '');
    }

    onAnswerChange(blankKey(questionId, stepId), word);
    setSelectedWord(null);
  };

  const handleWordClick = (word: Word) => {
    if (showResults || usedWords.has(word)) {
      return;
    }
    setSelectedWord((current) => (current === word ? null : word));
  };

  const handleBlankClick = (stepId: string) => {
    if (showResults) {
      return;
    }

    const current = valueOf(stepId);
    if (selectedWord) {
      placeWord(stepId, selectedWord);
      return;
    }
    if (current) {
      onAnswerChange(blankKey(questionId, stepId), '');
    }
  };

  const handleDrop = (stepId: string, event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (showResults) {
      return;
    }
    const word = event.dataTransfer.getData('text/plain') as Word;
    if (!WORDS.includes(word) || usedWords.has(word)) {
      return;
    }
    placeWord(stepId, word);
  };

  return (
    <section className="mapa-conceitual" aria-label="Mapa conceitual das etapas do trabalho científico">
      <p className="mapa-conceitual__instrucao">
        {selectedWord
          ? `Agora clique na lacuna do mapa onde a palavra “${selectedWord}” deve aparecer.`
          : 'Clique em uma palavra do quadro e depois clique na lacuna do mapa para colocá-la. Para tirar, clique na palavra já preenchida.'}
      </p>
      <div className="mapa-conceitual__banco" role="list" aria-label="Palavras para completar o mapa">
        {WORDS.map((word, index) => {
          const used = usedWords.has(word);
          return (
            <span key={word} role="listitem">
              {index > 0 ? <span className="mapa-conceitual__sep"> – </span> : null}
              <button
                type="button"
                className={`mapa-conceitual__palavra${used ? ' is-used' : ''}${selectedWord === word ? ' is-selected' : ''}`}
                onClick={() => handleWordClick(word)}
                draggable={!showResults && !used}
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', word);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                disabled={showResults || used}
                aria-pressed={selectedWord === word}
              >
                {word}
              </button>
            </span>
          );
        })}
      </div>

      <div className="mapa-conceitual__corpo">
        <img
          className="mapa-conceitual__personagem"
          src={characterSrc}
          alt="Personagem pensativo ao lado do mapa conceitual"
        />

        <div className="mapa-conceitual__fluxo">
          <div className="mapa-conceitual__titulo">Cientista (pesquisador)</div>
          <span className="mapa-conceitual__haste" aria-hidden />
          <div className="mapa-conceitual__subtitulo">trabalha por etapas, que incluem:</div>

          <ol className="mapa-conceitual__etapas">
            {STEPS.map((step) => (
              <li key={step.id} className="mapa-conceitual__etapa">
                {step.kind === 'fixed' ? (
                  <span className="mapa-conceitual__pilula">{step.text}</span>
                ) : (
                  <span className="mapa-conceitual__linha">
                    <span className="mapa-conceitual__prefixo">{step.prefix}</span>
                    <button
                      type="button"
                      className={`mapa-conceitual__lacuna${valueOf(step.id) ? ' is-preenchida' : ''}`}
                      onClick={() => handleBlankClick(step.id)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => handleDrop(step.id, event)}
                      disabled={showResults}
                      aria-label={`${step.prefix} ${valueOf(step.id) || 'espaço para preencher'}`}
                    >
                      {valueOf(step.id)}
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default MapaConceitualCientifico;
