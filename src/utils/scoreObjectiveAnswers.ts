import type { Question, UserAnswers } from '../types/questions';

export interface ObjectiveScore {
  acertos: number;
  erros: number;
  emBranco: number;
  total: number;
  /** 0–100 */
  pontuacao: number;
}

type Verdict = 'acerto' | 'erro' | 'emBranco';

function isBlank(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return value.trim() === '';
  return false;
}

function scoreMultipleChoice(question: Question, userAnswers: UserAnswers): Verdict {
  if (question.type !== 'multiple-choice') return 'emBranco';
  const answer = userAnswers[question.id];
  if (isBlank(answer)) return 'emBranco';
  return answer === question.correctAnswer ? 'acerto' : 'erro';
}

function scoreTrueFalse(question: Question, userAnswers: UserAnswers): Verdict {
  if (question.type !== 'true-false') return 'emBranco';

  if (question.statements && question.statements.length > 0) {
    const answers = question.statements.map(
      (stmt) => userAnswers[`${question.id}_${stmt.letter}`] as boolean | undefined,
    );
    const answered = answers.filter((a) => a !== undefined);
    if (answered.length === 0) return 'emBranco';
    if (answered.length < question.statements.length) return 'erro';
    const allCorrect = question.statements.every(
      (stmt) => userAnswers[`${question.id}_${stmt.letter}`] === stmt.correctAnswer,
    );
    return allCorrect ? 'acerto' : 'erro';
  }

  const answer = userAnswers[question.id];
  if (answer === undefined || answer === null) return 'emBranco';
  return answer === question.correctAnswer ? 'acerto' : 'erro';
}

function scoreSummation(question: Question, userAnswers: UserAnswers): Verdict {
  if (question.type !== 'summation') return 'emBranco';
  const raw = userAnswers[question.id];
  if (isBlank(raw)) return 'emBranco';

  let sum: number | null = null;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as { sum?: number | string; selected?: number[] };
      if (parsed.sum !== undefined && parsed.sum !== null && String(parsed.sum).trim() !== '') {
        sum = Number(parsed.sum);
      } else if (Array.isArray(parsed.selected) && parsed.selected.length > 0) {
        sum = parsed.selected.reduce((acc, n) => acc + n, 0);
      }
    } catch {
      const digits = raw.replace(/\D/g, '');
      if (digits) sum = Number(digits);
    }
  } else if (typeof raw === 'number') {
    sum = raw;
  }

  if (sum === null || Number.isNaN(sum)) return 'emBranco';
  return sum === question.correctAnswer ? 'acerto' : 'erro';
}

function scoreQuestion(question: Question, userAnswers: UserAnswers): Verdict | null {
  switch (question.type) {
    case 'multiple-choice':
      return scoreMultipleChoice(question, userAnswers);
    case 'true-false':
      return scoreTrueFalse(question, userAnswers);
    case 'summation':
      return scoreSummation(question, userAnswers);
    default:
      return null;
  }
}

/** Pontua apenas questões objetivas (MC, V/F, somatória). */
export function scoreObjectiveAnswers(
  questions: Question[],
  userAnswers: UserAnswers,
): ObjectiveScore {
  let acertos = 0;
  let erros = 0;
  let emBranco = 0;
  let total = 0;

  for (const question of questions) {
    const verdict = scoreQuestion(question, userAnswers);
    if (verdict === null) continue;
    total += 1;
    if (verdict === 'acerto') acertos += 1;
    else if (verdict === 'erro') erros += 1;
    else emBranco += 1;
  }

  return {
    acertos,
    erros,
    emBranco,
    total,
    pontuacao: total === 0 ? 0 : Math.round((acertos / total) * 100),
  };
}
