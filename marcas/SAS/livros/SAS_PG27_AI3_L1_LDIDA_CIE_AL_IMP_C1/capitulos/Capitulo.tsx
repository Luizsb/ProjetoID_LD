// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Veja exemplos de hipóteses e de respostas não científicas a algumas perguntas.","startPage":1,"pageCount":18,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}

import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import Footer from '@player/components/Footer';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import TrocandoIdeias from '@player/components/TrocandoIdeias';
import BlocoPapelTexto from '@player/components/BlocoPapelTexto';
import CaixaDestaque from '@player/components/CaixaDestaque';
import AgoraEComVoce from '@player/components/AgoraEComVoce';
import FiqueLigado from '@player/components/FiqueLigado';
import ExperimentoPlantas from '@player/components/ExperimentoPlantas';
import Investigue from '@player/components/Investigue';
import AreaDesenho from '@player/components/AreaDesenho';
import LerEDescobrir from '@player/components/LerEDescobrir';
import ConstruindoJuntos from '@player/components/ConstruindoJuntos';
import ParaRelembrar from '@player/components/ParaRelembrar';
import RelembrarCena from '@player/components/RelembrarCena';
import NesteCapituloVoceEstudou from '@player/components/NesteCapituloVoceEstudou';
import Glossario from '@player/components/Glossario';
import MapaConceitualCientifico from '@player/components/MapaConceitualCientifico';
import { Question } from '@player/types/questions';

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/SAS/livros/SAS_PG27_AI3_L1_LDIDA_CIE_AL_IMP_C1/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const SHOW_TEACHER_BUTTON = true;

