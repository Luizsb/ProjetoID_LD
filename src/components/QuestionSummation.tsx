import { SummationQuestion, UserAnswers } from '../types/questions';
import { QuestionWrapper } from './shared/QuestionWrapper';

interface QuestionSummationProps {
  question: SummationQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

interface SomaPayload {
  selected: number[];
  sum: string;
}

function parsePayload(raw: unknown): SomaPayload {
  if (typeof raw !== 'string' || !raw.trim()) {
    return { selected: [], sum: '' };
  }
  try {
    const parsed = JSON.parse(raw) as { selected?: number[]; sum?: number | string };
    const selected = Array.isArray(parsed.selected)
      ? parsed.selected.filter((n) => typeof n === 'number')
      : [];
    const sum =
      parsed.sum === undefined || parsed.sum === null || parsed.sum === ''
        ? selected.length
          ? String(selected.reduce((acc, n) => acc + n, 0))
          : ''
        : String(parsed.sum);
    return { selected, sum };
  } catch {
    const onlyDigits = raw.replace(/\D/g, '');
    return { selected: [], sum: onlyDigits };
  }
}

function QuestionSummation({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionSummationProps) {
  const { selected, sum } = parsePayload(userAnswers[question.id]);
  const answered = sum !== '' || selected.length > 0;
  const displaySum = sum !== '' ? Number(sum) : selected.reduce((acc, n) => acc + n, 0);
  const isCorrect = answered && displaySum === question.correctAnswer;
  const isWrong = answered && !isCorrect;

  const commit = (nextSelected: number[], nextSum: string) => {
    onAnswerChange(
      question.id,
      JSON.stringify({
        selected: nextSelected,
        sum: nextSum,
      }),
    );
  };

  const toggle = (value: number) => {
    if (showResults) return;
    const nextSelected = selected.includes(value)
      ? selected.filter((n) => n !== value)
      : [...selected, value].sort((a, b) => a - b);
    const nextSum = String(nextSelected.reduce((acc, n) => acc + n, 0));
    commit(nextSelected, nextSelected.length ? nextSum : '');
  };

  const handleSumInput = (value: string) => {
    if (showResults) return;
    commit(selected, value.replace(/\D/g, ''));
  };

  return (
    <QuestionWrapper number={question.number} question={question.question} useHTML className="px-0">
      <div className="soma-questao">
        <ul className="soma-questao__lista">
          {question.statements.map((stmt) => {
            const isOn = selected.includes(stmt.value);
            const valueLabel = String(stmt.value).padStart(2, '0');
            return (
              <li key={stmt.value}>
                <label
                  className={`soma-questao__item${isOn && !showResults ? ' is-on' : ''}${
                    showResults && stmt.correct ? ' is-correta' : ''
                  }${showResults && isOn && !stmt.correct ? ' is-errada' : ''}`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isOn}
                    disabled={showResults}
                    onChange={() => toggle(stmt.value)}
                  />
                  <span className="soma-questao__valor">({valueLabel})</span>
                  <span className="soma-questao__check" aria-hidden>
                    {isOn ? '✓' : ''}
                  </span>
                  <span
                    className="soma-questao__texto"
                    dangerouslySetInnerHTML={{ __html: stmt.text }}
                  />
                </label>
              </li>
            );
          })}
        </ul>

        <div className="soma-questao__resposta">
          <label className="soma-questao__soma-label" htmlFor={`${question.id}-soma`}>
            Soma
          </label>
          <input
            id={`${question.id}-soma`}
            type="text"
            inputMode="numeric"
            className={`soma-questao__soma-input${
              showResults && isCorrect ? ' is-correta' : ''
            }${showResults && isWrong ? ' is-errada' : ''}${
              showResults && !answered ? ' is-em-branco' : ''
            }`}
            value={sum}
            onChange={(e) => handleSumInput(e.target.value)}
            placeholder="?"
            disabled={showResults}
            aria-label="Digite a soma das proposições corretas"
          />
        </div>

        {showResults ? (
          <p className="gabarito-texto">
            Gabarito:{' '}
            <strong>
              {question.correctAnswer}
              {question.correctAnswerDetail ? ` (${question.correctAnswerDetail})` : ''}
            </strong>
            {!answered ? ' — questão em branco.' : null}
          </p>
        ) : null}
      </div>
    </QuestionWrapper>
  );
}

export default QuestionSummation;
