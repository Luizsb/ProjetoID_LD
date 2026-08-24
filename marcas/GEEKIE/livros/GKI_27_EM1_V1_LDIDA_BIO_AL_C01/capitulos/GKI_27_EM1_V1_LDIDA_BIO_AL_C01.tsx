// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"A construção do conhecimento científico e as hipóteses sobre a origem da vida","startPage":1,"pageCount":22,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}

import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import Chapter from '@player/components/Chapter';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import CaixaTexto from '@player/components/CaixaTexto';
import QuestionRenderer from '@player/components/QuestionRenderer';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import Footer from '@player/components/Footer';
import EscolaDigital from '@player/components/EscolaDigital';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import ImageZoom from '@player/components/ImageZoom';
import { Question } from '@player/types/questions';

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/GEEKIE/livros/GKI_27_EM1_V1_LDIDA_BIO_AL_C01/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const SHOW_TEACHER_BUTTON = true;

function BarraProgressoGeekie({
  filled,
  interactive = false,
  disabled = false,
  onChange,
  label,
}: {
  filled: number;
  interactive?: boolean;
  disabled?: boolean;
  onChange?: (level: number) => void;
  label?: string;
}) {
  const cells = [1, 2, 3];

  return (
    <div
      className={`barra-progresso${interactive ? ' barra-progresso--clicavel' : ''}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={label}
    >
      {cells.map((level) =>
        interactive ? (
          <button
            key={level}
            type="button"
            className={`barra-progresso__celula${filled >= level ? ' is-on' : ''}`}
            aria-label={`${level} de 3`}
            aria-pressed={filled >= level}
            disabled={disabled}
            onClick={() => onChange?.(filled === level ? 0 : level)}
          />
        ) : (
          <span
            key={level}
            className={`barra-progresso__celula${filled >= level ? ' is-on' : ''}`}
          />
        ),
      )}
    </div>
  );
}

const questions = [
  {
    id: 'c1_q1',
    type: 'text-input',
    question: '1. Escolha uma <strong>frase</strong> (do texto) que capture a ideia central. Justifique sua escolha usando exemplos (“Escolhi esta frase porque…”).',
    placeholder: 'Digite aqui...'
  },
  {
    id: 'c1_q2',
    type: 'text-input',
    question: '2. Escolha um <strong>trecho</strong> (diferente da frase) que você ache significativo ou provocativo. Justifique sua escolha usando exemplos (“Escolhi este trecho porque…”).',
    placeholder: 'Digite aqui...'
  },
  {
    id: 'c1_q3',
    type: 'text-input',
    question: '3. Escolha uma <strong>palavra</strong> (diferente da frase e do trecho) que capture sua atenção. Justifique sua escolha usando exemplos (“Escolhi esta palavra porque…”).',
    placeholder: 'Digite aqui...'
  },
  {
    id: 'c1_q4',
    type: 'text-input',
    number: 1,
    question: 'Questão 1: Um quarto bagunçado como o do Cascão pode originar comentários como “desse jeito, vai nascer bicho!” na linguagem popular. Afirmações como essa se relacionam a uma explicação sobre a origem dos seres vivos que não é mais aceita pela ciência. Cite-a, explicitando o erro da expressão popular associada a ela e explique as razões de ter se tornado obsoleta.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'A expressão relaciona-se à teoria da abiogênese (geração espontânea), que defendia que seres vivos poderiam surgir da matéria inanimada, como a sujeira. O erro está em associar o surgimento de organismos à bagunça, e não a outros seres vivos. A ideia tornou-se obsoleta porque experimentos como os de Redi e Pasteur demonstraram que a vida se origina apenas de seres vivos preexistentes (biogênese).',
  },
  {
    id: 'c1_q5',
    type: 'multiple-choice',
    number: 2,
    question: 'No século XVII, Francesco Redi colocou pedaços de carne em frascos abertos e fechados. Após alguns dias, larvas apareceram apenas nos frascos abertos. A partir desse experimento, é correto afirmar que:',
    options: {
      a: 'O experimento comprovou a abiogênese, pois as larvas surgiram espontaneamente da carne.',
      b: 'As larvas surgiram espontaneamente da carne em todos os frascos, confirmando a biogênese.',
      c: 'O experimento demonstrou que as larvas se originaram de ovos depositados por moscas, apoiando a biogênese.',
      d: 'O experimento provou que o ar não tem relação com o surgimento de seres vivos.',
      e: 'O experimento mostrou que teorias científicas são imutáveis e não dependem de evidências.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'c1_q6',
    type: 'multiple-choice',
    number: 3,
    question:
      '(UNICENTRO – PR)<br /><br />Em 7 de abril de 1864, Louis Pasteur apresentou o resultado de muitos anos de pesquisas, em uma conferência na Sorbonne (Universidade de Paris). Considere a transcrição de algumas palavras proferidas por Louis Pasteur na respectiva ocasião.<br /><br /><span style="display:block;padding-left:1.5rem;">“não há condição conhecida hoje em dia pela qual vocês possam afirmar que seres microscópicos vêm ao mundo sem germes, sem pais iguais a eles. Os que defendem isso exercitam o esporte das ilusões, das experiências malfeitas, viciadas por erros que não foram capazes de reconhecer e não souberam como evitar”.</span><br /><span style="display:block;text-align:right;">PASTEUR, L. Chimie appliqué à la physiologie. <em>Revue des cours scientifiques</em>, I: 257-65, 1864.</span><br />Ao proferir essas palavras, Louis Pasteur faz uma dura crítica aos defensores da:',
    options: {
      a: 'teoria da biogênese.',
      b: 'teoria celular.',
      c: 'teoria da evolução química.',
      d: 'teoria da pré-formação.',
      e: 'teoria da geração espontânea.',
    },
    correctAnswer: 'e',
  },
  {
    id: 'c1_q7',
    type: 'multiple-choice',
    number: 4,
    question: '(UFLA – MG) De acordo com a hipótese gradual dos sistemas químicos, proposta por Oparin e Haldane, o surgimento dos primeiros seres vivos na Terra ocorreu:',
    options: {
      a: 'A partir de outro ser vivo, como os microrganismos existentes no ar.',
      b: 'Por meio de um “princípio ativo” encerrado no interior de certas porções de matéria.',
      c: 'A partir da formação de numerosos aglomerados, envoltos por moléculas de água, conhecidos por coacervados.',
      d: 'Por meio de geração espontânea a partir de material orgânico em decomposição, do lodo e de outros materiais não vivos.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'c1_q8',
    type: 'text-input',
    question: 'Questão 5: Explique em que consiste a panspermia cósmica e aponte argumentos científicos que dão suporte ou levantam dúvidas sobre essa hipótese no contexto do entendimento da origem da vida.',
    placeholder: 'Digite aqui...'
  },
  {
    id: 'c1_q9',
    type: 'text-input',
    question: 'Questão 6: A discussão sobre a nutrição dos primeiros seres vivos divide-se principalmente entre as hipóteses heterotrófica e autotrófica. A primeira pressupõe que a vida surgiu em mares ricos em matéria orgânica, enquanto a segunda propõe que os primeiros seres habitavam ambientes extremos, como fontes termais, obtendo energia de reações minerais do meio.',
    placeholder: 'Digite aqui...',
    subQuestions: [
      {
        letter: 'a',
        question: 'Como a hipótese heterotrófica explica a sobrevivência e a obtenção de energia dos primeiros organismos da Terra primitiva?',
        placeholder: 'Digite aqui...',
      },
      {
        letter: 'b',
        question: 'Qual o principal argumento que levou os cientistas a cogitarem a hipótese autotrófica frente às condições do planeta?',
        placeholder: 'Digite aqui...',
      },
    ],
  },
  {
    id: 'c1_q10',
    type: 'multiple-choice',
    number: 7,
    question: 'Leia o texto para responder à questão.<br />A hipótese endossimbiótica propõe que organelas celulares de eucariotos, como mitocôndrias e cloroplastos, originaram-se de procariontes primitivos que foram englobados por células maiores. Em vez de digeridos, esses organismos estabeleceram uma relação de simbiose mútua, integrando-se definitivamente à estrutura celular hospedeira. <br />Uma evidência biológica e estrutural que sustenta diretamente essa hipótese é a:',
    options: {
      a: 'presença de parede celular rígida nessas organelas, semelhante à membrana plasmática de bactérias.',
      b: 'ocorrência de DNA próprio e de ribossomos semelhantes aos encontrados em procariontes.',
      c: 'capacidade dessas estruturas de sobreviverem e se dividirem de forma isolada fora da célula viva.',
      d: 'ausência completa de síntese de proteínas no interior dessas organelas ao longo de sua evolução.',
      e: 'existência de uma única membrana lipídica que envolve a organela, idêntica à do retículo celular.',
    },
    correctAnswer: 'b',
  },
  {
    id: 'c1_q11',
    type: 'multiple-choice',
    number: 8,
    question: '(UECE) Em relação às características gerais dos seres vivos, é correto afirmar que:',
    options: {
      a: 'nascem unicelulares, crescem pluricelulares e morrem multicelulares, no que diz respeito ao número de células.',
      b: 'o metabolismo representa o aumento constante do tamanho do organismo em função da sua capacidade de incorporar e transformar matéria orgânica.',
      c: 'possuem algumas características em comum como ciclo vital, crescimento, metabolismo, reprodução e evolução.',
      d: 'neles ocorrem mutações, durante a reprodução, que promovem a evolução em todos os organismos de uma espécie garantindo a biodiversidade.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'c1_q12',
    type: 'multiple-choice',
    number: 9,
    question: '(ENEM) Em certos locais, larvas de moscas, criadas em arroz cozido, são utilizadas como iscas para pesca. Alguns criadores, no entanto, acreditam que essas larvas surgem espontaneamente do arroz cozido, tal como preconizado pela teoria da geração espontânea. Essa teoria começou a ser refutada pelos cientistas ainda no século XVII, a partir dos estudos de Redi e Pasteur, que mostraram experimentalmente que:',
    options: {
      a: 'seres vivos podem ser criados em laboratório.',
      b: 'a vida se originou no planeta a partir de microrganismos.',
      c: 'o ser vivo é oriundo da reprodução de outro ser vivo pré-existente.',
      d: 'seres vermiformes e microrganismos são evolutivamente aparentados.',
      e: 'vermes e microrganismos são gerados pela matéria existente nos cadáveres e nos caldos nutritivos, respectivamente.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'c1_q13',
    type: 'multiple-choice',
    number: 10,
    question: '(UNICAMP – SP) Na antiguidade, alguns cientistas e pensadores famosos tinham um conceito curioso sobre a origem da vida e em alguns casos existiam até receitas para reproduzir esse processo. Os experimentos de Pasteur foram importantes para a mudança dos conceitos e hipóteses alternativas para o surgimento da vida. Evidências sobre a origem da vida sugerem que:',
    options: {
      a: 'a composição química da atmosfera influenciou o surgimento da vida.',
      b: 'os coacervados deram origem às moléculas orgânicas.',
      c: 'a teoria da abiogênese foi provada pelos experimentos de Pasteur.',
      d: 'o vitalismo é uma das bases da biogênese.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'c1_q14',
    type: 'multiple-choice',
    number: 11,
    question:
      '(UEMA) Analise a representação esquemática do experimento conhecido como “pescoço de cisne” para responder à questão.<br /><br />Louis Pasteur realizou um experimento sobre geração espontânea, no qual demonstrou que os microrganismos presentes em caldos previamente esterilizados eram provenientes do ar, ou seja, não surgiam de forma espontânea. Com isso a Teoria da Geração Espontânea foi sepultada definitivamente, dando lugar à Teoria da Biogênese.<br /><br />Para que Pasteur derrubasse a teoria da abiogênese, no experimento, a etapa decisiva foi a:',
    options: {
      a: '1, porque o caldo nutritivo estava livre de contaminação por quaisquer tipos de microrganismos, independente da forma do gargalo.',
      b: '3, porque, após a esterilização do caldo nutritivo, o mesmo ficou impróprio para o desenvolvimento de microrganismos.',
      c: '2, porque, com a curvatura do gargalo do frasco em forma de “pescoço de cisne”, Pasteur garantiu a entrada de ar, sem, contudo, contaminar o caldo nutritivo com microrganismos.',
      d: '4, porque, mesmo depois do aquecimento, “surgiram” microrganismos, independente das etapas anteriores.',
      e: '5, porque, com a curvatura do gargalo do frasco em forma de “pescoço de cisne”, o frasco ficou com aspecto mais agradável.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'c1_q15',
    type: 'multiple-choice',
    number: 12,
    question: '(UNICENTRO – PR) Segundo a teoria de Oparin, a vida na Terra poderia ter sido originada a partir de substâncias orgânicas formadas pela combinação de moléculas... Considerando os processos de formação e as formas de utilização dos gases oxigênio e dióxido de carbono, a sequência mais provável dos primeiros seres vivos na Terra foi:',
    options: {
      a: 'autotróficos, heterotróficos anaeróbicos e heterotróficos aeróbicos.',
      b: 'heterotróficos anaeróbicos, heterotróficos aeróbicos e autotróficos.',
      c: 'autotróficos, heterotróficos aeróbicos e heterotróficos anaeróbicos.',
      d: 'heterotróficos anaeróbicos, autotróficos e heterotróficos aeróbicos.',
      e: 'heterotróficos aeróbicos, autotróficos e heterotróficos anaeróbicos.',
    },
    correctAnswer: 'd',
  }
] as Question[];

function BookCap01() {
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
        <Header marca="geekie" chapterNumber={1} chapterTitle="A origem da vida" />

        <Pagination currentPage={9} />

        <Poster
          imageSrc={capAsset('images/page_1_img_14_157.png')}
          alt="Um robô explorador em Marte, com painéis solares abertos, braço robótico e uma escavação no solo."
          creditLine1="NASA/JPL-CALTECH"
          creditLine2="Sonda Insight, da NASA, em 
missão de coletar dados para 
identificar evidências da presença 
de água líquida em Marte. A missão 
durou de 2018 a 2022."
        />

        <div className="p-8 md:p-12">
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <>
                  <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                    <strong>Dica do professor</strong> Apresente aos(às) estudantes o <em>checklist</em> com os objetivos de aprendizagem no início do capítulo. Oriente-os a marcar os itens à medida que forem estudando e compreendendo cada objetivo. Explique que esse acompanhamento ajuda a monitorar o progresso ao longo do tempo. Incentive o uso contínuo do <em>checklist</em> para manter o foco e identificar pontos que precisam de reforço.
                  </p>
                  <ol className="list-decimal list-inside">
                    <li>Explique aos estudantes a finalidade das atividades digitais, incentive-os a explorar a plataforma para realizá-las e acompanhe os dados
                      gerados para orientar o progresso e estimular a reflexão sobre o aprendizado.</li>
                    <li>Acesse o capítulo digital, na plataforma Geekie One, para conferir todas as resoluções e orientações ao professor</li>
                  </ol>
                </>
              }
            />
          </div>

          <Chapter
            title=""
            content={
              <>
                <EscolaDigital
                  href="http://go.geekie.com.br/taTDZj"
                  thumbnailSrc={capAsset('images/thumbEscolaDigital.svg')}
                />
                <div className="mb-6" style={{ backgroundColor: '#f9ef61', border: '1.5px solid #009b80', borderRadius: '18px', padding: '1.25rem' }}>
                  <h3>Objetivo de aprendizagem  </h3>
                  <p>Comparar as teorias, hipóteses e modelos propostos em diferentes épocas para explicar o surgimento da vida.</p>
                </div>
                <p>
                  <strong style={{ color: '#009b80' }}>Neste capítulo:</strong> <br /> Características dos seres vivos; Teoria da abiogênese; Teoria da biogênese; Experimentos de Needham e Spallanzani; Experimento de Pasteur; Hipótese da panspermia; Hipótese da evolução química; Hipótese heterotrófica; Hipótese autotrófica; Surgimento dos eucariontes.
                  <br />
                  <strong>Habilidades da BNCC:</strong> EM13CNT201; EM13CNT301
                </p>


                <Pagination currentPage={10} expandToBookColumn />

                <h2 className="titulo-sas mb-4 mt-6">PARA COMEÇAR E REFLETIR</h2>
                <p className="mb-4 indent-6">
                  O questionamento sobre a existência de vida em outros planetas também faz parte do debate científico e mobiliza pesquisadores de diferentes áreas do conhecimento. A comunidade científica busca identificar as condições da existência de seres vivos em outros planetas, como retratado no texto a seguir.
                </p>
                <h3>Rotina de pensamento: Frase, trecho e palavra</h3>
                <CaixaTexto title="Vida extraterrestre">

                  <p className="mb-4 indent-6">
                    […] O fato mais relevante acerca desse assunto é que, até o presente momento, não temos conhecimento de nenhuma demonstração crível acerca da existência de vida em outros astros, nem no Sistema Solar, nem <strong style={{ color: '#009b80' }}>alhures</strong>. Esse pequeno, mas decisivo “detalhe” é a primeira coisa que devemos levar em conta quando discutimos cientificamente a possível existência da vida extraterrestre. Claro que a maioria de nós espera poder dizer o contrário algum dia, mas por ora não dispomos de evidências nesse sentido. Felizmente, é verdade que a “ausência de evidência não é, por si, evidência de ausência” total de vida extraterrestre. De qualquer modo, temos muito trabalho pela frente.
                  </p>
                  <p className="mb-4 indent-6">
                    A atual ciência da Astrobiologia – ou Exobiologia, seu nome mais antigo – parte desse e de outros três fatos-chave: toda a vida conhecida na Terra parece compartilhar exatamente os mesmos componentes moleculares básicos – 20 aminoácidos nas proteínas e 4 nucleotídeos no código genético, sugerindo uma população ancestral comum a todos nós; a Hipótese Exobiológica (como prefiro chamá-la) de que a vida pode ter surgido em outro lugar e de forma independente da terrestre, que conhecemos, é, em si, testável empiricamente, isto é, experimentalmente; a Exobiologia, até o presente momento, só possui 1 (um) objeto real de estudo em todo o Universo conhecido, a vida terrestre. Tudo considerado, essa nova área da ciência tem amplas perspectivas desde que se atenha a “manter os pés no chão”, ou seja, trabalhar em cima do que é bem conhecido para buscar evidências: por exemplo, não podemos sair muito longe do triunvirato “carbono – água líquida – atmosfera”. É algo conservador, claro, mas é um ponto de partida consistente, pois só conhecemos vida à base de carbono (átomo com grande versatilidade estrutural), em contextos que inexoravelmente contenham água líquida (o solvente universal ideal) e, para tanto, sob atmosferas com certa pressão barométrica mínima (superfícies planetárias).
                  </p>
                  <p className="mb-4 indent-6">
                    O fato de a Astro/Exobiologia ainda não dispor de um “objeto de estudo” bem definido ou conhecido (um exemplar de ET) não implica menor cientificidade, pois, para ser ciência, é necessário apenas que existam hipóteses razoáveis, e que estas sejam testadas mediante o chamado método científico. Outras áreas da ciência também demoraram para comprovar suas hipóteses (a curvatura do espaço-tempo, os neutrinos e os quarks etc.), e algumas ainda estão tentando (por exemplo, as ondas gravitacionais).
                  </p>
                  <p className="text-sm text-right mt-4">
                    QUILLFELDT, J. A. <em>Astrobiologia</em>: água e vida no Sistema Solar e além.
                  </p>
                </CaixaTexto>

                <aside className="caixa-glossario" aria-label="Glossário">
                  <h4 className="caixa-glossario__titulo">Glossário</h4>
                  <p className="caixa-glossario__texto">
                    <strong className="caixa-glossario__termo">Alhures:</strong> em outro lugar; em outra parte.
                  </p>
                </aside>

                <QuestionRenderer
                  question={getQuestionById('c1_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getQuestionById('c1_q2')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={getQuestionById('c1_q3')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <Pagination currentPage={11} expandToBookColumn />
                <h2 className="titulo-sas mb-4 mt-6">OBJETIVO DE
                  APRENDIZAGEM</h2>
                <p className="mb-4 indent-6"><strong>Comparar as teorias, hipóteses e modelos
                  científicos propostos em diferentes épocas
                  para explicar o surgimento da vida. </strong></p>
                <h3>BIOLOGIA
                  em FOCO</h3>
                <h4 className="titulo-sas mb-4 mt-8">O que caracteriza a vida?</h4>
                <p className="mb-4 indent-6">
                  A Biologia é uma área das Ciências da Natureza que se dedica ao estudo da vida. A palavra vem do grego: <em>bio</em> significa vida e <em>logos</em>, ciência/estudo. Mas o que, afinal, diferencia os seres vivos dos objetos inanimados?
                </p>
                <p className="mb-4 indent-6">
                  Há algumas características importantes que são comuns a todos os organismos vivos. Essas características, em conjunto, definem um ser vivo e, consequentemente, diferenciam-no daquilo que não tem vida. São elas:
                </p>
                <ul className="list-disc ml-6 mb-6">
                  <li><strong>Organização celular:</strong> todos os seres vivos conhecidos são constituídos por células. Entre as formas de classificar os seres vivos, é possível utilizar as células como critério, de acordo com o tipo – procarionte ou eucarionte – e a quantidade – seres unicelulares ou pluricelulares.</li>
                  <li><strong>Metabolismo:</strong> todos os seres vivos apresentam um conjunto de reações químicas que ocorrem para transformar matéria em energia e manter a composição interna dos seus organismos. Esse conjunto de reações, chamado de metabolismo, também pode ter diferentes níveis de complexidade e funcionar de diversas formas, dependendo do organismo e das condições em que vive.</li>
                  <li><strong>Resposta aos estímulos:</strong> todos os seres vivos interagem com o meio ao seu redor, respondendo aos estímulos vindos desse meio. As respostas podem ser desde pequenas movimentações até mudanças fisiológicas, e diferem em complexidade de acordo com cada estímulo e organismo. Essas reações produzem condições favoráveis à manutenção da vida.</li>
                  <li><strong>Crescimento:</strong> os seres vivos, em geral, passam por processos de crescimento pelo aumento do tamanho do corpo ou pelo número de células. O crescimento pode ser analisado por diferentes estágios de desenvolvimento, que mudam de espécie para espécie. Alguns organismos apenas aumentam de tamanho e volume, enquanto outros podem mudar completamente entre os diferentes momentos de seu ciclo de vida.</li>
                  <li><strong>Reprodução:</strong> todos os seres vivos têm o potencial de se reproduzir. Assim como a organização celular e o crescimento, a reprodução pode acontecer de diferentes modos, variando de espécie a espécie ou até mesmo em uma única espécie, dependendo de condições do ambiente ou outros fatores. Embora existam indivíduos que não possam se reproduzir, a capacidade de gerar descendentes é uma condição fundamental para a existência das espécies vivas.</li>
                  <li><strong>Evolução:</strong> é o processo de mudança nas características genéticas das populações ao longo do tempo. Esse processo ocorre lentamente entre as gerações de indivíduos, depende da hereditariedade e de fatores externos, como a seleção natural. A evolução não deve ser entendida como sinônimo de melhoria, mas sim de mudança. Algumas das mudanças podem gerar vantagens de sobrevivência aos organismos – chamadas de adaptações – que ao viverem por mais tempo se reproduzem com mais sucesso e deixam descendentes com as mesmas características. Assim, as características herdadas entre as gerações que se mostram vantajosas a um determinado ambiente acabam se consolidando em uma determinada população.</li>
                </ul>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_3_img_333_489.png')}
                    alt="Micrografia de células de cebola em formato poligonal, com núcleos visíveis, tingidas de roxo."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">PETER HERMES FURIAN/STOCK.</p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    As células estão entre as principais características exclusivas dos seres vivos. Na imagem, células da epiderme de uma cebola vistas ao microscópio óptico, ampliadas em 20x.
                  </p>
                </div>

                <h4 className="titulo-sas mb-4 mt-8">Do átomo ao organismo</h4>
                <p className="mb-4 indent-6">
                  A vida pode se manifestar de diversas maneiras, desde um ser unicelular – como uma bactéria – até um organismo grande como uma baleia azul – com mais de 20 metros de comprimento. Essa variedade de organismos é organizada em grupos, de acordo com características em comum, para facilitar o estudo. Além das características particulares de cada um desses grupos, os fatores que influenciam as formas de vida e como elas interagem – entre si e com o ambiente – também são estudados na Biologia.
                </p>

                <Pagination currentPage={12} expandToBookColumn />

                <p className="mb-4 indent-6">
                  O nível de complexidade dos organismos é um importante critérios para classificar os seres vivos em diferentes grupos. Como a menor unidade de vida é a célula, consideramos seres vivos aqueles que são compostos de células, mesmo que seja uma única. Podemos incluir a matéria – átomos e moléculas – com a finalidade de entender o que forma as células. Ainda que sejam consideradas as menores unidades de vida, as células possuem estruturas internas que garantem seu funcionamento, chamadas de organelas.
                </p>
                <p className="mb-4 indent-6">
                  No entanto, essa organização hierárquica em níveis crescentes de complexidade não se aplica rigorosamente a todos os seres vivos. Há células bastante simplificadas, como as bactérias, que não possuem organelas complexas e mesmo assim conseguem executar sozinhas todas as funções vitais necessárias para serem consideradas organismos completos, mesmo sem formar tecidos, órgãos e sistemas.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_4_img_80_249.png')}
                    alt="Figura ilustra um menino rodeado por representações de células, mitocôndrias, átomos, tecidos, rins e sistema urinário, conectadas por setas, demonstrando a organização biológica do corpo humano."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Os níveis de organização da vida ilustrados. (Sem escala, cores ilustrativas.)
                  </p>
                </div>

                <p className="mb-4 indent-6">
                  Quando células com funções especializadas atuam em conjunto, esse agrupamento é chamado de <strong>tecido</strong>. Por sua vez, o agrupamento de vários tecidos, cada um exercendo uma função específica em estruturas maiores, compõe um <strong>órgão</strong>; e o conjunto de órgãos integrados para desempenhar funções fisiológicas amplas é classificado como um <strong>sistema</strong>. Um organismo multicelular complexo, como ilustrado na figura, é formado por vários sistemas que trabalham de forma coordenada para garantir o equilíbrio e a sobrevivência do indivíduo como um todo.
                </p>
                <p className="mb-4 indent-6">
                  No entanto, essa organização hierárquica em
                  níveis crescentes de complexidade não se aplica
                  rigorosamente a todos os seres vivos. Há células bastante simplificadas, como as bactérias, que não
                  possuem organelas complexas e mesmo assim
                  conseguem executar sozinhas todas as funções
                  vitais necessárias para serem consideradas organismos completos, mesmo sem formar tecidos,
                  órgãos e sistemas.
                </p>


                <h4 className="titulo-sas mb-4 mt-8">Como a vida surgiu?</h4>
                <p className="mb-4 indent-6">
                  O questionamento sobre a origem dos seres vivos tem registros desde as primeiras civilizações da Antiguidade, como gregos e egípcios. A observação de que alguns seres vivos nascem a partir de outros, como os filhotes de alguns mamíferos que nascem das fêmeas após um cruzamento, foi um ponto de partida para a formulação da noção de reprodução sexuada, ainda que os mecanismos do processo não fossem totalmente compreendidos. No entanto, embora o fenômeno da reprodução explique como determinados seres vivos nascem, ele ainda não era suficiente para esclarecer a origem do primeiro ser vivo.
                </p>
                <p className="mb-4 indent-6">
                  Além disso, até pelo menos o século XVII, essa noção de reprodução sexuada não se aplicava a formas de vida como plantas e organismos com reprodução mais difícil de observar, como insetos. Por isso, durante a Antiguidade e até o século XIX, era comum que muitos naturalistas e filósofos defendessem a ideia de que esses seres vivos poderiam surgir a partir da matéria inanimada. Nesse contexto histórico, essa ideia foi também considerada uma possível explicação para o surgimento dos primeiros seres vivos. Ela ficou conhecida como <strong>teoria da abiogênese</strong>, ou da <strong>geração espontânea</strong>.
                </p>

                <h5 className="titulo-sas mb-4 mt-6">Teoria ou hipótese?</h5>
                <p className="mb-4 indent-6">
                  Embora no cotidiano os termos hipótese e teoria sejam usados como sinônimos, na ciência eles têm significados distintos e desempenham papéis diferentes na construção do conhecimento.
                </p>
                <p className="mb-4 indent-6">
                  Uma <strong>hipótese</strong> é uma explicação provisória, formulada com base em conhecimentos prévios e evidências disponíveis, que precisa ser testada por meio de observações, experimentos e análises. Caso os resultados não a sustentem, ela pode ser modificada ou descartada.
                </p>


                <Pagination currentPage={13} expandToBookColumn />


                <p className="mb-4 indent-6">
                  Já a teoria científica é um conjunto organizado de explicações amplamente testadas e sustentadas por evidências de diferentes pesquisadores e metodologias.
                </p>
                <p className="mb-4 indent-6">
                  É importante lembrar que a ciência não produz verdades definitivas: teorias bem estabelecidas são reformuladas com o surgimento de novas evidências ou avanços tecnológicos que detalhem os fenômenos, sendo essa revisão constante fundamental no trabalho científico.
                </p>
                <p className="mb-4 indent-6">
                  Compreender essa diferença é essencial para estudar a origem da vida.
                </p>


                <p className="mb-4 indent-6">
                  Historicamente, várias hipóteses explicaram o surgimento da vida na Terra, incluindo a geração espontânea, descartada por experimentos e evidências robustas que provaram sua inconsistência. Entretanto, outras explicações foram reformuladas em modelos consistentes, investigados pela ciência até os dias de hoje.
                </p>


                <h5 className="titulo-sas mb-4 mt-6">Abiogênese (ou geração espontânea)</h5>
                <p className="mb-4 indent-6">
                  A abiogênese, ou geração espontânea, foi a explicação mais antiga de que temos registro para explicar o surgimento da vida. Aristóteles (384-322 a.C.), foi um dos principais defensores dessa explicação. Uma das explicações associadas à antiga teoria da geração espontânea afirmava que a matéria inanimada poderia originar seres vivos quando submetida a determinadas condições. Alguns pensadores atribuíam esse processo a um “princípio vital” ou a uma força presente na própria natureza, capaz de organizar a matéria e dar origem à vida.
                </p>
                <p className="mb-4 indent-6">
                  A abiogênese circulava amplamente entre os pensadores, filósofos e naturalistas da época e, devido às possibilidades de observação da época, assumiu o caráter de teoria. Segundo as explicações, seres vivos poderiam surgir a partir de semelhantes (os pais dão origem a filhotes) ou a partir de geração espontânea e essa ideia predominou até meados do século XIX. A abiogênese era sustentada por observações de animais como ratos e camundongos “surgindo” em pilhas de palha e acúmulo de sujeira, por exemplo.
                </p>
                <p className="mb-4 indent-6" style={{ backgroundColor: '#dae8e4', padding: '10px', borderRadius: '10px' }}>
                  Com o passar do tempo e o desenvolvimento de novas técnicas de observação e exploração das características dos seres vivos, a antiga teoria da abiogênese deixou de ser bem aceita entre aqueles que estudavam a vida, se tornando obsoleta. Hoje em dia, a abiogênese não ocupa mais o lugar de teoria científica.
                </p>


                <h4 className="titulo-sas mb-4 mt-8">A invenção do microscópio</h4>
                <p className="mb-4 indent-6">
                  Um fator muito importante para o desenvolvimento de explicações mais completas para os fenômenos naturais foi a melhoria do microscópio. Esse objeto permitiu a observação de estruturas e seres vivos invisíveis a olho nu, ampliando hipóteses e métodos experimentais. No final do século XVI, o artesão holandês Zacharias Janssen (c. 1580-c. 1632), filho de um fabricante de óculos, combinou o uso de duas lentes em um mesmo instrumento de ampliação, que permitia ampliações maiores do que as obtidas com uma única lente.
                </p>
                <p className="mb-4 indent-6">
                  No século XVII, o aperfeiçoamento do microscópio permitiu avanços ainda maiores. O holandês Antonie van Leeuwenhoek (1632-1723) construiu um microscópio simples, porém com grande capacidade de ampliação, e foi um dos primeiros a explorar amostras de solo, água, e fluidos de animais, e descrever a forma de elementos minúsculos presentes nessas amostras. Bactérias, protozoários e até mesmo espermatozoides de mamíferos, foram nomeados como “animálculos”. Leeuwenhoek registrava todas as suas observações com muitos detalhes e as relatava à comunidade de estudiosos da época.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_5_img_332_569.png')}
                    alt="Peça cilíndrica de metal escuro, com uma extremidade achatada e um furo central, e outra extremidade fechada e arredondada."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">MUSEU NACIONAL DE SAÚDE E MEDICINA EM SILVER SPRING</p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Reprodução do microscópio de Janssen.
                  </p>
                </div>

                <Pagination currentPage={14} expandToBookColumn />

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_6_img_83_83.png')}
                    alt="Figura 14 mostra dez círculos numerados de 31 a 40, cada um com desenhos coloridos de estruturas microscópicas, possivelmente células ou tecidos."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">ARCHIVIST/STOCK.ADOBE.COM</p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Desenhos de Antonie van Leeuwenhoek. A maioria das lentes de Leeuwenhoek fornecia ampliações entre 70x e 250x e eram extremamente nítidas, com poder de resolução de aproximadamente 1,1 a 1,4 micrômetros.
                  </p>
                </div>

                <p className="mb-4 indent-6">
                  Os feitos de Leeuwenhoek foram fundamentais para o surgimento da Microbiologia. Contudo, foram necessários debates e experimentos posteriores para refinar suas conclusões e entender a reprodução de seres tão pequenos – uma compreensão essencial para formular explicações alternativas à abiogênese.
                </p>


                <h4 className="titulo-sas mb-4 mt-8">A observação das células</h4>
                <p className="mb-4 indent-6">
                  O microscópio permitiu observar estruturas invisíveis a olho nu, sendo fundamental para desvendar processos antes considerados mistérios. Um marco para a Biologia moderna foi o trabalho do inglês Robert Hooke (1635-1703): ao explorar a cortiça, ele foi o primeiro a registrar e nomear as células, estruturas essenciais aos seres vivos. Seus registros minuciosos foram publicados no livro <em>Micrographia</em>, em 1665.
                </p>


                <h4 className="titulo-sas mb-4 mt-8">Experimento de Redi</h4>
                <p className="mb-4 indent-6">
                  Em pleno século XVII, quando a abiogênese ainda era a explicação mais aceita para o surgimento da vida, o médico e cientista italiano Francesco Redi (1626-1697) não acreditava que os vermes que apareciam na carne em decomposição surgissem de forma espontânea. Ele observou que as larvas só estavam presentes na carne em que houvessem pousado insetos.
                </p>
                <p className="mb-4 indent-6">
                  Por isso, supôs que as moscas depositavam seus ovos sobre a carne e, deles, nasciam as larvas. Redi testou suas hipóteses por meio de um experimento.
                </p>
                <p className="mb-4 indent-6">
                  O método de Redi consistiu em colocar carne de animais mortos em diferentes frascos, com condições distintas entre si. Alguns dos recipientes foram fechados com uma gaze muito fina, que impedia a entrada de insetos, mas deixava circular o ar nos frascos, enquanto outros permaneceram abertos, em contato com fatores externos.
                </p>
                <p className="mb-4 indent-6">
                  Nos recipientes fechados, em que a gaze impedia o contato com o ambiente e a entrada de insetos, não se verificou o aparecimento de larvas. Contudo, nos frascos abertos as moscas tinham acesso à carne e, nesses casos, surgiram larvas. Essas evidências corroboram a hipótese levantada por Redi, contrária à abiogênese.
                </p>
                <p className="mb-4 text-center"><strong>Frascos fechados com gaze</strong></p>
                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_6_img_317_187.png')}
                    alt="Seis potes de vidro com carne crua e moscas, mostrando diferentes condições de exposição."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2 text-center">
                    GEEKIE
                  </p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Esquema do experimento de Redi. (Sem escala, cores ilustrativas.)
                  </p>
                </div>
                <p className="mb-4 indent-6" style={{ backgroundColor: '#dae8e4', padding: '10px', borderRadius: '10px' }}>
                  A hipótese que surgiu a partir do experimento
                  de Redi foi chamada de <strong>biogênese</strong>. Segundo ela,
                  os seres vivos só poderiam surgir a partir de outro
                  ser vivo, nunca de um objeto inanimado.
                </p>


                <h5 className="titulo-sas mb-4 mt-6">Teoria da biogênese</h5>

                <p className="mb-4 indent-6">
                  A teoria da biogênese propõe que os seres vivos só surgem a partir de outros preexistentes, contrariando a geração espontânea. Essa explicação foi fortalecida por experimentos científicos que investigaram a origem de organismos sob diferentes condições. Por meio de experimentos e debates de ideias, em caráter coletivo, se deu a construção do conhecimento sobre a origem da vida, que se mantém aberto para novas descobertas e ideias.
                </p>

                <Pagination currentPage={15} expandToBookColumn />

                <h4 className="titulo-sas mb-4 mt-8">Experimentos de Needham e Spallanzani</h4>
                <p className="mb-4 indent-6">
                  John Needham (1713-1781) foi um naturalista britânico que se interessou muito pelas formas de vida microscópicas e acreditava que elas surgiam de maneira espontânea, por abiogênese. Em 1745, para testar essa hipótese, Needham colocou caldos de carne em diversos frascos que haviam sido submetidos à fervura por alguns minutos, para eliminar os microrganismos. Depois de alguns dias, o caldo apresentou aspecto turvo, indicando a presença de microrganismos. Para Needham, a presença desses microrganismos nos frascos com líquido fervido seria uma evidência favorável à teoria da geração espontânea.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_7_img_99_199.png')}
                    alt="Sequência de imagens mostrando um líquido em um balão de fundo redondo sendo aquecido, borbulhando e depois esfriando, com a formação de um sedimento escuro no fundo."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2 text-center">
                    GEEKIE
                  </p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Esquema do experimento de Needham, que ferveu um caldo nutritivo em diversos frascos e observou o aparecimento de microrganismos. (Cores ilustrativas.)
                  </p>
                </div>

                <p className="mb-4 indent-6">
                  Na tentativa de refutar as conclusões de Needham, o fisiologista italiano Lazzaro Spallanzani (1729-1799), um grande crítico da abiogênese, refez os experimentos com oito frascos que continham um caldo nutritivo similar ao utilizado por Needham. A principal diferença entre os experimentos foi o caráter de comparação: Spallanzani comparou o que acontecia com o líquido de frascos completamente vedados e com o de frascos que tinham contato com o ambiente, identificando a ocorrência de contaminação.
                </p>
                <p className="mb-4 indent-6">
                  A comparação utilizada nesse experimento representou o uso de um grupo controle, prática muito utilizada nas pesquisas científicas até hoje, para garantir que o fenômeno observado é resultado de condições intencionais aplicadas no experimento, e não de fatores externos aleatórios. Após a vedação, todos os frascos foram fervidos por um período prolongado. A aparição de microrganismos nos frascos vedados com rolha e a ausência deles nos demais permitiu a Spallanzani interpretar que o tempo de fervura e o tipo de vedação, ou seja, as condições do experimento adotadas por Needham teriam levado a conclusões equivocadas.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_7_img_121_572.png')}
                    alt="Sequência de frascos de vidro com líquido vermelho, mostrando aquecimento, ebulição, um relógio e a separação de um sólido escuro."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2 text-center">
                    GEEKIE
                  </p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Representação do experimento de Lazzaro Spallanzani. Os recipientes bem vedados não apresentaram surgimento de microrganismos em seu interior. (Cores ilustrativas.)
                  </p>
                </div>

                <Pagination currentPage={16} expandToBookColumn />


                <h4 className="titulo-sas mb-4 mt-8">Experimento de Louis Pasteur</h4>
                <p className="mb-4 indent-6">
                  A validade dos experimentos de Needham e Spallanzani para refutar ou confirmar a hipótese da abiogênese dos microrganismos foi discutida ainda por muitos anos. Só em 1862 um experimento forneceu mais evidências contra a abiogênese, enfraquecendo-a ainda mais entre os cientistas.
                </p>
                <p className="mb-4 indent-6">
                  Louis Pasteur (1822-1895) foi um químico francês que direcionou seus estudos para a área da saúde. Pasteur defendia a ideia de que algumas doenças eram causadas por microrganismos e desenvolveu diversos experimentos para descobrir a origem de contaminações associadas a elas.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_8_img_95_272.png')}
                    alt="Retrato em preto e branco de um homem de meia-idade com barba e bigode, sentado em uma cadeira, vestindo terno e gravata borboleta."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">PAUL NADAR/THE J. PAUL GETTY MUSEUM, LOS ANGELES, ESTADOS UNIDOS</p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Louis Pasteur (1822-1895).
                  </p>
                </div>

                <p className="mb-4 indent-6">
                  Em uma de suas experimentações, além dos frascos convencionais, Louis Pasteur preparou alguns frascos de vidro com um formato peculiar: ele os amoleceu aplicando calor, esticou-os e, logo em seguida, curvou-os formando um “pescoço de cisne”.
                </p>
                <p className="mb-4 indent-6">
                  Nesses frascos – que ficaram abertos – colocou um caldo composto de água, açúcar e fungos em suspensão (levedo), que foi aquecido.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_8_img_95_596.png')}
                    alt="Um frasco de vidro com líquido marrom e um tubo de vidro curvado em forma de S, sobre um suporte."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">WELLCOME COLLECTION, LONDRES, INGLATERRA</p>
                </div>

                <p className="mb-4 indent-6">
                  Ao permitir a livre entrada de ar nos frascos abertos, Pasteur observou que os de formato convencional acumularam microrganismos, enquanto os de “pescoço de cisne”permaneceram estéreis, isto é, livres de microrganismos.
                </p>
                <p className="mb-4 indent-6">
                  Pasteur atribuiu ao formato recurvado a razão pela qual os microrganismos presentes no ar ficavam retidos no gargalo, incapazes de entrar em contato com o caldo e contaminar as amostras. O caldo só era contaminado por microrganismos quando o gargalo dos recipientes era quebrado.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_8_img_318_263.png')}
                    alt="Cinco frascos de vidro com líquido vermelho, alguns aquecidos por bico de Bunsen, mostrando um processo químico com bolhas e sedimentação."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">SUONGU/STOCK.ADOBE.COM</p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Esquema mostrando o experimento de Pasteur, que gerou evidências para refutar a teoria da abiogênese.
                  </p>
                </div>

                <p className="mb-4 indent-6">
                  Diferentemente dos experimentos de Needham e Spallanzani, o experimento de Pasteur controlou simultaneamente a esterilização do caldo e o contato com o ar, barrando apenas a chegada de microrganismos.
                </p>
                <p className="mb-4 indent-6">
                  Com seus experimentos, Pasteur forneceu evidências de que os seres vivos surgem a partir de outros seres vivos e enfraqueceu a teoria da geração espontânea, que foi gradualmente abandonada pela comunidade científica.
                </p>

                <Pagination currentPage={17} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[
                          
                          getQuestionById('c1_q5'),
                          getQuestionById('c1_q6'),
                        ]}
                      />
                    }
                  />
                </div>

                <h2 className="titulo-sas mb-4 mt-8">Experimento histórico</h2>
                <div style={{ backgroundColor: '#dae8e4', padding: '10px', borderRadius: '10px' }}>
                  <p className="mb-4 indent-6" >
                    Alguns dos frascos de “pescoço de cisne” usados por Louis Pasteur em seus experimentos realizados no
                    século XIX foram mantidos no Museu Pasteur, na França, com o caldo original. Eles seguem, até hoje, livres
                    de microrganismos. O Instituto Pasteur oferece acesso gratuito a uma biblioteca de imagens do trabalho do
                    cientista, incluindo vidrarias e registros produzidos durante suas pesquisas.
                  </p>
                  <p className="mb-4 indent-6" >
                    O trabalho de Pasteur foi tão importante que, além de impactar o paradigma científico da época e esta
                    belecer práticas experimentais adotadas até hoje, garantiu o estabelecimento de novos padrões de segu
                    rança biológica de alimentos e bebidas consumidos diariamente, como o leite – a esterilização controlada
                    recebeu o nome de pasteurização.
                  </p>
                </div>
                <h2 className="titulo-sas mb-4 mt-8">Agora é com você</h2>
                <QuestionRenderer
                  question={getQuestionById('c1_q4')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_9_img_104_392.png')}
                    alt="A figura mostra três quadros de uma história em quadrinhos. No primeiro, duas crianças e um adulto com avental e lenço na cabeça parecem assustados. No segundo, o adulto varre o chão, enquanto uma criança pergunta o que aconteceu. No ter…"
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">SOUSA, Mauricio de. Cascão. São Paulo: Globo, n. 388, nov. 2001.</p>
                </div>

                <QuestionRenderer
                  question={getQuestionById('c1_q5')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <QuestionRenderer
                  question={getQuestionById('c1_q6')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />



                <Pagination currentPage={18} expandToBookColumn />

                <h4 className="titulo-sas mb-4 mt-8">Hipótese de evolução química</h4>
                <p className="mb-4 indent-6">
                  As ideias evolucionistas se fortaleceram ao longo do século XIX. Em 1924, o bioquímico russo Aleksandr Oparin (1894-1980) publicou um trabalho pioneiro que integrou conhecimentos de Química, Bioquímica e Biologia para explicar a origem da vida. Esse trabalho abriu espaço para as discussões científicas modernas sobre o tema.
                </p>
                <p className="mb-4 indent-6">
                  A hipótese de Oparin era de que a atmosfera inicial da Terra era composta por gases como metano, amônia, hidrogênio e grande quantidade de vapor de água. Segundo o cientista, as constantes descargas elétricas e a exposição à luz ultravioleta do Sol poderiam favorecer a formação de compostos orgânicos. Esses compostos se acumulariam em um grande “caldo primordial”, com condições propícias para o surgimento de formas simplificadas de vida. Embora tenha sido publicada em 1924, a hipótese de Oparin ganhou força apenas na década seguinte. Nesse mesmo período, circulava também a teoria do biólogo inglês John B. S. Haldane (1892-1964). De forma independente, Haldane propôs que as primeiras formas de vida teriam surgido gradualmente a partir de moléculas simples.
                </p>
                <p className="mb-4 indent-6">
                  As contribuições de Oparin e Haldane fundamentaram a hipótese da evolução química, ou evolução pré-biótica, segundo a qual a vida teria resultado de um processo gradual. Nessa perspectiva, gases da atmosfera primitiva deram origem a compostos orgânicos simples que, por meio de reações químicas, formaram moléculas cada vez mais complexas. Essas moléculas teriam se organizado em estruturas separadas do meio ambiente por um tipo de membrana – chamada por Oparin de “protobionte”. Ao adquirirem capacidade de metabolismo, autoduplicação e hereditariedade, essas estruturas teriam dado origem aos primeiros seres vivos.
                </p>

                <div className="retratos-lado">
                  <figure className="retrato-cientista">
                    <p className="retrato-cientista__credito">Academia Russa de Ciências, Moscou, Rússia</p>
                    <div className="retrato-cientista__midia">
                      <img
                        src={capAsset('images/page_10_img_98_628.png')}
                        alt="Aleksandr Oparin, com óculos, barba e gravata borboleta."
                      />
                      <figcaption className="retrato-cientista__legenda">
                        Aleksandr Oparin (1894-1980).
                      </figcaption>
                    </div>
                  </figure>
                  <figure className="retrato-cientista">
                    <p className="retrato-cientista__credito">Arquivos da Smithsonian Institution, Washington, Estados Unidos</p>
                    <div className="retrato-cientista__midia">
                      <img
                        src={capAsset('images/page_10_img_217_628.png')}
                        alt="John B. S. Haldane, com bigode, vestindo terno e gravata."
                      />
                      <figcaption className="retrato-cientista__legenda">
                        John B. S. Haldane (1892-1964).
                      </figcaption>
                    </div>
                  </figure>
                </div>


                <h4 className="titulo-sas mb-4 mt-8">Condições da Terra primitiva</h4>

                <p className="mb-4 indent-6">
                  A hipótese da evolução química propõe que a Terra primitiva apresentava condições extremas, com altas temperaturas, intensa atividade geológica e frequentes bombardeios de asteroides, fatores que podem ter relação com a presença de água no planeta. Essa água evaporava devido ao calor, acumulava-se na atmosfera na forma de vapor, condensava-se em nuvens e retornava à superfície em forma de chuvas. Esse ciclo se repetiu por milhões de anos e contribuiu para o resfriamento gradual das camadas superficiais da Terra, permitindo o acúmulo progressivo de água e a formação dos primeiros mares rasos, onde teriam se concentrado os compostos orgânicos.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_10_img_319_308.png')}
                    alt="Paisagem dramática com um vulcão em erupção ao fundo, raios cortando o céu escuro e ondas agitadas no mar."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Representação de como seria a Terra primitiva, com erupções vulcânicas, descargas elétricas e bombardeios de asteroides.
                  </p>
                </div>

                <h5 className="titulo-sas mb-4 mt-8">A composição da atmosfera primitiva</h5>
                <p className="mb-4 indent-6">
                  Com base na abundância de hidrogênio no universo, o químico estadunidense Harold Urey (1893-1981) contribuiu para a formulação de hipóteses sobre a composição da atmosfera primitiva da Terra, dialogando com a proposta de Oparin. Essas hipóteses foram fundamentadas em evidências geológicas, dados obtidos por meio de instrumentos de laboratório para medir a quantidade de luz absorvida ou refletida por amostras e da análise de materiais vulcânicos.
                </p>
                <p className="mb-4 indent-6">
                  Segundo a hipótese de Urey, a atmosfera primitiva seria formada principalmente por metano (CH₄), amônia (NH₃), hidrogênio (H₂) e vapor de água (H₂O). Entretanto, modelos mais recentes sugerem que a atmosfera primitiva pode ter sido composta predominantemente por dióxido de carbono (CO2), nitrogênio (N2) e vapor de água (H2O). Ainda assim, experimentos indicam que, seria possível a síntese abiótica de moléculas orgânicas nessas condições.
                </p>

                <Pagination currentPage={19} expandToBookColumn />

                <p className="mb-4 indent-6">
                  <strong>Caldo primordial</strong>
                </p>
                <p className="mb-4 indent-6">
                  Na Terra primitiva, devido à ausência da camada de ozônio e às condições da atmosfera, havia
                  grande disponibilidade de energia proveniente das descargas elétricas e dos raios ultravioleta da luz
                  solar. Essas fontes energéticas, associadas às altas temperaturas, possibilitaram reações químicas entre
                  os componentes da atmosfera primitiva, o que poderia resultar na formação de compostos orgâni
                  cos simples, transportados pela chuva até a superfície aquecida do planeta.
                </p>
                <p className="mb-4 indent-6">
                  Sobre rochas quentes, essas moléculas passaram a formar compostos orgânicos mais complexos,
                  que foram se acumulando nos mares primitivos, originando a chamada sopa ou caldo primordial.
                  Nesse ambiente, teriam surgido os coacervados, aglomerados de moléculas orgânicas que originaram
                  estruturas que Oparin considerava precursoras das primeiras células e ancestrais de todas as formas
                  de vida atuais: os protobiontes.
                </p>

                <ImageZoom
                  src={capAsset('images/page_11_img_27_12.png')}
                  alt="Figura dramática de um vulcão em erupção com raios, representando processos químicos e biológicos em diferentes estágios, desde moléculas simples até estruturas complexas."
                  caption="Representação esquemática da formação do caldo primordial. (Sem escala, cores ilustrativas.)"
                />


                <Pagination currentPage={20} expandToBookColumn />


                <h4 className="titulo-sas mb-4 mt-8">Experimento de Miller e Urey</h4>
                <p className="mb-4 indent-6">
                  Com um trabalho publicado em 1953, o cientista estadunidense Stanley L. Miller (1930-2007) e seu orientador, Harold Urey (1893-1981), deram um impulso importante à testagem experimental dos modelos para o surgimento da vida.
                </p>
                <p className="mb-4 indent-6">
                  Eles construíram um tubo fechado de vidro com uma ampola que continha uma mistura dos gases metano (CH₄), amônia (NH₃) e hidrogênio (H₂), simulando a possível composição da atmosfera primitiva. Abaixo da ampola, havia uma região em forma de U contendo água aquecida, o que levava à formação de vapor; além disso, utilizaram eletrodos para simular as descargas elétricas dos relâmpagos. O tubo também possuía uma região de condensação, para que a mistura de gases se transformasse em líquido, que ficaria acumulado na região inferior, assim como os “oceanos primitivos”.
                </p>
                <p className="mb-4 indent-6">
                  Após alguns dias, o material condensado foi recolhido em uma mistura contendo compostos orgânicos simples, como aminoácidos e precursores de material genético. O experimento mostrou que as etapas explicadas por Oparin eram viáveis, reforçando, assim as proposições desse autor e fortalecendo a hipótese da evolução química por meio de procedimentos experimentais.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_12_img_73_293.png')}
                    alt="Diagrama de um experimento simulando a atmosfera primitiva da Terra, com aquecimento de água, circulação de gases e um condensador."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Stanley Miller e Harold Urey simularam as condições da atmosfera primitiva em um experimento que resultou na formação de aminoácidos. (Sem escala, cores ilustrativas.)
                  </p>
                </div>
                <ol className="lista-numerada list-decimal list-inside mb-4 indent-6">
                  <li>

                    Aquecimento da água:
                    a água no compar
                    timento inferior é
                    aquecida, simulando
                    o oceano primitivo,
                    e produz vapor que
                    sobe pelo aparelho.

                  </li>
                  <li>Formação da atmosfera redutora: o
                    vapor d’água se mistura com gases
                    como metano (CH₄), amônia (NH₃)
                    e hidrogênio (H₂), formando uma
                    atmosfera redutora. Sob ação das
                    descargas elétricas, essa mistura
                    gera compostos orgânicos simples,
                    que são resfriados no condensador
                    e caem de volta no líquido simu
                    lando uma “chuva química”.</li>
                  <li>Coleta dos produtos: a água
                    contendo os compostos formados é
                    recolhida e analisada para verificar
                    quais moléculas surgiram.</li>
                  <li>Resultados: foram iden
                    tificados aminoácidos e
                    outros compostos orgâni
                    cos simples, que podem ter
                    sido precursores das molé
                    culas essenciais à vida.</li>
                  <li>A hipótese da evolução química é uma proposta moderna de abiogênese, pois busca explicar a origem da vida a partir de matéria não viva. No entanto, difere profundamente da antiga teoria da geração espontânea, uma vez que propõe uma sequência gradual de transformações físico-químicas ocorridas ao longo de milhões de anos na Terra primitiva, e não o surgimento imediato de organismos complexos.</li>

                </ol>

                <p className="mb-4 indent-6">

                </p>

                <Pagination currentPage={21} expandToBookColumn />

                <h5 className="titulo-sas mb-4 mt-8">Hipótese cosmozoica ou panspermia cósmica</h5>
                <p className="mb-4 indent-6">
                  Outra hipótese para a origem da vida na Terra propõe que ela tenha chegado ao planeta transportada por meteoritos e cometas. Essa hipótese foi elaborada nos moldes científicos a partir do entendimento de que aminoácidos e outros compostos orgânicos poderiam se formar espontaneamente em diferentes condições ambientais no universo.
                </p>
                <p className="mb-4 indent-6">
                  O químico sueco Svante Arrhenius (1859-1927), em 1908, defendeu a hipótese da <strong>panspermia cósmica</strong>: Arrhenius acreditava que os primeiros microrganismos poderiam ter chegado à Terra transportados em meteoritos. É importante ressaltar que a panspermia não explica a origem da vida, mas propõe um mecanismo para a sua dispersão pelo espaço.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_13_img_97_310.png')}
                    alt="Fragmento de rocha com coloração avermelhada e tons escuros, apresentando textura irregular e fissuras, sustentado por um suporte metálico."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className=" text-[10px] text-slate-600 mt-2 text-center">
                    COMPOR CRÉDITOS
                  </p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Defensores da hipótese da panspermia acreditam que formas de vida microscópicas podem ter vindo do espaço e chegado à Terra na superfície de algum objeto, como o meteorito da imagem.
                  </p>
                </div>


                <p className="mb-4 indent-6">
                  As principais críticas e questionamentos a essa ideia relacionam-se à capacidade de sobrevivência desses microrganismos: como teriam resistido às rigorosas condições do espaço (vácuo, frio extremo e radiação) e ao calor intenso gerado pelo choque com a atmosfera terrestre?
                </p>
                <p className="mb-4 indent-6">
                  Apesar dessas críticas, os defensores da panspermia utilizam argumentos que tornam a ideia ao menos viável dentro do debate científico. A análise do meteorito de Murchison, logo após sua queda em 1968, possibilitou uma análise com pouca contaminação e forneceu evidências da presença de moléculas orgânicas complexas em sua composição, incluindo aminoácidos de existência desconhecida na Terra. Outros eventos relacionados a estudos do universo contribuíram para a permanência da panspermia como uma hipótese científica contemporânea, como o conhecimento de que toneladas de poeira cósmica rica em carbono atingem nossa atmosfera anualmente e a análise de outros corpos celestes, como o meteorito ALH 84001, encontrado na Antártica, contendo estruturas semelhantes a bactérias fossilizadas.
                </p>
                <p className="mb-4 indent-6">
                  No entanto, as interpretações relacionadas a essa hipótese permanecem controversas, e não há consenso de que sejam evidências de vida extraterrestre. Para a comunidade científica, tais achados não encerram a questão, mas mantêm aberto o debate sobre a viabilidade da panspermia como uma alternativa para compreender como a vida se estabeleceu na Terra.
                </p>
                <h2 className="titulo-sas mb-4 mt-8">Saiba mais</h2>
                <h3 className="text-2xl font-bold text-[#80298F] mb-4 mt-8">O nascimento da Paleontologia</h3>
                <p className="mb-4 indent-6">
                  Durante séculos, fósseis foram interpretados como curiosidades naturais ou vestígios de eventos míticos. A partir dos séculos XVII e XVIII, estudiosos passaram a usá-los em comparações com organismos atuais e reconheceram que se tratava de registros de seres vivos do passado. Essa mudança de perspectiva foi fundamental: os fósseis deixaram de ser vistos como simples formações rochosas curiosas e passaram a ser compreendidos como evidências da história da vida na Terra.
                </p>
                <p className="mb-4 indent-6">
                  No contexto do estudo da origem da vida, as estruturas fósseis mais antigas podem revelar informações importantes sobre os primeiros seres vivos e, consequentemente, sobre as condições do ambiente em que viveram. Assim, a Paleontologia não apenas revela organismos extintos, mas também fornece pistas essenciais sobre quando e como a vida surgiu e se diversificou na Terra.
                </p>
                <p className=" text-[10px] text-slate-600 mt-2 text-right">
                  <a href="https://arqueologiaeprehistoria.com/2020/06/09/uma-breve-historia-sobre-o-nascimento-da-paleontologia/" target="_blank" rel="noopener noreferrer">Fonte: https://arqueologiaeprehistoria.com/2020/06/09/uma-breve-historia-sobre-o-nascimento-da-paleontologia/</a>
                </p>

                <Pagination currentPage={22} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[
                          
                          getQuestionById('c1_q7'),
                          
                        ]}
                      />
                    }
                  />
                </div>

                <h2 className="titulo-sas mb-4 mt-8">Agora é com você</h2>

                <QuestionRenderer
                  question={getQuestionById('c1_q7')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <QuestionRenderer
                  question={getQuestionById('c1_q8')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />


                <h4 className="titulo-sas mb-4 mt-8">Os primeiros seres vivos</h4>
                <p className="mb-4 indent-6">
                  O experimento de Miller e Urey forneceu evidências experimentais de que moléculas orgânicas simples podem surgir de forma abiótica, o que reforça a hipótese do surgimento da vida na Terra por meio da evolução química favorecida pelas condições atmosféricas da Terra primitiva. No entanto, embora o experimento tenha ajudado a explicar a formação das primeiras moléculas orgânicas, os cientistas continuaram pesquisando os processos que teriam originado os primeiros seres vivos.
                </p>
                <p className="mb-4 indent-6">
                  Com o desenvolvimento de novas técnicas aprimoradas de coleta e análise de dados e a exploração de características e processos dos seres vivos, as áreas de estudos se tornaram cada vez mais diversas e específicas. O desenvolvimento da paleontologia, por exemplo, possibilitou analisar registros fósseis, muito importantes para entender como as formas de vida se modificaram ao longo do tempo até as espécies como as conhecemos hoje.
                </p>
                <p className="mb-4 indent-6">
                  Os estudos paleontológicos indicam que os fósseis mais antigos pertencem a organismos procariontes, como as bactérias. Um dos grupos descritos na década de 1970, as arqueias, forneceu evidências importantes sobre as características dos primeiros sistemas vivos similares às células. Isso aconteceu porque esse grupo de microrganismos é encontrado em ambientes considerados adversos à manutenção da vida, em condições semelhantes ao que teria sido o ambiente da Terra primitiva.
                </p>
                <p className="mb-4 indent-6">
                  No entanto, ao analisar os fósseis mais antigos e compará-los com os organismos atuais, observam-se dois tipos: que se assemelham a organismos autotróficos e os que se assemelham aos heterotróficos. Essa diferença é importante, pois se refere à maneira como os seres vivos obtêm energia, o que pode ajudar a entender a sequência de eventos que gerou a diversidade de formas de vida que conhecemos atualmente.
                </p>


                <h4 className="titulo-sas mb-4 mt-8">Hipótese heterotrófica</h4>
                <p className="mb-4 indent-6">
                  Por muitas décadas, predominou a hipótese de que os primeiros seres vivos eram heterotróficos, ou seja, dependiam da obtenção de matéria orgânica do ambiente para obter energia e manter seus processos metabólicos, como sugerido no modelo explicativo de Oparin. Essa ideia se apoiava na possível disponibilidade de matéria orgânica nos ambientes primitivos, além do fato de que alguns processos metabólicos heterotróficos são mais simples do que processos autotróficos, como a fotossíntese. Soma-se a isso a ausência de gás oxigênio livre na atmosfera primitiva, o que impossibilitava a respiração aeróbica – processo em que o oxigênio é utilizado para liberar energia de moléculas orgânicas.
                </p>
                <p className="mb-4 indent-6">
                  Nesse contexto, entende-se que esses primeiros organismos eram, além de heterotróficos, também anaeróbios, isto é, não utilizavam oxigênio em seus processos metabólicos.
                </p>
                <p className="mb-4 indent-6">
                  Segundo essa hipótese, o metabolismo energético inicial teria sido a fermentação, um processo independente do gás oxigênio, que gera energia a partir da quebra de moléculas orgânicas e pode liberar gás carbônico como um de seus produtos. Com o tempo, o acúmulo de gás carbônico na atmosfera teria favorecido a sobrevivência de organismos procariotos capazes de captar energia luminosa e produzir sua própria matéria orgânica, originando os primeiros organismos fotossintetizantes. O gás oxigênio liberado pela fotossíntese teria causado forte impacto ambiental, levando à extinção de muitos seres anaeróbicos, fenômeno conhecido como <strong>Grande Evento de Oxigenação (GEO)</strong>.
                </p>

                <Pagination currentPage={23} expandToBookColumn />
                <p>teria favorecido a sobrevivência de organismos procariotos capazes de captar energia luminosa e produzir sua própria matéria orgânica, originando os primeiros organismos fotossintetizantes. O gás oxigênio liberado pela fotossíntese teria causado forte impacto ambiental, levando à extinção de muitos seres anaeróbicos, fenômeno conhecido como <strong>Grande Evento de Oxigenação (GEO)</strong>.</p>
                <p className="mb-4 indent-6">
                  Considera-se que, gradualmente, linhagens de organismos resistentes ao gás oxigênio tenham passado a utilizá-lo na obtenção de energia, executando a respiração celular. Assim teriam surgido os procariotos heterotróficos aeróbicos, e a respiração celular, que possui maior eficiência energética em relação à fermentação, teria se tornado o tipo de metabolismo predominante em parte dos seres vivos, mantendo-se em várias das formas de vida atuais.
                </p>

                <h5 className="titulo-sas mb-4 mt-8">Hipótese autotrófica</h5>
                <p className="mb-4 indent-6">
                  Em adição ao debate científico acerca das hipóteses da origem dos primeiros seres vivos, o mapeamento do fundo do mar na década de 1970 revelou fontes termais submarinas - ecossistemas aquáticos extremamente profundos, verdadeiras “chaminés vulcânicas” no oceano. Nessas fontes hidrotermais, as elevadas temperaturas geradas pela ação vulcânica entram em contraste com o frio das grandes profundidades oceânicas, criando um ambiente favorável à ocorrência de reações químicas.
                </p>
                <p className="mb-4 indent-6">
                  A descoberta de microrganismos nesse ecossistema inóspito permitiu o desenvolvimento de uma hipótese autotrófica para o metabolismo dos primeiros seres vivos: o ambiente propício para reações químicas era condizente com a ação de organismos unicelulares que vivem em condições extremas e realizam a síntese de matéria orgânica sem a luz solar.
                </p>
                <p className="mb-4 indent-6">
                  A <strong>quimiossíntese</strong> é um processo autotrófico que consiste no uso da energia liberada por reações químicas entre componentes inorgânicos – presentes na crosta terrestre – para gerar matéria orgânica. Ela é considerada uma das possíveis formas iniciais de metabolismo autotrófico.
                </p>
                <p className="mb-4 indent-6">
                  Uma evidência importante para essa discussão é a existência de <strong>estromatólitos</strong>. Embora os registros mais antigos dessas estruturas, compostas de camadas de rochas e colônias de microrganismos fotossintetizantes, datem de 3,5 bilhões de anos, há uma abundância maior de estromatólitos com cerca de 2,3 bilhões de anos de idade, período em que teria ocorrido o <strong>Grande Evento de Oxigenação</strong>, alterando a atmosfera terrestre. É importante notar que os estromatólitos são considerados “fosseis vivos” e que não explicam a origem da vida, mas documentam mudanças importantes no ambiente e nos organismos.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_15_img_331_85.png')}
                    alt="Rochas com padrões circulares e concêntricos em um leito de rio com água azul e vegetação rasteira."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">HOWARD/STOCK.ADOBE.COM</p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Estromatólitos, os vestígios de vida mais antigos na Terra, com 3,5 bilhões de anos.
                  </p>
                </div>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_15_img_332_346.png')}
                    alt="Textura de rocha com veios em tons de cinza, marrom e azul, lembrando um mapa geológico."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2">ALMACRO/STOCK.ADOBE.COM</p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Os estromatólitos mais antigos com colônias de cianobactérias datam de cerca de 2,3 bilhões de anos.
                  </p>
                </div>

                <Pagination currentPage={24} expandToBookColumn />

                <p className="mb-4 indent-6">
                  Além das hipóteses relacionadas ao tipo de metabolismo dos primeiros seres vivos, há outras, que buscam explicar como as células eucarióticas mais complexas – como as células animais – se desenvolveram a partir das células procariontes.
                </p>


                <h5 className="titulo-sas mb-4 mt-8">Hipótese endossimbiótica</h5>
                <p className="mb-4 indent-6">
                  A maior quantidade de gás oxigênio atmosférico promoveu mudanças ambientais significativas, como a formação da camada de ozônio, que passou a filtrar a radiação ultravioleta e possibilitou que os seres vivos ocupassem ambientes terrestres expostos à luz solar. Nesse novo cenário, os organismos aeróbicos, mais eficientes na produção de energia, foram favorecidos, enquanto os anaeróbicos enfrentaram declínio populacional, pois ficaram restritos a ambientes sem gás oxigênio.
                </p>
                <p className="mb-4 indent-6">
                  Uma alternativa para explicar o salto de complexidade das células se fundamenta nas relações simbióticas que os organismos anaeróbicos teriam estabelecido com outros, aeróbicos, durante essas mudanças ambientais. Essa alternativa ficou conhecida como a <strong>hipótese endossimbiótica</strong> de Lynn Margulis (1938-2011), bióloga estadunidense responsável por formular a ideia de que células ancestrais com metabolismo anaeróbico teriam incorporado outras, com metabolismo aeróbico, originando uma relação de benefício mútuo que levou ao surgimento das <strong>mitocôndrias</strong>; posteriormente, associações com cianobactérias teriam dado origem aos <strong>cloroplastos</strong>. Essas estruturas são organelas membranosas importantes para os mecanismos de obtenção de energia.
                </p>
                <p className="mb-4 indent-6" style={{ backgroundColor: '#F5F5F5', padding: '10px', borderRadius: '10px' }}>
                  Essa hipótese é sustentada por diversas evidências, como o fato de mitocôndrias e cloroplastos apresentarem dupla membrana, material genético próprio, ribossomos e capacidade de autoduplicação independente da célula hospedeira.
                </p>
                <p className="mb-4 indent-6">
                  Além disso, há particularidades genéticas das mitocôndrias que sugerem origem externa à célula eucariótica. Casos atuais reforçam essa teoria, como organismos unicelulares que não apresentam mitocôndrias funcionais, mas abrigam bactérias aeróbicas simbiontes, e organismos que realizam fotossíntese por meio de cianobactérias mutualísticas, em vez de cloroplastos.
                </p>
                <h2 className="titulo-sas mb-4 mt-8">Perfil</h2>
                <CaixaTexto title=" Lynn Margulis e sua relevância científica">

                  <img
                    src={capAsset('images/page_16_img_452_275.png')}
                    alt="Mulher sorrindo em um laboratório, com um microscópio ao lado."
                    className="w-full max-w-[200px] h-auto rounded-[12px] mx-auto"
                  />
                  <div>
                    <p className="mb-4 indent-6">
                      Lynn Margulis (1938-2011) foi uma bióloga estadunidense que contribuiu de forma decisiva para a compreensão da evolução celular. Desde muito jovem demonstrou grande interesse pelos estudos: Margulis ingressou na universidade com apenas 14 anos, se formou aos 18 e construiu uma sólida formação em genética e biologia, atuando como professora e pesquisadora em importantes universidades dos Estados Unidos.
                    </p>
                    <p className="mb-4 indent-6">
                      Ao longo de sua carreira, Margulis desafiou ideias tradicionais ao sugerir que a simbiose – a associação entre organismos diferentes – teria um papel importante na evolução dos seres vivos. Inicialmente recebida com resistência, sua proposta levou algum tempo para ser amplamente aceita pela comunidade científica, mas se tornou fundamental para explicar a origem das células complexas.
                    </p>
                    <p className="mb-4 indent-6">
                      O trabalho de Margulis foi considerado um marco importante da ciência e se destacou em um contexto em que as mulheres ainda enfrentavam barreiras para alcançar reconhecimento na ciência – evidenciando também como a produção do conhecimento é influenciada por fatores sociais e históricos.
                    </p>
                  </div>

                </CaixaTexto>

                <Pagination currentPage={25} expandToBookColumn />


                <h5 className="titulo-sas mb-4 mt-8">Hipótese da invaginação</h5>
                <p className="mb-4 indent-6">
                  Além de estruturas como mitocôndrias e cloroplastos, as células eucarióticas possuem outras particularidades – como outras organelas, por exemplo – que sinalizam sua complexidade. Para explicar o surgimento de estruturas especializadas nas células procarióticas, surgiu a teoria da invaginação, atribuída ao biólogo celular J. David Robertson, em 1959. Ela se baseia na presença de membranas diferenciadas nas células e em suas estruturas internas.
                </p>
                <p className="mb-4 indent-6">
                  Essa ideia parte do princípio da formação de dobras externas (evaginações) e internas (invaginações) nas membranas celulares, dando origem a um sistema de <strong>endomembranas</strong>. Essas formações são dobras membranosas dentro das células que criam ambientes com condições específicas, otimizadoras de reações químicas dentro das células, ou seja, a compartimentalização. As estruturas de endomembranas são fundamentais para o armazenamento e transporte de substâncias.
                </p>

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_17_img_149_246.png')}
                    alt="Diagrama ilustra a formação de organelas em uma célula, mostrando a adição de mitocôndrias e cloroplastos."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className=" text-[10px] text-slate-600 mt-2 text-center">
                    WIKIPEDIA/GEEKIE (ADAPTADO).
                  </p>
                  <p className="legenda-imagem text-[10px] text-slate-600 mt-2 text-center">
                    Esquema representativo das hipóteses endossimbiótica e de invaginação, que são complementares para explicar o surgimento dos organismos.
                  </p>
                </div>
                <ol className="lista-numerada list-decimal list-inside mb-4 indent-6">
                  <li>Uma célula procariótica
                    aumenta de tamanho e sua
                    membrana forma dobras.</li>
                  <li>As dobras membranosas se
                    tornam estruturas funcionais,
                    envolvendo o material gené
                    tico e substâncias ao redor.</li>
                  <li>Uma bactéria aeróbica
                    entra na célula (como presa
                    ou parasita), mas não é
                    digerida e se torna um
                    endossimbionte.</li>
                  <li>A habilidade de usar oxigênio para gerar energia se torna uma vantagem de sobrevivência para a
                    célula hospedeira e aumenta a quantidade de oxigênio no ambiente. As células eucarióticas que
                    não possuem essa vantagem se extinguem do ambiente. Algumas células eucarióticas adquirem
                    outro tipo de endossimbiontes: cianobactérias, grupo capaz de realizar fotossíntese.</li>
                </ol>

                <p className="mb-4 indent-6">
                  Segundo Robertson, a partir do momento em que as membranas das células procarióticas ficaram livres de algumas funções executadas pelas estruturas simbióticas incorporadas – que seriam as mitocôndrias -, uma série de dobramentos teria ocorrido. As evidências para essa hipótese fundamentam-se no fato de que a membrana plasmática, as organelas membranosas e a <strong>carioteca</strong>, um envoltório que isola alguns componentes no núcleo da célula, têm composição química idêntica.
                </p>
                <p className="mb-4 indent-6">
                  Com o desenvolvimento de mais estudos genéticos e evolucionistas, relacionados ao entendimento das semelhanças e do parentesco entre os grupos de seres vivos (viventes e fósseis), foi possível estabelecer que os primeiros seres com células eucarióticas surgiram há cerca de dois bilhões de anos atrás.
                </p>

                <Pagination currentPage={26} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[
                          
                          getQuestionById('c1_q10'),
                          
                        ]}
                      />
                    }
                  />
                </div>

                <h2 className="titulo-sas mb-4 mt-8">Agora é com você</h2>

                <QuestionRenderer
                  question={getQuestionById('c1_q9')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <QuestionRenderer
                  question={getQuestionById('c1_q10')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <h2 className="titulo-sas mb-4 mt-8">Prática ativa: investigação com fontes</h2>
                <div style={{ backgroundColor: '#F5F5F5', padding: '10px', borderRadius: '10px' }}>
                  <p className="mb-4 indent-6">
                    <strong>A construção do conhecimento científico e as hipóteses sobre a origem da vida</strong>
                  </p>
                  <p className="mb-4 indent-6">
                    Com o desenvolvimento da ciência moderna, a investigação dos fenômenos naturais passou a envolver práticas mais sistematizadas, característica das diferentes áreas científicas. Essas práticas podem incluir a observação de fenômenos, a formulação de perguntas, a construção de hipóteses e modelos explicativos, a realização de experimentos ou a análise de dados obtidos de diversas fontes. Nem sempre essas etapas ocorrem na mesma ordem e nem todas estão presentes em todas as investigações, pois os modos de produzir conhecimento variam de acordo com o problema estudado e com os recursos disponíveis.
                  </p>
                  <p className="mb-4 indent-6">
                    As explicações formuladas pelos cientistas são fundamentadas em evidências e discutidas pela comunidade científica, podendo ser revistas, aprimoradas ou refutadas à medida que novos dados e interpretações surgem. Assim, o conhecimento científico é construído coletivamente e está em constante transformação.
                  </p>
                  <p className="mb-4 indent-6">
                    Ao longo da história, diferentes explicações foram elaboradas para responder à pergunta sobre a origem da vida. Essas explicações surgiram em contextos históricos distintos e foram construídas com base nos conhecimentos e recursos disponíveis em cada época. Analisar essas propostas à luz das práticas científicas permite compreender como o conhecimento científico é produzido, validado e transformado ao longo do tempo. Para a atividade a seguir, organizem-se em grupos e sigam as orientações do professor.
                  </p>
                </div>

                <Pagination currentPage={27} expandToBookColumn />

                <div style={{ backgroundColor: '#F5F5F5', padding: '10px', borderRadius: '10px' }}>
                  <p className="mb-4 indent-6">
                    <strong>Procedimentos</strong>
                  </p>
                  <p className="mb-4 indent-6">
                    1. Escolha um dos modelos estudados no capítulo: abiogênese, biogênese, hipótese da evolução química ou panspermia.
                  </p>
                  <p className="mb-4 indent-6">
                    2. No modelo analisado, identifique, e discuta com os colegas do grupo os principais pontos:
                  </p>
                  <ol className="lista-letras ml-6 mb-6">
                    <li>o fenômeno ou evidência observável (no contexto da época) que motivou a formulação da hipótese;</li>
                    <li>questão que deveria ser respondida pela explicação proposta;</li>
                    <li>a descrição da hipótese formulada;</li>
                    <li>a metodologia adotada (observações, análise de dados ou experimentos);</li>
                    <li>quais evidências ou resultados foram apresentados para sustentar a hipótese e como isso foi feito;</li>
                    <li>o que pode ser questionado e refutado com novas evidências.</li>
                  </ol>
                  <p className="mb-4 indent-6">
                    3. Cada grupo deve apresentar sua análise a um grupo diferente. Durante a troca, faça pelo menos uma pergunta ao outro grupo, registrando semelhanças e diferenças entre as explicações. Em seguida, reorganizem as duplas e repitam o processo até conhecer todas as hipóteses. Ao final, revise e complete sua ficha comparativa com base nas discussões.
                  </p>
                  <p className="mb-4 indent-6">
                    4. Após a troca de informações, elabore individualmente a ficha comparativa a seguir, sintetizando as informações. Você pode adicionar anotações sobre as semelhanças e diferenças entre as hipóteses discutidas.
                  </p>
                  <div className="ficha-comparativa-wrap">
                    <table className="ficha-comparativa">
                      <thead>
                        <tr>
                          <th>Modelo</th>
                          <th>Observação motivadora</th>
                          <th>Hipótese proposta</th>
                          <th>Questão respondida</th>
                          <th>Metodologia adotada</th>
                          <th>Evidências de suporte</th>
                          <th>Principais críticas e questionamentos</th>
                          <th>É aceita hoje?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4].map((row) => (
                          <tr key={row}>
                            {Array.from({ length: 8 }, (_, col) => {
                              const fieldId = `c1_ficha_r${row}_c${col + 1}`;
                              return (
                                <td key={fieldId}>
                                  <textarea
                                    value={(userAnswers[fieldId] as string) || ''}
                                    onChange={(e) => handleAnswerChange(fieldId, e.target.value)}
                                    disabled={showTeacherView}
                                    aria-label={`Ficha comparativa, linha ${row}, coluna ${col + 1}`}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mb-4 indent-6">
                    <strong>Para refletir</strong>
                  </p>
                  <ol className="lista-numerada list-decimal list-inside mb-4 indent-6">
                    <li>Qual das explicações analisadas apresenta de forma mais clara as etapas científicas? Justifique. </li>
                    <li>Pensando nas etapas científicas, você considera o conhecimento científico como uma produção
                      individual ou coletiva? </li>
                    <li>O que a análise dessas explicações revela sobre o caráter histórico e provisório do conheci
                      mento científico? </li>
                    <li>O que diferencia uma explicação científica (como uma teoria ou hipótese) de um mito ou lenda? </li>
                    <li>Qual ou quais das hipóteses são aceitas atualmente? Justifique com evidências. </li>
                  </ol>
                </div>
                <h3 className="titulo-sas mb-4 mt-8">PRATIQUE</h3>
                <EscolaDigital
                  title="PRATIQUE"
                  href="https://go.geekie.com.br/Bk9bYg"
                  thumbnailSrc={capAsset('images/thumbEscolaDigital.svg')}
                />


                <Pagination currentPage={28} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[
                          
                          getQuestionById('c1_q11'),
                          getQuestionById('c1_q12'),
                          getQuestionById('c1_q13'),
                          
                        ]}
                      />
                    }
                  />
                </div>
                <h2 className="titulo-sas mb-4 mt-8">Consolidando o aprendizado</h2>
                <EscolaDigital
                  title="PRATIQUE ENEM  
E VESTIBULARES"
                  href="https://go.geekie.com.br/Bk9bYg"
                  thumbnailSrc={capAsset('images/thumbEscolaDigital.svg')}
                />
                <h3 className="titulo-sas mb-4 mt-8">Mais Enem e vestibulares</h3>
                <QuestionRenderer
                  question={getQuestionById('c1_q11')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <QuestionRenderer
                  question={getQuestionById('c1_q12')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <QuestionRenderer
                  question={getQuestionById('c1_q13')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <QuestionRenderer
                  question={getQuestionById('c1_q14')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hideInput
                />

                <div className="flex flex-col items-center my-6">
                  <img
                    src={capAsset('images/page_20_img_318_620.png')}
                    alt="Diagrama ilustra o experimento de Pasteur, mostrando o caldo nutritivo em um frasco com gargalo de cisne, sendo aquecido e mantido livre de microrganismos."
                    className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] h-auto rounded-[24px]"
                  />
                  <p className="text-[10px] text-slate-600 mt-2 text-right w-full">
                    Fonte: AMABIS. Biologia. São Paulo, Moderna, 2004. (adaptado)
                  </p>
                </div>

                <Pagination currentPage={29} expandToBookColumn />
                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <TeacherAnswers
                        questions={[
                          
                          getQuestionById('c1_q14'),
                          getQuestionById('c1_q15'),
                          
                        ]}
                      />
                    }
                  />
                </div>

                <QuestionRenderer
                  question={getQuestionById('c1_q14')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                  hidePrompt
                />

                <QuestionRenderer
                  question={getQuestionById('c1_q15')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

                <aside className="bloco-anotacoes" aria-label="Anotações">
                  <p className="bloco-anotacoes__titulo">Anotações</p>
                  <textarea
                    className="bloco-anotacoes__campo"
                    value={(userAnswers['c1_anotacoes'] as string) || ''}
                    onChange={(e) => handleAnswerChange('c1_anotacoes', e.target.value)}
                    placeholder="Escreva suas anotações aqui..."
                    disabled={showTeacherView}
                  />
                </aside>

                <Pagination currentPage={30} expandToBookColumn />

                <div className="my-6">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                          <strong>Dica do professor</strong> Explique aos estudantes que a autoavaliação simula um download para que eles preencham as barras como forma de autoavaliação da aprendizagem. Oriente-os a refletir
                          sobre o quanto compreenderam de cada objetivo e preencher as barras conforme seu
                          nível de domínio. Incentive a discussão sobre as autoavaliações e ofereça apoio para
                          esclarecer dúvidas.
                        </p>

                      </>
                    }
                  />
                </div>

                <h2 className="titulo-sas mb-4 mt-8">PRINCIPAIS IDEIAS DO CAPÍTULO</h2>
                <EscolaDigital
                  title="Mapa Conceitual"
                  href="https://go.geekie.com.br/Bk9bYg"
                  thumbnailSrc={capAsset('images/thumbEscolaDigital.svg')}
                  introHint="Clique para abrir o mapa conceitual."
                />
                <EscolaDigital
                  title="QUESTÕES EXTRAS"
                  href="https://go.geekie.com.br/Bk9bYg"
                  thumbnailSrc={capAsset('images/thumbEscolaDigital.svg')}
                />
                <h2 className="titulo-sas mb-4 mt-8">AUTOAVALIAÇÃO</h2>
                <p className="mb-4 indent-6">
                  Retome os objetivos de aprendizagem do capítulo e avalie seu progresso.
                </p>
                <p className="mb-4 indent-6">
                  Preencha a barra de acordo com o quanto você avançou em cada categoria:
                </p>

                <div className="autoavaliacao-geekie">
                  <div className="autoavaliacao-geekie__legenda">
                    <div className="autoavaliacao-geekie__item">
                      <BarraProgressoGeekie filled={1} label="Ainda estou aprendendo" />
                      <p className="autoavaliacao-geekie__texto">
                        <strong>Ainda estou aprendendo</strong> – Estou começando a compreender o conteúdo e preciso de mais apoio.
                      </p>
                    </div>
                    <div className="autoavaliacao-geekie__item">
                      <BarraProgressoGeekie filled={2} label="Estou no caminho" />
                      <p className="autoavaliacao-geekie__texto">
                        <strong>Estou no caminho</strong> – Já entendi boa parte do conteúdo, mas ainda tenho algumas dúvidas.
                      </p>
                    </div>
                    <div className="autoavaliacao-geekie__item">
                      <BarraProgressoGeekie filled={3} label="Estou pronto para o próximo desafio" />
                      <p className="autoavaliacao-geekie__texto">
                        <strong>Estou pronto para o próximo desafio</strong> – Compreendi o conteúdo e consigo explicar ou aplicar o que aprendi.
                      </p>
                    </div>
                  </div>

                  <div className="objetivo-avaliacao">
                    <div className="objetivo-avaliacao__aba">Objetivo de aprendizagem</div>
                    <div className="objetivo-avaliacao__caixa">
                      <BarraProgressoGeekie
                        filled={Number(userAnswers['c1_autoavaliacao_obj1']) || 0}
                        interactive
                        disabled={showTeacherView}
                        label="Progresso no objetivo de aprendizagem"
                        onChange={(level) => handleAnswerChange('c1_autoavaliacao_obj1', String(level))}
                      />
                      <p className="autoavaliacao-geekie__texto">
                        Comparo as teorias, hipóteses e modelos propostos em diferentes épocas para explicar o surgimento da vida.
                      </p>
                    </div>
                  </div>
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