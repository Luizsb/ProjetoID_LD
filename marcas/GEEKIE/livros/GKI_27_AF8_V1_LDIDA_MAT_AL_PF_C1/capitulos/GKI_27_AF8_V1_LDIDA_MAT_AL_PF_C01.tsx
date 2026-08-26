// @ld-export-metadata: {"chapterNumber":4,"chapterTitle":"3. Representar números em notação científica.","startPage":1,"pageCount":15,"componentName":"BookCap04","exportFolderName":"livro_digital_C04"}

import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import Chapter from '@player/components/Chapter';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import Footer from '@player/components/Footer';
import EscolaDigital from '@player/components/EscolaDigital';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import { Question } from '@player/types/questions';

const ROTINA_PASSOS = [
  {
    id: 'c4_q1',
    icon: 'images/iconPense.png',
    iconAlt: 'Pense',
    lines: 6,
    prompt: (
      <>
        <strong>Pense</strong> individualmente sobre a pergunta e anote suas observações.
      </>
    ),
    answer:
      'Resposta possível: Os números do espaço têm muitos zeros e são difíceis de ler e escrever. Talvez seja possível indicar quantos zeros aparecem no número, em vez de escrever todos eles.',
  },
  {
    id: 'c4_q2',
    icon: 'images/iconTrocar.png',
    iconAlt: 'Trocar',
    lines: 6,
    prompt: (
      <>
        Junte-se a um colega para <strong>trocar</strong> ideias sobre o que foi pensado no passo
        anterior. Conte suas reflexões e veja se surge alguma dúvida. Depois, seu colega também vai
        falar sobre as reflexões que fez e tirar suas dúvidas. Compare as respostas e escreva, com o
        colega, um parágrafo sobre as semelhanças e diferenças encontradas.
      </>
    ),
    answer:
      'Resposta possível: Nós percebemos que as distâncias no espaço são muito grandes e têm muitos zeros. Pensamos que seria mais prático usar uma forma de resumir esses números, dizendo quantas vezes o 10 aparece multiplicado ou quantos zeros o número tem. Tivemos ideias parecidas, mas uma delas foi usar os nomes “milhões” e “bilhões”, enquanto a outra foi agrupar os zeros.',
  },
  {
    id: 'c4_q3',
    icon: 'images/iconComparar.png',
    iconAlt: 'Compartilhar',
    lines: 4,
    prompt: (
      <>
        <strong>Compartilhem</strong> com a turma o texto produzido por vocês e comparem-no com as
        ideias apresentadas pelas outras duplas. Use o espaço abaixo para registrar as novas ideias
        que surgirem.
      </>
    ),
    answer:
      'Resposta possível: Percebemos que 10 &middot; 10 = 100 e que 10 &middot; 10 &middot; 10 = 1 000. Talvez possamos usar essas multiplicações para representar números grandes sem precisar escrever todos os zeros.',
  },
] as const;

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/GEEKIE/livros/GKI_27_AF8_V1_LDIDA_MAT_AL_PF_C1/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const SHOW_TEACHER_BUTTON = true;

