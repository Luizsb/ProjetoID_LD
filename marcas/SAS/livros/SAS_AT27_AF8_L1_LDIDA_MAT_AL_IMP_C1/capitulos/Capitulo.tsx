// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Fim do acordo nuclear entre EUA e Rússia","startPage":1,"pageCount":26,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import Footer from '@player/components/Footer';
import EscolaDigital from '@player/components/EscolaDigital';
import GlossarioAF from '@player/components/GlossarioAF';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import ComecoDeConversa from '@player/components/ComecoDeConversa';
import DialogarEConhecer from '@player/components/DialogarEConhecer';
import AgoraEComVoce from '@player/components/AgoraEComVoce';
import OrganizeAsIdeias from '@player/components/OrganizeAsIdeias';
import Observacao from '@player/components/Observacao';
import ParaIrAlem from '@player/components/ParaIrAlem';
import ExploreSeusConhecimentos from '@player/components/ExploreSeusConhecimentos';
import MergulhandoFundo from '@player/components/MergulhandoFundo';
import NesteCapituloVoceEstudou from '@player/components/NesteCapituloVoceEstudou';
import AcesseAEureka from '@player/components/AcesseAEureka';
import { Question } from '@player/types/questions';
import Formula from '@player/components/Formula';
import BlocoPapelTexto from '@player/components/BlocoPapelTexto';
import CaixaNota from '@player/components/CaixaNota';
import AtividadeDiagramaRacionais from '@player/components/AtividadeDiagramaRacionais';
import AtividadeDiagramaReais, {
  DiagramaReaisBanco,
  DiagramaReaisFigura,
} from '@player/components/AtividadeDiagramaReais';
import RetaAvenida from '@player/components/RetaAvenida';
import AtividadeRetaRacionais from '@player/components/AtividadeRetaRacionais';
import AtividadeRetaReais from '@player/components/AtividadeRetaReais';
import AtividadeRetaIrracionais from '@player/components/AtividadeRetaIrracionais';
import {
  AtividadeSublinharArea,
  AtividadeSublinharProvider,
  BotaoModoSublinhar,
  TextoInterativo,
  TrechoClicavel,
} from '@player/components/AtividadeSublinharNumeros';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import AutoExpandTextarea from '@player/components/AutoExpandTextarea';
function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/SAS/livros/SAS_AT27_AF8_L1_LDIDA_MAT_AL_IMP_C1/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

function BandeiraEUA() {
  const stars: Array<{ cx: number; cy: number }> = [];
  for (let row = 0; row < 9; row += 1) {
    const count = row % 2 === 0 ? 6 : 5;
    const offset = row % 2 === 0 ? 0 : 0.5;
    for (let col = 0; col < count; col += 1) {
      stars.push({
        cx: 6.2 + (col + offset) * 10.8,
        cy: 4.8 + row * 5.05,
      });
    }
  }

  return (
    <svg className="grafico-ogivas__bandeira" viewBox="0 0 190 100" preserveAspectRatio="none" aria-hidden>
      <rect width="190" height="100" fill="#b22234" />
      <rect y="7.69" width="190" height="7.69" fill="#fff" />
      <rect y="23.08" width="190" height="7.69" fill="#fff" />
      <rect y="38.46" width="190" height="7.69" fill="#fff" />
      <rect y="53.85" width="190" height="7.69" fill="#fff" />
      <rect y="69.23" width="190" height="7.69" fill="#fff" />
      <rect y="84.62" width="190" height="7.69" fill="#fff" />
      <rect width="76" height="53.85" fill="#3c3b6e" />
      {stars.map((star) => (
        <circle key={`${star.cx}-${star.cy}`} cx={star.cx} cy={star.cy} r="1.7" fill="#fff" />
      ))}
    </svg>
  );
}

const SHOW_TEACHER_BUTTON = true;

