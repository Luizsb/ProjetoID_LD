import { TextInputQuestion, UserAnswers } from '../types/questions';
import QuestionTextInputWithEmbedded from './QuestionTextInputWithEmbedded';
import AreaDesenho from './AreaDesenho';

interface QuestionTextInputProps {
  question: TextInputQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

function QuestionTextInput({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionTextInputProps) {
  const userAnswer = (userAnswers[question.id] as string) || '';

  // Se tiver conteúdo embutido ou pergunta de acompanhamento, usa formato especial
  // (exceto listDiscLayout, que trata o destaque no layout de bullet)
  if ((question.embeddedContent || question.followUpQuestion) && !question.listDiscLayout) {
    return (
      <QuestionTextInputWithEmbedded
        question={question}
        userAnswers={userAnswers}
        onAnswerChange={onAnswerChange}
        showResults={showResults}
      />
    );
  }

  // Se tiver subquestões, renderiza o formato com número e letras
  if (question.subQuestions && question.subQuestions.length > 0) {
    const simpleTextareaClass =
      'mt-2 block h-[31px] w-[765px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none resize-none';

    return (
      <div className="mb-6">
        <p className="mb-4">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>

        {question.media ? (
          <div className="mb-6 flex flex-col items-center">
            {question.media.drawing ? (
              <AreaDesenho
                backgroundImage={question.media.src}
                storageKey={question.media.drawing.storageKey}
                width={question.media.drawing.width ?? 492}
                height={question.media.drawing.height ?? 794}
                hint={
                  question.media.drawing.hint ??
                  'Marque o X e trace o trajeto sobre a imagem'
                }
                borderColor={question.media.drawing.borderColor ?? '#80298F'}
                maxWidth={question.media.drawing.maxWidth ?? '100%'}
                className="w-full"
              />
            ) : (
              <figure className="foto-com-credito foto-com-credito--lg">
                <img
                  src={question.media.src}
                  alt={question.media.alt || ''}
                />
                {question.media.credit ? (
                  <figcaption>{question.media.credit}</figcaption>
                ) : null}
              </figure>
            )}
            {question.media.drawing && question.media.credit ? (
              <figcaption className="foto-com-credito-legenda mb-4">
                {question.media.credit}
              </figcaption>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-4">
          {question.subQuestions.map((subQ) => {
            const subQuestionId = `${question.id}_${subQ.letter}`;
            const subUserAnswer = (userAnswers[subQuestionId] as string) || '';

            return (
              <div key={subQ.letter} className="mb-4">
                <p className="mb-2">
                  {subQ.letter ? (
                    <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{subQ.letter}) </span>
                  ) : null}
                  {subQ.question ? <span style={{ color: 'black' }}>{subQ.question}</span> : null}
                </p>

                {subQ.hideAnswerField ? null : subQ.choices && subQ.choices.length > 0 ? (
                  <div
                    className={`mt-2 flex ${
                      subQ.choicesStacked
                        ? 'flex-col items-start gap-y-3'
                        : 'flex-wrap items-center gap-x-8 gap-y-2'
                    }`}
                  >
                    {subQ.choices.map((choice) => {
                      const isOn = subUserAnswer === choice;
                      return (
                        <label key={choice} className="flex cursor-pointer items-center gap-2 select-none">
                          <input
                            type="checkbox"
                            checked={isOn}
                            disabled={showResults}
                            onChange={() =>
                              onAnswerChange(subQuestionId, isOn ? '' : choice)
                            }
                            className="sr-only"
                          />
                          <span
                            className="choice-x-box"
                            aria-hidden
                          >
                            {isOn ? 'X' : ''}
                          </span>
                          <span className="text-[15px] text-black">{choice}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : subQ.subItems && subQ.subItems.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {subQ.subItems.map((subItem, index) => {
                      const subItemId = `${subQuestionId}_${index}`;
                      const subItemAnswer = (userAnswers[subItemId] as string) || '';

                      if (subItem.circleInput) {
                        return (
                          <div key={index} className="mb-2 flex items-start gap-2">
                            <input
                              type="text"
                              maxLength={2}
                              value={subItemAnswer}
                              onChange={(e) => onAnswerChange(subItemId, e.target.value.toUpperCase())}
                              placeholder=""
                              disabled={showResults}
                              className="hnc-circle"
                              aria-label={subItem.label}
                            />
                            <span className="pt-1 text-black">{subItem.label}</span>
                          </div>
                        );
                      }

                      return (
                        <div key={index} className="mb-3">
                          <ul className="mb-2 ml-6 list-disc">
                            <li className="text-black">{subItem.label}</li>
                          </ul>
                          <textarea
                            value={subItemAnswer}
                            onChange={(e) => onAnswerChange(subItemId, e.target.value)}
                            placeholder={subItem.placeholder || 'Digite aqui...'}
                            disabled={showResults}
                            className={simpleTextareaClass}
                          />
                          {showResults && subItem.correctAnswer && (
                            <div className="mt-2 rounded bg-gray-100 p-2 text-sm">
                              <p className="mb-1 font-semibold text-gray-700">Resposta esperada:</p>
                              <p className="text-gray-600">{subItem.correctAnswer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    value={subUserAnswer}
                    onChange={(e) => onAnswerChange(subQuestionId, e.target.value)}
                    placeholder={subQ.placeholder || 'Digite aqui...'}
                    disabled={showResults}
                    className={simpleTextareaClass}
                  />
                )}

                {showResults && subQ.correctAnswer && !subQ.subItems && !subQ.hideAnswerField && (
                  <div className="mt-2 rounded bg-gray-100 p-2 text-sm">
                    <p className="mb-1 font-semibold text-gray-700">Resposta esperada:</p>
                    <p className="text-gray-600">{subQ.correctAnswer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const simpleTextareaClass =
    'mt-2 block h-[31px] w-[765px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none resize-none';

  // Formato simples (sem subquestões)
  if (question.listDiscLayout) {
    return (
      <div className="mb-6 rounded-lg">
        <ul className="list-disc ml-6">
          <li className="text-black">
            {question.number !== undefined && (
              <span className="question-number font-bold" style={{ color: 'var(--question-number-color, #ea8244)' }}>{question.number}. </span>
            )}
            <span dangerouslySetInnerHTML={{ __html: question.question }} />
            {question.embeddedContent ? (
              <div
                className="mx-auto my-4 w-fit max-w-full rounded-[20px] px-10 py-5 text-center text-black"
                style={{
                  backgroundColor: '#d7dcef',
                  ...(question.embeddedContentMaxWidth
                    ? { maxWidth: question.embeddedContentMaxWidth }
                    : {}),
                }}
              >
                {question.embeddedContent}
              </div>
            ) : null}
            <textarea
              value={userAnswer}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder || 'Digite aqui...'}
              disabled={showResults}
              className={simpleTextareaClass}
            />
            {showResults && question.correctAnswer && (
              <div className="mt-3 p-3 bg-gray-100 rounded">
                <p className="text-sm font-semibold text-gray-700 mb-1">Resposta esperada:</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{question.correctAnswer}</p>
              </div>
            )}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg">
      <p className="mb-4">
        {question.number !== undefined && (
          <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
        )}
        <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
      </p>
      <textarea
        value={userAnswer}
        onChange={(e) => onAnswerChange(question.id, e.target.value)}
        placeholder={question.placeholder || 'Digite aqui...'}
        disabled={showResults}
        className="h-[31px] w-[765px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none resize-none"
      />
      {showResults && question.correctAnswer && (
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-1">Resposta esperada:</p>
          <p className="text-sm text-gray-600">{question.correctAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionTextInput;

