// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"O que é literatura: os estudos literários na escola","startPage":1,"pageCount":19,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useState } from 'react';
import { publicUrl } from '../lib/publicUrl';
import Poster from './Poster';
import Chapter from './Chapter';
import TeacherButton from './TeacherButton';
import Header from './Header';
import Pagination from './Pagination';
import CaixaTexto from './CaixaTexto';
import QuestionRenderer from './QuestionRenderer';
import Footer from './Footer';
import { useUserAnswers } from '../hooks/useUserAnswers';
import { usePagination } from '../hooks/usePagination';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { TeacherAnswers } from './TeacherAnswers';
import ConversaVai from './ConversaVai';
import EscolaDigital from './EscolaDigital';
import { Question } from '../types/questions';

const SHOW_TEACHER_BUTTON = true;

const textQuestion = (id: string, question: string, correctAnswer?: string, options?: any): Question => ({
  id,
  type: 'text-input',
  question,
  placeholder: 'Digite aqui...',
  correctAnswer: correctAnswer || '',
  ...options
});

const mcQuestion = (id: string, question: string, options: string[], correctAnswer: string): Question => ({
  id,
  type: 'multiple-choice',
  question,
  options,
  correctAnswer
});

const localQuestions: Question[] = [
  textQuestion('c01_q1', 'Qual é a clássica frase com que Wendy inicia a contação da história? Que tipo de histórias começam a ser contadas assim?'),
  textQuestion('c01_q2', 'Qual acontecimento na história contada por Wendy indica que se trata de uma narração de fantasia? Por quê?'),
  textQuestion('c01_q3', 'Por quais sentimentos as crianças são acometidas ao ouvirem a história?'),
  textQuestion('c01_q4', 'No texto, as crianças ouvem a sua história favorita contada por Wendy. Comente qual é a sua história favorita e o que motiva essa escolha.'),
  textQuestion('c01_q5', 'Como você escolhe os livros que deseja ler? Quais elementos influenciam sua escolha?'),
  textQuestion('c01_q6', 'Tanto Virginia Woolf quanto Elena Ferrante se utilizam de metáforas para falar da literatura e da leitura: “regar uma roseira”, “partitura composta pelo narrador”, “jaula anômala”. Por que essa figura de linguagem é tão importante quando se faz esse tipo de reflexão?'),
  textQuestion('c01_q7', 'No início do segundo parágrafo, que tipo de alerta Virginia Woolf nos faz em relação à nossa liberdade como leitores?'),
  textQuestion('c01_q8', 'Virginia Woolf utiliza a expressão “ponto certo” para denominar a liberdade absoluta de escolha literária. No entanto, há uma contradição nessa ideia, confirmada pelo uso das aspas, já que a liberdade completa é utópica. O que, portanto, seria o “ponto certo” na visão da escritora?'),
  textQuestion('c01_q9', 'E, para você, qual é o “ponto certo” da escolha literária?'),
  textQuestion('c01_q10', 'Como a leitura é entendida no texto?'),
  textQuestion('c01_q11', 'Há uma possível ambiguidade no título do poema. Comente-a.'),
  textQuestion('c01_q12', 'Quais características do texto podem ser atribuídas à função poética?'),
  mcQuestion('c01_q13', 'A poesia é marcada pela recriação do objeto por meio da linguagem, sem necessariamente explicá-lo. Nesse fragmento de João Cabral de Melo Neto, poeta da geração de 1945, o sujeito lírico propõe a recriação poética de', [
    'a) uma palavra, a partir de imagens com as quais ela pode ser comparada, a fim de assumir novos significados.',
    'b) um urinol, em referência às artes visuais ligadas às vanguardas do início do século XX.',
    'c) uma ave, que compõe, com seus movimentos, uma imagem historicamente ligada à palavra poética.',
    'd) uma máquina, levando em consideração a relevância do discurso técnico-científico pós-Revolução Industrial.',
    'e) um tecido, visto que sua composição depende de elementos intrínsecos ao eu lírico.'
  ], 'a) uma palavra, a partir de imagens com as quais ela pode ser comparada, a fim de assumir novos significados.'),
  mcQuestion('c01_q14', 'A comparação escolhida por João Cabral de Melo Neto para caracterizar o ato de escrever', [
    'a) recupera para a literatura as concepções de poesia que orientavam a literatura de folhetos do Nordeste, ou “cordel”.',
    'b) inverte certa concepção erudita da poesia, que a vê como atividade elevada, sublime, separada do cotidiano banal.',
    'c) inscreve a poética do autor no regionalismo literário, por vincular a representação literária a práticas locais bem determinadas.',
    'd) reata com a tradição parnasiana, que concebia a arte poética como ofício de artesão ou artífice.',
    'e) contrapõe-se ao elitismo do Modernismo paulista, que repudiava o primitivismo e as culturas rústicas.'
  ], 'd) reata com a tradição parnasiana, que concebia a arte poética como ofício de artesão ou artífice.'),
  mcQuestion('c01_q15', 'No texto de Leminski, a linguagem produz efeitos sonoros e jogos de imagens. Esses jogos caracterizam a função poética da linguagem, pois', [
    'a) objetivam convencer o leitor a praticar uma determinada ação.',
    'b) transmitem informações, visando levar o leitor a adotar um determinado comportamento.',
    'c) visam provocar ruídos para chamar a atenção do leitor.',
    'd) apresentam uma discussão sobre a própria linguagem, explicando o sentido das palavras.',
    'e) representam um uso artístico da linguagem, com o objetivo de provocar prazer estético no leitor.'
  ], 'e) representam um uso artístico da linguagem, com o objetivo de provocar prazer estético no leitor.'),
  mcQuestion('c01_q16', 'O texto traz em relevo as funções metalinguística e poética. Seu caráter metalinguístico justifica-se pela', [
    'a) discussão da dificuldade de se fazer arte inovadora no mundo contemporâneo.',
    'b) defesa do movimento artístico da pós-modernidade, típico do século XX.',
    'c) abordagem de temas do cotidiano, em que a arte se volta para assuntos rotineiros.',
    'd) tematização do fazer artístico, pela discussão do ato de construção da própria obra.',
    'e) valorização do efeito de estranhamento causado no público, o que faz a obra ser reconhecida.'
  ], 'd) tematização do fazer artístico, pela discussão do ato de construção da própria obra.'),
  mcQuestion('c01_q17', 'A linguagem do fragmento anterior foi empregada pelo autor com o objetivo principal de', [
    'a) transmitir informações, fazer referência a acontecimentos observados no mundo exterior.',
    'b) envolver, persuadir o interlocutor, nesse caso, o leitor, em um forte apelo à sua sensibilidade.',
    'c) realçar os sentimentos do eu lírico, suas sensações, reflexões e opiniões frente ao mundo real.',
    'd) destacar o processo de construção de seu poema, ao falar sobre o papel da própria linguagem e do poeta.',
    'e) manter eficiente o contato comunicativo entre o emissor da mensagem, de um lado, e o receptor, de outro.'
  ], 'd) destacar o processo de construção de seu poema, ao falar sobre o papel da própria linguagem e do poeta.'),
  textQuestion('c01_q18', 'a) De acordo com o narrador, o leitor é um ser ativo ou passivo na recepção de um romance? Cite um trecho que justifique sua resposta.'),
  textQuestion('c01_q19', 'b) De acordo com o narrador, que imagem o leitor fizera de Calisto Elói, positiva ou negativa? Cite um trecho que justifique sua resposta.'),
  mcQuestion('c01_q20', 'Traduz uma ideia presente no texto a seguinte afirmação:', [
    'a) o efeito de um livro sobre o leitor é condicionado pela quantidade de informações que o texto veicula.',
    'b) a recepção de um livro pode ser influenciada pela situação vivida pelo leitor.',
    'c) a verdadeira erudição não dispensa a leitura dos bons manuais escolares.',
    'd) a leitura de um livro a qual tem finalidades meramente práticas prejudica a assimilação do conhecimento.',
    'e) o reconhecimento do valor de um livro depende, primordialmente, dos sentimentos pessoais do leitor.'
  ], 'b) a recepção de um livro pode ser influenciada pela situação vivida pelo leitor.'),
  mcQuestion('c01_q21', 'Os versos anteriores articulam as linguagens literária e científica com questões de ordem ética e política. Considerando o contexto de produção e recepção de “Lágrima de preta” (anos 1960 e 1970, em Portugal), o propósito artístico desse poema é', [
    'a) inadequado quanto à análise social, ao refutar que haja racismo e preconceito na sociedade, e incorreto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.',
    'b) inadequado quanto à análise social, ao refutar a existência de racismo e preconceito na sociedade, mas correto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.',
    'c) pertinente quanto à análise social, ao registrar o racismo e o preconceito na sociedade, e correto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.',
    'd) pertinente quanto à análise social, ao registrar o preconceito e o racismo na sociedade, mas incorreto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.'
  ], 'c) pertinente quanto à análise social, ao registrar o racismo e o preconceito na sociedade, e correto no aspecto científico, ao descrever as propriedades químicas de uma lágrima.'),
  mcQuestion('c01_q22', 'Assinale o excerto que confirma os dois textos anteriores.', [
    'a) A leitura é, fundamentalmente, processo político. Aqueles que formam leitores – professores, bibliotecários – desempenham um papel político.',
    'b) Pelo que sabemos, quando há um esforço real de igualitarização, há aumento sensível do hábito de leitura, e, portanto, difusão crescente das obras.',
    'c) Ler é abrir janelas, construir pontes que ligam o que somos com o que tantos outros imaginaram, pensaram, escreveram; ler é fazer-nos expandidos.',
    'd) A leitura é uma forma servil de sonhar. Se tenho de sonhar, por que não sonhar os meus próprios sonhos?'
  ], 'c) Ler é abrir janelas, construir pontes que ligam o que somos com o que tantos outros imaginaram, pensaram, escreveram; ler é fazer-nos expandidos.'),
  mcQuestion('c01_q23', 'De acordo com o texto, respectivamente à produção e à recepção de um programa de tevê ocorrem', [
    'a) seleção e livre arbítrio.',
    'b) intervenção e integridade.',
    'c) arbitrariedade e parcialidade.',
    'd) tendenciosidade e lazer com discernimento.',
    'e) imposição e tendenciosidade.'
  ], 'e) imposição e tendenciosidade.')
];

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination(1);
  const [showTeacherView] = useState(false);

  const getQuestionById = (questionId: string) => 
    localQuestions.find((question) => question.id === questionId)!;

  useScrollPosition();

  return (
    <div className="min-h-screen w-full bg-gray-200">
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Header chapterNumber={1} chapterTitle="O que é literatura: os estudos literários na escola" />
        
        <Pagination currentPage={1} />
        
        <Poster 
          imageSrc="images/page_1_img_461_694.png" 
          alt="Abertura do capítulo 1" 
          creditLine1="Imagem de abertura" 
        />

        <div className="p-8 md:p-12">
          <EscolaDigital 
            thumbnailSrc="images/thumb_c01.jpg" 
            videoSrc="images/SAE26_AI43_HIS_C01_VA1.mp4" 
          />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                  Incentive os alunos a refletirem sobre o conceito de literatura e a importância da leitura no cotidiano.
                </p>
              }
            />
          </div>

          <Chapter
            title=""
            content={
              <>
                <Pagination currentPage={2} expandToBookColumn />
                
                <h3 className="text-2xl font-bold text-[#80298F] mb-4">Objetivos de Aprendizagem</h3>
                <ul className="list-disc marker:text-[#80298F] ml-6 mb-6">
                  <li>Refletir sobre o conceito de literatura e de escrita literária.</li>
                  <li>Analisar as relações entre sociedade e literatura.</li>
                  <li>Compreender algumas categorias de análise literária.</li>
                  <li>Analisar as relações entre ficção e verdade.</li>
                  <li>Discutir por que estudar literatura.</li>
                </ul>

                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_2_img_-1_335.png')} alt="Ilustração de Peter Pan" className="w-full max-w-[520px] rounded-[24px]" />
                </div>

                <p className="mb-4 indent-6">
                  Você lembra qual foi o último livro que leu? Essa história ainda está fresca em sua memória? Mesmo que você não tenha lido nenhum livro recentemente, é provável que tenha assistido a algum filme ou escutado alguma história contada por um de seus amigos ou professores, não é mesmo? Ou, ainda, ter lido a letra de uma canção que adora. Também é provável que alguém tenha falado um provérbio ou você tenha lido uma crônica em um <b><i>blog</i></b> encontrado aleatoriamente.
                </p>
                <p className="mb-4 indent-6">
                  O que todas essas situações têm em comum? Todas possuem características de manifestações artísticas. O ato de contar histórias data de milhares de anos, e, desde a Pré-História e o desenvolvimento do ser humano, já havia necessidade de registrar essas histórias, como pode ser visto na arte rupestre.
                </p>
                <p className="mb-4 indent-6">
                  Isso resulta na constatação de que o ser humano vive em processo de constante encantamento com a contação de histórias, talvez por isso exista tanto fascínio em torno da literatura. Pensando nesse questionamento, leia um trecho de <b><i>Peter Pan</i></b>, de James Barrie, uma história do começo do século XX que permanece na memória coletiva até os tempos atuais.
                </p>

                <h3 className="text-xl font-bold mb-4">A história de Wendy</h3>
                <p className="mb-2">― ENTÃO, ESCUTEM ― disse Wendy se preparando para contar sua história, com Miguel sentado no chão ao lado do banquinho dela e sete meninos deitados na cama. ― Era uma vez um homem…</p>
                <p className="mb-2">― Eu preferia que fosse uma moça ― disse Caracol.</p>
                <p className="mb-2">― Eu preferia que fosse um ratinho branco ― disse Bico.</p>
                <p className="mb-2">― Quietos ― ralhou a mãe deles. ― Havia uma moça também, e…</p>
                <p className="mb-2">― Ah, mamãe! ― exclamou o primeiro Gêmeo. ― Você quer dizer que ainda há uma moça também, não quer? Ela não morreu, morreu?</p>
                <p className="mb-2">― Ah, não.</p>
                <p className="mb-2">― Eu fico muito feliz por ela estar viva. Você está feliz, João?</p>
                <p className="mb-2">― Claro que sim.</p>
                <p className="mb-2">― E você, Bico?</p>
                <p className="mb-2">― Muito.</p>
                <p className="mb-2">― E vocês estão felizes, Gêmeos?</p>
                <p className="mb-2">― Pra caramba.</p>
                <p className="mb-2">― Minha nossa ― suspirou Wendy.</p>
                <p className="mb-2">― Menos barulho ― disse Peter, exigindo que Wendy tivesse uma chance justa de falar, embora achasse aquela história pavorosa.</p>
                <p className="mb-2">― O nome do homem ― continuou Wendy ― era sr. Darling, e o nome da moça era sra. Darling.</p>
                <p className="mb-2">― Eu conheço os dois ― disse João, para irritar os outros.</p>
                <p className="mb-2">― Eu acho que conheço também ― disse Miguel, sem muita certeza.</p>
                <p className="mb-2">― Eles eram casados, sabia? ― explicou Wendy. ― E o que vocês acham que eles tiveram?</p>

                <Pagination currentPage={3} expandToBookColumn />

                <p className="mb-2">― Ratinhos brancos! ― exclamou Bico, inspirado.</p>
                <p className="mb-2">― Não.</p>
                <p className="mb-2">― Eu não tenho ideia ― disse Firula, que conhecia a história toda.</p>
                <p className="mb-2">― Quieto, Firula. Eles tiveram três descendentes.</p>
                <p className="mb-2">― O que são descendentes?</p>
                <p className="mb-2">― Bom, você é um descendente, Gêmeo.</p>
                <p className="mb-2">― Você ouviu, João? Eu sou um descendente.</p>
                <p className="mb-2">― Descendentes são só crianças ― disse João.</p>
                <p className="mb-2">― Minha nossa, minha nossa ― suspirou Wendy. ― Bom, essas três crianças tinham uma fiel babá chamada Naná. Mas o sr. Darling estava com raiva dela e a acorrentou no quintal. Por isso, todas as crianças saíram voando.</p>
                <p className="mb-2">― Que história boa! ― disse Bico.</p>
                <p className="mb-2">― Elas saíram voando ― continuou Wendy ―, até a Terra do Nunca, para onde vão as crianças perdidas.</p>
                <p className="mb-2">― Era o que eu achava mesmo! ― interrompeu Caracol, excitado. ― Não sei como, mas era o que eu achava mesmo!</p>
                <p className="mb-2">― Ei, Wendy! ― exclamou Firula. ― Uma das crianças perdidas chamava Firula?</p>
                <p className="mb-2">― Chamava, sim.</p>
                <p className="mb-2">― Eu estou na história! Oba, eu estou na história, Bico!</p>
                <p className="mb-2">― Silêncio. Agora eu quero que vocês pensem no que os pobres pais sentiram ao descobrir que todos os seus filhos haviam saído voando.</p>
                <p className="mb-2">― Ai! ― gemeram todos, embora eles não estivessem nem ligando para o que os pobres pais sentiram.</p>
                <p className="mb-2">― Pensem nas camas vazias!</p>
                <p className="mb-2">― Ai!</p>
                <p className="mb-2">― É muito triste ― disse o primeiro Gêmeo alegremente.</p>
                <p className="mb-2">― Eu não vejo como isso pode ter um final feliz ― disse o segundo Gêmeo. ― Você vê, Bico?</p>
                <p className="mb-2">― Eu estou muito nervoso.</p>
                <p className="mb-2">― Se vocês soubessem como é grande o amor de uma mãe ― disse Wendy num tom triunfal ―, não sentiriam medo.</p>
                <p className="mb-2">Ela agora chegara à parte da história que Peter detestava.</p>
                <p className="mb-2">― Eu gosto de amor de mãe ― disse Firula, batendo com um travesseiro em Bico. ― Você gosta de amor de mãe, Bico?</p>
                <p className="mb-2">― Adoro ― disse Bico, devolvendo o golpe.</p>
                <p className="mb-2">― E vocês sabem o que aconteceu? ― disse Wendy com complacência. ― Nossa heroína sabia que a mãe sempre deixaria a janela aberta para seus filhos poderem entrar. Por isso, eles passaram anos longe de casa, se divertindo muito.</p>
                <p className="mb-2">― E eles voltaram algum dia?</p>
                <p className="mb-2">― Agora ― disse Wendy, se preparando para o ponto alto da história ―, vamos dar uma olhada no futuro.</p>
                <p className="mb-2">Todos eles deram aquela retorcida que torna mais fácil dar uma olhada no futuro.</p>
                <p className="mb-2">― Os anos se passaram ― continuou Wendy. ― E quem é essa elegante dama de idade indefinida surgindo na Estação de Londres?</p>
                <p className="mb-2">― Ah, Wendy, quem é? ― exclamou Bico muito agitado, como se não soubesse.</p>
                <p className="mb-2">― Será que é? É… Não é… É! É a bela Wendy!</p>
                <p className="mb-2">― Oh!</p>
                <p className="mb-2">― E quem são os dois cavalheiros aristocráticos e imponentes acompanhando-a, já tão crescidos? Será que são João e Miguel? São!</p>
                <p className="mb-2">― Oh!</p>
                <p className="mb-2">― “Estão vendo, queridos irmãos?”, disse Wendy, apontando para cima. “Lá está a janela, ainda aberta. Ah, agora nós seremos recompensados por nossa sublime fé no amor de mãe.” E eles voaram para sua mamãe e seu papai. E, como será impossível descrever a felicidade da cena que se seguiu, nós vamos parar por aqui.</p>
                
                <p className="text-sm text-gray-600 mt-4 text-right">BARRIE, J. M. <b><i>Peter Pan</i></b>: edição bolso de luxo. Tradução de Julia Romeu. Rio de Janeiro: Clássicos Zahar, 2014. p. 158-162.</p>

                <ConversaVai />
                
                <QuestionRenderer question={getQuestionById('c01_q1')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q2')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q3')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q4')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q5')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />

                <Pagination currentPage={4} expandToBookColumn />

                <CaixaTexto title="Entrelinha">
                  <p className="mb-4 indent-6">
                    Você já tinha lido o trecho de <i>Peter Pan</i> citado na abertura? Mesmo sendo um romance publicado pela primeira vez em 1911, provavelmente você já ouviu falar dessas personagens ou já assistiu a alguma adaptação da obra. Isso acontece porque o livro se tornou um clássico, isto é, uma obra que pertence a uma tradição literária e que tende a ser inspiração para outras obras.
                  </p>
                  <p className="mb-4 indent-6">
                    Era o começo do século XX quando o autor James Barrie encantou públicos de todas as idades com a história do menino que não queria crescer. Desde então, Peter Pan vive no imaginário popular e já inspirou diversas adaptações para o cinema, o teatro e a música, além de continuar a ser publicado. Clássicos como esse estão em todos os lugares, e suas inúmeras edições permeiam as mais diferentes bibliotecas.
                  </p>
                  <p className="mb-4 indent-6">
                    Aliás, você lembra qual foi a última vez que visitou uma biblioteca? O ambiente costuma ser organizado, com iluminação adequada e tende a ser um lugar reconfortante e acolhedor. Se você já visitou uma grande biblioteca, provavelmente se sentiu impressionado e perdido com a magnitude do acervo. Com tantas opções, qual escolher? Correr os dedos pelas lombadas e simplesmente puxar um dos volumes? Será que iremos gostar da obra escolhida? Se você não conhecesse a história do Peter Pan, gostaria de ler o livro e descobrir as aventuras dos meninos perdidos, sem nenhum <i>spoiler</i>?
                  </p>
                  <p className="mb-4 indent-6">
                    Quando não sabemos muitas informações sobre um livro, a tarefa de decidir o que ler pode ser um pouco mais difícil. Por outro lado, se entendemos a forma como os livros estão organizados nas bibliotecas (o que há em cada pavimento, seção e estante), as coisas podem ficar mais simples e até prazerosas; sabemos aonde queremos ir, onde encontrar aquilo que estamos procurando e quais relações estabelecer entre obras, autores e épocas. Da mesma forma, quando conhecemos gêneros literários e compreendemos a importância da literatura para a sociedade, pensamos em temas e estilos de obras literárias e somos capazes de analisar a composição, o que possibilita interpretações mais complexas dos textos que nos são apresentados. Isto é, quanto mais bem formado for o nosso repertório de leitura, mais livre será o nosso contato com a literatura.
                  </p>
                  <p className="mb-4 indent-6">
                    Além da literatura, é importante compreender que as manifestações artísticas são múltiplas – pintura, escultura, arquitetura, dança, música, fotografia etc. – e, entre elas, há pontos comuns e pontos distintos. Os principais elementos de distinção são a matéria-prima com que cada artista trabalha e o modo como ele se expressa. Em outras palavras, é diferente a linguagem de cada manifestação artística e de cada artista em particular.
                  </p>
                  <p className="mb-4 indent-6">
                    A arte literária trabalha com uma matéria-prima específica: a <b>palavra</b>. Entretanto, é necessário atentar que não basta fazer uso da palavra para produzir literatura. Só se produz um texto literário quando a intenção do escritor vai além da mera informação ou de uma proposta de reflexão sobre a condição humana. Por exemplo, na história do romance apresentado na abertura, o menino Peter Pan mora em uma ilha fictícia chamada Terra do Nunca. Você já pensou por que o lugar tem esse nome? Além disso, as crianças que também habitam a ilha são chamadas de “meninos perdidos”, mas por quê? Perceba que o texto literário tem uma intencionalidade voltada para a elaboração própria de uma mensagem, selecionando e combinando as palavras de uma forma muito especial. É pensando nessas considerações que iniciaremos os nossos estudos literários neste capítulo.
                  </p>
                  <p className="mb-4 indent-6 font-bold text-center">
                    Você está pronto para descobrir qual é a sua própria Terra do Nunca?
                  </p>
                </CaixaTexto>

                <Pagination currentPage={5} expandToBookColumn />

                <p className="mb-4 indent-6">
                  Ao ler o trecho de <b><i>Peter Pan</i></b> na abertura, você chegou a se imaginar lendo um livro para um grupo de pessoas? Será que é o mesmo que ler sozinho? Além disso, é possível que você tenha refletido um pouco sobre a escolha do livro que deseja ler. Mas, afinal, como se lê um livro? A escritora inglesa Virginia Woolf escreveu sobre o assunto em um ensaio. A seguir, leia os dois primeiros parágrafos desse texto escrito em 1925.
                </p>

                <h3 className="text-xl font-bold mb-4 text-center">Como ler um livro?</h3>
                <p className="mb-4 indent-6">
                  Em primeiro lugar, quero ressaltar o ponto de interrogação no final do título. Mesmo que eu soubesse responder à pergunta, a resposta se aplicaria apenas a mim e não a você. Na verdade, o único conselho sobre leitura que alguém pode dar a outra pessoa é não aceitar conselhos, seguir seus instintos, usar sua razão, chegar a suas próprias conclusões. Estando nós de acordo nisso, sinto-me à vontade para expor algumas ideias e sugestões, pois você não permitirá que lhe tolham aquela independência que é a qualidade mais importante que um leitor pode ter. Afinal, quais as leis que se pode prescrever para os livros? A batalha de Waterloo foi, sem dúvida, travada em determinado dia; mas <b><i>Hamlet</i></b> é uma peça melhor do que <b><i>Rei Lear</i></b>? Ninguém sabe dizer. Cada qual precisa decidir por si só. Admitir a entrada de autoridades, por mais paramentadas que estejam, em nossas bibliotecas e deixar que nos ditem o que ler, como ler, que valor dar ao que lemos é destruir o espírito de liberdade que é o próprio alento desses santuários. Em qualquer outro lugar, leis e convenções podem nos tolher – lá, não há nenhuma.
                </p>
                <p className="mb-4 indent-6">
                  Mas para usufruir a liberdade, se me perdoarem o chavão, é evidente que precisamos nos controlar. Não vamos desperdiçar nossas energias de forma inepta e irremediável, esguichando água em metade da casa para regar uma simples roseira; precisamos concentrá-las no ponto certo, com ímpeto e precisão. Esta pode ser uma das primeiras dificuldades com que nos deparamos numa biblioteca. Qual é o “ponto certo”? Aquilo pode parecer um mero aglomerado e uma enorme desordem. Poemas e romances, histórias e memórias, dicionários e relatórios estatísticos; livros escritos em todas as línguas por homens e mulheres de todas as índoles, raças e idades se comprimem na prateleira. E lá fora o burrico zurra, as mulheres conversam junto ao poço, os potros galopam pelos campos. Por onde começamos? Como traremos ordem a esse múltiplo caos para obter do que lemos o prazer mais amplo e profundo?
                </p>
                <p className="text-sm text-gray-600 mt-4 text-right">
                  WOOLF, Virginia. <b><i>A arte do romance</i></b>. Tradução de Denise Bottmann. Porto Alegre: L&PM, 2018. p. 67.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg my-6">
                  <p className="text-sm">
                    <b>Batalha de Waterloo:</b> confronto militar ocorrido próximo a Waterloo, na Bélgica, em 18 de junho de 1815, que marcou a derrota de Napoleão Bonaparte.
                  </p>
                </div>

                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_5_img_442_68.png')} alt="Virginia Woolf" className="w-full max-w-[320px] rounded-[24px]" />
                  <p className="text-[10px] text-slate-600 mt-2">George C. Beresford/Hulton Archive</p>
                </div>

                <p className="mb-4 indent-6 text-sm">
                  Virginia Woolf nasceu em Londres, no ano de 1882. Desde cedo esteve ligada ao mundo das letras, desempenhando uma importante atividade na literatura não somente como escritora de obras ficcionais, de ensaios e de crítica literária, mas também como fundadora da editora Hogarth Press. Em sua trajetória intelectual, destacou-se pela defesa de causas em favor da emancipação e da liberdade feminina, notadamente na política e nas letras. Em sua extensa obra, estão os romances <i>Mrs. Dalloway </i>(1925) e <i>Orlando</i> (1928), além de ter publicado contos e textos autobiográficos. Seu livro de ensaios de maior destaque é <i>Um teto todo seu</i> (1929). A autora faleceu em 1941, aos 59 anos de idade.
                </p>

                <Pagination currentPage={6} expandToBookColumn />

                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_6_img_67_303.png')} alt="Ilustração de leitura" className="w-full max-w-[400px] rounded-[24px]" />
                </div>

                <p className="mb-4 indent-6">
                  Depois de ler o texto de Virginia Woolf, você consegue responder à pergunta do título? Esse questionamento pode ser um bom começo para discutir o processo de leitura, uma vez que aquilo que fazemos, como fazemos e por que fazemos são aspectos fundamentais de todo o processo de aprendizagem. No texto, a escritora fala sobre a importância de os leitores seguirem seus instintos no contato que estabelecem com os livros, assim como de não aceitarem a intromissão de autoridades em sua relação com o mundo literário.
                </p>
                <p className="mb-4 indent-6">
                  Os dois parágrafos do texto de Virginia Woolf apresentam ideias distintas e complementares. No primeiro, a autora defende a liberdade, a independência e as particularidades de toda pessoa que lê – e deixa a entender que há um acordo sobre isso, também defendido por seus leitores, o que torna a conversa franca. Na sequência, coloca em evidência que cada obra literária tem o seu valor, cada uma condensa um universo de possibilidades. Essa situação fica expressa na dúvida sobre qual seria a melhor peça de teatro, <b><i>Hamlet </i></b>ou<b><i> Rei Lear</i></b>, ambas de William Shakespeare.
                </p>
                <p className="mb-4 indent-6">
                  Diante disso, não há resposta para essa pergunta, pois os textos repercutem em cada pessoa de maneira diferente. Ou seja, quando se fala de literatura, há uma incontornável dimensão de subjetividade envolvida na discussão, tanto a subjetividade de quem escreve quanto a de quem escolhe e lê. A italiana Elena Ferrante, autora de livros de sucesso traduzidos para várias línguas, fez um comentário que evidencia essa relação de subjetividade:
                </p>

                <blockquote className="border-l-4 border-[#80298F] pl-4 my-6 italic text-gray-700">
                  Quando contamos uma história, são importantes as ações e reações dos personagens, os espaços nos quais eles se movem, o modo como o tempo passa por ele. O narrador compõe uma partitura, os leitores a executam interpretando-a. Uma história é uma jaula anômala: nos aprisiona em suas estratégias, porém, contraditoriamente, faz com que nos sintamos livres.
                </blockquote>
                <p className="text-sm text-gray-600 mt-4 text-right">
                  FERRANTE, Elena. <b><i>Frantumaglia</i></b>: os caminhos de uma escritora. Tradução de Marcello Lino. Rio de Janeiro: Intrínseca, 2017. p. 309.
                </p>

                <p className="mb-4 indent-6">
                  Tanto as palavras de Virginia Woolf quanto as de Elena Ferrante revelam dois aspectos fundamentais da literatura: primeiro, as obras ficcionais só se completam com as leituras, com o significado que os leitores atribuem ao texto; segundo, apesar de ser um terreno de liberdade, a literatura também tem limitações, uma “jaula anômala”, seja pela grandiosidade do repertório de obras disponíveis, seja pelas estratégias adotadas por quem escreve.
                </p>
                <p className="mb-4 indent-6">
                  A literatura, portanto, é um território de contradições. Sendo assim, com base nessa conversa inicial, responda a algumas questões a seguir sobre os textos lidos.
                </p>

                <QuestionRenderer question={getQuestionById('c01_q6')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q7')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q8')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q9')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />

                <Pagination currentPage={7} expandToBookColumn />

                <h3 className="text-2xl font-bold text-[#80298F] mb-4">A arte literária</h3>
                <p className="mb-4 indent-6">
                  Depois de ler o texto da Virginia Woolf, você acha que é possível encontrar o “ponto certo” da leitura? Para a autora, uma possibilidade de caminho é a compreensão das referências e das características de composição de uma obra. Sendo assim, vamos estudar literatura?
                </p>
                <p className="mb-4 indent-6">
                  Como já vimos, a literatura é uma manifestação artística que se caracteriza por ter a palavra como matéria-prima. Os clássicos, indo um pouco além, afirmavam que “a arte literária é a realização do belo literário”, ou seja, trabalhando a palavra, o artista literário busca uma expressão formal – o ritmo, o estilo, a forma, as figuras de linguagem – que proporcione prazer estético, o qual seria atingido quando um texto está escrito de tal forma que proporciona prazer ou satisfação ao leitor, uma vez que o conjunto de arranjos linguísticos feitos pelo autor seria dotado de certa beleza.
                </p>
                <p className="mb-4 indent-6">
                  Porém, é importante salientar que não basta fazer uso da palavra para produzir literatura, já que uma obra literária não se eterniza pelo aspecto formal se não existir sustentação, também, no conteúdo. Afinal, ler um texto é também ter a percepção da leitura de mundo de outra pessoa. No caso do texto literário, essa leitura de mundo (que questiona, contesta, reorganiza, recria, reinventa a realidade) é acompanhada por um cuidadoso trabalho com a linguagem verbal.
                </p>
                <p className="mb-4 indent-6">
                  Outro ponto importante é perceber que, apesar de ter a realidade como ponto de partida – relação de semelhança denominada <b>verossimilhança </b>–, a obra literária <b>ficcional</b> não se confunde com essa realidade, isto é, os textos se apresentam como uma recriação dessa realidade. Por exemplo, no romance <i>Peter Pan</i>, há a representação de dois mundos como cenários para o desenvolvimento da história. Um deles é a Terra do Nunca; o outro, a cidade de Londres, na Inglaterra. Sabemos que os cenários londrinos e a cultura dessa sociedade estão representados no texto e também sabemos que a terra fantástica não existe no mundo real; entretanto, ela é definida de modo a representar algumas características da sociedade inglesa daquele período, o que torna essa história verossímil, ainda que seja um universo cheio de elementos fantásticos.
                </p>
                <p className="mb-4 indent-6">
                  Dessa forma, apenas para iniciar nosso estudo sobre a literatura, já podemos constatar alguns fatos:
                </p>
                <ul className="list-disc marker:text-[#80298F] ml-6 mb-6">
                  <li>a literatura é uma manifestação artística;</li>
                  <li>a palavra é o material da literatura, isto é, o artista literário explora a palavra em sua totalidade (significado, som, desenho);</li>
                  <li>a obra literária é ficcional e inventa ou recria a realidade;</li>
                  <li>nas obras literárias há uma postura do artista diante da realidade e, em alguns casos, das aspirações humanas.</li>
                </ul>

                <h3 className="text-xl font-bold mb-4">A função poética da linguagem</h3>
                <p className="mb-4 indent-6">
                  Para que um texto como <i>Peter Pan</i> fosse escrito e todo o cenário ficcional criado, é provável que o autor tenha pensado em cada palavra para formar as frases que iriam compor o romance. Quando a intenção do produtor do texto está voltada para a própria mensagem, para uma especial arrumação das palavras, quer na escolha, quer na combinação delas, quer na organização sintática da frase, temos a <b>função poética da linguagem</b>.
                </p>

                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_7_img_190_520.png')} alt="Ilustração renascentista" className="w-full max-w-[400px] rounded-[24px]" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Os clássicos foram os artistas que pertenceram ao período renascentista, durante os séculos XIV e XV, na Itália. O movimento pregava a retomada dos valores da Antiguidade Clássica e, além de reformular as artes e a vida medieval, marcou o início da Idade Moderna na Europa.
                </p>

                <Pagination currentPage={8} expandToBookColumn />

                <p className="mb-4 indent-6">
                  Ao selecionar e combinar as palavras de maneira particular e especial, o produtor da mensagem procura alguns elementos fundamentais: ritmos, sonoridades, o inusitado das imagens criadas com base no texto, valores conotativos, figuras de palavras; ou seja, uma das preocupações do autor é com o seu formato ou sua estrutura, buscando uma representação criativa e inusitada da mensagem. Vale lembrar que, em um texto literário, é possível perceber outras funções da linguagem, da mesma forma que a função poética não é exclusiva da literatura. O emprego da função poética também é comum em anúncios publicitários, em <i>slogans</i>, em ditados e provérbios, e até em certas construções de nossa linguagem cotidiana. A distinção é que, no caso do texto literário, a função poética costuma ser a função dominante.
                </p>

                <h3 className="text-xl font-bold mb-4">O mundo ficcional</h3>
                <p className="mb-4 indent-6">
                  Depois de entender que a palavra é a base da literatura como manifestação artística, podemos ver que outra característica do texto literário é a ficção. A propriedade ficcional da arte permeia diversos universos, seja aquela saga de livros que você demorou para completar, seja aquela sequência de filmes de heróis cuja continuação você espera há meses. Todo esse universo inventivo que permeia a literatura, por meio da escrita do autor ou da interpretação do leitor, está relacionado com a ficção.
                </p>
                <p className="mb-4 indent-6">
                  No livro <i>A arte da ficção</i>, o escritor e crítico literário britânico David Lodge discute diversos aspectos formais e temáticos que compõem esse universo, elaborados com base em uma coluna de jornal, partindo de exemplos concretos para mostrar breves análises literárias. Leia a seguir um trecho de como o escritor define a ficção.
                </p>

                <blockquote className="border-l-4 border-[#80298F] pl-4 my-6 italic text-gray-700">
                  Eu sempre entendi a ficção como uma arte essencialmente retórica – em outras palavras, o romancista ou o contista nos <b><i>convence</i></b> a partilhar uma determinada visão de mundo pela duração da nossa leitura e assim opera, se tudo der certo, a deliciosa imersão em uma realidade imaginada que Van Gogh retratou com tanta maestria em sua pintura <b><i>A leitora de romances</i></b>.
                </blockquote>
                <p className="text-sm text-gray-600 mt-4 text-right">
                  LODGE, David. <b><i>A arte da ficção</i></b>. Tradução de Guilherme da Silva Braga. Porto Alegre: L&PM, 2010.
                </p>

                <p className="mb-4 indent-6">
                  As colocações de David Lodge revelam o caráter propositivo e discursivo das obras ficcionais, já que os textos precisam de um discurso que se sustente. As considerações do ensaísta também mostram como os textos de ficção (o autor só fala de exemplos em prosa, mas poderia falar em poesia e drama) têm certo poder de encantamento, isto é, como a palavra escrita é capaz de realizar, no momento em que transcorre a leitura, uma imersão em um mundo imaginário. Assim, uma obra literária pode estar, simultaneamente, na realidade e fora dela. Isso acontece porque o texto literário é uma representação do mundo real, sem, no entanto, ser real.
                </p>

                <Pagination currentPage={9} expandToBookColumn />

                <p className="mb-4 indent-6">
                  Outro especialista no assunto, o escritor italiano Umberto Eco, conhecido por seus trabalhos acadêmicos, começou a publicar obras ficcionais – as quais tratava como “escrita criativa” – mais tarde, quando já tinha quase cinquenta anos. Como linguista e filósofo, ao iniciar na nova modalidade de escrita, via-se permeado de dúvidas e propenso a realizar intrigantes reflexões. Algumas delas estão apresentadas no trecho a seguir, que faz parte de um livro chamado <i>Confissões de um jovem romancista</i>.
                </p>

                <blockquote className="border-l-4 border-[#80298F] pl-4 my-6 italic text-gray-700">
                  <p className="mb-2">Nunca entendi por que Homero é visto como um escritor criativo e Platão, não. Por que um mau poeta é um escritor criativo, enquanto um bom ensaísta científico não seria?</p>
                  <p className="mb-2">[...] Mas que tipo de escritor seria um filósofo? Podemos dizer que o filósofo é um escritor profissional cujos textos podem ser resumidos e vertidos em outras palavras sem perder todo o seu significado, ao passo que os textos de escritores criativos não podem ser integralmente traduzidos ou parafraseados.</p>
                  <p className="mb-2">[...] Isso acontece – e aqui podemos identificar a verdadeira diferença entre escrita criativa e escrita científica – porque, em um ensaio teórico, em geral se pretende demonstrar uma tese particular ou fornecer uma resposta a um problema específico. Por outro lado, num poema ou num romance, a intenção é representar a vida em toda a sua incoerência. A intenção é pôr em cena uma série de contradições, tornando-as claras e pungentes.</p>
                </blockquote>

                <p className="mb-4 indent-6">
                  As palavras de Umberto Eco mostram uma característica fundamental da literatura: o compromisso da ficção é, acima de tudo, com a própria ficção. Isso não significa que a literatura – assim como outras manifestações artísticas – exista à parte do mundo real, despreocupada e alienada, mas sim que ela pode tratar do mundo como bem entender, pode operar com os elementos da realidade de forma a tornar alguns de seus aspectos, sobretudo os conflitivos e incoerentes, mais expressivos e evidentes. O pensamento científico, por outro lado, ao precisar se ater a métodos, conceitos e fatos, não pode se dar a essas liberdades, pois precisa apresentar ideias embasadas e propostas consistentes. Diante disso, talvez seja possível dizer que o pensamento científico e a literatura tratam dos mesmos assuntos, mas por caminhos diferentes; cada qual observa, interpreta e representa o mundo com suas ferramentas próprias.
                </p>
                <p className="mb-4 indent-6">
                  A ficção, nesse sentido, ao tratar da vida, pode até apresentar teses, mas faz isso por meio de uma forma única, que só se completa por meio do diálogo com o público. Na leitura da ficção, o público não aceita ou refuta uma tese, não aponta erros metodológicos ou conclusões inconsistentes (como nos textos científicos), ele completa a proposta dada pelo autor e lhe dá sentido mediante o desfrute estético.
                </p>
                <p className="mb-4 indent-6">
                  Depois de tudo o que você estudou até aqui, surge um questionamento: existe alguma maneira de definir o que é literatura? Apesar da amplitude e da dificuldade imposta pela pergunta, é possível dizer, de maneira sintética e até simplista, que a literatura é uma manifestação artística feita por meio da linguagem verbal, o que resulta na criação de textos ficcionais ou detentores de elementos típicos da ficção (este é o caso, por exemplo, das crônicas). O certo é que não há uma definição fácil ou conclusiva, mas sim possíveis ideias acerca do que é literatura.
                </p>
                <p className="text-sm text-gray-600 mt-4 text-right">
                  ECO, Umberto. <b><i>Confissões de um jovem romancista</i></b>. Tradução de Marcelo Pen. São Paulo: Cosac Naify, 2013.
                </p>

                <Pagination currentPage={10} expandToBookColumn />

                <h3 className="text-2xl font-bold text-[#80298F] mb-4">Zoom in</h3>
                <p className="mb-4 indent-6">
                  A tela <i>A leitora de romances</i> é uma obra de Vincent van Gogh e apresenta algumas características que são evidentes nas pinturas do artista, como o uso de cores fortes e a representação de elementos entre o figurativo e a sugestão, isto é, entre a arte de representar formas e a indução de algum aspecto em particular.
                </p>

                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_10_img_178_203.png')} alt="A leitora de romances, Van Gogh" className="w-full max-w-[520px] rounded-[24px]" />
                  <p className="text-[10px] text-slate-600 mt-2">Vincent van Gogh/Museu Van Gogh, Países Baixos</p>
                </div>

                <p className="mb-4 indent-6">
                  Por meio desses elementos, é possível notar que o principal elemento representado nessa tela é a leitura, e não a leitora propriamente dita. Ou talvez a tela represente uma personagem que só existe em sua completude por meio da leitura, porque ela é identificada pela atividade que está realizando. Não é uma mulher lendo um romance; é uma “leitora” mergulhada no mundo ficcional, vivenciando-o.
                </p>

                <h3 className="text-xl font-bold mb-4">O que é a escrita literária?</h3>
                <p className="mb-4 indent-6">
                  Mas, afinal, como mundos imaginários como a Terra do Nunca são criados por meio da escrita? Para refletir sobre a questão, vamos ler um trecho do livro do escritor Stephen King, mundialmente conhecido por suas obras literárias voltadas, majoritariamente, para o mistério e o sobrenatural. King também é crítico literário e, em 2000, publicou um livro chamado <i>Sobre a escrita</i>. Nessa obra, ele trata de alguns aspectos de sua trajetória e de seu ofício, dando dicas a jovens aspirantes a escritores. A certa altura, ele indaga sobre o que seria, afinal de contas, a escrita, ao que responde de forma curiosa: “Telepatia, é claro”.
                </p>

                <Pagination currentPage={11} expandToBookColumn />

                <p className="mb-4 indent-6">
                  A seguir, está um trecho da explicação que deu acerca dessa curiosa definição.
                </p>

                <blockquote className="border-l-4 border-[#80298F] pl-4 my-6 italic text-gray-700">
                  <p className="mb-2"><b>Sobre a escrita</b></p>
                  <p className="mb-2">Meu nome é Stephen King. Estou escrevendo a primeira versão desta parte em minha mesa (aquela sob o telhado inclinado), em uma manhã nevada de dezembro de 1997. Tenho algumas coisas na cabeça. [...] Eu, porém, estou em outro lugar, em um porão onde existem muitas luzes brilhantes e imagens claras. Um lugar que construí para mim ao longo dos anos. Daqui se vê ao longe. Sei que é meio estranho e contraditório que um lugar de onde se vê ao longe seja um porão, mas é assim que funciona comigo. Se você quiser construir seu próprio lugar de onde se vê ao longe, pode colocá-lo no alto de uma árvore, no telhado do Empire State ou à beira do Grand Canyon. [...]</p>
                  <p className="mb-2">Leio onde posso, mas tenho um lugar favorito, como você também deve ter – um lugar com boa luz e vibrações positivas. Para mim, é a cadeira azul que fica no escritório. Para outros, pode ser o sofá na varanda, a cadeira de balanço na cozinha ou talvez a cama [...].</p>
                  <p className="mb-2">Então, vamos considerar que você esteja em seu lugar favorito de recepção, como eu estou em meu lugar favorito de transmissão. Precisamos desempenhar nossa rotina mentalista não só a distância no espaço, mas também no tempo, embora isso não seja um problema. Se ainda conseguimos ler Dickens, Shakespeare e (com ajuda de uma nota de pé de página ou duas) Heródoto, acho que podemos lidar bem com a distância entre 1997 e 2000. E aqui vamos nós – telepatia de verdade em curso. Você vai notar que não tenho nada na manga e que meus lábios nunca se mexem. É bem provável que os seus também não.</p>
                  <p className="mb-2">Olha, aqui temos uma mesa coberta com um pano vermelho. Nela está uma gaiola do tamanho de um aquário pequeno. Na gaiola está um coelho branco de nariz e olhos rosados. Nas patas da frente está um toco de cenoura que ele rói alegremente. Nas costas, escrito em tinta azul, está o número 8.</p>
                  <p className="mb-2">Nós vemos a mesma coisa? Precisaríamos nos reunir e conversar para ter certeza absoluta, mas acho que sim. Claro que haveria as variações necessárias: alguns receptores verão um pano vermelho-vivo, outros, vinho, e outros mais verão tonalidades distintas. (Para daltônicos, a toalha de mesa vermelha tem a cor de cinzas de cigarro.) Alguns verão bordas franzidas; outros, tudo liso. Almas mais decoradoras podem incluir alguns laçarotes. Fiquem à vontade – minha toalha de mesa é sua toalha de mesa.</p>
                  <p className="mb-2">Da mesma maneira, o material da gaiola deixa muito espaço para interpretação. No mínimo, ela foi descrita com uma comparação tosca, que só é útil se eu e você vemos o mundo e medimos as coisas com um olhar parecido. É fácil ser desleixado ao fazer comparações toscas, mas a alternativa é uma excessiva atenção aos detalhes que tira toda a diversão da escrita. O que eu deveria dizer, “na mesa tem uma gaiola com 1 metro de comprimento, 60 centímetros de largura e 36 centímetros de altura”? Isso não é prosa, é um manual de instruções. O parágrafo também não diz de que material é feita a gaiola. Telas soldadas? Vigas de ferro? Vidro? Mas isso realmente importa? Todos entendemos que dá para ver do outro lado da gaiola; nada além disso nos importa. A coisa mais interessante aqui não é nem o coelho que rói a cenoura, mas o número que ele traz nas costas. Não é um seis, nem um quatro, nem 1,95. É um oito. É para isso que estamos olhando, e todos sabemos. Eu não disse a você. Você não me perguntou. Eu jamais abri minha boca, e você jamais abriu a sua. Nós não estamos nem no mesmo ano, quanto mais na mesma sala... mas estamos juntos. Estamos próximos.</p>
                  <p className="mb-2">Estamos tendo um encontro de mentes. Mandei uma mesa com um pano vermelho, uma gaiola, um coelho e um número oito escrito em tinta azul. Você recebeu tudo, principalmente o oito azul. Estamos participando de um ato de telepatia. E não é enrolação mística; é telepatia de verdade.</p>
                </blockquote>
                <p className="text-sm text-gray-600 mt-4 text-right">
                  KING, Stephen. <b><i>Sobre a escrita</i></b>. Tradução de Michel Teixeira. Rio de Janeiro: Objetiva, 2015.
                </p>

                <Pagination currentPage={12} expandToBookColumn />

                <h3 className="text-2xl font-bold text-[#80298F] mb-4">Literatura em pauta</h3>
                
                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_12_img_15_557.png')} alt="Ilustração" className="w-full max-w-[400px] rounded-[24px]" />
                </div>

                <p className="mb-4 indent-6">
                  Como vimos, o modo como as palavras são organizadas em um texto – o que cria a sua capacidade estética e retórica, isto é, o uso bem articulado das palavras, considerando a forma e o conteúdo – pode despertar ideias, incômodos, sensações e inquietações nos leitores, que ficam imersos em um mundo imaginário do qual não desejam sair. Pelo contrário: queremos ir cada vez mais fundo para descobrir o que podemos encontrar. Qual mundo fantástico você quer descobrir?
                </p>
                <p className="mb-4 indent-6">
                  Você já leu textos autobiográficos, isto é, textos em que os autores contam suas próprias histórias de vida? Textos como esses podem ter um caráter documental ou ficcional. A seguir está um trecho de <i>Como e por que sou romancista</i>, do cearense José de Alencar, escrito como se fosse uma carta destinada a um amigo, datada de maio de 1873. Nela, Alencar conta como, depois de realizar os primeiros estudos escolares, tornou-se uma espécie de leitor em sua casa, esmerando-se em dar voz às personagens de livros românticos da época.
                </p>

                <blockquote className="border-l-4 border-[#80298F] pl-4 my-6 italic text-gray-700">
                  <p className="mb-2">Não havendo visitas de cerimônia sentava-se minha boa mãe e sua irmã D. Florinda com os amigos que apareciam, ao redor de uma mesa redonda de jacarandá, no centro da qual havia um candeeiro.</p>
                  <p className="mb-2">Minha mãe e minha tia se ocupavam com trabalhos de costuras, e as amigas para não ficarem ociosas as ajudavam. Dados os primeiros momentos à conversação, passava-se à leitura e era eu chamado ao lugar de honra.</p>
                  <p className="mb-2">Muitas vezes, confesso, essa honra me arrancava bem a contragosto de um sono começado [...].</p>
                  <p className="mb-2">Lia-se até a hora do chá, e tópicos havia tão interessantes que eu era obrigado à repetição. Compensavam esse excesso, as pausas para dar lugar às expansões do auditório, o qual desfazia-se em recriminações contra algum mau personagem, ou acompanhava de seus votos e simpatias o herói perseguido.</p>
                  <p className="mb-2">Uma noite, daquelas em que eu estava mais possuído do livro, lia com expressão uma das páginas mais comoventes da nossa biblioteca. As senhoras, de cabeça baixa, levavam o lenço ao rosto, e poucos momentos depois não puderam conter os soluços que rompiam-lhes o seio.</p>
                  <p className="mb-2">Com a voz afogada pela comoção e a vista empanada pelas lágrimas, eu também cerrando ao peito o livro aberto, disparei em pranto e respondia com palavras de consolo às lamentações de minha mãe e suas amigas.</p>
                  <p className="mb-2">Nesse instante assomava à porta um parente nosso, o Revd.<sup>o</sup> Padre Carlos Peixoto de Alencar, já assustado com o choro que ouvira ao entrar – vendo-nos a todos naquele estado de aflição, ainda mais perturbou-se:</p>
                  <p className="mb-2">― Que aconteceu? Alguma desgraça? Perguntou arrebatadamente. As senhoras, escondendo o rosto no lenço para ocultar do Padre Carlos o pranto e evitar seus remoques, não proferiram palavra. Tomei eu a mim responder:</p>
                  <p className="mb-2">― Foi o pai de Amanda que morreu! Disse, mostrando-lhe o livro aberto.</p>
                  <p className="mb-2">Compreendeu o Padre Carlos e soltou uma gargalhada, como ele as sabia dar, verdadeira gargalhada homérica, que mais parecia uma salva de sinos a repicarem do que riso humano. E após esta, outra e outra, que era ele inesgotável, quando ria de abundância de coração, com o gênio prazenteiro de que a natureza o dotara.</p>
                  <p className="mb-2">Foi essa leitura contínua e repetida de novelas e romances que primeiro imprimiu em meu espírito a tendência para essa forma literária que é entre todas a de minha predileção?</p>
                </blockquote>
                <p className="text-sm text-gray-600 mt-4 text-right">
                  ALENCAR, José de. <b><i>Como e porque sou romancista</i></b>. Rio de Janeiro: Typ. de G. Leuzinger & Filhos, Rua d’Ouvidor, 1893.
                </p>

                <Pagination currentPage={13} expandToBookColumn />

                <p className="mb-4 indent-6">
                  A literatura é cheia de mistérios. Quando lemos um texto ficcional, sabemos que vamos ser conduzidos a uma realidade imaginada, que passaremos por um processo de encantamento por meio das palavras. É como ir a uma apresentação de ilusionismo: de antemão, temos consciência de que vamos ser ludibriados pelos truques e pela encenação, ficamos concentrados e alertas a tudo o que pode acontecer, mas isso não significa que as mágicas se tornam menos interessantes ou que perdem o seu efeito sobre nossa curiosidade. O que costuma acontecer é exatamente o contrário. A verdade é que queremos ser enfeitiçados, desejamos ser desafiados pela habilidade e pelo ilusionista. Com a literatura ocorre uma situação parecida, razão pela qual precisamos desconfiar de narradores, tentar entender suas estratégias e artimanhas, problematizar aquilo que querem nos fazer entender da história. Logo, deve-se estar atento não só às palavras que o narrador expõe, mas também aos pontos de vista que aborda e de que forma ele orienta o olhar do leitor. O problema é que, assim como bons ilusionistas, os bons ficcionistas podem até nos dar alguns sinais, mas acabam encantando, ludibriando e despertando o desejo por mais histórias.
                </p>
                <p className="mb-4 indent-6">
                  No texto de abertura, Wendy tenta contar uma história para os “meninos perdidos”, mas é constantemente interrompida pelas crianças. No entanto, essa interrupção mostra também o quanto todos estavam empolgados em saber como seria o desdobramento da história. Pensando a respeito desse encantamento provocado pela literatura, leia um poema de João Cabral de Melo Neto, publicado originalmente em 1980 no livro <b><i>A escola das facas</i></b>.
                </p>

                <div className="bg-gray-100 p-6 rounded-lg my-6">
                  <h4 className="font-bold mb-4">Descoberta da literatura</h4>
                  <p className="mb-2">No dia a dia do engenho,</p>
                  <p className="mb-2">toda a semana, durante,</p>
                  <p className="mb-2">cochichavam-me em segredo:</p>
                  <p className="mb-2">saiu um novo romance.</p>
                  <p className="mb-2">E da feira do domingo</p>
                  <p className="mb-2">me traziam conspirantes</p>
                  <p className="mb-2">para que os lesse e explicasse</p>
                  <p className="mb-2">um romance de barbante.</p>
                  <p className="mb-2">Sentados na roda morta</p>
                  <p className="mb-2">de um carro de boi, sem jante,</p>
                  <p className="mb-2">ouviam o folheto guenzo,</p>
                  <p className="mb-2">a seu leitor semelhante,</p>
                  <p className="mb-2">com as peripécias de espanto</p>
                  <p className="mb-2">preditas pelos feirantes.</p>
                  <p className="mb-2">Embora as coisas contadas</p>
                  <p className="mb-2">e todo o mirabolante,</p>
                  <p className="mb-2">em nada ou pouco variassem</p>
                  <p className="mb-2">nos crimes, no amor, nos lances,</p>
                  <p className="mb-2">e soassem como sabidas</p>
                  <p className="mb-2">de outros folhetos migrantes,</p>
                  <p className="mb-2">a tensão era tão densa,</p>
                  <p className="mb-2">subia tão alarmante,</p>
                  <p className="mb-2">que o leitor que lia aquilo</p>
                  <p className="mb-2">como puro alto-falante,</p>
                  <p className="mb-2">e, sem querer, imantara</p>
                  <p className="mb-2">todos ali, circunstantes,</p>
                  <p className="mb-2">receava que confundissem</p>
                  <p className="mb-2">o de perto com o distante,</p>
                  <p className="mb-2">o ali com o espaço mágico,</p>
                  <p className="mb-2">seu franzino com o gigante,</p>
                  <p className="mb-2">e que o acabassem tomando</p>
                  <p className="mb-2">pelo autor imaginante</p>
                  <p className="mb-2">ou tivesse que afrontar</p>
                  <p className="mb-2">as brabezas do brigante.</p>
                  <p className="mb-2">(E acabaria, não fossem</p>
                  <p className="mb-2">contar tudo à Casa-grande:</p>
                  <p className="mb-2">na moita morta do engenho,</p>
                  <p className="mb-2">um filho-engenho, perante</p>
                  <p className="mb-2">cassacos do eito e de tudo,</p>
                  <p className="mb-2">se estava dando ao desplante</p>
                  <p className="mb-2">de ler letra analfabeta</p>
                  <p className="mb-2">de curumba, no caçanje</p>
                  <p className="mb-2">próprio dos cegos de feira,</p>
                  <p className="mb-2">muitas vezes meliantes.)</p>
                  <p className="text-sm text-gray-600 mt-4 text-right">
                    MELO NETO, João Cabral de. <b><i>A educação pela pedra e depois</i></b>. Rio de Janeiro: Nova Fronteira, 1997.
                  </p>
                </div>

                <Pagination currentPage={14} expandToBookColumn />

                <h3 className="text-2xl font-bold text-[#80298F] mb-4">Agora é com @você</h3>
                
                <QuestionRenderer question={getQuestionById('c01_q10')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q11')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q12')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />

                <div className="my-6">
                  <a href="https://qr.portalsaseducacao.com.br/_Y7y" target="_blank" rel="noopener noreferrer" className="text-[#80298F] underline font-bold">
                    Link Objeto Digital
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-[#80298F] mb-4 mt-8">Atividades propostas</h3>

                <QuestionRenderer question={getQuestionById('c01_q13')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                
                <Pagination currentPage={15} expandToBookColumn />
                
                <QuestionRenderer question={getQuestionById('c01_q14')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q15')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                
                <Pagination currentPage={16} expandToBookColumn />
                
                <QuestionRenderer question={getQuestionById('c01_q16')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q17')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                
                <Pagination currentPage={17} expandToBookColumn />
                
                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_17_img_164_415.png')} alt="Ilustração de leitura" className="w-full max-w-[400px] rounded-[24px]" />
                </div>

                <QuestionRenderer question={getQuestionById('c01_q18')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q19')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                
                <Pagination currentPage={18} expandToBookColumn />
                
                <QuestionRenderer question={getQuestionById('c01_q20')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                
                <div className="my-6 flex flex-col items-center">
                  <img src={publicUrl('images/page_18_img_129_353.png')} alt="Lágrima de preta" className="w-full max-w-[400px] rounded-[24px]" />
                </div>

                <Pagination currentPage={19} expandToBookColumn />
                
                <QuestionRenderer question={getQuestionById('c01_q21')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q22')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />
                <QuestionRenderer question={getQuestionById('c01_q23')} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} showResults={showTeacherView} />

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