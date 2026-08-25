export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'alternative'
  | 'multiple-select'
  | 'text-input'
  | 'table-fill'
  | 'fill-blanks'
  | 'ordering'
  | 'summation';

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  number?: number;
  /** Letra do item no impresso (ex.: A, B). */
  letter?: string;
  /** Texto do professor, quando não é a alternativa marcada. */
  teacherAnswer?: string;
  options: {
    a: string;
    b: string;
    c: string;
    d?: string;
    e?: string;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd' | 'e';
  /** Imagem entre o enunciado e as alternativas. */
  media?: {
    src: string;
    alt?: string;
    credit?: string;
  };
  /** Texto exibido após a mídia e antes das alternativas. */
  questionAfterMedia?: string;
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true-false';
  question: string;
  correctAnswer?: boolean; // Para compatibilidade com formato antigo (opcional quando há statements)
  number?: number; // Número da questão (ex: 2, 3, 4...)
  statements?: Array<{
    letter: string; // Letra da afirmação (ex: 'a', 'b', 'c')
    statement: string; // Texto da afirmação
    correctAnswer: boolean; // Se a afirmação é verdadeira ou falsa
    correction?: string; // Correção para afirmações falsas (opcional)
  }>;
  hasCorrectionBox?: boolean; // Se deve mostrar campo de texto para correções
  correctionPlaceholder?: string; // Placeholder para o campo de correção
}

export interface AlternativeQuestion {
  id: string;
  type: 'alternative';
  question: string;
  options: string[];
  correctAnswer: number;
  number?: number;
}

export interface MultipleSelectQuestion {
  id: string;
  type: 'multiple-select';
  question: string;
  options: string[];
  correctAnswer: number[];
  number?: number;
  columns?: number;
}

export interface TextInputQuestion {
  id: string;
  type: 'text-input';
  question: string;
  /** Se true, pergunta + campo ficam dentro de ul.list-disc (bullet roxo #80298F), como no livro impresso */
  listDiscLayout?: boolean;
  placeholder?: string;
  correctAnswer?: string; // Opcional, para validação na visão do professor
  number?: number; // Número da questão (ex: 1, 2, 3...)
  /** Grade das subquestões (ex.: 2 colunas no Agora é com você). */
  subQuestionsLayout?: 'stack' | 'grid-2' | 'grid-3';
  /** Bloco de exemplo entre o enunciado e os itens. */
  exampleHtml?: string;
  subQuestions?: Array<{
    letter: string; // Letra da subquestão (ex: 'a', 'b', 'c')
    question: string; // Texto da subquestão
    placeholder?: string;
    correctAnswer?: string;
    /** Campo empilhado de numerador/denominador. */
    inputKind?: 'text' | 'fraction' | 'fractions' | 'inline' | 'fraction-decimal';
    /** Sem campo de resposta (atividade só na imagem/desenho). */
    hideAnswerField?: boolean;
    /** Opções exclusivas com caixa X (ex.: direita / esquerda), como no impresso SAE. */
    choices?: string[];
    /** Se true, as opções com X ficam uma abaixo da outra. */
    choicesStacked?: boolean;
    subItems?: Array<{
      label: string;
      placeholder?: string;
      correctAnswer?: string;
      /** Campo redondo para H/NC (SAS). */
      circleInput?: boolean;
    }>;
  }>;
  embeddedContent?: string; // Conteúdo a ser exibido em uma caixa (ex: versos do poema)
  embeddedContentMaxWidth?: string; // Largura máxima do conteúdo embutido (ex: '400px', '50%', 'fit-content')
  followUpQuestion?: string; // Pergunta adicional com bullet vermelho
  /** Imagem entre o enunciado e as subquestões (ex.: cena da atividade). */
  media?: {
    src: string;
    alt?: string;
    credit?: string;
    /** Se definido, a mídia vira área de desenho sobre a imagem. */
    drawing?: {
      storageKey: string;
      width?: number;
      height?: number;
      hint?: string;
      borderColor?: string;
      maxWidth?: string;
    };
  };
}

export interface TableFillQuestion {
  id: string;
  type: 'table-fill';
  question?: string;
  number?: number;
  columns: string[];
  rows: Array<{
    id: string;
    [key: string]: string | undefined; // Permite campos dinâmicos: o primeiro campo corresponde à primeira coluna, os demais às outras colunas
  }>;
  correctAnswer?: {
    [fieldId: string]: string; // Mapeia fieldId (questionId_rowId_colN) para a resposta correta
  };
  subQuestions?: Array<{
    letter: string; // Letra da subquestão (ex: 'a', 'b', 'c')
    question: string; // Texto da subquestão
    placeholder?: string;
    correctAnswer?: string;
  }>;
}

export interface FillBlanksQuestion {
  id: string;
  type: 'fill-blanks';
  number?: number;
  question: string;
  /** Grade dos itens (ex.: 3 colunas no Agora é com você). */
  itemsLayout?: 'stack' | 'grid-3';
  items: Array<{
    letter: string; // Letra do item (ex: 'a', 'b', 'c')
    fragments: string[]; // Texto quebrado por lacunas. Ex: ["A troca ... de ", "."]
    placeholders?: string[]; // Placeholder por lacuna
    correctAnswers?: string[]; // Resposta esperada por lacuna (visão do professor)
    /** Opções fixas da lacuna (ex.: ∈ e ∉). */
    choiceOptions?: string[];
  }>;
}

export interface OrderingQuestion {
  id: string;
  type: 'ordering';
  number?: number;
  question: string;
  items: Array<{
    id: string;
    text: string;
    correctOrder: number;
  }>;
}

/** Questão de somatória (ex.: UEPG) — proposições 01, 02, 04, 08… */
export interface SummationQuestion {
  id: string;
  type: 'summation';
  number?: number;
  question: string;
  statements: Array<{
    value: number;
    text: string;
    correct: boolean;
  }>;
  correctAnswer: number;
  /** Ex.: "01 + 02 + 04 + 08" */
  correctAnswerDetail?: string;
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | AlternativeQuestion
  | MultipleSelectQuestion
  | TextInputQuestion
  | TableFillQuestion
  | FillBlanksQuestion
  | OrderingQuestion
  | SummationQuestion;

export interface UserAnswers {
  [questionId: string]: string | number | boolean | number[];
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string | number | boolean | undefined;
  correctAnswer: string | number | boolean;
  isCorrect: boolean;
}
