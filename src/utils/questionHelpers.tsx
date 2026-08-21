import React from 'react';
import { Question } from '../types/questions';

/**
 * Renderiza a resposta correta de uma questão para a visão do professor
 */
export function renderQuestionAnswer(question: Question): React.ReactNode {
  if (question.type === 'text-input') {
    // Se tiver subquestões, renderiza cada uma
    if (question.subQuestions && question.subQuestions.length > 0) {
      return question.subQuestions.map((subQ, index) => {
        // Se tiver subItems, renderiza com bullets
        if (subQ.subItems && subQ.subItems.length > 0) {
          const answers = subQ.subItems
            .map((item) => `${item.label} ${item.correctAnswer || ''}`.trim())
            .join(' ');
          return (
            <p key={subQ.letter} className="mb-2">
              {question.number !== undefined && (
                <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>
                  {question.number}.{' '}
                </span>
              )}
              <span className="question-letter">
                {subQ.letter}){' '}
              </span>
              <span>{answers}</span>
            </p>
          );
        }
        // Se não tiver subItems, renderiza normalmente
        return (
          <p key={subQ.letter} className="mb-3">
            {index === 0 && question.number !== undefined && (
              <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
            )}
            <span className="question-letter">{subQ.letter}) </span>
            <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
          </p>
        );
      });
    }
    // Se não tiver subquestões, renderiza a resposta direta
    if (question.correctAnswer) {
      if (question.listDiscLayout) {
        return (
          <ul className="list-disc ml-6 mb-3">
            <li className="text-black">
              {question.number !== undefined && (
                <span className="question-number font-bold" style={{ color: 'var(--question-number-color, #ea8244)' }}>{question.number}. </span>
              )}
              <span dangerouslySetInnerHTML={{ __html: question.correctAnswer }} />
            </li>
          </ul>
        );
      }
      return (
        <p className="mb-3">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          <span dangerouslySetInnerHTML={{ __html: question.correctAnswer }} />
        </p>
      );
    }
  }

  if (question.type === 'true-false') {
    if (question.statements && question.statements.length > 0) {
      return question.statements.map((stmt) => {
        const correctAnswerText = stmt.correctAnswer ? 'Verdadeiro (V)' : 'Falso (F)';
        const answerText = stmt.correction
          ? `${correctAnswerText}. ${stmt.correction}`
          : correctAnswerText;

        return (
          <p key={stmt.letter} className="mb-3">
            {question.number !== undefined && (
              <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
            )}
            <span className="question-letter">{stmt.letter}) </span>
            <span dangerouslySetInnerHTML={{ __html: answerText }} />
          </p>
        );
      });
    }
    // Formato antigo
    if (question.correctAnswer !== undefined) {
      return (
        <p className="mb-3">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          <span>{question.correctAnswer ? 'Verdadeiro' : 'Falso'}</span>
        </p>
      );
    }
  }

  if (question.type === 'alternative') {
    const correctOption = question.options[question.correctAnswer];
    const correctLetter = String.fromCharCode(97 + question.correctAnswer);
    return (
      <p className="mb-3">
        {question.number !== undefined && (
          <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
        )}
        <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{correctLetter}) </span>
        <span dangerouslySetInnerHTML={{ __html: correctOption || '' }} />
      </p>
    );
  }

  if (question.type === 'multiple-select') {
    const labels = question.correctAnswer.map((index) => question.options[index]).join(', ');
    return (
      <p className="mb-3">
        {question.number !== undefined && (
          <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
        )}
        <span>{labels}</span>
      </p>
    );
  }

  if (question.type === 'multiple-choice') {
    const letter = question.letter ?? question.correctAnswer.toUpperCase();
    const answer = question.teacherAnswer ?? question.options[question.correctAnswer];
    return (
      <p className="mb-3">
        {question.number !== undefined && (
          <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
        )}
        <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{letter}. </span>
        <span dangerouslySetInnerHTML={{ __html: answer }} />
      </p>
    );
  }

  if (question.type === 'table-fill') {
    return (
      <>
        {/* Respostas da tabela */}
        {question.correctAnswer && (
          <>
            <p className="mb-2 font-semibold">
              {question.number !== undefined && (
                <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
              )}
              Tabela:
            </p>
            {question.rows.map((row) => {
              const correctAnswers = question.correctAnswer!;
              const firstColumnKey = Object.keys(row).find(key => key !== 'id') || 'paragraph';
              const firstColumnValue = row[firstColumnKey] || '';

              const columnAnswers = question.columns.slice(1).map((columnName, colIndex) => {
                const fieldId = `${question.id}_${row.id}_col${colIndex + 1}`;
                return {
                  columnName,
                  answer: correctAnswers[fieldId] || ''
                };
              });

              return (
                <div key={row.id} className="mb-4">
                  <p className="mb-2 font-semibold" style={{ color: '#0E3B5D' }}>
                    {question.columns[0]} {firstColumnValue}:
                  </p>
                  {columnAnswers.map((colAnswer, idx) => (
                    <p key={idx} className="mb-1">
                      <strong>{colAnswer.columnName}:</strong> {colAnswer.answer}
                    </p>
                  ))}
                </div>
              );
            })}
          </>
        )}
        {/* Respostas das subquestões */}
        {question.subQuestions && question.subQuestions.length > 0 && (
          <>
            <p className="mb-2 mt-4 font-semibold">Subquestões:</p>
            {question.subQuestions.map((subQ) => (
              <p key={subQ.letter} className="mb-3">
                <span className="question-letter">{subQ.letter}) </span>
                <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
              </p>
            ))}
          </>
        )}
      </>
    );
  }

  if (question.type === 'fill-blanks') {
    return (
      <div className="mb-3">
        <p className="mb-2">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          <span dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>
        <ul className="list-none ml-0 space-y-2">
          {question.items.map((item) => {
            const promptIsLetter = item.letter.trim().length === 1;
            const answers = item.correctAnswers?.filter(Boolean) ?? [];
            return (
              <li key={item.letter}>
                <span className="question-letter">
                  {promptIsLetter ? `${item.letter})` : item.letter}
                </span>
                {promptIsLetter ? ' ' : ' → '}
                {answers.length ? (
                  <span>{answers.join(' | ')}</span>
                ) : (
                  <span>Sem resposta esperada cadastrada.</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (question.type === 'ordering') {
    return (
      <div className="mb-3">
        <p className="mb-2">
          {question.number !== undefined && (
            <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{question.number}. </span>
          )}
          <span dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>
        <ul className="list-none ml-8 space-y-2">
          {question.items.map((item) => (
            <li key={item.id}>
              <span className="question-number" style={{ color: 'var(--question-number-color, #ea8244)', fontWeight: 'bold' }}>{item.correctOrder}. </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

/**
 * Renderiza múltiplas respostas de questões
 */
export function renderMultipleQuestionAnswers(questions: Question[]): React.ReactNode {
  return (
    <>
      {questions.map((question) => (
        <div key={question.id}>
          {renderQuestionAnswer(question)}
        </div>
      ))}
    </>
  );
}

