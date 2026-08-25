// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Capítulo 1","startPage":1,"pageCount":11,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import Chapter from '@player/components/Chapter';
import TeacherButton from '@player/components/TeacherButton';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import Footer from '@player/components/Footer';
import EscolaDigital from '@player/components/EscolaDigital';
import PontoDePartida from '@player/components/PontoDePartida';
import SaberesAcao from '@player/components/SaberesAcao';
import EnemVestibulares from '@player/components/EnemVestibulares';
import QuestaoEnem from '@player/components/QuestaoEnem';
import HabilidadesNaPratica from '@player/components/HabilidadesNaPratica';
import CfIconAtualidades from '@player/components/CfIconAtualidades';
import CfIconIndicacoes from '@player/components/CfIconIndicacoes';
import CfIconInfoMais from '@player/components/CfIconInfoMais';
import QuestionRenderer from '@player/components/QuestionRenderer';
import GabaritoCapitulo from '@player/components/GabaritoCapitulo';
import { TeacherAnswers } from '@player/components/TeacherAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { scoreObjectiveAnswers } from '@player/utils/scoreObjectiveAnswers';
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
  <HabilidadesNaPratica />     → atividade de competências / BNCC
*/

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/SAE/livros/SAE_AT27_EM1_V1_LDIDA_BIO_AL_IMP_C01/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const SHOW_TEACHER_BUTTON = true;
const START_PAGE = 324;

