// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Fim do acordo nuclear entre EUA e Rússia","startPage":1,"pageCount":26,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useState } from 'react';
import { publicUrl } from '../lib/publicUrl';
import Poster from '../components/Poster';
import TeacherButton from '../components/TeacherButton';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import QuestionRenderer from '../components/QuestionRenderer';
import Footer from '../components/Footer';
import { useUserAnswers } from '../hooks/useUserAnswers';
import { usePagination } from '../hooks/usePagination';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { TeacherAnswers } from '../components/TeacherAnswers';
import ComecoDeConversa from '../components/ComecoDeConversa';
import DialogarEConhecer from '../components/DialogarEConhecer';
import AgoraEComVoce from '../components/AgoraEComVoce';
import OrganizeAsIdeias from '../components/OrganizeAsIdeias';
import ParaIrAlem from '../components/ParaIrAlem';
import ExploreSeusConhecimentos from '../components/ExploreSeusConhecimentos';
import MergulhandoFundo from '../components/MergulhandoFundo';
import NesteCapituloVoceEstudou from '../components/NesteCapituloVoceEstudou';
import { Question } from '../types/questions';

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
    correctAnswer: 'Sim, todo número inteiro possui um antecessor e um sucessor inteiro.',
  },
  {
    id: 'ch1_q3',
    type: 'text-input',
    number: 3,
    question: 'Qual é o menor número inteiro? E o maior?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Não é possível determinar o maior nem o menor número inteiro.',
  },
  {
    id: 'ch1_q4',
    type: 'text-input',
    number: 4,
    question: 'Por que, na definição do conjunto dos números racionais, aparece como condição que b ∈ Z*?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Porque não existe divisão por zero.',
  },
  {
    id: 'ch1_q5',
    type: 'text-input',
    number: 1,
    question: 'Determine a fração geratriz das dízimas periódicas simples a seguir. Sempre que possível, simplifique as frações obtidas.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas conforme os itens.',
  },
  {
    id: 'ch1_q6',
    type: 'text-input',
    number: 2,
    question: 'Observe, a seguir, como determinar a fração geratriz de uma dízima periódica simples com a parte inteira diferente de zero. Em seguida, resolva os itens propostos.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q7',
    type: 'text-input',
    number: 1,
    question: 'Determine a fração geratriz das seguintes dízimas periódicas compostas. Sempre que possível, simplifique as frações obtidas.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q8',
    type: 'text-input',
    number: 1,
    question: 'Escreva os números a seguir na região adequada do diagrama anterior.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas no diagrama.',
  },
  {
    id: 'ch1_q9',
    type: 'text-input',
    number: 2,
    question: 'Complete as sentenças com o símbolo ∈ (pertence) ou ∉ (não pertence), indicando se o número faz parte ou não do conjunto numérico indicado.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q10',
    type: 'text-input',
    number: 3,
    question: 'Resolva as expressões a seguir e registre os resultados na forma fracionária e na forma decimal.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q11',
    type: 'text-input',
    number: 1,
    question: 'A reta numérica a seguir representa a avenida principal de uma cidade. Na reta, o ponto de referência O localiza um prédio comercial, e os pontos A, B, C e D indicam, cada um, a posição de uma casa. Sabendo que a distância entre dois inteiros consecutivos é sempre a mesma, determine a fração que representa a posição de cada casa.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q12',
    type: 'text-input',
    number: 2,
    question: 'Desenhe uma reta numérica e represente nela os seguintes números racionais.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Representação na reta.',
  },
  {
    id: 'ch1_q13',
    type: 'text-input',
    number: 1,
    question: 'Calcule as raízes exatas a seguir. Depois, use uma calculadora para conferir os resultados.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q14',
    type: 'text-input',
    number: 1,
    question: 'Localize cada raiz quadrada a seguir entre dois números naturais consecutivos.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q15',
    type: 'text-input',
    number: 2,
    question: 'Utilize os dados obtidos na questão anterior e estime um valor aproximado (com uma casa decimal) para essas raízes.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q16',
    type: 'text-input',
    number: 3,
    question: 'Utilize uma calculadora para determinar o valor aproximado das raízes quadradas a seguir. Escreva os oito primeiros dígitos que aparecerem no visor.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q17',
    type: 'text-input',
    number: 4,
    question: 'Os dígitos que apareceram no visor da calculadora expressaram toda a parte decimal dessas raízes? Justifique sua resposta.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Não, pois elas possuem infinitas casas decimais.',
  },
  {
    id: 'ch1_q18',
    type: 'text-input',
    number: 1,
    question: 'Dada a reta numérica a seguir, faça o que se pede.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q19',
    type: 'text-input',
    number: 2,
    question: 'Estime um valor aproximado para os números irracionais a seguir. Em seguida, localize-os na reta numérica.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q20',
    type: 'text-input',
    number: 1,
    question: 'Calcule as potências a seguir.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q21',
    type: 'text-input',
    number: 2,
    question: 'Redija um texto explicando as diferenças entre as potências.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q22',
    type: 'text-input',
    number: 1,
    question: 'Calcule o valor das expressões a seguir aplicando as propriedades da potenciação.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q23',
    type: 'text-input',
    number: 2,
    question: 'Aplicando as propriedades estudadas, resolva as seguintes expressões.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q24',
    type: 'text-input',
    number: 1,
    question: 'Leia o texto a seguir e sublinhe todos os números expressos em milhões, em bilhões, em trilhões e em anos-luz. Em seguida, escreva-os em notação científica ou como potências de base 10.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q25',
    type: 'text-input',
    number: 2,
    question: 'Represente, em notação científica, as seguintes medidas.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q26',
    type: 'text-input',
    number: 3,
    question: 'Determine o valor de x nas seguintes igualdades.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q27',
    type: 'text-input',
    number: 1,
    question: 'Escreva a operação inversa das potenciações a seguir e determine os valores desconhecidos (positivos e reais) nas igualdades.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q28',
    type: 'text-input',
    number: 2,
    question: 'Você já estudou que a radiciação é a operação inversa da potenciação. Verifique se é possível calcular as seguintes raízes.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q29',
    type: 'text-input',
    number: 3,
    question: 'Calcule as raízes a seguir e indique os casos em que elas não pertencem ao conjunto dos números reais.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q30',
    type: 'text-input',
    number: 1,
    question: 'Represente as seguintes raízes na forma de potência com expoente fracionário.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q31',
    type: 'text-input',
    number: 2,
    question: 'Escreva as potências a seguir na forma de radical.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q32',
    type: 'text-input',
    number: 3,
    question: 'Aplicando as propriedades da potenciação, calcule o valor das expressões a seguir.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q33',
    type: 'text-input',
    number: 1,
    question: 'Qual é o inverso da fração geratriz da dízima periódica 1,007777…?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q34',
    type: 'text-input',
    number: 2,
    question: 'Estime um valor aproximado (com uma casa decimal) para cada raiz e resolva as expressões a seguir.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q35',
    type: 'text-input',
    number: 3,
    question: 'Considere os números dados. Com base neles, responda aos questionamentos.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q36',
    type: 'text-input',
    number: 4,
    question: 'Calcule o valor numérico da expressão.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q37',
    type: 'text-input',
    number: 5,
    question: 'Calcule m², sabendo que m = ...',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q38',
    type: 'text-input',
    number: 6,
    question: 'Reescreva as frases substituindo os números pelas suas respectivas notações científicas.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q39',
    type: 'text-input',
    number: 7,
    question: 'Simplifique as expressões aplicando as propriedades das potências.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q40',
    type: 'text-input',
    number: 8,
    question: 'Resolva as expressões a seguir.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q41',
    type: 'multiple-choice',
    number: 9,
    question: '(PUC-RJ) O valor de 0,444... é',
    options: {
      a: '0,222…',
      b: '0,333…',
      c: '0,444…',
      d: '0,555…',
      e: '0,666…'
    },
    correctAnswer: 'e',
  },
  {
    id: 'ch1_q42',
    type: 'multiple-choice',
    number: 10,
    question: '(USP) Seja a/b a fração geratriz da dízima 0,12222… com a e b primos entre si. Nessas condições, tem-se',
    options: {
      a: 'a^b = 990.',
      b: 'ab = 900.',
      c: 'a – b = 80.',
      d: 'a + b = 110.',
      e: 'b – a = 79.'
    },
    correctAnswer: 'e',
  },
  {
    id: 'ch1_q43',
    type: 'text-input',
    number: 1,
    question: 'Resolva a expressão a seguir.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Respostas variadas.',
  },
  {
    id: 'ch1_q44',
    type: 'multiple-choice',
    number: 2,
    question: 'A expressão dá origem a um decimal não exato, cuja soma dos seis primeiros algarismos da parte decimal é igual a',
    options: {
      a: '28.',
      b: '27.',
      c: '26.',
      d: '25.'
    },
    correctAnswer: 'b',
  },
  {
    id: 'ch1_q45',
    type: 'multiple-choice',
    number: 3,
    question: '(FUVEST-SP) Qual é a metade de 2^22?',
    options: {
      a: '1^22',
      b: '1^11',
      c: '2^11',
      d: '2^21'
    },
    correctAnswer: 'd',
  }
];

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const START_PAGE = 1;
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
          variante="unidade"
          badge="CAPÍTULO"
          chapterNumber={1}
          chapterTitle="Fim do acordo nuclear entre EUA e Rússia"
        />

        <Pagination currentPage={START_PAGE} />

        <Poster
          imageSrc="images/page_1_img_161_-1.png"
          creditLine1=""
          creditLine2="Imagem extraída do PDF."
          alt="Imagem extraída do PDF."
        />

        <div className="p-8 md:p-12">
          <TeacherButton
            visible={true}
            content={
              <p className="mb-3" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#000000', fontSize: '16px' }}>
                Explore as imagens de abertura para levantar os conhecimentos prévios da turma.
              </p>
            }
          />

          <p className="mb-4 indent-6 font-bold text-xl">E se você pudesse ouvir a matemática?</p>
          <p className="mb-4 indent-6">
            O que a música e a Matemática têm em comum? Mais do que se pode imaginar.
          </p>
          <p className="mb-4 indent-6">
            As melodias envolvem relações matemáticas. Em uma guitarra, por exemplo, quando um músico move seus dedos entre as casas do braço do instrumento, a vibração de cada corda muda. O som obtido quando a corda está pressionada na metade é diferente daquele obtido quando ela é pressionada na metade da metade. Isso significa que, para cada nota na escala musical, existe uma representação em fração.
          </p>

          <ul className="list-disc ml-6 mb-6">
            <li><strong>Resolver problemas e expressões algébricas utilizando o conjunto dos números reais R e seus subconjuntos (N, Z, Q, Q’).</strong></li>
            <li><strong>Identificar a natureza da variação de duas grandezas, expressando-a por meio de sentença algébrica.</strong></li>
            <li><strong>Efetuar cálculos, resolver e elaborar problemas com potências de expoente inteiro e fracionário, com números em notação científica, com porcentagens e que envolvam variação de duas grandezas.</strong></li>
            <li><strong>Construir mediatriz, bissetriz e ângulos de 90°, 60°, 45° e 30°.</strong></li>
            <li><strong>Reconhecer e construir figuras obtidas por simetrias de translação, reflexão e rotação.</strong></li>
            <li><strong>Reconhecer monômios e polinômios e efetuar as quatro operações básicas.</strong></li>
          </ul>

          <Pagination currentPage={2} expandToBookColumn />

          <p className="mb-4 indent-6">
            A escala musical mais utilizada atualmente é composta de sete notas naturais – dó, ré, mi, fá, sol, lá, si – e foi formada por meio de uma relação entre as frequências de cada uma dessas notas. A primeira escala musical com base matemática da história ocidental foi desenvolvida por Pitágoras, razão pela qual ficou conhecida como a escala pitagórica. Desde então, utiliza-se a divisão em intervalos com relação matemática para produzir sons que se combinem de forma agradável e harmônica.
          </p>
          <p className="mb-4 indent-6">
            Esse é só um dos vários exemplos da presença da Matemática nas diversas áreas do conhecimento. Você encontrará outros usos nos capítulos que seguem. Vá em frente e faça novas descobertas!
          </p>

          <ComecoDeConversa iconSrc={publicUrl('images/selo-comeco-conversa.png')}>
            <ul className="comeco-conversa__lista list-disc ml-6">
              <li>A música é um exemplo de aplicação da Matemática em que não há o uso explícito de números. Discuta com seus colegas e apresente outras situações em que isso ocorre.</li>
              <li>Você iniciará esta unidade relembrando alguns conjuntos de números – os naturais, os inteiros e os racionais – para conhecer mais sobre o conjunto dos números reais. O texto desta abertura apresenta alguns números. A qual conjunto numérico eles pertencem?</li>
            </ul>
          </ComecoDeConversa>

          <Pagination currentPage={3} expandToBookColumn />

          <p className="mb-4 indent-6 font-bold text-lg">Números reais, potenciação e radiciação</p>
          <p className="mb-4 indent-6">
            Você já se deu conta da variedade de números que utilizamos no dia a dia? Eles estão presentes, por exemplo, em grande parte das informações que consumimos na internet.
          </p>
          <p className="mb-4 indent-6">
            Leia, a seguir, o trecho de uma reportagem sobre o fim do tratado New START, um acordo entre EUA e Rússia, encerrado em 2026, que limitava a quantidade de ogivas nucleares pertencentes a ambos os países. Durante a leitura, atente-se ao uso recorrente dos números para a comunicação, buscando identificar o significado de cada um deles na análise das informações.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-bold text-center mb-2">Fim do acordo nuclear entre EUA e Rússia</p>
            <p className="text-center mb-4">Os EUA e a Rússia têm, juntos, a maior parte do estoque de ogivas nucleares do mundo.</p>
            <p className="font-bold text-center mb-4">Arsenais dos 5 países com mais ogivas nucleares no mundo</p>
            <ul className="list-decimal ml-6 mb-4">
              <li><strong>5 459*</strong> Rússia</li>
              <li><strong>5 177</strong> EUA</li>
              <li>China</li>
              <li>França</li>
              <li>Reino Unido</li>
            </ul>
            <p className="text-sm text-gray-600 mb-4">*quantidade de ogivas nucleares, segundo Instituto Internacional de Pesquisa da Paz de Estocolmo (Sipri) em janeiro de 2025.</p>
            <p className="mb-4">Após o término do tratado New START, expirado em fevereiro de 2026, os países seguem sem um acordo que limite seus estoques, gerando certa instabilidade na política global. Veja, a seguir, os arsenais estimados para ambos os países.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 bg-white">
                <p className="font-bold text-red-600">RS-28 Sarmat (Rússia)</p>
                <ul className="text-sm">
                  <li><strong>Alcance:</strong> 13 mil km</li>
                  <li><strong>Velocidade:</strong> Até 24 mil km/h</li>
                  <li><strong>No arsenal desde:</strong> 1970</li>
                  <li><strong>Comprimento:</strong> 18,2 m</li>
                  <li><strong>Diâmetro:</strong> 1,85 m</li>
                  <li><strong>Peso de lançamento:</strong> 34,5 ton</li>
                  <li><strong>Peso da ogiva:</strong> 3 ogivas de 670 kg cada</li>
                </ul>
              </div>
              <div className="border p-4 bg-white">
                <p className="font-bold text-blue-600">LGM-30G Minuteman III (EUA)</p>
                <ul className="text-sm">
                  <li><strong>Alcance:</strong> Entre 10 e 18 mil km</li>
                  <li><strong>Velocidade:</strong> Até 25 mil km/h</li>
                  <li><strong>No arsenal desde:</strong> 2021</li>
                  <li><strong>Comprimento:</strong> 35,3 m</li>
                  <li><strong>Diâmetro:</strong> 3 m</li>
                  <li><strong>Peso de lançamento:</strong> 208 ton</li>
                  <li><strong>Peso da ogiva:</strong> 10 ton</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mb-4 indent-6 font-bold">Sublinhe todos os números que você encontrar no texto e identifique dois exemplos de números naturais e dois exemplos de números racionais que não são naturais.</p>

          <Pagination currentPage={4} expandToBookColumn />

          <p className="mb-4 indent-6">
            Neste capítulo, você aprofundará seus estudos sobre os conjuntos numéricos e conhecerá dois novos conjuntos: o <strong>conjunto dos números irracionais</strong> e o <strong>conjunto dos números reais</strong>. Também estudará, de forma mais aprofundada, a operação da potenciação, suas propriedades e sua operação inversa, a radiciação.
          </p>

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Conjuntos numéricos</h2>
          <p className="mb-4 indent-6">
            Os conjuntos numéricos são agrupamentos de números que compartilham características em comum. Entre eles, destacam-se o conjunto dos números naturais, o dos inteiros e o dos racionais.
          </p>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Números naturais e números inteiros</h3>
          <p className="mb-4 indent-6">
            O <strong>conjunto dos números naturais</strong> é indicado pelo símbolo N.
            <br />N = {'{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...}'}
          </p>
          <p className="mb-4 indent-6">
            Já o <strong>conjunto dos números naturais não nulos</strong> é indicado pelo símbolo N*, pois convencionou-se o uso do asterisco (*) para indicar a exclusão do número zero de qualquer conjunto numérico.
            <br />N* = {'{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...}'}
          </p>
          <p className="mb-4 indent-6">
            Acrescentando os números inteiros negativos ao conjunto dos números naturais, forma-se o <strong>conjunto dos números inteiros</strong>, indicado pelo símbolo Z.
            <br />Z = {'{..., –6, –5, –4, –3, –2, –1, 0, 1, 2, 3, 4, 5, 6, ...}'}
          </p>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Números racionais</h3>
          <p className="mb-4 indent-6">
            O número racional é definido como todo número que pode ser escrito na forma de fração na qual o numerador e o denominador são números inteiros, sendo o denominador diferente de zero.
          </p>

          <DialogarEConhecer iconSrc={publicUrl('images/selo-dialogar-conhecer.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </DialogarEConhecer>

          <Pagination currentPage={5} expandToBookColumn />

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
            Dado um número racional a/b, com b ≠ 0, a representação decimal desse número é obtida dividindo-se a por b.
          </p>

          <Pagination currentPage={6} expandToBookColumn />

          <p className="mb-4 indent-6">
            Como pôde ser observado nos exemplos anteriores, é possível que as frações tenham representações decimais exatas ou não exatas. Na representação decimal não exata, um algarismo ou um grupo de algarismos repete-se periodicamente. Números com essas características são denominados <strong>dízimas periódicas</strong>.
          </p>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Dízima periódica</h3>
          <p className="mb-4 indent-6">Em uma dízima periódica, é utilizada a seguinte nomenclatura.</p>
          <ul className="list-disc ml-6 mb-6">
            <li><strong>Parte inteira (I)</strong> – Algarismo ou grupo de algarismos que antecede a vírgula.</li>
            <li><strong>Período (P)</strong> – Algarismo ou grupo de algarismos que se repete indefinidamente na parte decimal (após a vírgula).</li>
            <li><strong>Parte não periódica (N)</strong> – Algarismo ou grupo de algarismos que aparece logo após a vírgula e que não compõe o período.</li>
          </ul>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Dízimas periódicas simples</h3>
          <p className="mb-4 indent-6">São chamadas de dízimas periódicas simples aquelas que não apresentam a parte não periódica (N).</p>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Dízimas periódicas compostas</h3>
          <p className="mb-4 indent-6">São chamadas de dízimas periódicas compostas aquelas que apresentam a parte não periódica (N).</p>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Fração geratriz de uma dízima periódica</h3>
          <p className="mb-4 indent-6">
            Toda dízima periódica é um número racional, pois pode ser escrita na forma de fração. Essa fração é chamada de <strong>geratriz da dízima periódica</strong>.
          </p>

          <Pagination currentPage={7} expandToBookColumn />

          <OrganizeAsIdeias iconSrc={publicUrl('images/selo-organize-ideias.png')}>
            <p className="font-bold mb-2">Regra prática</p>
            <p>
              Portanto, para determinar a fração geratriz de uma dízima periódica simples (de parte inteira nula), escrevem-se, no numerador da fração, o período e, no denominador, um número formado por tantos noves quantos forem os algarismos do período.
            </p>
          </OrganizeAsIdeias>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
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

          <Pagination currentPage={8} expandToBookColumn />

          <OrganizeAsIdeias iconSrc={publicUrl('images/selo-organize-ideias.png')}>
            <p className="font-bold mb-2">Regra prática</p>
            <p>
              Para determinar a fração geratriz de uma dízima periódica composta (de parte inteira nula), escreve-se, no numerador da fração, o número formado pela parte decimal não periódica seguido do período, menos o número formado pela parte decimal não periódica. No denominador, escreve-se um número formado por tantos noves quantos forem os algarismos do período seguido de tantos zeros quantos forem os algarismos da parte decimal não periódica.
            </p>
          </OrganizeAsIdeias>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q7')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={9} expandToBookColumn />

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Subconjuntos dos números racionais</h3>
          <p className="mb-4 indent-6">
            Além dos números naturais (N) e dos números inteiros (Z), também são subconjuntos especiais dos números racionais (Q) os conjuntos dos:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>números racionais não nulos: Q*</li>
            <li>números racionais positivos: Q+</li>
            <li>números racionais negativos: Q-</li>
          </ul>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Representação dos números racionais em diagrama</h3>
          <p className="mb-4 indent-6">
            Os números racionais podem ser escritos na forma inteira, na forma decimal (decimal exato ou dízima periódica) ou na forma fracionária com numerador e denominador inteiros, sendo o denominador diferente de zero.
          </p>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
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

          <Pagination currentPage={10} expandToBookColumn />

          <QuestionRenderer
            question={getQuestionById('ch1_q10')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Representação dos números racionais na reta numérica</h2>
          <p className="mb-4 indent-6">
            Os números racionais podem ser representados em uma reta. Para isso, têm-se:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>um ponto O, denominado <strong>origem</strong>, associado ao número <strong>zero</strong>;</li>
            <li>um <strong>sentido positivo</strong>, indicado pela seta;</li>
            <li>uma <strong>unidade de medida</strong>.</li>
          </ul>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q11')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q12')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={11} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Números quadrados perfeitos e raiz quadrada exata de um número</h2>
          <p className="mb-4 indent-6">
            Considere a sequência de números quadrados perfeitos: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, … Os <strong>números quadrados perfeitos</strong> são números naturais que podem ser escritos como potência de expoente 2. Somente esses números têm como raiz quadrada um número natural.
          </p>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q13')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Raiz quadrada aproximada de um número positivo</h3>
          <p className="mb-4 indent-6">
            Quando um número não é quadrado perfeito, sua raiz quadrada não é um número natural, ou seja, ele não tem raiz quadrada exata. Nesse caso, é possível calcular a raiz quadrada aproximada desse número.
          </p>

          <Pagination currentPage={12} expandToBookColumn />

          <p className="mb-4 indent-6">
            Com base no exemplo analisado, observe, a seguir, o passo a passo para calcular a raiz aproximada de um número qualquer.
          </p>
          <ul className="list-decimal ml-6 mb-6">
            <li>Determinam-se os números quadrados perfeitos mais próximos do número procurado.</li>
            <li>Estima-se a posição do número de acordo com os quadrados.</li>
            <li>Com base nessa estimativa, determina-se o valor do número ao quadrado.</li>
            <li>Calcula-se outro número ao quadrado, obedecendo ao seguinte raciocínio: se o resultado obtido for menor que o número dado, calcula-se uma casa decimal acima; se o resultado obtido for maior que o número dado, calcula-se uma casa decimal abaixo.</li>
          </ul>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
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

          <Pagination currentPage={13} expandToBookColumn />

          <QuestionRenderer
            question={getQuestionById('ch1_q17')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Números irracionais</h2>
          <p className="mb-4 indent-6">
            Na atividade anterior, as raízes apresentam uma parte decimal infinita e não periódica. Números com essas características não podem ser escritos na forma de fração na qual o numerador é um número inteiro e o denominador é um inteiro diferente de zero. Esse tipo de número não é racional; na matemática, eles formam o <strong>conjunto dos números irracionais</strong>.
          </p>

          <ParaIrAlem iconSrc={publicUrl('images/selo-para-ir-alem.png')}>
            <p className="mb-4">
              As raízes que apresentam uma parte decimal infinita e não periódica não são os únicos números irracionais que existem. Um número irracional muito conhecido é o número π (lê-se: pi), que relaciona o comprimento e o diâmetro de uma circunferência.
            </p>
          </ParaIrAlem>

          <Pagination currentPage={14} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Números reais</h2>
          <p className="mb-4 indent-6">
            A junção dos números racionais com os números irracionais resulta em um novo conjunto numérico chamado <strong>conjunto dos números reais</strong>, representado pelo símbolo R.
          </p>

          <DialogarEConhecer iconSrc={publicUrl('images/selo-dialogar-conhecer.png')}>
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
          </DialogarEConhecer>

          <Pagination currentPage={15} expandToBookColumn />

          <p className="mb-4 indent-6">
            Representação dos números reais na reta numérica. O conjunto dos números reais pode ser associado ao conjunto dos pontos de uma reta, denominada <strong>reta real</strong>. Ela estabelece uma correspondência um a um entre os pontos da reta e os números reais.
          </p>

          <Pagination currentPage={16} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Potenciação</h2>
          <p className="mb-4 indent-6">
            Podemos representar multiplicações de fatores iguais de modo mais simples usando a operação matemática denominada <strong>potenciação</strong>.
          </p>

          <OrganizeAsIdeias iconSrc={publicUrl('images/selo-organize-ideias.png')}>
            <p className="mb-2">A <strong>potenciação</strong> é a operação que indica uma multiplicação de fatores iguais.</p>
            <ul className="list-disc ml-6">
              <li>Toda potência de base positiva é positiva.</li>
              <li>A potência de base negativa será positiva, se o expoente for par; negativa, se o expoente for ímpar.</li>
            </ul>
          </OrganizeAsIdeias>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
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

          <Pagination currentPage={17} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Propriedades da potenciação</h2>
          <p className="mb-4 indent-6"><strong>I. Multiplicação de potências de mesma base:</strong> Para multiplicar potências de mesma base, conserva-se a base e somam-se os expoentes.</p>
          <p className="mb-4 indent-6"><strong>II. Divisão de potências de mesma base:</strong> Para dividir potências de mesma base, sendo esta diferente de zero, conserva-se a base e subtraem-se os expoentes.</p>
          <p className="mb-4 indent-6"><strong>III. Potência de potência:</strong> Para calcular uma potência de potência, conserva-se a base e multiplicam-se os expoentes.</p>
          <p className="mb-4 indent-6"><strong>IV. Propriedade distributiva da potenciação em relação à multiplicação:</strong> A potência de um produto de dois ou mais números pode ser obtida elevando-se cada fator ao expoente indicado.</p>
          <p className="mb-4 indent-6"><strong>V. Propriedade distributiva da potenciação em relação à divisão:</strong> A potência de um quociente de dois números pode ser obtida elevando-se cada número ao expoente indicado.</p>

          <Pagination currentPage={18} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Potências com expoente inteiro negativo</h2>
          <p className="mb-4 indent-6">
            Observe agora o cálculo de uma potência de expoente inteiro negativo e base fracionária.
          </p>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
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

          <Pagination currentPage={19} expandToBookColumn />

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Notação científica</h2>
          <p className="mb-4 indent-6">
            Os números expressos em notação científica são escritos como um produto de dois números reais, sendo um deles um número entre 1 e 10 e o outro, uma potência de base 10 com expoente inteiro. Essa notação geralmente é utilizada para representar números com muitos algarismos, como distâncias em anos-luz, massas de partículas atômicas, entre outros.
          </p>

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q24')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={20} expandToBookColumn />

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

          <h2 className="text-2xl font-bold text-orange-500 mb-4 mt-6">Radiciação</h2>
          <p className="mb-4 indent-6">
            Anteriormente, você estudou como calcular raízes exatas e aproximadas de números racionais não negativos. Que tal aprofundar mais seus conhecimentos sobre radiciação?
          </p>

          <Pagination currentPage={21} expandToBookColumn />

          <OrganizeAsIdeias iconSrc={publicUrl('images/selo-organize-ideias.png')}>
            <ul className="list-disc ml-6">
              <li>No conjunto real (R), só existe raiz de índice par se o radicando for positivo ou zero.</li>
              <li>No conjunto real (R), sempre existe raiz de índice ímpar, independentemente de o radicando ser negativo ou positivo.</li>
            </ul>
          </OrganizeAsIdeias>

          <Pagination currentPage={22} expandToBookColumn />

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('ch1_q27')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q28')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <QuestionRenderer
              question={getQuestionById('ch1_q29')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <h3 className="text-xl font-bold text-blue-600 mb-4 mt-6">Potência com expoente fracionário</h3>
          <p className="mb-4 indent-6">
            É possível calcular raízes exatas de um número efetuando a fatoração completa do radicando e dividindo o índice e o expoente dos fatores do radicando por um mesmo número diferente de zero.
          </p>

          <Pagination currentPage={23} expandToBookColumn />

          <AgoraEComVoce iconSrc={publicUrl('images/selo-agora-e-com-voce.png')}>
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

          <Pagination currentPage={24} expandToBookColumn />

          <ExploreSeusConhecimentos iconSrc={publicUrl('images/selo-explore-conhecimentos.png')}>
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

          <Pagination currentPage={25} expandToBookColumn />

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

          <Pagination currentPage={26} expandToBookColumn />

          <MergulhandoFundo iconSrc={publicUrl('images/selo-mergulhando-fundo.png')}>
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

          <NesteCapituloVoceEstudou iconSrc={publicUrl('images/selo-neste-capitulo-voce-estudou.png')}>
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