const questions = [
  {
    id: 'c4_q1',
    type: 'text-input',
    question: '<strong>Pense</strong> individualmente sobre a pergunta e anote suas observações.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta possível: Os números do espaço têm muitos zeros e são difíceis de ler e escrever. Talvez seja possível indicar quantos zeros aparecem no número, em vez de escrever todos eles.'
  },
  {
    id: 'c4_q2',
    type: 'text-input',
    question: 'Junte-se a um colega para <strong>trocar</strong> ideias sobre o que foi pensado no passo anterior. Conte suas reflexões e veja se surge alguma dúvida. Depois, seu colega também vai falar sobre as reflexões que fez e tirar suas dúvidas. Compare as respostas e escreva, com o colega, um parágrafo sobre as semelhanças e diferenças encontradas.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta possível: Nós percebemos que as distâncias no espaço são muito grandes e têm muitos zeros. Pensamos que seria mais prático usar uma forma de resumir esses números, dizendo quantas vezes o 10 aparece multiplicado ou quantos zeros o número tem. Tivemos ideias parecidas, mas uma delas foi usar os nomes “milhões” e “bilhões”, enquanto a outra foi agrupar os zeros.'
  },
  {
    id: 'c4_q3',
    type: 'text-input',
    question: '<strong>Compartilhem</strong> com a turma o texto produzido por vocês e comparem-no com as ideias apresentadas pelas outras duplas. Use o espaço abaixo para registrar as novas ideias que surgirem.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta possível: Percebemos que 10 &middot; 10 = 100 e que 10 &middot; 10 &middot; 10 = 1 000. Talvez possamos usar essas multiplicações para representar números grandes sem precisar escrever todos os zeros.'
  },
  {
    id: 'c4_q4',
    type: 'text-input',
    number: 1,
    question: 'Como você desenvolveria a expressão escrevendo as potências na forma de multiplicação?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Sugestão de resposta:<br/>2<sup>4</sup> = 2 &middot; 2 &middot; 2 &middot; 2<br/>2<sup>3</sup> = 2 &middot; 2 &middot; 2<br/>Então: 2<sup>4</sup> &middot; 2<sup>3</sup> = 2 &middot; 2 &middot; 2 &middot; 2 &middot; 2 &middot; 2 &middot; 2'
  },
  {
    id: 'c4_q5',
    type: 'text-input',
    number: 2,
    question: 'É possível escrever o resultado anterior na forma de uma única potência? Se sim, como você faria isso?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Sugestão de resposta: Sim. Como há 7 fatores iguais a 2: 2<sup>4</sup> &middot; 2<sup>3</sup> = 2<sup>7</sup>'
  },
  {
    id: 'c4_q6',
    type: 'text-input',
    number: 3,
    question: 'Com base nesse exemplo, escreva, com suas palavras, uma regra que possa ser usada para multiplicar potências de mesma base.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Sugestão de resposta: Ao multiplicar potências de mesma base, mantemos a base e somamos os expoentes.'
  },
  {
    id: 'c4_q7',
    type: 'text-input',
    number: 4,
    question: 'Qual regra se aplica à divisão de potências de mesma base? E para a potência de potência? Dica: utilize exemplos numéricos.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Sugestão de resposta: Na divisão de potências de mesma base, mantemos a base e subtraímos os expoentes. Na potência de potência, mantemos a base e multiplicamos os expoentes.'
  },
  {
    id: 'c4_q8',
    type: 'text-input',
    number: 1,
    question: 'Aplicando a definição de potência, calcule os valores a seguir.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      { letter: 'a', question: '7<sup>2</sup>', placeholder: 'Digite aqui...' },
      { letter: 'b', question: '(-5)<sup>3</sup>', placeholder: 'Digite aqui...' },
      { letter: 'c', question: '(2/9)<sup>2</sup>', placeholder: 'Digite aqui...' },
      { letter: 'd', question: '0<sup>6</sup>', placeholder: 'Digite aqui...' },
      { letter: 'e', question: '6<sup>0</sup>', placeholder: 'Digite aqui...' }
    ],
    correctAnswer:
      'a) 7<sup>2</sup> = 7 &middot; 7 = 49<br/>b) (-5)<sup>3</sup> = (-5) &middot; (-5) &middot; (-5) = -125<br/>c) (2/9)<sup>2</sup> = (2/9) &middot; (2/9) = 4/81<br/>d) 0<sup>6</sup> = 0 &middot; 0 &middot; 0 &middot; 0 &middot; 0 &middot; 0 = 0<br/>e) 6<sup>0</sup> = 1',
  },
  {
    id: 'c4_q9',
    type: 'text-input',
    number: 2,
    question: 'Usando as propriedades de multiplicação e divisão de potências, reescreva as expressões na forma de uma única potência.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      { letter: 'a', question: '(-1/3)<sup>4</sup> &middot; (-1/3)<sup>5</sup>', placeholder: 'Digite aqui...' },
      { letter: 'b', question: 'a<sup>3</sup> &middot; a &middot; a<sup>6</sup>', placeholder: 'Digite aqui...' },
      { letter: 'c', question: '(0,3)<sup>13</sup> : (0,3)<sup>2</sup>', placeholder: 'Digite aqui...' },
      { letter: 'd', question: '(0,2)<sup>27</sup> / (1/5)<sup>19</sup>', placeholder: 'Digite aqui...' },
    ],
    correctAnswer:
      'a) Devemos adicionar os expoentes: (-1/3)<sup>4+5</sup> = (-1/3)<sup>9</sup><br/>b) Devemos adicionar os expoentes: a<sup>3+1+6</sup> = a<sup>10</sup><br/>c) Devemos subtrair os expoentes: (0,3)<sup>13-2</sup> = (0,3)<sup>11</sup><br/>d) Lembre-se de que 1/5 = 0,2. Devemos subtrair os expoentes: (0,2)<sup>27</sup>/(0,2)<sup>19</sup> = (0,2)<sup>27-19</sup> = (0,2)<sup>8</sup> = (1/5)<sup>8</sup>',
  },
  {
    id: 'c4_q10',
    type: 'text-input',
    number: 3,
    question: 'Transforme as expressões em uma única potência.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      { letter: 'a', question: '[(-3)<sup>4</sup>]<sup>5</sup>', placeholder: 'Digite aqui...' },
      { letter: 'b', question: '{[(-7)<sup>3</sup>]<sup>4</sup>}<sup>6</sup>', placeholder: 'Digite aqui...' },
      { letter: 'c', question: '[(0,1)<sup>2</sup>]<sup>5<sup>0</sup></sup>', placeholder: 'Digite aqui...' },
    ],
    correctAnswer:
      'a) Devemos multiplicar os expoentes: (-3)<sup>4 &middot; 5</sup> = (-3)<sup>20</sup><br/>b) Devemos multiplicar os expoentes: (-7)<sup>3 &middot; 4 &middot; 6</sup> = (-7)<sup>72</sup><br/>c) Nesse caso, devemos multiplicar os expoentes. No entanto, é importante lembrar que qualquer número elevado a zero é igual a 1; portanto: (0,1)<sup>2 &middot; 1</sup> = (0,1)<sup>2</sup>',
  },
  {
    id: 'c4_q11',
    type: 'text-input',
    number: 4,
    question: 'Usando as propriedades, encontre o valor das seguintes potências.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      { letter: 'a', question: '(3 &middot; 5)<sup>2</sup>', placeholder: 'Digite aqui...' },
      { letter: 'b', question: '(7 &middot; 2)<sup>3</sup>', placeholder: 'Digite aqui...' },
      { letter: 'c', question: '(10 : 2)<sup>4</sup>', placeholder: 'Digite aqui...' },
      { letter: 'd', question: '(6 : 3)<sup>1</sup>', placeholder: 'Digite aqui...' },
    ],
    correctAnswer:
      'a) (3 &middot; 5)<sup>2</sup> = 3<sup>2</sup> &middot; 5<sup>2</sup> = 9 &middot; 25 = 225<br/>b) (7 &middot; 2)<sup>3</sup> = 7<sup>3</sup> &middot; 2<sup>3</sup> = 343 &middot; 8 = 2 744<br/>c) (10 : 2)<sup>4</sup> = 10<sup>4</sup> : 2<sup>4</sup> = 10 000 : 16 = 625<br/>d) (6 : 3)<sup>1</sup> = 6<sup>1</sup> : 3<sup>1</sup> = 6 : 3 = 2',
  },
  {
    id: 'c4_q12',
    type: 'multiple-choice',
    number: 5,
    question:
      'Observe as seguintes sentenças:<br/><br/>I. 5<sup>0</sup> = 0<br/>II. 7<sup>0</sup> = 1<br/>III. (1/3)<sup>0</sup> = 1<br/>IV. (2/5)<sup>0</sup> = 0<br/><br/>Quais delas são verdadeiras?',
    options: {
      a: 'I e IV.',
      b: 'I e III.',
      c: 'I, II e III.',
      d: 'II e III.',
    },
    correctAnswer: 'd',
  },
  {
    id: 'c4_q13',
    type: 'text-input',
    number: 6,
    question:
      'Em cada item, decomponha o número em fatores primos e, em seguida, escreva-o na forma de produto de potências.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      { letter: 'a', question: '240', placeholder: 'Digite aqui...' },
      { letter: 'b', question: '360', placeholder: 'Digite aqui...' },
      { letter: 'c', question: '450', placeholder: 'Digite aqui...' },
    ],
    correctAnswer:
      'a) 240 : 2 = 120; 120 : 2 = 60; 60 : 2 = 30; 30 : 2 = 15; 15 : 3 = 5; 5 : 5 = 1. Logo: 240 = 2 &middot; 2 &middot; 2 &middot; 2 &middot; 3 &middot; 5 = 2<sup>4</sup> &middot; 3 &middot; 5<br/>b) 360 : 2 = 180; 180 : 2 = 90; 90 : 2 = 45; 45 : 3 = 15; 15 : 3 = 5; 5 : 5 = 1. Logo: 360 = 2 &middot; 2 &middot; 2 &middot; 3 &middot; 3 &middot; 5 = 2<sup>3</sup> &middot; 3<sup>2</sup> &middot; 5<br/>c) 450 : 2 = 225; 225 : 3 = 75; 75 : 3 = 25; 25 : 5 = 5; 5 : 5 = 1. Logo: 450 = 2 &middot; 3 &middot; 3 &middot; 5 &middot; 5 = 2 &middot; 3<sup>2</sup> &middot; 5<sup>2</sup>',
  },
  {
    id: 'c4_q14',
    type: 'text-input',
    number: 1,
    question: 'Aplicando as propriedades de potenciação, calcule o valor das expressões numéricas:',
    placeholder: 'Digite aqui...',
    subQuestions: [
      {
        letter: 'a',
        question: '(2<sup>9</sup> &middot; 2<sup>11</sup> &middot; 2<sup>3</sup>) : (2<sup>7</sup>)<sup>3</sup>',
        placeholder: 'Digite aqui...',
      },
      {
        letter: 'b',
        question:
          '[(0,4)<sup>2</sup>]<sup>10</sup> : [(0,4)<sup>9</sup> &middot; (0,4)<sup>7</sup> &middot; (0,4)]',
        placeholder: 'Digite aqui...',
      },
    ],
    correctAnswer:
      'a) Adicionando os expoentes das multiplicações e multiplicando os expoentes da potência de potência, temos: (2<sup>9</sup> &middot; 2<sup>11</sup> &middot; 2<sup>3</sup>) : (2<sup>7</sup>)<sup>3</sup> = 2<sup>23</sup> : 2<sup>21</sup>. Agora, subtraímos os expoentes e obtemos: 2<sup>2</sup> = 4.<br/>b) Adicionando os expoentes das multiplicações e multiplicando os expoentes da potência de potência, temos: [(0,4)<sup>2</sup>]<sup>10</sup> : [(0,4)<sup>9</sup> &middot; (0,4)<sup>7</sup> &middot; (0,4)] = (0,4)<sup>20</sup> : (0,4)<sup>17</sup>. Agora, subtraímos os expoentes e obtemos: (0,4)<sup>3</sup> = 0,064.',
  },
  {
    id: 'c4_q15',
    type: 'text-input',
    number: 2,
    question: 'Considerando que a &middot; b = 20, calcule o valor de a<sup>2</sup> &middot; b<sup>2</sup>.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Podemos realizar a multiplicação das bases e manter o expoente. Assim, temos: a<sup>2</sup> &middot; b<sup>2</sup> = (a &middot; b)<sup>2</sup> = (20)<sup>2</sup> = 400.',
  },
  {
    id: 'c4_q16',
    type: 'text-input',
    number: 3,
    question: 'Multiplicando as potências, reduza cada expressão a seguir a uma só base.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      { letter: 'a', question: '4<sup>3</sup> &middot; 27<sup>2</sup>', placeholder: 'Digite aqui...' },
      {
        letter: 'b',
        question: '8 &middot; 2<sup>17</sup> &middot; 25 &middot; 5<sup>18</sup>',
        placeholder: 'Digite aqui...',
      },
    ],
    correctAnswer:
      'a) Podemos escrever as bases em forma de potência. Então, multiplicando os expoentes, temos: 4<sup>3</sup> &middot; 27<sup>2</sup> = (2<sup>2</sup>)<sup>3</sup> &middot; (3<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup> &middot; 3<sup>6</sup> = (2 &middot; 3)<sup>6</sup> = 6<sup>6</sup>.<br/>b) Primeiro, podemos escrever os números 8 e 25 em forma de potência. Depois, adicionando os expoentes das multiplicações de potências de mesma base, temos: 8 &middot; 2<sup>17</sup> &middot; 25 &middot; 5<sup>18</sup> = 2<sup>3</sup> &middot; 2<sup>17</sup> &middot; 5<sup>2</sup> &middot; 5<sup>18</sup> = 2<sup>20</sup> &middot; 5<sup>20</sup> = (2 &middot; 5)<sup>20</sup> = 10<sup>20</sup>.',
  },
  {
    id: 'c4_q17',
    type: 'text-input',
    number: 4,
    question:
      'Simplifique: <span class="gki-fracao gki-fracao--texto"><span class="gki-fracao__num">[(2)<sup>3</sup>]<sup>5</sup> + [(2)<sup>3</sup>]<sup>5</sup></span><span class="gki-fracao__barra"></span><span class="gki-fracao__den">4<sup>4</sup> + 4<sup>4</sup> + 4<sup>4</sup> + 4<sup>4</sup></span></span>',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Primeiro, multiplicamos os expoentes das potências de potência do numerador. Em seguida, transformamos a adição de parcelas iguais do denominador em uma multiplicação.<br/><span class="gki-fracao gki-fracao--texto"><span class="gki-fracao__num">[(2)<sup>3</sup>]<sup>5</sup> + [(2)<sup>3</sup>]<sup>5</sup></span><span class="gki-fracao__barra"></span><span class="gki-fracao__den">4<sup>4</sup> + 4<sup>4</sup> + 4<sup>4</sup> + 4<sup>4</sup></span></span> = <span class="gki-fracao gki-fracao--texto"><span class="gki-fracao__num">2<sup>15</sup> + 2<sup>15</sup></span><span class="gki-fracao__barra"></span><span class="gki-fracao__den">4 &middot; 4<sup>4</sup></span></span><br/>Depois, no numerador, transformamos a adição de parcelas iguais em uma multiplicação. No denominador, usamos a igualdade 4 = 2<sup>2</sup>.<br/><span class="gki-fracao gki-fracao--texto"><span class="gki-fracao__num">2 &middot; 2<sup>15</sup></span><span class="gki-fracao__barra"></span><span class="gki-fracao__den">2<sup>2</sup> &middot; (2<sup>2</sup>)<sup>4</sup></span></span><br/>Por fim, aplicamos as propriedades de potência:<br/><span class="gki-fracao gki-fracao--texto"><span class="gki-fracao__num">2 &middot; 2<sup>15</sup></span><span class="gki-fracao__barra"></span><span class="gki-fracao__den">2<sup>2</sup> &middot; (2<sup>2</sup>)<sup>4</sup></span></span> = <span class="gki-fracao gki-fracao--texto"><span class="gki-fracao__num">2<sup>16</sup></span><span class="gki-fracao__barra"></span><span class="gki-fracao__den">2<sup>2</sup> &middot; 2<sup>8</sup></span></span> = <span class="gki-fracao gki-fracao--texto"><span class="gki-fracao__num">2<sup>16</sup></span><span class="gki-fracao__barra"></span><span class="gki-fracao__den">2<sup>10</sup></span></span> = 2<sup>16-10</sup> = 2<sup>6</sup>.',
  },
  {
    id: 'c4_q18',
    type: 'text-input',
    number: 5,
    question: 'Aplicando a decomposição em fatores primos e as propriedades da potenciação, resolva as questões.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      {
        letter: 'a',
        question:
          'Decomponha os seguintes números em fatores primos e escreva-os na forma de produtos de potências.',
        placeholder: 'Digite aqui...',
      },
      {
        letter: 'b',
        question:
          'Utilizando as decomposições obtidas, indique quais números têm exatamente três fatores primos diferentes e escreva o produto 252 &middot; 420 na forma de uma única expressão com potências.',
        placeholder: 'Digite aqui...',
      },
    ],
    correctAnswer:
      'a) 252 : 2 = 126; 126 : 2 = 63; 63 : 3 = 21; 21 : 3 = 7; 7 : 7 = 1. Logo: 252 = 2 &middot; 2 &middot; 3 &middot; 3 &middot; 7 = 2<sup>2</sup> &middot; 3<sup>2</sup> &middot; 7<br/>420 : 2 = 210; 210 : 2 = 105; 105 : 3 = 35; 35 : 5 = 7; 7 : 7 = 1. Logo: 420 = 2 &middot; 2 &middot; 3 &middot; 5 &middot; 7 = 2<sup>2</sup> &middot; 3 &middot; 5 &middot; 7<br/>560 : 2 = 280; 280 : 2 = 140; 140 : 2 = 70; 70 : 2 = 35; 35 : 5 = 7; 7 : 7 = 1. Logo: 560 = 2 &middot; 2 &middot; 2 &middot; 2 &middot; 5 &middot; 7 = 2<sup>4</sup> &middot; 5 &middot; 7<br/>b) Os números que têm exatamente três fatores primos diferentes são 252 e 560.<br/>Sabemos que: 252 = 2<sup>2</sup> &middot; 3<sup>2</sup> &middot; 7 e 420 = 2<sup>2</sup> &middot; 3 &middot; 5 &middot; 7. Assim: 252 &middot; 420 = (2<sup>2</sup> &middot; 3<sup>2</sup> &middot; 7) &middot; (2<sup>2</sup> &middot; 3 &middot; 5 &middot; 7) = 2<sup>2</sup> &middot; 2<sup>2</sup> &middot; 3<sup>2</sup> &middot; 3 &middot; 5 &middot; 7 &middot; 7 = 2<sup>4</sup> &middot; 3<sup>3</sup> &middot; 5 &middot; 7<sup>2</sup>.',
  },
  {
    id: 'c4_q19',
    type: 'text-input',
    number: 6,
    question:
      'Uma máquina faz cópias de forma especial:<br/>I. A cada minuto, cada folha gera 2 novas cópias.<br/>II. No início, há apenas 1 folha na máquina.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      { letter: 'a', question: 'Quantas folhas existirão após 1 minuto?', placeholder: 'Digite aqui...' },
      { letter: 'b', question: 'E após 2 minutos?', placeholder: 'Digite aqui...' },
      {
        letter: 'c',
        question: 'É possível escrever essa situação usando potência? Como você escreveria?',
        placeholder: 'Digite aqui...',
      },
      { letter: 'd', question: 'Complete a tabela a seguir.', placeholder: 'Digite aqui...' },
      { letter: 'e', question: 'Após 10 minutos, quantas folhas haverá?', placeholder: 'Digite aqui...' },
    ],
    correctAnswer:
      'a) A cada minuto, cada folha gera 2 novas cópias, ou seja, o total de folhas passa a ser o triplo do anterior. Após 1 minuto: 1 (original) + 2 (novas) = 3 folhas.<br/>b) No minuto seguinte, cada uma das 3 folhas gera 2 novas cópias, triplicando a quantidade atual, portanto existirão 9 folhas.<br/>c) Sim. Devemos observar que a quantidade de folhas forma uma sequência de potências de base 3. Assim, podemos escrever: Quantidade de folhas = 3<sup>n</sup> (em que n representa o número de minutos).<br/>d) Minuto 0: 1 — 3<sup>0</sup>; Minuto 1: 3 — 3<sup>1</sup>; Minuto 2: 9 — 3<sup>2</sup>; Minuto 3: 27 — 3<sup>3</sup>; Minuto 4: 81 — 3<sup>4</sup>; Minuto 5: 243 — 3<sup>5</sup>.<br/>e) Observando o quadro preenchido no item anterior, após 10 minutos, podemos dizer que haverá 3<sup>10</sup> = 59049.',
  }
] as Question[];

