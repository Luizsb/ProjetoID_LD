// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Diego e o pai dele vão levar o cãozinho que adotaram ao pet shop. Observe a imagem da página anterior.","startPage":1,"pageCount":24,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import Chapter from '@player/components/Chapter';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import Footer from '@player/components/Footer';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import ConversaVai from '@player/components/ConversaVai';
import ConversaVem from '@player/components/ConversaVem';
import ParaSaberMais from '@player/components/ParaSaberMais';
import OrganizandoConhecimentos from '@player/components/OrganizandoConhecimentos';
import SaberesAcao from '@player/components/SaberesAcao';
import TestandoIdeias from '@player/components/TestandoIdeias';
import AgoraVoceJaSabe from '@player/components/AgoraVoceJaSabe';
import AreaDesenho from '@player/components/AreaDesenho';
import AtividadeMapaMalha from '@player/components/AtividadeMapaMalha';
import AtividadeMapaFiguras from '@player/components/AtividadeMapaFiguras';
import GameModal from '@player/components/GameModal';
import QuestionRenderer from '@player/components/QuestionRenderer';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { useState } from 'react';
import type { Question } from '@player/types/questions';

/*
  Seções SAE (mesmo padrão do livro modelo — só plugar onde fizer sentido):
  <ConversaVai />              → abertura / perguntas iniciais
  <ConversaVem />              → após a conversa, aprofundar ideias
  <ParaSaberMais />            → curiosidade / texto de apoio
  <OrganizandoConhecimentos /> → bloco de exercícios de consolidação
  <SaberesAcao />              → atividade prática / construção
  <TestandoIdeias />           → questões de verificação
  <AgoraVoceJaSabe />          → fechamento / o que o aluno já sabe
*/

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const SHOW_TEACHER_BUTTON = true;