// Definição local das questões do capítulo para garantir o encapsulamento
const chapterQuestions: Question[] = [
  {
    id: 'ch1_q1',
    type: 'text-input',
    question: 'Observe a ilustração destas páginas. O que os cientistas estão fazendo?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Resposta nas <b>Orientações didáticas</b>.',
    listDiscLayout: true
  },
  {
    id: 'ch1_q2',
    type: 'text-input',
    question: 'Com base na abertura, responda: O que o trabalho dos cientistas permite descobrir?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Possibilita descobrir quais seres viveram no passado e como era a aparência deles.',
    listDiscLayout: true
  },
  {
    id: 'ch1_q3',
    type: 'text-input',
    question: 'Quais características uma pessoa deve ter para ser cientista?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Espera-se que os alunos afirmem que para ser cientista uma pessoa deve ser observadora, curiosa, questionadora, organizada etc.',
    listDiscLayout: true
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
    id: 'ch1_mapa',
    type: 'fill-blanks',
    question: 'Complete o mapa conceitual sobre as etapas do trabalho científico.',
    items: [
      { letter: 'formular', fragments: [''], correctAnswers: ['pergunta'] },
      { letter: 'elaborar', fragments: [''], correctAnswers: ['hipótese'] },
      { letter: 'fazer', fragments: [''], correctAnswers: ['dedução'] },
      { letter: 'realizar', fragments: [''], correctAnswers: ['experimento'] },
      { letter: 'chegar a uma', fragments: [''], correctAnswers: ['conclusão'] },
    ],
  },
];

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const START_PAGE = 10;
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
        <Header chapterNumber={1} chapterTitle="Passo a passo da investigação" />

        <Pagination currentPage={START_PAGE} />

        <Poster
          imageSrc={capAsset('images/page_3_img_-1_-1.png')}
          creditLine1=""
          creditLine2=""
          alt="Imagem de abertura do capítulo"
        />

        <div className="p-8 md:p-12">


          {/* <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                  Incentive os alunos a refletirem sobre o que é ciência e como os cientistas trabalham. 
                  Explore as imagens de abertura para levantar os conhecimentos prévios da turma.
                </p>
              }
            />
          </div> */}

          <p className="mb-4 indent-6">
            Em 2023, um grupo de cientistas anunciou uma nova espécie de
            dinossauro que existiu há cerca de 135 milhões de anos no Brasil. Sabe o que
            proporcionou essa descoberta? O estudo das pegadas desse animal, as quais
            foram encontradas em algumas pedras na cidade de Araraquara, em São
            Paulo. Ao estudar essas pegadas, foi possível representar como era a aparência
            e o tamanho desses dinossauros. Que incrível o trabalho dos cientistas!
          </p>

          <p className="mb-4 indent-6">
            Além do exemplo citado, os cientistas também podem estudar vários
            outros temas, como o comportamento das formigas, o que acontece em nossa
            mente quando estamos dormindo, por que o céu é azul, entre outros.
          </p>

          <p className="mb-4 indent-6">
            Neste capítulo, você vai conhecer algumas etapas do trabalho científico que possibilitam fazer diversas descobertas sobre o mundo. Você está preparado para essa aventura?
          </p>



          <Pagination currentPage={11} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q1'),
                    getQuestionById('ch1_q2'),
                    getQuestionById('ch1_q3')
                  ]}
                />
              }
            />
          </div>

          <TrocandoIdeias iconSrc={capAsset('images/selo-trocando-ideias.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
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
          </TrocandoIdeias>

          <Pagination currentPage={12} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers questions={getQuestionById('ch1_q4')} />
              }
            />
          </div>

          <h3 className="text-xl font-bold text-[#ea8244] mb-4 mt-6">Como os cientistas trabalham?</h3>
          <p className="mb-4 indent-6">
            Ser cientista é uma profissão, assim como ser vendedor, motorista de ônibus e bombeiro. Leia, abaixo, um texto sobre a cientista Aline Ghilardi e veja um pouco do seu trabalho.
          </p>

          <BlocoPapelTexto
            imageSrc={capAsset('images/page_5_img_90_174.png')}
            imageAlt="Aline Ghilardi"
            credit="Acervo pessoal"
          >
            <p>
              A cientista brasileira Aline Ghilardi é uma paleontóloga, ou seja, ela pesquisa sobre a vida de animais que existiram no passado, como os dinossauros, e os sinais e restos deixados por eles, como ossos, ovos, pegadas e até fezes. Então, estuda com muita atenção o que encontrou, registrando suas observações com cuidado. Depois, apresenta suas descobertas e conclusões à comunidade científica.
            </p>
          </BlocoPapelTexto>

          <p className="mb-4 indent-6">
            Cada profissional possui características que permitem realizar seu trabalho. Os motoristas de ônibus, por exemplo, precisam ter atenção e paciência para dirigir bem. E os cientistas? Quais características esses profissionais precisam ter para realizar seu trabalho?
          </p>

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

          <Pagination currentPage={13} expandToBookColumn />

          <h3 className="text-xl font-bold text-[#ea8244] mb-4 mt-6">O trabalho científico</h3>
          <p className="mb-4 indent-6">
            Existem várias maneiras de realizar uma pesquisa científica. O método de trabalho mais utilizado pelos cientistas é o hipotético-dedutivo. Inicialmente, para compreendê-lo, você vai descobrir o que são hipóteses e deduções, que dão nome ao método.
          </p>

          <p className="mb-4 indent-6">
            Hipóteses são as ideias iniciais que tentam responder a uma pergunta. As hipóteses devem ser científicas, ou seja, elas não podem ser explicações religiosas ou baseadas em folclore, mágicas, crenças e outras formas de conhecimento fora do campo da ciência.
          </p>

          <p className="mb-4 indent-6">
            Veja exemplos de hipóteses e de respostas não científicas a algumas perguntas.
          </p>

          <div className="balao-fala">
            <div className="balao-fala__nuvem">Por que o arco-íris aparece no céu?</div>
            <img
              className="balao-fala__personagem"
              src={capAsset('images/page_6_img_153_247.png')}
              alt=""
            />
          </div>

          <CaixaDestaque
            imageSrc={capAsset('images/page_6_img_401_376.png')}
            imageAlt="Pote de ouro no final do arco-íris"
            credit="Fer Gregory/Shutterstock"
            backgroundColor="#b1e0ea"
            circular
          >
            <p>
              <strong>Ideia não científica</strong><br /> O arco-íris aparece para indicar o local onde existe um pote cheio de ouro. Essa crença tem origem em uma lenda irlandesa que conta que gnomos esconderam seu pote de ouro no final do arco-íris.
            </p>
            <p>
              <strong>Ideia científica (hipótese)</strong> <br />O arco-íris sempre aparece de dia, quando está chovendo ou logo depois da chuva. Ele aparece quando a luz do Sol encontra gotas de água no ar.
            </p>
          </CaixaDestaque>


          <p className="mb-4 indent-6">
            Assim, você pode perceber que a hipótese científica sobre o arco-íris está baseada em observações da natureza.
          </p>

          <div className="my-6 flex flex-col items-center">
            <img
              src={capAsset('images/page_6_img_0_457.png')}
              alt="Arco-íris no céu"
              className="h-auto w-full max-w-[520px] rounded-[16px]"
            />
            <p className="mt-2 text-[10px] text-slate-600">Melinda Nagy/Shutterstock</p>
          </div>

          <Pagination currentPage={14} expandToBookColumn />





          <div className="balao-fala">
            <div className="balao-fala__nuvem">Como as sombras das pessoas se formam?</div>
            <img
              className="balao-fala__personagem"
              src={capAsset('images/page_6_img_153_247_1.png')}
              alt=""
            />
          </div>

          <CaixaDestaque
            imageSrc={capAsset('images/page_7_img_17_104.png')}
            imageAlt="Sombra"
            credit="Parry Suwanitch/Shutterstock"
            backgroundColor="#b1e0ea"
            circular
            imageSide="left"
          >
            <p>
              <strong>Ideia não científica</strong>
              <br />
              Você conhece a história de Peter Pan? Nela, a sombra é um ser com
              vida própria que segue uma pessoa e brinca com ela. Para que a
              sombra parasse de fugir de Peter Pan, ela foi costurada no sapato
              do menino.
            </p>
            <p>
              <strong>Ideia científica (hipótese)</strong> <br />A sombra de uma pessoa é formada quando o corpo dela fica
              iluminado. Como a luz não atravessa o corpo das pessoas, forma‑se
              uma área sem luz – a sombra – com o contorno do corpo.
            </p>
          </CaixaDestaque>


          <div className="mx-auto my-6 flex w-full max-w-[520px] flex-col items-center text-center">
            <img
              src={capAsset('images/page_7_img_-1_177.png')}
              alt="Criança projetando sombra no gramado"
              className="h-auto w-full max-w-[320px] rounded-[24px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px]"
            />
            <p className="mt-2 text-center text-[10px] text-slate-600" style={{ fontSize: '10px' }}>
              Assim, você pode perceber que a hipótese científica sobre a formação da sombra também
              está baseada em observações da natureza.
            </p>
          </div>


          <p className="mb-4 indent-6">
            Para desenvolver uma boa hipótese, é importante buscar fontes de pesquisa confiáveis, por exemplo: livros, revistas, <em>sites</em>, museus, universidades, centros de ciências e especialistas. Assim, é possível descobrir se a sua pergunta já foi respondida por outra pessoa, se ainda não existe uma resposta ou se a resposta encontrada não parece boa.
          </p>

          <FiqueLigado
            iconSrc={capAsset('images/selo-fique-ligado.png')}
            imageSrc={capAsset('images/page_7_img_421_606.png')}
            imageAlt="Capa do livro Peter Pan, de Pedro Bandeira"
            credit="Divulgação"
          >
            <p>
              A história de Peter Pan – o garoto que nunca cresce – e de sua turma foi recontada pelo escritor Pedro Bandeira. Conheça essa história cheia de fantasia e emoção, da qual também participam os Meninos Perdidos, Sininho, Wendy, Capitão Gancho e outros aventureiros!
            </p>
          </FiqueLigado>

          <Pagination currentPage={15} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q5'),
                    getQuestionById('ch1_q8'),
                    getQuestionById('ch1_q9'),
                  ]}
                />
              }
            />
          </div>

          <AgoraEComVoce iconSrc={capAsset('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q5')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q8')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q9')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={16} expandToBookColumn />

          <h3 className="text-xl font-bold text-[#ea8244] mb-4 mt-6">Testando hipóteses</h3>
          <p className="mb-4 indent-6">
            Quando uma pergunta já foi formulada e a hipótese elaborada, é hora de prever o que deve acontecer caso a hipótese seja válida. Essas previsões dos resultados de um experimento são chamadas de deduções.
          </p>
          <p className="mb-4 indent-6">
            Uma hipótese científica é que as plantas precisam de água para viver. Sendo assim, podemos deduzir que as plantas que não recebem água suficiente murcham, e as que recebem água suficiente não murcham. Veja abaixo a representação de um experimento para testar essa hipótese.
          </p>

          <ExperimentoPlantas
            plantaSaudavelSrc={capAsset('images/page_9_img_133_264.png')}
            plantaRegadaSrc={capAsset('images/page_9_img_133_264 - Copia.png')}
            plantaMurchaSrc={capAsset('images/page_9_img_330_544.png')}
          />

          <p className="mb-4 indent-6">
            O resultado do experimento mostrou que a planta que não recebeu água suficiente murchou, confirmando a hipótese de que as plantas precisam de água para viver.
          </p>
          <p className="mb-4 indent-6">
            Quando as deduções são confirmadas no experimento, a hipótese inicial é considerada válida.
          </p>

          <Pagination currentPage={17} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q10'),
                    getQuestionById('ch1_q11'),
                    getQuestionById('ch1_qc'),
                  ]}
                />
              }
            />
          </div>

          <Investigue iconSrc={capAsset('images/selo-investigue.png')}>

            <div className="balao-fala">
              <div className="balao-fala__nuvem balao-fala__nuvem--longo">
                Agora que você já sabe como funciona o método científico, que tal testar se uma hipótese é válida ou não? Sabemos que a água, doce em temperaturas muito baixas, congela. Mas será que acontece o mesmo com a água salgada? Vamos investigar!
              </div>
              <img
                className="balao-fala__personagem"
                src={capAsset('images/page_10_img_72_96.png')}
                alt=""
              />
            </div>
            <h3 className="text-xl font-bold text-[#ea8244] mb-4">A água salgada congela da mesma forma que a água sem sal?</h3>



            <QuestionRenderer
              question={getQuestionById('ch1_q10')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q11')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />

            <div className="investigue-passo-c">
              <img
                src={capAsset('images/selo-conto-com-voce.png')}
                alt="Conto com você!"
              />
              <p>
                <span className="question-number">C.</span> Agora, vamos testar a sua hipótese! Junto a um adulto, realize o experimento a seguir.
              </p>
            </div>

            <img
              className="investigue-selo-secao"
              src={capAsset('images/selo-material.png')}
              alt="Material"
            />
            <div className="investigue-material">
              <ul className="investigue-material__lista">
                <li>2 copos descartáveis;</li>
                <li>uma caneta marcadora;</li>
                <li>duas colheres cheias de sal;</li>
                <li>água;</li>
              </ul>
            </div>

            <img
              className="investigue-selo-secao"
              src={capAsset('images/selo-o-que-fazer.png')}
              alt="O que fazer"
            />
            <p className="mb-4">
              <span className="question-number">1.</span> Identifique cada copo, escrevendo COM SAL em um e SEM SAL no outro.
            </p>
            <div className="investigue-copos">
              <img src={capAsset('images/page_10_img_360_619.png')} alt="Copo com água" />
              <img src={capAsset('images/page_10_img_440_619.png')} alt="Copo com água" />
            </div>
          </Investigue>

          <Pagination currentPage={18} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q12'),
                    getQuestionById('ch1_q_passo5'),
                    getQuestionById('ch1_q13'),
                  ]}
                />
              }
            />
          </div>

          <Investigue continuar>
            <p className="mb-4">
              <span className="question-number">2.</span> Encha-os de água e coloque as duas colheres de sal no copo com a marcação COM SAL. Mexa bem, para que o sal se misture com a água.
            </p>
            <figure className="investigue-foto">
              <img
                src={capAsset('images/page_11_img_443_74.png')}
                alt="Copos identificados como COM SAL e SEM SAL"
              />
              <figcaption>Imagens: Shutterstock</figcaption>
            </figure>
            <p className="mb-4">
              <span className="question-number">3.</span> Leve os copos ao congelador e aguarde por duas horas.
            </p>

            <p className="mb-2">
              <span className="question-number">4.</span> Represente, por meio de desenho, como você acredita que os copos e os seus conteúdos estarão ao fim das duas horas no congelador.
            </p>
            <AreaDesenho
              storageKey="sas-pg27-ai3-cie-c1-desenho-q4"
              borderColor="#ea8244"
              width={600}
              height={320}
              maxWidth="100%"
              hint="Clique e arraste para desenhar"
            />



            <p className="mb-4">
              <span className="question-number">5.</span> Depois de duas horas, retire os copos do congelador e verifique o que aconteceu com a água presente em cada um deles.
            </p>

            <QuestionRenderer
              question={getQuestionById('ch1_q13')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </Investigue>

          <Pagination currentPage={19} expandToBookColumn />

          <LerEDescobrir iconSrc={capAsset('images/selo-ler-e-descobrir.png')}>
            <ul className="list-disc">
              <li>
                Você já viu ou ouviu falar sobre o lagarto-cinzento? Sabia que ele balança a cabeça repetidas vezes? Mas por que ele faz isso? Leia o texto abaixo e veja uma explicação dada para esse fato.
              </li>
            </ul>
          </LerEDescobrir>

          <article className="bloco-leitura">
            <h3 className="bloco-leitura__titulo">Troca de peles</h3>

            <div className="bloco-leitura__linha">
              <p>
                Há muitos e muitos anos, aconteceu um grande baile para o qual todos os bichos foram convidados. Não, a festa não foi no céu, foi em terra firme mesmo. Os animais estavam todos <span className="bloco-leitura__destaque">em polvorosa</span>, menos um…
              </p>
              <Glossario termo="Em polvorosa" definicao="agitados, barulhentos." />
            </div>

            <p>
              Tijubina, um lagarto-cinzento fêmea muito vaidoso e esperto, achando sua pele muito sem graça para comparecer à ocasião tão importante, lagarteava sobre as pedras com olhos tristes.
            </p>

            <div className="bloco-leitura__linha">
              <p>
                — Estamos às vésperas do grande baile dos bichos e eu me sinto mal por não ter uma pele mais <span className="bloco-leitura__destaque">vistosa</span>. Como posso ir nestes trajes? — disse Tijubina com voz de choro.
              </p>
              <Glossario termo="Vistoso" definicao="que chama atenção pela beleza e pelas cores." />
            </div>

            <p>
              Sensibilizado, Carâmbolo decidiu emprestar sua pele, para que a amiga pudesse ir bem bonita à festa. Disse ele:
            </p>
            <p>
              — Então, Tijubina, façamos assim: eu fico com a sua pele cinza e você vai com a minha, que é verde e reluzente. Mas, veja lá, depois do baile, desfazemos a troca!
            </p>
            <p>
              Imediatamente, Tijubina mudou de humor! Dias depois, trocou de pele com Carâmbolo e entrou no salão toda verde e vaidosa.
            </p>
            <p>
              Na saída, Carâmbolo, no traje cinza, parou para esperar a amiga, que não apareceu. Bonzinho como ele só, pensou:
            </p>
            <p>
              — Ela deve ter tido algum contratempo, ido embora mais cedo. Amanhã, ela aparece. Mas Tijubina não veio no dia seguinte, nem no outro, nem no outro… E Carâmbolo perdeu a conta dos dias que passou esperando por sua antiga pele.
            </p>
            <p>
              Hoje, ele é um lagarto-cinzento, que balança a cabeça o tempo todo, lamentando ter sido passado para trás. Vai dizer que você nunca encontrou com ele?
            </p>
            <p className="bloco-leitura__referencia">
              TROCA de peles: lenda do folclore brasileiro. <em>Ciência Hoje das Crianças</em>, ano 26, n. 244, 2013, p. 12. Disponível em:{' '}
              <a href="http://chc.org.br/" target="_blank" rel="noopener noreferrer">
                http://chc.org.br/
              </a>
              . Acesso em: 16 mar. 2026.
            </p>
          </article>


          <img src={capAsset('images/page_12_img_0_-1.png')} alt="Lagartos" />

          <Pagination currentPage={20} expandToBookColumn />

          <ul className="list-disc">
            <li>
              O texto anterior é uma explicação não científica do porquê de o lagarto-cinzento balançar a cabeça. Leia o texto abaixo e conheça uma explicação científica para esse comportamento.
            </li>
          </ul>



          <article className="bloco-leitura bloco-leitura--verde">
            <h3 className="bloco-leitura__titulo">Por que o lagarto balança tanto a cabeça?</h3>
            <p>
              […] O lagarto-cinzento segue esse ritmo o dia todo: balança a cabeça, anda alguns centímetros, balança novamente e assim segue. Quando eu era criança e nem sonhava em me tornar pesquisador, já ficava intrigado com o comportamento desse animal. Em dada ocasião, eu perguntei à minha avó se ela sabia por que ele balançava tanto a cabeça. Ela me contou uma história na época, mas eu não fiquei muito convencido e guardei essa curiosidade. Cresci, acabei me dedicando ao meio ambiente e adivinha só o que resolvi investigar? Ele, claro, o lagarto-cinzento!
            </p>
            <p>
              Depois de muita observação e estudo, descobri que, como esses lagartos são incapazes de emitir sons, eles usam esse balançar de cabeça como um meio de comunicação visual com indivíduos da mesma espécie. Se você pensou em algo semelhante à língua de sinais, […] é por aí mesmo! […]
            </p>
            <p>
              Não é interessante? Mas é bem diferente da versão que minha avó me contou […].
            </p>
            <p className="bloco-leitura__referencia">
              MIRANDA, Jivanildo Pinheiro. Por que o lagarto balança tanto a cabeça? <em>Ciência Hoje das Crianças</em>, ano 26, n. 244, 2013, p. 12. Disponível em:{' '}
              <a href="http://chc.org.br/" target="_blank" rel="noopener noreferrer">
                http://chc.org.br/
              </a>
              . Acesso em: 16 mar. 2026. (adaptado)
            </p>
          </article>

          <figure className="foto-com-credito">
            <img
              src={capAsset('images/page_13_img_-1_120.png')}
              alt="Lagarto-cinzento"
            />
            <figcaption>Karen Bogea/Shutterstock</figcaption>
          </figure>


          <Pagination currentPage={21} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('ch1_q16'),
                    getQuestionById('ch1_q17'),
                    getQuestionById('ch1_q18'),
                    getQuestionById('ch1_q19'),
                    getQuestionById('ch1_q20')
                  ]}
                />
              }
            />
          </div>


          <ul className="list-disc">
            <li>Agora, com base nos textos, responda às questões.</li>
          </ul>


          <QuestionRenderer
            question={getQuestionById('ch1_q16')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('ch1_q17')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('ch1_q18')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('ch1_q19')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('ch1_q20')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <Pagination currentPage={22} expandToBookColumn />

          <article className="bloco-texto-azul">
            <h3 className="bloco-texto-azul__titulo">E agora, o que acontece?</h3>
            <p>
              Depois de testadas, as hipóteses podem ser consideradas válidas, se as deduções feitas forem confirmadas com os experimentos. Se as deduções não forem confirmadas, as hipóteses podem ser consideradas inválidas.
            </p>
            <p>
              Em qualquer desses casos, o cientista chega a uma conclusão: ou ele encontrou uma resposta para a pergunta ou sabe que uma determinada resposta não serve.
            </p>
            <p>
              E o que esse cientista faz, então, quando sua pesquisa acaba? Ele divulga para as pessoas tudo o que ocorreu: a pergunta inicial, as hipóteses que formulou, as deduções que fez, como o experimento foi feito, os resultados obtidos e a que conclusão ele chegou.
            </p>
            <p>
              Existem revistas que divulgam estudos científicos de diversas áreas de pesquisa, por exemplo, Medicina, educação, animais, vida de indígenas, entre outras. Os cientistas precisam publicar frequentemente os resultados dos seus estudos e ler o que os colegas pesquisaram e as conclusões a que eles chegaram. Isso faz com que as pesquisas sejam conhecidas, o que ajuda na formulação de novas perguntas ou de novas hipóteses para as perguntas feitas.
            </p><br />
            <figure className="bloco-texto-azul__figura">
              <img
                src={capAsset('images/page_15_img_35_365.png')}
                alt="Pessoas consultando pesquisas em celular, computador, notebook e tablet"
              />
              <figcaption>Shutterstock</figcaption>
            </figure>
          </article>




          <FiqueLigado iconSrc={capAsset('images/selo-fique-ligado.png')}>
            <p>
              Existem algumas revistas que divulgam pesquisas de forma simples e interativa, deixando a Ciência mais acessível.
            </p>
            <p>
              Um exemplo é a revista <em>Ciência Hoje das Crianças (CHC)</em>. Com a ajuda de um adulto, acesse a revista por meio do link{' '}
              <a href="http://qr.portalsaseducacao.com.br/2dFE" target="_blank" rel="noopener noreferrer">
                http://qr.portalsaseducacao.com.br/2dFE
              </a>
              . Acesso em: 16 mar. 2026.
            </p>
          </FiqueLigado>


          <Pagination currentPage={23} expandToBookColumn />

          <div className="my-6">
              <TeacherButton
                visible={SHOW_TEACHER_BUTTON}
                content={<TeacherAnswers questions={getQuestionById('ch1_mapa')} />}
              />
            </div>

          <ConstruindoJuntos iconSrc={capAsset('images/selo-construindo-juntos.png')}>
            <div className="texto-com-selo mb-4">
              <p className="indent-6">
                Você já ouviu falar em mapa conceitual? Esse tipo de mapa mostra as relações entre ideias e palavras, ajudando a organizar conceitos e informações de forma esquematizada.
              </p>
              <img
                className="texto-com-selo__selo"
                src={capAsset('images/selo-aprender-a-conviver.png')}
                alt="Selo Aprender a conviver — Saber XXI"
              />
            </div>
            <p className="mb-4 indent-6">
              Em grupo, usando as palavras do quadro abaixo, complete o mapa conceitual sobre as etapas do trabalho científico.
            </p>

            <MapaConceitualCientifico
              questionId="ch1_mapa"
              characterSrc={capAsset('images/page_16_img_62_475.png')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />

        

            <p className="mb-4 indent-6">
              Depois de preencher o mapa conceitual, você e sua turma vão reproduzi-lo em um cartaz de forma criativa. Em seguida, cole-o no mural da sala para que possam consultá-lo sempre que precisarem.
            </p>
          </ConstruindoJuntos>

          <Pagination currentPage={24} expandToBookColumn />

          <ParaRelembrar iconSrc={capAsset('images/selo-para-relembrar.png')}>
            <div className="para-relembrar__cenas">
              <RelembrarCena
                avatarSrc={capAsset('images/1.png')}
                avatarAlt="Cientista"
                iconSrc={capAsset('images/1_1.png')}
                iconAlt=""
                fundo="#6fbf50"
                sombra="#4e9a35"
                corTexto="#fff"
                avatarLado="esquerda"
                iconePosicao="topo-direita"
                alinhamento="esquerda"
                texto="Os cientistas são curiosos e observadores e trabalham seguindo alguns passos. Vamos relembrar?!"
              />

              <RelembrarCena
                numero={1}
                avatarSrc={capAsset('images/2.png')}
                avatarAlt="Cientista com livros"
                iconSrc={capAsset('images/2_2.png')}
                iconAlt=""
                fundo="#fde9e4"
                sombra="#e07050"
                avatarLado="direita"
                iconePosicao="baixo-esquerda"
                alinhamento="direita"
                texto="O cientista faz uma pergunta e cria uma hipótese para responder a essa pergunta."
              />

              <RelembrarCena
                numero={2}
                avatarSrc={capAsset('images/3.png')}
                avatarAlt="Cientista com óculos"
                iconSrc={capAsset('images/3_3.png')}
                iconAlt=""
                fundo="#d1e8f7"
                sombra="#4a8ab8"
                avatarLado="esquerda"
                iconePosicao="baixo-direita"
                alinhamento="esquerda"
                texto="Depois que ele cria a hipótese, começa a fazer deduções."
              />
            </div>

            <Pagination currentPage={25} expandToBookColumn />

            <div className="para-relembrar__cenas">
              <RelembrarCena
                numero={3}
                avatarSrc={capAsset('images/4.png')}
                avatarAlt="Cientista fazendo experimento"
                iconSrc={capAsset('images/4_1.png')}
                iconAlt=""
                fundo="#fde9e4"
                sombra="#e07050"
                avatarLado="direita"
                iconePosicao="baixo-esquerda"
                alinhamento="direita"
                texto="Para testar a hipótese, ele faz um experimento."
              />

              <RelembrarCena
                numero={4}
                avatarSrc={capAsset('images/5.png')}
                avatarAlt="Cientista com planta"
                iconSrc={capAsset('images/5_1.png')}
                iconAlt=""
                fundo="#fff4b0"
                sombra="#f0c93a"
                avatarLado="esquerda"
                iconePosicao="baixo-direita"
                alinhamento="esquerda"
                texto="Se o experimento confirmar as deduções, a hipótese é válida. Se o experimento não confirmar as deduções, a hipótese é inválida."
              />

              <RelembrarCena
                numero={5}
                avatarSrc={capAsset('images/6.png')}
                avatarAlt="Cientista divulgando a pesquisa"
                iconSrc={capAsset('images/6_1.png')}
                iconAlt=""
                fundo="#f6dcec"
                sombra="#c45a9a"
                avatarLado="direita"
                iconePosicao="baixo-esquerda"
                alinhamento="direita"
                texto="Para que todos conheçam o resultado do seu experimento, o cientista divulga para as pessoas tudo o que aconteceu e o que ele encontrou."
              />
            </div>
          </ParaRelembrar>

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