function BookCap04() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination(1);
  const [showTeacherView] = useState(false);

  const getQuestionById = (id: string) => questions.find((q) => q.id === id)!;

  useScrollPosition();

  return (
    <div className="marca-geekie min-h-screen w-full bg-gray-200">
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Header marca="geekie" chapterNumber={1} chapterTitle="Potenciação e notação científica" />

        <Pagination currentPage={9} />

        <Poster
          imageSrc={capAsset('images/page_1_img_14_14.png')}
          alt="A Terra vista da cabine principal da espaçonave Orion, em 4 de abril de 2026."
          creditLine1="NASA"
          creditLine2="A Terra vista da cabine principal da espaçonave Orion, em 4 de abril de 2026."
        />



        <div className="p-8 md:p-12">
          <Chapter
            title=""
            content={
              <>

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  content={
                    <div>
                      <p className="mb-2">
                        <strong>Habilidade da BNCC: (EF08MA01)</strong>
                      </p>
                      <p className="mb-0">
                        Efetuar cálculos com potências de expoentes inteiros e aplicar esse
                        conhecimento a representação de números em notação científica.
                      </p>
                    </div>
                  }
                />

                <section className="gki-objetivos mb-6">
                  <div className="gki-objetivos__aba">OBJETIVOS DE APRENDIZAGEM</div>
                  <ol className="gki-objetivos__lista">
                    <li>
                      <span className="gki-objetivos__num" aria-hidden>
                        1.
                      </span>
                      <span>Efetuar cálculos envolvendo propriedades de potenciação.</span>
                    </li>
                    <li>
                      <span className="gki-objetivos__num" aria-hidden>
                        2.
                      </span>
                      <span>Efetuar cálculos com potências de expoentes inteiros.</span>
                    </li>
                    <li>
                      <span className="gki-objetivos__num" aria-hidden>
                        3.
                      </span>
                      <span>Representar números em notação científica.</span>
                    </li>
                  </ol>
                </section>
                <section className="gki-neste-capitulo mb-6">
                  <div className="gki-neste-capitulo__aba">NESTE CAPÍTULO</div>
                  <ul className="gki-neste-capitulo__lista">
                    <li>Propriedades de potenciação</li>
                    <li>
                      Potência com expoente inteiro
                    </li>
                    <li>Notação científica</li>
                  </ul>
                </section>

                <section className="gki-selo gki-selo--rotinas mb-6">
                  <img
                    className="gki-selo__faixa"
                    src={capAsset('images/rotinaPensamento.png')}
                    alt="Rotinas de pensamento"
                  />
                  <div className="gki-selo__caixa">
                    <p className="mb-1">Pensar, trocar e compartilhar.</p>
                    <p className="mb-0">4Cs</p>
                  </div>
                </section>

           

                <Pagination currentPage={10} expandToBookColumn />

                <h2 className="titulo-sas mb-4 mt-6">PARA COMEÇAR E REFLETIR</h2>

                <div className="gki-rotina-titulo mb-4">
                  <img
                    className="gki-rotina-titulo__raio"
                    src={capAsset('images/iconRaio.png')}
                    alt=""
                    aria-hidden
                  />
                  <p className="gki-rotina-titulo__texto">
                    Rotina de pensamento: pensar, trocar e compartilhar
                  </p>
                </div>

                <p className="mb-4 indent-6">
                  Formas de pensamento que serão mobilizadas nesta rotina:
                </p>

                <ul className="gki-formas-pensamento">
                  <li className="gki-formas-pensamento__item">
                    <img
                      className="gki-formas-pensamento__icone"
                      src={capAsset('images/conexoes.png')}
                      alt=""
                      aria-hidden
                    />
                    <span>Fazer conexões</span>
                  </li>
                  <li className="gki-formas-pensamento__item">
                    <img
                      className="gki-formas-pensamento__icone"
                      src={capAsset('images/pontosDeVista.png')}
                      alt=""
                      aria-hidden
                    />
                    <span>Considerar diferentes pontos de vista</span>
                  </li>
                  <li className="gki-formas-pensamento__item">
                    <img
                      className="gki-formas-pensamento__icone"
                      src={capAsset('images/elaborar.png')}
                      alt=""
                      aria-hidden
                    />
                    <span>Elaborar explicações e interpretações</span>
                  </li>
                </ul>

                <p className="mb-4 indent-6">
                  Você já ouviu falar de Astronomia? Sabe como essa área do conhecimento se associa com a Matemática?
                </p>
                <p className="mb-4 indent-6">
                  A Matemática e a Astronomia estão relacionadas desde a Antiguidade. Povos da Mesopotâmia, como os babilônios, registravam os movimentos dos astros e utilizavam cálculos para prever eclipses e outros eventos. Com o tempo, os estudos matemáticos avançaram e os cálculos foram ficando cada vez mais precisos; assim, ficou muito mais fácil compreender os fenômenos celestes.
                </p>
                <p className="mb-4 indent-6">
                  A Astronomia amplia nosso conhecimento sobre o Universo e contribui para o desenvolvimento científico e tecnológico, com aplicações úteis no nosso cotidiano.
                </p>
                <p className="mb-4 indent-6">
                  Na <strong>Rotina de pensamento</strong> a seguir, você conhecerá um dos telescópios mais importantes da história.
                </p>
                <p className="mb-4 indent-6">
                  Desde 1990, o telescópio espacial Hubble gira no espaço a 612 000 metros de distância da Terra, com velocidade aproximada de 7 500 m/s (ou 27 000 km/h), e completa uma volta ao redor do nosso planeta em aproximadamente 95 minutos.
                </p>
                <p className="mb-4 indent-6">
                  Por meio do Hubble, é possível observar galáxias que estão a mais de 10 bilhões de anos-luz de distância – isso significa que a luz captada pelo telescópio foi emitida há bilhões de anos. Com esse tipo de informação em mãos, os cientistas podem desenvolver estudos que buscam um melhor entendimento da origem do Cosmos.
                </p>

         
                  <p className="mb-4 indent-6">
                    Um ano-luz é a distância percorrida pela luz em um ano, o que corresponde a aproximadamente 9 600 000 000 000 km. Frequentemente, dados referentes ao espaço envolvem números muito extensos. Como podemos escrever esses números de uma maneira mais curta, sem alterar o valor que eles representam?
                  </p>

                <figure className="gki-figura-hubble my-6 mx-auto">
                  <img
                    src={capAsset('images/page_2_img_224_513.png')}
                    alt="O Telescópio Espacial Hubble em órbita da Terra, visto de dentro de uma nave espacial, com painéis solares abertos e a Terra ao fundo."
                    className="gki-figura-hubble__img"
                  />
                  <figcaption className="gki-figura-hubble__credito">NASA</figcaption>
                  <p className="gki-figura-hubble__legenda">
                    Telescópio Hubble acoplado ao ônibus espacial Atlantis durante uma missão em
                    órbita da Terra.
                  </p>
                </figure>

                <Pagination currentPage={11} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <ol className="list-decimal pl-5 space-y-3">
                      {ROTINA_PASSOS.map((passo, index) => (
                        <li key={passo.id}>
                          <strong>
                            {index === 0 ? 'Pense' : index === 1 ? 'Trocar' : 'Compartilhem'}
                            :
                          </strong>{' '}
                          <span dangerouslySetInnerHTML={{ __html: passo.answer }} />
                        </li>
                      ))}
                    </ol>
                  }
                />

                {ROTINA_PASSOS.map((passo) => (
                  <div key={passo.id} className="gki-passo-rotina">
                    <div className="gki-passo-rotina__caixa">
                      <div className="gki-passo-rotina__cabecalho">
                        <img
                          className="gki-passo-rotina__icone"
                          src={capAsset(passo.icon)}
                          alt={passo.iconAlt}
                        />
                        <p className="gki-passo-rotina__enunciado">{passo.prompt}</p>
                      </div>
                      <textarea
                        className={`gki-passo-rotina__campo${passo.lines <= 4 ? ' gki-passo-rotina__campo--curto' : ''}`}
                        rows={passo.lines}
                        value={(userAnswers[passo.id] as string) || ''}
                        onChange={(event) => handleAnswerChange(passo.id, event.target.value)}
                        aria-label={passo.iconAlt}
                        placeholder=" "
                      />
                    </div>
                  </div>
                ))}

                <Pagination currentPage={12} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                  
                        <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                          Professor, é importante destacar que os termos potência e potenciação não são sinônimos, embora estejam diretamente relacionados. Chama-se <strong>potenciação</strong> a operação matemática que consiste em multiplicar um número por ele mesmo uma determinada quantidade de vezes. Já o termo <strong>potência</strong> pode assumir dois sentidos: ele se refere tanto à expressão que representa essa operação (por exemplo, <em>x</em><sup><em>n</em></sup>) quanto ao resultado obtido por meio dessa operação.
                        </p>
                      </>
                    }
                  />
                </div>

                <div className="mb-6" style={{ backgroundColor: '#f9ef61', border: '1.5px solid #009b80', borderRadius: '18px', padding: '1.25rem' }}>
                  <h3>OBJETIVO DE APRENDIZAGEM</h3>
                  <p><span style={{ color: '#80298f', fontWeight: 'bold' }}>
                        1.
                      </span> Efetuar cálculos envolvendo propriedades de potenciação</p>
                </div>

                <div className="gki-secao-titulo mb-4 mt-6" role="heading" aria-level={2}>
                  <span className="gki-secao-titulo__setas" aria-hidden>
                    ≫
                  </span>
                  <span className="gki-secao-titulo__wrap">
                    <span className="gki-secao-titulo__fundo" aria-hidden />
                    <span className="gki-secao-titulo__frente">CONSTRUINDO SABERES</span>
                  </span>
                </div>
                <h3 style={{ color: '#009b80' }} className="titulo mb-4 mt-6">Como efetuar cálculos envolvendo potências?</h3>

                <p className="mb-4 indent-6">
                  Na rotina de pensamento, você pôde refletir em como podemos representar números extensos de maneira reduzida. Agora, vamos relembrar como podemos fazer isso quando temos multiplicações de fatores idênticos. Uma multiplicação de fatores iguais pode ser representada por uma potência e expressa de forma simplificada, o que também facilita a leitura, a comparação e os cálculos com números muito grandes ou muito pequenos, como veremos mais para a frente. Observe a representação a seguir.
                </p>

                <div
                  className="gki-potencia-diagrama"
                  role="img"
                  aria-label="2 vezes 2 nove vezes é igual a 2 elevado a 9, que é igual a 512. O 2 é a base e o 9 é o expoente."
                >
                  <span className="gki-potencia-diagrama__expr">
                    2 &middot; 2 &middot; 2 &middot; 2 &middot; 2 &middot; 2 &middot; 2 &middot; 2 &middot; 2
                  </span>
                  <span className="gki-potencia-diagrama__igual">=</span>
                  <span className="gki-potencia-diagrama__potencia">
                    <span className="gki-potencia-diagrama__rotulo gki-potencia-diagrama__rotulo--expoente">
                      Expoente
                      <span className="gki-potencia-diagrama__seta" aria-hidden>
                        ↓
                      </span>
                    </span>
                    <span className="gki-potencia-diagrama__capsula">
                      <span className="gki-potencia-diagrama__base">2</span>
                      <sup className="gki-potencia-diagrama__expoente">9</sup>
                    </span>
                    <span className="gki-potencia-diagrama__rotulo gki-potencia-diagrama__rotulo--base">
                      <span className="gki-potencia-diagrama__seta" aria-hidden>
                        ↑
                      </span>
                      Base
                    </span>
                  </span>
                  <span className="gki-potencia-diagrama__igual">=</span>
                  <span className="gki-potencia-diagrama__resultado">512</span>
                </div>

                <ul className="list-disc ml-6 mb-6" style={{ ['--list-marker-color' as string]: '#7fb438' }}>
                  <li>O número 2 chama-se <strong>base</strong> (fator que se repete).</li>
                  <li>O número 9 chama-se <strong>expoente</strong> (número de vezes que o fator se repete).</li>
                  <li>O número 512 chama-se <strong>potência</strong> (resultado da potenciação).</li>
                </ul>

                <p className="mb-4 indent-6">
                  De modo geral, usamos o conceito de <strong>enésima potência</strong>, em que n representa qualquer número inteiro maior que 1. Isso significa multiplicar a base por ela mesma <em>n</em> vezes.
                </p>

                <p className="mb-4 indent-6">Se usarmos 2 como base, temos:</p>
                <div
                  className="gki-enesima"
                  role="img"
                  aria-label="n igual a enésima potência de 2 implica 2 elevado a n igual a 2 vezes 2 vezes 2 e assim por diante, com n fatores 2"
                >
                  <span className="gki-enesima__inicio">
                    <em>n</em> = enésima potência de 2 <span className="gki-enesima__seta" aria-hidden>→</span>
                  </span>
                  <span className="gki-enesima__bloco">
                    <span className="gki-enesima__expr">
                      2<sup>
                        <em>n</em>
                      </sup>{' '}
                      = 2 &middot; 2 &middot; 2 &middot; &hellip; &middot; 2
                    </span>
                    <span className="gki-enesima__chave" aria-hidden />
                    <span className="gki-enesima__legenda">
                      <em>n</em> fatores 2
                    </span>
                  </span>
                </div>

                <p className="mb-4 indent-6">Assim, para um <em>x</em>  qualquer:</p>
                <div
                  className="gki-enesima"
                  role="img"
                  aria-label="n igual a enésima potência de x implica x elevado a n igual a x vezes x vezes x e assim por diante, com n fatores x"
                >
                  <span className="gki-enesima__inicio">
                    <em>n</em> = enésima potência de <em>x</em>{' '}
                    <span className="gki-enesima__seta" aria-hidden>
                      →
                    </span>
                  </span>
                  <span className="gki-enesima__bloco">
                    <span className="gki-enesima__expr">
                      <em>x</em>
                      <sup>
                        <em>n</em>
                      </sup>{' '}
                      = <em>x</em> &middot; <em>x</em> &middot; <em>x</em> &middot; &hellip; &middot; <em>x</em>
                    </span>
                    <span className="gki-enesima__chave" aria-hidden />
                    <span className="gki-enesima__legenda">
                      <em>n</em> fatores <em>x</em>
                    </span>
                  </span>
                </div>

                <p className="mb-4 indent-6">
                  A potência <em>x</em><sup><em>n</em></sup> é o produto de <em>n</em> fatores iguais a <em>x</em>, sendo <em>x</em> um número racional e <em>n</em> um número natural, com <em>n</em> &gt; 1.
                </p>

                <p className="mb-4 indent-6">
                  Para darmos início ao estudo das propriedades das potências, vamos explorar algumas operações com elas.
                </p>

               

                <Pagination currentPage={13} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <ol className="list-decimal pl-5 space-y-4">
                      {(['c4_q4', 'c4_q5', 'c4_q6', 'c4_q7'] as const).map((id) => {
                        const resposta =
                          (questions.find((q) => q.id === id) as { correctAnswer?: string } | undefined)
                            ?.correctAnswer ?? '';
                        return (
                          <li key={id}>
                            <div dangerouslySetInnerHTML={{ __html: resposta }} />
                          </li>
                        );
                      })}
                    </ol>
                  }
                />

                <section className="gki-pratica-ativa mb-8">
                  <div className="gki-pratica-ativa__aba">PRÁTICA ATIVA</div>
                  <div className="gki-pratica-ativa__caixa">
                    <h3 className="gki-pratica-ativa__titulo">Explorando: operando potências</h3>
                    <p className="gki-pratica-ativa__intro">
                      Observe a multiplicação a seguir e responda às perguntas.
                    </p>
                    <p className="gki-potencia-pill" aria-label="2 elevado a 4 vezes 2 elevado a 3">
                      2<sup>4</sup> &middot; 2<sup>3</sup>
                    </p>

                    <QuestionRenderer
                      question={getQuestionById('c4_q4')}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      showResults={showTeacherView}
                    />

                    <QuestionRenderer
                      question={getQuestionById('c4_q5')}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      showResults={showTeacherView}
                    />

                    <QuestionRenderer
                      question={getQuestionById('c4_q6')}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      showResults={showTeacherView}
                    />

                    <QuestionRenderer
                      question={getQuestionById('c4_q7')}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      showResults={showTeacherView}
                    />
                  </div>
                </section>

                <div className="gki-secao-titulo mb-4 mt-6" role="heading" aria-level={2}>
                  <span className="gki-secao-titulo__setas" aria-hidden>
                    ≫
                  </span>
                  <span className="gki-secao-titulo__wrap">
                    <span className="gki-secao-titulo__fundo" aria-hidden />
                    <span className="gki-secao-titulo__frente">
                      <span className="gki-secao-titulo__parte--escura">MATEMÁTICA</span>{' '}
                      <span className="gki-secao-titulo__parte--clara">EM FOCO</span>
                    </span>
                  </span>
                </div>
                <p style={{ color: '#36518b', fontWeight: 'bold' }} className="titulo mb-4 mt-6">Propriedades da potenciação</p>
                <p className="mb-4 indent-6">
                  Para simplificar os cálculos envolvendo potências, estudaremos as propriedades da potenciação. Consideraremos que os expoentes <em>m</em> e <em>n</em> são números inteiros e que as bases <em>a</em> e <em>b</em> são diferentes de zero (<em>a</em> &ne; 0 e <em>b</em> &ne; 0).
                </p>

                <h4 className="titulo-sas mb-4 mt-6">Produto de potências de mesma base</h4>
                <p className="mb-4 indent-6">
                  Observe o seguinte produto de potências de mesma base:
                </p>

                <div
                  className="gki-produto-base"
                  role="img"
                  aria-label="3 elevado a 2 vezes 3 elevado a 3 é igual a 3 vezes 3, vezes 3 vezes 3 vezes 3, que é igual a 3 elevado a 5"
                >
                  <span className="gki-produto-base__parte">
                    3<sup>2</sup> &middot; 3<sup>3</sup>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__grupo">
                    <span className="gki-produto-base__expr">(3 &middot; 3)</span>
                    <span className="gki-produto-base__chave" aria-hidden />
                    <span className="gki-produto-base__rotulo">
                      3<sup>2</sup>
                    </span>
                  </span>
                  <span className="gki-produto-base__parte">&middot;</span>
                  <span className="gki-produto-base__grupo">
                    <span className="gki-produto-base__expr">(3 &middot; 3 &middot; 3)</span>
                    <span className="gki-produto-base__chave" aria-hidden />
                    <span className="gki-produto-base__rotulo">
                      3<sup>3</sup>
                    </span>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">3 &middot; 3 &middot; 3 &middot; 3 &middot; 3</span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">
                    3<sup>5</sup>
                  </span>
                </div>

                <p className="mb-4 indent-6">
                  Note que 3<sup>2</sup> &middot; 3<sup>3</sup> = 3<sup>2+3</sup> = 3<sup>5</sup>.
                </p>

                <Pagination currentPage={14} expandToBookColumn />

                <p className="mb-4 indent-6">
                  Portanto, para multiplicar potências de mesma base, basta conservar a base e adicionar os expoentes. Ou seja:
                </p>
                <p className="gki-potencia-pill" aria-label="a elevado a m vezes a elevado a n é igual a a elevado a m mais n">
                  <em>a</em>
                  <sup>
                    <em>m</em>
                  </sup>{' '}
                  &middot; <em>a</em>
                  <sup>
                    <em>n</em>
                  </sup>{' '}
                  = <em>a</em>
                  <sup>
                    <em>m</em> + <em>n</em>
                  </sup>
                </p>

                <p className="mb-4 indent-6"><strong>Exemplos</strong>: produto de potências de mesma base</p>
                <ul
                  className="list-disc ml-6 mb-6"
                  style={{ ['--list-marker-color' as string]: '#7f60a9' }}
                >
                  <li>7<sup>2</sup> &middot; 7<sup>6</sup> = 7<sup>2+6</sup> = 7<sup>8</sup></li>
                  <li>(0,5)<sup>4</sup> &middot; (0,5)<sup>3</sup> = (0,5)<sup>4+3</sup> = (0,5)<sup>7</sup></li>
                </ul>

                <h4 className="titulo-sas mb-4 mt-6">Quociente de potências de mesma base</h4>
                <p className="mb-4 indent-6">
                  Observe o seguinte quociente de potências de mesma base:
                </p>
                <div
                  className="gki-produto-base gki-produto-base--quociente"
                  role="img"
                  aria-label="3 elevado a 5 dividido por 3 elevado a 2 é igual a 3 elevado a 3"
                >
                  <span className="gki-produto-base__parte">
                    3<sup>5</sup> : 3<sup>2</sup>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__grupo">
                    <span className="gki-produto-base__expr">(3 &middot; 3 &middot; 3 &middot; 3 &middot; 3)</span>
                    <span className="gki-produto-base__chave" aria-hidden />
                    <span className="gki-produto-base__rotulo">
                      3<sup>5</sup>
                    </span>
                  </span>
                  <span className="gki-produto-base__parte">:</span>
                  <span className="gki-produto-base__grupo">
                    <span className="gki-produto-base__expr">(3 &middot; 3)</span>
                    <span className="gki-produto-base__chave" aria-hidden />
                    <span className="gki-produto-base__rotulo">
                      3<sup>2</sup>
                    </span>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-fracao" aria-hidden={false}>
                    <span className="gki-fracao__num">
                      <span className="gki-cancelado">3</span> &middot;{' '}
                      <span className="gki-cancelado">3</span> &middot; 3 &middot; 3 &middot; 3
                    </span>
                    <span className="gki-fracao__barra" aria-hidden />
                    <span className="gki-fracao__den">
                      <span className="gki-cancelado">3</span> &middot;{' '}
                      <span className="gki-cancelado">3</span>
                    </span>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">3 &middot; 3 &middot; 3</span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">
                    3<sup>3</sup>
                  </span>
                </div>


