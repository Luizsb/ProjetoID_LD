// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Localização e evolução do território brasileiro","startPage":1,"pageCount":19,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import Chapter from '@player/components/Chapter';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import type { Question } from '@player/types/questions';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import Footer from '@player/components/Footer';
import GameModal from '@player/components/GameModal';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import ConversaVai from '@player/components/ConversaVai';
import ConversaVem from '@player/components/ConversaVem';
import EscolaDigital from '@player/components/EscolaDigital';
import ParaSaberMais from '@player/components/ParaSaberMais';
import OrganizandoConhecimentos from '@player/components/OrganizandoConhecimentos';
import SaberesAcao from '@player/components/SaberesAcao';
import TestandoIdeias from '@player/components/TestandoIdeias';
import ConectandoPontos from '@player/components/ConectandoPontos';
import Glossario from '@player/components/Glossario';
import AreaColarImagem from '@player/components/AreaColarImagem';
import AreaDesenho from '@player/components/AreaDesenho';

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/SAE/livros/SAE_NV_2026_AF_07_V1_LDIDA_GEO_AL_IMP_XXX_C01_DF/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

// Controle de visibilidade do botão do professor
// Altere para false para ocultar todos os botões "Para o Professor"
const SHOW_TEACHER_BUTTON = true;

const perguntasOrganizando: Question[] = [
  {
    id: 'geo_c01_org_q1',
    type: 'text-input',
    number: 1,
    question:
      'Se a linha do Tratado de Tordesilhas ainda estivesse demarcando o limite do território brasileiro, ele seria maior ou menor do que é? Por quê?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE05</span>. Menor, pois a linha do Tratado de Tordesilhas cruza o atual território brasileiro, de norte a sul, em sua porção central, indicando que a ocupação territorial pelos brasileiros avançou muito para oeste, além do Meridiano de Tordesilhas. Isso ocorreu especialmente por conta de exploradores que penetraram o interior do país cada vez mais para oeste. Esse avanço também foi influenciado por um período histórico em que Portugal e Espanha estiveram unificados.',
  },
  {
    id: 'geo_c01_org_q2',
    type: 'text-input',
    number: 2,
    question:
      'Explique o que foi o Tratado de Petrópolis e qual foi a sua importância para a definição dos limites atuais do Brasil.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE01</span>. O Tratado de Petrópolis foi firmado em 1903, no período do Brasil República. Ele foi importante por ter incorporado o Acre ao território brasileiro e ter estabelecido os limites atuais do Brasil.',
  },
  {
    id: 'geo_c01_org_q3',
    type: 'text-input',
    number: 3,
    question: 'Leia o trecho de reportagem a seguir e responda à pergunta.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      {
        letter: 'a',
        question:
          'Qual é a principal razão para que a reportagem questione o uso do termo <strong>descobrimento</strong> para o evento histórico ocorrido no Brasil em 1500? Justifique sua resposta.',
        placeholder: 'Digite aqui...',
        correctAnswer:
          '<span class="codigo-bncc">EF07GE02</span>. A razão principal para o questionamento é o fato de que, antes da chegada dos portugueses, já havia uma grande quantidade de povos indígenas que habitavam a região, com seus próprios grupos linguísticos, organizações sociais e territórios.',
      },
      {
        letter: 'b',
        question: 'Quais foram as consequências do descobrimento do Brasil para a população nativa?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'A invasão dos territórios indígenas levou à escravização desses povos e ao apagamento de parte de sua cultura, uma vez que os conflitos ocorreram de forma violenta.',
      },
    ],
  },
];

const perguntasOrganizando2: Question[] = [
  {
    id: 'geo_c01_org2_q1',
    type: 'text-input',
    number: 1,
    question:
      'Por que, em um país grande como o Brasil, é importante manter o controle sobre as zonas de fronteira?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE05</span>. Porque quanto maiores são as fronteiras, mais recursos são necessários para sua fiscalização. Em um país extenso como o Brasil, é importante controlar as fronteiras para garantir que produtos e pessoas não transitem sem a autorização do governo brasileiro, evitando o comércio ilegal.',
  },
  {
    id: 'geo_c01_org2_q2',
    type: 'text-input',
    number: 2,
    question:
      'O mapa a seguir mostra os territórios abrangidos pelos quatro fusos horários brasileiros. Indique a região que contém a hora oficial do Brasil e explique o principal motivo dessa definição.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE09</span>. A hora oficial do Brasil equivale aos territórios localizados no 2º fuso horário. Essa definição ocorreu porque esse fuso horário abrange a maior parte do território brasileiro, incluindo a capital do país.',
    media: {
      src: capAsset('images/page_14_img_122_270.png'),
      alt: 'Mapa dos quatro fusos horários brasileiros.',
      credit: 'Talita Stasiak',
    },
  },
  {
    id: 'geo_c01_org2_q3',
    type: 'multiple-choice',
    number: 3,
    question:
      'Complete a frase assinalando a alternativa que apresenta a descrição mais adequada para o conceito de regionalização adotado em Geografia. A regionalização consiste em',
    options: {
      a: 'dividir o território de acordo com critérios políticos, criando unidades com total autonomia administrativa.',
      b: 'dividir o território de acordo com critérios naturais, agregando as áreas que apresentam o mesmo tipo de cobertura vegetal.',
      c: 'dividir o território de acordo com critérios econômicos, identificando as regiões mais e menos desenvolvidas do país conforme as atividades ali praticadas.',
      d: 'utilizar critérios variados para dividir o território, identificando áreas que apresentam características similares e demandam ações específicas para seu desenvolvimento.',
    },
    correctAnswer: 'd',
    teacherAnswer:
      '<span class="codigo-bncc">EF07GE09</span>. utilizar critérios variados para dividir o território, identificando áreas que apresentam características similares e demandam ações específicas para seu desenvolvimento.',
  },
  {
    id: 'geo_c01_org2_q4',
    type: 'multiple-choice',
    number: 4,
    question:
      'João mora em Brasília (fuso horário de GMT -3) e vai fazer uma videochamada com sua prima Laura, que mora no Acre (fuso horário de GMT -5). Se João marcar a chamada para as 15 horas (3 da tarde) no horário de Brasília, que horas serão no Acre no momento da ligação?',
    options: {
      a: '11 horas.',
      b: '12 horas.',
      c: '13 horas.',
      d: '14 horas.',
    },
    correctAnswer: 'b',
    teacherAnswer: '<span class="codigo-bncc">EF07GE09</span>. 12 horas.',
  },
  {
    id: 'geo_c01_org2_q5',
    type: 'fill-blanks',
    number: 5,
    question:
      'Relacione as colunas associando os mapas às formas de regionalização do território brasileiro.',
    hideItemLetters: true,
    teacherAnswer: '<span class="codigo-bncc">EF07GE09</span>.',
    items: [
      {
        letter: 'a',
        fragments: ['', ' Quatro Brasis.'],
        correctAnswers: ['c'],
      },
      {
        letter: 'b',
        fragments: ['', ' Complexos Regionais.'],
        correctAnswers: ['a'],
      },
      {
        letter: 'c',
        fragments: ['', ' Grandes Regiões do IBGE.'],
        correctAnswers: ['b'],
      },
    ],
  },
  {
    id: 'geo_c01_org2_q6',
    type: 'text-input',
    number: 6,
    question: 'Leia o texto a seguir.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE02</span>. Resposta pessoal. Espera-se que os alunos citem que a região Concentrada recebe esse nome pelo acúmulo de riquezas no Sudeste e Sul do país, o que favorece o aumento dos postos de trabalho, levando maior infraestrutura e serviços. Enquanto as regiões Nordeste e Norte contam com uma menor densidade de infraestrutura. O Brasil, quando analisado de forma conjunta com base nessa regionalização, revela desigualdades sociais e econômicas em diferentes partes do país.',
  },
];

const perguntaConversaVem: Question = {
  id: 'geo_c01_conversa_vem',
  type: 'text-input',
  question:
    'Por que a ocupação de pessoas é maior em algumas áreas do que em outras? O que essa concentração revela sobre a formação do território brasileiro?',
  placeholder: 'Digite aqui...',
  correctAnswer:
    'A maior concentração de pessoas em determinadas áreas ocorre devido ao processo histórico de ocupação do território brasileiro. Como a colonização do país ocorreu do litoral para o interior do país, é nas áreas ao leste que se concentram as maiores cidades e, portanto, a maior quantidade de pessoas. Confira mais orientações no <strong>Manual do professor</strong>.',
};