const chapterQuestions: Question[] = [
  {
    id: 'ch1_q1',
    type: 'text-input',
    number: 1,
    question: 'Qual é o menor número natural? E o maior?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'O menor número natural é o zero. Não existe maior número natural, pois todo número natural possui um sucessor.',
  },
  {
    id: 'ch1_q2',
    type: 'text-input',
    number: 2,
    question: 'Todo número inteiro possui um antecessor e um sucessor inteiro?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Sim, todo número inteiro possui um antecessor e um sucessor inteiro. Por exemplo, o antecessor de 0 é –1, e seu sucessor é 1.',
  },
  {
    id: 'ch1_q3',
    type: 'text-input',
    number: 3,
    question: 'Qual é o menor número inteiro? E o maior?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Uma vez que todo número inteiro possui um antecessor e um sucessor inteiro, não é possível determinar o maior nem o menor número inteiro.',
  },
  {
    id: 'ch1_q4',
    type: 'text-input',
    number: 4,
    question: 'Por que, na definição do conjunto dos números racionais, aparece como condição que <strong>b</strong> ∈ <strong>Z*</strong>?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Tem-se como condição que <strong>b</strong> deve ser um número inteiro diferente de zero porque não existe divisão por zero.',
  },
  {
    id: 'ch1_q5',
    type: 'text-input',
    number: 1,
    subQuestionsLayout: 'grid-2',
    question: 'Determine a fração geratriz das dízimas periódicas simples a seguir. Sempre que possível, simplifique as frações obtidas.',
    subQuestions: [
      {
        letter: 'a',
        question: '0,777…',
        inputKind: 'fraction',
        correctAnswer: '<span class="fracao"><span>7</span><span>9</span></span>',
      },
      {
        letter: 'b',
        question: '0,151515…',
        inputKind: 'fractions',
        correctAnswer:
          '<span class="fracao"><span>15</span><span>99</span></span> = <span class="fracao"><span>5</span><span>33</span></span>',
      },
      {
        letter: 'c',
        question: '0,<span class="dizima-barra">102</span>',
        inputKind: 'fractions',
        correctAnswer:
          '<span class="fracao"><span>102</span><span>999</span></span> = <span class="fracao"><span>34</span><span>333</span></span>',
      },
      {
        letter: 'd',
        question: '0,<span class="dizima-barra">2025</span>',
        inputKind: 'fractions',
        correctAnswer:
          '<span class="fracao"><span>2025</span><span>9999</span></span> = <span class="fracao"><span>225</span><span>1111</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q6',
    type: 'text-input',
    number: 2,
    question:
      'Observe, a seguir, como determinar a fração geratriz de uma dízima periódica simples com a parte inteira diferente de zero. Em seguida, resolva os itens propostos.',
    exampleHtml:
      '3,121212… = 3 + 0,<span class="dizima-barra">12</span> = 3 + <span class="fracao"><span>12</span><span>99</span></span> = 3 + <span class="fracao"><span>4</span><span>33</span></span> = <span class="fracao"><span>103</span><span>33</span></span>',
    subQuestions: [
      {
        letter: 'a',
        question: '1,333…',
        inputKind: 'inline',
        placeholder: '1 + 3/9 = …',
        correctAnswer:
          '1 + <span class="fracao"><span>3</span><span>9</span></span> = 1 + <span class="fracao"><span>1</span><span>3</span></span> = <span class="fracao"><span>4</span><span>3</span></span>',
      },
      {
        letter: 'b',
        question: '4,<span class="dizima-barra">132</span>',
        inputKind: 'inline',
        placeholder: '4 + 132/999 = …',
        correctAnswer:
          '4 + <span class="fracao"><span>132</span><span>999</span></span> = 4 + <span class="fracao"><span>44</span><span>333</span></span> = <span class="fracao"><span>1376</span><span>333</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q7',
    type: 'text-input',
    number: 1,
    question: 'Determine a fração geratriz das seguintes dízimas periódicas compostas. Sempre que possível, simplifique as frações obtidas.',
    subQuestions: [
      {
        letter: 'a',
        question: '0,6888…',
        inputKind: 'inline',
        placeholder: '(68 − 6)/90 = …',
        correctAnswer:
          '<span class="fracao"><span>68 − 6</span><span>90</span></span> = <span class="fracao"><span>62</span><span>90</span></span> = <span class="fracao"><span>31</span><span>45</span></span>',
      },
      {
        letter: 'b',
        question: '0,23666…',
        inputKind: 'inline',
        placeholder: '(236 − 23)/900 = …',
        correctAnswer:
          '<span class="fracao"><span>236 − 23</span><span>900</span></span> = <span class="fracao"><span>213</span><span>900</span></span> = <span class="fracao"><span>71</span><span>300</span></span>',
      },
      {
        letter: 'c',
        question: '2,05<span class="dizima-barra">17</span>',
        inputKind: 'inline',
        placeholder: '2 + (0517 − 05)/9900 = …',
        correctAnswer:
          '2 + <span class="fracao"><span>0517 − 05</span><span>9900</span></span> = 2 + <span class="fracao"><span>512</span><span>9900</span></span> = 2 + <span class="fracao"><span>128</span><span>2475</span></span> = <span class="fracao"><span>5078</span><span>2475</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q8',
    type: 'text-input',
    number: 1,
    question: 'Escreva os números a seguir na região adequada do diagrama anterior.',
    correctAnswer:
      'ℕ: 0; 15/3; 6. ℤ: −16/4; −3. ℚ: −2,5; −2/3; −1,2̄; 1/5; 0,54̄; 7,04.',
  },
  {
    id: 'ch1_q9',
    type: 'fill-blanks',
    number: 2,
    question:
      'Complete as sentenças com o símbolo ∈ (pertence) ou ∉ (não pertence), indicando se o número faz parte ou não do conjunto numérico indicado.',
    items: [
      { letter: 'a', fragments: ['−1,2 ', ' <strong class="conjunto-n-destaque">ℚ</strong>₊'], placeholders: ['∈ ou ∉'], correctAnswers: ['∉'], choiceOptions: ['∈', '∉'] },
      { letter: 'b', fragments: ['0 ', ' <strong class="conjunto-n-destaque">ℚ</strong>₊'], placeholders: ['∈ ou ∉'], correctAnswers: ['∈'], choiceOptions: ['∈', '∉'] },
      { letter: 'c', fragments: ['0 ', ' <strong class="conjunto-n-destaque">ℚ</strong>₊*'], placeholders: ['∈ ou ∉'], correctAnswers: ['∉'], choiceOptions: ['∈', '∉'] },
      {
        letter: 'd',
        fragments: ['−<span class="fracao"><span>1</span><span>2</span></span> ', ' <strong class="conjunto-n-destaque">ℚ</strong>₋*'],
        placeholders: ['∈ ou ∉'],
        correctAnswers: ['∈'],
        choiceOptions: ['∈', '∉'],
      },
      { letter: 'e', fragments: ['0,1 ', ' <strong class="conjunto-n-destaque">ℚ</strong>₋*'], placeholders: ['∈ ou ∉'], correctAnswers: ['∉'], choiceOptions: ['∈', '∉'] },
      { letter: 'f', fragments: ['−0,8 ', ' <strong class="conjunto-n-destaque">ℚ</strong>*'], placeholders: ['∈ ou ∉'], correctAnswers: ['∈'], choiceOptions: ['∈', '∉'] },
      {
        letter: 'g',
        fragments: ['1,32<span class="dizima-barra">41</span> ', ' <strong class="conjunto-n-destaque">ℚ</strong>₊'],
        placeholders: ['∈ ou ∉'],
        correctAnswers: ['∈'],
        choiceOptions: ['∈', '∉'],
      },
      {
        letter: 'h',
        fragments: ['<span class="fracao"><span>3</span><span>8</span></span> ', ' <strong class="conjunto-n-destaque">ℚ</strong>₋*'],
        placeholders: ['∈ ou ∉'],
        correctAnswers: ['∉'],
        choiceOptions: ['∈', '∉'],
      },
      { letter: 'i', fragments: ['0 ', ' <strong class="conjunto-n-destaque">ℚ</strong>*'], placeholders: ['∈ ou ∉'], correctAnswers: ['∉'], choiceOptions: ['∈', '∉'] },
    ],
  },
  {
    id: 'ch1_q10',
    type: 'text-input',
    number: 3,
    question:
      'Resolva as expressões a seguir e registre os resultados na forma fracionária e na forma decimal.',
    subQuestions: [
      {
        letter: 'a',
        question:
          '2 − 0,2 − 0,<span class="dizima-barra">2</span> − <span class="fracao"><span>1</span><span>2</span></span>',
        inputKind: 'inline',
        correctAnswer:
          '<span class="fracao"><span>2</span><span>1</span></span> − <span class="fracao"><span>2</span><span>10</span></span> − <span class="fracao"><span>2</span><span>9</span></span> − <span class="fracao"><span>1</span><span>2</span></span> = <span class="fracao"><span>180</span><span>90</span></span> − <span class="fracao"><span>18</span><span>90</span></span> − <span class="fracao"><span>20</span><span>90</span></span> − <span class="fracao"><span>45</span><span>90</span></span> = <span class="fracao"><span>97</span><span>90</span></span> = 1,077…',
      },
      {
        letter: 'b',
        question:
          '(<span class="fracao"><span>1</span><span>3</span></span> + 0,333…) · (0,3 · <span class="fracao"><span>5</span><span>6</span></span>)',
        inputKind: 'inline',
        correctAnswer:
          '(<span class="fracao"><span>1</span><span>3</span></span> + <span class="fracao"><span>1</span><span>3</span></span>) · (<span class="fracao"><span>3</span><span>10</span></span> · <span class="fracao"><span>5</span><span>6</span></span>) = <span class="fracao"><span>2</span><span>3</span></span> · <span class="fracao"><span>1</span><span>4</span></span> = <span class="fracao"><span>1</span><span>6</span></span> = 0,1666…',
      },
      {
        letter: 'c',
        question:
          '(2 + <span class="fracao"><span>3</span><span>5</span></span>) − (2 − <span class="fracao"><span>3</span><span>5</span></span>)',
        inputKind: 'inline',
        correctAnswer:
          '<span class="fracao"><span>13</span><span>5</span></span> − <span class="fracao"><span>7</span><span>5</span></span> = <span class="fracao"><span>6</span><span>5</span></span> = 1,2',
      },
      {
        letter: 'd',
        question:
          '(2 · <span class="fracao"><span>3</span><span>5</span></span>) − (2 : <span class="fracao"><span>3</span><span>5</span></span>)',
        inputKind: 'inline',
        correctAnswer:
          '<span class="fracao"><span>6</span><span>5</span></span> − <span class="fracao"><span>10</span><span>3</span></span> = <span class="fracao"><span>18 − 50</span><span>15</span></span> = −<span class="fracao"><span>32</span><span>15</span></span> = −2,1333…',
      },
    ],
  },
  {
    id: 'ch1_q11',
    type: 'text-input',
    number: 1,
    question:
      'A reta numérica a seguir representa a avenida principal de uma cidade. Na reta, o ponto de referência O localiza um prédio comercial, e os pontos A, B, C e D indicam, cada um, a posição de uma casa. Sabendo que a distância entre dois inteiros consecutivos é sempre a mesma, determine a fração que representa a posição de cada casa.',
    subQuestions: [
      {
        letter: 'A',
        question: '',
        inputKind: 'inline',
        correctAnswer:
          'A = −<span class="fracao"><span>6</span><span>9</span></span> = −<span class="fracao"><span>2</span><span>3</span></span>',
      },
      {
        letter: 'B',
        question: '',
        inputKind: 'inline',
        correctAnswer: 'B = −<span class="fracao"><span>2</span><span>9</span></span>',
      },
      {
        letter: 'C',
        question: '',
        inputKind: 'inline',
        correctAnswer:
          'C = <span class="fracao"><span>3</span><span>9</span></span> = <span class="fracao"><span>1</span><span>3</span></span>',
      },
      {
        letter: 'D',
        question: '',
        inputKind: 'inline',
        correctAnswer: 'D = <span class="fracao"><span>8</span><span>9</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q12',
    type: 'text-input',
    number: 2,
    question:
      'Desenhe uma reta numérica e represente nela os seguintes números racionais.',
    correctAnswer: `<img src="${capAsset('images/11_2_1r.png')}" alt="Reta numérica com os números racionais posicionados" class="resposta-professor__img-reta" />`,
  },
  {
    id: 'ch1_q13',
    type: 'text-input',
    number: 1,
    question:
      'Calcule as raízes exatas a seguir. Depois, use uma calculadora para conferir os resultados.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '√196',
        inputKind: 'inline',
        correctAnswer:
          '√(2² · 7²) = 2 · 7 = 14',
      },
      {
        letter: 'b',
        question: '√324',
        inputKind: 'inline',
        correctAnswer:
          '√(2² · 3⁴) = 2 · 9 = 18',
      },
      {
        letter: 'c',
        question: '√12,25',
        inputKind: 'inline',
        correctAnswer:
          '√<span class="fracao"><span>1225</span><span>100</span></span> = √<span class="fracao"><span>5² · 7²</span><span>2² · 5²</span></span> = <span class="fracao"><span>35</span><span>10</span></span> = 3,5',
      },
      {
        letter: 'd',
        question:
          '√<span class="fracao"><span>576</span><span>100</span></span>',
        inputKind: 'inline',
        correctAnswer:
          '√<span class="fracao"><span>2⁶ · 3²</span><span>2² · 5²</span></span> = <span class="fracao"><span>24</span><span>10</span></span> = 2,4',
      },
    ],
  },
  {
    id: 'ch1_q14',
    type: 'fill-blanks',
    number: 1,
    question: 'Localize cada raiz quadrada a seguir entre dois números naturais consecutivos.',
    itemsLayout: 'grid-3',
    items: [
      { letter: 'a', fragments: ['', ' &lt; √15 &lt; ', ''], correctAnswers: ['3', '4'] },
      { letter: 'b', fragments: ['', ' &lt; √18 &lt; ', ''], correctAnswers: ['4', '5'] },
      { letter: 'c', fragments: ['', ' &lt; √27 &lt; ', ''], correctAnswers: ['5', '6'] },
      { letter: 'd', fragments: ['', ' &lt; √40 &lt; ', ''], correctAnswers: ['6', '7'] },
      { letter: 'e', fragments: ['', ' &lt; √60 &lt; ', ''], correctAnswers: ['7', '8'] },
      { letter: 'f', fragments: ['', ' &lt; √90 &lt; ', ''], correctAnswers: ['9', '10'] },
    ],
  },
  {
    id: 'ch1_q15',
    type: 'text-input',
    number: 2,
    question:
      'Utilize os dados obtidos na questão anterior e estime um valor aproximado (com uma casa decimal) para essas raízes.',
    subQuestionsLayout: 'grid-3',
    subQuestions: [
      { letter: 'a', question: '√15 ≅', inputKind: 'inline', correctAnswer: '√15 ≅ 3,8' },
      { letter: 'b', question: '√18 ≅', inputKind: 'inline', correctAnswer: '√18 ≅ 4,2' },
      { letter: 'c', question: '√27 ≅', inputKind: 'inline', correctAnswer: '√27 ≅ 5,1' },
      { letter: 'd', question: '√40 ≅', inputKind: 'inline', correctAnswer: '√40 ≅ 6,3' },
      { letter: 'e', question: '√60 ≅', inputKind: 'inline', correctAnswer: '√60 ≅ 7,7' },
      { letter: 'f', question: '√90 ≅', inputKind: 'inline', correctAnswer: '√90 ≅ 9,4' },
    ],
  },
  {
    id: 'ch1_q16',
    type: 'text-input',
    number: 3,
    question:
      'Utilize uma calculadora para determinar o valor aproximado das raízes quadradas a seguir. Escreva os oito primeiros dígitos que aparecerem no visor.',
    subQuestionsLayout: 'grid-3',
    subQuestions: [
      { letter: 'a', question: '√2 ≅', inputKind: 'inline', correctAnswer: '√2 ≅ 1,4142135…' },
      { letter: 'b', question: '√3 ≅', inputKind: 'inline', correctAnswer: '√3 ≅ 1,7320508…' },
      { letter: 'c', question: '√5 ≅', inputKind: 'inline', correctAnswer: '√5 ≅ 2,2360679…' },
      { letter: 'd', question: '√6 ≅', inputKind: 'inline', correctAnswer: '√6 ≅ 2,4494897…' },
      { letter: 'e', question: '√7 ≅', inputKind: 'inline', correctAnswer: '√7 ≅ 2,6457513…' },
      { letter: 'f', question: '√8 ≅', inputKind: 'inline', correctAnswer: '√8 ≅ 2,8284271…' },
      { letter: 'g', question: '√10 ≅', inputKind: 'inline', correctAnswer: '√10 ≅ 3,1622776…' },
      { letter: 'h', question: '√11 ≅', inputKind: 'inline', correctAnswer: '√11 ≅ 3,3166247…' },
      { letter: 'i', question: '√12 ≅', inputKind: 'inline', correctAnswer: '√12 ≅ 3,4641016…' },
    ],
  },
  {
    id: 'ch1_q17',
    type: 'text-input',
    number: 4,
    question:
      'Os dígitos que apareceram no visor da calculadora expressaram toda a parte decimal dessas raízes? Justifique sua resposta.',
    correctAnswer: 'Não, pois elas possuem infinitas casas decimais.',
  },
  {
    id: 'ch1_q18',
    type: 'text-input',
    number: 1,
    question:
      'Escreva os números a seguir na região adequada, dentro do diagrama representado acima.',
    correctAnswer: `<img src="${capAsset('images/15_1r.png')}" alt="Diagrama dos números reais com os números nas regiões corretas" class="resposta-professor__img-reta" />`,
  },
  {
    id: 'ch1_q19',
    type: 'true-false',
    number: 2,
    question:
      'Analise as afirmativas a seguir e marque <strong>V</strong> para as verdadeiras e <strong>F</strong> para as falsas.',
    statements: [
      {
        letter: 'a',
        statement: 'Todo número racional é um número natural.',
        correctAnswer: false,
      },
      {
        letter: 'b',
        statement: 'Todo número inteiro é um número real.',
        correctAnswer: true,
      },
      {
        letter: 'c',
        statement: 'Todo número racional é um número real.',
        correctAnswer: true,
      },
      {
        letter: 'd',
        statement: 'Todo número real é um número racional.',
        correctAnswer: false,
      },
      {
        letter: 'e',
        statement: 'Todo número irracional é um número real.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'ch1_q19a',
    type: 'text-input',
    number: 1,
    question: 'Dada a reta numérica a seguir, faça o que se pede.',
    subQuestions: [
      {
        letter: 'a',
        question: 'Represente três números reais',
        subItems: [
          {
            label: 'maiores que −1 e menores que 0.',
            correctAnswer:
              'Três números reais maiores que −1 e menores que 0 são: −0,8; −0,5; e −0,3.',
          },
          {
            label: 'maiores que 0 e menores que 1.',
            correctAnswer:
              'Três números reais maiores que 0 e menores que 1 são: 0,2; 0,4; e 0,9.',
          },
        ],
      },
      {
        letter: 'b',
        question:
          'Localize os números reais 0,6 e 0,7. É correto afirmar que 0,7 é sucessor real de 0,6? Justifique.',
        correctAnswer:
          'Não é correto afirmar que 0,7 é o sucessor real de 0,6, pois entre dois números reais quaisquer existem outros infinitos números reais.',
      },
      {
        letter: 'c',
        question:
          'Cite três exemplos de números reais que estão entre 0,4 e 0,5. Você saberia dizer todos os números reais compreendidos entre esses dois números? Justifique.',
        correctAnswer:
          'Sugestões de números reais que estão entre 0,4 e 0,5: 0,42; 0,45; e 0,48. Não é possível dizer todos os números reais compreendidos entre esses dois números, pois entre dois números reais quaisquer existem outros infinitos números reais.',
      },
      {
        letter: 'd',
        question:
          'Escreva os números a seguir com apenas uma casa decimal, fazendo os arredondamentos necessários. Depois, represente-os na reta anterior.',
        subItems: [
          {
            label: '−0,7333… ≅',
            correctAnswer: '−0,7',
          },
          {
            label: '−0,0953 ≅',
            correctAnswer: '−0,1',
          },
          {
            label: '0,468 ≅',
            correctAnswer: '0,5',
          },
        ],
      },
    ],
  },
  {
    id: 'ch1_q19b',
    type: 'text-input',
    number: 2,
    question:
      'Estime um valor aproximado para os números irracionais a seguir. Em seguida, localize-os na reta numérica.',
    subQuestionsLayout: 'grid-3',
    subQuestions: [
      { letter: '', question: '−√8 ≅', inputKind: 'inline', correctAnswer: '−2,8' },
      { letter: '', question: '−√5 ≅', inputKind: 'inline', correctAnswer: '−2,2' },
      { letter: '', question: '−√2 ≅', inputKind: 'inline', correctAnswer: '−1,4' },
      { letter: '', question: '√3 ≅', inputKind: 'inline', correctAnswer: '1,7' },
      { letter: '', question: '√10 ≅', inputKind: 'inline', correctAnswer: '3,2' },
      { letter: '', question: '√15 ≅', inputKind: 'inline', correctAnswer: '3,9' },
    ],
  },
  {
    id: 'ch1_q20',
    type: 'text-input',
    number: 1,
    question: 'Calcule as potências a seguir.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '(−7)<sup>2</sup> =',
        inputKind: 'inline',
        correctAnswer: '49',
      },
      {
        letter: 'b',
        question: '−7<sup>2</sup> =',
        inputKind: 'inline',
        correctAnswer: '−49',
      },
      {
        letter: 'c',
        question: '(−5)<sup>3</sup> =',
        inputKind: 'inline',
        correctAnswer: '−125',
      },
      {
        letter: 'd',
        question: '−5<sup>3</sup> =',
        inputKind: 'inline',
        correctAnswer: '−125',
      },
      {
        letter: 'e',
        question: '(−2)<sup>6</sup> =',
        inputKind: 'inline',
        correctAnswer: '64',
      },
      {
        letter: 'f',
        question: '−2<sup>6</sup> =',
        inputKind: 'inline',
        correctAnswer: '−64',
      },
      {
        letter: 'g',
        question: '−(−2)<sup>6</sup> =',
        inputKind: 'inline',
        correctAnswer: '−(+64) = −64',
      },
      {
        letter: 'h',
        question: '−(−10)<sup>0</sup> =',
        inputKind: 'inline',
        correctAnswer: '−(+1) = −1',
      },
      {
        letter: 'i',
        question: '−(−0,9)<sup>3</sup> =',
        inputKind: 'inline',
        correctAnswer: '−(−0,729) = 0,729',
      },
      {
        letter: 'j',
        question:
          '(<span class="fracao"><span>−9</span><span>7</span></span>)<sup>2</sup> =',
        inputKind: 'inline',
        correctAnswer:
          '(<span class="fracao"><span>−9</span><span>7</span></span>) · (<span class="fracao"><span>−9</span><span>7</span></span>) = <span class="fracao"><span>81</span><span>49</span></span>',
      },
      {
        letter: 'k',
        question: '−<span class="fracao"><span>9<sup>2</sup></span><span>7</span></span> =',
        inputKind: 'inline',
        correctAnswer:
          '−<span class="fracao"><span>9 · 9</span><span>7</span></span> = −<span class="fracao"><span>81</span><span>7</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q21',
    type: 'text-input',
    number: 2,
    question:
      'Redija um texto explicando as diferenças entre as potências (<span class="fracao"><span>−9</span><span>7</span></span>)<sup>2</sup> e −<span class="fracao"><span>9<sup>2</sup></span><span>7</span></span>.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Na expressão (<span class="fracao"><span>−9</span><span>7</span></span>)<sup>2</sup>, os parênteses indicam que a base é (<span class="fracao"><span>−9</span><span>7</span></span>). Assim, deve-se multiplicar (<span class="fracao"><span>−9</span><span>7</span></span>) por (<span class="fracao"><span>−9</span><span>7</span></span>), isto é, (<span class="fracao"><span>−9</span><span>7</span></span>) · (<span class="fracao"><span>−9</span><span>7</span></span>) = <span class="fracao"><span>81</span><span>49</span></span>. Como não há parênteses na expressão −<span class="fracao"><span>9<sup>2</sup></span><span>7</span></span>, somente o numerador 9 (positivo) será elevado ao quadrado. Assim, −<span class="fracao"><span>9<sup>2</sup></span><span>7</span></span> = −<span class="fracao"><span>9 · 9</span><span>7</span></span> = −<span class="fracao"><span>81</span><span>7</span></span>.',
  },
  {
    id: 'ch1_q22',
    type: 'text-input',
    number: 1,
    question: 'Calcule o valor das expressões a seguir aplicando as propriedades da potenciação.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '3<sup>2</sup> · 3<sup>5</sup>',
        inputKind: 'inline',
        correctAnswer: '3<sup>7</sup> = 2187',
      },
      {
        letter: 'b',
        question: '5<sup>8</sup> : 5<sup>3</sup>',
        inputKind: 'inline',
        correctAnswer: '5<sup>5</sup> = 3125',
      },
      {
        letter: 'c',
        question: '(3 · 4 · 2)<sup>2</sup>',
        inputKind: 'inline',
        correctAnswer: '3<sup>2</sup> · 4<sup>2</sup> · 2<sup>2</sup> = 9 · 16 · 4 = 576',
      },
      {
        letter: 'd',
        question: '[(−0,2)<sup>3</sup>]<sup>4</sup>',
        inputKind: 'inline',
        correctAnswer: '(−0,2)<sup>12</sup> = 0,000000004096',
      },
      {
        letter: 'e',
        question: '(−0,5)<sup>8</sup> : (−0,5)<sup>5</sup>',
        inputKind: 'inline',
        correctAnswer: '(−0,5)<sup>3</sup> = −0,125',
      },
      {
        letter: 'f',
        question: '[(10<sup>2</sup>)<sup>3</sup>]<sup>4</sup>',
        inputKind: 'inline',
        correctAnswer:
          '10<sup>24</sup> = 1&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000',
      },
    ],
  },
  {
    id: 'ch1_q23',
    type: 'text-input',
    number: 2,
    question: 'Aplicando as propriedades estudadas, resolva as seguintes expressões.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '−2<sup>3</sup> − [3<sup>2</sup> − (2<sup>3</sup> − 3<sup>2</sup>)<sup>51</sup>]',
        placeholder: 'Digite aqui...',
        correctAnswer:
          '−8 − [9 − (8 − 9)<sup>51</sup>] =<br/>−8 − [9 − (−1)<sup>51</sup>] =<br/>−8 − [9 + 1] =<br/>−8 − 10 =<br/>−18',
      },
      {
        letter: 'b',
        question:
          '(<span class="fracao"><span>2</span><span>5</span></span>)<sup>−2</sup> : <span class="fracao"><span>5</span><span>4</span></span> − (−2)<sup>−2</sup> − (−3)<sup>2</sup>',
        placeholder: 'Digite aqui...',
        correctAnswer:
          '(<span class="fracao"><span>5</span><span>2</span></span>)<sup>2</sup> · <span class="fracao"><span>4</span><span>5</span></span> − (−<span class="fracao"><span>1</span><span>2</span></span>)<sup>2</sup> − 9 = <span class="fracao"><span class="cancel-num cancel-num--sup" data-novo="5">25</span><span class="cancel-num">4</span></span> · <span class="fracao"><span class="cancel-num">4</span><span class="cancel-num cancel-num--sub" data-novo="1">5</span></span> − <span class="fracao"><span>1</span><span>4</span></span> − 9 =<br/>5 − <span class="fracao"><span>1</span><span>4</span></span> − 9 = −4 − <span class="fracao"><span>1</span><span>4</span></span> = −<span class="fracao"><span>17</span><span>4</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q24',
    type: 'text-input',
    number: 1,
    question:
      'Leia o texto a seguir e sublinhe todos os números expressos em milhões, em bilhões, em trilhões e em anos-luz. Em seguida, escreva-os em notação científica ou como potências de base 10.',
    placeholder: 'Digite as conversões aqui...',
    correctAnswer:
      '<div class="mb-2"><strong>Trechos a sublinhar:</strong> 100 bilhões; 1 milhão; 13 bilhões de anos-luz; 100 mil AL; 200 bilhões; 1 trilhão.</div>' +
      '<ul class="resposta-galaxias">' +
      '<li>100 bilhões = 100&nbsp;000&nbsp;000&nbsp;000 = 10<sup>11</sup></li>' +
      '<li>1 milhão = 1&nbsp;000&nbsp;000 = 10<sup>6</sup></li>' +
      '<li>13 bilhões de anos-luz = 13&nbsp;000&nbsp;000&nbsp;000 · 9&nbsp;460&nbsp;000&nbsp;000&nbsp;000 km = 122&nbsp;980&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000 km = 1,2298 · 10<sup>23</sup> km</li>' +
      '<li>100 mil AL = 100&nbsp;000 · 9&nbsp;460&nbsp;000&nbsp;000&nbsp;000 km = 946&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000 km = 9,46 · 10<sup>17</sup> km</li>' +
      '<li>200 bilhões = 200&nbsp;000&nbsp;000&nbsp;000 = 2 · 10<sup>11</sup></li>' +
      '<li>1 trilhão = 1&nbsp;000&nbsp;000&nbsp;000&nbsp;000 = 10<sup>12</sup></li>' +
      '</ul>',
  },
  {
    id: 'ch1_q25',
    type: 'text-input',
    number: 2,
    question: 'Represente, em notação científica, as seguintes medidas.',
    subQuestions: [
      {
        letter: 'a',
        question: 'Um ano-luz = 9&nbsp;460&nbsp;000&nbsp;000&nbsp;000 km',
        inputKind: 'inline',
        correctAnswer: '9,46 · 10<sup>12</sup> km',
      },
      {
        letter: 'b',
        question: 'A distância da Terra ao Sol = 150&nbsp;000&nbsp;000 km',
        inputKind: 'inline',
        correctAnswer: '1,5 · 10<sup>8</sup> km',
      },
      {
        letter: 'c',
        question: 'A velocidade da luz = 300&nbsp;000&nbsp;000 m/s',
        inputKind: 'inline',
        correctAnswer: '3 · 10<sup>8</sup> m/s',
      },
      {
        letter: 'd',
        question: 'A carga elétrica elementar = 0,00000000000000000016 coulomb',
        inputKind: 'inline',
        correctAnswer: '1,6 · 10<sup>−19</sup> coulomb',
      },
      {
        letter: 'e',
        question: 'O raio do átomo de hidrogênio = 0,0000000053 cm',
        inputKind: 'inline',
        correctAnswer: '5,3 · 10<sup>−9</sup> cm',
      },
      {
        letter: 'f',
        question: 'O diâmetro de um átomo de hidrogênio = 0,0000000106 cm',
        inputKind: 'inline',
        correctAnswer: '1,06 · 10<sup>−8</sup> cm',
      },
    ],
  },
  {
    id: 'ch1_q26',
    type: 'text-input',
    number: 3,
    question: 'Determine o valor de <strong>x</strong> nas seguintes igualdades.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '21&nbsp;000&nbsp;000&nbsp;000&nbsp;000 = x · 10<sup>13</sup>',
        placeholder: 'x = ...',
        correctAnswer: 'x = 2,1',
      },
      {
        letter: 'b',
        question: '145&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000 = 1,45 · 10<sup>x</sup>',
        placeholder: 'x = ...',
        correctAnswer: 'x = 17',
      },
      {
        letter: 'c',
        question: '0,000000000004 = x · 10<sup>−12</sup>',
        placeholder: 'x = ...',
        correctAnswer: 'x = 4',
      },
      {
        letter: 'd',
        question: '0,000000000000000321 = 3,21 · 10<sup>x</sup>',
        placeholder: 'x = ...',
        correctAnswer: 'x = −16',
      },
    ],
  },
  {
    id: 'ch1_q27',
    type: 'text-input',
    number: 1,
    question:
      'Escreva a operação inversa das potenciações a seguir e determine os valores desconhecidos (positivos e reais) nas igualdades.',
    subQuestions: [
      {
        letter: 'a',
        question: 'x<sup>2</sup> = 81',
        inputKind: 'inline',
        placeholder: 'x = …',
        correctAnswer: 'x = √81 = 9',
      },
      {
        letter: 'b',
        question: 'x<sup>3</sup> = 27',
        inputKind: 'inline',
        placeholder: 'x = …',
        correctAnswer: 'x = <span class="raiz-indice">3</span>√27 = 3',
      },
      {
        letter: 'c',
        question: 'x<sup>4</sup> = 625',
        inputKind: 'inline',
        placeholder: 'x = …',
        correctAnswer: 'x = <span class="raiz-indice">4</span>√625 = 5',
      },
      {
        letter: 'd',
        question: 'x<sup>5</sup> = 243',
        inputKind: 'inline',
        placeholder: 'x = …',
        correctAnswer: 'x = <span class="raiz-indice">5</span>√243 = 3',
      },
      {
        letter: 'e',
        question: 'x<sup>6</sup> = 64',
        inputKind: 'inline',
        placeholder: 'x = …',
        correctAnswer: 'x = <span class="raiz-indice">6</span>√64 = 2',
      },
      {
        letter: 'f',
        question: 'x<sup>8</sup> = 256',
        inputKind: 'inline',
        placeholder: 'x = …',
        correctAnswer: 'x = <span class="raiz-indice">8</span>√256 = 2',
      },
    ],
  },
  {
    id: 'ch1_q28',
    type: 'text-input',
    number: 2,
    question:
      'Você já estudou que a radiciação é a operação inversa da potenciação. Veja os exemplos:',
    subQuestions: [
      {
        letter: '',
        question: '√−36',
        placeholder: 'Apresente seus argumentos…',
        correctAnswer:
          'Não é possível calcular √−36, pois não existe um número racional que, multiplicado por ele mesmo, dê como resultado −36.',
      },
      {
        letter: '',
        question: '<span class="raiz-indice">4</span>√−16',
        placeholder: 'Apresente seus argumentos…',
        correctAnswer:
          'Também não é possível calcular <span class="raiz-indice">4</span>√−16, pois não existe um número racional que, elevado à quarta potência, dê como resultado −16.',
      },
    ],
  },
  {
    id: 'ch1_q29',
    type: 'text-input',
    number: 3,
    question:
      'Calcule as raízes a seguir e indique os casos em que elas não pertencem ao conjunto dos números reais.',
    subQuestions: [
      {
        letter: 'a',
        question: '√0',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '√0 = 0',
      },
      {
        letter: 'b',
        question: '<span class="raiz-indice">3</span>√0',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '<span class="raiz-indice">3</span>√0 = 0',
      },
      {
        letter: 'c',
        question: '√−9',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '√−9 ∉ <strong class="conjunto-n-destaque">ℝ</strong>',
      },
      {
        letter: 'd',
        question: '<span class="raiz-indice">3</span>√−1000',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '<span class="raiz-indice">3</span>√−1000 = −10',
      },
      {
        letter: 'e',
        question: '<span class="raiz-indice">4</span>√−81',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '<span class="raiz-indice">4</span>√−81 ∉ <strong class="conjunto-n-destaque">ℝ</strong>',
      },
      {
        letter: 'f',
        question: '<span class="raiz-indice">5</span>√−32',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '<span class="raiz-indice">5</span>√−32 = −2',
      },
    ],
  },
  {
    id: 'ch1_q30',
    type: 'text-input',
    number: 1,
    question: 'Represente as seguintes raízes na forma de potência com expoente fracionário.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '√7',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '7<sup><span class="fracao"><span>1</span><span>2</span></span></sup>',
      },
      {
        letter: 'b',
        question: '√8',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '√2<sup>3</sup> = 2<sup><span class="fracao"><span>3</span><span>2</span></span></sup>',
      },
      {
        letter: 'd',
        question: '<span class="raiz-indice">8</span>√27<sup>4</sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '<span class="raiz-indice">8</span>√(3<sup>3</sup>)<sup>4</sup> = <span class="raiz-indice">8</span>√3<sup>12</sup> = 3<sup><span class="fracao"><span>12</span><span>8</span></span></sup> = 3<sup><span class="fracao"><span>3</span><span>2</span></span></sup>',
      },
      {
        letter: 'e',
        question: '<span class="raiz-indice">5</span>√256',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '<span class="raiz-indice">5</span>√2<sup>8</sup> = 2<sup><span class="fracao"><span>8</span><span>5</span></span></sup>',
      },
    ],
  },
  {
    id: 'ch1_q31',
    type: 'text-input',
    number: 2,
    question: 'Escreva as potências a seguir na forma de radical.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '2<sup><span class="fracao"><span>1</span><span>2</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '√2',
      },
      {
        letter: 'b',
        question: '10<sup><span class="fracao"><span>2</span><span>3</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '<span class="raiz-indice">3</span>√10<sup>2</sup> = <span class="raiz-indice">3</span>√100',
      },
      {
        letter: 'c',
        question: '6<sup>0,5</sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '6<sup><span class="fracao"><span>5</span><span>10</span></span></sup> = 6<sup><span class="fracao"><span>1</span><span>2</span></span></sup> = √6',
      },
      {
        letter: 'd',
        question: '8<sup>0,2</sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '8<sup><span class="fracao"><span>2</span><span>10</span></span></sup> = 8<sup><span class="fracao"><span>1</span><span>5</span></span></sup> = <span class="raiz-indice">5</span>√8',
      },
      {
        letter: 'e',
        question: '2<sup>−<span class="fracao"><span>1</span><span>2</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '<span class="fracao"><span>1</span><span>2<sup><span class="fracao"><span>1</span><span>2</span></span></sup></span></span> = <span class="fracao"><span>1</span><span>√2</span></span>',
      },
      {
        letter: 'f',
        question: '2<sup>−0,1</sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '2<sup>−<span class="fracao"><span>1</span><span>10</span></span></sup> = <span class="fracao"><span>1</span><span>2<sup><span class="fracao"><span>1</span><span>10</span></span></sup></span></span> = <span class="fracao"><span>1</span><span><span class="raiz-indice">10</span>√2</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q32',
    type: 'text-input',
    number: 3,
    question: 'Aplicando as propriedades da potenciação, calcule o valor das expressões a seguir.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: '5<sup><span class="fracao"><span>3</span><span>4</span></span></sup> · 5<sup><span class="fracao"><span>1</span><span>4</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '5<sup><span class="fracao"><span>4</span><span>4</span></span></sup> = 5<sup>1</sup> = 5',
      },
      {
        letter: 'b',
        question: '2<sup><span class="fracao"><span>15</span><span>7</span></span></sup> : 2<sup><span class="fracao"><span>1</span><span>7</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '2<sup><span class="fracao"><span>14</span><span>7</span></span></sup> = 2<sup>2</sup> = 4',
      },
      {
        letter: 'c',
        question:
          '<span class="fracao"><span>10<sup><span class="fracao"><span>8</span><span>3</span></span></sup></span><span>10<sup><span class="fracao"><span>2</span><span>3</span></span></sup></span></span>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '10<sup><span class="fracao"><span>6</span><span>3</span></span></sup> = 10<sup>2</sup> = 100',
      },
      {
        letter: 'd',
        question: '(2<sup>4</sup>)<sup><span class="fracao"><span>3</span><span>2</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '2<sup><span class="fracao"><span>12</span><span>2</span></span></sup> = 2<sup>6</sup> = 64',
      },
      {
        letter: 'e',
        question: '256<sup>(<span class="fracao"><span>1</span><span>2</span></span>)<sup>3</sup></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '256<sup><span class="fracao"><span>1</span><span>8</span></span></sup> = <span class="raiz-indice">8</span>√256 = <span class="raiz-indice">8</span>√2<sup>8</sup> = 2',
      },
      {
        letter: 'f',
        question:
          '[(0,2)<sup><span class="fracao"><span>5</span><span>3</span></span></sup>]<sup><span class="fracao"><span>6</span><span>5</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer: '0,2<sup>2</sup> = 0,04',
      },
    ],
  },
  {
    id: 'ch1_q33',
    type: 'text-input',
    number: 1,
    question: 'Qual é o inverso da fração geratriz da dízima periódica 1,007777…?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '1,00777… = 1 + <span class="fracao"><span>7</span><span>900</span></span> = <span class="fracao"><span>907</span><span>900</span></span><br/>O inverso de <span class="fracao"><span>907</span><span>900</span></span> é <span class="fracao"><span>900</span><span>907</span></span>.',
  },
  {
    id: 'ch1_q34',
    type: 'text-input',
    number: 2,
    question:
      'Estime um valor aproximado (com uma casa decimal) para cada raiz e resolva as expressões a seguir.',
    subQuestions: [
      {
        letter: 'a',
        question: '√3 + √5 − √7',
        placeholder: 'Digite aqui...',
        correctAnswer: '1,7 + 2,2 − 2,6 ≈ 1,3',
      },
      {
        letter: 'b',
        question: '2√10 + 3√8 − √32',
        placeholder: 'Digite aqui...',
        correctAnswer: '2 · 3,1 + 3 · 2,8 − 5,6 ≈<br/>6,2 + 8,4 − 5,6 ≈<br/>14,6 − 5,6 ≈ 9',
      },
    ],
  },
  {
    id: 'ch1_q35',
    type: 'text-input',
    number: 3,
    question:
      'Considere os números 9; <span class="fracao"><span>3</span><span>4</span></span>; −2,6; √36; 0,444…; <span class="fracao"><span>18</span><span>2</span></span>; √5; −√3; −8. Com base neles, responda aos questionamentos.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question: 'Quais são naturais?',
        placeholder: 'Digite aqui...',
        correctAnswer: '9; √36 = 6 e <span class="fracao"><span>18</span><span>2</span></span> = 9.',
      },
      {
        letter: 'b',
        question: 'Quais são inteiros?',
        placeholder: 'Digite aqui...',
        correctAnswer: '9; −8; √36 = 6 e <span class="fracao"><span>18</span><span>2</span></span> = 9.',
      },
      {
        letter: 'c',
        question: 'Quais são racionais?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          '9; −8; −2,6; 0,444…; <span class="fracao"><span>3</span><span>4</span></span>; √36 = 6 e <span class="fracao"><span>18</span><span>2</span></span> = 9.',
      },
      {
        letter: 'd',
        question: 'Quais são irracionais?',
        placeholder: 'Digite aqui...',
        correctAnswer: '−√3 e √5.',
      },
      {
        letter: 'e',
        question: 'Quais são reais?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          '9; <span class="fracao"><span>3</span><span>4</span></span>; −2,6; √36 = 6; 0,444…; <span class="fracao"><span>18</span><span>2</span></span> = 9; √5; −√3 e −8.',
      },
    ],
  },
  {
    id: 'ch1_q36',
    type: 'text-input',
    number: 4,
    question:
      'Calcule o valor numérico da expressão E = <span class="fracao"><span>(−1)<sup>355</sup> − (−1)<sup>197</sup> − (−1)<sup>11</sup></span><span>2 · (−1)<sup>21</sup></span></span>.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'E = <span class="fracao"><span>−1 − (−1) − (−1)</span><span>2 · (−1)</span></span> =<br/>= <span class="fracao"><span><span class="cancel-num">−1</span> + <span class="cancel-num">1</span> + 1</span><span>−2</span></span> = −<span class="fracao"><span>1</span><span>2</span></span>',
  },
  {
    id: 'ch1_q37',
    type: 'text-input',
    number: 5,
    question:
      'Calcule m², sabendo que m = <span class="fracao"><span>0,00001 · (0,001)<sup>2</sup> · 100&nbsp;000</span><span>0,001 · (0,1)<sup>3</sup></span></span>.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'm = <span class="fracao"><span>10<sup>−5</sup> · (10<sup>−3</sup>)<sup>2</sup> · 10<sup>5</sup></span><span>10<sup>−3</sup> · (10<sup>−1</sup>)<sup>3</sup></span></span> =<br/>= <span class="fracao"><span>10<sup>−5</sup> · <span class="cancel-num">10<sup>−6</sup></span> · 10<sup>5</sup></span><span class="cancel-num">10<sup>−3</sup> · 10<sup>−3</sup></span></span> =<br/>= 10<sup>0</sup> = 1<br/>m² = 1',
  },
  {
    id: 'ch1_q38',
    type: 'text-input',
    number: 6,
    question: 'Reescreva as frases substituindo os números pelas suas respectivas notações científicas.',
    subQuestions: [
      {
        letter: 'a',
        question:
          'A distância em torno da Terra, na altura da Linha do Equador, é cerca de 40&nbsp;000 km.',
        placeholder: 'Digite a frase reescrita…',
        correctAnswer:
          'A distância em torno da Terra, na altura da Linha do Equador, é cerca de 4 · 10<sup>4</sup> km.',
      },
      {
        letter: 'b',
        question: 'Em um cérebro humano, existem cerca de 86 bilhões de neurônios.',
        placeholder: 'Digite a frase reescrita…',
        correctAnswer:
          'Em um cérebro humano, existem cerca de 8,6 · 10<sup>10</sup> neurônios.',
      },
    ],
  },
  {
    id: 'ch1_q39',
    type: 'text-input',
    number: 7,
    question: 'Simplifique as expressões aplicando as propriedades das potências.',
    subQuestionsLayout: 'grid-2',
    subQuestions: [
      {
        letter: 'a',
        question:
          '4<sup><span class="fracao"><span>1</span><span>3</span></span></sup> · 4<sup><span class="fracao"><span>1</span><span>2</span></span></sup> · 4<sup><span class="fracao"><span>1</span><span>6</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '4<sup><span class="fracao"><span>2 + 3 + 1</span><span>6</span></span></sup> = 4<sup><span class="fracao"><span>6</span><span>6</span></span></sup> = 4<sup>1</sup> = 4',
      },
      {
        letter: 'b',
        question:
          '(4<sup><span class="fracao"><span>1</span><span>3</span></span></sup> : 2<sup><span class="fracao"><span>4</span><span>3</span></span></sup>)<sup><span class="fracao"><span>3</span><span>2</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '(2<sup><span class="fracao"><span>2</span><span>3</span></span></sup> : 2<sup><span class="fracao"><span>4</span><span>3</span></span></sup>)<sup><span class="fracao"><span>3</span><span>2</span></span></sup> = (2<sup>−<span class="fracao"><span>2</span><span>3</span></span></sup>)<sup><span class="fracao"><span>3</span><span>2</span></span></sup> = 2<sup>−1</sup> = <span class="fracao"><span>1</span><span>2</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q40',
    type: 'text-input',
    number: 8,
    question: 'Resolva as expressões a seguir.',
    subQuestions: [
      {
        letter: 'a',
        question:
          '81<sup><span class="fracao"><span>1</span><span>2</span></span></sup> − 8<sup><span class="fracao"><span>1</span><span>3</span></span></sup> + 32<sup><span class="fracao"><span>1</span><span>5</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '√81 − <span class="raiz-indice">3</span>√8 + <span class="raiz-indice">5</span>√32 = 9 − 2 + 2 = 9',
      },
      {
        letter: 'b',
        question:
          '32<sup><span class="fracao"><span>1</span><span>5</span></span></sup> + 36<sup>0,5</sup> · 2<sup>−1</sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '<span class="raiz-indice">5</span>√32 + √36 · <span class="fracao"><span>1</span><span>2</span></span> = <span class="raiz-indice">5</span>√2<sup>5</sup> + 6 · <span class="fracao"><span>1</span><span>2</span></span> = 2 + 3 = 5',
      },
      {
        letter: 'c',
        question:
          '64<sup>−<span class="fracao"><span>1</span><span>2</span></span></sup> − 27<sup><span class="fracao"><span>1</span><span>3</span></span></sup> + 16<sup>−<span class="fracao"><span>1</span><span>4</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '√<span class="fracao"><span>1</span><span>64</span></span> − <span class="raiz-indice">3</span>√3<sup>3</sup> + <span class="raiz-indice">4</span>√<span class="fracao"><span>1</span><span>16</span></span> = <span class="fracao"><span>1</span><span>8</span></span> − 3 + <span class="fracao"><span>1</span><span>2</span></span> = <span class="fracao"><span>1 − 24 + 4</span><span>8</span></span> = −<span class="fracao"><span>19</span><span>8</span></span>',
      },
      {
        letter: 'd',
        question:
          '(<span class="fracao"><span>3</span><span>2</span></span> + 8<sup>−<span class="fracao"><span>1</span><span>3</span></span></sup>)<sup>−2</sup> − (<span class="fracao"><span>1</span><span>3</span></span>)<sup>−1</sup> · 9<sup><span class="fracao"><span>1</span><span>2</span></span></sup>',
        inputKind: 'inline',
        placeholder: '…',
        correctAnswer:
          '(<span class="fracao"><span>3</span><span>2</span></span> + <span class="raiz-indice">3</span>√<span class="fracao"><span>1</span><span>8</span></span>)<sup>−2</sup> − 3 · √9 = (<span class="fracao"><span>3</span><span>2</span></span> + <span class="fracao"><span>1</span><span>2</span></span>)<sup>−2</sup> − 3 · 3 = 2<sup>−2</sup> − 9 = <span class="fracao"><span>1</span><span>4</span></span> − 9 = −<span class="fracao"><span>35</span><span>4</span></span>',
      },
    ],
  },
  {
    id: 'ch1_q41',
    type: 'multiple-choice',
    number: 9,
    question: '(PUC-RJ) O valor de √0,444… é',
    options: {
      a: '0,222…',
      b: '0,333…',
      c: '0,444…',
      d: '0,555…',
      e: '0,666…',
    },
    correctAnswer: 'e',
    teacherAnswer:
      'e) 0,666…<br/>√0,444… = √<span class="fracao"><span>4</span><span>9</span></span> = <span class="fracao"><span>2</span><span>3</span></span> = 0,666…',
  },
  {
    id: 'ch1_q42',
    type: 'multiple-choice',
    number: 10,
    question:
      '(USP) Seja <span class="fracao"><span>a</span><span>b</span></span> a fração geratriz da dízima 0,12222… com <strong>a</strong> e <strong>b</strong> primos entre si. Nessas condições, tem-se',
    options: {
      a: 'a<sup>b</sup> = 990.',
      b: 'ab = 900.',
      c: 'a − b = 80.',
      d: 'a + b = 110.',
      e: 'b − a = 79.',
    },
    correctAnswer: 'e',
    teacherAnswer:
      'e) b − a = 79.<br/>0,1222… = <span class="fracao"><span>12 − 1</span><span>90</span></span> = <span class="fracao"><span>11</span><span>90</span></span><br/><span class="fracao"><span>a</span><span>b</span></span> = <span class="fracao"><span>11</span><span>90</span></span> → b − a = 90 − 11 → b − a = 79',
  },
  {
    id: 'ch1_q43',
    type: 'text-input',
    number: 1,
    question:
      'Resolva a expressão a seguir.<div class="expressao-mf">2,25 · 2,34222… + <span class="fracao"><span>58</span><span>2 + <span class="fracao"><span>1</span><span>2 + <span class="fracao"><span>1</span><span>2 + <span class="fracao"><span>1</span><span>2</span></span></span></span></span></span></div>',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="fracao"><span>9</span><span>4</span></span> · <span class="fracao"><span>2108</span><span>900</span></span> + 58 · <span class="fracao"><span>12</span><span>29</span></span> = <span class="fracao"><span>527</span><span>100</span></span> + 24 = 5,27 + 24 = 29,27',
  },
  {
    id: 'ch1_q44',
    type: 'multiple-choice',
    number: 2,
    question:
      'A expressão <span class="math-paren">(2 + <span class="fracao"><span>1</span><span>4</span></span>)</span> : <span class="math-paren">(2 − <span class="fracao"><span>1</span><span>4</span></span>)</span> + 1 dá origem a um decimal não exato, cuja soma dos seis primeiros algarismos da parte decimal é igual a',
    options: {
      a: '28.',
      b: '27.',
      c: '26.',
      d: '25.',
    },
    correctAnswer: 'b',
    teacherAnswer:
      'b) 27.<br/><span class="math-paren">(2 + <span class="fracao"><span>1</span><span>4</span></span>)</span> : <span class="math-paren">(2 − <span class="fracao"><span>1</span><span>4</span></span>)</span> + 1 = <span class="fracao"><span>9</span><span>4</span></span> : <span class="fracao"><span>7</span><span>4</span></span> + 1 = <span class="fracao"><span>9</span><span>4</span></span> · <span class="fracao"><span>4</span><span>7</span></span> + 1 = <span class="fracao"><span>9</span><span>7</span></span> + 1 = <span class="fracao"><span>16</span><span>7</span></span> = 2,285714…<br/>Soma = 2 + 8 + 5 + 7 + 1 + 4 = 27',
  },
  {
    id: 'ch1_q45',
    type: 'multiple-choice',
    number: 3,
    question: '(FUVEST-SP) Qual é a metade de 2<sup>22</sup>?',
    options: {
      a: '1<sup>22</sup>',
      b: '1<sup>11</sup>',
      c: '2<sup>11</sup>',
      d: '2<sup>21</sup>',
    },
    correctAnswer: 'd',
    teacherAnswer: 'd) 2<sup>21</sup><br/>2<sup>22</sup> : 2 = 2<sup>22 − 1</sup> = 2<sup>21</sup>',
  },
];

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const START_PAGE = 4;
  const { currentPage, scrollToTop } = usePagination(START_PAGE);
  const [showTeacherView] = useState(false);

  const getQuestionById = (questionId: string) =>
    chapterQuestions.find((question) => question.id === questionId)!;

  useScrollPosition();

  return (
    <div className="marca-sas min-h-screen w-full bg-gray-200">
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <details className="unidade-recolhivel" open>
          <summary className="unidade-recolhivel__resumo">
            <Header
              marca="sas"
              variante="unidade"
              badge="UNIDADE"
              chapterNumber={1}
              chapterTitle="E se você pudesse ouvir a matemática?"
            />
            <div className="unidade-recolhivel__barra">
              <span>Conteúdo da unidade</span>
              <img src={publicUrl('images/seta.svg')} alt="" className="unidade-recolhivel__seta" />
            </div>
          </summary>
          <details className="caixa-expansivel">
            <summary className="caixa-expansivel__resumo">
              <span className="caixa-expansivel__titulo">Aprendizagens essenciais</span>
              <span className="caixa-expansivel__botao" aria-hidden />
            </summary>
            <div className="caixa-expansivel__corpo">
              <ul className="list-disc ml-6">
                <li>
                  Resolver problemas e expressões algébricas utilizando o conjunto dos números reais{' '}
                  <Formula tex="\mathbb{R}" /> e seus subconjuntos (
                  <Formula tex="\mathbb{N}" />, <Formula tex="\mathbb{Z}" />, <Formula tex="\mathbb{Q}" />,{' '}
                  <Formula tex="\mathbb{Q}^{\prime}" />
                  ).
                </li>
                <li>Identificar a natureza da variação de duas grandezas, expressando-a por meio de sentença algébrica.</li>
                <li>Efetuar cálculos, resolver e elaborar problemas com potências de expoente inteiro e fracionário, com números em notação científica, com porcentagens e que envolvam variação de duas grandezas.</li>
                <li>Construir mediatriz, bissetriz e ângulos de 90°, 60°, 45° e 30°.</li>
                <li>Reconhecer e construir figuras obtidas por simetrias de translação, reflexão e rotação.</li>
                <li>Reconhecer monômios e polinômios e efetuar as quatro operações básicas.</li>
              </ul>
            </div>
          </details>
          <div className="p-8 md:p-12">
            <figure className="img-unidade">
              <img
                src={capAsset('images/page_1_img_161_-1.png')}
                alt="Cantora e compositora norte-americana Taylor Swift em uma de suas performances no Brasil."
              />

              <p className="legenda-barra">
                Cantora e compositora norte-americana Taylor Swift em uma
                de suas performances no Brasil. Ela toca mais de quatro
                instrumentos de corda em canções que misturam gêneros
                como o pop e o country. Em 2026, Taylor atingiu a marca de
                126 bilhões de reproduções no serviço de streaming Spotify,
                sendo a artista mais reproduzida na história da plataforma.
              </p>
            </figure>
            <p className="mb-4 indent-6">
              O que a música e a Matemática têm em comum? Mais do que se pode imaginar.
            </p>
            <p className="mb-4 indent-6">
              As melodias envolvem relações matemáticas. Em uma guitarra, por exemplo, quando um músico move seus dedos entre as casas do braço do instrumento, a vibração de cada corda muda. O som obtido quando a corda está pressionada na metade (
              <Formula tex="\frac{1}{2}" />) é diferente daquele obtido quando ela é pressionada na metade da metade (
              <Formula tex="\frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}" />
              ). Isso significa que, para cada nota na escala musical, existe uma representação em fração.
            </p>

            <p className="mb-4 indent-6">A escala musical mais utilizada
              atualmente é composta de sete notas
              naturais – dó, ré, mi, fá, sol, lá, si – e foi
              formada por meio de uma relação entre
              as frequências de cada uma dessas
              notas. A primeira escala musical com
              base matemática da história ocidental foi
              desenvolvida por Pitágoras, razão pela qual
              ficou conhecida como a escala pitagórica.
              Desde então, utiliza-se a divisão em
              intervalos com relação matemática para
              produzir sons que se combinem de forma
              agradável e harmônica.</p>

            <p className="mb-4 indent-6">Esse é só um dos vários exemplos
              da presença da Matemática nas diversas
              áreas do conhecimento. Você encontrará
              outros usos nos capítulos que seguem. Vá
              em frente e faça novas descobertas</p>

            <figure className="img-unidade">
              <img
                src={capAsset('images/imagemUnidade.png')}
                alt="Ed Sheeran, cantor, compositor, ator e produtor britânico, em apresentação ao violão."
              />
              <p className="img-unidade__credito">Doug Peters/Alamy/Fotoarena</p>
              <p className="legenda-barra">
                Ed Sheeran, cantor, compositor, ator e produtor
                britânico. Conhecido pelas baladas românticas, tem
                como uma das características marcantes de suas
                apresentações sua performance ao violão. Em 2026,
                o cantor atingiu a marca de 200 milhões de discos
                vendidos mundialmente, consolidando sua posição
                como um dos artistas mais ouvidos do mundo.
              </p>
            </figure>

            <ComecoDeConversa iconSrc={capAsset('images/selo-comeco-conversa.png')}>
              <ul className="comeco-conversa__lista list-disc ml-6">
                <li>A música é um exemplo de aplicação da Matemática
                  em que não há o uso explícito de números. Discuta
                  com seus colegas e apresente outras situações em
                  que isso ocorre.</li>
                <li>Você iniciará esta unidade relembrando alguns
                  conjuntos de números – os naturais, os inteiros e
                  os racionais – para conhecer mais sobre o conjunto
                  dos números reais. O texto desta abertura apresenta alguns números. A qual conjunto numérico
                  eles pertencem?</li>
              </ul>
            </ComecoDeConversa>
          </div>


        </details>



        <Header
          marca="sas"
          badge="CAPÍTULO"
          chapterNumber={1}
          chapterTitle="Números reais, potenciação e radiciação"
        />

        <Pagination currentPage={START_PAGE} />

        {/* <Poster
          imageSrc={capAsset('images/page_3_img_-1_-1.jpg')}
          creditLine1=""
          creditLine2=""
          alt="Imagem de abertura do capítulo"
        /> */}

        <div className="p-8 md:p-12">
          <EscolaDigital
            href="http://qr.portalsaseducacao.com.br/vid_8a_mat_c1"
            thumbnailSrc={capAsset('images/thumbEscolaDigital.svg')}
          />


          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              answers={
                <>
                  <p className="mb-3">
                    Possíveis exemplos de <strong>números naturais</strong>: 5 (título); 1 a 5 (ranking);
                    5 459; 5 177; 600; 290; 225; 13; 24; 1970; 3; 670; 10; 18; 25; 2021; 208; 28; 30; 2025; 2026.
                  </p>
                  <p>
                    Possíveis exemplos de <strong>números racionais que não são naturais</strong>: 18,2; 1,85; 34,5; 35,3.
                  </p>
                </>
              }
            />
          </div>

          <p className="mb-4 indent-6">
            Você já se deu conta da variedade de números que utilizamos no dia a
            dia? Eles estão presentes, por exemplo, em grande parte das informações
            que consumimos na internet.
          </p>

          <div className="bloco-leitura__linha">
            <p className="mb-4 indent-6">
              Leia, a seguir, o trecho de uma reportagem sobre o fim do tratado New
              START, um acordo entre EUA e Rússia, encerrado em 2026, que limitava a
              quantidade de <span className="glossario-destaque">ogivas nucleares</span> pertencentes a ambos os países. Durante a
              leitura, atente-se ao uso recorrente dos números para a comunicação, buscando identificar o significado de cada um deles na análise das informações.
            </p>
            <GlossarioAF
              termo="Ogiva nuclear"
              definicao="é um dispositivo explosivo que utiliza reações físicas para liberar grandes quantidades de energia em um curto espaço de tempo."
            />
          </div>
          <p className="mb-4 indent-6 font-bold text-center">
            Fim do acordo nuclear entre EUA e Rússia
          </p>
          <p className="mb-4 indent-6 text-center">
            Os EUA e a Rússia têm, juntos, a maior parte do estoque de ogivas nucleares do mundo.
          </p>

          <AtividadeSublinharProvider storageKey="sas-af8-mat-c1-sublinhar-ogivas">
            <AtividadeSublinharArea>
              <p className="grafico-ogivas__titulo">
                <TextoInterativo idPrefix="titulo" texto="Arsenais dos 5 países com mais ogivas nucleares no mundo" />
              </p>
              <div
                className="grafico-ogivas"
                role="img"
                aria-label="Arsenais dos 5 países com mais ogivas nucleares no mundo"
              >
                <ol className="grafico-ogivas__lista">
                  {[
                    { pos: 1, pais: 'Rússia', bandeira: 'ru', valor: '5 459', extra: '*', largura: 100 },
                    { pos: 2, pais: 'EUA', bandeira: 'us', valor: '5 177', extra: '', largura: 95 },
                    { pos: 3, pais: 'China', bandeira: 'cn', valor: '600', extra: '', largura: 11, bandeiraSrc: 'images/china.svg' },
                    { pos: 4, pais: 'França', bandeira: 'fr', valor: '290', extra: '', largura: 5.3 },
                    { pos: 5, pais: 'Reino Unido', bandeira: 'gb', valor: '225', extra: '', largura: 4.1, bandeiraSrc: 'images/reino.webp' },
                  ].map((item) => (
                    <li key={item.pais} className="grafico-ogivas__item">
                      <span className="grafico-ogivas__pos">
                        <TrechoClicavel id={`pos-${item.pos}`}>{item.pos}</TrechoClicavel>
                      </span>
                      {item.bandeiraSrc ? (
                        <img
                          className="grafico-ogivas__bandeira"
                          src={capAsset(item.bandeiraSrc)}
                          alt=""
                          aria-hidden
                        />
                      ) : item.bandeira === 'ru' ? (
                        <svg className="grafico-ogivas__bandeira" viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden>
                          <rect width="9" height="2" fill="#fff" />
                          <rect y="2" width="9" height="2" fill="#0039a6" />
                          <rect y="4" width="9" height="2" fill="#d52b1e" />
                        </svg>
                      ) : item.bandeira === 'us' ? (
                        <BandeiraEUA />
                      ) : (
                        <span
                          className={`grafico-ogivas__bandeira grafico-ogivas__bandeira--${item.bandeira}`}
                          aria-hidden
                        />
                      )}
                      <span className="grafico-ogivas__pais">
                        <TrechoClicavel id={`pais-${item.pais}`}>{item.pais}</TrechoClicavel>
                      </span>
                      <span className="grafico-ogivas__trilha">
                        <span className="grafico-ogivas__barra" style={{ width: `${item.largura}%` }} />
                      </span>
                      <span className="grafico-ogivas__valor">
                        <TrechoClicavel id={`valor-${item.pais}`}>{item.valor}</TrechoClicavel>
                        {item.extra}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="mt-2 text-[14px] text-slate-600">
                <TextoInterativo
                  idPrefix="nota"
                  texto="*quantidade de ogivas nucleares, segundo Instituto Internacional de Pesquisa da Paz de Estocolmo (Sipri) em janeiro de 2025."
                />
              </p>
              <p className="mb-4 indent-6">
                <TextoInterativo
                  idPrefix="paragrafo"
                  texto="Após o término do tratado New START, expirado em fevereiro de 2026, os países seguem sem um acordo que limite seus estoques, gerando certa instabilidade na política global. Veja, a seguir, os arsenais estimados para ambos os países."
                />
              </p>

              <div className="infografico-arsenais" aria-label="Infográfico dos arsenais nucleares da Rússia e dos EUA">
                <article className="infografico-arsenais__coluna">
                  <header className="infografico-arsenais__cabecalho">
                    <span className="infografico-arsenais__bandeira infografico-arsenais__bandeira--ru" aria-hidden />
                    <h3 className="infografico-arsenais__titulo">
                      <TextoInterativo idPrefix="ru-nome" texto="RS-28" /> <strong>Sarmat</strong>
                    </h3>
                  </header>
                  <div className="infografico-arsenais__corpo">
                    <dl className="infografico-arsenais__lista">
                      <div><dt>Alcance:</dt><dd><TextoInterativo idPrefix="ru-alcance" texto="13 mil km" /></dd></div>
                      <div><dt>Velocidade:</dt><dd><TextoInterativo idPrefix="ru-vel" texto="Até 24 mil km/h" /></dd></div>
                      <div><dt>No arsenal desde:</dt><dd><TextoInterativo idPrefix="ru-desde" texto="1970" /></dd></div>
                      <div><dt>Comprimento:</dt><dd><TextoInterativo idPrefix="ru-comp" texto="18,2 m" /></dd></div>
                      <div><dt>Diâmetro:</dt><dd><TextoInterativo idPrefix="ru-diam" texto="1,85 m" /></dd></div>
                      <div><dt>Peso de lançamento:</dt><dd><TextoInterativo idPrefix="ru-peso" texto="34,5 ton" /></dd></div>
                      <div><dt>Peso da ogiva:</dt><dd><TextoInterativo idPrefix="ru-ogiva" texto="3 ogivas de 670 kg cada" /></dd></div>
                    </dl>
                    <div className="infografico-arsenais__grafico">
                      <p className="infografico-arsenais__pais">
                        <TrechoClicavel id="ru-pais">Rússia</TrechoClicavel>
                      </p>
                      <span className="infografico-arsenais__seta" aria-hidden />
                      <div className="infografico-arsenais__circulo infografico-arsenais__circulo--russia">
                        <strong><TrechoClicavel id="ru-total">5 459</TrechoClicavel></strong>
                        <span>ogivas nucleares</span>
                      </div>
                    </div>
                    <img
                      className="infografico-arsenais__missil"
                      src={capAsset('images/infografico-sarmat.svg')}
                      alt="Míssil RS-28 Sarmat"
                    />
                  </div>
                </article>

                <article className="infografico-arsenais__coluna">
                  <header className="infografico-arsenais__cabecalho">
                    <span className="infografico-arsenais__bandeira infografico-arsenais__bandeira--us" aria-hidden />
                    <h3 className="infografico-arsenais__titulo infografico-arsenais__titulo--eua">
                      <TextoInterativo idPrefix="us-nome" texto="LGM-30G" /> <strong>Minuteman III</strong>
                    </h3>
                  </header>
                  <div className="infografico-arsenais__corpo">
                    <dl className="infografico-arsenais__lista">
                      <div><dt>Alcance:</dt><dd><TextoInterativo idPrefix="us-alcance" texto="Entre 10 e 18 mil km" /></dd></div>
                      <div><dt>Velocidade:</dt><dd><TextoInterativo idPrefix="us-vel" texto="Até 25 mil km/h" /></dd></div>
                      <div><dt>No arsenal desde:</dt><dd><TextoInterativo idPrefix="us-desde" texto="2021" /></dd></div>
                      <div><dt>Comprimento:</dt><dd><TextoInterativo idPrefix="us-comp" texto="35,3 m" /></dd></div>
                      <div><dt>Diâmetro:</dt><dd><TextoInterativo idPrefix="us-diam" texto="3 m" /></dd></div>
                      <div><dt>Peso de lançamento:</dt><dd><TextoInterativo idPrefix="us-peso" texto="208 ton" /></dd></div>
                      <div><dt>Peso da ogiva:</dt><dd><TextoInterativo idPrefix="us-ogiva" texto="10 ton" /></dd></div>
                    </dl>
                    <div className="infografico-arsenais__grafico">
                      <p className="infografico-arsenais__pais">
                        <TrechoClicavel id="us-pais">EUA</TrechoClicavel>
                      </p>
                      <span className="infografico-arsenais__seta" aria-hidden />
                      <div className="infografico-arsenais__circulo infografico-arsenais__circulo--eua">
                        <strong><TrechoClicavel id="us-total">5 177</TrechoClicavel></strong>
                        <span>ogivas nucleares</span>
                      </div>
                    </div>
                    <img
                      className="infografico-arsenais__missil"
                      src={capAsset('images/infografico-minuteman.svg')}
                      alt="Míssil LGM-30G Minuteman III"
                    />
                  </div>
                </article>
              </div>
            </AtividadeSublinharArea>

            <p className="infografico-arsenais__creditos">Kayan Albertin/Arte g1</p>
            <p className="infografico-arsenais__fonte">
              G1. Veja países com armas nucleares: infográfico. <em>G1</em>, 5 fev. 2026. Disponível em:{' '}
              <a href="https://g1.globo.com" target="_blank" rel="noopener noreferrer">https://g1.globo.com</a>.
              Acesso em: 24 jun. 2026.
            </p>

            <div className="caixa-hipotese caixa-atividade-leitura">
              <div className="caixa-atividade-leitura__corpo">
                <p>
                  <span className="caixa-atividade-leitura__seta" aria-hidden>»</span>
                  Sublinhe todos os números que você encontrar no texto e identifique dois exemplos de números naturais e dois exemplos de números racionais que não são naturais.
                </p>
                <BotaoModoSublinhar />
              </div>
            </div>
          </AtividadeSublinharProvider>

          <Pagination currentPage={5} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={<TeacherAnswers questions={getQuestionById('ch1_q1')} />}
            />
          </div>

          <p className="mb-4 indent-6">
            Neste capítulo, você aprofundará seus estudos sobre os conjuntos numéricos e conhecerá dois novos conjuntos: o <strong style={{ color: '#f37344' }}>conjunto dos números irracionais</strong> e o <strong style={{ color: '#f37344' }}>conjunto dos números reais</strong>. Também estudará, de forma mais aprofundada, a operação da potenciação, suas propriedades e sua operação inversa, a radiciação.
          </p>

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Conjuntos numéricos</h2>
          <p className="mb-4 indent-6">
            Os conjuntos numéricos são agrupamentos de números que compartilham características em comum. Entre eles, destacam-se o conjunto dos números naturais, o dos inteiros e o dos racionais.
          </p>

          <p className="mb-4 indent-6">A seguir, veja quais são as principais características que definem cada um desses conjuntos.</p>

          <h4 style={{ color: '#28459d' }} className="text-xl font-bold text-blue-600 mb-4 mt-6">Números naturais e números inteiros</h4>
          <p className="mb-4 indent-6">
            O <strong>conjunto dos números naturais</strong> é indicado pelo símbolo <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{N}" />
            </strong>.
          </p>
          <p className="mb-4 text-center">
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{N}" />
            </strong>
            {' = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...}'}
          </p>
          <p className="mb-4 indent-6">
            Já o <strong>conjunto dos números naturais não nulos</strong> é indicado pelo símbolo <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{N}" />
            </strong>, pois convencionou-se o uso do asterisco (*) para indicar a exclusão do número zero de qualquer conjunto numérico.</p>
          <p className="mb-4 text-center"><strong className="conjunto-n-destaque">
            <Formula tex="\mathbb{N}" />
          </strong> = {'{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...}'}
          </p>
          <p className="mb-4 indent-6">
            Acrescentando os números inteiros negativos ao conjunto dos números naturais, forma-se o <strong>conjunto dos números inteiros</strong>, indicado pelo símbolo <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Z}" />.</strong></p>
          <p className="mb-4 text-center"><strong className="conjunto-n-destaque">
            <Formula tex="\mathbb{Z}" />
          </strong> = {'{..., –6, –5, –4, –3, –2, –1, 0, 1, 2, 3, 4, 5, 6, ...}'}
          </p>

          <h4 style={{ color: '#28459d' }} className="text-xl font-bold text-blue-600 mb-4 mt-6">Números racionais</h4>
          <p className="mb-4 indent-6">
            O número racional é definido como todo número que pode ser escrito na forma de fração na qual o numerador e o denominador são números inteiros, sendo o denominador diferente de zero.
          </p>
          <p className="mb-4 indent-6">Em outras palavras, são racionais os números que são razões (quocientes) de
            dois números inteiros. Simbolicamente, o conjunto dos números racionais, indicado pelo símbolo <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}" /></strong>, é representado da seguinte maneira:</p>

          <div
            className="formula-caixa-amarela"
            role="img"
            aria-label="Q igual ao conjunto dos x tais que x = a sobre b, sendo a pertencente a Z e b pertencente a Z asterisco"
          >
            <Formula tex="\displaystyle \mathbf{\mathbb{Q}} = \left\{ x \mid x = \frac{\mathbf{a}}{\mathbf{b}},\ \text{sendo } \mathbf{a} \in \mathbf{\mathbb{Z}} \text{ e } \mathbf{b} \in \mathbf{\mathbb{Z}}^{*} \right\}" />
          </div>

          <DialogarEConhecer iconSrc={capAsset('images/selo-dialogar-conhecer.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </DialogarEConhecer>

          <Pagination currentPage={6} expandToBookColumn />


          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q2'),
                    getQuestionById('ch1_q3'),
                    getQuestionById('ch1_q4'),
                  ]}
                />
              }
            />
          </div>

          <QuestionRenderer
            question={getQuestionById('ch1_q2')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('ch1_q3')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('ch1_q4')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Transformação de frações racionais em números decimais</h2>
          <p className="mb-4 indent-6">
            Dado um número racional <Formula tex="\dfrac{a}{b}" />, com <Formula tex="b \neq 0" />, a representação decimal desse número é obtida dividindo-se <strong>a</strong> por <strong>b</strong> (<Formula tex="\dfrac{a}{b} = a:b" />).
          </p>
          <p className="mb-4 indent-6">Veja alguns exemplos:</p>

          <div className="divisoes-racionais">
            <p className="divisao-exemplo__eq">
              <span className="divisao-exemplo__letra">a)</span>{' '}
              <Formula tex="\dfrac{5}{2} = 2,5" />
            </p>
            <p className="divisao-exemplo__eq">
              <span className="divisao-exemplo__letra">b)</span>{' '}
              <Formula tex="\dfrac{2}{3} = 0,666\ldots" />
              <span className="divisao-exemplo__ou"> ou </span>
              <Formula tex="\dfrac{2}{3} = 0,\overline{6}" />
            </p>
            <p className="divisao-exemplo__eq">
              <span className="divisao-exemplo__letra">c)</span>{' '}
              <Formula tex="\dfrac{14}{11} = 1,272727\ldots" />
              <span className="divisao-exemplo__ou"> ou </span>
              <Formula tex="\dfrac{14}{11} = 1,\overline{27}" />
            </p>
          </div>

          <figure className="divisoes-racionais__figura">
            <img src={capAsset('images/6_1.png')} alt="Divisões de 5 por 2, 2 por 3 e 14 por 11." className="w-full" />
          </figure>

          <BlocoPapelTexto
            className="bloco-papel-texto--amarelo"
            imageSrc={capAsset('images/page_5_img_44_574.png')}
            imageAlt="Pote de biscoitos na mesa da cozinha."
            credit="Shutterstock"
          >
            <p>
              Nicole notou que sobraram cinco biscoitos no pote da
              cozinha. Por ordem de sua mãe, ela terá que dividir esses biscoitos
              igualmente entre ela e seu irmão. Ao fazer a divisão de 5 por 2,
              Nicole viu que é possível obter a transformação da fração em
              número decimal, como visto no exemplo anterior. Assim, cada
              irmão ficará com 2,5 biscoitos (dois biscoitos e meio).
            </p>
          </BlocoPapelTexto>

          <Pagination currentPage={7} expandToBookColumn />

          <p className="mb-4 indent-6">
            Como pôde ser observado nos exemplos anteriores, é possível que as frações tenham representações decimais exatas ou não exatas. Na representação decimal não exata, um algarismo ou um grupo de algarismos repete-se periodicamente. Números com essas características são denominados <strong style={{ color: '#f37344' }}>dízimas periódicas</strong>.
          </p>

          <h1 style={{ color: '#28459d' }} className="text-xl font-bold text-blue-600 mb-4 mt-6">Dízima periódica</h1>
          <p className="mb-4 indent-6">Em uma dízima periódica, é utilizada a seguinte nomenclatura.</p>
          <div className="dizima-nomenclatura">
            <p className="dizima-nomenclatura__item dizima-nomenclatura__item--cheia">
              <span className="dizima-nomenclatura__seta" aria-hidden>↘</span>
              <span>
                <strong className="dizima-nomenclatura__termo dizima-nomenclatura__termo--i">Parte inteira (I)</strong>
                {' — '}Algarismo ou grupo de algarismos que antecede a vírgula.
              </span>
            </p>
            <p className="dizima-nomenclatura__item">
              <span className="dizima-nomenclatura__seta" aria-hidden>↘</span>
              <span>
                <strong className="dizima-nomenclatura__termo dizima-nomenclatura__termo--p">Período (P)</strong>
                {' — '}Algarismo ou grupo de algarismos que se repete indefinidamente na parte decimal (após a vírgula).
              </span>
            </p>
            <CaixaNota iconSrc={capAsset('images/selo-nota.png')}>
              <p>Uma dízima periódica pode ter ou não a parte não periódica.</p>
            </CaixaNota>
            <p className="dizima-nomenclatura__item">
              <span className="dizima-nomenclatura__seta" aria-hidden>↘</span>
              <span>
                <strong className="dizima-nomenclatura__termo dizima-nomenclatura__termo--n">Parte não periódica (N)</strong>
                {' — '}Algarismo ou grupo de algarismos que aparece logo após a vírgula e que não compõe o período.
              </span>
            </p>
          </div>



          <p className="mb-4 indent-6 font-bold">Dízimas periódicas simples</p>
          <p className="mb-4 indent-6">São chamadas de dízimas periódicas simples aquelas que não apresentam a parte não periódica (<strong>N</strong>).</p>

          <img src={capAsset('images/7_1.png')} alt="Dízima periódica simples" className="mx-auto my-4 block h-auto max-w-full" />

          <p className="mb-4 indent-6 font-bold">Dízimas periódicas compostas</p>
          <p className="mb-4 indent-6">São chamadas de dízimas periódicas compostas aquelas que apresentam a parte não periódica (<strong>N</strong>).</p>

          <img src={capAsset('images/7_2.png')} alt="Dízima periódica composta" className="mx-auto my-4 block h-auto max-w-full" />

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Fração geratriz de uma dízima periódica</h3>
          <p className="mb-4 indent-6">
            Toda dízima periódica é um número racional, pois pode ser escrita na forma de fração. Essa fração é chamada de <strong style={{ color: '#f37344' }}>geratriz da dízima periódica</strong>.
          </p>
          <p className="mb-4 indent-6">É possível obter a fração geratriz de uma dízima periódica simples utilizando os princípios da
            igualdade. Observe como se dá a aplicação desse processo a seguir.</p>
          <p className="mb-4 font-bold">Exemplos:</p>

          <p className="mb-4 indent-6">I. Determine a fração geratriz da dízima periódica simples 0,222…</p>
          <p className="mb-4 indent-6">Considerando x = 0,222… e multiplicando os dois membros dessa igualdade por 10, tem-se:</p>
          <p className="mb-4 text-center">10x = 2,222…</p>
          <p className="mb-4 indent-6">Subtraindo, membro a membro, os termos dessas igualdades, chega-se a:</p>
          <img src={capAsset('images/7_3.png')} alt="Dízima periódica simples" className="mx-auto my-4 block h-auto max-w-full" />


          <Pagination currentPage={8} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers
                  questions={[getQuestionById('ch1_q5'), getQuestionById('ch1_q6')]}
                />
              </div>
            }
          />

          <p className="mb-4 indent-6">
            II. Determine a fração geratriz da dízima periódica simples <Formula tex="0,\overline{103}" />.
          </p>
          <p className="mb-4 indent-6">Considerando x = 0,103103103…, observe que o período dessa dízima (103) possui três algarismos.</p>
          <p className="passo-numerado passo-numerado--azul">
            <span className="passo-numerado__numero">1.</span>
            <span>Inicialmente, multiplicam-se os dois membros da igualdade por 1000. Assim, tem-se:</span>
          </p>
          <p className="mb-4 text-center">1 000x = 103,103103103…</p>
          <p className="passo-numerado passo-numerado--verde">
            <span className="passo-numerado__numero">2.</span>
            <span>Subtraindo, membro a membro, os termos dessas igualdades, chega-se a:</span>
          </p>
          <img src={capAsset('images/8_1.png')} alt="Dízima periódica simples" className="mx-auto my-4 block h-auto max-w-full" />



          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <p className="organize-ideias__titulo">Regra prática</p>
            <p className="organize-ideias__texto">
              Portanto, para determinar a fração geratriz de uma dízima periódica simples (de parte inteira nula), escrevem-se, no numerador da fração, o período e, no denominador, um número formado por tantos noves quantos forem os algarismos do período.
            </p>
            <img src={capAsset('images/8_2.png')} alt="Dízima periódica simples" className="mx-auto my-4 block h-auto max-w-full" />
          </OrganizeAsIdeias>

          <AgoraEComVoce className="agora-e-com-voce--af" iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q5')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q6')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />

          </AgoraEComVoce>

          <Pagination currentPage={9} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers questions={getQuestionById('ch1_q7')} />
              </div>
            }
          />
          <p className="mb-4 indent-6">Para obter a fração geratriz de uma dízima periódica composta, também é possível utilizar os
            princípios da igualdade. Observe como se dá a aplicação desse processo a seguir.
          </p>
          <p className="mb-4 font-bold">Exemplo:</p>

          <p className="mb-4 indent-6">I. Determine a fração geratriz da dízima periódica composta 0,1434343…
            Essa dízima periódica apresenta uma parte decimal não periódica (<strong>1</strong>) e um
            período com dois algarismos (<strong style={{ color: '#860d51' }}>43</strong>).</p>

          <img src={capAsset('images/9_1.png')} alt="Dízima periódica composta" className="mx-auto my-4 block h-auto max-w-full" />

          <p className="passo-numerado passo-numerado--azul">
            <span className="passo-numerado__numero">1.</span>
            <span>Inicialmente, transforma-se a parte decimal não periódica em parte inteira. Para isso,
              multiplicam-se os dois membros da igualdade x = 0,1434343… por 10, obtendo-se:</span>
          </p>
          <p className="mb-4 text-center">10x = 1,434343…</p>
          <p className="passo-numerado passo-numerado--verde">
            <span className="passo-numerado__numero">2.</span>
            <span>Em seguida, multiplicam-se os dois membros da igualdade anterior por 100, obtendo-se:</span>
          </p>
          <p className="mb-4 text-center">1000x = 143,434343…</p>
          <p className="passo-numerado passo-numerado--rosa">
            <span className="passo-numerado__numero">3.</span>
            <span>Por fim, subtraindo, membro a membro, os termos dessas igualdades chega-se a:</span>
          </p>

          <img src={capAsset('images/9_2.png')} alt="Dízima periódica composta" className="mx-auto my-4 block h-auto max-w-full" />

          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <p className="organize-ideias__titulo">Regra prática</p>
            <p className="organize-ideias__texto">
              Para determinar a fração geratriz de uma dízima periódica composta (de parte inteira nula), escreve-se, no numerador da fração, o número formado pela parte decimal não periódica seguido do
              período, menos o número formado pela parte decimal não periódica. No denominador, escreve-se
              um número formado por tantos noves quantos forem os algarismos do período seguido de tantos
              zeros quantos forem os algarismos da parte decimal não periódica.
            </p>
            <img src={capAsset('images/9_3.png')} alt="Dízima periódica simples" className="mx-auto my-4 block h-auto max-w-full" />
          </OrganizeAsIdeias>

          <AgoraEComVoce className="agora-e-com-voce--af" iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q7')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />

          </AgoraEComVoce>

          <Pagination currentPage={10} expandToBookColumn />
          <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="agora-e-com-voce--af">
                  <TeacherAnswers
                    questions={[getQuestionById('ch1_q8'), getQuestionById('ch1_q9')]}
                  />
                </div>
              }
            />
          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Subconjuntos dos números racionais</h3>
          <p className="mb-4 indent-6">
            Além dos números naturais <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{N}" /></strong> e dos números inteiros <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Z}" /></strong>, também são subconjuntos especiais dos números racionais <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}" /></strong> os conjuntos dos:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>
              números racionais não nulos:{' '}
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}^{*}" /></span>
              <Formula tex="= \{ x \in" />
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}" /></span>
              <Formula tex="\mid x \neq 0 \}" />;
            </li>
            <li>
              números racionais não negativos:{' '}
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}_{+}" /></span>
              <Formula tex="= \{ x \in" />
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}" /></span>
              <Formula tex="\mid x \geq 0 \}" />;
            </li>
            <li>
              números racionais positivos:{' '}
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}_{+}^{*}" /></span>
              <Formula tex="= \{ x \in" />
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}" /></span>
              <Formula tex="\mid x > 0 \}" />;
            </li>
            <li>
              números racionais não positivos:{' '}
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}_{-}" /></span>
              <Formula tex="= \{ x \in" />
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}" /></span>
              <Formula tex="\mid x \leq 0 \}" />;
            </li>
            <li>
              números racionais negativos:{' '}
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}_{-}^{*}" /></span>
              <Formula tex="= \{ x \in" />
              <span className="conjunto-n-destaque"><Formula tex="\mathbb{Q}" /></span>
              <Formula tex="\mid x < 0 \}" />.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Representação dos números racionais em diagrama</h3>
          <p className="mb-4 indent-6">
            Os números racionais podem ser escritos na forma inteira, na forma decimal (decimal exato ou
            dízima periódica) ou na forma fracionária com numerador e denominador inteiros, sendo o denominador diferente de zero.
          </p>

          <p className="mb-4 indent-6">A representação desses números em diagrama permite visualizar as relações entre os conjuntos
            dos números naturais, dos números inteiros e dos números racionais. No diagrama a seguir, a região
            azul representa o conjunto dos números naturais <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{N}" /></strong>; as regiões azul e verde, juntas, representam
            o conjunto dos números inteiros <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Z}" /></strong>; e as regiões azul, verde e rosa, juntas, representam o conjunto
            dos números racionais <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}" /></strong>.</p>

          <AgoraEComVoce className="agora-e-com-voce--af" iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}>
          
            <QuestionRenderer
              question={getQuestionById('ch1_q8')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <AtividadeDiagramaRacionais
              value={typeof userAnswers.ch1_q8 === 'string' ? userAnswers.ch1_q8 : ''}
              onChange={(next) => handleAnswerChange('ch1_q8', next)}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q9')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={11} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q10'),
                    getQuestionById('ch1_q11'),
                    getQuestionById('ch1_q12'),
                  ]}
                />
              </div>
            }
          />

          <div className="agora-e-com-voce--af">
            <QuestionRenderer
              question={getQuestionById('ch1_q10')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </div>

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Representação dos números racionais na reta numérica</h2>
          <p className="mb-4 indent-6">
            Os números racionais podem ser representados em uma reta. Para isso, têm-se:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>um ponto O, denominado <strong style={{ color: '#f37338' }}>origem</strong>, associado ao número <strong style={{ color: '#f37338' }}>zero</strong>;</li>
            <li>um <strong style={{ color: '#f37338' }}>sentido positivo</strong>, indicado pela seta;</li>
            <li>uma <strong style={{ color: '#f37338' }}>unidade de medida</strong>.</li>
          </ul>

          <AgoraEComVoce className="agora-e-com-voce--af" iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q11')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <RetaAvenida
              images={{
                a: capAsset('images/page_10_img_164_543.png'),
                b: capAsset('images/page_10_img_241_542.png'),
                o: capAsset('images/page_10_img_279_540.png'),
                c: capAsset('images/page_10_img_329_543.png'),
                d: capAsset('images/page_10_img_420_542.png'),
              }}
              credit="Sapphire/Stock.adobe.com"
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q11')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hidePrompt
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q12')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <AtividadeRetaRacionais
              storageKey="SAS_AF8_C1_ch1_q12_reta"
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={12} expandToBookColumn />
          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers questions={[getQuestionById('ch1_q13')]} />
              </div>
            }
          />
          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Números quadrados perfeitos e raiz quadrada exata de um número</h2>
          <p className="mb-4 indent-6">
            Considere a sequência de números quadrados perfeitos: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, …</p>
          <p className="mb-4 indent-6"> Os <strong style={{ color: '#f37338' }}>números quadrados perfeitos</strong> (0 = 0²
            , 1 = 1²
            , 4 = 2²
            , 9 = 3²
            , 16 = 4²
            , 25 = 5²
            , ...) são números
            naturais que podem ser escritos como potência de expoente 2. Somente esses números têm como raiz
            quadrada um número natural. Assim, a raiz quadrada do quadrado perfeito a²
            é igual a <strong>a</strong>, em que a ∈ <strong 
            className="conjunto-n-destaque">
            <Formula tex="\mathbb{N}" /></strong>.</p>
            <p className="mb-4 indent-6">Calcula-se a raiz quadrada de um número quadrado perfeito decompondo-o em fatores primos
            para escrevê-lo na forma de potência de expoente 2.</p>

            <p className="mb-4 indent-6">Exemplos:</p>
            <div className="exemplos-raiz exemplos-raiz--linha mb-6">
              <p className="exemplos-raiz__item">
                <span className="question-letter">a) </span>
                <Formula tex="\sqrt{169} = \sqrt{13^{2}} = 13" />
              </p>
              <p className="exemplos-raiz__item">
                <span className="question-letter">b) </span>
                <Formula tex="\sqrt{65{,}61} = \sqrt{\dfrac{6561}{100}} = \dfrac{\sqrt{81^{2}}}{\sqrt{10^{2}}} = \dfrac{81}{10} = 8{,}1" />
              </p>
            </div>

            <p className="mb-4 indent-6">
              Pode-se ainda utilizar a regra prática de decomposição do quadrado perfeito em fatores primos
              distintos, que, obrigatoriamente, apresentarão apenas expoentes pares. A raiz quadrada será o
              produto desses fatores primos elevados, respectivamente, à metade de seus expoentes originais.
            </p>
            <p className="mb-4 indent-6">Exemplos:</p>
            <div className="exemplos-raiz exemplos-raiz--coluna mb-6">
              <p className="exemplos-raiz__item">
                <span className="question-letter">a) </span>
                <Formula tex="\sqrt[3]{91125} = \sqrt[3]{3^{6} \cdot 5^{3}} = 3^{6:3} \cdot 5^{3:3} = 3^{2} \cdot 5^{1} = 45" />
              </p>
              <p className="exemplos-raiz__item">
                <span className="question-letter">b) </span>
                <Formula tex="\sqrt{2916} = \sqrt{2^{2} \cdot 3^{6}} = \sqrt{(2^{1} \cdot 3^{3})^{2}} = \sqrt{54^{2}} = 54" />
              </p>
            </div>
  

          <AgoraEComVoce className="agora-e-com-voce--af" iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q13')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Raiz quadrada aproximada de um número positivo</h3>
          <p className="mb-4 indent-6">
          Quando um número não é quadrado perfeito, sua raiz quadrada não é um número natural, ou seja,