const chapterQuestions: Question[] = [
  {
    id: 'bio_c01_osiris_q1',
    type: 'text-input',
    question:
      'Com base nas descobertas feitas na amostra do asteroide Bennu, quais substâncias químicas reforçam a hipótese de que a vida na Terra pode ter tido uma contribuição externa? Como o método científico, representado pela coleta rigorosa e análise laboratorial das amostras, auxilia os cientistas a passarem da “suposição” para a “evidência” nesse processo?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'As substâncias identificadas nas amostras do asteroide Bennu que reforçam essa hipótese são a diversidade de compostos orgânicos ricos em carbono, com destaque para o aminoácido triptofano. A presença desses “blocos de construção” em um objeto tão antigo quanto o Sistema Solar sugere que os ingredientes essenciais para a biogênese podem ter sido entregues à Terra primitiva por impactos de asteroides e meteoritos.<br><br>O método científico transforma suposições em evidências por meio de etapas rigorosas: a observação (identificando Bennu como objeto antigo), a coleta controlada (evitando contaminação terrestre), a experimentação e a análise laboratorial (utilizando tecnologia de ponta para detectar moléculas específicas). Sem o rigor metodológico na coleta e na embalagem das amostras, os cientistas não poderiam afirmar com segurança se o material orgânico era originário do espaço ou de uma contaminação da nossa própria atmosfera, invalidando a conclusão da pesquisa.',
  },
  {
    id: 'bio_c01_habilidades_q1',
    type: 'text-input',
    number: 1,
    question:
      'Reúna-se com um colega e pesquisem uma reportagem que descreva uma investigação científica. Definam um tema de interesse e acessem uma base de dados acadêmica. Utilizem palavras-chave específicas e apliquem filtros avançados, como o período de publicação (últimos 10 anos) e o idioma.<br><br>Em seguida, elaborem, um breve relatório que descreva o tema de tal investigação, quais etapas foram percorridas e qual resultado os pesquisadores encontraram. Ainda, identifiquem possíveis limitações que o método utilizado encontraria se a pesquisa fosse realizada em épocas anteriores.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Resposta de acordo com a pesquisa. Ao analisar a reportagem sobre uma pesquisa científica, há a oportunidade de reconhecer modelos científicos, identificar limitações de diferentes épocas e reconhecer que esses métodos são construídos historicamente. Além disso, é possível interpretar as etapas de um método científico para se familiarizar com o processo de construção do conhecimento científico.',
  },
  {
    id: 'bio_c01_chegada_q1',
    type: 'text-input',
    number: 1,
    question:
      'O texto de abertura menciona que o “verdadeiro mistério” é como as moléculas orgânicas se organizam em vida. Relacionando essa afirmação com a Hipótese de Oparin e Haldane, explique o papel que o ambiente da Terra primitiva (oceanos quentes e atmosfera redutora) teria desempenhado na transformação desses blocos vindos do espaço em sistemas complexos como os coacervados.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Segundo a Hipótese de Oparin e Haldane, os blocos de construção (sejam eles formados na Terra ou trazidos por asteroides como o Bennu) acumularam-se nos oceanos primitivos, formando a “sopa orgânica”. O ambiente da Terra primitiva forneceu a energia necessária (radiação UV e descargas elétricas) para que essas moléculas sofressem reações químicas adicionais, organizando-se em coacervados, aglomerados proteicos isolados do meio por uma película de água. Esse isolamento é considerado o primeiro passo para o metabolismo rudimentar que caracteriza a vida.',
  },
  {
    id: 'bio_c01_chegada_q2',
    type: 'text-input',
    number: 2,
    question:
      'A missão OSIRIS-REx utilizou um protocolo rigoroso para evitar a contaminação das amostras de Bennu com microrganismos da Terra. Faça um paralelo entre esse cuidado metodológico da NASA e o experimento de Louis Pasteur com os frascos “pescoço de cisne”. Por que o controle de variáveis e o isolamento da amostra são cruciais para refutar a teoria da abiogênese (geração espontânea)?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'O paralelo reside na necessidade de provar que a vida (ou a matéria orgânica complexa) não surgiu “do nada” ou de uma fonte externa não controlada. Assim como Pasteur demonstrou que o crescimento de microrganismos no caldo nutritivo vinha de germes preexistentes no ar (e não de geração espontânea), a NASA precisa garantir que o carbono e os aminoácidos detectados em Bennu são nativos do asteroide e não “pegos” da atmosfera terrestre. Ambos os casos reforçam que, para conclusões científicas válidas, é preciso isolar o objeto de estudo de fontes de contaminação que poderiam gerar falsos resultados.',
  },
  {
    id: 'bio_c01_chegada_q3',
    type: 'text-input',
    number: 3,
    question:
      'A Panspermia Molecular (presença de matéria orgânica no espaço) não explica a origem da vida em si, mas sim a origem dos seus componentes. Se os cientistas encontrassem, no futuro, um organismo vivo e funcional em um asteroide, a Teoria da Biogênese seria invalidada ou reforçada? Justifique sua resposta com base nos princípios dessa teoria.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'A Teoria da Biogênese seria reforçada, pois o princípio fundamental da biogênese é que a vida só surge a partir de outra vida preexistente. Assim, encontrar um ser vivo em outro corpo celeste apenas expandiria o local de ocorrência da vida, mas manteria o princípio de que aquele organismo descende de outros seres vivos. A discussão mudaria apenas de “onde a vida começou” para “como ela se espalhou pelo cosmos”, sem necessariamente apoiar a ideia de que a vida surge espontaneamente da matéria bruta de modo contínuo.',
  },
  {
    id: 'bio_c01_saberes_q1',
    type: 'true-false',
    number: 1,
    question:
      'Com base no estudo dos métodos de pesquisa, analise as afirmativas abaixo e assinale (V) para verdadeiro e (F) para falso. Em seguida, justifique o que for falso.',
    hasCorrectionBox: true,
    correctionPlaceholder: 'Justifique as afirmativas falsas aqui...',
    statements: [
      {
        letter: 'a',
        statement:
          'A observação é uma das primeiras etapas do método científico e consiste em registrar fenômenos naturais sem a necessidade de testes ou experimentações.',
        correctAnswer: true,
      },
      {
        letter: 'b',
        statement:
          'A experimentação é opcional no método científico, pois as hipóteses podem ser comprovadas apenas com base na intuição e opinião dos pesquisadores.',
        correctAnswer: false,
        correction:
          'A segunda afirmativa é falsa, pois a experimentação não é opcional no método científico. Para validar hipóteses, é necessário realizar testes e experimentos controlados.',
      },
      {
        letter: 'c',
        statement:
          'O método científico é um processo linear, sem necessidade de ajustes ou revisão das hipóteses durante a pesquisa.',
        correctAnswer: false,
        correction:
          'A terceira afirmativa é falsa, pois o método científico não é um processo linear, pois hipóteses podem ser revisadas e ajustadas conforme os resultados obtidos.',
      },
      {
        letter: 'd',
        statement:
          'As hipóteses são suposições que podem ser testadas experimentalmente para verificar se explicam determinado fenômeno.',
        correctAnswer: true,
      },
      {
        letter: 'e',
        statement:
          'A análise dos resultados permite interpretar os dados coletados e verificar se a hipótese proposta foi confirmada ou refutada.',
        correctAnswer: true,
      },
    ],
  },
  {
    id: 'bio_c01_saberes_q2',
    type: 'multiple-choice',
    number: 2,
    question:
      'Ao longo da história, diversos cientistas realizaram experimentos para investigar a origem dos seres vivos e refutar a teoria da geração espontânea. Entre os cientistas abaixo, qual foi responsável pelo experimento que utilizou frascos com “pescoço de cisne” para demonstrar que microrganismos não surgiam espontaneamente no caldo nutritivo?',
    options: {
      a: 'John Needham.',
      b: 'Francesco Redi.',
      c: 'Lazzaro Spallanzani.',
      d: 'Louis Pasteur.',
    },
    correctAnswer: 'd',
  },
  {
    id: 'bio_c01_saberes_q3',
    type: 'multiple-choice',
    number: 3,
    question:
      'O experimento realizado por Louis Pasteur foi fundamental para refutar a teoria da geração espontânea. Qual foi a principal conclusão desse experimento?',
    options: {
      a: 'Os microrganismos surgiam espontaneamente no caldo nutritivo, independentemente das condições do frasco.',
      b: 'A fervura dos líquidos eliminava qualquer possibilidade de surgimento de microrganismos, independentemente do contato com o ar.',
      c: 'Os microrganismos presentes no ar eram responsáveis pela contaminação do caldo nutritivo, e não uma “força vital”.',
      d: 'A presença de ar nos frascos era essencial para o surgimento espontâneo de novas formas de vida.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'bio_c01_saberes_q4',
    type: 'text-input',
    number: 4,
    question:
      'A teoria da panspermia cósmica propõe uma explicação para a origem da vida na Terra a partir de elementos vindos do espaço. Sobre isso, responda às questões a seguir.',
    subQuestions: [
      {
        letter: 'a',
        question: 'Como essa teoria explica o surgimento da vida no planeta?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'A teoria da panspermia cósmica sugere que a vida não se originou na Terra, mas, sim, que microrganismos ou moléculas orgânicas chegaram ao planeta vindos do espaço.',
      },
      {
        letter: 'b',
        question:
          'Cite um possível mecanismo pelo qual microrganismos ou moléculas orgânicas poderiam ter chegado à Terra.',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'Um possível mecanismo para isso seria o impacto de meteoritos contendo moléculas orgânicas ou microrganismos resistentes às condições extremas do espaço.',
      },
    ],
  },
  {
    id: 'bio_c01_saberes_q5',
    type: 'text-input',
    number: 5,
    question:
      'A teoria da evolução química propõe um processo gradual para a origem da vida na Terra. Sobre isso, responda às questões a seguir.',
    subQuestions: [
      {
        letter: 'a',
        question:
          'O que foi a sopa primordial na teoria da evolução química e qual sua importância para a origem da vida?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'A sopa primordial era uma mistura de compostos químicos presentes nos oceanos primitivos da Terra. Segundo a teoria da evolução química, essa sopa continha moléculas simples que, ao longo do tempo e sob a influência de descargas elétricas e radiação, deram origem a moléculas orgânicas mais complexas, fundamentais para o surgimento da vida.',
      },
      {
        letter: 'b',
        question:
          'O experimento de Miller e Urey foi importante para sustentar essa teoria. Explique brevemente o que ele demonstrou.',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'O experimento de Miller e Urey simulou as condições da Terra primitiva, submetendo uma mistura de gases a descargas elétricas. Após alguns dias, os pesquisadores observaram a formação de aminoácidos, demonstrando que compostos orgânicos essenciais para a vida poderiam ter surgido a partir de substâncias inorgânicas, sustentando a teoria da evolução química.',
      },
    ],
  },
  {
    id: 'bio_c01_saberes_q6',
    type: 'text-input',
    number: 6,
    question:
      'Duas hipóteses explicam como os primeiros seres vivos da Terra obtinham alimento: a heterotrófica e a autotrófica. Sobre isso, responda às questões a seguir.',
    subQuestions: [
      {
        letter: 'a',
        question:
          'O que afirma a hipótese heterotrófica sobre a forma como os primeiros seres vivos obtinham energia?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'A hipótese heterotrófica sugere que os primeiros seres vivos eram organismos simples e incapazes de produzir seu próprio alimento. Eles consumiam substâncias presentes no ambiente e realizavam fermentação para obter energia, liberando substâncias como gás carbônico e álcool.',
      },
      {
        letter: 'b',
        question:
          'De acordo com a hipótese autotrófica, como esses primeiros organismos eram capazes de produzir seu próprio alimento?',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'A hipótese autotrófica propõe que os primeiros seres vivos eram capazes de produzir seu próprio alimento por meio da quimiossíntese, um processo em que substâncias inorgânicas presentes no ambiente eram oxidadas para gerar energia. Isso possibilitou o surgimento de organismos capazes de realizar fotossíntese posteriormente.',
      },
    ],
  },
  {
    id: 'bio_c01_saberes_q7',
    type: 'text-input',
    number: 7,
    question:
      'As células podem ser classificadas em procarióticas e eucarióticas, apresentando diferenças estruturais importantes. Qual é a principal característica que diferencia uma célula procariótica de uma célula eucariótica? Cite um exemplo de organismo que possui células procarióticas e um que possui células eucarióticas.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'A principal característica que diferencia uma célula procariótica de uma eucariótica é a ausência de núcleo delimitado por membrana. Nas células procarióticas, o material genético está disperso no citoplasma, enquanto nas células eucarióticas ele fica dentro do núcleo. Um exemplo de organismo com célula procariótica são as bactérias e um exemplo de organismo com células eucarióticas são os animais.',
  },
  {
    id: 'bio_c01_saberes_q8',
    type: 'text-input',
    number: 8,
    question:
      'A Teoria da Endossimbiose, proposta por Lynn Margulis, explica a origem de algumas organelas presentes nas células eucarióticas. De acordo com essa teoria, quais organelas teriam se originado a partir da simbiose entre células primitivas e como esse processo teria ocorrido?',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'As organelas são as mitocôndrias e os cloroplastos. De acordo com a Teoria da Endossimbiose, essas organelas teriam se originado quando células primitivas maiores englobaram organismos procariontes menores, que passaram a viver dentro delas. Essa relação simbiótica beneficiava ambas as partes: a célula hospedeira fornecia proteção e nutrientes, enquanto os organismos englobados produziam energia de forma eficiente. Com o tempo, essas células procariontes se integraram completamente às células hospedeiras, tornando-se as mitocôndrias e os cloroplastos das células eucarióticas atuais.',
  },
  {
    id: 'bio_c01_enem_q1',
    type: 'multiple-choice',
    number: 1,
    question: 'C4:H14 (UFJF) O que é uma hipótese científica?',
    options: {
      a: 'Uma possível resposta a uma pergunta científica formulada.',
      b: 'Uma possível conclusão a uma pergunta formulada.',
      c: 'A descrição de uma pergunta científica formulada.',
      d: 'Uma verdade científica absoluta.',
      e: 'Uma possível pergunta científica.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'bio_c01_enem_q2',
    type: 'multiple-choice',
    number: 2,
    question:
      'C4:H14 (UFJF) Em relação ao modo como o conhecimento científico é construído, é CORRETO afirmar que:',
    options: {
      a: 'a aceitação ou não de uma determinada hipótese científica em uma determinada época depende apenas do seu poder explicativo.',
      b: 'não há espaço para o acaso nas descobertas científicas.',
      c: 'a natureza fornece evidências suficientemente simples que permitem interpretações científicas sem ambiguidades.',
      d: 'controvérsias científicas são eventos raros no processo de construção de teorias e hipóteses científicas.',
      e: 'um experimento não prova determinada hipótese ou teoria embora possa trazer evidências favoráveis ou contrárias a elas.',
    },
    correctAnswer: 'e',
  },
  {
    id: 'bio_c01_enem_q3',
    type: 'multiple-choice',
    number: 3,
    question:
      'C4:H14 (Enem) A lenda diz que, em um belo dia ensolarado, Newton estava relaxando sob uma macieira. Pássaros gorjeavam em suas orelhas. Havia uma brisa gentil. Ele cochilou por alguns minutos. De repente, uma maçã caiu sobre a sua cabeça e ele acordou com um susto. Olhou para cima. “Com certeza um pássaro ou um esquilo derrubou a maçã da árvore”, supôs. Mas não havia pássaros ou esquilos na árvore por perto. Ele, então, pensou: “Apenas alguns minutos antes, a maçã estava pendurada na árvore. Nenhuma força externa fez ela cair. Deve haver alguma força subjacente que causa a queda das coisas para a terra”.<br><br><span class="enem-questao__referencia">The English Enlightenment, p. 1-3, apud MARTINS, R. A. A maçã de Newton: história, lendas e tolices. In: SILVA, C. C. (org.). Estudos de história e filosofia das ciências: subsídios para aplicação no ensino. São Paulo: Livraria da Física, 2006. p. 169 (adaptado).</span><br><br>Em contraponto a uma interpretação idealizada, o texto aponta para a seguinte dimensão fundamental da ciência moderna:',
    options: {
      a: 'Falsificação de teses.',
      b: 'Negação da observação.',
      c: 'Proposição de hipóteses.',
      d: 'Contemplação da natureza.',
      e: 'Universalização de conclusões.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'bio_c01_enem_q4',
    type: 'multiple-choice',
    number: 4,
    question:
      'C4:H14 (PUC-Rio) As primeiras observações microscópicas de materiais biológicos foram realizadas por Antonie van Leeuwenhoek. A partir daí, o campo da microscopia avançou, principalmente com o desenvolvimento da microscopia eletrônica. Considerando os estudos da organização celular em procariotos e eucariotos, verifica-se que',
    options: {
      a: 'procariotos não possuem carioteca, nem têm material genético.',
      b: 'eucariotos não possuem clorofila e não realizam divisão celular.',
      c: 'procariotos apresentam material genético disperso no citoplasma.',
      d: 'eucariotos não possuem núcleo organizado delimitado por envoltório nuclear.',
      e: 'procariotos apresentam mitocôndrias e cloroplastos.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'bio_c01_enem_q5',
    type: 'multiple-choice',
    number: 5,
    question:
      'C4:H14 (UEA-2024) Em 1920, o russo Aleksandr Oparin e o inglês John Haldane propuseram de forma independente explicações sobre a origem da vida na Terra. Segundo esses cientistas, a vida surgiu na Terra por',
    options: {
      a: 'evolução química.',
      b: 'criação divina.',
      c: 'origem extraterrestre.',
      d: 'biogênese.',
      e: 'seleção natural.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'bio_c01_enem_q6',
    type: 'multiple-choice',
    number: 6,
    question:
      'C4:H14 (Unicamp) Na antiguidade, alguns cientistas e pensadores famosos tinham um conceito curioso sobre a origem da vida e em alguns casos existiam até receitas para reproduzir esse processo. Os experimentos de Pasteur foram importantes para a mudança dos conceitos e hipóteses alternativas para o surgimento da vida. Evidências sobre a origem da vida sugerem que',
    options: {
      a: 'a composição química da atmosfera influenciou o surgimento da vida.',
      b: 'os coacervados deram origem às moléculas orgânicas.',
      c: 'a teoria da abiogênese foi provada pelos experimentos de Pasteur.',
      d: 'o vitalismo é uma das bases da biogênese.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'bio_c01_enem_q7',
    type: 'multiple-choice',
    number: 7,
    question:
      'C4:H14 (PUC-Rio) Considere os seguintes componentes celulares:<br>I. parede celular<br>II. membrana nuclear<br>III. membrana plasmática<br>IV. DNA<br><br>É correto afirmar que:',
    options: {
      a: 'protozoários e vegetais possuem II e IV;',
      b: 'bactérias e animais possuem I e II;',
      c: 'bactérias e protozoários possuem II e IV;',
      d: 'animais e vegetais possuem I e III;',
      e: 'bactérias e vegetais possuem II e III.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'bio_c01_enem_q8',
    type: 'multiple-choice',
    number: 8,
    question:
      'C4:H14 (UFRGS-2020) Cientistas encontraram compostos de ferro, cianeto e monóxido de carbono em meteoritos que bombardearam a Terra durante sua formação, o que pode fornecer pistas sobre a origem da vida no planeta. Essa composição assemelha-se à hidrogenase, enzima que quebra o hidrogênio:<br><br>“É possível que esses complexos de cianeto, ferro e monóxido de carbono tenham sido precursores para as ações das enzimas e depois incorporados a proteínas”, acredita Karen Smith, pesquisadora sênior de Boise.<br><br><span class="enem-questao__referencia">Adaptado de: Redação Galileu, 27/06/2019. Disponível em: https://revistagalileu.globo.com/Ciencia/Espaco/noticia/2019/06/venenoem-meteoritos-fornece-pistas-sobre-origem-da-vida-na-terra.html. Acesso em: 12 jun. 2019.</span><br><br>Em relação às teorias de origem da vida no planeta Terra, é correto afirmar que',
    options: {
      a: 'a notícia reforça a possibilidade da vinda de seres vivos de outros planetas, tal como postulado por Pasteur em 1860.',
      b: 'a teoria da biogênese argumenta que os primeiros seres vivos surgiram a partir da matéria inanimada.',
      c: 'os primeiros seres vivos que surgiram na Terra foram os coacervatos, formados por um agregado de moléculas inorgânicas.',
      d: 'a teoria da geração espontânea sustenta que os seres vivos surgiram a partir de moléculas orgânicas da atmosfera primitiva.',
      e: 'os experimentos de Redi com pedaços de carne, no século XVII, corroboram a teoria da biogênese.',
    },
    correctAnswer: 'e',
  },
  {
    id: 'bio_c01_enem_q9',
    type: 'multiple-choice',
    number: 9,
    question:
      'C4:H14 (Enem-2020) Na tentativa de explicar o processo evolutivo dos seres humanos, em 1981, Lynn Margulis propôs a teoria endossimbiótica, após ter observado que duas organelas celulares se assemelhavam a bactérias em tamanho, forma, genética e bioquímica. Acredita-se que tais organelas são descendentes de organismos procariontes que foram capturados por alguma célula, vivendo em simbiose. Tais organelas são as mitocôndrias e os cloroplastos, que podem se multiplicar dentro da célula.<br><br>A multiplicação dessas organelas deve-se ao fato de apresentarem',
    options: {
      a: 'DNA próprio.',
      b: 'ribossomos próprios.',
      c: 'membrana duplicada.',
      d: 'código genético diferenciado.',
      e: 'maquinaria de reparo do DNA.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'bio_c01_enem_q10',
    type: 'multiple-choice',
    number: 10,
    question:
      'C4:H14 (UEMA) Analise a representação esquemática do experimento conhecido como “pescoço de cisne” para responder à questão.<br><br>Louis Pasteur realizou um experimento sobre geração espontânea, no qual demonstrou que os microrganismos presentes em caldos previamente esterilizados eram provenientes do ar, ou seja, não surgiam de forma espontânea. Com isso a Teoria da Geração Espontânea foi sepultada definitivamente, dando lugar à Teoria da Biogênese.',
    media: {
      src: capAsset('images/333_1.jpg'),
      alt: 'Representação esquemática do experimento pescoço de cisne de Pasteur',
      credit: 'Fonte: AMABIS. Biologia. São Paulo, Moderna, 2004. (adaptado)',
    },
    questionAfterMedia:
      'Para que Pasteur derrubasse a teoria da abiogênese, no experimento, a etapa decisiva foi a',
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
    id: 'bio_c01_enem_q11',
    type: 'multiple-choice',
    number: 11,
    question:
      'C4:H14 (UEL) Um dos temas mais controversos da história da ciência diz respeito à origem da vida, pois existia a dúvida se ela teria surgido pela abiogênese (geração espontânea) ou pela biogênese. Por séculos, inúmeros pesquisadores propuseram e desenvolveram explicações, por meio de experimentos, como consequência de diferentes olhares. Com base nos conhecimentos sobre abiogênese e biogênese, assinale a alternativa que relaciona, corretamente, o pesquisador, a hipótese por ele defendida e o experimento que deu sustentação para sua defesa.',
    options: {
      a: 'John Turberville Needham defendeu a abiogênese por meio de experimentos que demonstraram o surgimento de microrganismos em um caldo de carne aquecido e mantido em recipientes fechados.',
      b: 'Jean-Baptiste van Helmont defendeu a biogênese por meio de experimentos que demonstraram o surgimento de larvas em pedaços de carne em putrefação.',
      c: 'Lazzaro Spallanzani defendeu a biogênese por meio de estudos que demonstraram a origem da matéria que permitia o crescimento das plantas em vasos.',
      d: 'Felix Pouchet defendeu a biogênese por meio de experimentos a partir dos quais surgiam microrganismos pela fervura de um caldo nutritivo em frascos de vidro.',
      e: 'Louis Pasteur defendeu a abiogênese por meio de experimentos com uma mistura aquecida de água, feno e gás oxigênio (O<sub>2</sub>), a partir da qual surgiam microrganismos.',
    },
    correctAnswer: 'a',
  },
  {
    id: 'bio_c01_enem_q12',
    type: 'multiple-choice',
    number: 12,
    question:
      'C4:H14 (FACERES) A Teoria Celular, de Mathias Schleiden e de Theodor Schwann, enuncia que “Todos os seres vivos são formados por células”. A partir dessa perspectiva, analise as afirmações a seguir:<br>I. Todas as células são constituídas por membrana plasmática, citoplasma e núcleo bem definido.<br>II. A célula é a unidade morfológica e fisiológica dos seres vivos.<br>III. A célula vegetal tem parede celular, grande vacúolo central e cloroplasto, estruturas que não estão presentes na célula animal.<br>IV. São exemplos de organismos unicelulares procariontes: bactérias, cianobactérias, arqueas e protozoários.<br>V. Vírus não é ser vivo.<br><br>Estão corretas:',
    options: {
      a: 'Apenas I, II e IV.',
      b: 'Apenas I, III e IV.',
      c: 'Apenas III e V.',
      d: 'Apenas II, III e V.',
      e: 'Todas estão corretas.',
    },
    correctAnswer: 'd',
  },
  {
    id: 'bio_c01_enem_q13',
    type: 'multiple-choice',
    number: 13,
    question:
      'C4:H14 (Unicamp-2021) Em 1967, a bióloga Lynn Margulis apresentou a teoria da endossimbiose, segundo a qual micro-organismos procariontes originaram organelas celulares. De acordo com essa teoria, a bactéria (1) podia utilizar os fótons que chegavam do Sol e o gás carbônico da atmosfera para produzir carboidratos e liberar oxigênio. Já a bactéria (2) podia gerar energia com o uso de oxigênio. Posteriormente, uma célula foi capaz de englobar as bactérias (1) e (2), sem digeri-las. Essa revolução biológica permitiu a origem de seres eucariontes e multicelulares. Assinale a alternativa correta quanto à teoria da endossimbiose.',
    options: {
      a: '(1) representa um procarionte fotossintetizante e (2) representa um procarionte anaeróbio. Os procariontes forneciam energia à célula que os englobou, e a célula hospedeira fornecia água e oxigênio.',
      b: '(1) representa um procarionte fermentador e (2) representa um procarionte aeróbio. Os procariontes forneciam enzimas à célula que os englobou, e a célula hospedeira fornecia proteção.',
      c: '(1) representa um procarionte fotossintetizante e (2) representa um procarionte aeróbio. Os procariontes forneciam energia à célula que os englobou, e a célula hospedeira fornecia proteção.',
      d: '(1) representa um procarionte fermentador e (2) representa um procarionte anaeróbio. Os procariontes forneciam enzimas à célula que os englobou, e a célula hospedeira fornecia água e oxigênio.',
    },
    correctAnswer: 'c',
  },
  {
    id: 'bio_c01_enem_q14',
    type: 'summation',
    number: 14,
    question:
      'C8:H28 (UEPG-2020) No intuito de determinar como a vida surgiu em nosso planeta, muitas hipóteses e teorias foram geradas. Sobre esse tema, assinale o que for correto.',
    statements: [
      {
        value: 1,
        text: 'A ideia de que a vida pode surgir regularmente da matéria sem vida é conhecida como teoria da abiogênese ou geração espontânea.',
        correct: true,
      },
      {
        value: 2,
        text: 'O pesquisador Stanley Miller simulou em laboratório as condições que supostamente ocorriam na Terra primitiva, a fim de mostrar que as primeiras moléculas orgânicas poderiam ser formadas a partir dos gases da Terra primitiva.',
        correct: true,
      },
      {
        value: 4,
        text: 'Segundo a hipótese heterotrófica, os primeiros seres vivos obtinham energia a partir da fermentação de moléculas orgânicas simples.',
        correct: true,
      },
      {
        value: 8,
        text: 'Segundo a hipótese autotrófica, a quimiossíntese – processo autotrófico que permite a obtenção de energia a partir de substâncias inorgânicas – surgiu antes da fermentação.',
        correct: true,
      },
      {
        value: 16,
        text: 'O experimento de Louis Pasteur deu apoio à teoria da abiogênese, uma vez que evidenciou o crescimento de microrganismos a partir de um caldo de carne mantido em frascos hermeticamente fechados.',
        correct: false,
      },
    ],
    correctAnswer: 15,
    correctAnswerDetail: '01 + 02 + 04 + 08',
  },
  {
    id: 'bio_c01_enem_q15',
    type: 'summation',
    number: 15,
    question:
      'C8:H28 (UEPG) A célula eucariótica detém organização mais complexa quando comparada à célula procariótica. Assinale o que for correto sobre a origem e complexidade das células procarióticas e eucarióticas.',
    statements: [
      {
        value: 1,
        text: 'As células procarióticas passaram por vários eventos de invaginações da membrana plasmática, que deram origem a uma série de organelas membranosas, entre elas os cloroplastos, as mitocôndrias e os lisossomos.',
        correct: false,
      },
      {
        value: 2,
        text: 'Diversas evidências dão sustentação à hipótese endossimbiótica. Por exemplo, as mitocôndrias e os cloroplastos possuem DNA próprio, sintetizam algumas de suas proteínas e são capazes de se autoduplicar.',
        correct: true,
      },
      {
        value: 4,
        text: 'Uma grande novidade evolutiva foi o surgimento do envoltório nuclear (carioteca) nas células eucarióticas. A presença da carioteca permite a compartimentalização das células eucarióticas em nucleoplasma e citoplasma.',
        correct: true,
      },
      {
        value: 8,
        text: 'Com relação à hipótese endossimbiótica, os cientistas acreditam que as mitocôndrias e os cloroplastos descendem de bactérias primitivas que, durante a evolução, associaram-se e passaram a viver em simbiose com células eucarióticas primitivas.',
        correct: true,
      },
    ],
    correctAnswer: 14,
    correctAnswerDetail: '02 + 04 + 08',
  },
  {
    id: 'bio_c01_enem_q16',
    type: 'text-input',
    number: 16,
    question:
      'C8:H28 (UERJ) Segundo estudos, a evolução de todos os eucariotos é o resultado da incorporação, em um passado remoto, de bactérias aeróbias de vida livre no interior de uma célula, em uma associação vantajosa para ambas. Essas bactérias originaram organelas celulares denominadas mitocôndrias. Nomeie a teoria evolutiva que explica a formação da célula eucariótica por esse processo. Nomeie, também, a relação ecológica estabelecida entre as bactérias e a célula e explique de que maneira cada uma se beneficiou dessa associação.',
    placeholder: 'Digite aqui...',
    correctAnswer:
      'Teoria endossimbionte. Relação ecológica: mutualismo. A célula hospedeira pode utilizar mais energia ou oxigênio; as bactérias aeróbias obtêm proteção ou um ambiente controlado.',
  },
  {
    id: 'bio_c01_enem_q17',
    type: 'text-input',
    number: 17,
    question:
      'C4:H14 (UEMA) Analise a imagem para responder à questão.<br><br>Ao realizar um estudo de biologia, um aluno deparou-se com duas figuras de células: a figura A, representando uma célula animal, e a figura B, uma célula vegetal. De acordo com as figuras,',
    media: {
      src: capAsset('images/334_1.jpg'),
      alt: 'Figura A: célula animal; Figura B: célula vegetal',
      credit:
        'Fonte: https://pt.aliexpress.com/item/Periodic-Table-SA-full-dyesubbed-Keycaps (adaptado).',
    },
    subQuestions: [
      {
        letter: 'a',
        question:
          'selecione uma organela citoplasmática comum aos dois tipos celulares, com sua respectiva função.',
        placeholder: 'Digite aqui...',
        correctAnswer:
          'Pode-se citar muitas organelas que estão presentes tanto na célula animal quanto na vegetal, com exceção de lisossomos, que só estão presentes na célula animal, e dos plastos, do vacúolo celular e dos glioxissomos, que estão presentes apenas na célula vegetal. Exemplo de resposta: mitocôndria, presente em toda célula eucariótica, é responsável pela respiração celular.',
      },
      {
        letter: 'b',
        question:
          'cite duas estruturas ou organelas celulares que permitem ao estudante identificar a figura B como uma célula vegetal.',
        placeholder: 'Digite aqui...',
        correctAnswer: 'Vacúolo celular, parede celular e cloroplasto.',
      },
    ],
  },
];

/** Cole aqui os links dos QR Codes de resolução (go.sae.digital / …). */
const VIDEO_RESOLUCAO_DESAFIO = {
  q14: 'https://go.sae.digital/dB9i8W',
  q15: 'https://go.sae.digital/cmQ4ok',
  q16: 'https://go.sae.digital/l4qoar',
  q17: 'https://go.sae.digital/EwuhTM',
};

const perguntasPaginaAbertura = chapterQuestions.filter((q) => q.id === 'bio_c01_osiris_q1');
const perguntasLinhaChegada = chapterQuestions.filter((q) =>
  q.id.startsWith('bio_c01_chegada_'),
);
const perguntasObjetivasGabarito = chapterQuestions.filter((q) => {
  if (q.type !== 'multiple-choice' && q.type !== 'true-false' && q.type !== 'summation') {
    return false;
  }
  if (q.id.startsWith('bio_c01_saberes_q')) return true;
  const enemMatch = q.id.match(/^bio_c01_enem_q(\d+)$/);
  if (!enemMatch) return false;
  const n = Number(enemMatch[1]);
  return n >= 1 && n <= 15;
});

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination(START_PAGE);
  const [showGabarito, setShowGabarito] = useState(false);
  useScrollPosition();

  const getQuestionById = (questionId: string) =>
    chapterQuestions.find((question) => question.id === questionId)!;

  const gabaritoScore = scoreObjectiveAnswers(perguntasObjetivasGabarito, userAnswers);

  return (
    <div className="marca-sae min-h-screen w-full bg-gray-200">
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Header
          marca="sae"
          badge="CAPÍTULO"
          chapterNumber={1}
          chapterTitle="A origem da vida"
        />

        <Pagination currentPage={START_PAGE} />

        <Poster
          imageSrc={capAsset('images/capa.png')}
          alt="Imagem de abertura do capítulo"
          creditLine1="joshimerbin/Shutterstock"
          creditLine2="Representação do robô utilizado na missão OSIRIS-REx."
        />

        <div className="p-8 md:p-12">
          <EscolaDigital
            link="https://go.sae.digital/2qCilS"
            thumbnailSrc={capAsset('images/capaVideo.png')}
          />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={<TeacherAnswers questions={perguntasPaginaAbertura} />}
            />
          </div>

          <Chapter
            title=""
            content={
              <>
                <PontoDePartida />

                <div className="caixa-citacao">
                  <p>
                    A missão [...] do OSIRIS-REx [uma espaçonave da Nasa] era recuperar uma amostra
                    da estranha superfície de Bennu [asteroide próximo à Terra], composta por pedras
                    espaciais frouxamente ligadas, e trazê-la de volta à Terra. A missão foi
                    bem-sucedida e [...] a OSIRIS-REx lançou sua cápsula de amostras cuidadosamente
                    embalada através da atmosfera terrestre, direto para os braços ansiosos dos
                    cientistas.
                  </p>
                  <p>
                    Bennu e um punhado de asteroides especiais como ele são objetos antigos,
                    remanescentes dos primeiros momentos da formação dos planetas em nosso Sistema
                    Solar. A amostra que a OSIRIS-REx trouxe de volta contém minerais que se
                    formaram na água e uma diversidade impressionante de compostos orgânicos, que
                    contêm carbono.
                  </p>
                  <p className="caixa-citacao__reticencias">[...]</p>
                  <p>
                    Algumas das nossas melhores pistas sobre os primórdios do Sistema Solar vêm de
                    meteoritos, ou rochas espaciais que caíram na Terra. Menos de 5% dos meteoritos
                    pertencem a uma classe especial chamada <strong>condritos carbonáceos</strong>,
                    que são praticamente tão antigos quanto o próprio Sistema Solar. Eles contêm
                    água ligada à rocha e diversas moléculas orgânicas, desde aminoácidos até
                    componentes simples do DNA.
                  </p>
                  <p className="caixa-citacao__reticencias">[...]</p>
                  <p>
                    “Há cada vez mais evidências de que a maioria, senão todos, os blocos de
                    construção da vida podem se formar por meio de múltiplas vias no espaço e na
                    superfície dos planetas”, diz o geoquímico orgânico Angel Mojarro, do Centro de
                    Voos Espaciais Goddard da Nasa, cuja equipe recentemente encontrou{' '}
                    <strong>triptofano</strong> — um aminoácido presente na vida que nunca havia
                    sido detectado em meteoritos ou amostras trazidas do espaço — em amostras de
                    Bennu.
                  </p>
                  <p className="caixa-citacao__reticencias">[...]</p>
                  <p>
                    O mistério das origens da vida não é um ingrediente mágico que falta — graças a
                    estudos de meteoritos, experimentos de laboratório, observações com telescópios
                    e agora a coleta de amostras, sabemos que moléculas orgânicas simples se formam
                    facilmente em todo o cosmos. O verdadeiro mistério é o processo pelo qual essas
                    moléculas orgânicas se organizam em vida e o ambiente que permite essa
                    transformação.
                  </p>
                </div>

                <p className="bloco-leitura__referencia bloco-leitura__referencia--direita">
                  CUTTS, Elise. <em>Este asteroide está revelando segredos sobre a origem da vida na
                    Terra</em>. National Geographic. Disponível em:{' '}
                  <a
                    href="https://www.nationalgeographicbrasil.com/espaco/2026/01/este-asteroide-esta-revelando-segredos-sobre-a-origem-da-vida-na-terra"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.nationalgeographicbrasil.com/espaco/2026/01/este-asteroide-esta-revelando-segredos-sobre-a-origem-da-vida-na-terra
                  </a>
                  . Acesso em: 28 fev. 2026.
                </p>

                <p className="mb-4 indent-6">
                  De acordo com o texto, a missão OSIRIS-REx não buscou “seres vivos” propriamente
                  ditos, mas sim “blocos de construção da vida”.
                </p>

                <QuestionRenderer
                  question={getQuestionById('bio_c01_osiris_q1')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showGabarito}
                />

                <Pagination currentPage={325} expandToBookColumn />

                <div className="my-4">
                  <TeacherButton
                    visible={SHOW_TEACHER_BUTTON}
                    content={
                      <>
                        <p className="mb-2 font-semibold">Indicações</p>
                        <p>
                          Esta atividade mobiliza a competência de analisar e utilizar
                          representações e de realizar consultas de dados digitais, conforme
                          preconiza a habilidade EM13CO13 da BNCC de Computação.
                        </p>
                      </>
                    }
                  />
                </div>

                <h2 className="titulo-bio">O que é Biologia?</h2>
                <p className="mb-4 indent-6">
                  A palavra <em>biologia</em> tem origem do grego <em>bio = vida</em> e{' '}
                  <em>logo = estudo</em>. Portanto, Biologia é o estudo da vida em todos os aspectos,
                  tanto no planeta Terra quanto fora dele. Por ser uma área de estudo muito ampla, a
                  Biologia tem muitos campos de estudo, como: Biologia celular, que estuda as
                  células; Botânica, que estuda as plantas; Genética, que estuda a hereditariedade; e
                  Microbiologia, que estuda organismos patogênicos.
                </p>

                <h3 className="titulo-bio">Métodos de pesquisa</h3>
                <p className="mb-4 indent-6">
                  Os seres humanos pré-históricos já observavam o ambiente em que viviam e, por meio
                  dessas observações, adquiriam conhecimentos sobre o comportamento dos animais que
                  caçavam e daqueles pelos quais eram caçados. O aprendizado adquirido sobre as
                  plantas também foi importante para que pudessem utilizá-las como fontes alimentar e
                  medicinal e, ainda, iniciar a prática da agricultura.
                </p>
                <p className="mb-4 indent-6">Ao longo do tempo, a maneira de fazer essas observações foi sendo aprimorada, até que se chegou a diferentes métodos de pesquisa. Com a utilização desses métodos, a produção e atualização
                  do conhecimento científico ocorre quando o estudo passa por uma série de etapas.</p>
                <div className="cf-icon-modal-com-texto">
                  <div className="cf-icon-modal-com-texto__icone">
                    <CfIconAtualidades iconSrc={capAsset('images/cfIconAtualidades.png')}>
                      <p>
                        Em alguns tipos de pesquisa, é importante ter um grupo de controle e um
                        grupo experimental.
                      </p>
                      <p>
                        O <b>grupo de controle</b> não recebe intervenção ou recebe intervenção com
                        placebo e serve de comparação com o grupo que recebe intervenções com a
                        substância ou outro produto que se quer testar, este chamado de{' '}
                        <b>grupo experimental</b>.
                      </p>
                      <p>
                        Por exemplo, durante a fase de testes da vacina CoronaVac, produzida pelo
                        Instituto Butantã em parceria com a farmacêutica chinesa Sinovac, houve um
                        grupo de pessoas que tomou a dose da vacina e outro grupo que tomou uma
                        substância neutra, sem relação com a vacina. Por meio desse método, ao
                        comparar os dois grupos, foi possível verificar o grau de eficiência da
                        vacina.
                      </p>
                    </CfIconAtualidades>
                  </div>
                  <p className="mb-4 indent-6">
                    Há diversas maneiras de obter conhecimento científico. Então, cada campo da
                    ciência tem seus métodos, e estes também podem variar de acordo com a pesquisa a
                    ser realizada. Algumas etapas que geralmente fazem parte dos métodos de pesquisa
                    são: observação, problematização, leitura de pesquisas anteriores, levantamento
                    de hipóteses, experimentação, discussão com outros pesquisadores, análise de
                    resultados e conclusão.
                  </p>
                </div>

                <p className="mb-4 indent-6">Com base nas conclusões obtidas em investigações científicas, pode-se elaborar leis e/ou teorias.</p>
                <p className="mb-4 indent-6">A <b>lei científica</b> é uma regra geral para fenômenos que ocorrem com regularidade, por exemplo,
                  as leis da hereditariedade elaboradas por Mendel.</p>
                <p className="mb-4 indent-6">A <b>teoria científica</b> é o resultado de um conjunto de conclusões e modelos científicos que explica
                  determinado fenômeno, por exemplo, a teoria do Big Bang, que busca explicar a origem do Universo.</p>
                <div className="cf-icon-modal-com-texto">
                  <div className="cf-icon-modal-com-texto__icone">
                    <CfIconIndicacoes iconSrc={capAsset('images/cfIconIndicacoes.png')}>
                      <p>
                        As redes sociais podem dar destaque a estudos com promessas que a ciência
                        ainda não confirmou. Este artigo discute como a empolgação digital muitas
                        vezes atropela o método científico, transformando substâncias em fase de
                        estudo em “curas milagrosas” antes da hora. A leitura ajuda a entender por
                        que as etapas de observação, hipótese e testes rigorosos são vitais para a
                        segurança de todos.
                      </p>
                      <div className="cf-icon-modal__acoes">
                        <a
                          className="cf-icon-modal__botao-link"
                          href="https://go.sae.digital/Xu6DUW"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Clique para acessar
                        </a>
                      </div>
                    </CfIconIndicacoes>
                  </div>
                  <p className="mb-4 indent-6">
                    Como exemplo do uso de um método de pesquisa na área da Biologia, pode-se citar
                    os estudos de Charles Darwin (1809-1882) e seu filho, Francis Darwin
                    (1848-1925), a respeito do crescimento de alpiste, feitos por volta de 1880.
                  </p>
                </div>

                <div className="metodo-darwin">
                  <figure className="metodo-darwin__figura">
                    <img
                      src={capAsset('images/325.png')}
                      alt="Etapas do método científico no experimento de Charles Darwin e Francis Darwin com alpiste."
                    />
                    <figcaption>SAE DIGITAL S/A</figcaption>
                  </figure>

                  <div className="metodo-darwin__etapas">
                    <div className="metodo-darwin__etapa">
                      <span className="metodo-darwin__rotulo">Observação</span>
                      <p className="metodo-darwin__texto">
                        Charles Darwin e Francis Darwin observaram que o alpiste recém-germinado
                        crescia em direção à luz.
                      </p>
                    </div>
                    <div className="metodo-darwin__etapa">
                      <span className="metodo-darwin__rotulo">Problematização</span>
                      <p className="metodo-darwin__texto">
                        Eles se perguntaram o que ocasionava esse fenômeno.
                      </p>
                    </div>
                    <div className="metodo-darwin__etapa">
                      <span className="metodo-darwin__rotulo">Elaboração de hipóteses</span>
                      <p className="metodo-darwin__texto">
                        Os pesquisadores supuseram que esse fenômeno estava relacionado à região
                        superior da planta, chamada coleóptilo, que protege as primeiras folhas do
                        broto que germinou.
                      </p>
                    </div>
                    <div className="metodo-darwin__etapa">
                      <span className="metodo-darwin__rotulo">Experimentação</span>
                      <p className="metodo-darwin__texto">
                        Para verificar se a hipótese estava correta, eles organizaram cinco grupos
                        de alpiste: grupo de controle sem intervenção; grupo 1 com o coleóptilo
                        cortado; grupo 2 com o coleóptilo coberto com papel transparente; grupo 3
                        com o coleóptilo coberto com lâmina de estanho; grupo 4 com a base coberta
                        com lâmina de estanho.
                      </p>
                    </div>
                    <div className="metodo-darwin__etapa">
                      <span className="metodo-darwin__rotulo">Análise de resultados</span>
                      <p className="metodo-darwin__texto">
                        Os pesquisadores analisaram que o grupo 1 parou de crescer, os grupos 2 e 4
                        continuaram crescendo e se curvando em direção à luz, e o grupo 3 continuou
                        crescendo, mas parou de se curvar em direção à luz.
                      </p>
                    </div>
                    <div className="metodo-darwin__etapa">
                      <span className="metodo-darwin__rotulo">Conclusão</span>
                      <p className="metodo-darwin__texto">
                        Com base nesse experimento, Charles Darwin e Francis Darwin concluíram que a
                        ponta da planta controla a curvatura e o crescimento do alpiste.
                      </p>
                    </div>
                  </div>
                </div>

                <HabilidadesNaPratica iconSrc={capAsset('images/iconHabilidadesPratica.png')}>

                  <p className="habilidades-pratica__enunciado">
                    <span className="habilidades-pratica__numero">1. </span>
                    Reúna-se com um colega e pesquisem uma reportagem que descreva uma investigação
                    científica. Definam um tema de interesse e acessem uma base de dados acadêmica.
                    Utilizem palavras-chave específicas e apliquem filtros avançados, como o período
                    de publicação (últimos 10 anos) e o idioma.
                  </p>
                  <p className="habilidades-pratica__enunciado">
                    Em seguida, elaborem, em seu caderno, um breve relatório que descreva o tema de
                    tal investigação, quais etapas foram percorridas e qual resultado os
                    pesquisadores encontraram. Ainda, identifiquem possíveis limitações que o método
                    utilizado encontraria se a pesquisa fosse realizada em épocas anteriores.
                  </p>
                  <QuestionRenderer
                    question={getQuestionById('bio_c01_habilidades_q1')}
                    userAnswers={userAnswers}
                    onAnswerChange={handleAnswerChange}
                    showResults={showGabarito}
                    hidePrompt
                  />
                </HabilidadesNaPratica>
              </>
            }
          />

          <Pagination currentPage={326} expandToBookColumn />

          <h2 className="titulo-bio">A célula</h2>
          <p className="mb-4 indent-6">
            Desde a Antiguidade, os seres humanos se questionam sobre a origem dos seres vivos, e,
            ao longo dos séculos, os diferentes povos formularam as próprias hipóteses sobre o tema.
            Para Aristóteles (384-322 a.C.), filósofo da Grécia Antiga, um ser vivo poderia se
            originar da matéria bruta por meio da ação de um princípio que ele chamava de força
            vital. Essa explicação para a origem dos seres vivos ficou conhecida como{' '}
            <b>geração espontânea</b> e afirmava que larvas, na época chamadas de vermes, poderiam
            se originar de carne em putrefação, por exemplo.
          </p>
          <div className="cf-icon-modal-com-texto">
            <div className="cf-icon-modal-com-texto__icone">
              <CfIconInfoMais iconSrc={capAsset('images/cfIconInfoMais.png')}>
                <p>
                  A abiogênese, também denominada geração espontânea, relaciona-se à ideia do
                  surgimento de um ser vivo da matéria bruta, enquanto a biogênese afirma que os
                  seres vivos surgem da matéria viva, ou seja, um ser vivo somente se origina de
                  outro ser vivo.
                </p>
              </CfIconInfoMais>
            </div>
            <p className="mb-4 indent-6">
              Até meados do século XVII, a maioria dos estudiosos de seres vivos acreditava nessa
              ideia. Porém, alguns deles passaram a questioná-la e investigá-la por meio de
              experimentos, que levaram à refutação da geração espontânea ao identificarem que um
              ser vivo somente se origina de outro preexistente.
            </p>
          </div>
          <p className="mb-4 indent-6">
            Observe a seguir alguns experimentos que foram importantes para o desenvolvimento
            dessas conclusões.
          </p>

          <section className="exp-geracao" aria-label="Experimentos sobre a geração espontânea">
            <article className="exp-geracao__item">
              <div className="exp-geracao__eixo" aria-hidden="true">
                <span className="exp-geracao__ano">1668</span>
                <span className="exp-geracao__ponto" />
              </div>
              <div className="exp-geracao__corpo">
                <div className="exp-geracao__caixa">
                  <p>
                    O naturalista italiano <b>Francesco Redi</b> (1626-1697) realizou um experimento para
                    identificar como os vermes se originavam da carne em putrefação. Ele percebeu
                    que os vermes eram larvas das moscas que pousavam na carne. Com isso, o
                    cientista concluiu que nem sempre um ser vivo surge da matéria bruta, mas
                    continuou acreditando que a geração espontânea explicava alguns casos, como o
                    surgimento de vermes no intestino humano.
                  </p>
                </div>
                <figure className="exp-geracao__figura">
                  <img
                    src={capAsset('images/326_1.png')}
                    alt="Experimento de Redi: pote fechado com gaze sem larvas e pote aberto com larvas de moscas."
                  />
                  <figcaption>SAE DIGITAL S/A</figcaption>
                </figure>
              </div>
            </article>

            <article className="exp-geracao__item">
              <div className="exp-geracao__eixo" aria-hidden="true">
                <span className="exp-geracao__ano">1745</span>
                <span className="exp-geracao__ponto" />
              </div>
              <div className="exp-geracao__corpo">
                <div className="exp-geracao__caixa">
                  <p>
                    Em 1745, o naturalista inglês <b>John Turberville Needham</b> (1713-1781) conduziu um
                    experimento no qual aqueceu o caldo nutritivo e colocou-o em frascos tampados
                    com rolhas. Após alguns dias, ele observou o caldo ao microscópio e percebeu a
                    presença de microrganismos. Então, Needham concluiu que o caldo nutritivo tinha
                    uma “força vital” responsável pelo aparecimento da vida. Esse experimento
                    tornou-se um argumento a favor da geração espontânea.
                  </p>
                </div>
              </div>
            </article>

            <article className="exp-geracao__item">
              <div className="exp-geracao__eixo" aria-hidden="true">
                <span className="exp-geracao__ano">1770</span>
                <span className="exp-geracao__ponto" />
              </div>
              <div className="exp-geracao__corpo">
                <div className="exp-geracao__caixa">
                  <p>
                    <b>Lazzaro Spallanzani</b> (1729-1799), naturalista italiano, desconfiou dos
                    resultados de Needham e resolveu refazer esse experimento com algumas
                    modificações. Ele colocou caldo nutritivo em frascos fechados hermeticamente e
                    ferveu em caldeirões com água durante bastante tempo. Após alguns dias de
                    esfriamento, Spallanzani abriu os frascos, examinou o caldo ao microscópio e
                    não encontrou microrganismos. Ele concluiu que Needham cometeu dois erros no
                    experimento: não fechou os frascos corretamente para evitar que o caldo
                    nutritivo fosse contaminado após a fervura e não ferveu o suficiente para
                    eliminar os microrganismos que já estavam presentes no caldo. Needham
                    argumentou que Spallanzani tornou o ar desfavorável à “força vital” ao ferver
                    durante muito tempo o caldo nos frascos hermeticamente fechados. Os cientistas
                    da época apoiaram o argumento de Needham.
                  </p>
                </div>
                <figure className="exp-geracao__figura">
                  <img
                    src={capAsset('images/326_2.png')}
                    alt="Comparação dos experimentos de Needham e Spallanzani com caldo nutritivo."
                  />
                  <figcaption>SAE DIGITAL S/A</figcaption>
                </figure>
              </div>
            </article>

            <article className="exp-geracao__item">
              <div className="exp-geracao__eixo" aria-hidden="true">
                <span className="exp-geracao__ano">1861</span>
                <span className="exp-geracao__ponto" />
              </div>
              <div className="exp-geracao__corpo">
                <div className="exp-geracao__caixa">
                  <p>
                    <b>Louis Pasteur</b> (1822-1895), naturalista francês, selecionou frascos com gargalos
                    longos para colocar o caldo nutritivo. Então, aqueceu os gargalos e os
                    entortou, configurando os chamados gargalos pescoço de cisne. Depois, ferveu
                    os frascos por tempo suficiente para eliminar os microrganismos que estivessem
                    presentes no caldo nutritivo. Após alguns dias de resfriamento, ele observou a
                    substância ao microscópio e percebeu que não havia microrganismos. Ele concluiu
                    que não ocorria geração espontânea de vida no caldo nutritivo, pois essa
                    substância tinha sido fervida durante bastante tempo, conforme orientado por
                    Spallanzani, e não foi fechada hermeticamente, portanto, não perdeu a “força
                    vital”, conforme argumentou Needham. </p>
                  <br></br>
                  <p>Pasteur explicou que os microrganismos
                    eram provenientes do ar, e em seu experimento a contaminação do caldo não
                    ocorreu devido às curvas do gargalo. Para que não ficassem dúvidas com relação
                    a isso, Pasteur quebrou o gargalo, após um tempo examinou novamente o caldo
                    nutritivo e encontrou microrganismos. Esse experimento contribuiu para
                    enfraquecer a ideia da geração espontânea, mas ainda levou um tempo para que
                    ela fosse totalmente refutada pelos cientistas.
                  </p>
                </div>
                <figure className="exp-geracao__figura exp-geracao__figura--larga">
                  <img
                    src={capAsset('images/326_3.png')}
                    alt="Experimento de Pasteur com frasco de pescoço de cisne."
                  />
                  <figcaption>SAE DIGITAL S/A</figcaption>
                </figure>
              </div>
            </article>
          </section>

          <Pagination currentPage={327} expandToBookColumn />

          <h3 className="titulo-bio">Origem da vida na Terra</h3>
          <p className="mb-4 indent-6">Além do questionamento sobre como os seres vivos se originam, outra questão também muito discutida é a origem da
            vida no planeta Terra.</p>
          <p className="mb-4 indent-6">Para tentar elucidar essa questão, foram elaboradas várias teorias e explicações, que se modificaram ao longo do tempo. As mais aceitas atualmente recebem os nomes de panspermia e evolução química.</p>

          <h4 className="titulo-bio">Panspermia cósmica</h4>
          <p className="mb-4 indent-6">Essa teoria foi proposta em 1903 pelo físico irlandês <b>William Thomson</b> (1824-1907) e pelo químico sueco <b>Svante Arrhenius</b> (1859-1927). A panspermia propõe que a vida na Terra veio do espaço por meio de microrganismos, esporos ou fragmentos
            de moléculas orgânicas que viajaram pelo espaço sideral em meteoros e, quando chegaram ao planeta Terra, encontraram
            condições favoráveis ao seu desenvolvimento. </p>

          <h4 className="titulo-bio">Evolução química</h4>
          <p className="mb-4 indent-6">
            A teoria da evolução química foi formulada na década de 1920 por dois pesquisadores que
            não trabalhavam juntos. O bioquímico russo <b>Aleksandr Oparin</b> (1894-1980) e o
            biólogo britânico <b>John Burdon Sanderson Haldane</b> (1892-1964) defenderam a hipótese
            de que moléculas orgânicas se originaram de compostos inorgânicos presentes na Terra
            primitiva, o que deu origem ao primeiro ser vivo com o passar de milhões de anos.
          </p>
          <figure className="bio-texto-figura bio-texto-figura--abaixo">
            <img
              src={capAsset('images/327_1.jpg')}
              alt="Representação esquemática da teoria da evolução química."
            />
            <figcaption className="foto-com-credito-legenda">SAE DIGITAL S/A</figcaption>
            <p className="legenda-barra">
              Representação esquemática da teoria da evolução química.
            </p>
          </figure>
          <p className="mb-4 indent-6">
            Para esses pesquisadores, há bilhões de anos a atmosfera da Terra primitiva era formada
            basicamente por gás hidrogênio (H<sub>2</sub>), amônia (NH<sub>3</sub>), metano (CH
            <sub>4</sub>), vapor de água e uma quantidade mínima de oxigênio (O<sub>2</sub>). Esses
            componentes estariam em constantes reações desencadeadas pelas condições ambientais da
            época, como atmosfera com pouco ou nenhum oxigênio (O<sub>2</sub>), alta radiação solar e
            intensas descargas elétricas de tempestades, que teriam ajudado a formar moléculas
            orgânicas, as quais formariam nos mares primitivos o que foi chamado de{' '}
            <b>sopa primordial</b>. Tais moléculas teriam passado por um processo gradual de evolução
            química até formarem estruturas mais complexas, como os conjuntos de moléculas proteicas
            envoltas por água, chamados de <b>coacervados</b>. Com o passar do tempo, os coacervados
            teriam originado as primeiras células que constituíam os primeiros seres vivos
            unicelulares.
          </p>

          <h4 className="titulo-bio">Experimento de Miller e Urey</h4>

          <p className="mb-4 indent-6">Em 1953, <b>Stanley Lloyd Miller</b> (1930-2007) publicou os resultados do experimento que elaborou sob a supervisão de
            <b>Harold Clayton Urey</b> (1893-1981). Esses dois pesquisadores estadunidenses criaram um equipamento que simulava as condições da atmosfera primitiva. Nesse experimento, observou-se o aparecimento de aminoácidos, o que levou os pesquisadores
            a concluir ser possível que moléculas orgânicas se originassem de substâncias inorgânicas.</p>


          <figure>
            <img
              src={capAsset('images/327_2.png')}
              alt="Experimento de Miller e Urey."
            />
            <figcaption className="foto-com-credito-legenda">mre Terim/Shutterstock</figcaption>
            <p className="legenda-barra">
              Representação esquemática do experimento de Miller e Urey.
            </p>
          </figure>


          <Pagination currentPage={328} expandToBookColumn />

          <h3 className="titulo-bio">Como os primeiros seres vivos se alimentavam?</h3>
          <p className="mb-4 indent-6">Há um consenso com relação ao primeiro ser vivo do planeta Terra: ele teria se formado nos
            mares primitivos e se abrigado dos intensos raios ultravioleta vindos do Sol, os quais não eram
            filtrados pela atmosfera primitiva. </p>
          <p className="mb-4 indent-6">Para compreender como os primeiros seres vivos da Terra obtinham alimento, duas hipóteses
            foram elaboradas: a heterotrófica e a autotrófica.</p>

          <h4 className="titulo-bio">Hipótese heterotrófica</h4>
          <p className="mb-4 indent-6">De acordo com essa hipótese, os primeiros seres vivos eram bastante simples, portanto, não
            eram capazes de produzir o próprio alimento. Eles absorviam substâncias nutritivas do ambiente
            e obtinham energia delas por um processo de fermentação, reação que teria como produtos o CO<sub>2</sub>
            e o álcool. O aumento de CO<sub>2</sub> na atmosfera teria proporcionado o surgimento de seres autotróficos,
            que sintetizam matéria orgânica por meio de CO<sub>2</sub> e luz solar no processo de fotossíntese.</p>
          <p className="mb-4 indent-6">Um dos argumentos contra essa hipótese é que nos primórdios da Terra não existiria disponibilidade de substâncias nutritivas suficiente, uma vez que o ambiente passava por uma
            grande transformação.</p>

          <h4 className="titulo-bio">Hipótese autotrófica</h4>
          <p className="mb-4 indent-6">Essa hipótese considera que o primeiro ser vivo era capaz de produzir o próprio alimento por
            meio de um processo chamado quimiossíntese. </p>
          <p className="mb-4 indent-6">Nesse processo, o ser vivo promove reações de oxidação de substâncias inorgânicas, como
            amônia e sulfetos, que seriam abundantes na atmosfera primitiva. Essas reações liberam a energia
            utilizada para produzir matéria orgânica e oxigênio. Com o aumento de oxigênio (O<sub>2</sub>) na atmosfera
            e sua reação com os raios ultravioleta do Sol, forma-se o ozônio (O<sub>3</sub>), substância que passou a se
            acumular na atmosfera e impedir a entrada dos raios solares, o que favoreceu a colonização do
            ambiente terrestre. É importante ressaltar que esse processo deve ter acontecido de maneira
            gradual, no decorrer de milhões de anos.</p>

          <h2 className="titulo-bio">Teoria celular</h2>
          <div className="cf-icon-modal-com-texto">
            <div className="cf-icon-modal-com-texto__icone">
              <CfIconInfoMais iconSrc={capAsset('images/cfIconInfoMais.png')}>
                <p>
                  A formulação de todas as teorias e as hipóteses que envolvem o estudo das células
                  foi possível devido ao desenvolvimento e ao avanço dos microscópios. Dois
                  microscópios muito utilizados são o óptico e o eletrônico.
                </p>
                <p>
                  No microscópio óptico, a luz passa através da amostra e é coletada pelas lentes
                  do microscópio, formando uma imagem ampliada. Esse tipo de microscópio é muito
                  utilizado em laboratórios de pesquisa.
                </p>
                <p>
                  O microscópio eletrônico, desenvolvido pelo físico alemão Ernst August Friedrich
                  Ruska (1906-1988), funciona com a utilização de feixes de elétrons em vez de luz
                  visível, o que permite uma resolução muito maior do que os microscópios ópticos
                  tradicionais. Existem dois tipos principais de microscópios eletrônicos: o
                  microscópio eletrônico de transmissão e o microscópio eletrônico de varredura.
                </p>
              </CfIconInfoMais>
            </div>
            <p className="mb-4 indent-6">
              O primeiro ser vivo terrestre provavelmente era unicelular, de estrutura bastante
              simples. A identificação das células só foi possível após o desenvolvimento de lentes
              de ampliação. O primeiro registro dessa observação está no livro <i>Micrographia</i>,
              do cientista inglês Robert Hooke (1635-1703), publicado em 1665. Ao buscar entender
              por que a cortiça era tão leve e flutuante, ele cortou finas lâminas desse material e
              as observou ao microscópio. Ele percebeu que a cortiça era formada por estruturas ocas
              e cheias de ar. Um dos termos que ele utilizou para nomeá-las vem do latim <em>cella</em>{' '}
              e significa <em>câmara</em>. Após um tempo, esse termo originou a palavra <em>célula</em>,
              nomenclatura utilizada até hoje.
            </p>
          </div>
          <p className="mb-4 indent-6">
            Robert Hooke não sabia o que eram células, e o que ele observou foram as paredes de
            células vegetais mortas, por isso estavam ocas. No entanto, seus estudos influenciaram
            outros cientistas a pesquisarem essas estruturas, como os pesquisadores alemães{' '}
            <b>Mathias Jakob Schleiden</b> (1804-1881) e <b>Theodor Schwann</b> (1810-1882), que, por
            volta de 1839, propuseram que os seres vivos são formados por células.
          </p>
          <p className="mb-4 indent-6">
            A partir daí, houve o questionamento de como as células surgiam, e, em 1855, outro
            pesquisador alemão, <b>Rudolf Virchow</b> (1821-1902), alegou que uma célula só poderia se
            originar de outra célula preexistente.
          </p>
          <p className="mb-4 indent-6">
            Assim, a <b>teoria celular</b> ficou conhecida por três premissas:{' '}
          </p>

          <ul className="lista-caixa-bio">
            <li>Todos os seres vivos são formados por células ou estruturas derivadas delas.</li>
            <li>As células são as unidades morfofisiológicas dos seres vivos.</li>
            <li>Uma célula se origina apenas de outra célula.</li>
          </ul>

          <div className="cf-icon-modal-com-texto">
            <div className="cf-icon-modal-com-texto__icone">
              <CfIconInfoMais iconSrc={capAsset('images/cfIconInfoMais.png')}>
                <p>
                  A teoria celular estabelece que a célula é a unidade básica estrutural e
                  funcional de todos os organismos vivos. Os vírus, no entanto, não estão incluídos
                  na teoria celular, porque têm ausência de estrutura celular completa e
                  incapacidade de realizar atividades metabólicas de forma independente, pois
                  necessitam de uma célula hospedeira inclusive para sua replicação.
                </p>
              </CfIconInfoMais>
            </div>
            <p className="mb-4 indent-6">
              Com o passar do tempo e outros estudos, as premissas da teoria celular foram
              ampliadas, e originou-se a <b>teoria celular moderna</b>, a qual acrescenta que:
            </p>
          </div>

          <ul className="lista-caixa-bio">
            <li>Todos os seres vivos são formados por células ou estruturas derivadas delas.</li>
            <li>As células são as unidades morfofisiológicas dos seres vivos.</li>
            <li>Uma célula se origina apenas de outra célula.</li>
            <li>A composição química das células é bastante similar.</li>
            <li>As células têm DNA, que é responsável pela hereditariedade.</li>
            <li>
              O fluxo de energia da vida ocorre dentro das células por meio do metabolismo.
            </li>
          </ul>


          <Pagination currentPage={329} expandToBookColumn />

          <h3 className="titulo-bio">Diferentes tipos celulares</h3>

          <p className="mb-4 indent-6">As células apresentam membrana plasmática, citoplasma e material genético e podem ser classificadas como procarióticas ou eucarióticas. As células procarióticas estão presentes em representantes do Reino Monera, como bactérias, e não
            apresentam membrana nuclear delimitando o material genético, ou seja, esse material está disperso no citoplasma. As células
            eucarióticas estão presentes em protoctistas, fungos, plantas e animais. Elas apresentam membrana nuclear que delimita o
            material genético e diferentes organelas, que desempenham diversas funções na célula. Existem diferenças entre as células
            de grupos de seres vivos, como as células dos vegetais e as dos animais. Observe, a seguir, uma célula procariótica bacteriana
            e duas células eucarióticas, uma vegetal e outra animal.
          </p>

          <figure className="bio-figura bio-figura--80">
            <img
              src={capAsset('images/329_1.png')}
              alt="Representação de uma célula procariótica bacteriana"
            />
            <figcaption>
              <p className="foto-com-credito-legenda">Omerta/Shutterstock</p>
              <p className="legenda-barra">
                Representação de uma célula procariótica bacteriana.
              </p>
            </figcaption>
          </figure>

          <figure className="bio-figura bio-figura--80">
            <img
              src={capAsset('images/329_2.png')}
              alt="Representação de uma
célula eucariótica vegetal"
            />
            <figcaption>
              <p className="foto-com-credito-legenda">Bananafish/Shutterstock</p>
              <p className="legenda-barra">
                Representação de uma
                célula eucariótica vegetal.
              </p>
            </figcaption>
          </figure>

          <figure className="bio-figura bio-figura--80">
            <img
              src={capAsset('images/329_3.png')}
              alt="Representação de uma
célula eucariótica animal"
            />
            <figcaption>
              <p className="foto-com-credito-legenda">sakurra/stock.adobe.com
              </p>
              <p className="legenda-barra">
                Representação de uma
                célula eucariótica animal.
              </p>
            </figcaption>
          </figure>

          <h2 className="titulo-bio">Teoria da endossimbiose</h2>
          <p className="mb-4 indent-6">
            As duas organelas membranosas apresentadas a seguir chamam a atenção por terem DNA,
            ribossomos e capacidade de sintetizar algumas proteínas e se autoduplicar.
          </p>

          <ul className="lista">
            <li>
              <b>Mitocôndria</b>: presente em todos os eucariontes e responsável pela respiração
              celular.
            </li>
            <li>
              <b>Cloroplasto</b>: presente nas células vegetais e responsável pela fotossíntese.
            </li>
          </ul>


          <p className="mb-4 indent-6">Essas características peculiares chamaram a atenção de pesquisadores, que passaram a investigar a origem dessas
            organelas. Atualmente, a teoria mais aceita é a da <b>endossimbiose</b>, formulada pela bióloga estadunidense <b>Lynn Margulis</b> (1938-2011) em 1981.</p>



          <Pagination currentPage={330} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={<TeacherAnswers questions={perguntasLinhaChegada} />}
            />
          </div>

          <p className="mb-4 indent-6">Segundo essa teoria, organismos procariontes teriam sido englobados por células hospedeiras e passaram a viver em
            simbiose no interior delas, o que teria originado as mitocôndrias e os cloroplastos. </p>

          <figure className="bio-figura bio-figura--100">
            <img
              src={capAsset('images/330_1.png')}
              alt="Representação esquemática da teoria da endossimbiose"
            />
            <figcaption>
              <p className="foto-com-credito-legenda">SAE DIGITAL S/A
              </p>
              <p className="legenda-barra">
                Representação esquemática da teoria da endossimbiose.
              </p>
            </figcaption>
          </figure>
          <br></br>
          <PontoDePartida title="Linha de chegada" />

          <p className="mb-4 indent-6">
            Como vimos na seção <i>Ponto de Partida</i>, a missão OSIRIS-REx trouxe evidências
            concretas de que as bases essenciais para a vida, como aminoácidos, são abundantes no
            espaço e podem ter chegado à Terra por meio de asteroides como o Bennu. No entanto, para
            que a ciência chegasse a essas conclusões, foi necessário percorrer um longo caminho
            metodológico e teórico, testando hipóteses sobre como a vida surge e se organiza.
          </p>



          <QuestionRenderer
            question={getQuestionById('bio_c01_chegada_q1')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showGabarito}
          />
          <QuestionRenderer
            question={getQuestionById('bio_c01_chegada_q2')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showGabarito}
          />
          <QuestionRenderer
            question={getQuestionById('bio_c01_chegada_q3')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showGabarito}
          />


          <Pagination currentPage={331} expandToBookColumn />

          <SaberesAcao />

          <div className="saberes-acao-questoes">
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q2')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q3')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q4')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q5')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q6')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q7')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
            <QuestionRenderer
              question={getQuestionById('bio_c01_saberes_q8')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showGabarito}
            />
          </div>

          <Pagination currentPage={332} expandToBookColumn />

          <EnemVestibulares />

          <div className="enem-questoes">
            <QuestaoEnem
              nivelSrc={capAsset('images/facil_sprites.png')}
              nivelAlt="Nível fácil"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q1')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/facil_sprites.png')}
              nivelAlt="Nível fácil"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q2')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/facil_sprites.png')}
              nivelAlt="Nível fácil"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q3')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/facil_sprites.png')}
              nivelAlt="Nível fácil"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q4')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/facil_sprites.png')}
              nivelAlt="Nível fácil"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q5')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/facil_sprites.png')}
              nivelAlt="Nível fácil"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q6')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/facil_sprites.png')}
              nivelAlt="Nível fácil"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q7')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/medio_sprites.png')}
              nivelAlt="Nível médio"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q8')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/medio_sprites.png')}
              nivelAlt="Nível médio"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q9')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
          </div>

          <Pagination currentPage={333} expandToBookColumn />

          <div className="enem-questoes">
            <QuestaoEnem
              nivelSrc={capAsset('images/medio_sprites.png')}
              nivelAlt="Nível médio"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q10')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/medio_sprites.png')}
              nivelAlt="Nível médio"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q11')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/medio_sprites.png')}
              nivelAlt="Nível médio"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q12')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/medio_sprites.png')}
              nivelAlt="Nível médio"
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q13')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
          </div>

          <Pagination currentPage={334} expandToBookColumn />

          <EnemVestibulares title="Enem e vestibulares + Desafio" variant="desafio" />

          <div className="enem-questoes">
            <QuestaoEnem
              nivelSrc={capAsset('images/dificil_sprites.png')}
              nivelAlt="Nível difícil"
              videoLink={VIDEO_RESOLUCAO_DESAFIO.q14}
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q14')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/dificil_sprites.png')}
              nivelAlt="Nível difícil"
              videoLink={VIDEO_RESOLUCAO_DESAFIO.q15}
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q15')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/dificil_sprites.png')}
              nivelAlt="Nível difícil"
              videoLink={VIDEO_RESOLUCAO_DESAFIO.q16}
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q16')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
            <QuestaoEnem
              nivelSrc={capAsset('images/dificil_sprites.png')}
              nivelAlt="Nível difícil"
              videoLink={VIDEO_RESOLUCAO_DESAFIO.q17}
            >
              <QuestionRenderer
                question={getQuestionById('bio_c01_enem_q17')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showGabarito}
              />
            </QuestaoEnem>
          </div>

          <GabaritoCapitulo
            pdfUrl="https://go.sae.digital/wxIcQA"
            active={showGabarito}
            onToggle={() => setShowGabarito((v) => !v)}
            score={gabaritoScore}
          />

        </div>

        <Footer />
      </div>

      {currentPage > START_PAGE && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 z-40 p-3 transition-all hover:scale-110"
          title="Voltar ao início do capítulo"
        >
          <img src={publicUrl('images/setaTopo.svg')} alt="Voltar ao início do capítulo" />
        </button>
      )}
    </div>
  );
}

export default BookCap01;