const perguntasSaberes: Question[] = [
  {
    id: 'geo_c01_sab_nome',
    type: 'text-input',
    question: 'Nome da UF:',
    placeholder: 'Digite aqui...',
  },
  {
    id: 'geo_c01_sab_area',
    type: 'text-input',
    question: 'Área (em km²):',
    placeholder: 'Digite aqui...',
  },
  {
    id: 'geo_c01_sab_hemisferios',
    type: 'text-input',
    question: 'Hemisférios terrestres em que ela tem territórios:',
    subQuestions: [
      { letter: '', question: '', choices: ['Setentrional (Norte)'], choicesStacked: true },
      { letter: '', question: '', choices: ['Meridional (Sul)'], choicesStacked: true },
      { letter: '', question: '', choices: ['Ocidental (Oeste)'], choicesStacked: true },
      { letter: '', question: '', choices: ['Oriental (Leste)'], choicesStacked: true },
    ],
  },
  {
    id: 'geo_c01_sab_extremos',
    type: 'text-input',
    question: 'Pontos extremos (nome da localidade):',
    subQuestions: [
      { letter: '', question: 'Norte:', placeholder: 'Digite aqui...' },
      { letter: '', question: 'Sul:', placeholder: 'Digite aqui...' },
      { letter: '', question: 'Leste:', placeholder: 'Digite aqui...' },
      { letter: '', question: 'Oeste:', placeholder: 'Digite aqui...' },
    ],
  },
  {
    id: 'geo_c01_sab_extensao',
    type: 'text-input',
    question: 'A maior extensão da UF encontra-se no sentido:',
    subQuestions: [
      {
        letter: '',
        question: '',
        choices: ['Norte-sul', 'Leste-oeste'],
        choicesStacked: true,
      },
    ],
  },
  {
    id: 'geo_c01_sab_q1',
    type: 'text-input',
    question: 'Qual é o fuso horário da UF, em relação à hora oficial do Brasil?',
    subQuestions: [
      { letter: '', question: '', choices: ['1 hora adiantado'], choicesStacked: true },
      { letter: '', question: '', choices: ['1 hora atrasado'], choicesStacked: true },
      { letter: '', question: '', choices: ['O mesmo da hora oficial do Brasil'], choicesStacked: true },
      { letter: '', question: '', choices: ['2 horas atrasado'], choicesStacked: true },
    ],
  },
  {
    id: 'geo_c01_sab_q2',
    type: 'text-input',
    question: 'A UF tem litoral?',
    subQuestions: [
      {
        letter: '',
        question: '',
        choices: ['Sim', 'Não'],
      },
    ],
  },
  {
    id: 'geo_c01_sab_q3',
    type: 'text-input',
    question: 'Territórios com os quais a UF faz divisa:',
    subQuestions: [
      { letter: '', question: 'Ao norte:', placeholder: 'Digite aqui...' },
      { letter: '', question: 'Ao sul:', placeholder: 'Digite aqui...' },
      { letter: '', question: 'Ao leste:', placeholder: 'Digite aqui...' },
      { letter: '', question: 'Ao oeste:', placeholder: 'Digite aqui...' },
    ],
  },
  {
    id: 'geo_c01_sab_q4',
    type: 'text-input',
    question: 'Nome da capital da UF:',
    placeholder: 'Digite aqui...',
  },
  {
    id: 'geo_c01_sab_q5',
    type: 'text-input',
    question: 'Nome da cidade mais antiga da UF:',
    placeholder: 'Digite aqui...',
  },
  {
    id: 'geo_c01_sab_q6',
    type: 'text-input',
    question: 'Quantos municípios existem na UF?',
    subQuestions: [
      { letter: '', question: '', placeholder: 'Digite aqui...' },
      {
        letter: '',
        question: 'Nome do <strong>maior</strong> município da UF:',
        placeholder: 'Digite aqui...',
      },
      {
        letter: '',
        question: 'Nome do <strong>menor</strong> município da UF:',
        placeholder: 'Digite aqui...',
      },
    ],
  },
  {
    id: 'geo_c01_sab_q7',
    type: 'text-input',
    question: 'Localização da UF nas regionalizações brasileiras:',
    subQuestions: [
      {
        letter: '',
        question: 'Em qual das <strong>Grandes Regiões do IBGE</strong> ela se encontra?',
        placeholder: 'Digite aqui...',
      },
      {
        letter: '',
        question:
          'Em quais dos <strong>Complexos Regionais</strong> brasileiros está a maior parte do seu território?',
        placeholder: 'Digite aqui...',
      },
      {
        letter: '',
        question: 'Em qual das regiões dos <strong>Quatro Brasis</strong> ela se encontra?',
        placeholder: 'Digite aqui...',
      },
    ],
  },
];

