import { FillBlanksQuestion, UserAnswers } from '../types/questions';

interface QuestionFillBlanksProps {
  question: FillBlanksQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
  hidePrompt?: boolean;
  hideInput?: boolean;
}

function QuestionFillBlanks({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
  hidePrompt = false,
  hideInput = false,
}: QuestionFillBlanksProps) {
  const hideLetters = Boolean(question.hideItemLetters || question.listDiscLayout);
  const shortBlank =
    Boolean(question.hideItemLetters) &&
    question.items.every((item) =>
      (item.correctAnswers ?? []).every((answer) => (answer?.length ?? 0) <= 1),
    );

  return (
    <div className={hidePrompt || hideInput ? 'mb-2' : 'mb-6'}>
      {hidePrompt ? null : (
      <p className="mb-4 text-black">
        {question.number !== undefined && (
          <span className="question-number font-bold" style={{ color: 'var(--question-number-color, #80298F)' }}>{question.number}. </span>
        )}
        <span dangerouslySetInnerHTML={{ __html: question.question }} />
      </p>
      )}

      {!hideInput && question.media?.src ? (
        <figure className="foto-com-credito foto-com-credito--lg">
          <img src={question.media.src} alt={question.media.alt || ''} />
          {question.media.credit ? (
            <figcaption>{question.media.credit}</figcaption>
          ) : null}
          {question.media.caption ? (
            <p
              className="text-[10px] text-slate-600 mt-2"
              style={{ fontSize: '10px' }}
              dangerouslySetInnerHTML={{ __html: question.media.caption }}
            />
          ) : null}
        </figure>
      ) : null}

      {!hideInput && question.questionAfterMedia ? (
        <p
          className="mb-4 text-black"
          dangerouslySetInnerHTML={{ __html: question.questionAfterMedia }}
        />
      ) : null}

      {hideInput ? null : (
      <ul
        className={`${question.listDiscLayout ? 'ml-6 list-disc' : 'ml-0 list-none'} space-y-4${
          question.items.some((item) => item.choiceOptions?.length) || question.itemsLayout === 'grid-3'
            ? ' questao-pertence'
            : ''
        }${question.itemsLayout === 'grid-3' ? ' questao-pertence--raiz' : ''}`}
      >
        {question.items.map((item) => (
          <li key={item.letter} className="text-black">
            {hideLetters ? null : (
              <span className="question-letter mr-2">{item.letter})</span>
            )}
            {item.fragments.map((fragment, index) => {
              const blankId = `${question.id}_${item.letter}_${index}`;
              const typedValue = (userAnswers[blankId] as string) || '';
              const expectedValue = item.correctAnswers?.[index] || '';
              const value = showResults && expectedValue ? expectedValue : typedValue;
              const placeholder = item.placeholders?.[index] || '';
              const isLastFragment = index === item.fragments.length - 1;

              return (
                <span key={`${item.letter}_${index}`}>
                  <span dangerouslySetInnerHTML={{ __html: fragment }} />
                  {!isLastFragment && (
                    item.choiceOptions && item.choiceOptions.length > 0 ? (
                      <span className="pertence-opcoes">
                        {item.choiceOptions.map((option) => {
                          const isOn = value === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              className={`pertence-opcoes__botao${isOn ? ' is-ativa' : ''}`}
                              disabled={showResults}
                              onClick={() => onAnswerChange(blankId, isOn ? '' : option)}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </span>
                    ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => onAnswerChange(blankId, e.target.value)}
                      disabled={showResults}
                      placeholder={placeholder}
                      className={`mx-1 inline-block h-[31px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-2 pt-1 align-middle text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none${
                        question.itemsLayout === 'grid-3' || shortBlank ? ' w-[2.6rem] text-center' : ' px-3'
                      }${showResults && expectedValue ? ' resposta-professor' : ''}`}
                      style={
                        question.itemsLayout === 'grid-3' || shortBlank
                          ? undefined
                          : { width: `${Math.min(Math.max((expectedValue.length || 12) * 10 + 28, 160), 280)}px` }
                      }
                      maxLength={shortBlank ? 1 : undefined}
                    />
                    )
                  )}
                </span>
              );
            })}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default QuestionFillBlanks;
