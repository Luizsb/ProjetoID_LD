// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Veja exemplos de hipóteses e de respostas não científicas a algumas perguntas.","startPage":1,"pageCount":18,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}

import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import EscolaDigital from '@player/components/EscolaDigital';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import Footer from '@player/components/Footer';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import DialogarEConhecer from '@player/components/DialogarEConhecer';
import BlocoPapelTexto from '@player/components/BlocoPapelTexto';
import CaixaDestaque from '@player/components/CaixaDestaque';
import AgoraEComVoce from '@player/components/AgoraEComVoce';
import FiqueLigado from '@player/components/FiqueLigado';
import OrganizeAsIdeias from '@player/components/OrganizeAsIdeias';
import Observacao from '@player/components/Observacao';
import ParaIrAlem from '@player/components/ParaIrAlem';
import ExperimentoPlantas from '@player/components/ExperimentoPlantas';
import Investigue from '@player/components/Investigue';
import AreaDesenho from '@player/components/AreaDesenho';
import LerEDescobrir from '@player/components/LerEDescobrir';
import ExploreSeusConhecimentos from '@player/components/ExploreSeusConhecimentos';
import MergulhandoFundo from '@player/components/MergulhandoFundo';
import ParaRelembrar from '@player/components/ParaRelembrar';
import RelembrarCena from '@player/components/RelembrarCena';
import NesteCapituloVoceEstudou from '@player/components/NesteCapituloVoceEstudou';
import AcesseAEureka from '@player/components/AcesseAEureka';
import ComecoDeConversa from '@player/components/ComecoDeConversa';
import Glossario from '@player/components/Glossario';
import CaixaNota from '@player/components/CaixaNota';
import { Question } from '@player/types/questions';

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/SAS/livros/SAS_AT27_AF8_L1_LDIDA_MAT_AL_IMP_C1/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const SHOW_TEACHER_BUTTON = true;

