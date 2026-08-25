import { MultipleChoiceQuestion, UserAnswers } from '../types/questions';
import { QuestionWrapper } from './shared/QuestionWrapper';

type ChoiceKey = 'a' | 'b' | 'c' | 'd' | 'e';

const KEYS: ChoiceKey[] = ['a', 'b', 'c', 'd', 'e'];

interface QuestionMultipleChoiceProps {
  question: MultipleChoiceQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: ChoiceKey) => void;
  showResults?: boolean;
  hidePrompt?: boolean;
  hideInput?: boolean;
}

function QuestionMultipleChoice({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
  hidePrompt = false,
  hideInput = false,
}: QuestionMultipleChoiceProps) {
  const selectedAnswer = userAnswers[question.id] as ChoiceKey | undefined;
  const answered = Boolean(selectedAnswer);
  const isCorrect = answered && selectedAnswer === question.correctAnswer;

  const options = hideInput ? null : (
    <>
      <div className="mc-choice-list">
        {KEYS.filter((key) => question.options[key]).map((key) => {
          const isOn = selectedAnswer === key;
          const isGabaritoCerta = showResults && key === question.correctAnswer;
          const isGabaritoErrada = showResults && isOn && key !== question.correctAnswer;

          return (
            <label
              key={key}
              className={`mc-choice${isOn && !showResults ? ' is-on' : ''}${
                isGabaritoCerta ? ' is-gabarito-certa' : ''
              }${isGabaritoErrada ? ' is-gabarito-errada' : ''}`}
            >
              <input
                type="radio"
                name={question.id}
                value={key}
                checked={isOn}
                onChange={() => onAnswerChange(question.id, key)}
                className="sr-only"
                disabled={showResults}
              />
              <span className="mc-choice__letra">{key})</span>
              <span className="mc-choice__select" aria-hidden="true">
                <span className="mc-choice__x">{isOn ? 'X' : ''}</span>
              </span>
              <span
                className="mc-choice__texto"
                dangerouslySetInnerHTML={{ __html: question.options[key] || '' }}
              />
              {isGabaritoCerta ? (
                <span className="mc-choice__badge mc-choice__badge--certa">Gabarito</span>
              ) : null}
              {isGabaritoErrada ? (
                <span className="mc-choice__badge mc-choice__badge--errada">Sua resposta</span>
              ) : null}
            </label>
          );
        })}
      </div>
      {showResults && !answered ? (
        <p className="gabarito-texto">
          Em branco — gabarito destacado em verde acima.
        </p>
      ) : null}
      {showResults && answered && !isCorrect ? (
        <p className="gabarito-texto">
          Alternativa marcada em vermelho; gabarito em verde.
        </p>
      ) : null}
    </>
  );

  if (hidePrompt) {
    return <div className="mb-6">{options}</div>;
  }

  return (
    <QuestionWrapper
      number={question.number}
      question={question.question}
      useHTML
      className={hideInput ? 'mb-2 px-0' : 'px-0'}
    >
      {question.media?.src ? (
        <figure className="mc-choice-media">
          <img
            src={question.media.src}
            alt={question.media.alt || ''}
          />
          {question.media.credit ? (
            <figcaption className="foto-com-credito-legenda">{question.media.credit}</figcaption>
          ) : null}
        </figure>
      ) : null}
      {question.questionAfterMedia ? (
        <p
          className="mc-choice-after-media"
          dangerouslySetInnerHTML={{ __html: question.questionAfterMedia }}
        />
      ) : null}
      {options}
    </QuestionWrapper>
  );
}

export default QuestionMultipleChoice;