ele não tem raiz quadrada exata. Nesse caso, é possível calcular a raiz quadrada aproximada desse
número.
          </p>
          <p className="mb-4 indent-6">
            Observe, a seguir, como calcular a raiz quadrada aproximada do número 12, com uma
            casa decimal, ou seja, com aproximação até os décimos (aproximação menor que 0,1).
          </p>
          <p className="mb-4 indent-6 font-bold">Exemplo:</p>

          <p className="mb-4 indent-6">
            Para calcular <Formula tex="\sqrt{12}" />, note que 12 está entre 9 (<Formula tex="3^{2}" />) e 16 (
            <Formula tex="4^{2}" />
            ). Logo, sua raiz está entre 3 e 4. De modo mais específico, 12 está a 3 unidades de{' '}
            <Formula tex="3^{2}" /> e a 4 unidades de <Formula tex="4^{2}" />; logo, sua raiz está mais próxima da
            raiz de 3 do que da raiz de 4. Nesse caso, como as diferenças não são muito grandes entre si, pode-se
            concluir que ele está mais próximo de 3,5. Estima-se que a raiz de 12 é menor que 3,5, então calcula-se{' '}
            <Formula tex="3{,}4^{2} = 11{,}56" />. Como 11,56 é menor que 12, calcula-se{' '}
            <Formula tex="3{,}5^{2} = 12{,}25" />. Busca-se um número que esteja o mais próximo possível de 12, mas
            que não o ultrapasse; o correto, então, é usar <Formula tex="3{,}4^{2}" /> como aproximação para o 12.
            Desse modo, a raiz quadrada aproximada de 12, com uma casa decimal, é 3,4.
          </p>
     

          <Pagination currentPage={13} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q14'),
                    getQuestionById('ch1_q15'),
                    getQuestionById('ch1_q16'),
                  ]}
                />
              </div>
            }
          />

          <p className="mb-4 indent-6">
            Com base no exemplo analisado, observe, a seguir, o passo a passo para calcular a raiz aproximada de um número qualquer.
          </p>

          <div className="passos-estimativa">
            <article className="passo-box">
              <header className="passo-box__selo">
                <span className="passo-box__ord">1º</span>
                <span className="passo-box__nome">passo</span>
              </header>
              <div className="passo-box__corpo">
                <p>Determinam-se os números quadrados perfeitos mais próximos do número procurado.</p>
              </div>
            </article>
            <article className="passo-box">
              <header className="passo-box__selo">
                <span className="passo-box__ord">2º</span>
                <span className="passo-box__nome">passo</span>
              </header>
              <div className="passo-box__corpo">
                <p>Estima-se a posição do número de acordo com os quadrados.</p>
              </div>
            </article>
            <article className="passo-box">
              <header className="passo-box__selo">
                <span className="passo-box__ord">3º</span>
                <span className="passo-box__nome">passo</span>
              </header>
              <div className="passo-box__corpo">
                <p>Com base nessa estimativa, determina-se o valor do número ao quadrado.</p>
              </div>
            </article>
            <article className="passo-box">
              <header className="passo-box__selo">
                <span className="passo-box__ord">4º</span>
                <span className="passo-box__nome">passo</span>
              </header>
              <div className="passo-box__corpo">
                <p>Calcula-se outro número ao quadrado, obedecendo ao seguinte raciocínio:</p>
                <ul>
                  <li>Se o resultado obtido for menor que o número dado, calcula-se uma casa decimal acima;</li>
                  <li>Se o resultado obtido for maior que o número dado, calcula-se uma casa decimal abaixo.</li>
                </ul>
              </div>
            </article>
          </div>

         

          <AgoraEComVoce className="agora-e-com-voce--af" iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q14')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q15')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q16')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={14} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <TeacherAnswers questions={[getQuestionById('ch1_q17')]} />
            }
          />

          <QuestionRenderer
            question={getQuestionById('ch1_q17')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h2 style={{ color: '#2446a6' }} className="text-2xl font-bold mb-4 mt-6">Números irracionais</h2>
          <p className="mb-4 indent-6">
            Na atividade anterior, as raízes apresentam uma parte decimal infinita e não periódica. Números com
            essas características não podem ser escritos na forma de fração na qual o numerador é um número
            inteiro e o denominador é um inteiro diferente de zero. Esse tipo de número não é racional; na
            matemática, eles formam o <strong style={{ color: '#f37339' }}>conjunto dos números irracionais</strong>{' '}
            representado pelo símbolo{' '}
            <strong className="conjunto-n-destaque">
              <Formula tex="\mathbb{Q}'" />
            </strong>
            . Exemplos: 0,1234567891011… e 1,01002000300004000005…
          </p>
          <p className="caixa-definicao-irracional mb-6">
            <strong>Número irracional</strong> é todo número cuja representação decimal é infinita e não periódica.
          </p>

          <ParaIrAlem iconSrc={capAsset('images/selo-para-ir-alem.png')}>
            <p className="mb-4">
            As raízes que apresentam uma parte decimal infinita e não periódica não são os únicos números
irracionais que existem. Um número irracional muito conhecido é o número π (lê-se: pi), que relaciona
o comprimento e o diâmetro de uma circunferência. 
            </p>
            <p className="mb-4 indent-6">
              Nas imagens a seguir, observam-se uma <em>pizza</em> vista de cima e sua projeção horizontal.
            </p>

            <figure className="foto-com-credito foto-com-credito--lg">
              <img
                src={capAsset('images/12_1.png')}
                alt="Pizza vista de cima e sua projeção horizontal"
              />
              <figcaption>Shutterstock</figcaption>
            </figure>

            <p className="mb-4">
              Na projeção da <em>pizza</em>, O é o <strong>centro</strong> da circunferência, o segmento{' '}
              <Formula tex="\overline{AB}" /> é um <strong>diâmetro</strong>, e os segmentos{' '}
              <Formula tex="\overline{OA}" /> e <Formula tex="\overline{OB}" /> são <strong>raios</strong> dessa
              circunferência.
            </p>
            <p className="mb-4">
              A medida do diâmetro (<strong>d</strong>) de uma circunferência equivale a duas vezes a medida do
              raio (<strong>r</strong>), ou seja, é dada pela razão <strong>d = 2r</strong>. O número{' '}
              <Formula tex="\pi" /> (pi) é o resultado da divisão da medida do comprimento <strong>C</strong> de
              uma circunferência pela medida do seu respectivo diâmetro <strong>d</strong>, ou seja,{' '}
              <Formula tex="\pi = \dfrac{C}{d}" />.
            </p>
            <p className="mb-4">
              O número <Formula tex="\pi" /> é irracional, pois sua representação decimal é infinita e não
              periódica.
            </p>
            <p className="caixa-pi mb-4">
              <Formula tex="\pi = 3{,}14159265\ldots" />
            </p>
            <p className="mb-4">
              Sendo o número <Formula tex="\pi" /> irracional, os cálculos com ele não são exatos, mas, sim,
              aproximados.
            </p>
          </ParaIrAlem>

          <Pagination currentPage={15} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <TeacherAnswers
                questions={[getQuestionById('ch1_q18'), getQuestionById('ch1_q19')]}
              />
            }
          />

          <h2 style={{ color: '#2446a6' }} className="text-2xl font-bold text-orange-500 mb-4 mt-6">Números reais</h2>
          <p className="mb-4 indent-6">
            A junção dos números racionais com os números irracionais resulta em um novo conjunto numérico chamado <strong style={{ color: '#f37339' }}>conjunto dos números reais</strong>, representado pelo símbolo <strong className="conjunto-n-destaque"><Formula tex="\mathbb{R}" /></strong>.
          </p>

          <h3 style={{ color: '#f8a04d' }} className="text-xl font-bold mb-4 mt-6">Representação dos números reais em diagrama</h3>

          <p className="mb-4 indent-6">
            A representação dos números reais em diagrama permite a visualização das seguintes relações entre
            os conjuntos numéricos estudados.
          </p>



          <AtividadeDiagramaReais
            value={typeof userAnswers.ch1_q18 === 'string' ? userAnswers.ch1_q18 : ''}
            onChange={(next) => handleAnswerChange('ch1_q18', next)}
            showResults={showTeacherView}
          >
            <DiagramaReaisFigura />

            <DialogarEConhecer iconSrc={capAsset('images/selo-dialogar-conhecer.png')}>
              <QuestionRenderer
                question={getQuestionById('ch1_q18')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hideInput
              />
              <DiagramaReaisBanco />
              <QuestionRenderer
                question={getQuestionById('ch1_q19')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
            </DialogarEConhecer>
          </AtividadeDiagramaReais>

          <Pagination currentPage={16} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q19a'),
                    getQuestionById('ch1_q19b'),
                  ]}
                />
                
              </div>
            }
          />

          <h3 style={{ color: '#f8a04d' }} className="text-xl font-bold mb-4 mt-6">Representação dos números reais na reta numérica</h3>

          <p className="mb-4 indent-6">
          O conjunto dos números reais pode ser associado ao conjunto dos pontos de uma reta,