// Definição local das questões do capítulo para garantir o encapsulamento
const chapterQuestions: Question[] = [
  {
    id: 'ch1_q1',
    type: 'text-input',
    number: 1,
    question: 'Qual é o menor número natural? E o maior?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'O menor número natural é o zero. Não existe maior número natural, pois todo número natural possui um sucessor.',
  },
  {
    id: 'ch1_q2',
    type: 'text-input',
    number: 2,
    question: 'Todo número inteiro possui um antecessor e um sucessor inteiro?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Sim, todo número inteiro possui um antecessor e um sucessor inteiro. Por exemplo, o antecessor de 0 é -1, e seu sucessor é 1.',
  },
  {
    id: 'ch1_q3',
    type: 'text-input',
    number: 3,
    question: 'Qual é o menor número inteiro? E o maior?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Uma vez que todo número inteiro possui um antecessor e um sucessor inteiro, não é possível determinar o maior nem o menor número inteiro.',
  },
  {
    id: 'ch1_qd4',
    type: 'text-input',
    number: 4,
    question:
      'Por que, na definição do conjunto dos números racionais, aparece como condição que <strong>b</strong> ∈ ℤ*?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Tem-se como condição que <b>b</b> deve ser um número inteiro diferente de zero porque não existe divisão por zero.',
  },
  {
    id: 'ch1_qa1',
    type: 'text-input',
    number: 1,
    question:
      'Escreva os números a seguir na região adequada do diagrama anterior. ',
    correctAnswer: 'Respostas no diagrama.',
  },
  {
    id: 'ch1_qa2',
    type: 'fill-blanks',
    number: 2,
    question:
      'Complete as sentenças com o símbolo ∈ (pertence) ou ∉ (não pertence), indicando se o número faz parte ou não do conjunto numérico indicado.',
    items: [
      { letter: 'a', fragments: ['−1,2 ', ' ℚ₊'], correctAnswers: ['∉'] },
      { letter: 'b', fragments: ['0 ', ' ℚ₊'], correctAnswers: ['∈'] },
      { letter: 'c', fragments: ['0 ', ' ℚ₊*'], correctAnswers: ['∉'] },
      {
        letter: 'd',
        fragments: ['−<span class="fracao"><span>1</span><span>2</span></span> ', ' ℚ₋*'],
        correctAnswers: ['∈'],
      },
      { letter: 'e', fragments: ['0,1 ', ' ℚ₋*'], correctAnswers: ['∉'] },
      { letter: 'f', fragments: ['−0,8 ', ' ℚ₋*'], correctAnswers: ['∈'] },
      {
        letter: 'g',
        fragments: ['1,32<span class="dizima-barra">41</span> ', ' ℚ₊'],
        correctAnswers: ['∈'],
      },
      {
        letter: 'h',
        fragments: ['<span class="fracao"><span>3</span><span>8</span></span> ', ' ℚ₋*'],
        correctAnswers: ['∉'],
      },
      { letter: 'i', fragments: ['0 ', ' ℚ*'], correctAnswers: ['∉'] },
    ],
  },
  {
    id: 'ch1_q4',
    type: 'multiple-select',
    number: 1,
    question:
      'Considere o trabalho feito por Aline Ghilardi e por outros cientistas e marque <span class="destaque-x">X</span> nas principais características necessárias para desenvolver esse trabalho.',
    options: ['criatividade', 'curiosidade', 'desatenção', 'observação', 'preguiça'],
    correctAnswer: [0, 1, 3],
    columns: 3,
  },
  {
    id: 'ch1_q5',
    type: 'text-input',
    number: 1,
    question:
      'Em cada item abaixo, escreva <strong>H</strong> na frase que corresponde à hipótese e <strong>NC</strong> na frase que corresponde à ideia não científica.',
    subQuestions: [
      {
        letter: 'a',
        question: 'Dizemos que o Sol nasce porque:',
        subItems: [
          {
            label: 'ele ilumina a parte da Terra em que nós estamos.',
            correctAnswer: 'H',
            circleInput: true,
          },
          {
            label: 'o deus Sol acorda e começa a passear pelo céu.',
            correctAnswer: 'NC',
            circleInput: true,
          },
        ],
      },
      {
        letter: 'b',
        question: 'As plantas murcham:',
        subItems: [
          {
            label: 'quando não recebem água em quantidade suficiente.',
            correctAnswer: 'H',
            circleInput: true,
          },
          {
            label: 'quando uma pessoa tem inveja do dono das plantas.',
            correctAnswer: 'NC',
            circleInput: true,
          },
        ],
      },
      {
        letter: 'c',
        question: 'Sobre a relação entre ratos e morcegos:',
        subItems: [
          {
            label: 'Ratos viram morcegos quando querem voar.',
            correctAnswer: 'NC',
            circleInput: true,
          },
          {
            label: 'Ratos e morcegos são animais diferentes.',
            correctAnswer: 'H',
            circleInput: true,
          },
        ],
      },
    ],
  },
  {
    id: 'ch1_q8',
    type: 'multiple-select',
    number: 2,
    question:
      'Imagine que você é cientista e está pesquisando sobre plantas. Marque <span class="destaque-x">X</span> nas opções que representam boas fontes de pesquisa para formular hipóteses sobre por que as plantas murcham.',
    options: [
      'Cientistas que estudam plantas.',
      'Especialistas em folclore.',
      'Mágicos.',
      'Revistas e livros científicos sobre plantas.',
    ],
    correctAnswer: [0, 3],
    columns: 1,
  },
  {
    id: 'ch1_q9',
    type: 'text-input',
    number: 3,
    question:
      'Uma característica das hipóteses é que elas podem ser testadas, por exemplo, em experimentos científicos. O que você poderia fazer para descobrir se as plantas murcham ou não quando não recebem quantidade suficiente de água?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta pessoal.',
  },
  {
    id: 'ch1_q10',
    type: 'multiple-choice',
    question:
      '<span class="question-number">A.</span> Marque <span class="destaque-x">X</span> na hipótese que representa sua resposta a essa pergunta.',
    options: {
      a: 'A água salgada congela da mesma forma que a água sem sal.',
      b: 'A água salgada não congela da mesma forma que a água sem sal.',
      c: ''
    },
    correctAnswer: 'b',
    letter: 'A',
    teacherAnswer: 'Respostas pessoais.',
  },
  {
    id: 'ch1_q11',
    type: 'multiple-choice',
    question:
      '<span class="question-number">B.</span> Marque <span class="destaque-x">X</span> na dedução que pode ser feita com base na sua hipótese.',
    options: {
      a: 'Se colocadas em um congelador por 2 horas, a água salgada e a água sem sal vão congelar da mesma forma.',
      b: 'Se colocadas em um congelador por 2 horas, a água salgada e a água sem sal não vão congelar da mesma forma.',
      c: ''
    },
    correctAnswer: 'b',
    letter: 'B',
    teacherAnswer: 'Respostas pessoais.',
  },
  {
    id: 'ch1_qc',
    type: 'text-input',
    question: 'C.',
    correctAnswer: '<span class="question-number" style="font-weight:700">C.</span> Atividade prática.',
  },
  {
    id: 'ch1_q12',
    type: 'text-input',
    number: 4,
    question: 'Represente, por meio de desenho, como você acredita que os copos e os seus conteúdos estarão ao fim das duas horas no congelador.',
    placeholder: 'Descreva seu desenho aqui...',
    correctAnswer: 'Resposta pessoal.'
  },
  {
    id: 'ch1_q_passo5',
    type: 'text-input',
    number: 5,
    question: '5.',
    correctAnswer: 'Atividade prática.',
  },
  {
    id: 'ch1_q13',
    type: 'text-input',
    number: 6,
    question: 'Observe como os copos de água estão e responda às perguntas.',
    subQuestions: [
      {
        letter: 'a',
        question: 'Sua dedução se confirmou? Justifique.',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Respostas pessoais.',
      },
      {
        letter: 'b',
        question: 'Sua hipótese é válida ou não?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Resposta pessoal.',
      },
      {
        letter: 'c',
        question: 'Qual é a sua conclusão sobre esse experimento?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'Espera-se que, com o experimento, os alunos concluam que, diferentemente da água sem sal, a água salgada não congela totalmente.',
      },
    ],
  },
  {
    id: 'ch1_q16',
    type: 'text-input',
    number: 1,
    question: 'Por que Tijubina estava triste?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Porque a sua pele era cinza e sem graça para ir ao baile.',
  },
  {
    id: 'ch1_q17',
    type: 'text-input',
    number: 2,
    question: 'Como o problema de Tijubina foi resolvido?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Carâmbolo se sensibilizou com a situação de Tijubina e, no dia do baile, trocou de pele com ela.',
  },
  {
    id: 'ch1_q18',
    type: 'text-input',
    number: 3,
    question:
      'A história de Tijubina e Carâmbolo apresenta uma ideia não científica sobre a razão de o lagarto-cinzento balançar a cabeça. Identifique no texto e escreva abaixo essa ideia.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'O lagarto-cinzento balança a cabeça porque ficou chateado por não ter recebido de volta a pele verde.',
  },
  {
    id: 'ch1_q19',
    type: 'text-input',
    number: 4,
    question:
      'A explicação dada pela história de Tijubina e Carâmbolo para o movimento da cabeça do lagarto-cinzento poderia ser chamada de hipótese? Justifique sua resposta.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Não, pois se baseia em uma lenda, isto é, uma história criada, e não em uma pesquisa científica.',
  },
  {
    id: 'ch1_q20',
    type: 'text-input',
    number: 5,
    question: 'Que explicação o segundo texto traz para o balançar de cabeça do lagarto-cinzento?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'O lagarto-cinzento balança a cabeça para se comunicar por meio de sinais com outros lagartos.',
  },
  {
    id: 'ch1_qe1',
    type: 'text-input',
    number: 1,
    question:
      'Qual é o inverso da fração geratriz da dízima periódica 1,007777...?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '1,00777... = 1 + <span class="fracao"><span>7</span><span>900</span></span> = <span class="fracao"><span>907</span><span>900</span></span><br>O inverso de <span class="fracao"><span>907</span><span>900</span></span> é <span class="fracao"><span>900</span><span>907</span></span>.',
  },
  {
    id: 'ch1_qe2',
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
        correctAnswer:
          '2 · 3,1 + 3 · 2,8 − 5,6 ≈<br>6,2 + 8,4 − 5,6 ≈<br>14,6 − 5,6 ≈ 9',
      },
    ],
  },
  {
    id: 'ch1_mf1',
    type: 'text-input',
    number: 1,
    question: 'Resolva a expressão a seguir.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="fracao"><span>9</span><span>4</span></span> · <span class="fracao"><span>2108</span><span>900</span></span> + 58 · <span class="fracao"><span>12</span><span>29</span></span> = <span class="fracao"><span>527</span><span>100</span></span> + 24 = 5,27 + 24 = 29,27',
  },
  {
    id: 'ch1_mf2',
    type: 'multiple-choice',
    number: 2,
    question:
      'A expressão <span class="math-paren">(2 + <span class="fracao"><span>1</span><span>4</span></span>)</span> : <span class="math-paren">(2 − <span class="fracao"><span>1</span><span>4</span></span>)</span> + 1 dá origem a um decimal não exato, cuja soma dos seis primeiros algarismos da parte decimal é igual a',
    options: {
      a: 'a) 28.',
      b: 'b) 27.',
      c: 'c) 26.',
      d: 'd) 25.',
    },
    correctAnswer: 'b',
    teacherAnswer:
      '<span class="math-paren">(2 + <span class="fracao"><span>1</span><span>4</span></span>)</span> : <span class="math-paren">(2 − <span class="fracao"><span>1</span><span>4</span></span>)</span> + 1 = <span class="fracao"><span>9</span><span>4</span></span> : <span class="fracao"><span>7</span><span>4</span></span> + 1 = <span class="fracao"><span>9</span><span>4</span></span> · <span class="fracao"><span>4</span><span>7</span></span> + 1 = <span class="fracao"><span>9</span><span>7</span></span> + 1 = <span class="fracao"><span>16</span><span>7</span></span> = 2,285714...<br>Soma = 2 + 8 + 5 + 7 + 1 + 4 = 27',
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
              chapterTitle="E SE VOCÊ PUDESSE OUVIR A MATEMÁTICA?"
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
                <li>Reconhecer </li>
                <li>Identificar </li>
                <li>Localizar </li>
                <li>Relacionar </li>

              </ul>
            </div>
          </details>
          {/* <Poster
            imageSrc={capAsset('images/unidade.png')}
            creditLine1="Alexandr/stock.adobe.com"
            creditLine2=""
            creditAlign="center"
            alt="Unidade 1 — Percebendo o ambiente"
          /> */}
          <div className="p-8 md:p-12">
            <p className="mb-4 indent-6">
              O que a música e a Matemática têm em comum? Mais do
              que se pode imaginar.
            </p>
            <figure className="img-unidade">
              <img src={capAsset('images/imagemUnidade.png')} alt="" />
              <p className="legenda-barra">
                Ed Sheeran, cantor, compositor, ator e produtor
              </p>
            </figure>
            <ComecoDeConversa iconSrc={capAsset('images/selo-comeco-conversa.png')}>
              <ul className="comeco-conversa__lista list-disc">
                <li>
                  A música é um exemplo de aplicação da Matemática em que não há o uso explícito
                  de números. Discuta com seus colegas e apresente outras situações em que isso ocorre.
                </li>
                <li>
                  Você iniciará esta unidade relembrando alguns conjuntos de números – os naturais,
                  os inteiros e os racionais – para conhecer mais sobre o conjunto dos números reais.
                  O texto desta abertura apresenta alguns números. A qual conjunto numérico eles
                  pertencem?
                </li>
              </ul>
            </ComecoDeConversa>
          </div>
        </details>
        <Header marca="sas" badge="CAPÍTULO" chapterNumber={1} chapterTitle="Números reais, potenciação 
e radiciação" />

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
              content={
                <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                  Incentive os alunos a refletirem sobre o que é ciência e como os cientistas trabalham.
                  Explore as imagens de abertura para levantar os conhecimentos prévios da turma.
                </p>
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
            <Glossario
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
          <p className="mb-4 indent-6 font-bold text-center">
            Arsenais dos 5 países com mais ogivas nucleares no mundo
          </p>
          <img src={capAsset('images/pag4_img1.png')} alt="" className="w-full object-contain" />
          <p className="mt-2 text-[14px] text-slate-600">*quantidade de ogivas nucleares, segundo Instituto Internacional de Pesquisa da Paz de Estocolmo (Sipri) em janeiro de 2025.</p>
          <p className="mb-4 indent-6">
            Após o término do tratado New START, expirado em fevereiro de 2026, os países seguem sem
            um acordo que limite seus estoques, gerando certa instabilidade na política global. Veja, a seguir,
            os arsenais estimados para ambos os países.
          </p>

          <div className="infografico-arsenais" aria-label="Infográfico dos arsenais nucleares da Rússia e dos EUA">
            <article className="infografico-arsenais__coluna">
              <header className="infografico-arsenais__cabecalho">
                <span className="infografico-arsenais__bandeira infografico-arsenais__bandeira--ru" aria-hidden />
                <h3 className="infografico-arsenais__titulo">
                  RS-28 <strong>Sarmat</strong>
                </h3>
              </header>
              <div className="infografico-arsenais__corpo">
                <dl className="infografico-arsenais__lista">
                  <div><dt>Alcance:</dt><dd>13 mil km</dd></div>
                  <div><dt>Velocidade:</dt><dd>Até 24 mil km/h</dd></div>
                  <div><dt>No arsenal desde:</dt><dd>1970</dd></div>
                  <div><dt>Comprimento:</dt><dd>18,2 m</dd></div>
                  <div><dt>Diâmetro:</dt><dd>1,85 m</dd></div>
                  <div><dt>Peso de lançamento:</dt><dd>34,5 ton</dd></div>
                  <div><dt>Peso da ogiva:</dt><dd>3 ogivas de 670 kg cada</dd></div>
                </dl>
                <div className="infografico-arsenais__grafico">
                  <p className="infografico-arsenais__pais">Rússia</p>
                  <span className="infografico-arsenais__seta" aria-hidden />
                  <div className="infografico-arsenais__circulo infografico-arsenais__circulo--russia">
                    <strong>5 459</strong>
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
                  LGM-30G <strong>Minuteman III</strong>
                </h3>
              </header>
              <div className="infografico-arsenais__corpo">
                <dl className="infografico-arsenais__lista">
                  <div><dt>Alcance:</dt><dd>Entre 10 e 18 mil km</dd></div>
                  <div><dt>Velocidade:</dt><dd>Até 25 mil km/h</dd></div>
                  <div><dt>No arsenal desde:</dt><dd>2021</dd></div>
                  <div><dt>Comprimento:</dt><dd>35,3 m</dd></div>
                  <div><dt>Diâmetro:</dt><dd>3 m</dd></div>
                  <div><dt>Peso de lançamento:</dt><dd>208 ton</dd></div>
                  <div><dt>Peso da ogiva:</dt><dd>10 ton</dd></div>
                </dl>
                <div className="infografico-arsenais__grafico">
                  <p className="infografico-arsenais__pais">EUA</p>
                  <span className="infografico-arsenais__seta" aria-hidden />
                  <div className="infografico-arsenais__circulo infografico-arsenais__circulo--eua">
                    <strong>5 177</strong>
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

          <p className="infografico-arsenais__fonte">
            G1. Veja países com armas nucleares: infográfico. <em>G1</em>, 5 fev. 2026. Disponível em:{' '}
            <a href="https://g1.globo.com" target="_blank" rel="noopener noreferrer">https://g1.globo.com</a>.
            Acesso em: 24 jun. 2026.
          </p>

          <div className="caixa-hipotese caixa-atividade-leitura">
            <p>
              <span className="caixa-atividade-leitura__seta" aria-hidden>»</span>
              Sublinhe todos os números que você encontrar no texto e identifique dois exemplos de números naturais e dois exemplos de números racionais que não são naturais.
            </p>
          </div>




          <Pagination currentPage={5} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers questions={getQuestionById('ch1_q1')} />
              }
            />
          </div>
          <p className="mb-4 indent-6">
            Neste capítulo, você aprofundará seus estudos sobre os conjuntos numéricos
            e conhecerá dois novos conjuntos: o <span style={{ color: '#ea8244', fontWeight: 'bold' }}>conjunto dos números irracionais e o
              conjunto dos números reais</span>. Também estudará, de forma mais aprofundada, a
            operação da potenciação, suas propriedades e sua operação inversa, a radiciação.
          </p>
          <h2 className="titulo-sas titulo-sas--laranja mb-4 mt-6">Conjuntos numéricos</h2>
          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Números naturais e números inteiros</h3>

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
                    getQuestionById('ch1_qd4'),
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
            question={getQuestionById('ch1_qd4')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />


          <p className="mb-4 indent-6">
            Ser cientista é uma profissão, assim como ser vendedor, motorista de ônibus e bombeiro. Leia, abaixo, um texto sobre a cientista Aline Ghilardi e veja um pouco do seu trabalho.
          </p>

          <BlocoPapelTexto
            imageSrc={capAsset('images/page_3_img_44_574.png')}
            imageAlt="Biscoito"
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



          <AgoraEComVoce iconSrc={capAsset('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q4')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <p className="mb-4 indent-6">
            As características de um cientista, portanto, devem contribuir para a investigação científica. A investigação científica, por sua vez, pode gerar resultados que explicam acontecimentos da natureza, além de permitir que novas invenções sejam feitas.
          </p>

          <Pagination currentPage={7} expandToBookColumn />

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Dízima periódica</h3>
          <p className="mb-4 indent-6">
            Em uma dízima periódica, é utilizada a seguinte nomenclatura.
          </p>

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




          <Pagination currentPage={8} expandToBookColumn />




          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <p className="organize-ideias__titulo">Regra prática</p>
            <p>
              Portanto, para determinar a fração geratriz de uma dízima periódica simples (de parte inteira nula),
              escrevem-se, no numerador da fração, o período e, no denominador, um número formado por tantos
              noves quantos forem os algarismos do período.
            </p>
          </OrganizeAsIdeias>

          <Pagination currentPage={9} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_qa1'),
                    getQuestionById('ch1_qa2'),
                  ]}
                />
              }
            />
          </div>

          <AgoraEComVoce iconSrc={capAsset('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_qa1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <div className="grade-racionais" aria-label="Números para classificar no diagrama">
              <span className="grade-racionais__item">
                <span className="fracao"><span>−16</span><span>4</span></span>
              </span>
              <span className="grade-racionais__item">−3</span>
              <span className="grade-racionais__item">−2,5</span>
              <span className="grade-racionais__item">
                <span className="fracao"><span>−2</span><span>3</span></span>
              </span>
              <span className="grade-racionais__item">
                −1,<span className="dizima-barra">2</span>
              </span>
              <span className="grade-racionais__item">0</span>
              <span className="grade-racionais__item">
                <span className="fracao"><span>1</span><span>5</span></span>
              </span>
              <span className="grade-racionais__item">
                0,5<span className="dizima-barra">4</span>
              </span>
              <span className="grade-racionais__item">
                <span className="fracao"><span>15</span><span>3</span></span>
              </span>
              <span className="grade-racionais__item">7,04</span>
              <span className="grade-racionais__item">6</span>
            </div>
            <div className="questao-pertence">
              <QuestionRenderer
                question={getQuestionById('ch1_qa2')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
            </div>
          </AgoraEComVoce>



          <Pagination currentPage={11} expandToBookColumn />

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

          <Pagination currentPage={12} expandToBookColumn />

          <ParaIrAlem iconSrc={capAsset('images/selo-para-ir-alem.png')}>
            <p>
              As raízes que apresentam uma parte decimal infinita e não periódica não são os únicos
              números irracionais que existem. Um número irracional muito conhecido é o número π
              (lê-se: pi), que relaciona o comprimento e o diâmetro de uma circunferência.
            </p>
            <p>
              Nas imagens a seguir, observam-se uma <em>pizza</em> vista de cima e sua projeção horizontal.
            </p>
            <div className="para-ir-alem__figuras">
              <img src={capAsset('images/pi-pizza.svg')} alt="Pizza vista de cima" />
              <img src={capAsset('images/pi-circunferencia.svg')} alt="Projeção da circunferência com centro O, raios r e diâmetro AB" />
            </div>
            <p>
              Na projeção da <em>pizza</em>, <em>O</em> é o <strong>centro</strong> da circunferência, o segmento{' '}
              <span className="segmento-ab">AB</span> é um <strong>diâmetro</strong>, e os segmentos{' '}
              <span className="segmento-ab">OA</span> e <span className="segmento-ab">OB</span> são{' '}
              <strong>raios</strong> dessa circunferência.
            </p>
            <p>
              A medida do diâmetro (<strong>d</strong>) de uma circunferência equivale a duas vezes a medida
              do raio (<strong>r</strong>), ou seja, é dada pela razão <strong>d = 2r</strong>. O número π (pi) é o
              resultado da divisão da medida do comprimento <strong>C</strong> de uma circunferência pela medida
              do seu respectivo diâmetro <strong>d</strong>, ou seja, π = <span className="fracao"><span>C</span><span>d</span></span>.
            </p>
            <p>
              O número π é irracional, pois sua representação decimal é infinita e não periódica.
            </p>
            <p className="para-ir-alem__destaque">π = 3,14159265...</p>
            <p>
              Sendo o número π irracional, os cálculos com ele não são exatos, mas, sim, aproximados.
            </p>
          </ParaIrAlem>

          <Pagination currentPage={13} expandToBookColumn />

          <p className="mb-4 indent-6">
            Generalizando esses exemplos, têm-se as seguintes relações:
          </p>
          <div className="formulas-expoente">
            <div className="formulas-expoente__caixa">
              <span className="math">
                <em>a</em>
                <sup>−<em>n</em></sup>
                {' = '}
                <span className="fracao">
                  <span>1</span>
                  <span>
                    <em>a</em>
                    <sup>
                      <em>n</em>
                    </sup>
                  </span>
                </span>
              </span>
              <span className="formulas-expoente__condicao">
                , em que <em>a</em> ≠ 0
              </span>
            </div>
            <div className="formulas-expoente__caixa">
              <span className="math">
                <span className="math-paren">
                  (
                  <span className="fracao">
                    <span>
                      <em>a</em>
                    </span>
                    <span>
                      <em>b</em>
                    </span>
                  </span>
                  )
                </span>
                <sup>−<em>n</em></sup>
                {' = '}
                <span className="math-paren">
                  (
                  <span className="fracao">
                    <span>
                      <em>b</em>
                    </span>
                    <span>
                      <em>a</em>
                    </span>
                  </span>
                  )
                </span>
                <sup>
                  <em>n</em>
                </sup>
              </span>
              <span className="formulas-expoente__condicao">
                , em que <em>a</em> · <em>b</em> ≠ 0
              </span>
            </div>
          </div>

          <Pagination currentPage={14} expandToBookColumn />

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





          <Pagination currentPage={17} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_qe1'),
                    getQuestionById('ch1_qe2'),
                  ]}
                />
              }
            />
          </div>

          <ExploreSeusConhecimentos iconSrc={capAsset('images/selo-explore-conhecimentos.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_qe1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <div className="explore-conhecimentos__expressoes">
              <QuestionRenderer
                question={getQuestionById('ch1_qe2')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
            </div>
          </ExploreSeusConhecimentos>

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_mf1'),
                    getQuestionById('ch1_mf2'),
                  ]}
                />
              }
            />
          </div>

          <MergulhandoFundo iconSrc={capAsset('images/selo-mergulhando-fundo.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_mf1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <div className="expressao-mf">
              2,25 · 2,34222... +
              <span className="fracao">
                <span>58</span>
                <span>
                  2 +
                  <span className="fracao">
                    <span>1</span>
                    <span>
                      2 +
                      <span className="fracao">
                        <span>1</span>
                        <span>
                          2 +
                          <span className="fracao">
                            <span>1</span>
                            <span>2</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <QuestionRenderer
              question={getQuestionById('ch1_mf1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hidePrompt
            />
            <QuestionRenderer
              question={getQuestionById('ch1_mf2')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </MergulhandoFundo>

          <Pagination currentPage={18} expandToBookColumn />



          <NesteCapituloVoceEstudou iconSrc={capAsset('images/selo-neste-capitulo-voce-estudou.png')}>
            <ul className="neste-capitulo__lista">
              <li>as principais características de um cientista;</li>
              <li>como é o trabalho do cientista;</li>
              <li>as etapas do trabalho científico;</li>
              <li>como fazer uma pesquisa científica;</li>
              <li>o que são hipóteses, ideias não científicas e deduções;</li>
              <li>como testar hipóteses;</li>
              <li>a divulgação do trabalho científico.</li>
            </ul>
          </NesteCapituloVoceEstudou>

          <AcesseAEureka
            iconSrc={capAsset('images/selo-eureka.png')}
            href="https://qr.portalsaseducacao.com.br/eureka_mat"
          />

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