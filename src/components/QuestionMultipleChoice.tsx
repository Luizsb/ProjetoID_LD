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

  const options = hideInput ? null : (
    <>
      <div className="space-y-2.5">
        {KEYS.filter((key) => question.options[key]).map((key) => {
          const isOn = selectedAnswer === key;
          return (
            <label key={key} className="flex cursor-pointer items-start gap-2.5 select-none">
              <input
                type="radio"
                name={question.id}
                value={key}
                checked={isOn}
                onChange={() => onAnswerChange(question.id, key)}
                className="sr-only"
                disabled={showResults}
              />
              <span
                className={`mc-choice-mark mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] bg-white text-[13px] font-bold leading-none ${isOn ? 'is-on' : ''}`}
                style={{
                  borderColor: 'var(--mc-choice-ring, #2aa3a0)',
                  color: 'var(--mc-choice-mark, #ea8244)',
                }}
                aria-hidden
              >
                <span className="mc-choice-mark__x">{isOn ? 'X' : ''}</span>
                <span className="mc-choice-mark__letter">{key})</span>
              </span>
              <span
                className="text-[16px] leading-[150%] text-neutral-800"
                dangerouslySetInnerHTML={{ __html: question.options[key] || '' }}
              />
            </label>
          );
        })}
      </div>
      {showResults && selectedAnswer !== question.correctAnswer ? (
        <p className="mt-3 text-sm text-red-600">
          Resposta correta:{' '}
          <strong dangerouslySetInnerHTML={{ __html: question.options[question.correctAnswer] || '' }} />
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
      {options}
    </QuestionWrapper>
  );
}

export default QuestionMultipleChoice;