denominada <strong style={{ color: '#f37339' }}>reta real</strong>. Ela estabelece uma correspondência um a um entre os pontos da reta e
os números reais.
          </p>

         

          <AgoraEComVoce className="agora-e-com-voce--af" iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q19a')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <AtividadeRetaReais
              storageKey="SAS_AF8_C1_ch1_q19a_reta"
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q19a')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hidePrompt
            />

            <QuestionRenderer
              question={getQuestionById('ch1_q19b')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q19b')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hidePrompt
            />
            <AtividadeRetaIrracionais
              storageKey="SAS_AF8_C1_ch1_q19b_reta"
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={17} expandToBookColumn />

          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers
                  questions={[getQuestionById('ch1_q20'), getQuestionById('ch1_q21')]}
                />
              </div>
            }
          />


          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Potenciação</h2>

          <p className="mb-4 indent-6">Considere a seguinte situação.</p>
          <p className="mb-4 indent-6">No treinamento para a maratona que será disputada entre os colégios de seu estado, Mateus percorreu 2 km no primeiro dia e, a partir disso, decidiu percorrer o dobro da distância alcançada no dia
          anterior durante 5 dias de treinamento.</p>
          <p className="mb-4 indent-6">
          Se Mateus conseguir atingir sua meta, quantos quilômetros correrá no quinto dia de
