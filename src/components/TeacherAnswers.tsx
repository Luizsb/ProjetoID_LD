import { Question } from '../types/questions';
import { renderQuestionAnswer } from '../utils/questionHelpers';

interface TeacherAnswersProps {
  questions: Question | Question[];
}

/**
 * Componente para renderizar respostas do professor
 * Elimina código repetido do Book.tsx
 */
export function TeacherAnswers({ questions }: TeacherAnswersProps) {
  const questionsArray = Array.isArray(questions) ? questions : [questions];
  const validQuestions = questionsArray.filter((q): q is Question => q !== undefined && q !== null);

  if (validQuestions.length === 0) {
    return null;
  }

  return (
    <>
      <p className="mb-3 font-semibold">Respostas:</p>
      {validQuestions.map((question) => (
        <div key={question.id} className="mb-3">
          {renderQuestionAnswer(question)}
        </div>
      ))}
    </>
  );
}