const chapterQuestions: Question[] = [
  {
    id: 'cv_q1',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Descreva, nas linhas a seguir, o caminho que eles podem fazer para chegar ao <em>pet shop.</em>',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Há vários caminhos. Ex.: seguir em frente por 1 quadra e virar à direita; depois, seguir em frente por mais 1 quadra — o pet shop estará à esquerda. Outra possibilidade: virar à direita, seguir em frente por 1 quadra, virar à esquerda e seguir em frente por 2 quadras. Ao final, compartilhe com a turma os diferentes caminhos que surgirem.',
  },
  {
    id: 'cv_q2',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Se Diego e o pai dele percorrerem o caminho descrito abaixo, aonde eles vão chegar?',
    embeddedContent:
      'Seguir em frente por uma quadra, virar à direita e andar em frente por três quadras.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Vão chegar na Prefeitura.',
  },
  {
    id: 'cv_q3',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Desenhe um mapa para mostrar o caminho da sua casa até a escola.',
    correctAnswer:
      'Essa atividade é uma excelente oportunidade para desenvolver diversas habilidades nos alunos, de forma lúdica e significativa. No componente de Geografia, os alunos começaram a compreender noções espaciais importantes, como orientação, direção, sentido (direita, esquerda, em frente), distância, pontos de referência e localização. Essa atividade ajuda a construir o conceito de mapa como representação do espaço, aproximando-os da ideia de escala e proporção, ainda que de forma inicial. Aproveite essa atividade para incentivar o uso de elementos cartográficos básicos, como legenda, símbolos e setas indicativas de caminho, estimulando o pensamento organizado e a comunicação visual, e converse com os alunos sobre como se orientar em diferentes espaços, o que fazer caso se percam e a importância de observar o entorno. Esses temas aproximam o conteúdo escolar da vida prática das crianças.',
  },
  {
    id: 'malha_q1',
    type: 'text-input',
    listDiscLayout: true,
    question:
      'Diego virou à esquerda e seguiu em frente por 2 passos. Em seguida, virou à esquerda novamente e seguiu em frente por 4 passos. Depois, ele virou à direita e seguiu em frente por 1 passo. O que Diego encontrou?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'A tigela com água.',
  },
  {
    id: 'malha_q2',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Que caminho o cãozinho pode percorrer para ir até a árvore partindo de onde está?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'O cãozinho pode seguir em frente por 6 passos, virar à esquerda e seguir em frente por 3 passos.',
  },
  {
    id: 'org_q1',
    type: 'text-input',
    number: 1,
    question:
      'Hoje é aniversário de Manuel. Responda às perguntas considerando o ponto de vista dos personagens que estão na cena. ',
    media: {
      src: encodeURI(
        withBase(
          'conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/images/page_5_img_107_163.png',
        ),
      ),
      alt: 'Crianças em uma festa de aniversário com bolo, balões e suco.',
      credit: 'Beto Zoellner',
    },
    subQuestions: [
      {
        letter: 'a',
        question: 'Quem está do lado direito de Manuel?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Otávio.',
      },
      {
        letter: 'b',
        question: 'Quem está à esquerda de Sara?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Ana.',
      },
      {
        letter: 'c',
        question: 'Sara segura os balões com a mão',
        choices: ['direita.', 'esquerda.'],
        correctAnswer: 'esquerda.',
      },
      {
        letter: 'd',
        question: 'Otávio segura a língua de sogra com a mão',
        choices: ['direita.', 'esquerda.'],
        correctAnswer: 'direita.',
      },
      {
        letter: 'e',
        question: 'A jarra de suco está à',
        choices: ['direita de Manuel.', 'esquerda de Manuel.'],
        correctAnswer: 'esquerda de Manuel.',
      },
    ],
  },
  {
    id: 'org_q3',
    type: 'text-input',
    number: 3,
    question:
      'Observe o desenho da sala de aula de Sara. Nesse desenho, Sara identificou os corredores verticais com as letras A, B e C, e os corredores horizontais com os números 1, 2, 3, 4 e 5. Encontre a mesa da professora no desenho e leve em consideração que os alunos se sentam de frente para ela.',
    media: {
      src: encodeURI(
        withBase(
          'conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/images/page_7_img_107_146.png',
        ),
      ),
      alt: 'Sala de aula com carteiras em fileiras, um monitor e um quadro verde.',
      credit: 'Imagem gerada por IA/Open WebUI',
      drawing: {
        storageKey: 'sae-at27-ai4-mat-c03-sala-q3',
        width: 492,
        height: 794,
        hint: 'Use as cores e o pincel para marcar o X (item a) e traçar o trajeto (item c).',
        borderColor: '#80298F',
        maxWidth: '320px',
      },
    },
    subQuestions: [
      {
        letter: 'a',
        question:
          'Maria e Paulo faltaram à aula de hoje e suas mesas estão vazias. Na imagem acima, use as ferramentas de desenho para marcar um X na carteira de Maria, sabendo que ela se senta à direita de Bia.',
        hideAnswerField: true,
        correctAnswer: `<img src="${encodeURI(
          withBase(
            'conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/images/3ar.png',
          ),
        )}" alt="Resposta: X na carteira de Maria à direita de Bia" style="max-width:320px;width:100%;height:auto;border-radius:12px;margin-top:8px;" />`,
      },
      {
        letter: 'b',
        question:
          'Sara foi emprestar um lápis para um colega. Ela saiu de sua mesa, caminhou pelo corredor B e virou à direita no corredor 3 até a última mesa. O colega estava à direita de Sara. Para quem Sara emprestou esse lápis?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Para Rita.',
      },
      {
        letter: 'c',
        question:
          'Ainda na imagem, use o desenho para traçar um trajeto que leve José até a porta da sala de aula, passando pela mesa de Paulo. Depois, descreva esse trajeto nas linhas a seguir.',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'Pessoal. Os alunos podem traçar diferentes trajetos. Ao final, peça a cada um deles que leia em voz alta a descrição do trajeto para a turma acompanhar. Como ampliação, forneça uma folha de papel para cada aluno e peça a eles que desenhem um esboço da planta baixa da própria sala de aula. Depois, exponha os trabalhos dos alunos em uma parede da escola.',
      },
    ],
  },
  {
    id: 'ang_q_carrossel',
    type: 'text-input',
    listDiscLayout: true,
    question:
      'Para brincar no carrossel, Carolina deu um giro para a esquerda ou para a direita?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Carolina deu um giro para a direita.',
  },
  {
    id: 'ang_q_paralelogramo_oral',
    type: 'text-input',
    question: 'E os outros dois ângulos do paralelogramo, que tipo de ângulos eles são?',
    correctAnswer: `<span style="display:inline-flex;align-items:center;gap:8px;"><img src="${publicUrl('images/iconeOralidade.png')}" alt="" style="width:32px;height:32px;object-fit:contain;flex-shrink:0;" /><span>Espera-se que os alunos observem que se tratam de ângulos menores do que o ângulo reto.</span></span>`,
  },
  {
    id: 'ang_q_figuras_angulos',
    type: 'text-input',
    listDiscLayout: true,
    question:
      'Agora, escreva um pequeno texto sobre o que você percebeu nos ângulos de cada figura.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Espera-se que os alunos observem e escrevam que, no retângulo, todos os ângulos são retos. Já no trapézio, há dois ângulos menores do que o reto e dois ângulos maiores do que o reto. Aproveite essa atividade e explore com os alunos as semelhanças e diferenças entre quadrados e retângulos e entre paralelogramos e trapézios.',
  },
  {
    id: 'ti_q1',
    type: 'text-input',
    number: 1,
    question:
      'Qual das placas de trânsito a seguir indica que é proibido virar à direita? Marque um <strong>X</strong> nessa placa.',
    correctAnswer: 'A',
  },
  {
    id: 'ti_q2',
    type: 'text-input',
    number: 2,
    question:
      'Se Luciano der um giro que corresponde a um ângulo reto para a esquerda, ele ficará de frente para o cão ou para a bola?',
    media: {
      src: encodeURI(
        withBase(
          'conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/images/page_11_img_172_295.png',
        ),
      ),
      alt: 'Um menino de costas, com camiseta laranja e shorts azuis, está entre um cachorro amarelo e uma bola de futebol.',
      credit: 'Imagem gerada por IA/Open WebUI',
    },
    subQuestions: [
      {
        letter: '',
        question: '',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Ele ficará de frente para o cão.',
      },
    ],
  },
  {
    id: 'ti_q3',
    type: 'text-input',
    number: 3,
    question:
      'Observe um dos giros que Marina deu no volante do carro que estava dirigindo em um jogo <em>on-line</em>.',
    subQuestions: [
      {
        letter: '',
        question: '',
        choices: [
          'reto para a esquerda.',
          'maior que o reto para a esquerda.',
          'reto para a direita.',
          'maior que o reto para a direita.',
        ],
        choicesStacked: true,
        correctAnswer: 'reto para a direita.',
      },
    ],
  },
  {
    id: 'ti_q4',
    type: 'text-input',
    number: 4,
    question: 'O relógio a seguir mostra o horário em que Elisa chegou em casa.',
    media: {
      src: encodeURI(
        withBase(
          'conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/images/page_12_img_107_94.png',
        ),
      ),
      alt: 'Relógio de brinquedo feito de massa de modelar, com ponteiros indicando 4:30.',
      credit: 'Imagem gerada por IA/Open WebUI',
    },
    subQuestions: [
      {
        letter: '',
        question: '',
        choices: [
          'menor do que o ângulo reto.',
          'um ângulo reto.',
          'maior do que o ângulo reto.',
        ],
        choicesStacked: true,
        correctAnswer: 'maior do que o ângulo reto.',
      },
    ],
  },
  {
    id: 'ti_q6',
    type: 'text-input',
    number: 6,
    question: 'Observe os triângulos desenhados em uma malha quadriculada.',
    media: {
      src: encodeURI(
        withBase(
          'conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/images/page_13_img_87_89.png',
        ),
      ),
      alt: 'Quatro figuras geométricas coloridas sobrepostas a uma grade quadriculada.',
    },
    subQuestions: [
      {
        letter: 'a',
        question: 'Quais triângulos têm apenas ângulos menores do que o ângulo reto?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Os triângulos A e D.',
      },
      {
        letter: 'b',
        question: 'Qual triângulo tem um ângulo reto? Como são os outros ângulos desse triângulo?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'O triângulo B. Os outros ângulos do triângulo B são menores do que o reto.',
      },
      {
        letter: 'c',
        question: 'Qual triângulo tem um ângulo maior do que o ângulo reto?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'O triângulo C.',
      },
    ],
  },
  {
    id: 'ti_q7_nome',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Como é o nome dessa figura que você desenhou?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Os alunos podem desenhar um quadrado ou um retângulo.',
  },
  {
    id: 'ti_q8',
    type: 'text-input',
    number: 8,
    question:
      'Use o medidor que você fez para medir ângulos na sala de aula. Depois, escreva em que situações você encontrou ângulos retos.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Oriente os alunos a medir cantos da lousa, de murais, abertura de portas e cantos de janelas. Incentive a observação atenta e o uso da linguagem matemática. Oriente-os a verificar se o ângulo formado é reto, maior do que o reto ou menor do que o reto. Após a exploração, oriente os alunos a registrar as situações em que encontraram ângulos retos, descrevendo onde estavam e como fizeram a verificação com o medidor. Finalize com uma roda de conversa, incentivando os alunos a compartilhar suas descobertas e refletir sobre a presença dos ângulos retos no cotidiano. Reforce como essa experiência ajuda a compreender a Geometria como algo presente no mundo real, e não apenas no papel.',
  },
  {
    id: 'org_ruas_q1',
    type: 'text-input',
    number: 1,
    question:
      'Leandro desenhou o mapa das ruas próximas à sua casa. Nesse desenho, ele e a mãe dele estão dentro do carro vermelho, na Rua da Alegria.',
    media: {
      src: encodeURI(
        withBase(
          'conteudo/marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/images/page_16_img_70_163.png',
        ),
      ),
      alt: 'Mapa desenhado por Leandro',
      credit: 'Beto Zoellner',
    },
    subQuestions: [
      {
        letter: 'a',
        question:
          'A casa de Leandro fica em uma rua paralela à Rua da Alegria. Em que rua Leandro pode morar?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Leandro pode morar na Rua da Luz ou na Rua do Pudim.',
      },
      {
        letter: 'b',
        question: 'Copie do mapa o nome da rua',
        subItems: [
          {
            label: 'perpendicular à Rua do Pudim.',
            placeholder: 'Digite aqui...',
            correctAnswer: 'Rua Bonita.',
          },
          {
            label: 'transversal à Rua da Alegria.',
            placeholder: 'Digite aqui...',
            correctAnswer: 'Rua dos Sonhos.',
          },
        ],
      },
      {
        letter: 'c',
        question:
          'Leandro e a mãe dele viraram à direita na Rua dos Sonhos e, depois, à esquerda na primeira rua. Então, seguiram em frente e viraram na primeira rua à direita. Em que rua eles chegaram?',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Na Rua Bonita.',
      },
    ],
  },
  {
    id: 'org_ruas_q3_paralelas',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Ruas paralelas:',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Pessoal.',
  },
  {
    id: 'org_ruas_q3_transversais',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Ruas transversais:',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Pessoal.',
  },
  {
    id: 'org_ruas_q3_perpendiculares',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Ruas perpendiculares:',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Pessoal.',
  },
  {
    id: 'ti77_q1',
    type: 'text-input',
    number: 1,
    question:
      'Beto, Elisa e Maria combinaram de se encontrar para brincar. Observe a localização de cada um deles na malha quadriculada a seguir.',
    subQuestions: [
      {
        letter: 'a',
        question:
          'Sabendo que eles caminharam sobre os quadradinhos da malha, pinte de azul o ponto de encontro de Beto e Elisa, de acordo com os trajetos descritos.',
        correctAnswer:
          'O ponto de encontro é o quadradinho em que os trajetos de Beto e de Elisa se encontram (pintado de azul na malha-resposta).',
      },
      {
        letter: 'b',
        question:
          'Considerando a localização de partida de Maria e o ponto em que as crianças se encontraram, descreva em seu caderno um trajeto que Maria possa ter percorrido.',
        correctAnswer:
        
          'Possibilidade de resposta: Maria caminhou por 3 quadradinhos e virou à direita, depois caminhou por 2 quadradinhos e virou à esquerda. Em seguida, caminhou por 2 quadradinhos e virou à direita. Então, caminhou por 2 quadradinhos.',
      },
    ],
  },
  {
    id: 'ruas_q_paralelas',
    type: 'text-input',
    listDiscLayout: true,
    question: 'Copie desse mapa o nome de duas ruas que não encontram a Rua Verde.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Há várias ruas que não encontram a Rua Verde, como: Rua Azul, Rua Laranja, Rua Amarela e Rua Rosa.',
  },
  {
    id: 'ruas_q_perpendiculares',
    type: 'text-input',
    listDiscLayout: true,
    question:
      'Copie desse mapa o nome de duas ruas que se encontram e que formam 4 ângulos retos no ponto de encontro.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Há várias ruas que se encontram e formam 4 ângulos retos, como: Rua Amarela e Rua dos Pássaros, Rua Rosa e Rua dos Mirtilos, Rua das Flores e Rua Azul, entre outras.',
  },
  {
    id: 'ruas_q_transversais',
    type: 'text-input',
    listDiscLayout: true,
    question:
      'Copie desse mapa o nome de duas ruas que se encontram e que formam ângulos menores ou maiores do que o ângulo reto no ponto de encontro.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'A Rua Colorida se encontra com a Rua Verde e com a Rua dos Pássaros e forma com elas ângulos diferentes do ângulo reto.',
  },
];
function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination(1);
  const [showTeacherView] = useState(false);
  useScrollPosition();

  const getQuestionById = (questionId: string) =>
    chapterQuestions.find((question) => question.id === questionId)!;

  return (
    <div className="marca-sae min-h-screen w-full bg-gray-200">
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Header
          marca="sae"
          badge="CAPÍTULO"
          chapterNumber={3}
          chapterTitle="Localização e ângulos"
        />

        <Pagination currentPage={57} />

        <Poster
          imageSrc={capAsset("images/page_1_img_69_213.png")}
          alt="um bairro com casas, cinema, hospital, escola, pet shop, posto de combustível e prefeitura, com pessoas atravessando a rua."
          creditLine1=""
          creditLine2="Beto Zoellner"
        />

        <div className="p-8 md:p-12">
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ul className="list-disc marker:text-[#80298F] ml-6 space-y-2">
                  <li>
                    É possível identificar um cinema, um pet shop, um posto de combustível, uma escola, a prefeitura e um hospital.
                  </li>
                  <li>
                    Pessoal. Os alunos devem considerar os estabelecimentos identificados no item anterior e justificar suas escolhas. Aproveite esse momento para avaliar as habilidades de argumentação dos alunos.
                  </li>
                  <li>
                    Pessoal. Alguns alunos podem responder que usam lojas e comércios para se localizar. Confira mais orientações no <strong>Manual do professor</strong>.
                  </li>
                </ul>
              }
            />
          </div>

          <Chapter
            title=""
            content={
              <>
                <ConversaVai />
                <p className="mb-4 indent-6">

                </p>

                <ul className="list-disc marker:text-[#80298F] ml-6 mb-4">
                  <li>Quais estabelecimentos você identifica na imagem do bairro acima?</li>
                  <li>Se você fosse Diego, o menino da imagem, para onde gostaria de ir</li>
                  <li>Como você faz para se localizar nas ruas do seu bairro?</li>
                </ul>

                <Pagination currentPage={58} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <TeacherAnswers
                          questions={[
                            getQuestionById('cv_q1'),
                            getQuestionById('cv_q2'),
                            getQuestionById('cv_q3'),
                          ]}
                        />
                      </>
                    }
                  />
                </div>

                <ConversaVem />
                <p className="mb-4 indent-6 font-bold">
                  Diego e o pai dele vão levar o cãozinho que adotaram ao pet shop. Observe a imagem da página anterior.
                </p>

                <QuestionRenderer
                  question={getQuestionById('cv_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getQuestionById('cv_q2')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <ul className="list-disc marker:text-[#80298F] ml-6 mb-6">
                  <li className="text-black">
                    <p className="mb-3">
                      Desenhe um mapa para mostrar o caminho da sua casa até a escola.
                    </p>
                    <AreaDesenho
                      storageKey="sae-at27-ai4-mat-c03-mapa-casa-escola"
                      borderColor="#80298F"
                      width={600}
                      height={320}
                      maxWidth="100%"
                      hint="Clique e arraste para desenhar o mapa"
                    />
                  </li>
                </ul>

                <div className="balao-fala my-6">
                  <div className="balao-fala__nuvem balao-fala__nuvem--longo">
                    Se você se perder em algum lugar, <b>respire fundo e tente ficar calmo.</b> Manter a calma ajuda você a pensar melhor e lembrar o que deve fazer. Procure um adulto em quem confia, como um professor, segurança ou funcionário do local, e explique a situação com clareza.
                  </div>
                  <figure className="flex flex-col items-center">
                    <img
                      className="balao-fala__personagem"
                      src={capAsset('images/page_2_img_19_616.png')}
                      alt="Menino com boné azul e camiseta roxa aponta o dedo para cima, com um sorriso no rosto."
                    />
                    <figcaption className="foto-com-credito-legenda">
                      Emílio B. Jourdani
                    </figcaption>
                  </figure>
                </div>

                <Pagination currentPage={59} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          O objetivo das situações apresentadas nesta página e na seguinte é descrever deslocamentos e a localização de pessoas e objetos no espaço, contemplando a habilidade EF04MA016 da BNCC. Confira mais orientações no <strong>Manual do professor</strong>.
                        </p>
                        <ul className="list-disc marker:text-[#80298F] ml-6 space-y-3">
                          <li>
                            Os cães também usam a visão e a audição para reconhecer pontos de referência. Eles podem identificar objetos familiares, como prédios ou árvores, enxergar caminhos que já percorreram e até reconhecer vozes ou sons característicos, como o barulho do portão de casa ou o som de um carro conhecido.
                          </li>
                          <li>
                            Pontos de referência são elementos do ambiente que ajudam a saber onde estamos e para onde ir. Para os cães, esses pontos podem ser cheiros, sons e objetos visíveis, como uma árvore ou um poste. Esses elementos ajudam os cães a criar um mapa mental, permitindo que encontrem o caminho de volta para casa ou para lugares que já conhecem.
                          </li>
                          <li>
                            Os alunos podem mencionar prédios conhecidos, como escolas, supermercados ou igrejas. Também podem citar elementos como placas de rua, paradas de ônibus e lojas por onde costumam passar. É possível ainda que referenciem pontos como árvores, praças ou estímulos sensoriais familiares, como o cheiro de um mercado ou o latido de um cachorro que costumam ouvir.
                          </li>
                        </ul>
                      </>
                    }
                  />
                </div>

                <h3 style={{ marginBottom: '2.0rem', marginTop: '2.0rem', color: '#80298F', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  LOCALIZAÇÃO E MOVIMENTAÇÃO
                </h3>

                <p className="mb-4 indent-6 font-bold">Leia o texto a seguir para descobrir como os cães fazem para se localizar.</p>

                <div
                  className="my-6 rounded-[20px] px-6 py-6 md:px-10 md:py-8"
                  style={{ backgroundColor: '#d7dcef' }}
                >
                  <p className="mb-4 text-center font-bold" style={{ fontWeight: 700, textAlign: 'center' }}>
                    Cães perdidos podem voltar sozinhos para casa
                  </p>
                  <p className="mb-4 indent-6">
                    É claro que, assim que notar que seu cão se perdeu, é necessário procurar ajuda para realizar buscas. Afinal, com os perigos que podem ser encontrados nas ruas, é normal se preocupar.
                  </p>
                  <p className="mb-4 indent-6">
                    Apesar disso, os cães possuem a capacidade de voltar para casa e reconhecer o caminho sozinhos, mesmo depois de se perderem ou percorrerem grandes distâncias.
                  </p>
                  <p className="mb-4 indent-6">
                    Essa habilidade é resultado de uma combinação de fatores biológicos e comportamentais, que faz com que os cachorros sejam mestres em localização.
                  </p>
                  <p className="mb-4 indent-6">
                    Segundo a diretora sênior de ciência comportamental de abrigos da Sociedade Americana para a Prevenção da Crueldade contra os Animais (ASPCA), Bridget Schoville, “os cães podem reconhecer pontos de referência familiares pela visão, cheiro e som”. [...]
                  </p>
                  <p className="mb-4 font-bold" style={{ fontWeight: 700 }}>
                    Cães possuem um “mapa mental”
                  </p>
                  <p className="mb-4 indent-6">
                    Em 2020, um estudo sobre alinhamento magnético e sua capacidade de melhorar a eficiência de orientação de cães de caça foi realizado por pesquisadores na República Tcheca.
                  </p>
                  <p className="mb-4 indent-6">
                    No experimento, eles equiparam 27 cães de caça com coleiras de GPS e câmeras de ação, colocando-os livres em áreas florestais. Depois, analisaram as habilidades dos cães perdidos de navegar em direção a um local original através de áreas desconhecidas. [...]
                  </p>
                  <p className="bloco-leitura__referencia">
                    KEHL, Talita. <em>Ciência explica como cães perdidos encontram o caminho de casa.</em> Disponível em:{' '}
                    <a
                      href="https://ndmais.com.br/animais/pets/ciencia-explica-como-caes-perdidos-encontram-o-caminho-de-casa/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://ndmais.com.br/animais/pets/ciencia-explica-como-caes-perdidos-encontram-o-caminho-de-casa/
                    </a>
                    . Acesso em: 5 maio 2025.
                  </p>

                  <figure className="foto-com-credito foto-com-credito--lg">
                    <img
                      src={capAsset('images/page_3_img_443_461.png')}
                      alt="Um cachorro beagle fareja o chão em um parque, com as pernas de uma pessoa desfocadas ao fundo."
                    />
                    <figcaption>oatawa/stock.adobe.com</figcaption>
                  </figure>
                </div>

                <p className="mb-4 flex items-center gap-3 font-bold">
                  <img
                    src={publicUrl('images/iconeOralidade.png')}
                    alt=""
                    className="h-10 w-10 object-contain"
                  />
                  <span>Converse com os colegas e o professor.</span>
                </p>

                <ul className="list-disc marker:text-[#80298F] ml-6 mb-4">
                  <li>Além do olfato, quais outros sentidos os cães usam para reconhecer pontos de referência?</li>
                  <li>O que são pontos de referência e como eles ajudam os cães a se localizar?</li>
                  <li>Se você estivesse perdido na sua cidade, que pontos de referência poderia usar para voltar para casa?</li>
                </ul>

                <Pagination currentPage={60} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[getQuestionById('malha_q1'), getQuestionById('malha_q2')]}
                      />
                    }
                  />
                </div>
                <div
                  className="my-6 rounded-[20px] px-6 py-5 md:px-10"
                  style={{ backgroundColor: '#d7dcef' }}
                >
                  <p className="mb-0 indent-6">
                    Observe a localização de Diego e do cãozinho na malha quadriculada. Nesta malha, o lado de cada quadradinho corresponde a um passo.
                  </p>
                </div>

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/page_4_img_173_104.png')}
                    alt="Figura em grade com um cachorro, um menino, uma tigela com osso, uma tigela vazia e uma árvore."
                  />
                  <figcaption>Beto Zoellner</figcaption>
                </figure>

                <p className="mb-4 indent-6">
                  Se o cãozinho andar em frente por 4 passos, sobre as linhas da malha, depois virar à direita e seguir em frente por 3 passos, ele vai encontrar a tigela com osso.
                </p>

                <QuestionRenderer
                  question={getQuestionById('malha_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getQuestionById('malha_q2')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />



                <div
                  className="my-6 rounded-[20px] px-6 py-5 md:px-10"
                  style={{ backgroundColor: '#d7dcef' }}
                >
                  <p className="mb-0 indent-6">
                    A localização e a movimentação de pessoas ou objetos no espaço pode ser descrita por meio de expressões como seguir em frente, virar à direita e virar à esquerda.
                  </p>
                </div>

                <Pagination currentPage={61} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    showBancoQuestoes
                    content={
                      <>
                        <p className="mb-3">
                          <strong>BNCC:</strong> EF04MA16
                        </p>
                        <TeacherAnswers questions={getQuestionById('org_q1')} />
                      </>
                    }
                  />
                </div>

                <OrganizandoConhecimentos />
                <QuestionRenderer
                  question={getQuestionById('org_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={62} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          <span className="question-number" style={{ fontWeight: 700 }}>2.</span> <strong>BNCC:</strong> EF04MA16
                        </p>
                        <p className="mb-4">
                          Uma malha como esta pode ser desenhada com giz escolar no pátio da escola. Os alunos podem ser incentivados a se deslocar de acordo com os trajetos da atividade e também a explorar outros trajetos criados por eles mesmos.
                        </p>
                        <div className="flex flex-col items-center">
                          <img
                            src={capAsset('images/2_62r.png')}
                            alt="Resposta da malha quadriculada com Escola, Parque e Cinema posicionados"
                            className="h-auto w-full max-w-[420px] rounded-lg"
                          />
                        </div>
                      </>
                    }
                  />
                </div>

                <p className="mb-4">
                  <span className="question-number" style={{ fontWeight: 700 }}>
                    2.{' '}
                  </span>
                  Felipe, Elisa e Vítor saíram de pontos diferentes da malha quadriculada. Leia os trajetos que cada um deles percorreu sobre as linhas da malha. Depois, recorte as figuras da aba e cole-as na malha, nos pontos onde cada um chegou.
                </p>

                <div className="mb-6 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#e86b6b' }}>
                        <th className="border border-[#e0cfcf] px-3 py-2 text-center font-bold text-white">
                          Nome
                        </th>
                        <th className="border border-[#e0cfcf] px-3 py-2 text-center font-bold text-white">
                          Lugar
                        </th>
                        <th className="border border-[#e0cfcf] px-3 py-2 text-center font-bold text-white">
                          Trajeto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#fde8d8' }}>
                        <td
                          className="border border-[#e8d5d5] px-3 py-2 text-center font-semibold"
                          style={{ color: '#d4554a' }}
                        >
                          Felipe
                        </td>
                        <td className="border border-[#e8d5d5] px-3 py-2 text-center text-slate-500">
                          Escola
                        </td>
                        <td className="border border-[#e8d5d5] px-3 py-2 text-left text-black">
                          Segui em frente por 3 quadras e virei à esquerda. Segui em frente por 3 quadras, virei à direita, segui em frente por 3 quadras e cheguei.
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#ebe4f5' }}>
                        <td
                          className="border border-[#e8d5d5] px-3 py-2 text-center font-semibold"
                          style={{ color: '#7a4db5' }}
                        >
                          Elisa
                        </td>
                        <td className="border border-[#e8d5d5] px-3 py-2 text-center text-slate-500">
                          Parque
                        </td>
                        <td className="border border-[#e8d5d5] px-3 py-2 text-left text-black">
                          Segui em frente por 2 quadras e virei à esquerda. Depois, segui em frente por 3 quadras, virei à direita e segui em frente por 3 quadras. Então virei à esquerda e, após percorrer 2 quadras, cheguei.
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e4f3e8' }}>
                        <td
                          className="border border-[#e8d5d5] px-3 py-2 text-center font-semibold"
                          style={{ color: '#3d9a5c' }}
                        >
                          Vítor
                        </td>
                        <td className="border border-[#e8d5d5] px-3 py-2 text-center text-slate-500">
                          Cinema
                        </td>
                        <td className="border border-[#e8d5d5] px-3 py-2 text-left text-black">
                          Segui em frente por uma quadra e virei à esquerda. Então, segui em frente por 5 quadras e virei à direita. Caminhei por mais 3 quadras e cheguei.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <AtividadeMapaMalha
                  storageKey="sae-at27-ai4-mat-c03-mapa-malha-q2"
                  credito="Imagem gerada por IA/Open WebUI"
                  figuras={[
                    {
                      id: 'parque',
                      alt: 'Parque',
                      src: capAsset('images/page_6_img_207_689.png'),
                    },
                    {
                      id: 'cinema',
                      alt: 'Cinema',
                      src: capAsset('images/page_6_img_250_689.png'),
                    },
                    {
                      id: 'escola',
                      alt: 'Escola',
                      src: capAsset('images/page_6_img_292_689.png'),
                    },
                  ]}
                />

                <Pagination currentPage={63} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          <span className="question-number" style={{ fontWeight: 700 }}>3.</span> <strong>BNCC:</strong> EF04MA16
                        </p>
                        <TeacherAnswers questions={getQuestionById('org_q3')} />
                      </>
                    }
                  />
                </div>

                <QuestionRenderer
                  question={getQuestionById('org_q3')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={64} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <p className="mb-3">
                        O objetivo das situações apresentadas nesta página e nas seguintes é reconhecer ângulos retos e não retos em figuras poligonais, contemplando a habilidade EF04MA018 da BNCC. Confira mais orientações no <strong>Manual do professor</strong>.
                      </p>
                    }
                  />
                </div>

                <h3 style={{ marginBottom: '2.0rem', marginTop: '2.0rem', color: '#80298F', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  ÂNGULOS
                </h3>
                <p className="mb-4 indent-6">
                  Carolina está se divertindo no parque de diversões com os pais.
                </p>

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/page_8_img_111_124.png')}
                    alt="Duas cenas em grade mostram uma menina com um balão azul perto de uma roda-gigante. Na segunda cena, a menina se move para a direita, com uma seta indicando o movimento."
                  />
                  <figcaption>OpenAI/Imagem criada por IA</figcaption>
                </figure>

                <p className="mb-4 indent-6">
                  Carolina estava de costas para você e deu um <strong>giro</strong> para a esquerda, ficando de frente para a roda-gigante. Esse giro corresponde a um <strong>ângulo reto</strong>.
                </p>
                <p className="mb-4 indent-6">
                  Podemos observar ângulos retos no encontro entre dois lados em alguns polígonos. Veja o quadrado a seguir:
                </p>

                <div className="my-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
                  <img
                    src={capAsset('images/64_1.png')}
                    alt="Quadrado com todos os ângulos retos"
                    className="h-auto w-full max-w-[170px] sm:max-w-[187px] md:max-w-[221px]"
                  />
                  <p
                    className="mb-0 max-w-[220px] text-[15px] leading-relaxed text-black"
                    style={{ textAlign: 'center', fontWeight: 400 }}
                  >
                    O quadrado tem todos os ângulos retos. Para indicar que um ângulo é reto, usamos este símbolo:{' '}
                    <span className="simbolo-angulo-reto" aria-label="símbolo de ângulo reto" title="ângulo reto" />
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  Observe outros giros que Carolina deu:
                </p>
                <ul className="list-disc marker:text-[#80298F] ml-6 mb-4">
                  <li>Carolina vai comprar pipoca.</li>
                </ul>

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/page_8_img_110_536.png')}
                    alt="Duas grades 3x3 com um vendedor de pipoca e uma menina com balões em posições diferentes, indicando movimento."
                  />
                  <figcaption>OpenAI/Imagem criada por IA</figcaption>
                </figure>

                <Pagination currentPage={65} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[
                          getQuestionById('ang_q_carrossel'),
                          getQuestionById('ang_q_paralelogramo_oral'),
                        ]}
                      />
                    }
                  />
                </div>

                <p className="mb-4 indent-6">
                  Para comprar a pipoca, Carolina deu um giro para a esquerda. Esse giro <em>corresponde a um ângulo</em> <strong>menor do que o ângulo reto</strong>.
                </p>
                <p className="mb-4 indent-6">
                  Também podemos observar ângulos menores do que o ângulo reto em alguns polígonos. Veja o triângulo a seguir:
                </p>

                <div className="my-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
                  <img
                    src={capAsset('images/triangulo_angulo_agudo.png')}
                    alt="Triângulo com todos os ângulos menores do que o ângulo reto"
                    className="h-auto w-full max-w-[170px] sm:max-w-[187px] md:max-w-[221px]"
                  />
                  <p
                    className="mb-0 max-w-[240px] text-[15px] leading-relaxed text-black"
                    style={{ textAlign: 'center', fontWeight: 400 }}
                  >
                    Neste triângulo, todos os ângulos são menores do que o ângulo reto.
                  </p>
                </div>

                <ul className="list-disc marker:text-[#80298F] ml-6 mb-4">
                  <li>Carolina vai brincar no carrossel.</li>
                </ul>

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/page_9_img_130_282.png')}
                    alt="Duas grades 3x3 com uma menina segurando um balão em cada. Na grade da direita, uma seta vermelha indica um movimento descendente. Um carrossel com cavalos aparece abaixo de cada grade."
                  />
                  <figcaption>clasikka/stock.adobe.com</figcaption>
                </figure>

                <QuestionRenderer
                  question={getQuestionById('ang_q_carrossel')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <p className="mb-4 indent-6">
                  O giro que Carolina deu corresponde a um ângulo <strong>maior do que o ângulo reto</strong>. Em alguns polígonos, também podemos observar ângulos maiores do que o ângulo reto. Veja o paralelogramo a seguir:
                </p>

                <div className="my-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
                  <img
                    src={capAsset('images/paralelogramo_angulo_obtuso.png')}
                    alt="Paralelogramo com dois ângulos maiores do que o ângulo reto"
                    className="h-auto w-full max-w-[170px] sm:max-w-[187px] md:max-w-[221px]"
                  />
                  <p
                    className="mb-0 max-w-[240px] text-[15px] leading-relaxed text-black"
                    style={{ textAlign: 'center', fontWeight: 400 }}
                  >
                    No paralelogramo, dois ângulos são maiores do que o ângulo reto.
                  </p>
                </div>

                <p className="mb-4 flex items-center gap-3 font-bold">
                  <img
                    src={publicUrl('images/iconeOralidade.png')}
                    alt=""
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                  <span >
                    E os outros dois ângulos do paralelogramo, que tipo de ângulos eles são?
                  </span>
                </p>

                <Pagination currentPage={66} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          Reforce com os alunos as características das figuras planas. Por exemplo, o quadrado tem todos os lados de mesma medida. Retome também o nome das figuras planas estudadas em anos anteriores, como triângulos, trapézios e retângulos.
                        </p>
                        <TeacherAnswers questions={getQuestionById('ang_q_figuras_angulos')} />
                      </>
                    }
                  />
                </div>

                <SaberesAcao />
                <p className="mb-4 indent-6">
                  Você sabia que é possível construir um medidor de ângulo reto usando apenas uma folha de papel?
                </p>
                <p className="mb-4 indent-6">
                  Vamos construir esse medidor!
                </p>

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h4 className="mb-2 font-bold text-[#80298F]">Material necessário</h4>
                  <ul className="mb-4 ml-6 list-disc">
                    <li>1 folha de papel retangular (A4, sulfite ou qualquer outra disponível).</li>
                  </ul>
                  <h4 className="mb-4 font-bold text-[#80298F]">Como fazer</h4>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
                    <div className="flex flex-col items-center text-center">
                      <p className="mb-3 min-h-[4.5rem] text-[15px] leading-snug text-black" style={{ textAlign: 'center', fontWeight: 400 }}>
                        <span className="question-number" style={{ fontWeight: 700 }}>
                          1.{' '}
                        </span>
                        Dobre a folha de papel ao meio, unindo um lado ao outro.
                      </p>
                      <div className="flex h-[160px] w-full items-center justify-center">
                        <img
                          src={capAsset('images/dobradura_passo_1.png')}
                          alt="Passo 1: dobrar a folha ao meio"
                          className="h-full w-full max-w-[240px] object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <p className="mb-3 min-h-[4.5rem] text-[15px] leading-snug text-black" style={{ textAlign: 'center', fontWeight: 400 }}>
                        <span className="question-number" style={{ fontWeight: 700 }}>
                          2.{' '}
                        </span>
                        Agora, dobre novamente ao meio, juntando um lado ao outro.
                      </p>
                      <div className="flex h-[160px] w-full items-center justify-center">
                        <img
                          src={capAsset('images/dobradura_passo_2.png')}
                          alt="Passo 2: dobrar novamente ao meio"
                          className="h-full w-full max-w-[240px] object-contain"
                        />
                      </div>
                      <figcaption className="foto-com-credito-legenda">Beto Zoellner</figcaption>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <p className="mb-3 min-h-[4.5rem] text-[15px] leading-snug text-black" style={{ textAlign: 'center', fontWeight: 400 }}>
                        <span className="question-number" style={{ fontWeight: 700 }}>
                          3.{' '}
                        </span>
                        O canto onde as duas dobras se encontram formará um <strong>ângulo reto</strong>.
                      </p>
                      <div className="flex h-[160px] w-full items-center justify-center">
                        <img
                          src={capAsset('images/dobradura_passo_3.png')}
                          alt="Passo 3: canto formando ângulo reto"
                          className="h-full w-full max-w-[240px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mb-4 indent-6">
                  Vamos usar seu medidor de ângulo reto para medir os ângulos das figuras geométricas planas a seguir.
                </p>

                <div className="my-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                  <div>
                    <ul className="mb-3 ml-6 list-disc">
                      <li className="text-black">Retângulo</li>
                    </ul>
                    <div className="flex justify-center">
                      <img
                        src={capAsset('images/page_10_img_133_486.png')}
                        alt="Retângulo"
                        className="h-auto w-full max-w-[220px] object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <ul className="mb-3 ml-6 list-disc">
                      <li className="text-black">Trapézio</li>
                    </ul>
                    <div className="flex justify-center">
                      <img
                        src={capAsset('images/page_10_img_348_486.png')}
                        alt="Trapézio"
                        className="h-auto w-full max-w-[220px] object-contain"
                      />
                    </div>
                  </div>
                </div>

                <QuestionRenderer
                  question={getQuestionById('ang_q_figuras_angulos')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={67} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          <span className="question-number" style={{ fontWeight: 700 }}>1.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <div className="mb-4 flex flex-col items-start">
                          <p className="mb-2"><span className="question-number" style={{ fontWeight: 700 }}>A</span></p>
                          <div className="relative inline-block">
                            <img
                              src={capAsset('images/page_11_img_233_161.png')}
                              alt="Placa A — resposta"
                              className="h-24 w-24 object-contain"
                            />
                            <span
                              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black leading-none"
                              style={{ color: '#00bbff' }}
                              aria-hidden
                            >
                              ✕
                            </span>
                          </div>
                        </div>
                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>2.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <p className="mb-4">Ele ficará de frente para o cão.</p>
                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>3.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <p className="mb-3">reto para a direita.</p>
                      </>
                    }
                  />
                </div>

                <OrganizandoConhecimentos />

                <div className="mb-6">
                  <p className="mb-4">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      1.{' '}
                    </span>
                    <span style={{ color: 'black' }}>
                      Qual das placas de trânsito a seguir indica que é proibido virar à direita? Marque um{' '}
                      <strong>X</strong> nessa placa.
                    </span>
                  </p>
                  <div className="my-6 flex flex-col items-center">
                    <div className="flex justify-center gap-10">
                      {(
                        [
                          {
                            id: 'A',
                            src: capAsset('images/page_11_img_233_161.png'),
                            alt: 'Placa A — proibido virar à direita',
                          },
                          {
                            id: 'B',
                            src: capAsset('images/page_11_img_316_161.png'),
                            alt: 'Placa B — proibido virar à esquerda',
                          },
                        ] as const
                      ).map((placa) => {
                        const selected = (userAnswers.ti_q1 as string) === placa.id;
                        return (
                          <button
                            key={placa.id}
                            type="button"
                            className="flex flex-col items-center gap-2"
                            onClick={() =>
                              handleAnswerChange('ti_q1', selected ? '' : placa.id)
                            }
                          >
                            <span className="font-bold text-black">{placa.id}</span>
                            <span className="relative inline-block">
                              <img
                                src={placa.src}
                                alt={placa.alt}
                                className="h-24 w-24 object-contain"
                                draggable={false}
                              />
                              {selected ? (
                                <span
                                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black leading-none"
                                  style={{ color: '#00bbff' }}
                                  aria-hidden
                                >
                                  ✕
                                </span>
                              ) : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <figcaption className="foto-com-credito-legenda">Imagem gerada por IA/Open WebUI</figcaption>
                  </div>
                </div>

                <QuestionRenderer
                  question={getQuestionById('ti_q2')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <div className="mb-2">
                  <p className="mb-4">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      3.{' '}
                    </span>
                    <span style={{ color: 'black' }}>
                      Observe um dos giros que Marina deu no volante do carro que estava dirigindo em um jogo on-line.
                    </span>
                  </p>
                  <figure className="my-6 flex flex-col items-center">
                    <div className="flex justify-center gap-8">
                      <img
                        src={capAsset('images/page_11_img_190_490.png')}
                        alt="Volante de brinquedo — posição inicial"
                        className="h-32 w-32 object-contain"
                      />
                      <img
                        src={capAsset('images/page_11_img_320_490.png')}
                        alt="Volante de brinquedo — após o giro"
                        className="h-32 w-32 object-contain"
                      />
                    </div>
                    <figcaption className="foto-com-credito-legenda">Imagem gerada por IA/Open WebUI</figcaption>
                  </figure>
                  <ul className="mb-2 ml-6 list-disc">
                    <li className="text-black">Marina deu um giro que corresponde a um ângulo</li>
                  </ul>
                </div>

                <QuestionRenderer
                  question={{
                    ...getQuestionById('ti_q3'),
                    number: undefined,
                    question: '',
                  }}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={68} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>4.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <p className="mb-4">maior do que o ângulo reto.</p>

                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>5.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <p className="mb-4">
                          Oriente os alunos a observar que os ângulos correspondem aos giros realizados pelo robô. A cada mudança de direção, o robô parte da direção em que estava e realiza um giro para seguir um novo caminho. Assim, o ângulo deve ser identificado considerando a direção anterior e a nova direção do movimento, conforme destacado em laranja.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="mx-auto w-full max-w-md border-collapse text-sm">
                            <thead>
                              <tr style={{ backgroundColor: '#e86b6b' }}>
                                <th className="border border-[#e0cfcf] px-3 py-2 text-center font-bold text-white">
                                  Giro
                                </th>
                                <th className="border border-[#e0cfcf] px-3 py-2 text-center font-bold text-white">
                                  Tipo de ângulo
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {(
                                [
                                  [1, 'Reto'],
                                  [2, 'Maior do que o reto'],
                                  [3, 'Maior do que o reto'],
                                  [4, 'Reto'],
                                  [5, 'Menor do que o reto'],
                                  [6, 'Menor do que o reto'],
                                ] as const
                              ).map(([giro, tipo]) => (
                                <tr key={giro}>
                                  <td className="border border-[#e8d5d5] px-3 py-2 text-center text-black">
                                    {giro}
                                  </td>
                                  <td
                                    className="border border-[#e8d5d5] px-3 py-2 text-center"
                                    style={{ color: '#5b9bd5' }}
                                  >
                                    {tipo}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    }
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-4">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      4.{' '}
                    </span>
                    <span style={{ color: 'black' }}>
                      O relógio a seguir mostra o horário em que Elisa chegou em casa.
                    </span>
                  </p>
                  <figure className="foto-com-credito foto-com-credito--sm">
                    <img
                      src={capAsset('images/page_12_img_107_94.png')}
                      alt="Relógio de brinquedo feito de massa de modelar, com ponteiros indicando 4:30."
                    />
                    <figcaption>Imagem gerada por IA/Open WebUI</figcaption>
                  </figure>
                  <ul className="mb-2 ml-6 list-disc">
                    <li className="text-black">O ângulo formado entre os ponteiros do relógio é</li>
                  </ul>
                </div>

                <QuestionRenderer
                  question={{
                    ...getQuestionById('ti_q4'),
                    number: undefined,
                    question: '',
                    media: undefined,
                  }}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <div className="mb-6 mt-8">
                  <p className="mb-4">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      5.{' '}
                    </span>
                    <span style={{ color: 'black' }}>
                      Observe na malha quadriculada a seguir o deslocamento de um robô em um jogo on-line, saindo do ponto{' '}
                      <strong>verde</strong> e chegando no ponto <strong>azul</strong>.
                    </span>
                  </p>

                  <div className="my-6 flex flex-col items-center">
                    <img
                      src={capAsset('images/page_12_img_125_269.png')}
                      alt="Robô em um tabuleiro quadriculado, traçando um caminho vermelho com pontos de virada numerados de 1 a 6."
                      className="h-auto w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px]"
                    />
                  </div>

                  <ul className="mb-4 ml-6 list-disc">
                    <li className="text-black">
                      No deslocamento, o robô deu vários giros. Observe os ângulos destacados em laranja e escreva no quadro a seguir o tipo de ângulo de cada um desses giros.
                    </li>
                  </ul>

                  <div className="mb-6 overflow-x-auto">
                    <table className="mx-auto w-full max-w-md border-collapse text-sm">
                      <thead>
                        <tr style={{ backgroundColor: '#e86b6b' }}>
                          <th className="border border-[#e0cfcf] px-3 py-2 text-center font-bold text-white">
                            Giro
                          </th>
                          <th className="border border-[#e0cfcf] px-3 py-2 text-center font-bold text-white">
                            Tipo de ângulo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5, 6].map((giro) => {
                          const fieldId = `ti_q5_giro_${giro}`;
                          return (
                            <tr key={giro}>
                              <td className="border border-[#e8d5d5] px-3 py-2 text-center font-semibold text-black">
                                {giro}
                              </td>
                              <td className="border border-[#e8d5d5] px-2 py-1">
                                <input
                                  type="text"
                                  value={(userAnswers[fieldId] as string) || ''}
                                  onChange={(e) => handleAnswerChange(fieldId, e.target.value)}
                                  placeholder="Digite aqui..."
                                  className="h-[31px] w-full rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 text-[14px] text-black placeholder:text-[#BDBDBD] focus:outline-none"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Pagination currentPage={69} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>6.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <p className="mb-3">
                          O objetivo dessa atividade é explorar a ideia de que triângulos podem apresentar diferentes medidas de ângulos internos. Posteriormente, os alunos vão compreender que triângulos podem ser classificados de acordo com essas medidas.
                        </p>
                        <TeacherAnswers questions={getQuestionById('ti_q6')} />

                        <p className="mb-2 mt-4">
                          <span className="question-number" style={{ fontWeight: 700 }}>7.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <ul className="mb-4 ml-6 list-disc">
                          <li className="text-black">
                            Os alunos podem desenhar um quadrado ou um retângulo.
                          </li>
                        </ul>

                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>8.</span> <strong>BNCC:</strong> EF04MA18
                        </p>
                        <p className="mb-3">
                          Oriente os alunos a medir cantos da lousa, de murais, abertura de portas e cantos de janelas. Incentive a observação atenta e o uso da linguagem matemática. Oriente-os a verificar se o ângulo formado é reto, maior do que o reto ou menor do que o reto.
                        </p>
                        <p className="mb-3">
                          Após a exploração, oriente os alunos a registrar as situações em que encontraram ângulos retos, descrevendo onde estavam e como fizeram a verificação com o medidor. Finalize com uma roda de conversa, incentivando os alunos a compartilhar suas descobertas e refletir sobre a presença dos ângulos retos no cotidiano. Reforce como essa experiência ajuda a compreender a Geometria como algo presente no mundo real, e não apenas no papel.
                        </p>
                      </>
                    }
                  />
                </div>

                <QuestionRenderer
                  question={getQuestionById('ti_q6')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <div className="mb-6 mt-8">
                  <p className="mb-4">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      7.{' '}
                    </span>
                    <span style={{ color: 'black' }}>
                      Desenhe na malha quadriculada uma figura plana que tenha 4 ângulos retos.
                    </span>
                  </p>
                  <AreaDesenho
                    storageKey="sae-at27-ai4-mat-c03-malha-q7"
                    showGrid
                    gridCols={7}
                    gridRows={4}
                    width={420}
                    height={240}
                    borderColor="#80298F"
                    hint="Desenhe a figura por cima da malha"
                    maxWidth="420px"
                  />
                  <QuestionRenderer
                    question={getQuestionById('ti_q7_nome')}
                    userAnswers={userAnswers}
                    onAnswerChange={handleAnswerChange}
                    showResults={showTeacherView}
                  />
                </div>

                <QuestionRenderer
                  question={getQuestionById('ti_q8')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={70} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <p className="mb-3">
                        O objetivo das situações apresentadas nesta página e na seguinte é descrever deslocamentos e localização de pessoas e objetos no espaço usando termos, como transversais, paralelas e perpendiculares, contemplando a habilidade EF04MA016 da BNCC. Confira mais orientações no <strong>Manual do professor</strong>.
                      </p>
                    }
                  />
                </div>

                <h3 style={{ marginBottom: '2.0rem', marginTop: '2.0rem', color: '#80298F', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  RUAS TRANSVERSAIS, PARALELAS OU PERPENDICULARES
                </h3>
                <p className="mb-4 indent-6">
                  Observe o mapa das ruas próximas à escola onde Guto estuda.
                </p>

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/mapa1.png')}
                    alt="um bairro com casas, escola, posto de gasolina e carros em um cruzamento de ruas."
                  />
                  <figcaption>Beto Zoellner</figcaption>
                </figure>

                <Pagination currentPage={71} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[
                          getQuestionById('ruas_q_paralelas'),
                          getQuestionById('ruas_q_perpendiculares'),
                          getQuestionById('ruas_q_transversais'),
                        ]}
                      />
                    }
                  />
                </div>

                <QuestionRenderer
                  question={getQuestionById('ruas_q_paralelas')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <div
                  className="my-6 rounded-[20px] px-6 py-5 md:px-10"
                  style={{ backgroundColor: '#d7dcef' }}
                >
                  <p className="mb-0">
                    Ruas que não se encontram e que mantêm a mesma distância entre si são chamadas de{' '}
                    <strong>ruas paralelas</strong>.
                  </p>
                </div>

                <QuestionRenderer
                  question={getQuestionById('ruas_q_perpendiculares')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <div
                  className="my-6 rounded-[20px] px-6 py-5 md:px-10"
                  style={{ backgroundColor: '#d7dcef' }}
                >
                  <p className="mb-0">
                    Ruas que se encontram e formam 4 ângulos retos no ponto de encontro são chamadas de{' '}
                    <strong>ruas perpendiculares</strong>.
                  </p>
                </div>

                <QuestionRenderer
                  question={getQuestionById('ruas_q_transversais')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <div
                  className="my-6 rounded-[20px] px-6 py-5 md:px-10"
                  style={{ backgroundColor: '#d7dcef' }}
                >
                  <p className="mb-0">
                    Ruas que se encontram e formam ângulos diferentes do reto no ponto de encontro são chamadas de{' '}
                    <strong>ruas transversais</strong>.
                  </p>
                </div>

                <Pagination currentPage={72} expandToBookColumn />

                <OrganizandoConhecimentos />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          <span className="question-number" style={{ fontWeight: 700 }}>1.</span> <strong>BNCC:</strong> EF04MA16
                        </p>
                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>a)</span> Leandro pode morar na Rua da Luz ou na Rua do Pudim.
                        </p>
                        <p className="mb-1">
                          <span className="question-number" style={{ fontWeight: 700 }}>b)</span>
                        </p>
                        <ul className="mb-3 ml-6 list-disc">
                          <li>Rua Bonita.</li>
                          <li>Rua dos Sonhos.</li>
                        </ul>
                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>c)</span> Na Rua Bonita.
                        </p>
                      </>
                    }
                  />
                </div>

                <QuestionRenderer
                  question={getQuestionById('org_ruas_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={73} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          <span className="question-number" style={{ fontWeight: 700 }}>2.</span>{' '}
                          <strong>BNCC:</strong> EF04MA16
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                          <li>Os alunos podem colar a pessoa na Rua da Paz.</li>
                          <li>Os alunos podem colar o carro na Rua Rosada ou na Rua do Encontro.</li>
                          <li>Os alunos podem colar o motociclista na Rua do Encontro ou na Rua Bacana.</li>
                        </ul>
                      </>
                    }
                  />
                </div>

                <p className="mb-4">
                  <span className="question-number" style={{ fontWeight: 700 }}>
                    2.{' '}
                  </span>
                  <span style={{ color: 'black' }}>
                    O mapa a seguir mostra ruas de um bairro. Arraste as figuras e cole-as no mapa de acordo com as dicas de localização.
                  </span>
                </p>

                <AtividadeMapaFiguras
                  storageKey="sae-at27-ai4-mat-c03-mapa-ruas-q2"
                  mapaSrc={capAsset('images/page_17_img_0_109.png')}
                  mapaAlt="Mapa de ruas de um bairro"
                  credito="Beto Zoellner"
                  dicas={[
                    'Cole a figura da pessoa caminhando em uma rua perpendicular à Rua Rosada.',
                    'Cole a figura do carro em uma rua paralela à Rua Bacana.',
                    'Cole a figura do motociclista na esquina de uma rua transversal à Rua da Amizade.',
                  ]}
                  figuras={[
                    {
                      id: 'pessoa',
                      alt: 'Pessoa caminhando',
                      src: capAsset('images/page_17_img_221_684.png'),
                    },
                    {
                      id: 'motociclista',
                      alt: 'Motociclista',
                      src: capAsset('images/page_17_img_293_684.png'),
                    },
                    {
                      id: 'carro',
                      alt: 'Carro vermelho',
                      src: capAsset('images/page_17_img_358_686.png'),
                    },
                  ]}
                />

                <Pagination currentPage={74} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          <span className="question-number" style={{ fontWeight: 700 }}>3.</span>{' '}
                          <strong>BNCC:</strong> EF04MA16
                        </p>
                        <p className="mb-3">
                          Dê início à atividade organizando os alunos em duplas ou trios e incentive-os a conversar sobre o entorno da escola. Pergunte: Quais ruas existem ao redor? Onde ficam a entrada principal, o ponto de ônibus, a padaria ou a praça mais próxima? Estimule a troca de lembranças e observações do caminho que fazem todos os dias. Se possível, com o auxílio de outro adulto, dê a volta na quadra da escola com a turma e faça com que os alunos observem as quatro (ou mais) ruas do entorno e alguns pontos de referência. Peça a eles que desenhem um esboço do mapa das ruas no espaço indicado, representando a escola e suas redondezas. Oriente-os a usar linhas retas para representar as ruas e a pensar na disposição espacial delas: quais são paralelas, quais se cruzam formando ângulos retos e quais cortam outras em diagonal. Depois do desenho, oriente os alunos a identificar e escrever os nomes de <strong>um par de ruas paralelas</strong>, <strong>um par de ruas perpendiculares</strong> e <strong>um par de ruas transversais</strong>. Reforce o uso correto dos termos geométricos e circule pela sala para apoiar a análise dos mapas. Finalize a atividade com uma conversa coletiva: pergunte quais foram as dificuldades, o que descobriram sobre o entorno da escola e como foi utilizar os termos <strong>paralelas</strong>, <strong>perpendiculares</strong> e <strong>transversais</strong> na prática. Estimule os alunos a perceber que a Matemática está presente em cada trajeto que eles percorrem.
                        </p>
                      </>
                    }
                  />
                </div>

                <p className="mb-4">
                  <span className="question-number" style={{ fontWeight: 700 }}>
                    3.{' '}
                  </span>
                  <span style={{ color: 'black' }}>
                    Desenhe no espaço a seguir um esboço do mapa das ruas no entorno da sua escola. Depois, escreva os nomes de pares de ruas que sejam paralelas, transversais e perpendiculares entre si.
                  </span>
                </p>

                <AreaDesenho
                  storageKey="sae-at27-ai4-mat-c03-mapa-escola-q3"
                  backgroundImage={capAsset('images/page_18_img_99_125.png')}
                  width={560}
                  height={403}
                  borderColor="#ea8244"
                  hint="Desenhe o mapa das ruas no entorno da escola"
                  maxWidth="520px"
                />

                <QuestionRenderer
                  question={getQuestionById('org_ruas_q3_paralelas')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getQuestionById('org_ruas_q3_transversais')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getQuestionById('org_ruas_q3_perpendiculares')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={75} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          A atividade proposta nesta seção é a construção de um origami para que os alunos reconheçam e diferenciem tipos de ângulos formados durante as dobras. Ao utilizar uma abordagem prática e visual, os estudantes desenvolvem a percepção espacial, a compreensão geométrica e a coordenação motora, ao mesmo tempo em que exploram conceitos matemáticos em um contexto artístico e lúdico. Antes de iniciar a atividade, converse com a turma sobre o que é origami e apresente exemplos visuais. Explore a origem cultural da prática, incentivando a curiosidade dos alunos.
                        </p>
                        <p className="mb-3">
                          No <b>Material de apoio</b>, disponibilizamos duas folhas quadrangulares para essa atividade. As folhas têm estampas que remetem à pelagem de um cachorro. Os alunos podem usar a folha com a estampa que preferirem.
                        </p>
                        <p className="mb-3">
                          Durante o passo a passo, conduza os alunos com tranquilidade, realizando as dobras junto com eles e destacando os momentos em que os ângulos se formam. Utilize termos como “canto”, “abertura” ou “ponto de encontro” para facilitar a compreensão. Se algum aluno tiver mais dificuldade, ofereça a eles dobraduras pré-marcadas ou acompanhe-os de forma mais aproximada nos momentos das dobras e da pintura.
                        </p>
                      </>
                    }
                  />
                </div>


                <SaberesAcao />
                <p>
                  Você já fez um origami?
                </p>
                <ParaSaberMais />


                <p className="mb-4 indent-6">
                  O origami é a arte de dobrar papel. O termo deriva do japonês e junta as palavras “ori”, que significa “dobrar”, e “kami”, que é traduzido como “papel”.
                </p>
                <p className="mb-4 indent-6">
                  A técnica tradicional consiste em dobrar uma única folha de papel, quadrada, em uma escultura, sem fazer cortes ou colar o material. [...].
                </p>
                <p className="mb-4 indent-6">
                  As possibilidades para este tipo de técnica são várias e depende da criatividade e das habilidades de cada pessoa.
                </p>

                <p className="bloco-leitura__referencia">
                  NÓBREGA, Ana. Origami: o que é, origens e aplicações. Disponível em:{' '}
                  <a href="https://www.ecycle.com.br/origami/" target="_blank" rel="noopener noreferrer">
                    https://www.ecycle.com.br/origami/
                  </a>
                  . Acesso em: 5 abr. 2025.
                </p>

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/page_19_img_340_261.png')}
                    alt="Crianças criam pássaros de origami com papéis coloridos, demonstrando a arte de dobrar papel."
                  />
                  <figcaption>Anastasiia/stock.adobe.com</figcaption>
                </figure>

                <p className="mb-4 indent-6">
                  Agora, vamos fazer o origami de um cachorro e observar, durante o processo, como surgem diferentes tipos de ângulos com as dobras do papel.
                </p>

           

             
                  <h4 className="font-bold text-[#80298F] mb-2">Materiais</h4>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Folhas do <strong>Material de apoio</strong>.</li>
                    <li>Lápis de cor.</li>
                  </ul>
                  <h4 className="font-bold text-[#80298F] mb-2">Como fazer</h4>

                  <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
                    <div className="flex flex-1 flex-col items-center text-center">
                      <p className="mb-3">
                        <span className="question-number" style={{ fontWeight: 700 }}>
                          1.{' '}
                        </span>
                        <span style={{ color: 'black' }}>Dobre a folha ao meio.</span>
                      </p>
                      <img
                        src={capAsset('images/page_19_img_106_593.png')}
                        alt="Um quadrado laranja em formato de losango, com uma linha pontilhada horizontal no meio e uma seta curva indicando um movimento de dobra."
                        className="h-auto w-full max-w-[200px]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col items-center text-center">
                      <p className="mb-3">
                        <span className="question-number" style={{ fontWeight: 700 }}>
                          2.{' '}
                        </span>
                        <span style={{ color: 'black' }}>
                          Dobre novamente a folha ao meio para marcar o centro.
                        </span>
                      </p>
                      <img
                        src={capAsset('images/page_19_img_341_614.png')}
                        alt="Triângulo laranja com linha pontilhada vertical no centro e seta curva indicando dobra para marcar o meio."
                        className="h-auto w-full max-w-[200px]"
                      />
                    </div>
                  </div>

                <Pagination currentPage={76} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <p className="mb-3">
                        Essa atividade é uma excelente estratégia para introduzir de forma concreta e significativa o conceito de ângulo. Por meio da dobradura da folha, os alunos conseguem visualizar e construir um ângulo reto com as próprias mãos, o que facilita o seu reconhecimento e a compreensão de que ele é formado por dois segmentos de reta perpendiculares. Essa vivência prática ajuda a tornar um conteúdo, muitas vezes abstrato, em algo palpável e acessível, além de desenvolver a percepção espacial, a coordenação motora fina e o raciocínio geométrico. As dobraduras feitas pelos alunos podem ser expostas em um painel na sala de aula.
                      </p>
                    }
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-3">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      3.{' '}
                    </span>
                    <span style={{ color: 'black' }}>Desdobre a folha e dobre nas linhas pontilhadas.</span>
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={capAsset('images/page_20_img_376_82.png')}
                      alt="Folha desdobrada com linhas pontilhadas indicando as dobras."
                      className="h-auto w-full max-w-[280px]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-3">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      4.{' '}
                    </span>
                    <span style={{ color: 'black' }}>
                      Pegue uma das pontas da folha e dobre na linha pontilhada.
                    </span>
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={capAsset('images/page_20_img_241_187.png')}
                      alt="Duas etapas de dobradura de papel para criar um rosto de cachorro, mostrando a dobra de uma aba para baixo e depois a dobra de um triângulo para cima."
                      className="h-auto w-full max-w-[400px]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-3">
                    <span className="question-number" style={{ fontWeight: 700 }}>
                      5.{' '}
                    </span>
                    <span style={{ color: 'black' }}>
                      Decore o rosto do cachorro com olhos, orelhas e focinho!
                    </span>
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={capAsset('images/page_20_img_96_356.png')}
                      alt="Figura de um cachorro feito de origami em cor laranja, com olhos redondos pretos e um nariz triangular preto."
                      className="h-auto w-full max-w-[260px]"
                    />
                  </div>
                </div>

                <div className="balao-fala my-6">
                  <div className="balao-fala__nuvem balao-fala__nuvem--longo">
                    <strong>
                      OBSERVE QUE, AO DOBRAR O PAPEL, FORMAMOS DIFERENTES TIPOS DE ÂNGULOS.
                    </strong>
                  </div>
                  <figure className="flex flex-col items-center">
                    <img
                      className="balao-fala__personagem"
                      src={capAsset('images/page_20_img_360_386.png')}
                      alt="Personagem destacando a observação sobre os ângulos formados na dobradura."
                    />
                    <figcaption className="foto-com-credito-legenda">
                      Emílio Barros Jourdani
                    </figcaption>
                  </figure>
                </div>

                <ul className="list-disc marker:text-[#80298F] ml-6 mb-4">
                  <li>Agora, pinte no seu origami os ângulos de acordo com a legenda a seguir.</li>
                </ul>

                <div className="mb-6 overflow-x-auto">
                  <table className="mx-auto w-full max-w-md border-collapse">
                    <thead>
                      <tr style={{ backgroundColor: '#e86b6b' }}>
                        <th className="border border-[#e86b6b] px-4 py-2 text-center font-bold text-white">
                          Cor
                        </th>
                        <th className="border border-[#e86b6b] px-4 py-2 text-center font-bold text-white">
                          Ângulo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          className="border border-[#e86b6b] px-4 py-2 text-center font-bold"
                          style={{ color: '#2e7d32' }}
                        >
                          Verde
                        </td>
                        <td className="border border-[#e86b6b] px-4 py-2 text-center text-black">
                          Reto
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="border border-[#e86b6b] px-4 py-2 text-center font-bold"
                          style={{ color: '#d32f2f' }}
                        >
                          Vermelho
                        </td>
                        <td className="border border-[#e86b6b] px-4 py-2 text-center text-black">
                          Menor que o reto
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="border border-[#e86b6b] px-4 py-2 text-center font-bold"
                          style={{ color: '#1565c0' }}
                        >
                          Azul
                        </td>
                        <td className="border border-[#e86b6b] px-4 py-2 text-center text-black">
                          Maior que o reto
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              
                <h3 className="atividade-digital-heading">ATIVIDADE DIGITAL</h3>
                <p className="mb-4 indent-6">
                  Acesse para descobrir os ângulos em outras dobraduras.
                </p>
                <div className="my-4 flex justify-center">
                  <GameModal
                    thumbnailSrc="images/thumb_descobrindo_angulos.png"
                    introTitle="Descobrindo ângulos em dobraduras."
                    introHint="Clique para jogar"
                    thumbnailAlt="Descobrindo ângulos em dobraduras"
                  >
                    <iframe
                      src="https://go.sae.digital/TMITzO"
                      title="Descobrindo ângulos em dobraduras"
                      className="h-full w-full border-0 bg-black"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </GameModal>
                </div>

                <Pagination currentPage={77} expandToBookColumn />

                <TestandoIdeias />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          <span className="question-number" style={{ fontWeight: 700 }}>1.</span>{' '}
                          <strong>BNCC:</strong> EF04MA16
                        </p>
                        <p className="mb-3 font-semibold">Respostas:</p>
                        <p className="mb-2">
                          <span className="question-number" style={{ fontWeight: 700 }}>1. </span>
                          <span className="question-number" style={{ fontWeight: 700 }}>a) </span>
                          O ponto de encontro é o quadradinho em que os trajetos de Beto e de Elisa se encontram (pintado de azul na malha a seguir).
                        </p>
                        <img
                          src={capAsset('images/malha_beto_elisa_maria_resposta.png')}
                          alt="Malha com o ponto de encontro de Beto e Elisa pintado de azul"
                          className="mb-4 w-full max-w-[420px] h-auto mx-auto rounded-lg"
                        />
                        <p className="mb-3 flex items-start gap-2">
                          <img
                            src={publicUrl('images/iconeCaderno.png')}
                            alt=""
                            className="h-8 w-8 object-contain flex-shrink-0 mt-0.5"
                          />
                          <span>
                            <span className="question-number" style={{ fontWeight: 700 }}>b) </span>
                            Possibilidade de resposta: Maria caminhou por 3 quadradinhos e virou à direita, depois caminhou por 2 quadradinhos e virou à esquerda. Em seguida, caminhou por 2 quadradinhos e virou à direita. Então, caminhou por 2 quadradinhos.
                          </span>
                        </p>
                      </>
                    }
                  />
                </div>

                <p className="mb-4">
                  <span className="question-number" style={{ fontWeight: 700 }}>
                    1.{' '}
                  </span>
                  <span style={{ color: 'black' }}>
                    Beto, Elisa e Maria combinaram de se encontrar para brincar. Observe a localização de cada um deles na malha quadriculada a seguir.
                  </span>
                </p>

                <p className="mb-2">
                  <span className="question-number" style={{ fontWeight: 700 }}>a)</span>{' '}
                  Sabendo que eles caminharam sobre os quadradinhos da malha, pinte de{' '}
                  <strong style={{ color: '#0073b1' }}>azul</strong> o ponto de encontro de Beto e Elisa, de acordo com os trajetos descritos a seguir:
                </p>

                <div
                  className="my-4 rounded-[20px] px-6 py-5 md:px-8"
                  style={{ backgroundColor: '#f8d4d8' }}
                >
                  <ul className="list-disc ml-5 mb-0 space-y-2">
                    <li>
                      Elisa seguiu em frente por 7 quadradinhos e virou à direita. Em seguida, andou 3 quadradinhos.
                    </li>
                    <li>
                      Beto seguiu em frente por 3 quadradinhos e virou à direita. Depois, andou 3 quadradinhos e virou à esquerda. Em seguida, andou mais 3 quadradinhos, virou à direita e andou 2 quadradinhos.
                    </li>
                  </ul>
                </div>

                <AreaDesenho
                  storageKey="sae-at27-ai4-mat-c03-malha-ti77-q1a"
                  backgroundImage={capAsset('images/malha_beto_elisa_maria.png')}
                  width={720}
                  height={780}
                  borderColor="#ea8244"
                  hint="Pinte de azul o ponto de encontro de Beto e Elisa"
                  maxWidth="480px"
                />

                <p className="mb-4 mt-6 flex items-start gap-3">
                  <img
                    src={publicUrl('images/iconeCaderno.png')}
                    alt=""
                    className="h-10 w-8 object-contain flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <span className="question-number" style={{ fontWeight: 700 }}>b)</span>{' '}
                    Considerando a localização de partida de Maria e o ponto em que as crianças se encontraram,
                    descreva em seu caderno um trajeto que Maria possa ter percorrido.
                  </span>
                </p>

                <Pagination currentPage={78} expandToBookColumn />

                <p className="mb-4 indent-6 font-bold">
                  2 Denise e sua avó chamaram um carro em um aplicativo de carona para ir ao dentista. Observe na tela do celular da avó de Denise o trajeto percorrido por esse motorista.
                </p>

                <figure className="foto-com-credito foto-com-credito--sm">
                  <img
                    src={capAsset('images/page_22_img_353_68.png')}
                    alt="Mapa em um celular mostrando a rota de um carro laranja com um pino de localização vermelho."
                  />
                  <figcaption>Gabrielli Masi</figcaption>
                </figure>

                <p className="mb-2"><span className="question-number" style={{ fontWeight: 700 }}>a)</span> Quantos dos giros que o carro deu correspondem a um ângulo reto?</p>
                <p className="mb-2"><span className="question-number" style={{ fontWeight: 700 }}>b)</span> Quantos dos giros que o carro deu correspondem a um ângulo menor do que o ângulo reto?</p>

                <p className="mb-4 indent-6 font-bold mt-8">
                  3 Júlia está dando giros com seu skate. Ela começou posicionada de frente para você. Em seguida, ela deu o giro 1 e, na sequência, deu o giro 2. Observe a posição de Júlia após cada giro. Descreva os giros dados por Júlia.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_22_img_105_443.png')}
                    alt="Três versões de uma personagem feminina de cabelos ruivos, usando boné verde, jaqueta verde e calça jeans, em um skate."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                </div>

                <p className="mb-2"><strong>Giro 1</strong> Júlia deu um giro formando um ângulo reto para a esquerda.</p>
                <p className="mb-4"><strong>Giro 2</strong> Júlia deu um giro formando um ângulo reto para a esquerda.</p>

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <p className="mb-3">
                        Observe se os alunos compreenderam que o giro 2 foi dado a partir da posição final do giro 1. Mostre aos alunos que, depois desses dois giros, Júlia ficou em orientação contrária à inicial (frente e costas).
                      </p>
                    }
                  />
                </div>

                <Pagination currentPage={23} expandToBookColumn />

                <p className="mb-4 indent-6 font-bold">
                  4 Com uma régua, desenhe na malha quadriculada a seguir figuras geométricas planas de acordo com a legenda de cores.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full max-w-md mx-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Cor</th>
                        <th className="border border-gray-300 p-2 text-left">Figura formada por</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2 font-bold text-orange-500">Laranja</td>
                        <td className="border border-gray-300 p-2">4 lados e 4 ângulos retos.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-bold text-green-600">Verde</td>
                        <td className="border border-gray-300 p-2">4 lados de mesma medida e 4 ângulos retos.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-bold text-red-600">Vermelho</td>
                        <td className="border border-gray-300 p-2">3 lados e 1 ângulo reto.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-bold text-blue-600">Azul</td>
                        <td className="border border-gray-300 p-2">3 lados e 3 ângulos menores do que o reto.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <p className="mb-3">
                        Os alunos devem desenhar um retângulo ou um quadrado laranja, um quadrado verde, um triângulo acutângulo azul e um triângulo retângulo vermelho.
                      </p>
                    }
                  />
                </div>

                <p className="mb-4 indent-6 font-bold mt-8">
                  5 O <strong>X</strong> em vermelho neste mapa de ruas mostra a localização de Cassiano. Observe o mapa e resolva o item.
                </p>

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/page_23_img_167_452.png')}
                    alt="Mapa de ruas"
                  />
                  <figcaption>Beto Zoellner</figcaption>
                </figure>

                <Pagination currentPage={24} expandToBookColumn />

                <figure className="foto-com-credito foto-com-credito--lg">
                  <img
                    src={capAsset('images/page_24_img_0_-1.png')}
                    alt="Um menino de pele escura e cabelo cacheado caminha em uma calçada, passando por casas coloridas e árvores com folhas de outono."
                  />
                  <figcaption>Composição gerada por Adobe Firefly</figcaption>
                </figure>

                <ul className="list-disc marker:text-[#80298F] ml-6 mb-4">
                  <li>Que caminho Cassiano pode percorrer para chegar à rua do Riacho?</li>
                </ul>
                <p className="mb-4 indent-6">
                  Descreva cada movimento nas linhas a seguir.
                </p>
                <p className="mb-4 indent-6 text-gray-600 italic">
                  Para chegar a essa rua, Cassiano pode percorrer diferentes trajetos: Cassiano pode seguir pela Rua Encantada, virar à esquerda na Rua das Amoras. Então, seguir em frente e virar à direita na Rua Azul e depois à direita na Rua do Riacho. Ele também pode seguir em frente na Rua do Arvoredo e virar à direita na Rua Azul. Então, seguir em frente até a Rua do Riacho, virando à direita ao chegar nela.
                </p>

                <AgoraVoceJaSabe />
                {/* Aqui você pode acrescentar CriteriosAvaliacao / lista do que o aluno já sabe */}

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_24_img_455_387.png')}
                    alt="QR Code"
                    className="w-32 h-32 object-contain"
                  />
                  <p className="text-[10px] text-slate-600 mt-2 text-center">
                    Acesse o QR Code para agendar a Trilha Digital deste capítulo e avaliar o progresso dos estudantes.
                  </p>
                </div>

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

export default BookCap01;