treinamento? Na situação descrita, para calcular a distância que Mateus deverá percorrer no
quinto dia de treinamento, é necessário multiplicar o número 2 por ele mesmo 5 vezes. Ou seja:
          </p>

          <img src={capAsset('images/17_1.png')} alt="" className="mx-auto my-4 block h-auto max-w-full" />

          <p className="mb-4 indent-6">Podemos representar multiplicações de fatores iguais de modo mais simples usando a operação
          matemática denominada <strong style={{ color: '#f37339' }}>potenciação</strong>. </p>

          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <div className="organize-com-nota">
              <div className="organize-com-nota__conteudo">
                <p className="mb-4 indent-6">
                  A <strong>potenciação</strong> é a operação que indica uma multiplicação de fatores iguais.
                </p>
                <p className="mb-2">2 · 2 · 2 · 2 · 2 = 2<sup>5</sup> = 32</p>
                <p className="mb-4 indent-6">Relembre os nomes dos termos da potenciação.</p>
                <img
                  src={capAsset('images/17_2.png')}
                  alt=""
                  className="mx-auto my-4 block h-auto max-w-full"
                />

                <p className="mb-4 indent-6">
                  De modo geral, sendo <strong>x</strong> um número real qualquer e <strong>n</strong> um
                  número natural não nulo, tem-se:
                </p>

                <img
                  src={capAsset('images/17_3.png')}
                  alt=""
                  className="mx-auto my-4 block h-auto max-w-full"
                />
              </div>

              <CaixaNota iconSrc={capAsset('images/selo-nota.png')}>
                <ul className="caixa-nota__lista">
                  <li>Toda potência de base positiva é positiva.</li>
                  <li>
                    A potência de base negativa será
                    <ul className="caixa-nota__sublista">
                      <li>positiva, se o expoente for par;</li>
                      <li>negativa, se o expoente for ímpar.</li>
                    </ul>
                  </li>
                </ul>
              </CaixaNota>
            </div>
          </OrganizeAsIdeias>

       
          <AgoraEComVoce
            className="agora-e-com-voce--af"
            iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}
          >
            <QuestionRenderer
              question={getQuestionById('ch1_q20')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q21')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={18} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Propriedades da potenciação</h2>
          <p className="mb-4 indent-6">
            <strong>I. Multiplicação de potências de mesma base:</strong>
          </p>
          <p className="mb-4 indent-6">
            Para multiplicar potências de mesma base, conserva-se a base e somam-se os expoentes.
          </p>

          <div
            className="formula-caixa-amarela"
            role="img"
            aria-label="a elevado a m vezes a elevado a n é igual a a elevado a m mais n, em que a pertence aos reais"
          >
            <Formula tex="a^{m} \cdot a^{n} = a^{m + n},\ \text{em que}\ \mathbf{a} \in \mathbf{\mathbb{R}}" />
          </div>

          <p className="mb-4 indent-6">Exemplo:</p>
          <img src={capAsset('images/18_1.png')} alt="" className="mx-auto my-4 block h-auto max-w-full" />

          <p className="mb-4 indent-6">
            <strong>II. Divisão de potências de mesma base:</strong>
          </p>
          <p className="mb-4 indent-6">
            Para dividir potências de mesma base, sendo esta diferente de zero, conserva-se a base e
            subtraem-se os expoentes.
          </p>

          <div
            className="formula-caixa-amarela"
            role="img"
            aria-label="a elevado a m dividido por a elevado a n é igual a a elevado a m menos n, em que a pertence aos reais não nulos"
          >
            <Formula tex="a^{m} : a^{n} = a^{m - n}\ \text{ou}\ \dfrac{a^{m}}{a^{n}} = a^{m - n},\ \text{em que}\ \mathbf{a} \in \mathbf{\mathbb{R}}^{*}" />
          </div>

          <p className="mb-4 indent-6">Exemplo:</p>
          <img src={capAsset('images/18_2.png')} alt="" className="mx-auto my-4 block h-auto max-w-full" />

          <div className="organize-com-nota">
            <div className="organize-com-nota__conteudo">
              <p className="mb-4 indent-6">
                <strong>III. Potência de potência:</strong>
              </p>
              <p className="mb-4 indent-6">
                Para calcular uma potência de potência, conserva-se a base e multiplicam-se os expoentes.
              </p>

              <div
                className="formula-caixa-amarela"
                role="img"
                aria-label="abre parênteses a elevado a m fecha parênteses elevado a n é igual a a elevado a m vezes n, em que a pertence aos reais"
              >
                <Formula tex="(a^{m})^{n} = a^{m \cdot n},\ \text{em que}\ \mathbf{a} \in \mathbf{\mathbb{R}}" />
              </div>
            </div>

            <CaixaNota iconSrc={capAsset('images/selo-nota.png')}>
              <p>
                Note que <Formula tex="(2^{4})^{3} \neq 2^{4^{3}}" />:
              </p>
              <p>
                <Formula tex="(2^{4})^{3} = 2^{4 \cdot 3} = 2^{12}" />
              </p>
              <p>
                <Formula tex="2^{4^{3}} = 2^{4 \cdot 4 \cdot 4} = 2^{64}" />
              </p>
            </CaixaNota>
          </div>

          <p className="mb-4 indent-6">
            Exemplo: (2<sup>4</sup>)<sup>3</sup> = (2<sup>4</sup>) · (2<sup>4</sup>) · (2<sup>4</sup>) = 2
            <sup>4 + 4 + 4</sup> → (2<sup>4</sup>)<sup>3</sup> = 2<sup>3 · 4</sup> = 2<sup>12</sup>
          </p>

          <p className="mb-4 indent-6">
            <strong>IV. Propriedade distributiva da potenciação em relação à multiplicação:</strong>
          </p>
          <p className="mb-4 indent-6">
            A potência de um produto de dois ou mais números pode ser obtida elevando-se cada fator ao
            expoente indicado.
          </p>

          <div
            className="formula-caixa-amarela"
            role="img"
            aria-label="abre parênteses a vezes b fecha parênteses elevado a n é igual a a elevado a n vezes b elevado a n, em que a e b pertencem aos reais"
          >
            <Formula tex="(a \cdot b)^{n} = a^{n} \cdot b^{n},\ \text{em que}\ \mathbf{a}\ \text{e}\ \mathbf{b} \in \mathbf{\mathbb{R}}" />
          </div>

          <p className="mb-4 indent-6">
            Exemplo: (5 · 3 · 2)<sup>2</sup> = 5<sup>2</sup> · 3<sup>2</sup> · 2<sup>2</sup>
          </p>

          <p className="mb-4 indent-6">
            <strong>V. Propriedade distributiva da potenciação em relação à divisão:</strong>
          </p>
          <p className="mb-4 indent-6">
            A potência de um quociente de dois números pode ser obtida elevando-se cada número ao
            expoente indicado.
          </p>

          <div
            className="formula-caixa-amarela"
            role="img"
            aria-label="abre parênteses a dividido por b fecha parênteses elevado a n é igual a a elevado a n sobre b elevado a n, em que a e b pertencem aos reais não nulos"
          >
            <Formula tex="(a : b)^{n} = a^{n} : b^{n}\ \text{ou}\ \left(\dfrac{a}{b}\right)^{n} = \dfrac{a^{n}}{b^{n}},\ \text{em que}\ \mathbf{a}\ \text{e}\ \mathbf{b} \in \mathbf{\mathbb{R}}^{*}" />
          </div>

          <p className="mb-4 indent-6">
            Exemplo: (9 : 3)<sup>2</sup> = 9<sup>2</sup> : 3<sup>2</sup>
          </p>

          <Pagination currentPage={19} expandToBookColumn />


          <TeacherButton
            visible={SHOW_TEACHER_BUTTON}
            content={
              <div className="agora-e-com-voce--af">
                <TeacherAnswers
                  questions={[getQuestionById('ch1_q22'), getQuestionById('ch1_q23')]}
                />
              </div>
            }
          />

          <h2  style={{ color: '#24459d' }} className="text-2xl font-bold text-orange-500 mb-4 mt-6">Potências com expoente inteiro negativo</h2>
          <p className="mb-4 indent-6">
            Observe a seguinte divisão de potências de mesma base. 
          </p>

          <p className="mb-4 text-center formula-linha-completa">
            <Formula tex="2^{4} : 2^{9} = \dfrac{2^{4}}{2^{9}} = \dfrac{2 \cdot 2 \cdot 2 \cdot 2}{2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2} = \dfrac{1}{2^{5}}" />
          </p>

          <p className="mb-4 indent-6">
            Essa mesma divisão pode ser resolvida por meio da propriedade da divisão de potências de
            mesma base da seguinte forma:
          </p>

          <p className="mb-4 text-center">
            <Formula tex="2^{4} : 2^{9} = 2^{4 - 9} = 2^{-5}" />
          </p>

          <p className="mb-4 indent-6">
            Comparando os dois resultados, verifica-se que{' '}
            <Formula tex="2^{-5} = \dfrac{1}{2^{5}}" />.
          </p>

          <p className="mb-4 indent-6">
            Observe agora o cálculo de uma potência de expoente inteiro negativo e base fracionária.
          </p>

          <p className="mb-4 text-center formula-linha-completa">
            <Formula tex="\left(\dfrac{5}{6}\right)^{-1} = \dfrac{1}{\left(\dfrac{5}{6}\right)^{1}} = \dfrac{1}{\dfrac{5}{6}} = \dfrac{6}{5} \rightarrow \left(\dfrac{5}{6}\right)^{-1} = \left(\dfrac{6}{5}\right)^{1} = \dfrac{6}{5}" />
          </p>

          <p className="mb-4 indent-6">
            Generalizando esses exemplos, têm-se as seguintes relações:
          </p>

          <div className="formulas-expoente">
            <div className="formulas-expoente__caixa">
              <Formula tex="a^{-n} = \dfrac{1}{a^{n}},\ \text{em que}\ \mathbf{a} \neq 0" />
            </div>
            <div className="formulas-expoente__caixa">
              <Formula tex="\left(\dfrac{a}{b}\right)^{-n} = \left(\dfrac{b}{a}\right)^{n},\ \text{em que}\ \mathbf{a} \cdot \mathbf{b} \neq 0" />
            </div>
          </div>

          <p className="mb-4 indent-6">Veja outros exemplos:</p>
          <div className="exemplos-raiz exemplos-raiz--linha mb-6">
            <p className="exemplos-raiz__item">
              <span aria-hidden>•</span>
              <Formula tex="(-3)^{-1} = \dfrac{1}{(-3)^{1}} = \dfrac{1}{-3} = -\dfrac{1}{3}" />
            </p>
            <p className="exemplos-raiz__item">
              <span aria-hidden>•</span>
              <Formula tex="(-0{,}7)^{-3} = \left(-\dfrac{7}{10}\right)^{-3} = \left(-\dfrac{10}{7}\right)^{3} = -\dfrac{1000}{343}" />
            </p>
          </div>


          <AgoraEComVoce
            className="agora-e-com-voce--af"
            iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}
          >
            <QuestionRenderer
              question={getQuestionById('ch1_q22')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q23')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={20} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="agora-e-com-voce--af">
                  <TeacherAnswers questions={getQuestionById('ch1_q24')} />
                </div>
              }
            />
          </div>


          <h2 style={{ color: '#24459d' }} className="text-2xl font-bold mb-4 mt-6">Notação científica</h2>
          <p className="mb-4 indent-6">
            Os números expressos em notação científica são escritos como um produto de dois números reais, sendo um deles um número entre 1 e 10 e o outro, uma potência de base 10 com expoente inteiro. Essa notação geralmente é utilizada para representar números com muitos algarismos, como distâncias em anos-luz, massas de partículas atômicas, entre outros.
          </p>
          <p className="mb-4 indent-6 font-bold">Exemplos:</p>
          <ul className="notacao-exemplos">
            <li>
              <p>
                1 ano-luz corresponde, aproximadamente, a 9&nbsp;460&nbsp;000&nbsp;000&nbsp;000 km. Por
                exemplo, 10 bilhões de anos-luz correspondem, aproximadamente, a:
              </p>
              <div className="notacao-exemplos__calculo">
                <p>
                  10&nbsp;000&nbsp;000&nbsp;000 · 9&nbsp;460&nbsp;000&nbsp;000&nbsp;000 km =
                  94&nbsp;600&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000 km e
                </p>
                <p>
                  94&nbsp;600&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000&nbsp;000 km ={' '}
                  <span className="notacao-partes">
                    <span className="notacao-parte">
                      <span className="notacao-parte__valor">9,46</span>
                      <span className="notacao-parte__legenda">Número entre 1 e 10</span>
                    </span>
                    <span className="notacao-partes__vezes">·</span>
                    <span className="notacao-parte">
                      <span className="notacao-parte__valor">
                        10<sup>22</sup>
                      </span>
                      <span className="notacao-parte__legenda">Potência de 10</span>
                    </span>
                  </span>{' '}
                  km
                </p>
              </div>
            </li>
            <li>
              <p>
                A massa do próton é, aproximadamente, 0,00000000000000000000000000167 kg ou ={' '}
                <span className="notacao-partes">
                  <span className="notacao-parte">
                    <span className="notacao-parte__valor">1,67</span>
                    <span className="notacao-parte__legenda">Número entre 1 e 10</span>
                  </span>
                  <span className="notacao-partes__vezes">·</span>
                  <span className="notacao-parte">
                    <span className="notacao-parte__valor">
                      10<sup>−27</sup>
                    </span>
                    <span className="notacao-parte__legenda">Potência de 10</span>
                  </span>
                </span>{' '}
                kg.
              </p>
            </li>
          </ul>

       
          <AgoraEComVoce
            className="agora-e-com-voce--af"
            iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}
          >
            <AtividadeSublinharProvider storageKey="sas-af8-mat-c1-sublinhar-galaxias">
              <QuestionRenderer
                question={getQuestionById('ch1_q24')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hideInput
              />

              <AtividadeSublinharArea>
                <article className="caixa-galaxias" aria-label="Texto Galáxias">
                  <figure className="caixa-galaxias__figura">
                    <div className="caixa-galaxias__foto">
                      <img
                        src={capAsset('images/page_19_img_338_372.png')}
                        alt="Esboço artístico que ilustra a Via Láctea"
                      />
                      <span className="caixa-galaxias__credito">R. Hurt/NASA/JPL-Caltech</span>
                    </div>
                    <p className="legenda-barra">Esboço artístico que ilustra a Via Láctea.</p>
                  </figure>

                  <p>
                    <strong>
                      <TextoInterativo idPrefix="gal-titulo" texto="Galáxias" />
                    </strong>{' '}
                    <TextoInterativo
                      idPrefix="gal-p1"
                      texto="são agrupamentos de estrelas, planetas, nebulosas e poeira cósmica unidos pela força da gravidade. Calcula-se que existam por volta de 100 bilhões de galáxias no Universo, cada uma, por sua vez, com bilhões de estrelas. Aproximadamente 1 milhão delas estão catalogadas, sendo classificadas como espirais, elípticas ou irregulares, de acordo com o seu formato. As mais distantes já identificadas pelos astrônomos estão a 13 bilhões de anos-luz (AL) da Terra."
                    />
                  </p>
                  <p>
                    <TextoInterativo
                      idPrefix="gal-p2a"
                      texto="A galáxia em que vivemos, a"
                    />{' '}
                    <strong>
                      <TextoInterativo idPrefix="gal-via" texto="Via Láctea" />
                    </strong>
                    <TextoInterativo
                      idPrefix="gal-p2b"
                      texto=", foi identificada pelo grego Demócrito (450 a.C.). Ela tem a forma de uma espiral achatada com cerca de 100 mil AL de diâmetro e 200 bilhões de estrelas. Junto com algumas dezenas de outras galáxias, com as quais viaja junto pelo cosmo, a Via Láctea faz parte do Grupo Local. Ela é a segunda maior desse grupo, só ficando atrás de Andrômeda, que tem 1 trilhão de estrelas."
                    />
                  </p>

                  <p className="caixa-galaxias__fonte">
                    ALMANAQUE Abril 2015. São Paulo: Abril, 2015. p. 171.
                  </p>
                </article>
              </AtividadeSublinharArea>
              <div className="caixa-hipotese caixa-atividade-leitura my-4">
                <div className="caixa-atividade-leitura__corpo">
                  <BotaoModoSublinhar />
                </div>
              </div>

              <QuestionRenderer
                question={getQuestionById('ch1_q24')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hidePrompt
              />
            </AtividadeSublinharProvider>
          </AgoraEComVoce>

          <Pagination currentPage={21} expandToBookColumn />

          <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="agora-e-com-voce--af">
                  <TeacherAnswers
                    questions={[getQuestionById('ch1_q25'), getQuestionById('ch1_q26')]}
                  />
                  <p className="mb-2 mt-4">O seguinte cálculo deve ser realizado:</p>
                  <p className="resposta-professor">
                    <Formula tex="x^{2} = 225 \rightarrow x = \sqrt{225} = 15\ \text{cm}" />
                  </p>
                </div>
              }
            />

          <div className="agora-e-com-voce--af">
            <QuestionRenderer
              question={getQuestionById('ch1_q25')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q26')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </div>

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Radiciação</h2>
          <p className="mb-4 indent-6">
            Anteriormente, você estudou como calcular raízes exatas e aproximadas de números racionais
            não negativos. Que tal aprofundar mais seus conhecimentos sobre radiciação?
          </p>

          <h3 style={{ color: '#24459d' }} className="text-xl font-bold mb-4 mt-6">
            Cálculo da medida do lado de um quadrado
          </h3>

          <div className="secao-lado-quadrado">
            <div className="secao-lado-quadrado__texto">
              <p className="mb-4 indent-6">
                Para determinar a área de um quadrado, basta elevar ao quadrado a medida do seu lado.
                Assim, a área de um quadrado cujo lado mede <strong>x</strong> pode ser expressa por{' '}
                <Formula tex="A = x^{2}" />.
              </p>
              <p className="mb-4 indent-6">
                Suponha que a área de um azulejo quadrado seja igual a 225 cm². Você consegue pensar em
                uma forma de calcular a medida do lado desse azulejo? Utilize o espaço a seguir para
                registrar seu raciocínio.
              </p>
            </div>
            <img
              src={capAsset('images/21_1.png')}
              alt="Quadrado de lado x"
              className="secao-lado-quadrado__figura"
            />
          </div>

          <div className="area-raciocinio-rosa mb-6">
            <AutoExpandTextarea
              value={typeof userAnswers.ch1_lado_azulejo === 'string' ? userAnswers.ch1_lado_azulejo : ''}
              onChange={(next) => handleAnswerChange('ch1_lado_azulejo', next)}
              rows={5}
              aria-label="Registre o cálculo da medida do lado do azulejo"
              placeholder=""
              className="area-raciocinio-rosa__campo"
            />
            {showTeacherView ? (
              <div className="area-raciocinio-rosa__resposta resposta-professor">
                <p>O seguinte cálculo deve ser realizado:</p>
                <p>
                  <Formula tex="x^{2} = 225 \rightarrow x = \sqrt{225} = 15\ \text{cm}" />
                </p>
              </div>
            ) : null}
          </div>

          <p className="mb-4 indent-6">
            Clara resolveu esse problema da seguinte maneira:
          </p>

          <aside className="bloco-clara" aria-label="Resolução de Clara">
            <p className="mb-4">
              Para calcular a medida do lado de um quadrado cuja área é 225 cm², basta pensar em um
              número positivo que, elevado ao quadrado, tenha como resultado 225, ou seja,{' '}
              <Formula tex="x^{2} = 225" />. Para determinar esse número, é possível usar a operação
              inversa da potenciação, a radiciação. Então, basta calcular:
            </p>
            <p className="bloco-clara__formula mb-0">
              <Formula tex="x = \sqrt{225\ \text{cm}^{2}}" />
            </p>
          </aside>

          <Pagination currentPage={22} expandToBookColumn />

          <p className="mb-4 indent-6">
            Em sua opinião, o raciocínio de Clara está correto? Calcule o valor da expressão{' '}
            <Formula tex="x = \sqrt{225\ \text{cm}^{2}}" /> e compare-o com o resultado que você
            encontrou. Aproveite o momento também para comparar o seu resultado com o de alguns
            colegas.
          </p>

          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <p className="organize-ideias__texto mb-4">
              A potenciação e a radiciação são operações inversas. Veja, a seguir, os nomes dos termos
              dessas operações.
            </p>
            <img
              src={capAsset('images/22_1.png')}
              alt="Termos da potenciação e da radiciação"
              className="mb-4 mx-auto block h-auto max-w-full"
            />
          </OrganizeAsIdeias>

          <Observacao iconSrc={capAsset('images/selo-observacao.png')}>
            <ul className="observacao__lista">
              <li>
                Na representação da raiz quadrada, é possível omitir o índice 2. Assim,{' '}
                <span className="raiz-indice">2</span>√81 equivale a √81.
              </li>
              <li>
                Embora (−9)<sup>2</sup> seja igual a 81, o valor de √81 será apenas 9, pois o
                resultado de uma operação deve ser único. Convencionou-se, então, que a raiz
                quadrada de um número real não negativo é igual ao módulo do número que, elevado ao
                quadrado, é igual ao radicando.
              </li>
            </ul>
          </Observacao>

          <h2 style={{ color: '#24459d' }} className="text-2xl font-bold mb-4 mt-6">
            Existência de raízes reais
          </h2>
          <p className="mb-4 indent-6">
            Toda expressão do tipo <Formula tex="\sqrt[n]{a}" /> representa a raiz enésima do número
            real <strong>a</strong>, sendo <strong>n</strong> um número natural maior que 1.
          </p>
          <p className="mb-4 indent-6">
            Para verificar a existência de uma raiz real, é preciso analisar o sinal do radicando e o
            índice do radical, que pode ser par ou ímpar.
          </p>

          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <ul className="organize-ideias__lista">
              <li>
                <p>
                  No conjunto real (
                  <strong className="conjunto-n-destaque">
                    <Formula tex="\mathbb{R}" />
                  </strong>
                  ), só existe raiz de índice par (raiz quadrada, quarta, sexta etc.) se o radicando
                  for positivo ou zero. Isto é, em{' '}
                  <strong className="conjunto-n-destaque">
                    <Formula tex="\mathbb{R}" />
                  </strong>
                  , não existem raízes de índice par para radicandos negativos.
                </p>
                <p className="organize-ideias__exemplos-titulo">Exemplos:</p>
                <p className="organize-ideias__exemplo">
                  <Formula tex="\sqrt{49} \in" />{' '}
                  <strong className="conjunto-n-destaque">
                    <Formula tex="\mathbb{R}" />
                  </strong>{' '}
                  e é igual a 7, pois <Formula tex="7^{2} = 49" />.
                </p>
                <p className="organize-ideias__exemplo">
                  <Formula tex="\sqrt{-49} \notin" />{' '}
                  <strong className="conjunto-n-destaque">
                    <Formula tex="\mathbb{R}" />
                  </strong>
                  , pois não existe um número real que, elevado ao quadrado, resulte em −49.
                </p>
              </li>
              <li>
                <p>
                  No conjunto real (
                  <strong className="conjunto-n-destaque">
                    <Formula tex="\mathbb{R}" />
                  </strong>
                  ), sempre existe raiz de índice ímpar (raiz cúbica, quinta, sétima etc.),
                  independentemente de o radicando ser negativo ou positivo.
                </p>
                <p className="organize-ideias__exemplos-titulo">Exemplos:</p>
                <p className="organize-ideias__exemplo">
                  <Formula tex="\sqrt[3]{125} \in" />{' '}
                  <strong className="conjunto-n-destaque">
                    <Formula tex="\mathbb{R}" />
                  </strong>{' '}
                  e é igual a 5, pois <Formula tex="5^{3} = 125" />.
                </p>
                <p className="organize-ideias__exemplo">
                  <Formula tex="\sqrt[3]{-125} \in" />{' '}
                  <strong className="conjunto-n-destaque">
                    <Formula tex="\mathbb{R}" />
                  </strong>{' '}
                  e é igual a −5, pois <Formula tex="(-5)^{3} = -125" />.
                </p>
              </li>
            </ul>
          </OrganizeAsIdeias>

          <Pagination currentPage={23} expandToBookColumn />


          <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="agora-e-com-voce--af">
                  <TeacherAnswers
                    questions={[
                      getQuestionById('ch1_q27'),
                      getQuestionById('ch1_q28'),
                      getQuestionById('ch1_q29'),
                    ]}
                  />
                </div>
              }
            />

          <AgoraEComVoce
            className="agora-e-com-voce--af"
            iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}
          >
            <QuestionRenderer
              question={getQuestionById('ch1_q27')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />

            <div className="mb-6">
              <QuestionRenderer
                question={getQuestionById('ch1_q28')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hideInput
              />
              <div className="exemplos-inversas-raiz mb-4">
                <div className="caixa-exemplo-dizima">
                  √36 = 6 ↔ 6<sup>2</sup> = 36
                </div>
                <div className="caixa-exemplo-dizima">
                  <span className="raiz-indice">3</span>√−64 = −4 ↔ (−4)<sup>3</sup> = −64
                </div>
              </div>
              <p className="mb-4">
                Verifique se é possível calcular as seguintes raízes. Não se esqueça de apresentar seus
                argumentos.
              </p>
              <QuestionRenderer
                question={getQuestionById('ch1_q28')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hidePrompt
              />
            </div>

            <QuestionRenderer
              question={getQuestionById('ch1_q29')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <h2 style={{ color: '#24459d' }} className="text-xl font-bold text-blue-600 mb-4 mt-6">Potência com expoente fracionário</h2>
          <p className="mb-4 indent-6">
            É possível calcular raízes exatas de um número efetuando a fatoração completa do radicando e dividindo o índice e o expoente dos fatores do radicando por um mesmo número diferente de zero.
          </p>
          <p className="mb-4">Exemplos:</p>

          <ul className="list-disc ml-6 mb-6 exemplos-pot-frac">
            <li>
              <div className="exemplos-pot-frac__linha">
                <span className="exemplos-pot-frac__calc">
                  <Formula tex="\sqrt{81} = \sqrt[2]{3^{4}} = \sqrt[2:2]{3^{4:2}} = 3^{2} = 9" />
                </span>
                <span className="exemplos-pot-frac__seta" aria-hidden>
                  →
                </span>
                <span className="exemplos-pot-frac__texto">
                  Como 2 é igual a <Formula tex="\dfrac{4}{2}" />, tem-se que{' '}
                  <Formula tex="3^{2} = 3^{\frac{4}{2}}" />. Assim, é válida a igualdade{' '}
                  <Formula tex="\sqrt[2]{3^{4}} = 3^{\frac{4}{2}}" />.
                </span>
              </div>
            </li>
            <li>
              <div className="exemplos-pot-frac__linha">
                <span className="exemplos-pot-frac__calc">
                  <Formula tex="\sqrt[3]{512} = \sqrt[3]{2^{9}} = \sqrt[3:3]{2^{9:3}} = 2^{3} = 8" />
                </span>
                <span className="exemplos-pot-frac__seta" aria-hidden>
                  →
                </span>
                <span className="exemplos-pot-frac__texto">
                  Como 3 é igual a <Formula tex="\dfrac{9}{3}" />, tem-se que{' '}
                  <Formula tex="2^{3} = 2^{\frac{9}{3}}" />. Assim, é válida a igualdade{' '}
                  <Formula tex="\sqrt[3]{2^{9}} = 2^{\frac{9}{3}}" />.
                </span>
              </div>
            </li>
          </ul>

          <Pagination currentPage={24} expandToBookColumn />

          <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="agora-e-com-voce--af">
                  <TeacherAnswers
                    questions={[
                      getQuestionById('ch1_q30'),
                      getQuestionById('ch1_q31'),
                      getQuestionById('ch1_q32'),
                    ]}
                  />
                </div>
              }
            />

    <p className="mb-4 indent-6">No caso de raízes não exatas, é possível proceder de forma semelhante, obtendo-se potências
    com expoentes fracionários. São válidas as igualdades a seguir.</p>

          <ul className="list-disc ml-6 mb-6 exemplos-pot-frac">
            <li>
              <div className="exemplos-pot-frac__linha">
                <span className="exemplos-pot-frac__calc">
                  <Formula tex="\sqrt{5} = \sqrt[2]{5^{1}} = \sqrt[2:2]{5^{1:2}} = 5^{\frac{1}{2}}" />
                </span>
                <span className="exemplos-pot-frac__seta" aria-hidden>
                  →
                </span>
                <span className="exemplos-pot-frac__texto">
                  <Formula tex="\sqrt[2]{5^{1}} = 5^{\frac{1}{2}}" />.
                </span>
              </div>
            </li>
            <li>
              <div className="exemplos-pot-frac__linha">
                <span className="exemplos-pot-frac__calc">
                  <Formula tex="\sqrt{27} = \sqrt[2]{3^{3}} = \sqrt[2:2]{3^{3:2}} = 3^{\frac{3}{2}}" />
                </span>
                <span className="exemplos-pot-frac__seta" aria-hidden>
                  →
                </span>
                <span className="exemplos-pot-frac__texto">
                  <Formula tex="\sqrt[2]{3^{3}} = 3^{\frac{3}{2}}" />.
                </span>
              </div>
            </li>
            <li>
              <div className="exemplos-pot-frac__linha">
                <span className="exemplos-pot-frac__calc">
                  <Formula tex="\sqrt[3]{128} = \sqrt[3]{2^{7}} = \sqrt[3:3]{2^{7:3}} = 2^{\frac{7}{3}}" />
                </span>
                <span className="exemplos-pot-frac__seta" aria-hidden>
                  →
                </span>
                <span className="exemplos-pot-frac__texto">
                  <Formula tex="\sqrt[3]{2^{7}} = 2^{\frac{7}{3}}" />.
                </span>
              </div>
            </li>
            <li>
              <div className="exemplos-pot-frac__linha">
                <span className="exemplos-pot-frac__calc">
                  <Formula tex="\sqrt[5]{16} = \sqrt[5]{2^{4}} = \sqrt[5:5]{2^{4:5}} = 2^{\frac{4}{5}}" />
                </span>
                <span className="exemplos-pot-frac__seta" aria-hidden>
                  →
                </span>
                <span className="exemplos-pot-frac__texto">
                  <Formula tex="\sqrt[5]{2^{4}} = 2^{\frac{4}{5}}" />.
                </span>
              </div>
            </li>
          </ul>

          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <p className="organize-ideias__texto">
              De modo geral, sendo <strong>a</strong> um número real não negativo,{' '}
              <strong>m</strong> um número inteiro e <strong>n</strong> um número natural maior que 1,
              então <Formula tex="\sqrt[\mathbf{n}]{\mathbf{a}^{\mathbf{m}}} = \mathbf{a}^{\dfrac{\mathbf{m}}{\mathbf{n}}}" />.
            </p>
          </OrganizeAsIdeias>

          <AgoraEComVoce
            className="agora-e-com-voce--af"
            iconSrc={capAsset('images/selo_agora_e_com_voce_af.png')}
          >
            <QuestionRenderer
              question={getQuestionById('ch1_q30')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q31')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q32')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={25} expandToBookColumn />

          <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="explore-conhecimentos--af">
                  <TeacherAnswers
                    questions={[
                      getQuestionById('ch1_q33'),
                      getQuestionById('ch1_q34'),
                      getQuestionById('ch1_q35'),
                      getQuestionById('ch1_q36'),
                      getQuestionById('ch1_q37'),
                    ]}
                  />
                </div>
              }
            />

          <ExploreSeusConhecimentos
            className="explore-conhecimentos--af"
            iconSrc={capAsset('images/selo-explore-conhecimentos.png')}
          >
            <QuestionRenderer
              question={getQuestionById('ch1_q33')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q34')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q35')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q36')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q37')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </ExploreSeusConhecimentos>

          <Pagination currentPage={26} expandToBookColumn />

          <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="explore-conhecimentos--af">
                  <TeacherAnswers
                    questions={[
                      getQuestionById('ch1_q38'),
                      getQuestionById('ch1_q39'),
                      getQuestionById('ch1_q40'),
                      getQuestionById('ch1_q41'),
                      getQuestionById('ch1_q42'),
                    ]}
                  />
                </div>
              }
            />

          <div className="explore-conhecimentos--af">
            <QuestionRenderer
              question={getQuestionById('ch1_q38')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q39')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q40')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q41')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q42')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </div>

       

          <Pagination currentPage={27} expandToBookColumn />

          <div className="my-4">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <div className="mergulhando-fundo">
                  <TeacherAnswers
                    questions={[
                      getQuestionById('ch1_q43'),
                      getQuestionById('ch1_q44'),
                      getQuestionById('ch1_q45'),
                    ]}
                  />
                </div>
              }
            />
          </div>

          <MergulhandoFundo iconSrc={capAsset('images/selo-mergulhando-fundo.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q43')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q44')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q45')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </MergulhandoFundo>

          <AcesseAEureka
            iconSrc={capAsset('images/page_26_img_391_525.png')}
            href="https://qr.portalsaseducacao.com.br/eureka_mat"
          />

          <NesteCapituloVoceEstudou iconSrc={capAsset('images/selo-neste-capitulo-voce-estudou_af.png')}>
            <ul className="list-disc ml-6">
              <li>os conjuntos numéricos: naturais, inteiros, racionais, reais e irracionais;</li>
              <li>número decimal exato e dízima periódica;</li>
              <li>raiz exata e aproximada de um número;</li>
              <li>representação dos números reais na reta numérica;</li>
              <li>potenciação e propriedades;</li>
              <li>notação científica;</li>
              <li>relação entre potenciação e radiciação;</li>
              <li>potências com expoentes fracionários.</li>
            </ul>
          </NesteCapituloVoceEstudou>

        </div>

        <Footer />
      </div>

      {currentPage > START_PAGE && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 z-40 p-3 hover:scale-110 transition-all"
          title="Voltar ao início do livro"
        >
          <img src={publicUrl('images/setaTopo.svg')} alt="Voltar ao início do livro" />
        </button>
      )}
    </div>
  );
}

export default BookCap01;