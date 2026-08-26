// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"O que é literatura: os estudos literários na escola","startPage":1,"pageCount":19,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import Footer from '@player/components/Footer';
import EscolaDigital from '@player/components/EscolaDigital';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import ComecoDeConversa from '@player/components/ComecoDeConversa';
import Entrelinha from '@player/components/Entrelinha';
import ZoomIn from '@player/components/ZoomIn';
import ImagemHotspots, { type ImagemHotspot } from '@player/components/ImagemHotspots';
import DestaqueNota from '@player/components/DestaqueNota';
import LiteraturaEmPauta from '@player/components/LiteraturaEmPauta';
import AgoraEComVoce from '@player/components/AgoraEComVoce';
import Hipertexto from '@player/components/Hipertexto';
import Check from '@player/components/Check';
import AtividadesPropostas from '@player/components/AtividadesPropostas';
import ContinuaProximaPagina from '@player/components/ContinuaProximaPagina';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import { Question } from '@player/types/questions';
import Poster from '@player/components/Poster';
import CaixaNota from '@player/components/CaixaNota';

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/SAS/livros/SAS_PG27_EM1_V1_LDIDA_LIT_AL_IMP_C1/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const SHOW_TEACHER_BUTTON = true;

const chapterQuestions: Question[] = [
  {
    id: 'cc_q1',
    type: 'text-input',
    number: 1,
    question: 'Qual é a clássica frase com que Wendy inicia a contação da história? Que tipo de histórias começam a ser contadas assim?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'A frase é "Era uma vez um homem…". Geralmente, contos de fadas e histórias fantásticas começam com "Era uma vez".',
  },
  {
    id: 'cc_q2',
    type: 'text-input',
    number: 2,
    question: 'Qual acontecimento na história contada por Wendy indica que se trata de uma narração de fantasia? Por quê?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'O fato de as crianças saírem voando até a Terra do Nunca. Isso indica fantasia porque voar sem equipamentos e ir para um lugar mágico são elementos irreais.',
  },
  {
    id: 'cc_q3',
    type: 'text-input',
    number: 3,
    question: 'Por quais sentimentos as crianças são acometidas ao ouvirem a história?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Elas demonstram empolgação, curiosidade, nervosismo e alegria.',
  },
  {
    id: 'cc_q4',
    type: 'text-input',
    number: 4,
    question: 'No texto, as crianças ouvem a sua história favorita contada por Wendy. Comente qual é a sua história favorita e o que motiva essa escolha.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta pessoal.',
  },
  {
    id: 'cc_q5',
    type: 'text-input',
    number: 5,
    question: 'Como você escolhe os livros que deseja ler? Quais elementos influenciam sua escolha?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta pessoal.',
  },
  {
    id: 'p5_q1',
    type: 'text-input',
    number: 1,
    question: 'Tanto Virginia Woolf quanto Elena Ferrante se utilizam de metáforas para falar da literatura e da leitura: “regar uma roseira”, “partitura composta pelo narrador”, “jaula anômala”. Por que essa figura de linguagem é tão importante quando se faz esse tipo de reflexão?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'As metáforas ajudam a concretizar ideias abstratas sobre a leitura e a literatura, tornando a reflexão mais acessível e poética.',
  },
  {
    id: 'p5_q2',
    type: 'text-input',
    number: 2,
    question: 'No início do segundo parágrafo, que tipo de alerta Virginia Woolf nos faz em relação à nossa liberdade como leitores?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Ela alerta que, para usufruir da liberdade, precisamos nos controlar e não desperdiçar nossas energias de forma inepta, concentrando-as no "ponto certo".',
  },
  {
    id: 'p5_q3',
    type: 'text-input',
    number: 3,
    question: 'Virginia Woolf utiliza a expressão “ponto certo” para denominar a liberdade absoluta de escolha literária. No entanto, há uma contradição nessa ideia, confirmada pelo uso das aspas, já que a liberdade completa é utópica. O que, portanto, seria o “ponto certo” na visão da escritora?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'O "ponto certo" seria o equilíbrio entre a liberdade de escolha e a capacidade de focar a atenção naquilo que realmente traz prazer e profundidade à leitura.',
  },
  {
    id: 'p5_q4',
    type: 'text-input',
    number: 4,
    question: 'E, para você, qual é o “ponto certo” da escolha literária?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta pessoal.',
  },
  {
    id: 'ag_q1',
    type: 'text-input',
    number: 1,
    question: 'Como a leitura é entendida no texto?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'A leitura é entendida como um processo de encantamento, uma imersão em um mundo imaginário onde o leitor é ativo e completa o sentido da obra.',
  },
  {
    id: 'ag_q2',
    type: 'text-input',
    number: 2,
    question: 'Há uma possível ambiguidade no título do poema. Comente-a.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'O título "Descoberta da literatura" pode significar tanto o momento em que o eu lírico descobre a literatura quanto a revelação (descoberta) do que a literatura realmente é.',
  },
  {
    id: 'ag_q3',
    type: 'text-input',
    number: 3,
    question: 'Assim como no poema, o encantamento gerado pela leitura de obras ficcionais também é rompido no texto de José de Alencar (boxe <b>Literatura na pauta</b>). Como isso ocorre em cada caso?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'No poema, o encantamento é rompido pelo medo de que a ficção seja confundida com a realidade. No texto de Alencar, o encantamento (o choro das senhoras) é rompido pela gargalhada do Padre Carlos, que traz todos de volta à realidade.',
  },
  {
    id: 'ag_q4',
    type: 'text-input',
    number: 4,
    question: 'Quais características do texto podem ser atribuídas à função poética?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'O uso de rimas, ritmo, seleção vocabular cuidadosa e a preocupação com a forma e a sonoridade da mensagem.',
  },
  {
    id: 'ap_q1',
    type: 'multiple-choice',
    number: 1,
    question: '(ENEM)',
    questionAfterMedia:
      'A poesia é marcada pela recriação do objeto por meio da linguagem, sem necessariamente explicá-lo. Nesse fragmento de João Cabral de Melo Neto, poeta da geração de 1945, o sujeito lírico propõe a recriação poética de',
    options: {
      a: 'uma palavra, a partir de imagens com as quais ela pode ser comparada, a fim de assumir novos significados.',
      b: 'um urinol, em referência às artes visuais ligadas às vanguardas do início do século XX.',
      c: 'uma ave, que compõe, com seus movimentos, uma imagem historicamente ligada à palavra poética.',
      d: 'uma máquina, levando em consideração a relevância do discurso técnico-científico pós-Revolução Industrial.',
      e: 'um tecido, visto que sua composição depende de elementos intrínsecos ao eu lírico.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'ap_q2',
    type: 'multiple-choice',
    number: 2,
    question: '(FGV-RJ)',
    questionAfterMedia:
      'A comparação escolhida por João Cabral de Melo Neto para caracterizar o ato de escrever',
    options: {
      a: 'recupera para a literatura as concepções de poesia que orientavam a literatura de folhetos do Nordeste, ou “cordel”.',
      b: 'inverte certa concepção erudita da poesia, que a vê como atividade elevada, sublime, separada do cotidiano banal.',
      c: 'inscreve a poética do autor no regionalismo literário, por vincular a representação literária a práticas locais bem determinadas.',
      d: 'reata com a tradição parnasiana, que concebia a arte poética como ofício de artesão ou artífice.',
      e: 'contrapõe-se ao elitismo do Modernismo paulista, que repudiava o primitivismo e as culturas rústicas.',
    },
    correctAnswer: 'b',
  },
  {
    id: 'ap_q3',
    type: 'multiple-choice',
    number: 3,
    question: '(ENEM)',
    questionAfterMedia:
      'No texto de Leminski, a linguagem produz efeitos sonoros e jogos de imagens. Esses jogos caracterizam a função poética da linguagem, pois',
    options: {
      a: 'objetivam convencer o leitor a praticar uma determinada ação.',
      b: 'transmitem informações, visando levar o leitor a adotar um determinado comportamento.',
      c: 'visam provocar ruídos para chamar a atenção do leitor.',
      d: 'apresentam uma discussão sobre a própria linguagem, explicando o sentido das palavras.',
      e: 'representam um uso artístico da linguagem, com o objetivo de provocar prazer estético no leitor.',
    },
    correctAnswer: 'e',
  },
  {
    id: 'ap_q4',
    type: 'multiple-choice',
    number: 4,
    question: '(ENEM)',
    questionAfterMedia:
      'O texto traz em relevo as funções metalinguística e poética. Seu caráter metalinguístico justifica-se pela',
    options: {
      a: 'discussão da dificuldade de se fazer arte inovadora no mundo contemporâneo.',
      b: 'defesa do movimento artístico da pós-modernidade, típico do século XX.',
      c: 'abordagem de temas do cotidiano, em que a arte se volta para assuntos rotineiros.',
      d: 'tematização do fazer artístico, pela discussão do ato de construção da própria obra.',
      e: 'valorização do efeito de estranhamento causado no público, o que faz a obra ser reconhecida.',
    },
    correctAnswer: 'd',
  },
  {
    id: 'ap_q5',
    type: 'multiple-choice',
    number: 5,
    question: '(ENEM)',
    questionAfterMedia:
      'A linguagem do fragmento anterior foi empregada pelo autor com o objetivo principal de',
    options: {
      a: 'transmitir informações, fazer referência a acontecimentos observados no mundo exterior.',
      b: 'envolver, persuadir o interlocutor, nesse caso, o leitor, em um forte apelo à sua sensibilidade.',
      c: 'realçar os sentimentos do eu lírico, suas sensações, reflexões e opiniões frente ao mundo real.',
      d: 'destacar o processo de construção de seu poema, ao falar sobre o papel da própria linguagem e do poeta.',
      e: 'manter eficiente o contato comunicativo entre o emissor da mensagem, de um lado, e o receptor, de outro.',
    },
    correctAnswer: 'd',
  },
  {
    id: 'ap_q6',
    type: 'text-input',
    number: 6,
    question: '(UNESP)',
    subQuestions: [
      {
        letter: 'a',
        question: 'De acordo com o narrador, o leitor é um ser ativo ou passivo na recepção de um romance? Cite um trecho que justifique sua resposta.',
        placeholder: 'Digite aqui...',
        correctAnswer: 'O leitor é um ser ativo. Justificativa: "a imaginativa do leitor aperfeiçoa o que sai muito em sombra e confuso no informe debuxo do romancista".',
      },
      {
        letter: 'b',
        question: 'De acordo com o narrador, que imagem o leitor fizera de Calisto Elói, positiva ou negativa? Cite um trecho que justifique sua resposta.',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Negativa. Justificativa: "Estou a adivinhar que o enquadraram já em molde grotesco".',
      }
    ]
  },
  {
    id: 'ap_q7',
    type: 'multiple-choice',
    number: 7,
    question: '(UNICAMP)',
    options: {
      a: 'A leitura é, fundamentalmente, processo político. Aqueles que formam leitores – professores, bibliotecários – desempenham um papel político.',
      b: 'Pelo que sabemos, quando há um esforço real de igualitarização, há aumento sensível do hábito de leitura, e, portanto, difusão crescente das obras.',
      c: 'Ler é abrir janelas, construir pontes que ligam o que somos com o que tantos outros imaginaram, pensaram, escreveram; ler é fazer-nos expandidos.',
      d: 'A leitura é uma forma servil de sonhar. Se tenho de sonhar, por que não sonhar os meus próprios sonhos?',
    },
    correctAnswer: 'c',
  },
  {
    id: 'ap_q8',
    type: 'multiple-choice',
    number: 8,
    question:
      '(UNICAMP) Em 1961, o poeta António Gedeão publica o livro <em>Máquina de fogo</em>, no qual se encontra o poema “Lágrima de preta”.',
    questionAfterMedia:
      'Os versos anteriores articulam as linguagens literária e científica com questões de ordem ética e política. Considerando o contexto de produção e recepção de “Lágrima de preta” (anos 1960 e 1970, em Portugal), o propósito artístico desse poema é',
    options: {
      a: 'inadequado quanto à análise social, ao refutar que haja racismo e preconceito na sociedade, e incorreto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.',
      b: 'inadequado quanto à análise social, ao refutar a existência de racismo e preconceito na sociedade, mas correto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.',
      c: 'pertinente quanto à análise social, ao registrar o racismo e o preconceito na sociedade, e correto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.',
      d: 'pertinente quanto à análise social, ao registrar o preconceito e o racismo na sociedade, mas incorreto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'ap_q9',
    type: 'multiple-choice',
    number: 9,
    question:
      '(FUVEST) Como sabemos, o efeito de um livro sobre nós, mesmo no que se refere à simples informação, depende de muita coisa além do valor que ele possa ter. Depende do momento da vida em que o lemos, do grau do nosso conhecimento, da finalidade que temos pela frente. Para quem pouco leu e pouco sabe, um compêndio de ginásio pode ser a fonte reveladora. Para quem sabe muito, um livro importante não passa de chuva no molhado. Além disso, há as afinidades profundas, que nos fazem afinar com certo autor (e portanto aproveitá-lo ao máximo) e não com outro, independente da valia de ambos.',
    questionAfterMedia: 'Traduz uma ideia presente no texto a seguinte afirmação:',
    options: {
      a: 'o efeito de um livro sobre o leitor é condicionado pela quantidade de informações que o texto veicula.',
      b: 'a recepção de um livro pode ser influenciada pela situação vivida pelo leitor.',
      c: 'a verdadeira erudição não dispensa a leitura dos bons manuais escolares.',
      d: 'a leitura de um livro a qual tem finalidades meramente práticas prejudica a assimilação do conhecimento.',
      e: 'o reconhecimento do valor de um livro depende, primordialmente, dos sentimentos pessoais do leitor.',
    },
    correctAnswer: 'b',
  },
  {
    id: 'ap_q10',
    type: 'multiple-choice',
    number: 10,
    question:
      '(ITA) A tevê, apesar de nos trazer uma imagem concreta, não fornece uma reprodução fiel da realidade. Uma reportagem de tevê, com transmissão direta, é o resultado de vários pontos de vista: 1) do realizador, que controla e seleciona as imagens num monitor; 2) do produtor, que poderá efetuar cortes arbitrários; 3) do <em>cameraman</em>, que seleciona os ângulos de filmagem; finalmente de todos aqueles capazes de intervir no processo da transmissão. Por outro lado, alternando sempre os “closes” (apenas o rosto de um personagem no vídeo, por exemplo) com cenas reduzidas (a vista geral de uma multidão), a televisão não dá ao espectador a liberdade de escolher o essencial ou acidental, ou seja, aquilo que ele deseja ver em grandes ou pequenos planos. Dessa forma, o veículo impõe ao receptor a sua maneira especialíssima de ver o real.',
    questionAfterMedia:
      'De acordo com o texto, respectivamente à produção e à recepção de um programa de tevê ocorrem',
    options: {
      a: 'seleção e livre arbítrio.',
      b: 'intervenção e integridade.',
      c: 'arbitrariedade e parcialidade.',
      d: 'tendenciosidade e lazer com discernimento.',
      e: 'imposição e tendenciosidade.',
    },
    correctAnswer: 'e',
  },
];

/** Ajuste top/left em % (0–100) sobre a imagem 10_2.png */
const leitoraHotspots: ImagemHotspot[] = [
  {
    id: 'h1',
    top: 52,
    left: 57,
    label: 'Representação da mulher',
    content: (
      <p>
        A forma como a mulher é representada mostra que o mais importante não é reproduzi-la de
        maneira fidedigna (nem ela nem o cenário), mas sim indicar as ideias que a leitura poderia
        estar despertando em sua mente.
      </p>
    ),
  },
  {
    id: 'h2',
    top: 32,
    left: 46,
    label: 'Rosto e olhos',
    content: (
      <p>
        O rosto é representado de forma um tanto desproporcional, mas o que importa é garantir a
        expressividade dos olhos, que parecem completamente concentrados na leitura do volume – a
        centralidade da pintura está no eixo olhos-livro.
      </p>
    ),
  },
  {
    id: 'h3',
    top: 56,
    left: 21,
    label: 'Cores do livro e do fundo',
    content: (
      <p>
        O tom forte de amarelo-esverdeado na capa do livro e no fundo da tela (estantes, escada,
        paredes, móveis) contrasta com o preto e branco do vestido e dos cabelos da mulher.
      </p>
    ),
  },
  {
    id: 'h4',
    top: 72,
    left: 38,
    label: 'Mãos',
    content: (
      <p>
        Note como o desenho das mãos da mulher se apresenta de maneira diferente. Na mão direita, é
        possível identificar os dedos nos quais se apoia o livro; já a mão esquerda é imprecisa,
        parece se assemelhar a uma garra ou um bico de pássaro. Não se trata de focar aspectos
        físicos, mas sim de buscar conhecer os sentimentos da personagem.
      </p>
    ),
  },
  {
    id: 'h5',
    top: 12,
    left: 78,
    label: 'Estantes',
    content: (
      <p>
        Nas estantes, algumas lombadas se sobressaem pelas cores vermelho e verde, criando pontos
        que atraem o olhar e geram um proposital desequilíbrio na composição.
      </p>
    ),
  },
];

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const START_PAGE = 2;
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
        <Header
          marca="sas"
          badge="CAPÍTULO"
          chapterNumber={1}
          chapterTitle="O que é literatura: os estudos literários na escola"
        />

        <Pagination currentPage={START_PAGE} />

        {/* <Poster
          imageSrc={capAsset('images/page_1_img_437_30.png')}
          creditLine1=""
          creditLine2=""
          alt="Figura (p. 2)"
        /> */}

        <div className="p-8 md:p-12">
          <EscolaDigital
            href="http://qr.portalsaseducacao.com.br/vid_1s_lit_c1"
            thumbnailSrc={capAsset('images/thumbEscolaDigital.svg')}
          />

          {/* Objetivos de Aprendizagem */}
          <section className="sas-objetivos mb-6" aria-label="Objetivos de Aprendizagem">
            <img
              className="sas-objetivos__selo"
              src={capAsset('images/aprendizagem.png')}
              alt="Objetivos de Aprendizagem"
            />
            <div className="sas-objetivos__caixa">
              <ul className="sas-objetivos__lista">
                <li>Refletir sobre o conceito de literatura e de escrita literária.</li>
                <li>Analisar as relações entre sociedade e literatura.</li>
                <li>Compreender algumas categorias de análise literária.</li>
                <li>Analisar as relações entre ficção e verdade.</li>
                <li>Discutir por que estudar literatura.</li>
              </ul>
            </div>
          </section>

          <div className="sas-bloco-bege mb-6">
            <p className="mb-4 indent-6">
              Você lembra qual foi o último livro que leu? Essa história ainda está fresca em sua memória? Mesmo que você não tenha lido nenhum livro recentemente, é provável que tenha assistido a algum filme ou escutado alguma história contada por um de seus amigos ou professores, não é mesmo? Ou, ainda, ter lido a letra de uma canção que adora. Também é provável que alguém tenha falado um provérbio ou você tenha lido uma crônica em um <em>blog</em> encontrado aleatoriamente.
            </p>

            <p className="mb-4 indent-6">
              O que todas essas situações têm em comum? Todas possuem características de manifestações artísticas. O ato de contar histórias data de milhares de anos, e, desde a Pré-História e o desenvolvimento do ser humano, já havia necessidade de registrar essas histórias, como pode ser visto na arte rupestre.
            </p>

            <p className="mb-0 indent-6">
              Isso resulta na constatação de que o ser humano vive em processo de constante encantamento com a contação de histórias, talvez por isso exista tanto fascínio em torno da literatura. Pensando nesse questionamento, leia um trecho de <em>Peter Pan</em>, de James Barrie, uma história do começo do século XX que permanece na memória coletiva até os tempos atuais.
            </p>
          </div>

          <div className="sas-wendy mb-6">
            <figure className="sas-wendy__figura">
              <img
                src={capAsset('images/wendy.png')}
                alt="A história de Wendy"
              />
            </figure>

            <div className="sas-wendy__texto">
              <p className="sas-wendy__titulo">A história de Wendy</p>

              <p className="mb-4 indent-6">
                ― ENTÃO, ESCUTEM ― disse Wendy se preparando para contar sua história, com Miguel sentado no chão ao lado do banquinho dela e sete meninos deitados na cama. ― Era uma vez um homem…
              </p>
              <p className="mb-4 indent-6">― Eu preferia que fosse uma moça ― disse Caracol.</p>
              <p className="mb-4 indent-6">― Eu preferia que fosse um ratinho branco ― disse Bico.</p>
              <p className="mb-4 indent-6">― Quietos ― ralhou a mãe deles. ― Havia uma moça também, e…</p>
              <p className="mb-4 indent-6">
                ― Ah, mamãe! ― exclamou o primeiro Gêmeo. ― Você quer dizer que ainda há uma moça também, não quer? Ela não morreu, morreu?
              </p>
              <p className="mb-4 indent-6">
                ― Ah, não.
                <br />― Eu fico muito feliz por ela estar viva. Você está feliz, João?
                <br />― Claro que sim.
                <br />― E você, Bico?
                <br />― Muito.
                <br />― E vocês estão felizes, Gêmeos?
                <br />― Pra caramba.
                <br />― Minha nossa ― suspirou Wendy.
                <br />― Menos barulho ― disse Peter, exigindo que Wendy tivesse uma chance justa de falar, embora achasse aquela história pavorosa.
                <br />― O nome do homem ― continuou Wendy ― era sr. Darling, e o nome da moça era sra. Darling.
              </p>
              <p className="mb-4 indent-6">
                ― Eu conheço os dois ― disse João, para irritar os outros.
                <br />― Eu acho que conheço também ― disse Miguel, sem muita certeza.
              </p>
              <p className="mb-0 indent-6">
                ― Eles eram casados, sabia? ― explicou Wendy. ― E o que vocês acham que eles tiveram?
              </p>
            </div>
          </div>

          <Pagination currentPage={3} expandToBookColumn />

          <div className="sas-extrato mb-6">
            <p>― Ratinhos brancos! ― exclamou Bico, inspirado.</p>
            <p>
              ― Não.
              <br />― Eu não tenho ideia ― disse Firula, que conhecia a história toda.
            </p>
            <p>― Quieto, Firula. Eles tiveram três descendentes.</p>
            <p>
              ― O que são descendentes?
              <br />― Bom, você é um descendente, Gêmeo.
              <br />― Você ouviu, João? Eu sou um descendente.
              <br />― Descendentes são só crianças ― disse João.
              <br />― Minha nossa, minha nossa ― suspirou Wendy. ― Bom, essas três crianças
              tinham uma fiel babá chamada Naná. Mas o sr. Darling estava com raiva dela e a
              acorrentou no quintal. Por isso, todas as crianças saíram voando.
            </p>
            <p>
              ― Que história boa! ― disse Bico.
              <br />― Elas saíram voando ― continuou Wendy ―, até a Terra do Nunca, para onde vão
              as crianças perdidas.
            </p>
            <p>
              ― Era o que eu achava mesmo! ― interrompeu Caracol, excitado. ― Não sei como, mas era
              o que eu achava mesmo!
            </p>
            <p>
              ― Ei, Wendy! ― exclamou Firula. ― Uma das crianças perdidas chamava Firula?
            </p>
            <p>
              ― Chamava, sim.
              <br />― Eu estou na história! Oba, eu estou na história, Bico!
            </p>
            <p>
              ― Silêncio. Agora eu quero que vocês pensem no que os pobres pais sentiram ao
              descobrir que todos os seus filhos haviam saído voando.
            </p>
            <p>
              ― Ai! ― gemeram todos, embora eles não estivessem nem ligando para o que os pobres
              pais sentiram.
            </p>
            <p>
              ― Pensem nas camas vazias!
              <br />― Ai!
              <br />― É muito triste ― disse o primeiro Gêmeo alegremente.
            </p>
            <p>
              ― Eu não vejo como isso pode ter um final feliz ― disse o segundo Gêmeo. ― Você vê,
              Bico?
            </p>
            <p>
              ― Eu estou muito nervoso.
              <br />― Se vocês soubessem como é grande o amor de uma mãe ― disse Wendy num tom
              triunfal ―, não sentiriam medo.
            </p>
            <p>Ela agora chegara à parte da história que Peter detestava.</p>
            <p>
              ― Eu gosto de amor de mãe ― disse Firula, batendo com um travesseiro em Bico. ― Você
              gosta de amor de mãe, Bico?
            </p>
            <p>
              ― Adoro ― disse Bico, devolvendo o golpe.
              <br />― E vocês sabem o que aconteceu? ― disse Wendy com complacência. ― Nossa heroína
              sabia que a mãe sempre deixaria a janela aberta para seus filhos poderem entrar. Por
              isso, eles passaram anos longe de casa, se divertindo muito.
            </p>
            <p>
              ― E eles voltaram algum dia?
              <br />― Agora ― disse Wendy, se preparando para o ponto alto da história ―, vamos dar
              uma olhada no futuro.
            </p>
            <p>Todos eles deram aquela retorcida que torna mais fácil dar uma olhada no futuro.</p>
            <p>
              ― Os anos se passaram ― continuou Wendy. ― E quem é essa elegante dama de idade
              indefinida surgindo na Estação de Londres?
            </p>
            <p>
              ― Ah, Wendy, quem é? ― exclamou Bico muito agitado, como se não soubesse.
            </p>
            <p>― Será que é? É… Não é… É! É a bela Wendy!</p>
            <p>― Oh!</p>
            <p>
              ― E quem são os dois cavalheiros aristocráticos e imponentes acompanhando-a, já tão
              crescidos? Será que são João e Miguel? São!
            </p>
            <p>― Oh!</p>
            <p>
              ― “Estão vendo, queridos irmãos?”, disse Wendy, apontando para cima. “Lá está a
              janela, ainda aberta. Ah, agora nós seremos recompensados por nossa sublime fé no amor
              de mãe.” E eles voaram para sua mamãe e seu papai. E, como será impossível descrever a
              felicidade da cena que se seguiu, nós vamos parar por aqui.
            </p>
            <p className="sas-extrato__citacao">
              BARRIE, J. M. <em>Peter Pan</em>: edição bolso de luxo. Tradução de Julia Romeu. Rio
              de Janeiro: Clássicos Zahar, 2014. p. 158-162.
            </p>
          </div>

          <ComecoDeConversa
            className="comeco-conversa--em"
            iconSrc={capAsset('images/conversa.png')}
          >
            <QuestionRenderer
              question={getQuestionById('cc_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('cc_q2')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('cc_q3')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('cc_q4')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('cc_q5')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </ComecoDeConversa>

          <Pagination currentPage={4} expandToBookColumn />

          <Entrelinha iconSrc={capAsset('images/entrelinha.png')}>
            <p className="mb-4 entrelinha__abertura">
              Você já tinha lido o trecho de <em>Peter Pan</em> citado na abertura? Mesmo sendo um romance publicado pela primeira vez em 1911, provavelmente você já ouviu falar dessas personagens ou já assistiu a alguma adaptação da obra. Isso acontece porque o livro se tornou um clássico, isto é, uma obra que pertence a uma tradição literária e que tende a ser inspiração para outras obras.
            </p>
            <p className="mb-4 indent-6">
              Era o começo do século XX quando o autor James Barrie encantou públicos de todas as idades com a história do menino que não queria crescer. Desde então, Peter Pan vive no imaginário popular e já inspirou diversas adaptações para o cinema, o teatro e a música, além de continuar a ser publicado. Clássicos como esse estão em todos os lugares, e suas inúmeras edições permeiam as mais diferentes bibliotecas.
            </p>
            <p className="mb-4 indent-6">
              Aliás, você lembra qual foi a última vez que visitou uma biblioteca? O ambiente costuma ser organizado, com iluminação adequada e tende a ser um lugar reconfortante e acolhedor. Se você já visitou uma grande biblioteca, provavelmente se sentiu impressionado e perdido com a magnitude do acervo. Com tantas opções, qual escolher? Correr os dedos pelas lombadas e simplesmente puxar um dos volumes? Será que iremos gostar da obra escolhida? Se você não conhecesse a história do Peter Pan, gostaria de ler o livro e descobrir as aventuras dos meninos perdidos, sem nenhum <em>spoiler</em>?
            </p>
            <p className="mb-4 indent-6">
              Quando não sabemos muitas informações sobre um livro, a tarefa de decidir o que ler pode ser um pouco mais difícil. Por outro lado, se entendemos a forma como os livros estão organizados nas bibliotecas (o que há em cada pavimento, seção e estante), as coisas podem ficar mais simples e até prazerosas; sabemos aonde queremos ir, onde encontrar aquilo que estamos procurando e quais relações estabelecer entre obras, autores e épocas. Da mesma forma, quando conhecemos gêneros literários e compreendemos a importância da literatura para a sociedade, pensamos em temas e estilos de obras literárias e somos capazes de analisar a composição, o que possibilita interpretações mais complexas dos textos que nos são apresentados. Isto é, quanto mais bem formado for o nosso repertório de leitura, mais livre será o nosso contato com a literatura.
            </p>
            <p className="mb-4 indent-6">
              Além da literatura, é importante compreender que as manifestações artísticas são múltiplas – pintura, escultura, arquitetura, dança, música, fotografia etc. – e, entre elas, há pontos comuns e pontos distintos. Os principais elementos de distinção são a matéria-prima com que cada artista trabalha e o modo como ele se expressa. Em outras palavras, é diferente a linguagem de cada manifestação artística e de cada artista em particular.
            </p>
            <p className="mb-4 indent-6">
              A arte literária trabalha com uma matéria-prima específica: a <strong>palavra</strong>. Entretanto, é necessário atentar que não basta fazer uso da palavra para produzir literatura. Só se produz um texto literário quando a intenção do escritor vai além da mera informação ou de uma proposta de reflexão sobre a condição humana. Por exemplo, na história do romance apresentado na abertura, o menino Peter Pan mora em uma ilha fictícia chamada Terra do Nunca. Você já pensou por que o lugar tem esse nome? Além disso, as crianças que também habitam a ilha são chamadas de “meninos perdidos”, mas por quê? Perceba que o texto literário tem uma intencionalidade voltada para a elaboração própria de uma mensagem, selecionando e combinando as palavras de uma forma muito especial. É pensando nessas considerações que iniciaremos os nossos estudos literários neste capítulo.
            </p>
            <p className="mb-0 indent-6">
              Você está pronto para descobrir qual é a sua própria Terra do Nunca?
            </p>
          </Entrelinha>

          <figure className="my-6">
            <img src={capAsset('images/4_1.png')} alt="" className="w-full" />
          </figure>

          <Pagination currentPage={5} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Para ler e apreciar</h2>

          <p className="mb-4 indent-6">Ao ler o trecho de <em>Peter Pan</em> na abertura, você chegou a se imaginar lendo um livro para um grupo de pessoas? Será que é o mesmo que ler sozinho? Além disso, é possível que você tenha refletido um pouco sobre a escolha do livro que deseja ler. Mas, afinal, como se lê um livro? A escritora inglesa Virginia Woolf escreveu sobre o assunto em um ensaio. A seguir, leia os dois primeiros parágrafos desse texto escrito em 1925.</p>

          <div className="flex flex-col md:flex-row gap-6 my-6">
            <div className="sas-ler-livro flex-1">
              <div className="sas-ler-livro__cabecalho">
                <img
                  className="sas-ler-livro__xicara"
                  src={capAsset('images/5_1.png')}
                  alt=""
                  aria-hidden="true"
                />
                <h3 className="sas-ler-livro__titulo">Como ler um livro?</h3>
                <img
                  className="sas-ler-livro__livro"
                  src={capAsset('images/5_2.png')}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <p className="mb-4 indent-6">
                Em primeiro lugar, quero ressaltar o ponto de interrogação no final do título. Mesmo que eu soubesse responder à pergunta, a resposta se aplicaria apenas a mim e não a você. Na verdade, o único conselho sobre leitura que alguém pode dar a outra pessoa é não aceitar conselhos, seguir seus instintos, usar sua razão, chegar a suas próprias conclusões. Estando nós de acordo nisso, sinto-me à vontade para expor algumas ideias e sugestões, pois você não permitirá que lhe tolham aquela independência que é a qualidade mais importante que um leitor pode ter. Afinal, quais as leis que se pode prescrever para os livros? A batalha de Waterloo foi, sem dúvida, travada em determinado dia; mas <em>Hamlet</em> é uma peça melhor do que <em>Rei Lear</em>? Ninguém sabe dizer. Cada qual precisa decidir por si só. Admitir a entrada de autoridades, por mais paramentadas que estejam, em nossas bibliotecas e deixar que nos ditem o que ler, como ler, que valor dar ao que lemos é destruir o espírito de liberdade que é o próprio alento desses santuários. Em qualquer outro lugar, leis e convenções podem nos tolher – lá, não há nenhuma.
              </p>
              <p className="mb-4 indent-6">Mas para usufruir a liberdade, se me perdoarem o chavão, é evidente que precisamos nos controlar. Não vamos desperdiçar nossas energias de forma inepta e irremediável, esguichando água em metade da casa para regar uma simples roseira; precisamos concentrá-las no ponto certo, com ímpeto e precisão. Esta pode ser uma das primeiras dificuldades com que nos deparamos numa biblioteca. Qual é o “ponto certo”? Aquilo pode parecer um mero aglomerado e uma enorme desordem. Poemas e romances, histórias e memórias, dicionários e relatórios estatísticos; livros escritos em todas as línguas por homens e mulheres de todas as índoles, raças e idades se comprimem na prateleira. E lá fora o burrico zurra, as mulheres  conversam junto ao poço, os potros galopam  pelos campos. Por onde começamos? Como traremos ordem a esse múltiplo caos para  obter do que lemos o prazer mais  amplo e profundo?</p>

              <p className="mb-4 text-right text-sm text-gray-600">
                WOOLF, Virginia. <em>A arte do romance</em>. Tradução de Denise Bottmann. Porto Alegre: L&PM, 2018. p. 67.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <aside className="sas-bio-card">
                <img
                  className="sas-bio-card__foto"
                  src={capAsset('images/page_4_img_442_68.png')}
                  alt="Virginia Woolf"
                />
                <p className="sas-bio-card__credito">George C. Beresford/Hulton Archive</p>
                <p className="sas-bio-card__texto">
                  <strong>Virginia Woolf</strong> nasceu em Londres, no ano de 1882. Desde cedo esteve
                  ligada ao mundo das letras, desempenhando uma importante atividade na literatura não
                  somente como escritora de obras ficcionais, de ensaios e de crítica literária, mas
                  também como fundadora da editora Hogarth Press. Em sua trajetória intelectual,
                  destacou-se pela defesa de causas em favor da emancipação e da liberdade feminina,
                  notadamente na política e nas letras. Em sua extensa obra, estão os romances{' '}
                  <em>Mrs. Dalloway</em> (1925) e <em>Orlando</em> (1928), além de ter publicado contos
                  e textos autobiográficos. Seu livro de ensaios de maior destaque é{' '}
                  <em>Um teto todo seu</em> (1929). A autora faleceu em 1941, aos 59 anos de idade.
                </p>
              </aside>
            </div>
          </div>



          <aside className="sas-nota-barra" aria-label="Nota">
            <p>
              <strong>Batalha de Waterloo:</strong> confronto militar ocorrido próximo a Waterloo, na
              Bélgica, em 18 de junho de 1815, que marcou a derrota de Napoleão Bonaparte.
            </p>
          </aside>

          <figure className="my-6">
            <img src={capAsset('images/page_4_img_0_136.png')} alt="" className="w-full" />
            <figcaption className="text-xs text-gray-500 mt-2">Imagens: Shutterstock</figcaption>
          </figure>

          <Pagination currentPage={6} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Para ler e apreciar</h2>
          <p className="mb-4 indent-6">
            Depois de ler o texto de Virginia Woolf, você consegue responder à pergunta do título? Esse questionamento pode ser um bom começo para discutir o processo de leitura, uma vez que aquilo que fazemos, como fazemos e por que fazemos são aspectos fundamentais de todo o processo de aprendizagem. No texto, a escritora fala sobre a importância de os leitores seguirem seus instintos no contato que estabelecem com os livros, assim como de não aceitarem a intromissão de autoridades em sua relação com o mundo literário.
          </p>
          <p className="mb-4 indent-6">
            Os dois parágrafos do texto de Virginia Woolf apresentam ideias distintas e complementares. No primeiro, a autora defende a liberdade, a independência e as particularidades de toda pessoa que lê – e deixa a entender que há um acordo sobre isso, também defendido por seus leitores, o que torna a conversa franca. Na sequência, coloca em evidência que cada obra literária tem o seu valor, cada uma condensa um universo de possibilidades. Essa situação fica expressa na dúvida sobre qual seria a melhor peça de teatro, <em>Hamlet</em> ou <em>Rei Lear</em>, ambas de William Shakespeare.
          </p>
          <p className="mb-4 indent-6">
            Diante disso, não há resposta para essa pergunta, pois os textos repercutem em cada pessoa de maneira diferente. Ou seja, quando se fala de literatura, há uma incontornável dimensão de subjetividade envolvida na discussão, tanto a subjetividade de quem escreve quanto a de quem escolhe e lê. A italiana Elena Ferrante, autora de livros de sucesso traduzidos para várias línguas, fez um comentário que evidencia essa relação de subjetividade:
          </p>

          <div className="flex flex-col md:flex-row gap-6 my-6 items-center">
            <figure className="w-full md:w-1/3">
              <img src={capAsset('images/page_5_img_67_303.png')} alt="Ilustração" className="w-full rounded-lg" />
            </figure>
            <div className="flex-1">
              <div className="sas-citacao-pontilhada">
                <p>
                  Quando contamos uma história, são importantes as ações e reações dos personagens, os
                  espaços nos quais eles se movem, o modo como o tempo passa por ele. O narrador
                  compõe uma partitura, os leitores a executam interpretando-a. Uma história é uma
                  jaula anômala: nos aprisiona em suas estratégias, porém, contraditoriamente, faz
                  com que nos sintamos livres.
                </p>
                <p className="sas-citacao-pontilhada__ref">
                  FERRANTE, Elena. <em>Frantumaglia</em>: os caminhos de uma escritora. Tradução de
                  Marcello Lino. Rio de Janeiro: Intrínseca, 2017. p. 309.
                </p>
              </div>
            </div>
          </div>

          <p className="mb-4 indent-6">
            Tanto as palavras de Virginia Woolf quanto as de Elena Ferrante revelam dois aspectos fundamentais da literatura: primeiro, as obras ficcionais só se completam com as leituras, com o significado que os leitores atribuem ao texto; segundo, apesar de ser um terreno de liberdade, a literatura também tem limitações, uma “jaula anômala”, seja pela grandiosidade do repertório de obras disponíveis, seja pelas estratégias adotadas por quem escreve.
          </p>
          <p className="mb-4 indent-6">
            A literatura, portanto, é um território de contradições. Sendo assim, com base nessa conversa inicial, responda a algumas questões a seguir sobre os textos lidos.
          </p>

          <div className="sas-atividades-com-img my-6">
            <figure className="sas-atividades-com-img__figura">
              <img
                src={capAsset('images/6_1.png')}
                alt="Ilustração"
                className="sas-atividades-com-img__foto"
              />
              <figcaption className="sas-atividades-com-img__credito">
                Imagens: Shutterstock
              </figcaption>
            </figure>
            <div className="sas-atividades-com-img__questoes">
              <QuestionRenderer
                question={getQuestionById('p5_q1')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
              <QuestionRenderer
                question={getQuestionById('p5_q2')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
              <QuestionRenderer
                question={getQuestionById('p5_q3')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
              <QuestionRenderer
                question={getQuestionById('p5_q4')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
            </div>
          </div>

          <Pagination currentPage={7} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">A arte literária</h2>
          <p className="mb-4 indent-6">
            Depois de ler o texto da Virginia Woolf, você acha que é possível encontrar o “ponto certo” da leitura? Para a autora, uma possibilidade de caminho é a compreensão das referências e das características de composição de uma obra. Sendo assim, vamos estudar literatura?
          </p>
          <p className="mb-4 indent-6">
            Como já vimos, a literatura é uma manifestação artística que se caracteriza por ter a
            palavra como matéria-prima.{' '}
            Os <span className="sas-marca-azul">clássicos</span>, indo um pouco além, afirmavam que “a arte literária é a realização do
            belo literário”, ou seja, trabalhando a palavra, o artista literário busca uma expressão formal – o
            ritmo, o estilo, a forma, as figuras de linguagem – que proporcione prazer estético, o
            qual seria atingido quando um texto está escrito de tal forma que proporciona prazer ou
            satisfação ao leitor, uma vez que o conjunto de arranjos linguísticos feitos pelo autor
            seria dotado de certa beleza.
          </p>

          <aside className="sas-resumo-azul" aria-label="Resumo">
            <p>
              Os <strong>clássicos</strong> foram os artistas que pertenceram ao período renascentista,
              durante os séculos XIV e XV, na Itália. O movimento pregava a retomada dos valores da
              Antiguidade Clássica e, além de reformular as artes e a vida medieval, marcou o início
              da Idade Moderna na Europa.
            </p>
          </aside>

          <p className="mb-4 indent-6">
            Porém, é importante salientar que não basta fazer uso da palavra para produzir literatura, já que uma obra literária não se eterniza pelo aspecto formal se não existir sustentação, também, no conteúdo. Afinal, ler um texto é também ter a percepção da leitura de mundo de outra pessoa. No caso do texto literário, essa leitura de mundo (que questiona, contesta, reorganiza, recria, reinventa a realidade) é acompanhada por um cuidadoso trabalho com a linguagem verbal.
          </p>
          <p className="mb-4 indent-6">
            Outro ponto importante é perceber que, apesar de ter a realidade como ponto de partida – relação de semelhança denominada <strong>verossimilhança</strong> –, a obra literária <strong>ficcional</strong> não se confunde com essa realidade, isto é, os textos se apresentam como uma recriação dessa realidade. Por exemplo, no romance <em>Peter Pan</em>, há a representação de dois mundos como cenários para o desenvolvimento da história. Um deles é a Terra do Nunca; o outro, a cidade de Londres, na Inglaterra. Sabemos que os cenários londrinos e a cultura dessa sociedade estão representados no texto e também sabemos que a terra fantástica não existe no mundo real; entretanto, ela é definida de modo a representar algumas características da sociedade inglesa daquele período, o que torna essa história verossímil, ainda que seja um universo cheio de elementos fantásticos.
          </p>
          <p className="mb-4 indent-6">
            Dessa forma, apenas para iniciar nosso estudo sobre a literatura, já podemos constatar alguns fatos:
          </p>
          <ul className="sas-lista-roxa list-disc ml-6 mb-6">
            <li>a literatura é uma manifestação artística;</li>
            <li>a palavra é o material da literatura, isto é, o artista literário explora a palavra em sua totalidade (significado, som, desenho);</li>
            <li>a obra literária é ficcional e inventa ou recria a realidade;</li>
            <li>nas obras literárias há uma postura do artista diante da realidade e, em alguns casos, das aspirações humanas.</li>
          </ul>

          <div className="sas-texto-com-img my-6">
            <div className="sas-texto-com-img__texto">
              <h3 className="text-xl font-bold text-blue-600 mb-4">A função poética da linguagem</h3>
              <p className="mb-4 indent-6">
                Para que um texto como <em>Peter Pan</em> fosse escrito e todo o cenário ficcional criado, é provável que o autor tenha pensado em cada palavra para formar as frases que iriam compor o romance. Quando a intenção do produtor do texto está voltada para a própria mensagem, para uma especial arrumação das palavras, quer na escolha, quer na combinação delas, quer na organização sintática da frase, temos a <strong>função poética da linguagem</strong>.
              </p>
            </div>
            <figure className="sas-texto-com-img__figura">
              <img
                src={capAsset('images/page_6_img_190_520.png')}
                alt="Poema visual"
                className="sas-texto-com-img__foto"
              />
              <figcaption className="sas-texto-com-img__credito">Shutterstock</figcaption>
            </figure>
          </div>


          <Pagination currentPage={8} expandToBookColumn />

          <div className="sas-texto-com-img my-6">
            <div className="sas-texto-com-img__texto">
              <p className="mb-4 indent-6">
                Ao selecionar e combinar as palavras de maneira particular e especial, o produtor da mensagem procura alguns elementos fundamentais: ritmos, sonoridades, o inusitado das imagens criadas com base no texto, valores conotativos, figuras de palavras; ou seja, uma das preocupações do autor é com o seu formato ou sua estrutura, buscando uma representação criativa e inusitada da mensagem. Vale lembrar que, em um texto literário, é possível perceber outras funções da linguagem, da mesma forma que a função poética não é exclusiva da literatura. O emprego da função poética também é comum em anúncios publicitários, em <em>slogans</em>, em ditados e provérbios, e até em certas construções de nossa linguagem cotidiana. A distinção é que, no caso do texto literário, a função poética costuma ser a função dominante.
              </p>
              <p className="mb-0 indent-6">
                Veja ao lado um exemplo de um poema visual de Carluce Pereira, em que as frases do poema estão dispostas em referência à forma circular e a ideia de que o mundo, que é redondo, roda.
              </p>
            </div>
            <figure className="sas-texto-com-img__figura">
              <img
                src={capAsset('images/8_1.png')}
                alt="Poema visual de Carluce Pereira"
                className="sas-texto-com-img__foto"
              />
              <figcaption className="sas-texto-com-img__credito">Carluce Pereira</figcaption>
            </figure>
          </div>

          <div className="sas-lado-com-resumo my-6">
            <div className="sas-lado-com-resumo__texto">
              <h3 className="text-xl font-bold text-blue-600 mb-4">O mundo ficcional</h3>
              <p className="mb-4 indent-6">
                Depois de entender que a palavra é a base da literatura como manifestação artística,
                podemos ver que outra característica do texto literário é a ficção. A propriedade
                ficcional da arte permeia diversos universos, seja aquela saga de livros que você
                demorou para completar, seja aquela sequência de filmes de heróis cuja continuação
                você espera há meses. Todo esse universo inventivo que permeia a literatura, por meio
                da escrita do autor ou da interpretação do leitor, está relacionado com a ficção.
              </p>
              <p className="mb-0 indent-6">
                No livro <em>A arte da ficção</em>, o escritor e crítico literário britânico David
                Lodge discute diversos aspectos formais e temáticos que compõem esse universo,
                elaborados com base em uma coluna de jornal, partindo de exemplos concretos para
                mostrar breves análises literárias. Leia a seguir um trecho de como o escritor define
                a ficção.
              </p>
            </div>
            <aside className="sas-resumo-pontilhado" aria-label="Definição de ficção">
              <p>
                A <strong>ficção</strong> está associada à imaginação, à criação fantasiosa, à
                irrealidade. Na literatura, a obra criada pelo artista é ficcional por mais que seus
                elementos sejam calcados na realidade; logo, personagens, narradores e contexto não
                devem ser confundidos com essa mesma realidade. Na abertura de romances, por exemplo,
                é comum encontrar a seguinte advertência: “Os personagens e situações desta obra são
                reais apenas no universo da ficção; não se referem a pessoas e fatos concretos, e
                sobre eles não emitem opinião”. Uma exceção a isso são as obras do gênero “não
                ficção”, que se baseiam em fatos, mas utilizam técnicas narrativas para apresentar a
                história, o que faz com que esses textos componham o universo artístico.
              </p>
            </aside>
          </div>

          <div className="sas-citacao-com-credito mb-6">
            <span className="sas-citacao-com-credito__credito">Freepik</span>
            <div className="sas-citacao-pontilhada">
              <p>
                Eu sempre entendi a ficção como uma arte essencialmente retórica – em outras palavras,
                o romancista ou o contista nos <em>convence</em> a partilhar uma determinada visão de
                mundo pela duração da nossa leitura e assim opera, se tudo der certo, a deliciosa
                imersão em uma realidade imaginada que Van Gogh retratou com tanta maestria em sua
                pintura <em>A leitora de romances</em>.
              </p>
              <p className="sas-citacao-pontilhada__ref">
                LODGE, David. <em>A arte da ficção</em>. Tradução de Guilherme da Silva Braga. Porto
                Alegre: L&PM, 2010.
              </p>
            </div>
          </div>

          <p className="mb-4 indent-6">
            As colocações de David Lodge revelam o caráter propositivo e discursivo das obras
            ficcionais, já que os textos precisam de um discurso que se sustente. As considerações do
            ensaísta também mostram como os textos de ficção (o autor só fala de exemplos em prosa,
            mas poderia falar em poesia e drama) têm certo poder de encantamento, isto é, como a
            palavra escrita é capaz de realizar, no momento em que transcorre a leitura, uma imersão
            em um mundo imaginário. Assim, uma obra literária pode estar, simultaneamente, na
            realidade e fora dela. Isso acontece porque o texto literário é uma representação do
            mundo real, sem, no entanto, ser real.
          </p>




          <Pagination currentPage={9} expandToBookColumn />

          <p className="mb-4 indent-6">
            Outro especialista no assunto, o escritor italiano Umberto Eco, conhecido por seus
            trabalhos acadêmicos, começou a publicar obras ficcionais – as quais tratava como
            “escrita criativa” – mais tarde, quando já tinha quase cinquenta anos. Como linguista e
            filósofo, ao iniciar na nova modalidade de escrita, via-se permeado de dúvidas e
            propenso a realizar intrigantes reflexões. Algumas delas estão apresentadas no trecho a
            seguir, que faz parte de um livro chamado <em>Confissões de um jovem romancista</em>.
          </p>

          <div className="sas-citacao-pontilhada mb-6">
            <p>
              Nunca entendi por que Homero é visto como um escritor criativo e Platão, não. Por que um
              mau poeta é um escritor criativo, enquanto um bom ensaísta científico não seria?
            </p>
            <p>
              [...] Mas que tipo de escritor seria um filósofo? Podemos dizer que o filósofo é um
              escritor profissional cujos textos podem ser resumidos e vertidos em outras palavras
              sem perder todo o seu significado, ao passo que os textos de escritores criativos não
              podem ser integralmente traduzidos ou parafraseados.
            </p>
            <p>
              [...] Isso acontece – e aqui podemos identificar a verdadeira diferença entre escrita
              criativa e escrita científica – porque, em um ensaio teórico, em geral se pretende
              demonstrar uma tese particular ou fornecer uma resposta a um problema específico. Por
              outro lado, num poema ou num romance, a intenção é representar a vida em toda a sua
              incoerência. A intenção é pôr em cena uma série de contradições, tornando-as claras e
              pungentes.
            </p>
            <p className="sas-citacao-pontilhada__ref">
              ECO, Umberto. <em>Confissões de um jovem romancista</em>. Tradução de Marcelo Pen. São
              Paulo: Cosac Naify, 2013.
            </p>
          </div>

          <div className="sas-texto-com-img my-6">
            <div className="sas-texto-com-img__texto">
              <p className="mb-4 indent-6">
                As palavras de Umberto Eco mostram uma característica fundamental da literatura: o
                compromisso da ficção é, acima de tudo, com a própria ficção. Isso não significa que
                a literatura – assim como outras manifestações artísticas – exista à parte do mundo
                real, despreocupada e alienada, mas sim que ela pode tratar do mundo como bem
                entender, pode operar com os elementos da realidade de forma a tornar alguns de seus
                aspectos, sobretudo os conflitivos e incoerentes, mais expressivos e evidentes. O
                pensamento científico, por outro lado, ao precisar se ater a métodos, conceitos e
                fatos, não pode se dar a essas liberdades, pois precisa apresentar ideias embasadas e
                propostas consistentes. Diante disso, talvez seja possível dizer que o pensamento
                científico e a literatura tratam dos mesmos assuntos, mas por caminhos diferentes;
                cada qual observa, interpreta e representa o mundo com suas ferramentas próprias.
              </p>
              <p className="mb-4 indent-6">
                A ficção, nesse sentido, ao tratar da vida, pode até apresentar teses, mas faz isso
                por meio de uma forma única, que só se completa por meio do diálogo com o público. Na
                leitura da ficção, o público não aceita ou refuta uma tese, não aponta erros
                metodológicos ou conclusões inconsistentes (como nos textos científicos), ele
                completa a proposta dada pelo autor e lhe dá sentido mediante o desfrute estético.
              </p>
              <p className="mb-0 indent-6">
                Depois de tudo o que você estudou até aqui, surge um questionamento: existe alguma
                maneira de definir o que é literatura? Apesar da amplitude e da dificuldade imposta
                pela pergunta, é possível dizer, de maneira sintética e até simplista, que a
                literatura é uma manifestação artística feita por meio da linguagem verbal, o que
                resulta na criação de textos ficcionais ou detentores de elementos típicos da ficção
                (este é o caso, por exemplo, das crônicas). O certo é que não há uma definição fácil
                ou conclusiva, mas sim possíveis ideias acerca do que é literatura.
              </p>
            </div>
            <figure className="sas-texto-com-img__figura">
              <img
                src={capAsset('images/9_1.png')}
                alt="Ilustração"
                className="sas-texto-com-img__foto"
              />
              <figcaption className="sas-texto-com-img__credito">Shutterstock</figcaption>
            </figure>
          </div>

          <Pagination currentPage={10} expandToBookColumn />

          <ZoomIn iconSrc={capAsset('images/zoomin.png')}>
            <p className="mb-4 indent-6">
              A tela <em>A leitora de romances</em> é uma obra de Vincent van Gogh e apresenta algumas
              características que são evidentes nas pinturas do artista, como o uso de cores fortes e
              a representação de elementos entre o figurativo e a sugestão, isto é, entre a arte de
              representar formas e a indução de algum aspecto em particular.
            </p>

            <figure className="zoom-in__figura">
              <p className="zoom-in__dica">
                Clique nos pontos vermelhos da imagem para ler mais sobre cada detalhe.
              </p>
              <ImagemHotspots
                src={capAsset('images/10_2.png')}
                alt="A leitora de romances, de Vincent van Gogh"
                hotspots={leitoraHotspots}
              />
              <figcaption className="zoom-in__credito">
                Vincent van Gogh/Museu Van Gogh, Países Baixos
              </figcaption>
              <p className="zoom-in__ref">
                VAN GOGH, Vincent. <em>A leitora de romances</em>. 1888. 1 original de arte, óleo
                sobre tela, 73 × 92 cm. Museu Van Gogh, Países Baixos.
              </p>
            </figure>


            <p className="mb-0 indent-6">
              Por meio desses elementos, é possível notar que o principal elemento representado nessa
              tela é a leitura, e não a leitora propriamente dita. Ou talvez a tela represente uma
              personagem que só existe em sua completude por meio da leitura, porque ela é
              identificada pela atividade que está realizando. Não é uma mulher lendo um romance; é
              uma “leitora” mergulhada no mundo ficcional, vivenciando-o.
            </p>
          </ZoomIn>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">O que é a escrita literária?</h3>
          <p className="mb-4 indent-6">
            Mas, afinal, como mundos imaginários como a Terra do Nunca são criados por meio da escrita? Para refletir sobre a questão, vamos ler um trecho do livro do escritor Stephen King, mundialmente conhecido por suas obras literárias voltadas, majoritariamente, para o mistério e o sobrenatural. King também é crítico literário e, em 2000, publicou um livro chamado <em>Sobre a escrita</em>. Nessa obra, ele trata de alguns aspectos de sua trajetória e de seu ofício, dando dicas a jovens aspirantes a escritores. A certa altura, ele indaga sobre o que seria, afinal de contas, a escrita, ao que responde de forma curiosa: “Telepatia, é claro”.
          </p>

          <Pagination currentPage={11} expandToBookColumn />

          <p className="mb-4 indent-6">
            A seguir, está um trecho da explicação que deu acerca dessa curiosa definição.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg my-6">
            <p className="font-bold mb-2 text-center">Sobre a escrita</p>
            <p className="sas-king-dica">
              Clique nos trechos coloridos para ler o comentário sobre cada passagem.
            </p>
            <p className="mb-4 indent-6">
              Meu nome é Stephen King. Estou escrevendo a primeira versão desta parte em minha mesa
              (aquela sob o telhado inclinado), em uma manhã nevada de dezembro de 1997. Tenho algumas
              coisas na cabeça. [...] Eu, porém, estou em outro lugar, em um porão onde existem muitas
              luzes brilhantes e imagens claras. Um lugar que construí para mim ao longo dos anos.
              Daqui se vê ao longe. Sei que é meio estranho e contraditório que um lugar de onde se
              vê ao longe seja um porão, mas é assim que funciona comigo. Se você quiser construir
              seu próprio lugar de onde se vê ao longe, pode colocá-lo no alto de uma árvore, no
              telhado do Empire State ou à beira do Grand Canyon. [...]
            </p>
            <p className="mb-4 indent-6">
              Leio onde posso, mas tenho um lugar favorito, como você também deve ter – um lugar com
              boa luz e vibrações positivas. Para mim, é a cadeira azul que fica no escritório. Para
              outros, pode ser o sofá na varanda, a cadeira de balanço na cozinha ou talvez a cama
              [...].
            </p>
            <p className="mb-4 indent-6">
              Então, vamos considerar que você esteja em seu lugar favorito de recepção, como eu
              estou em meu lugar favorito de transmissão. Precisamos desempenhar nossa rotina
              mentalista não só a distância no espaço, mas também no tempo, embora isso não seja um
              problema.{' '}
              <DestaqueNota
                cor="verde"
                nota={
                  <p>
                    Stephen King cita Charles Dickens e William Shakespeare, escritores ingleses
                    consagrados, para mostrar como a escrita e a literatura possibilitam entrar em
                    contato com obras de outros lugares e épocas. A literatura viabiliza o contato
                    com a diversidade – com variados pontos de vista, vivências e realidades –, o que
                    é fundamental para pensarmos acerca de nossa própria experiência na sociedade.
                  </p>
                }
              >
                Se ainda conseguimos ler Dickens, Shakespeare e (com ajuda de uma nota de pé de
                página ou duas) Heródoto, acho que podemos lidar bem com a distância entre 1997 e
                2000.
              </DestaqueNota>{' '}
              E aqui vamos nós – telepatia de verdade em curso. Você vai notar que não tenho nada na
              manga e que meus lábios nunca se mexem. É bem provável que os seus também não.
            </p>
            <p className="mb-4 indent-6">
              <DestaqueNota
                cor="azul"
                nota={
                  <p>
                    O trabalho com a linguagem é tão rico e propositivo que o autor faz uma descrição
                    de certos elementos que aparecem na cena imaginada, mas de forma incompleta, pois
                    ela só se realiza na mente de cada leitor.
                  </p>
                }
              >
                Olha, aqui temos uma mesa coberta com um pano vermelho. Nela está uma gaiola do
                tamanho de um aquário pequeno. Na gaiola está um coelho branco de nariz e olhos
                rosados. Nas patas da frente está um toco de cenoura que ele rói alegremente. Nas
                costas, escrito em tinta azul, está o número 8.
              </DestaqueNota>
            </p>
            <p className="mb-4 indent-6">
              Nós vemos a mesma coisa? Precisaríamos nos reunir e conversar para ter certeza
              absoluta, mas acho que sim. Claro que haveria as variações necessárias: alguns
              receptores verão um pano vermelho-vivo, outros, vinho, e outros mais verão tonalidades
              distintas. (Para daltônicos, a toalha de mesa vermelha tem a cor de cinzas de cigarro.)
              Alguns verão bordas franzidas; outros, tudo liso. Almas mais decoradoras podem incluir
              alguns laçarotes. Fiquem à vontade – minha toalha de mesa é sua toalha de mesa.
            </p>
            <p className="mb-4 indent-6">
              Da mesma maneira, o material da gaiola deixa muito espaço para interpretação. No
              mínimo, ela foi descrita com uma comparação tosca, que só é útil se eu e você vemos o
              mundo e medimos as coisas com um olhar parecido.{' '}
              <DestaqueNota
                cor="amarelo"
                nota={
                  <p>
                    Há uma provocação nesse trecho: o “desleixo” na descrição exemplificada se
                    converte antes em uma virtude do que em um defeito. A alternativa seria
                    transformar em um manual com pesos, medidas e tons de vermelho, o que é pouco
                    atrativo. Dessa maneira, a cor vermelha pode ser de diversos tons, da mesma
                    maneira que uma gaiola pode ter diversas formas e ser feita de variados
                    materiais; quem escreve e quem lê está imaginando algo parecido, mas não
                    exatamente a mesma coisa. Ou seja, a literatura envolve a criatividade tanto de
                    quem escreve como de quem lê. “O narrador compõe uma partitura, os leitores a
                    executam interpretando-a”, diria Elena Ferrante; a literatura é uma “jaula
                    anômala” – ou uma gaiola com um coelho? – que prende e liberta ao mesmo tempo.
                  </p>
                }
              >
                É fácil ser desleixado ao fazer comparações toscas, mas a alternativa é uma excessiva
                atenção aos detalhes que tira toda a diversão da escrita. O que eu deveria dizer, “na
                mesa tem uma gaiola com 1 metro de comprimento, 60 centímetros de largura e 36
                centímetros de altura”? Isso não é prosa, é um manual de instruções. O parágrafo
                também não diz de que material é feita a gaiola. Telas soldadas? Vigas de ferro?
                Vidro? Mas isso realmente importa? Todos entendemos que dá para ver do outro lado da
                gaiola; nada além disso nos importa.
              </DestaqueNota>{' '}
              A coisa mais interessante aqui não é nem o coelho que rói a cenoura, mas o número que
              ele traz nas costas. Não é um seis, nem um quatro, nem 1,95. É um oito. É para isso que
              estamos olhando, e todos sabemos.{' '}
              <DestaqueNota
                cor="roxo"
                nota={
                  <p>
                    Nesse jogo de prender e libertar, a escrita literária exerce um fascínio, mesmo
                    que silencioso: o autor não descreveu aquele detalhe, mas intriga o leitor sobre
                    o número oito nas costas do coelho. O que significa? Como esse oito foi parar
                    ali?
                  </p>
                }
              >
                Eu não disse a você. Você não me perguntou. Eu jamais abri minha boca, e você jamais
                abriu a sua. Nós não estamos nem no mesmo ano, quanto mais na mesma sala... mas
                estamos juntos. Estamos próximos.
              </DestaqueNota>
            </p>
            <p className="mb-4 indent-6">Estamos tendo um encontro de mentes.</p>
            <p className="mb-4 indent-6">
              Mandei uma mesa com um pano vermelho, uma gaiola, um coelho e um número oito escrito em
              tinta azul. Você recebeu tudo, principalmente o oito azul. Estamos participando de um
              ato de telepatia. E não é enrolação mística; é telepatia de verdade.
            </p>
            <p className="mb-0 text-right text-sm text-gray-600">
              KING, Stephen. <em>Sobre a escrita</em>. Tradução de Michel Teixeira. Rio de Janeiro:
              Objetiva, 2015.
            </p>


            <figure className="my-6">
              <img src={capAsset('images/11_1.png')} alt="" className="w-full max-w-xs ml-auto" />
              <figcaption className="text-xs text-gray-500 mt-2 text-right">Shutterstock</figcaption>
            </figure>
          </div>


          <Pagination currentPage={12} expandToBookColumn />

          <p className="mb-4 indent-6">
            Como vimos, o modo como as palavras são organizadas em um texto – o que cria a sua capacidade estética e retórica, isto é, o uso bem articulado das palavras, considerando a forma e o conteúdo – pode despertar ideias, incômodos, sensações e inquietações nos leitores, que ficam imersos em um mundo imaginário do qual não desejam sair. Pelo contrário: queremos ir cada vez mais fundo para descobrir o que podemos encontrar. Qual mundo fantástico você quer descobrir?
          </p>

          <LiteraturaEmPauta iconSrc={capAsset('images/literatura.png')}>
            <p className="mb-4 indent-6">
              Você já leu textos autobiográficos, isto é, textos em que os autores contam suas
              próprias histórias de vida? Textos como esses podem ter um caráter documental ou
              ficcional. A seguir está um trecho de <em>Como e por que sou romancista</em>, do
              cearense José de Alencar, escrito como se fosse uma carta destinada a um amigo, datada
              de maio de 1873. Nela, Alencar conta como, depois de realizar os primeiros estudos
              escolares, tornou-se uma espécie de leitor em sua casa, esmerando-se em dar voz às
              personagens de livros românticos da época.
            </p>

            <p className="mb-4 indent-6">
              Não havendo visitas de cerimônia sentava-se minha boa mãe e sua irmã D. Florinda com os
              amigos que apareciam, ao redor de uma mesa redonda de jacarandá, no centro da qual
              havia um candeeiro.
            </p>
            <p className="mb-4 indent-6">
              Minha mãe e minha tia se ocupavam com trabalhos de costuras, e as amigas para não
              ficarem ociosas as ajudavam. Dados os primeiros momentos à conversação, passava-se à
              leitura e era eu chamado ao lugar de honra.
            </p>
            <p className="mb-4 indent-6">
              Muitas vezes, confesso, essa honra me arrancava bem a contragosto de um sono começado
              [...].
            </p>
            <p className="mb-4 indent-6">
              Lia-se até a hora do chá, e tópicos havia tão interessantes que eu era obrigado à
              repetição. Compensavam esse excesso, as pausas para dar lugar às expansões do
              auditório, o qual desfazia-se em recriminações contra algum mau personagem, ou
              acompanhava de seus votos e simpatias o herói perseguido.
            </p>
            <p className="mb-4 indent-6">
              Uma noite, daquelas em que eu estava mais possuído do livro, lia com expressão uma das
              páginas mais comoventes da nossa biblioteca. As senhoras, de cabeça baixa, levavam o
              lenço ao rosto, e poucos momentos depois não puderam conter os soluços que
              rompiam-lhes o seio.
            </p>
            <p className="mb-4 indent-6">
              Com a voz afogada pela comoção e a vista empanada pelas lágrimas, eu também cerrando ao
              peito o livro aberto, disparei em pranto e respondia com palavras de consolo às
              lamentações de minha mãe e suas amigas.
            </p>
            <p className="mb-4 indent-6">
              Nesse instante assomava à porta um parente nosso, o Revd.<sup>o</sup> Padre Carlos
              Peixoto de Alencar, já assustado com o choro que ouvira ao entrar – vendo-nos a todos
              naquele estado de aflição, ainda mais perturbou-se:
            </p>
            <p className="mb-4 indent-6">
              ― Que aconteceu? Alguma desgraça? Perguntou arrebatadamente. As senhoras, escondendo o
              rosto no lenço para ocultar do Padre Carlos o pranto e evitar seus remoques, não
              proferiram palavra. Tomei eu a mim responder:
            </p>
            <p className="mb-4 indent-6">
              ― Foi o pai de Amanda que morreu! Disse, mostrando-lhe o livro aberto.
            </p>
            <p className="mb-4 indent-6">
              Compreendeu o Padre Carlos e soltou uma gargalhada, como ele as sabia dar, verdadeira
              gargalhada homérica, que mais parecia uma salva de sinos a repicarem do que riso
              humano. E após esta, outra e outra, que era ele inesgotável, quando ria de abundância
              de coração, com o gênio prazenteiro de que a natureza o dotara.
            </p>
            <p className="mb-4 indent-6">
              Foi essa leitura contínua e repetida de novelas e romances que primeiro imprimiu em
              meu espírito a tendência para essa forma literária que é entre todas a de minha
              predileção?
            </p>
            <p className="mb-4 text-right text-sm text-gray-600">
              ALENCAR, José de. <em>Como e por que sou romancista</em>. Rio de Janeiro: Typ. de G.
              Leuzinger & Filhos, Rua d’Ouvidor, 1893.
            </p>

            <div className="literatura-pauta__rodape">
              <figure className="literatura-pauta__figura">
                <img
                  src={capAsset('images/12_1.png')}
                  alt=""
                  className="literatura-pauta__foto"
                />
                <figcaption className="literatura-pauta__credito">Shutterstock</figcaption>
              </figure>
              <aside className="literatura-pauta__glossario" aria-label="Glossário">
                <p>
                  <strong>jacarandá:</strong> árvore de madeira nobre, dura e escura.
                </p>
                <p>
                  <strong>candeeiro:</strong> objeto com líquido combustível que ilumina os
                  ambientes, muito usado antes da difusão da energia elétrica.
                </p>
              </aside>
            </div>
          </LiteraturaEmPauta>

          <Pagination currentPage={13} expandToBookColumn />

          <p className="mb-4 indent-6">
            A literatura é cheia de mistérios. Quando lemos um texto ficcional, sabemos que vamos ser conduzidos a uma realidade imaginada, que passaremos por um processo de encantamento por meio das palavras. É como ir a uma apresentação de ilusionismo: de antemão, temos consciência de que vamos ser ludibriados pelos truques e pela encenação, ficamos concentrados e alertas a tudo o que pode acontecer, mas isso não significa que as mágicas se tornam menos interessantes ou que perdem o seu efeito sobre nossa curiosidade. O que costuma acontecer é exatamente o contrário. A verdade é que queremos ser enfeitiçados, desejamos ser desafiados pela habilidade e pelo ilusionista. Com a literatura ocorre uma situação parecida, razão pela qual precisamos desconfiar de narradores, tentar entender suas estratégias e artimanhas, problematizar aquilo que querem nos fazer entender da história. Logo, deve-se estar atento não só às palavras que o narrador expõe, mas também aos pontos de vista que aborda e de que forma ele orienta o olhar do leitor. O problema é que, assim como bons ilusionistas, os bons ficcionistas podem até nos dar alguns sinais, mas acabam encantando, ludibriando e despertando o desejo por mais histórias.
          </p>
          <p className="mb-4 indent-6">
            No texto de abertura, Wendy tenta contar uma história para os “meninos perdidos”, mas é constantemente interrompida pelas crianças. No entanto, essa interrupção mostra também o quanto todos estavam empolgados em saber como seria o desdobramento da história. Pensando a respeito desse encantamento provocado pela literatura, leia um poema de João Cabral de Melo Neto, publicado originalmente em 1980 no livro <em>A escola das facas</em>.
          </p>

          <div className="sas-poema">
            <h3 className="sas-poema__titulo">Descoberta da literatura</h3>
            <div className="sas-poema__colunas">
              <p className="sas-poema__coluna">
                No dia a dia do engenho,
                <br />
                toda a semana, durante,
                <br />
                cochichavam-me em segredo:
                <br />
                saiu um novo romance.
                <br />
                E da feira do domingo
                <br />
                me traziam conspirantes
                <br />
                para que os lesse e explicasse
                <br />
                um romance de barbante.
                <br />
                Sentados na roda morta
                <br />
                de um carro de boi, sem jante,
                <br />
                ouviam o folheto guenzo,
                <br />
                a seu leitor semelhante,
                <br />
                com as peripécias de espanto
                <br />
                preditas pelos feirantes.
                <br />
                Embora as coisas contadas
                <br />
                e todo o mirabolante,
                <br />
                em nada ou pouco variassem
                <br />
                nos crimes, no amor, nos lances,
                <br />
                e soassem como sabidas
                <br />
                de outros folhetos migrantes,
                <br />
                a tensão era tão densa,
                <br />
                subia tão alarmante,
              </p>
              <p className="sas-poema__coluna">
                que o leitor que lia aquilo
                <br />
                como puro alto-falante,
                <br />
                e, sem querer, imantara
                <br />
                todos ali, circunstantes,
                <br />
                receava que confundissem
                <br />
                o de perto com o distante,
                <br />
                o ali com o espaço mágico,
                <br />
                seu franzino com o gigante,
                <br />
                e que o acabassem tomando
                <br />
                pelo autor imaginante
                <br />
                ou tivesse que afrontar
                <br />
                as brabezas do brigante.
                <br />
                (E acabaria, não fossem
                <br />
                contar tudo à Casa-grande:
                <br />
                na moita morta do engenho,
                <br />
                um filho-engenho, perante
                <br />
                cassacos do eito e de tudo,
                <br />
                se estava dando ao desplante
                <br />
                de ler letra analfabeta
                <br />
                de curumba, no caçanje
                <br />
                próprio dos cegos de feira,
                <br />
                muitas vezes meliantes.)
              </p>
            </div>
            <p className="sas-poema__ref">
              MELO NETO, João Cabral de. <em>A educação pela pedra e depois</em>. Rio de Janeiro:
              Nova Fronteira, 1997.
            </p>
            <figure className="sas-poema__figura">
              <img
                src={capAsset('images/13_1.png')}
                alt=""
                className="sas-poema__foto"
              />
              <figcaption className="sas-poema__credito">Imagens: Shutterstock</figcaption>
            </figure>
            <aside className="sas-glossario" aria-label="Glossário">
              <p>
                <strong>jante:</strong> aro da roda de automóveis.
              </p>
              <p>
                <strong>guenzo:</strong> bamboleante; torto.
              </p>
              <p>
                <strong>imantar:</strong> imanar; magnetizar.
              </p>
              <p>
                <strong>cassaco:</strong> trabalhador de engenhos e usinas de açúcar.
              </p>
              <p>
                <strong>eito:</strong> roça onde se trabalhavam os escravizados; trabalho intenso.
              </p>
              <p>
                <strong>desplante:</strong> ousadia, atrevimento.
              </p>
              <p>
                <strong>curumba:</strong> sertanejo, caipira.
              </p>
              <p>
                <strong>caçanje:</strong> português mal falado ou mal escrito.
              </p>
              <p>
                <strong>meliante:</strong> malandro.
              </p>
            </aside>
          </div>

          <Pagination currentPage={14} expandToBookColumn />

          <AgoraEComVoce
            className="agora-e-com-voce--em"
            iconSrc={capAsset('images/agoraComVoce.png')}
          >
            <QuestionRenderer
              question={getQuestionById('ag_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ag_q2')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ag_q3')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ag_q4')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Hipertexto iconSrc={capAsset('images/hipertexto.png')}>
            <p className="hipertexto__titulo">
              Por que ler ficção pode te ajudar a ser um profissional melhor?
            </p>
            <p className="hipertexto__texto">
              Depois de ler e refletir sobre os textos deste capítulo, você consegue imaginar qual é
              a importância prática que a leitura de obras de ficção pode ter na sua vida
              profissional? É a isso que a reportagem publicada na revista{' '}
              <em>Superinteressante</em>, em agosto de 2017, tenta responder. Para ler, acesse o{' '}
              <em>link</em> a seguir.
            </p>
            <div className="hipertexto__link-row">
              <a
                className="hipertexto__link"
                href="https://qr.portalsaseducacao.com.br/_Y7y"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="hipertexto__link-icone"
                  src={capAsset('images/link.png')}
                  alt=""
                />
                https://qr.portalsaseducacao.com.br/_Y7y
              </a>
              <p className="hipertexto__acesso">Acesso em: 26 jun. 2022.</p>
            </div>
          </Hipertexto>

          <Check iconSrc={capAsset('images/check.png')}>
            <ul className="check-secao__lista">
              <li>
                Sou capaz de definir o que é <strong>literatura e escrita literária</strong>?
              </li>
              <li>Consigo perceber as relações entre sociedade e literatura?</li>
              <li>Reconheço e compreendo algumas categorias de análise literária?</li>
              <li>
                Consigo encontrar relações entre <strong>ficção</strong> e <strong>verdade</strong> e
                também diferenciá-las?
              </li>
              <li>Reconheço a importância de se estudar literatura?</li>
            </ul>
          </Check>

          <AtividadesPropostas iconSrc={capAsset('images/atividades.png')}>
            <QuestionRenderer
              question={getQuestionById('ap_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
              embedded={
                <div className="sas-antiode">
                  <p className="sas-antiode__titulo">Antiode</p>
                  <div className="sas-antiode__colunas">
                    <p className="sas-antiode__coluna">{`Poesia, não será esse
o sentido em que
ainda te escrevo:

flor! (Te escrevo:
flor! Não uma
flor, nem aquela
flor-virtude – em
disfarçados urinóis).

Flor é a palavra
flor; verso inscrito
no verso, como as
manhãs no tempo.`}</p>
                    <p className="sas-antiode__coluna">{`Flor é o salto
da ave para o voo:
o salto fora do sono
quando seu tecido
se rompe; é uma explosão
posta a funcionar,
como uma máquina,
uma jarra de flores.`}</p>
                  </div>
                  <p className="sas-antiode__ref">
                    MELO NETO, J. C. de. <em>Psicologia da composição</em>. Rio de Janeiro: Nova
                    Fronteira, 1997. (fragmento)
                  </p>
                </div>
              }
            />
          </AtividadesPropostas>

          <ContinuaProximaPagina />

          <Pagination currentPage={15} expandToBookColumn />

          <div className="atividades-propostas">
            <QuestionRenderer
              question={getQuestionById('ap_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hidePrompt
            />

            <QuestionRenderer
              question={getQuestionById('ap_q2')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              embedded={
                <div className="sas-antiode">
                  <p className="sas-antiode__titulo">Catar Feijão</p>
                  <div className="sas-antiode__colunas">
                    <p className="sas-antiode__coluna">{`1 Catar feijão se limita com escrever:
joga-se os grãos na água do alguidar
e as palavras na folha de papel;
e depois, joga-se fora o que boiar.
Certo, toda palavra boiará no papel,
água congelada, por chumbo seu verbo:
pois para catar esse feijão, soprar nele,
e jogar fora o leve e o oco, palha e eco.`}</p>
                    <p className="sas-antiode__coluna">{`2 Ora, nesse catar feijão entra um risco:
o de que entre os grãos pesados entre
um grão qualquer, pedra ou indigesto,
um grão imastigável, de quebrar dente.
Certo não, quando ao catar palavras:
a pedra dá à frase seu grão mais vivo:
obstrui a leitura fluviante, flutual,
açula a atenção, isca-a como o risco.`}</p>
                  </div>
                  <p className="sas-antiode__ref">
                    João Cabral de Melo Neto, <em>A educação pela pedra</em>.
                  </p>
                </div>
              }
            />

            <QuestionRenderer
              question={getQuestionById('ap_q3')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              embedded={
                <div className="sas-leminski">
                  <p className="sas-leminski__verso">{`Ave a raiva desta noite
A baita lasca fúria abrupta
Louca besta vaca solta
Ruiva luz que contra o dia
Tanto e tarde madrugada.`}</p>
                  <p className="sas-leminski__ref">
                    LEMINSKI, P. <em>Distraídos venceremos</em>.
                    <br />
                    São Paulo: Brasiliense, 2002.
                    <br />
                    (fragmento)
                  </p>
                </div>
              }
            />
          </div>

          <Pagination currentPage={16} expandToBookColumn />

          <div className="atividades-propostas">
            <QuestionRenderer
              question={getQuestionById('ap_q4')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              embedded={
                <div className="sas-texto-atividade">
                  <p className="sas-texto-atividade__titulo">Lusofonia</p>
                  <p className="sas-texto-atividade__corpo">
                    <em>rapariga</em>: s.f., fem. de rapaz: mulher nova; moça; menina; (Brasil),
                    meretriz.
                  </p>
                  <p className="sas-texto-atividade__corpo">
                    Escrevo um poema sobre a rapariga que está sentada no café, em frente da chávena
                    de café, enquanto alisa os cabelos com a mão. Mas não posso escrever este poema
                    sobre essa rapariga porque, no brasil, a palavra rapariga não quer dizer o que
                    ela diz em portugal. Então, terei de escrever a mulher nova do café, a jovem do
                    café, a menina do café, para que a reputação da pobre rapariga que alisa os
                    cabelos com a mão, num café de lisboa, não fique estragada para sempre quando
                    este poema atravessar o atlântico para desembarcar no rio de janeiro. E isto
                    tudo sem pensar em áfrica, porque aí lá terei de escrever sobre a moça do café,
                    para evitar o tom demasiado continental da rapariga, que é uma palavra que já me
                    está a pôr com dores de cabeça até porque, no fundo, a única coisa que eu queria
                    era escrever um poema sobre a rapariga do café. A solução, então, é mudar de
                    café, e limitar-me a escrever um poema sobre aquele café onde nenhuma rapariga
                    se pode sentar à mesa porque só servem café ao balcão.
                  </p>
                  <p className="sas-texto-atividade__ref">
                    JÚDICE, N. <em>Matéria do poema</em>. Lisboa: D. Quixote, 2008.
                  </p>
                </div>
              }
            />

            <QuestionRenderer
              question={getQuestionById('ap_q5')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              embedded={
                <div className="sas-cancao-amiga">
                  <p className="sas-cancao-amiga__titulo">Canção amiga</p>
                  <p className="sas-cancao-amiga__verso">{`Eu preparo uma canção,
em que minha mãe se reconheça
todas as mães se reconheçam
e que fale como dois olhos.
[...]
Aprendi novas palavras
E tornei outras mais belas.

Eu preparo uma canção
que faça acordar os homens
e adormecer as crianças.`}</p>
                  <p className="sas-cancao-amiga__ref">
                    ANDRADE, C. D. <em>Novos poemas</em>.
                    <br />
                    Rio de Janeiro: José Olympio, 1948.
                    <br />
                    (fragmento)
                  </p>
                </div>
              }
            />
          </div>

          <Pagination currentPage={17} expandToBookColumn />

          <div className="atividades-propostas">
            <div className="mb-6">
              <QuestionRenderer
                question={getQuestionById('ap_q6')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hideInput
              />
              <div className="sas-texto-atividade">
                <p className="sas-texto-atividade__titulo sas-texto-atividade__titulo--centro">
                  Capítulo VII
                </p>
                <p className="sas-texto-atividade__titulo sas-texto-atividade__titulo--centro">
                  Figura, Vestido, E Outras Coisas Do Homem.
                </p>
                <p className="sas-texto-atividade__corpo">
                  Assim que os personagens dos romances começam a ganhar a estima ou aversão de quem
                  lê, vem logo ao leitor a vontade de compor a fisionomia do personagem
                  plasticamente. Se o narrador lhe dá o bosquejo, a imaginativa do leitor aperfeiçoa
                  o que sai muito em sombra e confuso no informe debuxo do romancista. Porém, se o
                  descuido ou propósito deixa ao alvedrio de quem lê imaginar as qualidades
                  corporais de um sujeito importante como Calisto Elói, bem pode ser que a intuição
                  engenhosa do leitor adivinhe mais depressa e ao certo a figura do homem, que se
                  lhe a descrevessem com abundância de relevos e rara habilidade no estampá-los na
                  fantasia estranha.
                </p>
                <p className="sas-texto-atividade__corpo">
                  Não devo ater-me à imaginação do leitor neste grave caso. Calisto Elói não é a
                  figura que pensam. Estou a adivinhar que o enquadraram já em molde grotesco, e lhe
                  deram a idade que costuma autorizar, mormente no congresso dos legisladores, os
                  desconcertos do espírito, exemplificados pelo deputado por Miranda. Dei azo à
                  falsa apreciação, por não antecipar o esboço do personagem.
                </p>
                <p className="sas-texto-atividade__ref">
                  CASTELO BRANCO, Camilo. <em>A queda dum anjo</em>. In: <em>Obra seleta</em>. Rio
                  de Janeiro: Aguilar, 1960. p. 807. Volume I.
                </p>
              </div>
              <p className="mc-choice-after-media">
                Não são poucos os casos em que, no interior do próprio romance, os autores revelam
                preocupação quanto à recepção de seus textos. Há aqueles que explicitam esta
                preocupação como pretexto literário, irônico, como é o caso de Camilo Castelo
                Branco. No trecho em pauta, o narrador revela ter opinião definida sobre as
                reações do leitor frente a Calisto Elói, o protagonista de “A queda dum anjo”.
                Releia o fragmento que lhe apresentamos e, a seguir, responda:
              </p>
              <QuestionRenderer
                question={getQuestionById('ap_q6')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hidePrompt
              />
            </div>

            <div className="mb-2">
              <QuestionRenderer
                question={getQuestionById('ap_q7')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
                hideInput
              />
              <figure className="sas-sebo-figura">
                <img
                  src={capAsset('images/page_16_img_164_415.png')}
                  alt="Cartaz do Sebo Itinerante"
                  className="sas-sebo-figura__foto"
                />
                <figcaption className="sas-sebo-figura__credito">
                  Disponível em https://www.facebook.com/SeboItinerante/photos/. Acesso em:
                  28/05/2018.
                </figcaption>
              </figure>
            </div>
          </div>

          <ContinuaProximaPagina />

          <Pagination currentPage={18} expandToBookColumn />

          <div className="atividades-propostas">
            <div className="sas-texto-atividade">
              <p className="sas-texto-atividade__corpo">
                “Acho que só devemos ler a espécie de livros que nos ferem e trespassam. Um livro
                tem que ser como um machado para quebrar o mar de gelo do bom senso e do senso
                comum.”
              </p>
              <p className="sas-texto-atividade__ref">
                Franz Kafka, <em>Carta a Oscar Pollak</em>, 1904. Disponível em
                https://laboratoriodesensibilidades.wordpress.com. (adaptado)
              </p>
            </div>
            <p className="mc-choice-after-media">
              Assinale o excerto que confirma os dois textos anteriores.
            </p>
            <QuestionRenderer
              question={getQuestionById('ap_q7')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hidePrompt
            />
          </div>

          <div className="atividades-propostas">
            <QuestionRenderer
              question={getQuestionById('ap_q8')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
              embedded={
                <div className="sas-lagrima">
                  <img
                    className="sas-lagrima__gotas"
                    src={capAsset('images/18_1.png')}
                    alt=""
                  />
                  <div className="sas-lagrima__poema">
                    <p className="sas-lagrima__titulo">Lágrima de preta</p>
                    <p className="sas-lagrima__verso">{`Encontrei uma preta
que estava a chorar,
pedi-lhe uma lágrima
para a analisar.

Recolhi a lágrima
com todo o cuidado
num tubo de ensaio
bem esterilizado.

Olhei-a de um lado,
do outro e de frente:
tinha um ar de gota
muito transparente.

Mandei vir os ácidos,
as bases e os sais,
as drogas usadas
em casos que tais.

Ensaiei a frio,
experimentei ao lume,
de todas as vezes
deu-me o que é costume:

Nem sinais de negro,
nem vestígios de ódio.
Água (quase tudo)
e cloreto de sódio.`}</p>
                    <p className="sas-lagrima__ref">
                      GEDEÃO, António. <em>Máquina de fogo</em>. Coimbra: Tipografia da Atlântida,
                      1961. p. 187.
                    </p>
                  </div>
                  <img
                    className="sas-lagrima__gotas"
                    src={capAsset('images/18_2.png')}
                    alt=""
                  />
                </div>
              }
            />
          </div>

          <ContinuaProximaPagina />

          <Pagination currentPage={19} expandToBookColumn />

          <div className="atividades-propostas">
            <QuestionRenderer
              question={getQuestionById('ap_q8')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hidePrompt
            />

            <QuestionRenderer
              question={getQuestionById('ap_q9')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              embedded={
                <p className="sas-texto-atividade__ref sas-texto-atividade__ref--apos-enunciado">
                  CANDIDO, Antonio. “Dez livros para entender o Brasil”. <em>Teoria e debate</em>.
                  41. ed.
                </p>
              }
            />

            <QuestionRenderer
              question={getQuestionById('ap_q10')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              embedded={
                <p className="sas-texto-atividade__ref sas-texto-atividade__ref--apos-enunciado">
                  Muniz Sodré, <em>A comunicação do grotesco</em>.
                </p>
              }
            />
          </div>

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