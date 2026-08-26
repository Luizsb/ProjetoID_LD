import { MultipleSelectQuestion, UserAnswers } from '../types/questions';
import { QuestionWrapper } from './shared/QuestionWrapper';

const MARK = '#ea8244';
const RING = '#2aa3a0';

interface QuestionMultipleSelectProps {
  question: MultipleSelectQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: number[]) => void;
  showResults?: boolean;
  hidePrompt?: boolean;
}

function selectedIndices(value: UserAnswers[string] | undefined): number[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is number => typeof item === 'number');
  }
  if (typeof value === 'number') {
    return [value];
  }
  return [];
}

function QuestionMultipleSelect({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
  hidePrompt = false,
}: QuestionMultipleSelectProps) {
  const selected = selectedIndices(userAnswers[question.id]);
  const columns = question.columns ?? 3;
  const rows = Math.ceil(question.options.length / columns);

  const toggle = (index: number) => {
    if (showResults) return;
    if (question.exclusive) {
      onAnswerChange(question.id, selected.includes(index) ? [] : [index]);
      return;
    }
    const next = selected.includes(index)
      ? selected.filter((item) => item !== index)
      : [...selected, index].sort((a, b) => a - b);
    onAnswerChange(question.id, next);
  };

  const options = (
    <>
      <div
        className={`${hidePrompt ? 'mt-0' : 'mt-3'} grid gap-x-8 gap-y-3`}
        style={{
          gridTemplateColumns: `repeat(${columns}, max-content)`,
          gridTemplateRows: `repeat(${rows}, auto)`,
          gridAutoFlow: 'column',
        }}
      >
        {question.options.map((option, index) => {
          const isOn = selected.includes(index);
          const hasKey = question.correctAnswer.length > 0;
          const shouldBeOn = question.correctAnswer.includes(index);
          return (
            <label key={option} className="flex cursor-pointer items-center gap-2 select-none">
              {question.showLetters ? (
                <span className="question-letter w-7 shrink-0">{String.fromCharCode(65 + index)})</span>
              ) : null}
              <input
                type="checkbox"
                checked={isOn}
                disabled={showResults}
                onChange={() => toggle(index)}
                className="sr-only"
              />
              <span
                className="ms-choice-mark flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] bg-white text-[13px] font-bold leading-none"
                style={{
                  borderColor: RING,
                  color: MARK,
                }}
                aria-hidden
              >
                {isOn ? 'X' : ''}
              </span>
              <span className="text-[15px] text-neutral-800">{option}</span>
              {showResults && hasKey && isOn !== shouldBeOn ? (
                <span className="text-xs text-red-600">{shouldBeOn ? 'faltou' : 'não'}</span>
              ) : null}
            </label>
          );
        })}
      </div>
      {showResults && question.correctAnswer.length > 0 ? (
        <p className="mt-3 text-sm text-neutral-600">
          Respostas corretas: {question.correctAnswer.map((index) => question.options[index]).join(', ')}
        </p>
      ) : null}
    </>
  );

  if (hidePrompt) {
    return <div className="mb-3">{options}</div>;
  }

  return (
    <QuestionWrapper number={question.number} question={question.question} useHTML className="px-0">
      {options}
    </QuestionWrapper>
  );
}

export default QuestionMultipleSelect;
