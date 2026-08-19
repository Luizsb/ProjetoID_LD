import { TextInputQuestion, UserAnswers } from '../types/questions';
import QuestionTextInputWithEmbedded from './QuestionTextInputWithEmbedded';

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
  if (question.embeddedContent || question.followUpQuestion) {
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
    return (
      <div className="mb-6">
        {/* Título principal com número */}
        <p className="mb-4">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #80298F)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>
        
        {/* Subquestões */}
        <div className="space-y-4">
          {question.subQuestions.map((subQ) => {
            const subQuestionId = `${question.id}_${subQ.letter}`;
            const subUserAnswer = (userAnswers[subQuestionId] as string) || '';
            
            return (
              <div key={subQ.letter} className="mb-4">
                <p className="mb-2">
                  <span className="question-number" style={{ color: 'var(--question-number-color, #80298F)', fontWeight: 'bold' }}>{subQ.letter}) </span>
                  <span style={{ color: 'black' }}>{subQ.question}</span>
                </p>
                
                {/* Subquestões aninhadas (com bullets) */}
                {subQ.subItems && subQ.subItems.length > 0 ? (
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
                          <p className="mb-2" style={{ color: 'black' }}>
                            {subItem.label}
                          </p>
                          <textarea
                            value={subItemAnswer}
                            onChange={(e) => onAnswerChange(subItemId, e.target.value)}
                            placeholder={subItem.placeholder || 'Digite aqui...'}
                            disabled={showResults}
                            className="min-h-[60px] w-full resize-y rounded-lg border border-gray-300 p-3 font-myriad-vf text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mt-2 block h-[31px] w-[765px] max-w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] font-normal leading-normal text-[#000000] placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none resize-none"
                  />
                )}
                
                {showResults && subQ.correctAnswer && !subQ.subItems && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                    <p className="font-semibold text-gray-700 mb-1">Resposta esperada:</p>
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
              <span className="question-number font-bold" style={{ color: 'var(--question-number-color, #80298F)' }}>{question.number}. </span>
            )}
            <span dangerouslySetInnerHTML={{ __html: question.question }} />
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
          <span className="question-number" style={{ color: 'var(--question-number-color, #80298F)', fontWeight: 'bold' }}>{question.number}. </span>
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