<p className="mb-4 indent-6">Note que 3<sup>5</sup> : 3<sup>2</sup> = 3<sup>5-2</sup> = 3<sup>3</sup>.</p>

                <p className="mb-4 indent-6">
                  Portanto, para dividir potências de mesma base, basta conservar a base e subtrair os expoentes. Ou seja:
                </p>
                <p
                  className="gki-potencia-pill gki-potencia-pill--regua"
                  aria-label="a elevado a m dividido por a elevado a n é igual a a elevado a m menos n, com a diferente de zero"
                >
                  <em>a</em>
                  <sup>
                    <em>m</em>
                  </sup>{' '}
                  : <em>a</em>
                  <sup>
                    <em>n</em>
                  </sup>{' '}
                  = <em>a</em>
                  <sup>
                    <em>m</em> − <em>n</em>
                  </sup>
                  <span className="gki-potencia-pill__ou">ou</span>
                  <span className="gki-fracao gki-fracao--inline">
                    <span className="gki-fracao__num">
                      <em>a</em>
                      <sup>
                        <em>m</em>
                      </sup>
                    </span>
                    <span className="gki-fracao__barra" aria-hidden />
                    <span className="gki-fracao__den">
                      <em>a</em>
                      <sup>
                        <em>n</em>
                      </sup>
                    </span>
                  </span>{' '}
                  = <em>a</em>
                  <sup>
                    <em>m</em> − <em>n</em>
                  </sup>
                  , com <em>a</em> &ne; 0.
                </p>

                <p className="mb-4 indent-6"><strong>Exemplos</strong>: quociente de potências de mesma base</p>
                <ul className="list-disc ml-6 mb-6"
                  style={{ ['--list-marker-color' as string]: '#7f60a9' }}
                >
                  <li>8<sup>9</sup> : 8<sup>6</sup> = 8<sup>9-6</sup> = 8<sup>3</sup></li>
                  <li>(0,2)<sup>7</sup> : (0,2)<sup>3</sup> = (0,2)<sup>7-3</sup> = (0,2)<sup>4</sup></li>
                </ul>

                <h4 className="titulo-sas mb-4 mt-6">Potência de uma potência</h4>
                <p className="mb-4 indent-6">
                  Observe a seguinte operação de mesma base:
                </p>
                <p className="text-center font-bold text-lg my-4">
                  (3<sup>2</sup>)<sup>3</sup> = 3<sup>2</sup> &middot; 3<sup>2</sup> &middot; 3<sup>2</sup> = 3<sup>2+2+2</sup> = 3<sup>6</sup>
                </p>
                <p className="mb-4 indent-6">
                  Note que (3<sup className="gki-expo-roxo">3</sup>)<sup className="gki-expo-roxo">2</sup> ={' '}
                  3<sup className="gki-expo-roxo">3 &middot; 2</sup> = 3<sup className="gki-expo-roxo">6</sup>.
                </p>
                <p className="mb-4 indent-6">
                  Portanto, para calcular a potência de uma potência (isto é, a potência cuja base é outra potência), basta repetir a base e multiplicar os expoentes. Ou seja:
                </p>
                <p className="gki-potencia-pill" aria-label="a elevado a m, elevado a n, é igual a a elevado a m vezes n">
                  (<em>a</em>
                  <sup>
                    <em>m</em>
                  </sup>
                  )<sup>
                    <em>n</em>
                  </sup>{' '}
                  = <em>a</em>
                  <sup>
                    <em>m</em> &middot; <em>n</em>
                  </sup>
                </p>

                <p className="mb-4 indent-6">
                  <strong>Exemplos</strong>: potência de uma potência
                </p>
                <ul
                  className="gki-exemplos-lista mb-6"
                  style={{ ['--list-marker-color' as string]: '#7f60a9' }}
                >
                  <li>
                    [
                    <span className="gki-fracao-expo">
                      (
                      <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                        <span className="gki-fracao__num">1</span>
                        <span className="gki-fracao__barra" aria-hidden />
                        <span className="gki-fracao__den">2</span>
                      </span>
                      )
                      <sup>5</sup>
                    </span>
                    ]<sup>2</sup> ={' '}
                    <span className="gki-fracao-expo">
                      (
                      <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                        <span className="gki-fracao__num">1</span>
                        <span className="gki-fracao__barra" aria-hidden />
                        <span className="gki-fracao__den">2</span>
                      </span>
                      )
                      <sup>5 &middot; 2</sup>
                    </span>{' '}
                    ={' '}
                    <span className="gki-fracao-expo">
                      (
                      <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                        <span className="gki-fracao__num">1</span>
                        <span className="gki-fracao__barra" aria-hidden />
                        <span className="gki-fracao__den">2</span>
                      </span>
                      )
                      <sup>10</sup>
                    </span>
                  </li>
                  <li>
                    [(-11)<sup>6</sup>]<sup>3</sup> = (-11)<sup>6 &middot; 3</sup> = (-11)
                    <sup>18</sup>
                  </li>
                </ul>

                <Pagination currentPage={15} expandToBookColumn />

                <h4 className="titulo-sas mb-4 mt-6">Potência de um produto</h4>
                <p className="mb-4 indent-6">
                  Observe a seguinte potência de um produto:
                </p>
                <div
                  className="gki-produto-base"
                  role="img"
                  aria-label="3 vezes 5, elevado a 2, é igual a 3 elevado a 2 vezes 5 elevado a 2"
                >
                  <span className="gki-produto-base__parte">
                    (3 &middot; 5)<sup className="gki-expo-roxo">2</sup>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">(3 &middot; 5) &middot; (3 &middot; 5)</span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">3 &middot; 5 &middot; 3 &middot; 5</span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__grupo">
                    <span className="gki-produto-base__expr">(3 &middot; 3)</span>
                    <span className="gki-produto-base__chave" aria-hidden />
                    <span className="gki-produto-base__rotulo">
                      3<sup className="gki-expo-roxo">2</sup>
                    </span>
                  </span>
                  <span className="gki-produto-base__parte">&middot;</span>
                  <span className="gki-produto-base__grupo">
                    <span className="gki-produto-base__expr">(5 &middot; 5)</span>
                    <span className="gki-produto-base__chave" aria-hidden />
                    <span className="gki-produto-base__rotulo">
                      5<sup className="gki-expo-roxo">2</sup>
                    </span>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">
                    3<sup className="gki-expo-roxo">2</sup> &middot; 5<sup className="gki-expo-roxo">2</sup>
                  </span>
                </div>
                <p className="mb-4 indent-6">
                  Note que (3 &middot; 5)<sup className="gki-expo-roxo">2</sup> = 3<sup className="gki-expo-roxo">2</sup>{' '}
                  &middot; 5<sup className="gki-expo-roxo">2</sup>.
                </p>
                <p className="mb-4 indent-6">
                  Portanto, para elevar um produto de dois ou mais números a um expoente, podemos elevar cada fator a esse mesmo expoente. Ou seja:
                </p>
                <p
                  className="gki-potencia-pill"
                  aria-label="a vezes b, elevado a m, é igual a a elevado a m vezes b elevado a m"
                >
                  (<em>a</em> &middot; <em>b</em>)
                  <sup>
                    <em>m</em>
                  </sup>{' '}
                  = <em>a</em>
                  <sup>
                    <em>m</em>
                  </sup>{' '}
                  &middot; <em>b</em>
                  <sup>
                    <em>m</em>
                  </sup>
                </p>

                <p className="mb-4 indent-6"><strong>Exemplos</strong>: potência de um produto</p>
                <ul className="list-disc ml-6 mb-6" style={{ ['--list-marker-color' as string]: '#7f60a9' }}>
                  <li>
                    (12 &middot; 13)<sup>3</sup> = (12 &middot; 13) &middot; (12 &middot; 13) &middot; (12 &middot; 13) = (12
                    <sup>3</sup> &middot; 13<sup>3</sup>)
                  </li>
                  <li>
                    (1,4 &middot; 1,7)<sup>2</sup> = (1,4 &middot; 1,7) &middot; (1,4 &middot; 1,7) = (1,4<sup>2</sup> &middot; 1,7
                    <sup>2</sup>)
                  </li>
                </ul>

                <aside className="gki-atencao" aria-label="Atenção">
                  <span className="gki-atencao__selo">ATENÇÃO</span>
                  <h4 className="gki-atencao__titulo">O uso de parênteses</h4>
                  <p className="gki-atencao__texto">
                    A ausência dos parênteses altera o resultado. Observe:
                  </p>
                  <p className="gki-atencao__texto">
                    Em (2<sup>2</sup>)<sup>3</sup>, o 2<sup>2</sup> está sendo elevado a 3.
                  </p>
                  <p className="gki-atencao__texto">
                    Já em 2<sup>
                      2<sup>3</sup>
                    </sup>{' '}
                    = 2<sup>8</sup> apenas o expoente 2 está sendo elevado a 3.
                  </p>
                  <p className="gki-atencao__texto gki-atencao__texto--ultimo">
                    Portanto, (2<sup>2</sup>)<sup>3</sup> &ne; 2<sup>
                      2<sup>3</sup>
                    </sup>
                    .
                  </p>
                </aside>

                <h4 className="titulo-sas mb-4 mt-6">Potência de um quociente</h4>
                <p className="mb-4 indent-6">
                  Observe a seguinte potência de um quociente:
                </p>
                <div
                  className="gki-produto-base gki-produto-base--quociente"
                  role="img"
                  aria-label="3 dividido por 5, elevado a 2, é igual a 3 elevado a 2 dividido por 5 elevado a 2"
                >
                  <span className="gki-produto-base__parte">
                    (3 : 5)<sup>2</sup>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">(3 : 5) &middot; (3 : 5)</span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-fracao gki-fracao--inline">
                    <span className="gki-fracao__num">3</span>
                    <span className="gki-fracao__barra" aria-hidden />
                    <span className="gki-fracao__den">5</span>
                  </span>
                  <span className="gki-produto-base__parte">&middot;</span>
                  <span className="gki-fracao gki-fracao--inline">
                    <span className="gki-fracao__num">3</span>
                    <span className="gki-fracao__barra" aria-hidden />
                    <span className="gki-fracao__den">5</span>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-fracao gki-fracao--inline">
                    <span className="gki-fracao__num">3 &middot; 3</span>
                    <span className="gki-fracao__barra" aria-hidden />
                    <span className="gki-fracao__den">5 &middot; 5</span>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-fracao gki-fracao--inline">
                    <span className="gki-fracao__num">
                      3<sup>2</sup>
                    </span>
                    <span className="gki-fracao__barra" aria-hidden />
                    <span className="gki-fracao__den">
                      5<sup>2</sup>
                    </span>
                  </span>
                  <span className="gki-produto-base__igual">=</span>
                  <span className="gki-produto-base__parte">
                    3<sup>2</sup> : 5<sup>2</sup>
                  </span>
                </div>
                <p className="mb-4 indent-6">
                  Note que (3 : 5)<sup>2</sup> = 3<sup>2</sup> : 5<sup>2</sup>.
                </p>
                <p className="mb-4 indent-6">
                  Portanto, para elevar um quociente de números racionais a um expoente, podemos elevar o dividendo e o divisor a esse mesmo expoente. Ou seja:
                </p>
                <p
                  className="gki-potencia-pill gki-potencia-pill--regua"
                  aria-label="a dividido por b, elevado a m, é igual a a elevado a m dividido por b elevado a m, em que b diferente de zero"
                >
                  (<em>a</em> : <em>b</em>)
                  <sup>
                    <em>m</em>
                  </sup>{' '}
                  = <em>a</em>
                  <sup>
                    <em>m</em>
                  </sup>{' '}
                  : <em>b</em>
                  <sup>
                    <em>m</em>
                  </sup>
                  <span className="gki-potencia-pill__ou">ou</span>
                  <span className="gki-fracao-expo">
                    <span className="gki-fracao gki-fracao--inline">
                      <span className="gki-fracao__num">
                        <em>a</em>
                      </span>
                      <span className="gki-fracao__barra" aria-hidden />
                      <span className="gki-fracao__den">
                        <em>b</em>
                      </span>
                    </span>
                    <sup>
                      <em>m</em>
                    </sup>
                  </span>{' '}
                  ={' '}
                  <span className="gki-fracao gki-fracao--inline">
                    <span className="gki-fracao__num">
                      <em>a</em>
                      <sup>
                        <em>m</em>
                      </sup>
                    </span>
                    <span className="gki-fracao__barra" aria-hidden />
                    <span className="gki-fracao__den">
                      <em>b</em>
                      <sup>
                        <em>m</em>
                      </sup>
                    </span>
                  </span>
                  , em que <em>b</em> &ne; 0
                </p>

                <p className="mb-4 indent-6"><strong>Exemplos</strong>: potência de um quociente</p>
                <ul
                  className="list-disc ml-6 mb-6"
                  style={{ ['--list-marker-color' as string]: '#7f60a9' }}
                >
                  <li>
                    (9 : 8)<sup>4</sup> = 9<sup>4</sup> : 8<sup>4</sup>
                  </li>
                  <li>
                    [(-15) : (-3)]<sup>7</sup> = (-15)<sup>7</sup> : (-3)<sup>7</sup>
                  </li>
                </ul>

                <Pagination currentPage={16} expandToBookColumn />

             
                  <p className="mb-4 indent-6"><strong>Observação:</strong></p>
                    <p className="mb-4 indent-6">É fundamental compreender que <strong>não existem propriedades específicas para a adição ou a subtração de potências</strong>. Nessas operações, não podemos aplicar as propriedades que estudamos até aqui para manipular as bases ou os expoentes.</p>
      
                    <h4 className="titulo-sas mb-4 mt-6">Expoente zero</h4>
              
                <p className="mb-4 indent-6">
                  Analise a seguinte divisão de potência: 3<sup>4</sup> : 3<sup>4</sup>.</p> 
                  <p className="mb-4 indent-6"> Vamos resolvê-la de duas maneiras.</p>
                <p className="mb-4 indent-6">
                  <strong>Primeira maneira</strong>: usando a definição de potência.
                </p>
                <p className="text-center font-bold text-lg my-4">
                  3<sup>4</sup> : 3<sup>4</sup> = 81 : 81 = 1
                </p>
                <p className="mb-4 indent-6">
                  <strong>Segunda maneira</strong>: usando a propriedade da divisão de potências de mesma base.
                </p>
                <p className="text-center font-bold text-lg my-4">
                  3<sup>4</sup> : 3<sup>4</sup> = 3<sup>4-4</sup> = 3<sup>0</sup>
                </p>
                <p className="mb-4 indent-6">
                  Sendo assim, se compararmos as duas formas de resolução, concluímos que 3<sup>0</sup> = 1.</p> 
                  <p className="mb-4 indent-6"> De forma geral, podemos definir que qualquer potência de base racional diferente de 0 e expoente 0 é igual a 1. Sendo assim:</p>
                <p className="gki-potencia-pill" aria-label="a elevado a zero é igual a 1, em que a diferente de zero">
                  <em>a</em>
                  <sup>0</sup> = 1, em que <em>a</em> &ne; 0
                </p>


                <h4 className="titulo-sas mb-4 mt-6">Escrevendo números como produto de potências</h4>
                <p className="mb-4 indent-6">
                  Até agora, estudamos o cálculo de potências e aplicamos suas propriedades. Mas, em algumas situações, precisamos fazer o caminho contrário, isto é, em vez de calcular uma potência, escrevemos um número como produto de potências.
                </p>
                <p className="mb-4 indent-6">
                  Para isso, utilizamos a decomposição em fatores primos e as propriedades da potenciação.</p>
                  <p className="mb-4 indent-6"> Observe como podemos utilizar os números primos para compor números na forma de produto de potências.</p>

                <p className="mb-4 indent-6">
                  <strong>Exemplo 1</strong>: decompondo 72 em fatores primos e escrevendo na forma de potência
                </p>
                <p className="text-center my-4">
                  72 : 2 = 36<br />
                  36 : 2 = 18<br />
                  18 : 2 = 9<br />
                  9 : 3 = 3<br />
                  3 : 3 = 1<br />
                  Logo <br />
                  72 = 2 &middot; 2 &middot; 2 &middot; 3 &middot; 3<br />
                  Assim, a decomposição em fatores primos de 72 é:<br />
                  72 = 2<sup>3</sup> &middot; 3<sup>2</sup>
                </p>


                <Pagination currentPage={17} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <div>
                      <p className="mb-2">
                        <strong>Questão 1</strong>
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            (questions.find((q) => q.id === 'c4_q8') as { correctAnswer?: string } | undefined)
                              ?.correctAnswer ?? '',
                        }}
                      />
                    </div>
                  }
                />

                <p className="mb-4 indent-6">
                  Podemos representar essa decomposição de fatores primos em uma árvore de fatores:
                </p>

                <p className="gki-arvore-titulo">Conteúdo da árvore (estrutura esperada):</p>
                <div className="gki-arvore-fatores">
                  <img
                    className="gki-arvore-fatores__img"
                    src={capAsset('images/page_9_img_197_98.png')}
                    alt="Diagrama de árvore mostrando a fatoração do número 72 em seus fatores primos: 2, 2, 2, 3, 3."
                  />
                  <div className="gki-arvore-fatores__expressao">
                    <p className="gki-arvore-fatores__rotulo">Expressão final:</p>
                    <p className="gki-arvore-fatores__formula">
                      72 = 2<sup>3</sup> &middot; 3<sup>2</sup>
                    </p>
                  </div>
                </div>

                <p className="mb-4 indent-6">
                  <strong>Exemplo 2</strong>: decompondo 100 em fatores primos e escrevendo na forma de potência
                </p>
                <div
                  className="gki-fatoracao"
                  role="img"
                  aria-label="Decomposição de 100 em fatores primos: 2, 2, 5 e 5"
                >
                  <div className="gki-fatoracao__linha">
                    <span className="gki-fatoracao__num">100</span>
                    <span className="gki-fatoracao__fator">2</span>
                  </div>
                  <div className="gki-fatoracao__linha">
                    <span className="gki-fatoracao__num">50</span>
                    <span className="gki-fatoracao__fator">2</span>
                  </div>
                  <div className="gki-fatoracao__linha">
                    <span className="gki-fatoracao__num">25</span>
                    <span className="gki-fatoracao__fator">5</span>
                  </div>
                  <div className="gki-fatoracao__linha gki-fatoracao__linha--ultimo-fator">
                    <span className="gki-fatoracao__num">5</span>
                    <span className="gki-fatoracao__fator">5</span>
                  </div>
                  <div className="gki-fatoracao__linha gki-fatoracao__linha--resto">
                    <span className="gki-fatoracao__num">1</span>
                    <span className="gki-fatoracao__fator" aria-hidden />
                  </div>
                </div>
                <p className="mb-4 indent-6">
                  Logo: 100 = 2 &middot; 2 &middot; 5 &middot; 5</p> 
                  <p className="mb-4 indent-6"> Assim, a decomposição em fatores primos de 100 é 100 = 2<sup>2</sup> &middot; 5<sup>2</sup>.
                </p>

                <div className="gki-secao-titulo mb-4 mt-6" role="heading" aria-level={2}>
                  <span className="gki-secao-titulo__setas" aria-hidden>
                    ≫
                  </span>
                  <span className="gki-secao-titulo__wrap">
                    <span className="gki-secao-titulo__fundo" aria-hidden />
                    <span className="gki-secao-titulo__frente">AGORA É COM VOCÊ</span>
                  </span>
                </div>

              

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      1
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Aplicando a definição de potência, calcule os valores a seguir.
                    </p>
                  </div>

                  <ol className="gki-agora-questao__itens">
                    {(
                      [
                        { id: 'c4_q8_a', letter: 'a', prompt: <>7<sup>2</sup></> },
                        { id: 'c4_q8_b', letter: 'b', prompt: <>(-5)<sup>3</sup></> },
                        {
                          id: 'c4_q8_c',
                          letter: 'c',
                          prompt: (
                            <>
                              (
                              <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                                <span className="gki-fracao__num">2</span>
                                <span className="gki-fracao__barra" aria-hidden />
                                <span className="gki-fracao__den">9</span>
                              </span>
                              )<sup>2</sup>
                            </>
                          ),
                        },
                        { id: 'c4_q8_d', letter: 'd', prompt: <>0<sup>6</sup></> },
                        { id: 'c4_q8_e', letter: 'e', prompt: <>6<sup>0</sup></> },
                      ] as const
                    ).map((item) => (
                      <li key={item.id} className="gki-agora-questao__item">
                        <span className="gki-agora-questao__letra">{item.letter})</span>
                        <span className="gki-agora-questao__prompt">{item.prompt}</span>
                        <textarea
                          className="gki-agora-questao__campo"
                          rows={2}
                          value={(userAnswers[item.id] as string) || ''}
                          onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                          aria-label={`Item ${item.letter}`}
                          placeholder=" "
                        />
                      </li>
                    ))}
                  </ol>
                </section>

                <Pagination currentPage={18} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2">
                          <strong>Questão 2</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q9') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-2">
                          <strong>Questão 3</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q10') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                    </div>
                  }
                />

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      2
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Usando as propriedades de multiplicação e divisão de potências, reescreva as
                      expressões na forma de uma única potência.
                    </p>
                  </div>
                  <ol className="gki-agora-questao__itens">
                    {(
                      [
                        {
                          id: 'c4_q9_a',
                          letter: 'a',
                          prompt: (
                            <>
                              (-
                              <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                                <span className="gki-fracao__num">1</span>
                                <span className="gki-fracao__barra" aria-hidden />
                                <span className="gki-fracao__den">3</span>
                              </span>
                              )<sup>4</sup> &middot; (-
                              <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                                <span className="gki-fracao__num">1</span>
                                <span className="gki-fracao__barra" aria-hidden />
                                <span className="gki-fracao__den">3</span>
                              </span>
                              )<sup>5</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q9_b',
                          letter: 'b',
                          prompt: (
                            <>
                              <em>a</em>
                              <sup>3</sup> &middot; <em>a</em> &middot; <em>a</em>
                              <sup>6</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q9_c',
                          letter: 'c',
                          prompt: (
                            <>
                              (0,3)<sup>13</sup> : (0,3)<sup>2</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q9_d',
                          letter: 'd',
                          prompt: (
                            <span className="gki-fracao gki-fracao--inline">
                              <span className="gki-fracao__num">
                                (0,2)<sup>27</sup>
                              </span>
                              <span className="gki-fracao__barra" aria-hidden />
                              <span className="gki-fracao__den">
                                (
                                <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                                  <span className="gki-fracao__num">1</span>
                                  <span className="gki-fracao__barra" aria-hidden />
                                  <span className="gki-fracao__den">5</span>
                                </span>
                                )<sup>19</sup>
                              </span>
                            </span>
                          ),
                        },
                      ] as const
                    ).map((item) => (
                      <li key={item.id} className="gki-agora-questao__item">
                        <span className="gki-agora-questao__letra">{item.letter})</span>
                        <span className="gki-agora-questao__prompt">{item.prompt}</span>
                        <textarea
                          className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                          rows={3}
                          value={(userAnswers[item.id] as string) || ''}
                          onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                          aria-label={`Questão 2, item ${item.letter}`}
                          placeholder=" "
                        />
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      3
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Transforme as expressões em uma única potência.
                    </p>
                  </div>
                  <ol className="gki-agora-questao__itens">
                    {(
                      [
                        {
                          id: 'c4_q10_a',
                          letter: 'a',
                          prompt: (
                            <>
                              [(-3)<sup>4</sup>]<sup>5</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q10_b',
                          letter: 'b',
                          prompt: (
                            <>
                              {'{'}[(-7)<sup>3</sup>]<sup>4</sup>{'}'}
                              <sup>6</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q10_c',
                          letter: 'c',
                          prompt: (
                            <>
                              [(0,1)<sup>2</sup>]
                              <sup>
                                5<sup>0</sup>
                              </sup>
                            </>
                          ),
                        },
                      ] as const
                    ).map((item) => (
                      <li key={item.id} className="gki-agora-questao__item">
                        <span className="gki-agora-questao__letra">{item.letter})</span>
                        <span className="gki-agora-questao__prompt">{item.prompt}</span>
                        <textarea
                          className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                          rows={3}
                          value={(userAnswers[item.id] as string) || ''}
                          onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                          aria-label={`Questão 3, item ${item.letter}`}
                          placeholder=" "
                        />
                      </li>
                    ))}
                  </ol>
                </section>

                <Pagination currentPage={19} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2">
                          <strong>Questão 4</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q11') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-2">
                          <strong>Questão 5</strong>
                        </p>
                        <p>
                          <strong>d)</strong> II e III. Todo número diferente de zero elevado a zero é
                          igual a 1; portanto, apenas as sentenças II e III são verdadeiras.
                        </p>
                      </div>
                    </div>
                  }
                />

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      4
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Usando as propriedades, encontre o valor das seguintes potências.
                    </p>
                  </div>
                  <ol className="gki-agora-questao__itens">
                    {(
                      [
                        {
                          id: 'c4_q11_a',
                          letter: 'a',
                          prompt: (
                            <>
                              (3 &middot; 5)<sup>2</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q11_b',
                          letter: 'b',
                          prompt: (
                            <>
                              (7 &middot; 2)<sup>3</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q11_c',
                          letter: 'c',
                          prompt: (
                            <>
                              (10 : 2)<sup>4</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q11_d',
                          letter: 'd',
                          prompt: (
                            <>
                              (6 : 3)<sup>1</sup>
                            </>
                          ),
                        },
                      ] as const
                    ).map((item) => (
                      <li key={item.id} className="gki-agora-questao__item">
                        <span className="gki-agora-questao__letra">{item.letter})</span>
                        <span className="gki-agora-questao__prompt">{item.prompt}</span>
                        <textarea
                          className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                          rows={3}
                          value={(userAnswers[item.id] as string) || ''}
                          onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                          aria-label={`Questão 4, item ${item.letter}`}
                          placeholder=" "
                        />
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      5
                    </span>
                    <div className="gki-agora-questao__enunciado">
                      <p className="mb-3">Observe as seguintes sentenças:</p>
                      <ol className="gki-agora-questao__romanos">
                        <li>
                          I. 5<sup>0</sup> = 0
                        </li>
                        <li>
                          II. 7<sup>0</sup> = 1
                        </li>
                        <li>
                          III.{' '}
                          (
                          <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                            <span className="gki-fracao__num">1</span>
                            <span className="gki-fracao__barra" aria-hidden />
                            <span className="gki-fracao__den">3</span>
                          </span>
                          )<sup>0</sup> = 1
                        </li>
                        <li>
                          IV.{' '}
                          (
                          <span className="gki-fracao gki-fracao--inline gki-fracao--texto">
                            <span className="gki-fracao__num">2</span>
                            <span className="gki-fracao__barra" aria-hidden />
                            <span className="gki-fracao__den">5</span>
                          </span>
                          )<sup>0</sup> = 0
                        </li>
                      </ol>
                      <p className="mt-3 mb-0">Quais delas são verdadeiras?</p>
                    </div>
                  </div>
                  <QuestionRenderer
                    question={getQuestionById('c4_q12')}
                    userAnswers={userAnswers}
                    onAnswerChange={handleAnswerChange}
                    showResults={showTeacherView}
                    hidePrompt
                  />
                </section>

                <Pagination currentPage={20} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2">
                          <strong>Questão 6</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q13') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-2">
                          <strong>Pratique — Questão 1</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              'a) Adicionando os expoentes das multiplicações e multiplicando os expoentes da potência de potência, temos: (2<sup>9</sup> &middot; 2<sup>11</sup> &middot; 2<sup>3</sup>) : (2<sup>7</sup>)<sup>3</sup> = 2<sup>23</sup> : 2<sup>21</sup>. Agora, subtraímos os expoentes e obtemos: 2<sup>2</sup> = 4.',
                          }}
                        />
                      </div>
                    </div>
                  }
                />

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      6
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Em cada item, decomponha o número em fatores primos e, em seguida, escreva-o na
                      forma de produto de potências.
                    </p>
                  </div>
                  <ol className="gki-agora-questao__itens">
                    {(
                      [
                        { id: 'c4_q13_a', letter: 'a', prompt: <>240</> },
                        { id: 'c4_q13_b', letter: 'b', prompt: <>360</> },
                        { id: 'c4_q13_c', letter: 'c', prompt: <>450</> },
                      ] as const
                    ).map((item) => (
                      <li key={item.id} className="gki-agora-questao__item">
                        <span className="gki-agora-questao__letra">{item.letter})</span>
                        <span className="gki-agora-questao__prompt">{item.prompt}</span>
                        <textarea
                          className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                          rows={4}
                          value={(userAnswers[item.id] as string) || ''}
                          onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                          aria-label={`Questão 6, item ${item.letter}`}
                          placeholder=" "
                        />
                      </li>
                    ))}
                  </ol>
                </section>

                <div className="gki-secao-titulo mb-4 mt-6" role="heading" aria-level={2}>
                  <span className="gki-secao-titulo__setas" aria-hidden>
                    ≫
                  </span>
                  <span className="gki-secao-titulo__wrap">
                    <span className="gki-secao-titulo__fundo" aria-hidden />
                    <span className="gki-secao-titulo__frente">PRATIQUE</span>
                  </span>
                </div>

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      1
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Aplicando as propriedades de potenciação, calcule o valor das expressões
                      numéricas:
                    </p>
                  </div>
                  <ol className="gki-agora-questao__itens">
                    {(
                      [
                        {
                          id: 'c4_q14_a',
                          letter: 'a',
                          prompt: (
                            <>
                              (2<sup>9</sup> &middot; 2<sup>11</sup> &middot; 2<sup>3</sup>) : (2
                              <sup>7</sup>)<sup>3</sup>
                            </>
                          ),
                        },
                      ] as const
                    ).map((item) => (
                      <li key={item.id} className="gki-agora-questao__item">
                        <span className="gki-agora-questao__letra">{item.letter})</span>
                        <span className="gki-agora-questao__prompt">{item.prompt}</span>
                        <textarea
                          className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                          rows={4}
                          value={(userAnswers[item.id] as string) || ''}
                          onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                          aria-label={`Pratique, questão 1, item ${item.letter}`}
                          placeholder=" "
                        />
                      </li>
                    ))}
                  </ol>
                </section>

                <Pagination currentPage={21} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2">
                          <strong>Pratique — Questão 1 (b)</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              'b) Adicionando os expoentes das multiplicações e multiplicando os expoentes da potência de potência, temos: [(0,4)<sup>2</sup>]<sup>10</sup> : [(0,4)<sup>9</sup> &middot; (0,4)<sup>7</sup> &middot; (0,4)] = (0,4)<sup>20</sup> : (0,4)<sup>17</sup>. Agora, subtraímos os expoentes e obtemos: (0,4)<sup>3</sup> = 0,064.',
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-2">
                          <strong>Questão 2</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q15') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-2">
                          <strong>Questão 3</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q16') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-2">
                          <strong>Questão 4</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q17') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                    </div>
                  }
                />

                <section className="gki-agora-questao mb-8">
                  <ol className="gki-agora-questao__itens">
                    <li className="gki-agora-questao__item">
                      <span className="gki-agora-questao__letra">b)</span>
                      <span className="gki-agora-questao__prompt">
                        [(0,4)<sup>2</sup>]<sup>10</sup> : [(0,4)<sup>9</sup> &middot; (0,4)
                        <sup>7</sup> &middot; (0,4)]
                      </span>
                      <textarea
                        className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                        rows={4}
                        value={(userAnswers['c4_q14_b'] as string) || ''}
                        onChange={(event) => handleAnswerChange('c4_q14_b', event.target.value)}
                        aria-label="Pratique, questão 1, item b"
                        placeholder=" "
                      />
                    </li>
                  </ol>
                </section>

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      2
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Considerando que a &middot; b = 20, calcule o valor de a<sup>2</sup> &middot; b
                      <sup>2</sup>.
                    </p>
                  </div>
                  <textarea
                    className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                    rows={4}
                    value={(userAnswers['c4_q15'] as string) || ''}
                    onChange={(event) => handleAnswerChange('c4_q15', event.target.value)}
                    aria-label="Pratique, questão 2"
                    placeholder=" "
                  />
                </section>

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      3
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Multiplicando as potências, reduza cada expressão a seguir a uma só base.
                    </p>
                  </div>
                  <ol className="gki-agora-questao__itens">
                    {(
                      [
                        {
                          id: 'c4_q16_a',
                          letter: 'a',
                          prompt: (
                            <>
                              4<sup>3</sup> &middot; 27<sup>2</sup>
                            </>
                          ),
                        },
                        {
                          id: 'c4_q16_b',
                          letter: 'b',
                          prompt: (
                            <>
                              8 &middot; 2<sup>17</sup> &middot; 25 &middot; 5<sup>18</sup>
                            </>
                          ),
                        },
                      ] as const
                    ).map((item) => (
                      <li key={item.id} className="gki-agora-questao__item">
                        <span className="gki-agora-questao__letra">{item.letter})</span>
                        <span className="gki-agora-questao__prompt">{item.prompt}</span>
                        <textarea
                          className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                          rows={4}
                          value={(userAnswers[item.id] as string) || ''}
                          onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                          aria-label={`Pratique, questão 3, item ${item.letter}`}
                          placeholder=" "
                        />
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      4
                    </span>
                    <div className="gki-agora-questao__enunciado">
                      <p className="mb-0 flex flex-wrap items-center gap-2">
                        <span>Simplifique:</span>
                        <span className="gki-fracao gki-fracao--texto">
                          <span className="gki-fracao__num">
                            [(2)<sup>3</sup>]<sup>5</sup> + [(2)<sup>3</sup>]<sup>5</sup>
                          </span>
                          <span className="gki-fracao__barra" aria-hidden />
                          <span className="gki-fracao__den">
                            4<sup>4</sup> + 4<sup>4</sup> + 4<sup>4</sup> + 4<sup>4</sup>
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <textarea
                    className="gki-agora-questao__campo gki-agora-questao__campo--caixa mt-3"
                    rows={5}
                    value={(userAnswers['c4_q17'] as string) || ''}
                    onChange={(event) => handleAnswerChange('c4_q17', event.target.value)}
                    aria-label="Pratique, questão 4"
                    placeholder=" "
                  />
                </section>

                <Pagination currentPage={22} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2">
                          <strong>Questão 5</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q18') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                    </div>
                  }
                />

                <section className="gki-agora-questao mb-8">
                  <div className="gki-agora-questao__cabecalho">
                    <span className="gki-agora-questao__num" aria-hidden>
                      5
                    </span>
                    <p className="gki-agora-questao__enunciado">
                      Aplicando a decomposição em fatores primos e as propriedades da potenciação,
                      resolva as questões.
                    </p>
                  </div>

                  <div className="gki-agora-questao__bloco">
                    <p className="gki-agora-questao__item-titulo">
                      <span className="gki-agora-questao__letra">a)</span> Decomponha os seguintes
                      números em fatores primos e escreva-os na forma de produtos de potências.
                    </p>
                    <ol className="gki-agora-questao__itens">
                      {(
                        [
                          { id: 'c4_q18_252', label: '252' },
                          { id: 'c4_q18_420', label: '420' },
                          { id: 'c4_q18_560', label: '560' },
                        ] as const
                      ).map((item) => (
                        <li key={item.id} className="gki-agora-questao__item">
                          <span className="gki-agora-questao__prompt">{item.label}</span>
                          <textarea
                            className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                            rows={5}
                            value={(userAnswers[item.id] as string) || ''}
                            onChange={(event) => handleAnswerChange(item.id, event.target.value)}
                            aria-label={`Pratique, questão 5, item a, número ${item.label}`}
                            placeholder=" "
                          />
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="gki-agora-questao__bloco">
                    <p className="gki-agora-questao__item-titulo">
                      <span className="gki-agora-questao__letra">b)</span> Utilizando as
                      decomposições obtidas,
                    </p>
                    <ul className="gki-agora-questao__subitens">
                      <li className="gki-agora-questao__subitem">
                        <span className="gki-agora-questao__marcador" aria-hidden />
                        <div className="gki-agora-questao__subitem-corpo">
                          <p className="gki-agora-questao__subitem-texto">
                            indique quais números têm exatamente três fatores primos diferentes.
                          </p>
                          <textarea
                            className="gki-agora-questao__campo"
                            rows={2}
                            value={(userAnswers['c4_q18_b1'] as string) || ''}
                            onChange={(event) => handleAnswerChange('c4_q18_b1', event.target.value)}
                            aria-label="Pratique, questão 5, item b, fatores primos diferentes"
                            placeholder=" "
                          />
                        </div>
                      </li>
                      <li className="gki-agora-questao__subitem">
                        <span className="gki-agora-questao__marcador" aria-hidden />
                        <div className="gki-agora-questao__subitem-corpo">
                          <p className="gki-agora-questao__subitem-texto">
                            escreva o produto 252 &middot; 420 na forma de uma única expressão com
                            potências.
                          </p>
                          <textarea
                            className="gki-agora-questao__campo gki-agora-questao__campo--caixa"
                            rows={5}
                            value={(userAnswers['c4_q18_b2'] as string) || ''}
                            onChange={(event) => handleAnswerChange('c4_q18_b2', event.target.value)}
                            aria-label="Pratique, questão 5, item b, produto 252 · 420"
                            placeholder=" "
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                <Pagination currentPage={23} expandToBookColumn />

                <TeacherButton
                  visible={SHOW_TEACHER_BUTTON}
                  answers={
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2">
                          <strong>Questão 6</strong>
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (questions.find((q) => q.id === 'c4_q19') as { correctAnswer?: string } | undefined)
                                ?.correctAnswer ?? '',
                          }}
                        />
                      </div>
                    </div>
                  }
                />

                <section className="gki-agora-questao mb-8">
                  <div className="gki-q6-topo">
                    <div className="gki-q6-topo__texto">
                      <div className="gki-agora-questao__cabecalho">
                        <span className="gki-agora-questao__num" aria-hidden>
                          6
                        </span>
                        <div className="gki-agora-questao__enunciado">
                          <p className="mb-2">Uma máquina faz cópias de forma especial:</p>
                          <ol className="gki-agora-questao__romanos">
                            <li>I. A cada minuto, cada folha gera 2 novas cópias.</li>
                            <li>II. No início, há apenas 1 folha na máquina.</li>
                          </ol>
                        </div>
                      </div>

                      <div className="gki-agora-questao__bloco">
                        <p className="gki-agora-questao__item-titulo">
                          <span className="gki-agora-questao__letra">a)</span> Quantas folhas
                          existirão após 1 minuto?
                        </p>
                        <textarea
                          className="gki-agora-questao__campo"
                          rows={3}
                          value={(userAnswers['c4_q19_a'] as string) || ''}
                          onChange={(event) => handleAnswerChange('c4_q19_a', event.target.value)}
                          aria-label="Pratique, questão 6, item a"
                          placeholder=" "
                        />
                      </div>
                    </div>

                    <figure className="gki-q6-topo__figura">
                      <img
                        src={capAsset('images/page_15_img_369_83.png')}
                        alt="Pessoa com crachá e relógio vermelho interage com tela sensível ao toque de uma máquina, enquanto segura papéis brancos."
                      />
                      <figcaption className="legenda-imagem">zinkevych/stock.adobe.com</figcaption>
                    </figure>
                  </div>

                  <div className="gki-agora-questao__bloco">
                    <p className="gki-agora-questao__item-titulo">
                      <span className="gki-agora-questao__letra">b)</span> E após 2 minutos?
                    </p>
                    <textarea
                      className="gki-agora-questao__campo"
                      rows={3}
                      value={(userAnswers['c4_q19_b'] as string) || ''}
                      onChange={(event) => handleAnswerChange('c4_q19_b', event.target.value)}
                      aria-label="Pratique, questão 6, item b"
                      placeholder=" "
                    />
                  </div>

                  <div className="gki-agora-questao__bloco">
                    <p className="gki-agora-questao__item-titulo">
                      <span className="gki-agora-questao__letra">c)</span> É possível escrever essa
                      situação usando potência? Como você escreveria?
                    </p>
                    <textarea
                      className="gki-agora-questao__campo"
                      rows={3}
                      value={(userAnswers['c4_q19_c'] as string) || ''}
                      onChange={(event) => handleAnswerChange('c4_q19_c', event.target.value)}
                      aria-label="Pratique, questão 6, item c"
                      placeholder=" "
                    />
                  </div>

                  <div className="gki-agora-questao__bloco">
                    <p className="gki-agora-questao__item-titulo">
                      <span className="gki-agora-questao__letra">d)</span> Complete a tabela a
                      seguir.
                    </p>
                    <div className="gki-tabela-wrap">
                      <table className="gki-tabela-potencia">
                        <thead>
                          <tr>
                            <th scope="col">Minuto</th>
                            <th scope="col">Quantidade de folhas</th>
                            <th scope="col">Potência</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[0, 1, 2, 3, 4, 5].map((minuto) => (
                            <tr key={minuto}>
                              <td className="gki-tabela-potencia__minuto">{minuto}</td>
                              <td>
                                {minuto === 0 ? (
                                  <span className="gki-tabela-potencia__fixo">1</span>
                                ) : (
                                  <input
                                    type="text"
                                    className="gki-tabela-potencia__input"
                                    value={(userAnswers[`c4_q19_d_${minuto}_qtd`] as string) || ''}
                                    onChange={(event) =>
                                      handleAnswerChange(
                                        `c4_q19_d_${minuto}_qtd`,
                                        event.target.value,
                                      )
                                    }
                                    aria-label={`Quantidade de folhas no minuto ${minuto}`}
                                  />
                                )}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="gki-tabela-potencia__input"
                                  value={(userAnswers[`c4_q19_d_${minuto}_pot`] as string) || ''}
                                  onChange={(event) =>
                                    handleAnswerChange(`c4_q19_d_${minuto}_pot`, event.target.value)
                                  }
                                  aria-label={`Potência no minuto ${minuto}`}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="gki-agora-questao__bloco">
                    <p className="gki-agora-questao__item-titulo">
                      <span className="gki-agora-questao__letra">e)</span> Após 10 minutos, quantas
                      folhas haverá?
                    </p>
                    <textarea
                      className="gki-agora-questao__campo"
                      rows={3}
                      value={(userAnswers['c4_q19_e'] as string) || ''}
                      onChange={(event) => handleAnswerChange('c4_q19_e', event.target.value)}
                      aria-label="Pratique, questão 6, item e"
                      placeholder=" "
                    />
                  </div>
                </section>

              </>
            }
          />
        </div>

        <Footer />
      </div>

      {currentPage > 1 && (
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

export default BookCap04;