const perguntasTestando: Question[] = [
  {
    id: 'geo_c01_ti_q1',
    type: 'multiple-choice',
    number: 1,
    question: 'O Brasil está localizado',
    options: {
      a: 'totalmente no Hemisfério Sul e com a maior porção do território no Hemisfério Ocidental.',
      b: 'totalmente no Hemisfério Sul e com a maior porção do território no Hemisfério Oriental.',
      c: 'totalmente no Hemisfério Ocidental e com a maior porção do território no Hemisfério Sul.',
      d: 'totalmente nos hemisférios Sul e Ocidental.',
    },
    correctAnswer: 'c',
    teacherAnswer:
      '<span class="codigo-bncc">EF07GE09</span>. totalmente no Hemisfério Ocidental e com a maior porção do território no Hemisfério Sul.',
  },
  {
    id: 'geo_c01_ti_q2',
    type: 'text-input',
    number: 2,
    question:
      'Explique quais são os desafios envolvidos em organizar e administrar um território grande como o do Brasil.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE02</span>. Um território grande tem uma enorme diversidade de vegetações, climas, relevos, rios e pessoas, além de ter extensas faixas de fronteiras. Quanto maior é essa diversidade, mais difícil é administrar e organizar essas áreas porque cada uma tem particularidades naturais e culturais.',
  },
  {
    id: 'geo_c01_ti_q3',
    type: 'text-input',
    number: 3,
    question:
      'A seguir estão representados em um mapa todos os estados brasileiros e os países que compõem a América do Sul. Analise-o e siga as instruções.',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE09</span>. Marcar com um X o Equador e o Chile, únicos países da América do Sul que não têm fronteira terrestre com o Brasil. Assinalar com um círculo a Bolívia, país com a fronteira terrestre mais extensa com o Brasil. Traçar uma linha colorida na fronteira terrestre do Brasil e outra, de cor diferente, no litoral brasileiro.',
  },
  {
    id: 'geo_c01_ti_q4',
    type: 'text-input',
    number: 4,
    question:
      'Uma família que mora em Manaus e vai passar as férias em Fernando de Noronha. Ao chegar ao seu destino, a família precisará ajustar o relógio à hora local. Para isso, ela terá que adiantá-lo ou atrasá-lo em quantas horas? Por que motivo?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      '<span class="codigo-bncc">EF07GE09</span>. A família precisará adiantar o relógio em 2 horas, tendo em vista que Fernando de Noronha está situada no 1º fuso horário brasileiro, com uma hora adiantada em relação à hora oficial de Brasília, enquanto Manaus está situada no 3º fuso horário brasileiro, com uma hora atrasada em relação à hora oficial de Brasília. Outra explicação que o aluno poderá utilizar é o fato de a viagem estar ocorrendo de oeste para leste, no sentido em que as horas dos fusos horários devem ser adiantadas.',
  },
  {
    id: 'geo_c01_ti_q5',
    type: 'multiple-choice',
    number: 5,
    question:
      'O território brasileiro passou por muitas mudanças ao longo dos anos, desde seus limites externos até as regionalizações. Isso ocorre porque',
    options: {
      a: 'os limites de um território são totalmente dependentes dos elementos naturais.',
      b: 'os limites de um território são dinâmicos e se ajustam às definições históricas e políticas ao longo dos anos.',
      c: 'um território depende apenas da ocupação populacional e não tem necessidade de reconhecimento político.',
      d: 'os limites territoriais são estáticos e definitivos.',
    },
    correctAnswer: 'b',
    teacherAnswer:
      '<span class="codigo-bncc">EF07GE05</span>. os limites de um território são dinâmicos e se ajustam às definições históricas e políticas ao longo dos anos.',
  },
  {
    id: 'geo_c01_ti_q6',
    type: 'fill-blanks',
    number: 6,
    question: 'Observe o mapa a seguir.',
    questionAfterMedia: 'Preencha as lacunas com informações corretas sobre o mapa.',
    listDiscLayout: true,
    teacherAnswer: '<span class="codigo-bncc">EF07GE09</span>.',
    media: {
      src: capAsset('images/page_19_img_151_331.png'),
      alt: 'Mapa das macrorregiões geoeconômicas do Brasil: Amazônia, Nordeste e Centro-Sul.',
      credit: 'Talita Stasiak',
      caption:
        'Fonte: IBGE. <em>Regiões geoeconômicas</em>. Disponível em: <a href="http://atlasescolar.ibge.gov.br/images/atlas/mapas_brasil/brasil_regioes_geoeconomicas.pdf" target="_blank" rel="noopener noreferrer">http://atlasescolar.ibge.gov.br/images/atlas/mapas_brasil/brasil_regioes_geoeconomicas.pdf</a>. Acesso em: 28 fev. 2015. Adaptação.',
    },
    items: [
      {
        letter: 'a',
        fragments: [
          'Trata-se da proposta de regionalização do território brasileiro apresentada pelo geógrafo ',
          ', que dividiu o país em três diferentes ',
          '.',
        ],
        placeholders: ['Digite aqui...', 'Digite aqui...'],
        correctAnswers: ['Pedro Geiger', 'complexos regionais'],
      },
      {
        letter: 'b',
        fragments: [
          'O principal critério adotado nessa regionalização foi a combinação entre aspectos ',
          ', ',
          ' e ',
          ' que envolveram o processo de ',
          ' do território brasileiro.',
        ],
        placeholders: ['Digite aqui...', 'Digite aqui...', 'Digite aqui...', 'Digite aqui...'],
        correctAnswers: ['históricos', 'econômicos', 'naturais', 'ocupação'],
      },
      {
        letter: 'c',
        fragments: [
          'De acordo com essa proposta de regionalização, a região mais desenvolvida do país é a do ',
          '.',
        ],
        placeholders: ['Digite aqui...'],
        correctAnswers: ['Centro-Sul'],
      },
    ],
  },
];

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination();
  const [showTeacherView] = useState(false);
  const getOrgQuestion = (questionId: string) =>
    perguntasOrganizando.find((question) => question.id === questionId);
  const getOrg2Question = (questionId: string) =>
    perguntasOrganizando2.find((question) => question.id === questionId);

  // Restaura a posição de scroll salva
  useScrollPosition();

  return (
    <div className="marca-sae min-h-screen w-full bg-gray-200">
      {/* Sem overflow-hidden: a bandeira da paginação não pode ser cortada pela borda da coluna */}
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Header
          marca="sae"
          badge="CAPÍTULO"
          chapterNumber={1}
          chapterTitle="Localização e  
evolução do 
território brasileiro"
        />
        {/* Paginação */}
        <Pagination currentPage={currentPage} />
        {/* Conteúdo das imagens da capa */}
        <Poster
          imageSrc={capAsset('images/page_1_img_119_185.png')}
          alt="América do Sul à noite, vista do espaço, com destaque para o território brasileiro."
          creditLine1="NASA"
          creditLine2="América do Sul à noite, vista do espaço, com destaque para o território brasileiro."
          fit="contain"
        />
        <div className="p-8 md:p-12">
          <EscolaDigital
            link="https://go.sae.digital/RZHhkM"
            thumbnailSrc={capAsset('images/Geo.png')}
          />
          {/* Conteúdo do botão do professor */}
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <>
                  <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                    Espera-se que os alunos identifiquem as áreas mais iluminadas, próximas ao litoral brasileiro, com destaque para as
                    cidades. Algumas áreas são mais iluminadas do que outras por causa da presença de cidades que emitem luz, o que
                    evidencia maior ocupação
                    humana. Confira mais
                    orientações no  <strong>Manual do professor</strong>.
                  </p>

                </>
              }

            />
          </div>
          {/* Conteúdo do Capítulo 1 */}
          <Chapter
            title=""
            content={
              <>
                <ConversaVai imageSrc={capAsset('images/conversaVai.png')} />
                {/* Conteúdo de lista */}
                <ul className="list-disc marker:text-[#80298F] ml-6">
                  <p className="mb-4 indent-6">Quando observamos o Brasil visto do espaço durante a noite, é possível ver as luzes das
                    cidades. Também é possível perceber que essas luzes não se distribuem de forma igual por
                    todos os lugares.</p>
                  <li>Em que partes da imagem há mais áreas iluminadas durante a noite?</li>
                  <li>Por que algumas partes são mais iluminadas do que outras?</li>

                </ul>
                <Pagination currentPage={4} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={<TeacherAnswers questions={perguntaConversaVem} />}
                  />
                </div>
                <ConversaVem imageSrc={capAsset('images/conversaVem.png')} />
                <p className="mb-4 indent-6">
                  O território brasileiro ocupa grande parte da América do Sul e algumas áreas são mais
                  habitadas do que outras. Considerando esse aspecto, reflita sobre os questionamentos a
                  seguir.
                </p>

                <QuestionRenderer
                  question={perguntaConversaVem}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <h3 style={{ marginBottom: '2.0rem', marginTop: '2.0rem' }}>O Brasil antes da colonização</h3>

                <p className="mb-4 indent-6">Muito antes da chegada dos europeus, o território brasileiro já era ocupado por diversos
                  povos indígenas. Esses povos indígenas eram descendentes dos primeiros grupos humanos a
                  colonizar a América, por volta de 17 mil anos atrás.</p>
                <p className="mb-4 indent-6">Não é possível apontar com precisão como eles se distribuíam pelo território, mas existem
                  regionalizações aproximadas com base na língua falada por cada povo. O mapa a seguir oferece
                  um panorama dessa territorialidade pré-colonial considerando os grupos linguísticos.</p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Distribuição indígena por grupo linguístico</p>
                  <img
                    src={capAsset('images/page_2_img_96_404.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: ALBUQUERQUE, Manoel Maurício de <em>et al. Atlas histórico escolar</em>. Rio de Janeiro: FENAME, 1977. Adaptação.
                  </p>
                </div>
                <p className="prompt-atividade">
                  <img
                    src={capAsset('images/atividade.png')}
                    alt=""
                    className="prompt-atividade__icone"
                  />
                  <span className="prompt-atividade__texto">
                    Você consegue identificar a localização aproximada do estado em que você mora? Quais
                    grupos linguísticos indígenas são nativos desse local?
                  </span>
                </p>

                <Pagination currentPage={5} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}> Utilize o mapa
                          para conduzir
                          os estudantes a
                          observar como o
                          território brasileiro
                          se expandiu
                          para o oeste,
                          ultrapassando
                          em muito os
                          limites do Tratado
                          de Tordesilhas,
                          até atingir sua
                          configuração atual.
                        </p>
                        <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>O movimento de interiorização do território resultou em migrações importantes para a ocupação e configuração do território brasileiro.
                          Mencione o bandeirantismo, o tropeirismo e a busca pelas drogas do sertão como exemplos desses movimentos. Confira mais
                          orientações no <strong>Manual do professor</strong>.</p>
                      </>
                    }
                  />
                </div>
                <h3 style={{ marginBottom: '2.0rem', marginTop: '2.0rem' }}>Evolução do território brasileiro</h3>

                <p className="mb-4 indent-6">Em 1494, após a chegada dos europeus à América, governantes dos reinos de Portugal e
                  Espanha estabeleceram o Tratado de Tordesilhas. O principal objetivo desse tratado era dividir a posse dos territórios no continente americano entre os dois reinos, mas ele também tratava dos territórios portugueses na África e na atual Índia. O Meridiano de Tordesilhas tornou-se a
                  referência divisória no tratado.</p>
                <p className="mb-4 indent-6">Todas as terras, conhecidas ou não, situadas a oeste dessa marca pertenceriam à Espanha,
                  enquanto Portugal teria direito àquelas situadas a leste. O mapa a seguir mostra a linha imaginária do Tratado de Tordesilhas sobre o atual território brasileiro.</p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Local aproximado da linha imaginária do Tratado de Tordesilhas (1494)</p>
                  <img
                    src={capAsset('images/page_3_img_132_240.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: ATLAS histórico escolar. Rio de Janeiro: MEC/Fename, 1983. Adaptação.
                  </p>
                </div>
                <p className="mb-4 indent-6">No início da colonização, as terras portuguesas foram divididas em quatorze porções territoriais chamadas capitanias; elas eram administradas por famílias indicadas pela coroa portuguesa
                  e passadas de pai para filho. Por isso, receberam o nome de <strong>capitanias hereditárias</strong>.</p>
                <p className="mb-4 indent-6">Com a União Ibérica, em 1580, Portugal e Espanha passaram a ser governados pelo mesmo
                  rei: Felipe II da Espanha. Com essa união, o Tratado de Tordesilhas deixou de ser respeitado, pois
                  as terras de Portugal e da Espanha estavam sob o mesmo governo. A unificação permitiu que
                  colonos portugueses organizassem expedições em direção ao oeste da América do Sul para
                  encontrar riquezas e metais preciosos, além de ampliar o domínio português. </p>
                <p className="mb-4 indent-6">A União Ibérica terminou em 1640, com a coroação de Dom João IV da casa de Bragança. No
                  período que se seguiu, Portugal se recusou a ceder as terras espanholas ocupadas por seus colonos na América. Até o século XVIII, houve desacordos entre as Coroas portuguesa e espanhola,
                  além de reivindicações da França e da Holanda de partes do território americano. Esse contexto
                  levou à necessidade de firmar novos tratados que delimitassem a posse de terras na América.
                  Posteriormente, as expansões territoriais passaram a ocorrer por interesse do Império Brasileiro. </p>
                <Pagination currentPage={6} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>

                        <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>Auxilie os alunos na leitura do mapa, identificando cada uma das regiões apresentadas na legenda. Não é preciso contextualizar de forma aprofundada cada um
                          dos tratados, pois esse conteúdo será aprofundado no componente de História. Mais importante do que decorar datas é a compreensão de que a configuração das
                          fronteiras terrestres do território brasileiro ocorreu por meio de um processo ao longo de séculos. Confira mais orientações no <strong>Manual do professor</strong>.</p>
                      </>
                    }
                  />
                </div>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Tratados que estabeleceram as fronteiras terrestres do Brasil</p>
                  <img
                    src={capAsset('images/pag5_img1.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Luciano Daniel Tulio
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: MAEDER, Ernesto J. A.; GUTIÉRREZ, Ramón. <em>Atlas territorial e urbano das missões jesuíticas dos guaranis</em>: Argentina, Paraguay e Brasil. Sevilla:
                    Consejería de Cultura, 2009. Adaptação.
                  </p>
                </div>
                <div className="tratados-grade">
                  <article className="tratado-caixa tratado-caixa--1">
                    <span className="tratado-caixa__numero">1</span>
                    <p>
                      <strong>Tratado de Utrecht (1701-1714):</strong> diz respeito a uma série de acordos
                      envolvendo a sucessão do trono da Espanha. Nesse tratado, Portugal e França firmaram os
                      limites territoriais entre o Brasil e a Guiana Francesa, em 1713.
                    </p>
                  </article>
                  <article className="tratado-caixa tratado-caixa--2">
                    <span className="tratado-caixa__numero">2</span>
                    <p>
                      <strong>Tratado de Madrid (1750):</strong> anulou o estabelecimento de terras do Tratado de
                      Tordesilhas. Firmando novos limites territoriais entre Portugal e Espanha na América, ele
                      estipulou a maior parte dos limites definitivos do Brasil.
                    </p>
                  </article>
                  <article className="tratado-caixa tratado-caixa--3">
                    <span className="tratado-caixa__numero">3</span>
                    <p>
                      <strong>Tratado de Santo Ildefonso (1777):</strong> teve como objetivo colocar fim nas
                      disputas entre Espanha e Portugal em relação às definições do Tratado de Madrid. Com ele, a
                      ilha de Santa Catarina passa a pertencer a Portugal e Espanha.
                    </p>
                  </article>
                  <article className="tratado-caixa tratado-caixa--4">
                    <span className="tratado-caixa__numero">4</span>
                    <p>
                      <strong>Tratado de Badajoz (1801):</strong> foi um acordo firmado entre Espanha, Portugal e
                      França, em que Portugal incorporou definitivamente a região dos Sete Povos das Missões.
                      Atualmente esse território está localizado a nordeste do Rio Grande do Sul, nas margens do
                      Rio Uruguai.
                    </p>
                  </article>
                  <article className="tratado-caixa tratado-caixa--5 tratado-caixa--larga">
                    <span className="tratado-caixa__numero">5</span>
                    <p>
                      <strong>Tratado de Petrópolis (1903):</strong> firmado quando o Brasil já era uma república,
                      incorporou a região do Acre ao território brasileiro e consolidou os limites atuais do Brasil.
                    </p>
                  </article>
                </div>
                <Pagination currentPage={7} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={<TeacherAnswers questions={perguntasOrganizando} />}
                  />
                </div>

                <OrganizandoConhecimentos
                  imageSrc={capAsset('images/organizandoConhecimento.png')}
                  title="Organizando o conhecimento"
                />
                <QuestionRenderer
                  question={getOrgQuestion('geo_c01_org_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getOrgQuestion('geo_c01_org_q2')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getOrgQuestion('geo_c01_org_q3')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hideInput
                />
                <aside className="caixa-reportagem">
                  <p className="caixa-reportagem__titulo text-center">
                    <strong>&lsquo;Descobrimento do Brasil&rsquo;: 22 de abril provoca revisões sobre história do país</strong>
                  </p>
                  <p className="caixa-reportagem__texto">
                    [...] tendo em vista a gama de estudos que surgiram nesse cenário de revisionismo: “O primeiro
                    ponto seria o questionamento em torno da própria noção de mito, de descobrimento acidental;
                    mas também a própria importância de ressaltar não a chegada dos portugueses, não esse fato em
                    si, mas todo o processo de invasão que vai se desencadear após a chegada dos portugueses. O
                    mais importante é focar nesse aspecto”.
                  </p>
                  <p className="caixa-reportagem__fonte">
                    MAZOCOLI, Elisabetta. &lsquo;<em>Descobrimento do Brasil</em>&rsquo;: 22 de abril provoca revisões sobre
                    história do país. Disponível em:{' '}
                    <a
                      href="https://tribunademinas.com.br/noticias/brasil-e-mundo/21-04-2024/descobrimento-do-brasil.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://tribunademinas.com.br/noticias/brasil-e-mundo/21-04-2024/descobrimento-do-brasil.html
                    </a>
                    . Acesso em: 31 mar. 2025.
                  </p>
                </aside>
                <QuestionRenderer
                  question={getOrgQuestion('geo_c01_org_q3')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hidePrompt
                />

                <Pagination currentPage={8} expandToBookColumn />

                <h4>O território brasileiro atual</h4>
                <p className="mb-4 indent-6">
                  As constantes expansões de suas fronteiras ao longo da História contribuíram para que o
                  Brasil seja considerado um país grande. Atualmente, ele é o 5º maior país do mundo e o maior
                  da América Latina.
                </p>
                <p className="mb-4 indent-6">
                  Em relação aos meridianos, o país está localizado inteiramente a oeste do Meridiano de
                  Greenwich, no Hemisfério Ocidental. Quanto aos paralelos, a linha do Equador passa pelo
                  extremo norte do território brasileiro, o que leva uma pequena parte do país a se localizar no
                  Hemisfério Norte e a maior parte no Hemisfério Sul, conforme mostra a imagem a seguir.
                </p>
                {/* Imagem */}
                <div className="mx-auto my-6 flex w-full max-w-[520px] flex-col items-center text-center">

                  <img
                    src={capAsset('images/page_6_img_71_177.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="mt-2 text-[10px] text-slate-600" style={{ fontSize: '10px' }}>
                    Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: IBGE. <em>Atlas geográfico escolar</em>. 9. ed. Rio de Janeiro, 2023. Adaptação.
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  A extensão territorial brasileira e a localização do país no globo terrestre contribuem para
                  que o Brasil seja um país muito diverso, tanto em características físicas, como relevo e hidrografia,
                  quanto em práticas sociais e culturais. A relação da população com o ambiente é diferente dependendo de onde essas pessoas vivem; isso cria particularidades únicas em cada parte do país.
                </p>
                <section className="caixa-saber-mais">

                  <ParaSaberMais imageSrc={capAsset('images/paraSaberMais.png')} />
                  <p className="caixa-saber-mais__titulo text-center">
                    Escolas da rede estadual de Pernambuco mantêm a tradição de celebrar a cultura nordestina
                    no período junino
                  </p>
                  <p className="caixa-saber-mais__texto">
                    Os festejos juninos carregam a tradição nordestina com toda a riqueza cultural presente na
                    música, dança, culinária e brincadeiras populares. Contribuindo para o desenvolvimento da
                    identidade cultural dos estudantes, conectando-os com suas raízes e com a história de
                    Pernambuco, as escolas da rede estadual de ensino, como já é tradição, promoveram, neste ano
                    de 2025, diversas atividades pedagógicas e eventos ligados à festa, garantindo que as futuras
                    gerações conheçam e celebrem a cultura popular do Estado.
                  </p>
                  <p className="caixa-saber-mais__fonte">
                    CARDOSO, Stefania. Escolas da rede estadual de Pernambuco mantêm a tradição de celebrar a
                    cultura nordestina no período junino. Disponível em:{' '}
                    <a
                      href="https://portal.educacao.pe.gov.br/escolas-da-rede-estadual-de-pernambuco-mantem-a-tradicao-de-celebrar-a-cultura-nordestina-no-periodo-junino/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://portal.educacao.pe.gov.br/escolas-da-rede-estadual-de-pernambuco-mantem-a-tradicao-de-celebrar-a-cultura-nordestina-no-periodo-junino/
                    </a>
                    . Acesso em: 25 de jun. 2025.
                  </p>
                </section>





                <Pagination currentPage={9} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>

                        <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>Compartilhe com a turma que o Brasil tem uma série de territórios insulares oceânicos situados mais a leste do que a Ponta do
                          Seixas, como o arquipélago de Fernando de Noronha. A ilha mais oriental do Brasil é a de Martin Vaz, situada aproximadamente a
                          1,2 mil km do litoral do Espírito Santo, com longitude de 29°34’ O. Confira mais orientações no <strong>Manual do professor</strong>.</p>
                      </>
                    }
                  />
                </div>
                <p className="mb-4 indent-6">
                  Leia o mapa a seguir, que mostra as dimensões continentais do Brasil.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Pontos extremos do território brasileiro</p>
                  <img
                    src={capAsset('images/page_7_img_104_108.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: IBGE. <em>Atlas geográfico escolar</em>. 9. ed. Rio de Janeiro, 2023. Adaptação.
                  </p>
                </div>
                <p className="prompt-atividade">
                  <img
                    src={capAsset('images/atividade.png')}
                    alt=""
                    className="prompt-atividade__icone"
                  />
                  <span className="prompt-atividade__texto">
                    Como você imagina que seja a paisagem em cada um desses pontos extremos? O que o faz
                    pensar nessas características?
                  </span>
                </p>
                <p className="mb-4 indent-6">
                  Essas características são levadas em consideração quando são
                  definidos os limites de um país e
                  como é organizado o seu território. Países extensos como o Brasil
                  precisam de uma gestão mais
                  complexa, porque as pessoas de
                  cada lugar têm vivências diferentes e valorizam aspectos diferentes da cultura e da economia.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">

                  <img
                    src={capAsset('images/page_7_img_261_381.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Pulsar Imagens/stock.adobe.com
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Cestas de açaí, fruta extraída da
                    Floresta Amazônica, em Belém.
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  No estado do Amazonas, por
                  exemplo, a Floresta Amazônica
                  tem grande influência no setor
                  primário da economia e atividades como a pesca e o extrativismo têm importância
                  econômica e cultural; em São
                  Paulo, o desenvolvimento da
                  indústria fez com que o estado
                  crescesse economicamente, se
                  tornando um polo de comércio
                  para todo o Brasil.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">

                  <img
                    src={capAsset('images/page_7_img_265_566.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Casa.da.Photo/stock.adobe.com
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Prédio da Bolsa de Valores de São Paulo, onde
                    ações do mercado financeiro são negociadas.
                  </p>
                </div>

                <Pagination currentPage={10} expandToBookColumn />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p>Apresente
                          exemplos da
                          preocupação do
                          governo brasileiro
                          com atividades
                          ilegais nas
                          fronteiras, como
                          o contrabando de
                          mercadorias e a
                          biopirataria. Confira
                          mais orientações
                          no <strong>Manual do professor</strong>.</p>

                      </>
                    }

                  />
                </div>
                <h4>Fronteiras do Brasil</h4>
                <p className="mb-4 indent-6">
                  Você já se perguntou onde começa e onde termina o Brasil? Parece uma pergunta simples,
                  mas na prática é difícil delimitar com exatidão onde o território brasileiro está inserido no conti
                  nente americano. Isso ocorre porque nas áreas em que são definidos os <strong>limites</strong> do Brasil há
                  vegetações, rios, morros, montanhas e pessoas morando. Por esse motivo, para delimitar onde
                  começa e onde termina um país em relação a outro, é estabelecida uma faixa de território que
                  recebe o nome de <strong>fronteira</strong>.
                </p>
                <div className="bloco-limite-glossario">
                  <div className="caixa-definicoes">
                    <ul className="list-disc">
                      <li>
                        <strong>Limite</strong> é a linha imaginária que delimita ou divide territórios, como
                        municípios, unidades federativas e terras indígenas.
                      </li>
                      <li>
                        <strong>Fronteira</strong> é uma faixa do território que separa duas zonas ou países. Ela
                        representa uma ruptura entre dois territórios com modos de organização diferentes ou{' '}
                        <strong className="termo-glossario">antagônicos</strong>.
                      </li>
                    </ul>
                  </div>
                  <Glossario
                    termo="antagônicos"
                    definicao="aquilo que é contrário ou oposto."
                    fitaSrc={capAsset('images/glossario.png')}
                  />
                </div>

                <p className="mb-4 indent-6">
                  As fronteiras do Brasil são muito extensas; por isso, ele faz limite com quase todos os países
                  da América do Sul. Uma fronteira extensa significa que há maior possibilidade de trocas culturais e
                  comerciais entre os territórios, pois há mais espaço para circulação de pessoas e construção de vias
                  de acesso. Isso também significa que é mais difícil manter o controle para que pessoas e mercadorias não transitem entre os países sem a autorização do governo brasileiro.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Brasil: fronteiras terrestres e litoral</p>
                  <img
                    src={capAsset('images/page_8_img_122_376.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: IBGE. <em>Atlas geográfico escolar</em>. 9. ed. Rio de Janeiro, 2023. Adaptação.
                  </p>
                </div>


                <Pagination currentPage={11} expandToBookColumn />
                {/* Conteúdo do botão do professor - Tabela comparativa */}
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-4 indent-6">
                          Apresente imagens de praias em diferentes regiões do Brasil e peça à turma
                          que reflita sobre as diferenças entre elas. As praias nordestinas, por exemplo, tendem a apresentar maior quantidade de
                          dunas e faixas extensas de areia; já no litoral do sudeste e sul, são mais comuns as praias com muitos morros que se projetam
                          para o mar, pela maior proximidade das regiões serranas. Confira mais orientações no <strong>Manual do professor</strong>.
                        </p>

                      </>
                    }
                  />
                </div>

                <p className="mb-4 indent-6">
                  As faixas de <strong>fronteira terrestre</strong> constituem um espaço geográfico
                  singular. A convivência de pessoas de
                  diferentes nacionalidades contribui
                  para que trocas culturais e comerciais
                  aconteçam com mais frequência. Isso
                  ocorre porque o preço dos produtos varia de acordo com o imposto
                  e a produção de cada país, tornando
                  mais vantajoso comprar ou vender
                  certos tipos de produtos em um ou
                  outro território.
                </p>
                <p className="mb-4 indent-6">
                  As fronteiras terrestres estão localizadas no oeste do Brasil e somam
                  15 719 km, indo desde a Guiana
                  Francesa (ao norte) até o Uruguai
                  (ao sul). A Bolívia é o país com o qual
                  o Brasil tem a maior fronteira, com
                  3 423 km de extensão. A menor fronteira é com o Suriname, com apenas
                  593 km de extensão. No limite oriental, o Brasil apresenta um <strong>litoral</strong>  extenso banhado pelo Oceano
                  Atlântico. Desde o norte do Amapá
                  até o sul do Rio Grande do Sul, o país
                  soma 7 367 km de litoral.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">

                  <img
                    src={capAsset('images/page_9_img_306_81.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Ernesto Reghran/Pulsar Imagens
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Centro de compras da Ciudad del Leste, próxima
                    à fronteira entre o Paraguai e o Brasil. Nesse local,
                    muitos brasileiros compram eletrônicos e roupas a
                    preços mais baixos do que os encontrados no Brasil.
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  Ao longo desse litoral, distribuem-se centenas de ilhas costeiras. Quando elas estão próximas das
                  costas, podem abrigar comunidades,
                  vilas e até grandes cidades, como é o
                  caso da Ilha de Santa Catarina, onde
                  se situa a maior parte da metrópole
                  de Florianópolis.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">

                  <img
                    src={capAsset('images/page_9_img_301_311.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Ricucci Michele/Shutterstock
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Vista aérea da Praia dos Ingleses, em Florianópolis (SC),
                    na Ilha de Santa Catarina.
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  Quando as ilhas estão mais afastadas do litoral, sua ocupação é mais
                  difícil, porém elas podem atrair atividades de visitação turística. O arquipélago mais conhecido do país é o de
                  Fernando de Noronha, que pertence
                  ao território de Pernambuco. Outros
                  arquipélagos importantes são os de
                  São Pedro e São Paulo, de Trindade e
                  Martim Vaz, e o Atol das Rocas.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">

                  <img
                    src={capAsset('images/page_9_img_302_544.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Luciano Albano/Shutterstock
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>A Praia do Sancho, em Fernando de Noronha, já foi eleita
                    mais de uma vez como a mais bonita do mundo.
                  </p>
                </div>

                <Pagination currentPage={12} expandToBookColumn />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p>A compreensão do sistema de fusos horários exige a retomada de conteúdos como o conceito
                          de latitude e o movimento de rotação terrestre. Revise esses temas à medida que for necessário
                          para a compreensão da turma. Confira mais orientações no <strong>Manual do professor</strong>.</p>
                      </>
                    }
                  />
                </div>
                <h3 style={{ marginBottom: '2.0rem', marginTop: '2.0rem' }}>Fusos horários do Brasil</h3>
                <p className="mb-4 indent-6">
                  A longa distância entre os extremos leste e oeste do Brasil faz com que as horas do dia sejam
                  percebidas de forma diferente, um fenômeno que não é exclusivo do Brasil. À medida que as
                  trocas comerciais ficaram mais intensas em nível mundial, os países passaram a vender produtos a longas distâncias, mas não havia um padrão que estabelecesse as horas em cada localidade. A falta desse padrão fazia com que cada país precisasse se adaptar aos horários de origem
                  e destino de seus produtos.
                </p>
                <p className="mb-4 indent-6">
                  No final do século XIX, o sistema internacional de <strong>fusos horários</strong> foi instituído para resolver
                  esse problema. Esse sistema tinha como objetivo padronizar os referenciais de hora em diferentes lugares do planeta e facilitar o comércio e a comunicação entre países.
                </p>
                <p className="mb-4 indent-6">
                  Os 360° da circunferência do globo terrestre foram divididos em 24 horas, resultando em
                  fragmentos angulares de 15° para cada hora. Como a maior parte do comércio internacional nesse período envolvia a Inglaterra, ela passou a ser considerada a base para a hora oficial
                  mundial, que adotou o Meridiano de Greenwich como referência. Assim, esse meridiano passou
                  a ser o ponto central do primeiro fuso horário, conhecido como <strong>GMT</strong> (Greenwich Mean Time –
                  a hora média de Greenwich).
                </p>
                <p className="mb-4 indent-6">
                  Os limites do GMT estão situados exatamente a 7,5° para leste e oeste de Greenwich. A partir
                  deles, estabelecem-se todos os demais fusos horários. Dessa forma, na direção <strong>leste</strong> do GMT, as
                  <strong>horas são adiantadas</strong>, considerando o movimento de rotação da Terra de oeste para leste. Na
                  direção <strong>oeste</strong> ocorre o contrário e as <strong>horas são atrasadas</strong>.
                </p>
                <p className="mb-4 indent-6">
                  Dessa forma, se no Meridiano de Greenwich é meio-dia (12 horas), no mesmo momento,
                  em uma localidade situada dois fusos para leste, serão 14 horas e, em uma localidade situada
                  dois fusos para oeste, serão 10 horas.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Fusos horários – Mundo</p>
                  <img
                    src={capAsset('images/page_10_img_70_445.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Marilu de Souza
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: IBGE. <em>Atlas geográfico escolar</em>. 9. ed. Rio de Janeiro, 2023. Adaptação.
                  </p>
                </div>

                <Pagination currentPage={13} expandToBookColumn />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p>É possível relacionar
                          o conteúdo de fusos
                          horários com o
                          acompanhamento de
                          eventos esportivos, por
                          exemplo. Para praticar
                          esse conteúdo, peça
                          aos alunos que façam o
                          exercício de relacionar
                          a hora atual da aula
                          com a hora em um
                          estado de fuso horário
                          diferente. Confira mais
                          orientações no <strong>Manual do professor</strong>.
                        </p>
                      </>
                    }
                  />
                </div>
                <p className="mb-4 indent-6">
                  Para facilitar a distribuição das horas oficiais de cada país, o sistema de fusos horários foi adaptado. As linhas divisórias entre cada fuso horário não são meridianos retos no sentido norte-sul.
                  Elas apresentam diversos recortes e desvios ajustados à cobertura dos territórios dos países.
                </p>
                <p className="mb-4 indent-6">
                  Abrigando territórios que se estendem por uma faixa longitudinal superior a 45°, o Brasil
                  adota oficialmente o uso de 4 diferentes fusos horários. Todos eles encontram-se atrasados em
                  relação ao GMT.
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    margin: '0.35rem 0 1.5rem',
                  }}
                >
                  <div
                    style={{
                      padding: '0.95rem 1.1rem',
                      borderRadius: '14px',
                      background: '#d5eaf4',
                    }}
                  >
                    <p style={{ margin: 0, textIndent: 0, lineHeight: 1.5 }}>
                      1º FUSO BRASILEIRO, equivalente ao segundo fuso horário a oeste do GMT
                      (-2 GMT). Abrange boa parte das ilhas mais afastadas da costa brasileira, como o arquipélago
                      de Fernando de Noronha (PE). Essas ilhas têm 1 hora adiantada em relação ao horário de
                      Brasília, a hora oficial do Brasil.
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '0.95rem 1.1rem',
                      borderRadius: '14px',
                      background: '#f7e59a',
                    }}
                  >
                    <p style={{ margin: 0, textIndent: 0, lineHeight: 1.5 }}>
                      2º FUSO BRASILEIRO, equivalente ao terceiro fuso horário a oeste do GMT
                      (-3 GMT). Abrange todas as Unidades Federativas (UFs) das regiões Nordeste, Sudeste e Sul,
                      além de três UFs da região Norte (Pará, Amapá e Tocantins) e duas na região Centro-Oeste
                      (Goiás e o Distrito Federal). Por ser o fuso horário que abrange a maior parte do território
                      brasileiro e a capital do Brasil, ele representa a <strong>hora oficial do Brasil</strong>.
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '0.95rem 1.1rem',
                      borderRadius: '14px',
                      background: '#f3c9a6',
                    }}
                  >
                    <p style={{ margin: 0, textIndent: 0, lineHeight: 1.5 }}>
                      3º FUSO BRASILEIRO, equivalente ao quarto fuso horário a oeste do GMT
                      (-4 GMT). Abrange os estados de Roraima, Rondônia, Mato Grosso e Mato Grosso do Sul,
                      além de grande parte do Amazonas. Esses territórios têm 1 hora de atraso em relação ao
                      horário de Brasília.
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '0.95rem 1.1rem',
                      borderRadius: '14px',
                      background: '#cfe8b8',
                    }}
                  >
                    <p style={{ margin: 0, textIndent: 0, lineHeight: 1.5 }}>
                      4º FUSO BRASILEIRO, equivalente ao quinto fuso horário a oeste do GMT
                      (-5 GMT). Abrange o extremo oeste do Amazonas e o estado do Acre. Esses territórios têm 2
                      horas de atraso em relação ao horário de Brasília.
                    </p>
                  </div>
                </div>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Fusos horários – Brasil</p>
                  <img
                    src={capAsset('images/page_11_img_136_477.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: IBGE. <em>Atlas geográfico escolar</em>. 9. ed. Rio de Janeiro, 2023. p. 97. Adaptação.
                  </p>
                </div>
                <h3 className="atividade-digital-heading">ATIVIDADE DIGITAL</h3>
                <p className="mb-4 indent-6">
                  Acesse para
                  testar seus conhecimentos
                  sobre fusos horários.
                </p>
                <div className="my-4 flex justify-center">
                  <GameModal
                    thumbnailSrc={capAsset('images/thumb_horas_brasil.png')}
                    introTitle="Que horas são no Brasil?"
                    introHint="Clique para jogar"
                    thumbnailAlt="Que horas são no Brasil?"
                  >
                    <iframe
                      src="https://go.sae.digital/y2XldR"
                      title="Que horas são no Brasil?"
                      className="h-full w-full border-0 bg-black"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </GameModal>
                </div>
                <Pagination currentPage={14} expandToBookColumn />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p>Contextualize com os
                          alunos que os limites
                          entre as UFs e grandes
                          regiões, embora exatos
                          do ponto de vista político,
                          têm nuances do ponto
                          de vista ambiental e
                          populacional. Reforce,
                          a partir de exemplos, o
                          conceito de regionalização,
                          mostrando que cada forma
                          de regionalizar escolhe
                          critérios com diferentes
                          níveis de relevância; por
                          isso, há várias formas de
                          regionalizar um território.
                          Confira mais orientações
                          no <strong>Manual do
                            professor</strong>.</p>
                      </>
                    }
                  />
                </div>
                <h3 style={{ marginBottom: '2.0rem', marginTop: '2.0rem' }}>Regionalizações do Brasil</h3>
                <p className="mb-4 indent-6">
                  Os fusos horários mostram como os estados podem ser agrupados de acordo com uma
                  característica comum, as horas que escolheram adotar. A regionalização segue um processo
                  semelhante a esse; ela representa a prática de delimitar espaços em diferentes regiões geográficas. Ao definir uma região, são escolhidos critérios para áreas que apresentam características
                  comuns ou demandam ações parecidas para sua gestão e seu desenvolvimento.
                </p>
                <div
                  style={{
                    padding: '0.95rem 1.1rem',
                    borderRadius: '14px',
                    background: '#d8e9eb',
                  }}
                >
                  <p style={{ margin: 0, textIndent: '1.5rem', lineHeight: 1.5 }}>
                    As regiões geográficas são delimitações espaciais de diferentes tamanhos definidas
                    em função de um ou vários critérios.
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  O território brasileiro pode ser regionalizado de diferentes maneiras. O Instituto Brasileiro
                  de Geografia e Estatística (IBGE) divide o Brasil em cinco grandes regiões: <strong>Norte, Nordeste,
                    Centro-Oeste, Sudeste e Sul</strong>. Relembre, no mapa a seguir, quais são as Unidades da Federação
                  (UFs) que as integram.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Brasil político – grandes regiões do IBGE</p>
                  <img
                    src={capAsset('images/page_12_img_165_298.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: IBGE. <em>Atlas geográfico escolar</em>. 9. ed. Rio de Janeiro, 2023. Adaptação.
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  Para estabelecer as cinco grandes regiões, o IBGE utilizou como principal critério a orientação geográfica com base nos pontos cardeais (norte, sul, leste e oeste) e colaterais (nordeste,
                  noroeste, sudeste e sudoeste). Há também outros elementos considerados, como a natureza,
                  população e economia de cada local.
                </p>
                <p className="prompt-atividade">
                  <img
                    src={capAsset('images/atividade.png')}
                    alt=""
                    className="prompt-atividade__icone"
                  />
                  <span className="prompt-atividade__texto">
                    Você percebe semelhanças na população da sua unidade da federação e outras unidades
                    que compõem a sua região? Se sim, quais são as semelhanças?
                  </span>
                </p>
                <Pagination currentPage={15} expandToBookColumn />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p>Verifique se os alunos conseguem identificar cada uma das siglas de UFs apresentadas. Ajude-os a identificá-las no mapa,
                          analisando a distribuição dos territórios nos distintos Complexos Regionais.</p>
                        <p>Confira mais orientações no <strong>Manual do professor</strong>.</p>
                      </>
                    }
                  />
                </div>
                <p className="mb-4 indent-6">
                  Duas outras propostas de regionalização do Brasil se tornaram referências importantes. Elas
                  foram desenvolvidas por dois geógrafos brasileiros e ganharam reconhecimento pela contribuição que trouxeram aos estudos das diferenças existentes no país.
                </p>
                <p className="mb-4 indent-6">
                  Uma dessas regionalizações foi apresentada em 1967 por Pedro Pinchas Geiger. Ele dividiu o
                  Brasil em três regiões, chamadas de <strong>Regiões Geoeconômicas</strong>. Sua regionalização considerou
                  características históricas, econômicas e naturais da ocupação do território brasileiro.
                </p>
                <div
                  style={{
                    padding: '0.95rem 1.1rem',
                    borderRadius: '14px',
                    background: '#d8e9eb',
                  }}
                >
                  <p style={{ margin: 0, textIndent: '1.5rem', lineHeight: 1.5 }}>
                    Pela regionalização de Geiger, há UFs com territórios em dois (MT, TO, BA, PI e MG) ou até
                    três (MA) diferentes Complexos Regionais. A região economicamente mais desenvolvida do
                    país encontra-se na região Centro-Sul.
                  </p>
                </div>
                <p className="mb-4 indent-6">
                  Outra forma de regionalização foi proposta por Milton Santos, um dos mais importantes
                  geógrafos do Brasil. No final do século passado, a equipe dele apresentou uma nova proposta
                  de regionalização, que considerava o nível de inserção do território brasileiro no cenário tecnológico e econômico mundial.
                </p>
                <p className="mb-4 indent-6">
                  Essa regionalização ficou conhecida como a dos <strong>Quatro Brasis</strong>. A região de maior desta
                  que recebeu o nome de <strong>Concentrada</strong>, pelo nível mais alto de dinamismo econômico e conectividade com o mundo. Ela reúne as UFs de duas das grandes regiões do IBGE: a Região Sul e a
                  Região Sudeste. As regionalizações de Pedro Geiger e de Milton Santos estão representadas nos
                  mapas a seguir.
                </p>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Regiões Geoeconômicas do Brasil,
                    segundo Pedro Geiger</p>
                  <img
                    src={capAsset('images/page_13_img_98_406.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Marilu de Souza
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: IBGE. <em>Regiões geoeconômicas</em>. Disponível em: <a href="http:// atlasescolar.ibge.gov.br/images/atlas/mapas_brasil/brasil_regioes_ geoeconomicas.pdf." target="_blank" rel="noopener noreferrer">http:// atlasescolar.ibge.gov.br/images/atlas/mapas_brasil/brasil_regioes_ geoeconomicas.pdf.</a>
                    Acesso em: 28 fev. 2015. Adaptação.
                  </p>
                </div>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <p className="mb-4 indent-6 text-center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Regionalização dos Quatro Brasis,
                    desenvolvida por Milton Santos</p>
                  <img
                    src={capAsset('images/page_13_img_315_406.png')}
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                  />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Talita Stasiak
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2" style={{ fontSize: '10px' }}>Fonte: SANTOS, Milton; SILVEIRA, Maria Laura. <em>O Brasil</em>: território e sociedade
                    no início do século XXI. 8. ed. Rio de Janeiro: Record, 2005. Adaptação.
                  </p>
                </div>
                <p className="prompt-atividade">
                  <img
                    src={capAsset('images/atividade.png')}
                    alt=""
                    className="prompt-atividade__icone"
                  />
                  <span className="prompt-atividade__texto">
                    Na regionalização de Pedro Pinchas Geiger, a UF onde você mora pertence a quantas
                    regiões? Qual(is)??
                  </span>
                </p>
                <Pagination currentPage={16} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={<TeacherAnswers questions={perguntasOrganizando2.filter((q) => (q.number ?? 0) <= 3)} />}
                  />
                </div>
                <OrganizandoConhecimentos
                  imageSrc={capAsset('images/organizandoConhecimento.png')}
                  title="Organizando o conhecimento"
                />
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q2')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q3')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={17} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={perguntasOrganizando2.filter((q) => (q.number ?? 0) >= 4)}
                      />
                    }
                  />
                </div>
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q4')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q5')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hideInput
                />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '0.85rem',
                    margin: '0.35rem 0 1.25rem',
                  }}
                >
                  {[
                    {
                      letter: 'A',
                      src: capAsset('images/page_15_img_85_241.png'),
                      alt: 'Mapa A da regionalização do território brasileiro.',
                    },
                    {
                      letter: 'B',
                      src: capAsset('images/page_15_img_241_241.png'),
                      alt: 'Mapa B da regionalização do território brasileiro.',
                    },
                    {
                      letter: 'C',
                      src: capAsset('images/page_15_img_397_241.png'),
                      alt: 'Mapa C da regionalização do território brasileiro.',
                    },
                  ].map((mapa) => (
                    <figure
                      key={mapa.letter}
                      style={{
                        position: 'relative',
                        margin: 0,
                        width: 'min(100%, 220px)',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          zIndex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '1.65rem',
                          height: '1.65rem',
                          background: '#80298F',
                          color: '#fff',
                          fontFamily: "'Myriad VF', sans-serif",
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        {mapa.letter}
                      </span>
                      <img
                        src={mapa.src}
                        alt={mapa.alt}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: 'auto',
                          border: '2px solid #80298F',
                        }}
                      />
                      <figcaption
                        className="text-slate-600"
                        style={{ fontSize: '10px', marginTop: '0.35rem' }}
                      >
                        Talita Stasiak
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q5')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hidePrompt
                />
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q6')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hideInput
                />
                <div
                  style={{
                    padding: '0.95rem 1.1rem',
                    borderRadius: '14px',
                    background: '#d8e9eb',
                    margin: '0.35rem 0 1rem',
                  }}
                >
                  <p style={{ margin: 0, textIndent: '1.5rem', lineHeight: 1.5 }}>
                    O geógrafo Milton Santos criou uma proposta chamada “Os Quatro Brasis” para mostrar
                    como diferentes regiões do país vivem de maneiras muito desiguais. Segundo ele, algumas
                    áreas são mais desenvolvidas, com acesso à tecnologia, serviços públicos e oportunidades de
                    emprego, enquanto outras ainda enfrentam falta de infraestrutura e exclusão social. Para isso,
                    ele dividiu o Brasil em quatro partes com base nas características econômicas e sociais de cada
                    região. Essa forma de regionalizar o país ajuda a entender melhor a realidade brasileira, pois
                    mostra que o desenvolvimento e a qualidade de vida não são iguais em todo o território,
                    revelando desigualdades que muitas vezes não aparecem em outras divisões regionais.
                  </p>
                </div>
                <p className="mb-4">
                  De acordo com o texto, por que a regionalização dos “Quatro Brasis”, proposta por Milton
                  Santos, é importante para entender a realidade do Brasil? Explique com suas palavras como
                  essa divisão mostra as diferenças entre as regiões.
                </p>
                <QuestionRenderer
                  question={getOrg2Question('geo_c01_org2_q6')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hidePrompt
                />
                <Pagination currentPage={18} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3">
                          Antes da aula, busque na internet um mapa político em preto e branco da região que
                          será objeto de estudo. Certifique-se de que o mapa apresenta as exigências
                          cartográficas essenciais de indicação do norte e da escala utilizada. Confira mais
                          orientações no <strong>Manual do professor</strong>.
                        </p>
                        <p className="mb-3">
                          Usar latitude para os pontos N e S e longitude para os pontos L e O.
                        </p>
                        <p className="mb-3">
                          Caso a UF tenha territórios em 2 fusos horários, ambos devem ser assinalados.
                        </p>
                        <p className="mb-3">
                          Os territórios podem ser outras UFs brasileiras ou países vizinhos.
                        </p>
                        <p className="mb-3">
                          A capital e a cidade mais antiga podem ser representadas com pontos acompanhados
                          pelo nome das cidades. Mostre aos alunos o sentido por onde avançou a ocupação
                          territorial colonial da UF, apontando que nessa região estarão situadas as cidades
                          mais antigas do estado.
                        </p>
                      </>
                    }
                  />
                </div>
                <SaberesAcao
                  imageSrc={capAsset('images/saberesAcao.png')}
                  title="Saberes em ação"
                />
                <p className="mb-4 indent-6">
                  Agora, você terá a oportunidade de realizar um processo de análise semelhante ao que foi
                  feito com o território nacional, mas envolvendo outro território: o de uma Unidade da
                  Federação.
                </p>
                <p className="mb-4 indent-6">
                  O professor vai sortear uma UF da sua região e fornecer um mapa em preto e branco,
                  contendo apenas alguns contornos territoriais. Esse mapa deve ser preenchido conforme
                  solicitado em algumas das questões apresentadas a seguir. Depois, ele deve ser colado no
                  espaço da próxima página.
                </p>
                <p className="mb-4 indent-6">
                  Além de preencher o mapa, preencha também todas as lacunas a seguir, realizando pesquisas
                  na internet para encontrar as respostas corretas.
                </p>
                <ul className="list-disc ml-6">
                  {perguntasSaberes.map((question) => (
                    <li key={question.id}>
                      <QuestionRenderer
                        question={question}
                        userAnswers={userAnswers}
                        onAnswerChange={handleAnswerChange}
                        showResults={showTeacherView}
                      />
                    </li>
                  ))}
                </ul>
                <Pagination currentPage={19} expandToBookColumn />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p>A localização dos municípios solicitados no mapa pode se dar de forma bastante simples, usando um círculo maior no local
                          aproximado onde fica o município com maior área, e outro menor referente ao município com menor área. Esses dados estão
                          disponíveis na internet. Não é necessário, portanto, que haja precisão nessa e mesmo em outras anotações que serão feitas pelo
                          aluno no mapa. Convém lembrar que a atividade contribui para a alfabetização cartográfica por meio do exercício de localização e
                          orientação. Sugere-se que os mapas sejam devidamente corrigidos e avaliados antes da colagem.</p>
                      </>
                    }
                  />
                </div>
                <p className="mb-4 indent-6">
                  Cole no espaço a seguir o mapa do estado pesquisado e preencha-o utilizando as
                  informações registradas na página anterior.
                </p>
                <AreaColarImagem storageKey="geo_c01_sab_mapa_uf" />
                <Pagination currentPage={20} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={<TeacherAnswers questions={perguntasTestando.filter((q) => (q.number ?? 0) <= 3)} />}
                  />
                </div>
                <TestandoIdeias
                  imageSrc={capAsset('images/testantoIdeias.png')}
                  title="Testando as ideias"
                />
                {perguntasTestando
                  .filter((question) => (question.number ?? 0) <= 2)
                  .map((question) => (
                    <QuestionRenderer
                      key={question.id}
                      question={question}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      showResults={showTeacherView}
                    />
                  ))}
                <QuestionRenderer
                  question={perguntasTestando.find((question) => question.id === 'geo_c01_ti_q3')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hideInput
                />
                <ul className="list-disc ml-6 mb-6">
                  <li className="mb-3">
                    Marque os únicos países que não têm fronteira terrestre com o território brasileiro,
                    assinalando-os com um X.
                  </li>
                  <li className="mb-3">
                    Marque o país que tem a fronteira terrestre mais extensa com o Brasil, assinalando-o
                    com um círculo.
                  </li>
                  <li className="mb-3">
                    Faça uma linha colorida na fronteira terrestre do Brasil; em seguida, faça uma linha de
                    cor diferente no litoral brasileiro.
                  </li>
                </ul>
                <div className="mapa-atividade" style={{ textAlign: 'center', margin: '0.35rem 0 1.5rem' }}>
                  <AreaDesenho
                    backgroundImage={capAsset('images/page_18_img_91_382.png')}
                    storageKey="geo_c01_ti_q3_mapa"
                    borderColor="#80298F"
                    width={560}
                    height={670}
                    maxWidth="100%"
                    enableLineTool
                    hint="Marque no mapa com X, círculo e linhas coloridas."
                  />
                  <p className="text-slate-600" style={{ fontSize: '10px', marginTop: '0.35rem' }}>
                    Talita Stasiak
                  </p>
                </div>
                <Pagination currentPage={21} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={perguntasTestando.filter((q) => (q.number ?? 0) >= 4)}
                      />
                    }
                  />
                </div>

                {perguntasTestando
                  .filter((question) => (question.number ?? 0) >= 4)
                  .map((question) => (
                    <QuestionRenderer
                      key={question.id}
                      question={question}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      showResults={showTeacherView}
                    />
                  ))}
                <Pagination currentPage={22} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p>O objetivo desta seção é retomar e sintetizar os conteúdos do capítulo, além de permitir o desenvolvimento da autonomia e da
                          criatividade. O mapa apresentado é uma sugestão, por isso pode ser aprimorado com outros conceitos, desenhos, exemplos etc.
                          O aluno também pode produzi-lo na ferramenta digital disponível. </p>
                        <div className="flex flex-col items-center my-6">
                          <img
                            src={capAsset('images/22r.png')}
                            className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto "
                          />
                        </div>
                      </>
                    }
                  />
                </div>
                <ConectandoPontos imageSrc={capAsset('images/conectandoPontos.png')} />
                <p className="mb-4 indent-6">
                  Crie seu mapa mental sobre os conteúdos trabalhados neste capítulo. Retome as
                  informações e relacione-as com setas. Use os termos a seguir para iniciar sua
                  produção.
                </p>
                <div className="conectando-pontos-termos">
                  <span>Brasil</span>
                  <span>Extensão territorial</span>
                  <span>Fronteiras terrestres</span>
                  <span>Fusos horários</span>
                  <span>Grandes Regiões (IBGE)</span>
                  <span>Complexos Regionais</span>
                  <span>Quatro Brasis</span>
                </div>

                <h3 className="atividade-digital-heading">MAPA MENTAL</h3>
                <p className="mb-4 indent-6">
                  Você também pode usar a
                  nossa ferramenta digital para
                  criar o seu mapa mental.
                </p>
                <div className="my-4 flex justify-center">
                  <GameModal
                    thumbnailSrc={capAsset('images/mapaMental.png')}
                    introTitle=""
                    introHint="Clique para criar o seu mapa mental"
                    thumbnailAlt=""
                  >
                    <iframe
                      src="https://go.sae.digital/3pVsPz"
                      title=""
                      className="h-full w-full border-0 bg-black"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </GameModal>
                </div>
              </>
            }
          />

        </div>

        <Footer />
      </div>

      {currentPage > 3 && (
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