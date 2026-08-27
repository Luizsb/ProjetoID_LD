import { TextInputQuestion, UserAnswers } from '../types/questions';
import QuestionTextInputWithEmbedded from './QuestionTextInputWithEmbedded';
import AreaDesenho from './AreaDesenho';
import CampoFracao from './CampoFracao';
import AutoExpandTextarea from './AutoExpandTextarea';

interface QuestionTextInputProps {
  question: TextInputQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
  hidePrompt?: boolean;
  hideInput?: boolean;
}

function QuestionTextInput({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
  hidePrompt = false,
  hideInput = false,
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
      'mt-2 block w-[765px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none';

    return (
      <div className={hidePrompt || hideInput ? 'mb-2' : 'mb-6'}>
        {!hidePrompt ? (
        <p className="mb-4">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          {question.letter ? (
            <span className="question-letter">{question.letter}) </span>
          ) : null}
          <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>
        ) : null}

        {!hideInput && question.media ? (
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

        {!hideInput ? (
          <>
        {question.exampleHtml ? (
          <div
            className="caixa-exemplo-dizima"
            dangerouslySetInnerHTML={{ __html: question.exampleHtml }}
          />
        ) : null}

        <div
          className={
            question.subQuestionsLayout === 'grid-2'
              ? `geratriz-grade${
                  (question.subQuestions?.length ?? 0) > 6
                    ? ' geratriz-grade--col-split'
                    : (question.subQuestions?.length ?? 0) === 6 ||
                        (question.subQuestions?.length ?? 0) === 5
                      ? ' geratriz-grade--col-split-3'
                      : (question.subQuestions?.length ?? 0) === 4
                        ? ''
                        : ' geratriz-grade--seq'
                }`
              : question.subQuestionsLayout === 'grid-3'
                ? `geratriz-grade geratriz-grade--3${
                    (question.subQuestions?.length ?? 0) > 6 ? ' geratriz-grade--3-tall' : ''
                  }`
                : 'space-y-4'
          }
        >
          {question.subQuestions.map((subQ, subIndex) => {
            const subQuestionId = `${question.id}_${subQ.letter || subIndex}`;
            const subUserAnswer = (userAnswers[subQuestionId] as string) || '';
            const [firstFrac, secondFrac = ''] = subUserAnswer.split(/\s*=\s*/);
            const isFractionRow = subQ.inputKind === 'fraction' || subQ.inputKind === 'fractions';
            const isInlineRow = subQ.inputKind === 'inline';
            const isFractionDecimal = subQ.inputKind === 'fraction-decimal';
            const [fracPart = '', decimalPart = ''] = isFractionDecimal
              ? subUserAnswer.split('||')
              : [firstFrac, secondFrac];

            return (
              <div key={`${subQ.letter || 'item'}-${subIndex}`} className={isFractionRow || isInlineRow || isFractionDecimal ? 'geratriz-item geratriz-item--wrap' : 'mb-4'}>
                {isFractionDecimal ? (
                  <>
                    {subQ.letter ? (
                      <span className="question-letter">{subQ.letter}) </span>
                    ) : null}
                    {subQ.question ? (
                      <span
                        className="geratriz-item__dizima"
                        dangerouslySetInnerHTML={{ __html: subQ.question }}
                      />
                    ) : null}
                    <span className="geratriz-item__igual">=</span>
                    <CampoFracao
                      value={fracPart}
                      disabled={showResults}
                      ariaLabel={`Item ${subQ.letter}, forma fracionária`}
                      onChange={(value) =>
                        onAnswerChange(subQuestionId, `${value}||${decimalPart}`)
                      }
                    />
                    <span className="geratriz-item__igual">=</span>
                    <input
                      type="text"
                      value={decimalPart}
                      disabled={showResults}
                      placeholder={subQ.placeholder || 'decimal'}
                      onChange={(event) =>
                        onAnswerChange(subQuestionId, `${fracPart}||${event.target.value}`)
                      }
                      className="geratriz-item__texto geratriz-item__texto--curto"
                      aria-label={`Item ${subQ.letter}, forma decimal`}
                    />
                    {showResults && subQ.correctAnswer ? (
                      <span
                        className="resposta-professor"
                        dangerouslySetInnerHTML={{ __html: subQ.correctAnswer }}
                      />
                    ) : null}
                  </>
                ) : isFractionRow ? (
                  <>
                    {subQ.letter ? (
                      <span className="question-letter">{subQ.letter}) </span>
                    ) : null}
                    {subQ.question ? (
                      <span
                        className="geratriz-item__dizima"
                        dangerouslySetInnerHTML={{ __html: subQ.question }}
                      />
                    ) : null}
                    <span className="geratriz-item__igual">=</span>
                    <CampoFracao
                      value={firstFrac}
                      disabled={showResults}
                      ariaLabel={`Item ${subQ.letter}, fração`}
                      onChange={(value) => {
                        if (subQ.inputKind === 'fractions') {
                          onAnswerChange(
                            subQuestionId,
                            secondFrac ? `${value} = ${secondFrac}` : value,
                          );
                          return;
                        }
                        onAnswerChange(subQuestionId, value);
                      }}
                    />
                    {subQ.inputKind === 'fractions' ? (
                      <>
                        <span className="geratriz-item__igual">=</span>
                        <CampoFracao
                          value={secondFrac}
                          disabled={showResults}
                          ariaLabel={`Item ${subQ.letter}, fração simplificada`}
                          onChange={(value) =>
                            onAnswerChange(
                              subQuestionId,
                              `${firstFrac || ''} = ${value}`.trim(),
                            )
                          }
                        />
                      </>
                    ) : null}
                    {showResults && subQ.correctAnswer ? (
                      <span
                        className="resposta-professor"
                        dangerouslySetInnerHTML={{ __html: subQ.correctAnswer }}
                      />
                    ) : null}
                  </>
                ) : isInlineRow ? (
                  <>
                    {subQ.letter ? (
                      <span className="question-letter">{subQ.letter}) </span>
                    ) : null}
                    {subQ.question ? (
                      <span
                        className="geratriz-item__dizima"
                        dangerouslySetInnerHTML={{ __html: subQ.question }}
                      />
                    ) : null}
                    {/≅|≈/.test(subQ.question || '') ? null : (
                      <span className="geratriz-item__igual">=</span>
                    )}
                    <AutoExpandTextarea
                      value={subUserAnswer}
                      disabled={showResults}
                      placeholder={subQ.placeholder || ''}
                      onChange={(value) => onAnswerChange(subQuestionId, value)}
                      expand="horizontal"
                      className="geratriz-item__texto geratriz-item__texto--curto"
                      aria-label={`Item ${subQ.letter}`}
                    />
                    {showResults && subQ.correctAnswer ? (
                      <span
                        className="resposta-professor"
                        dangerouslySetInnerHTML={{ __html: subQ.correctAnswer }}
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                <p className="mb-2">
                  {subQ.letter ? (
                    <span className="question-letter">{subQ.letter}) </span>
                  ) : null}
                  {subQ.question ? <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: subQ.question }} /> : null}
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
                          {/≅|≈/.test(subItem.label) ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <ul className="mb-0 ml-6 list-disc">
                                <li className="text-black">{subItem.label}</li>
                              </ul>
                              <AutoExpandTextarea
                                value={subItemAnswer}
                                onChange={(value) => onAnswerChange(subItemId, value)}
                                placeholder={subItem.placeholder || ''}
                                disabled={showResults}
                                expand="horizontal"
                                className="geratriz-item__texto geratriz-item__texto--curto"
                              />
                            </div>
                          ) : (
                            <>
                              <ul className="mb-2 ml-6 list-disc">
                                <li className="text-black">{subItem.label}</li>
                              </ul>
                              <AutoExpandTextarea
                                value={subItemAnswer}
                                onChange={(value) => onAnswerChange(subItemId, value)}
                                placeholder={subItem.placeholder || ''}
                                disabled={showResults}
                                className={simpleTextareaClass}
                              />
                            </>
                          )}
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
                  <AutoExpandTextarea
                    value={subUserAnswer}
                    onChange={(value) => onAnswerChange(subQuestionId, value)}
                    placeholder={subQ.placeholder || ''}
                    disabled={showResults}
                    className={simpleTextareaClass}
                  />
                )}

                {showResults && subQ.correctAnswer && !subQ.subItems && !subQ.hideAnswerField && (
                  <div
                    className="resposta-professor mt-2 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: subQ.correctAnswer }}
                  />
                )}
                  </>
                )}
              </div>
            );
          })}
        </div>
          </>
        ) : null}
      </div>
    );
  }

  const simpleTextareaClass =
    'mt-2 block w-[765px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none';

  // Formato simples (sem subquestões)
  if (question.listDiscLayout) {
    return (
      <div className="mb-6 rounded-lg">
        <ul className="list-disc ml-6">
          <li className="text-black">
            {question.number !== undefined && (
              <span className="question-number font-bold" style={{ color: 'var(--question-number-color, #ea8244)' }}>{question.number}. </span>
            )}
            {question.letter ? (
              <span className="question-letter">{question.letter}) </span>
            ) : null}
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
            <AutoExpandTextarea
              value={userAnswer}
              onChange={(value) => onAnswerChange(question.id, value)}
              placeholder={question.placeholder || ''}
              disabled={showResults}
              className={simpleTextareaClass}
            />
            {showResults && question.correctAnswer && (
              <div
                className="resposta-professor mt-3 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: question.correctAnswer }}
              />
            )}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={hidePrompt || hideInput ? 'mb-2 rounded-lg' : 'mb-6 rounded-lg'}>
      {!hidePrompt && (
        <p className="mb-4">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          {question.letter ? (
            <span className="question-letter">{question.letter}) </span>
          ) : null}
          <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>
      )}
      {!hideInput && question.media ? (
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
        </div>
      ) : null}
      {!hideInput && (
        <>
          <AutoExpandTextarea
            value={userAnswer}
            onChange={(value) => onAnswerChange(question.id, value)}
            placeholder={question.placeholder || ''}
            disabled={showResults}
            className="campo-texto-expansivel w-[765px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none"
          />
          {showResults && question.correctAnswer && (
            <div
              className="resposta-professor mt-3 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: question.correctAnswer }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default QuestionTextInput;

