import { MultipleChoiceQuestion, UserAnswers } from '../types/questions';
import { QuestionWrapper } from './shared/QuestionWrapper';

type ChoiceKey = 'a' | 'b' | 'c' | 'd';

const KEYS: ChoiceKey[] = ['a', 'b', 'c', 'd'];
const MARK = '#ea8244';
const RING = '#2aa3a0';

interface QuestionMultipleChoiceProps {
  question: MultipleChoiceQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: ChoiceKey) => void;
  showResults?: boolean;
}

function QuestionMultipleChoice({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionMultipleChoiceProps) {
  const selectedAnswer = userAnswers[question.id] as ChoiceKey | undefined;

  return (
    <QuestionWrapper
      number={question.number}
      question={question.question}
      useHTML
      className="px-0"
    >
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
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] bg-white text-[13px] font-bold leading-none"
                style={{ borderColor: RING, color: MARK }}
                aria-hidden
              >
                {isOn ? 'X' : ''}
              </span>
              <span className="text-[16px] leading-[150%] text-neutral-800">{question.options[key]}</span>
            </label>
          );
        })}
      </div>
      {showResults && selectedAnswer !== question.correctAnswer ? (
        <p className="mt-3 text-sm text-red-600">
          Resposta correta: <strong>{question.options[question.correctAnswer]}</strong>
        </p>
      ) : null}
    </QuestionWrapper>
  );
}

export default QuestionMultipleChoice;
