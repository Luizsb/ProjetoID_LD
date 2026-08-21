// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"Fim do acordo nuclear entre EUA e Rússia","startPage":1,"pageCount":8,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}

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
import AgoraEComVoce from '@player/components/AgoraEComVoce';
import OrganizeAsIdeias from '@player/components/OrganizeAsIdeias';
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

const chapterQuestions: Question[] = [
  {
    id: 'p2_q1',
    type: 'text-input',
    number: 1,
    question: 'Qual é o menor número natural? E o maior?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'O menor número natural é o zero. Não existe maior número natural, pois todo número natural possui um sucessor.',
  },
  {
    id: 'p3_q2',
    type: 'text-input',
    number: 2,
    question: 'Todo número inteiro possui um antecessor e um sucessor inteiro?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Sim, todo número inteiro possui um antecessor e um sucessor inteiro. Por exemplo, o antecessor de 0 é –1, e seu sucessor é 1.',
  },
  {
    id: 'p3_q3',
    type: 'text-input',
    number: 3,
    question: 'Qual é o menor número inteiro? E o maior?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Uma vez que todo número inteiro possui um antecessor e um sucessor inteiro, não é possível determinar o maior nem o menor número inteiro.',
  },
  {
    id: 'p3_q4',
    type: 'text-input',
    number: 4,
    question: 'Por que, na definição do conjunto dos números racionais, aparece como condição que <strong>b</strong> ∈ Z*?',
    placeholder: 'Digite aqui...',
    correctAnswer: 'Tem-se como condição que b deve ser um número inteiro diferente de zero porque não existe divisão por zero.',
  },
  {
    id: 'p5_q1',
    type: 'text-input',
    number: 1,
    question: 'Determine a fração geratriz das dízimas periódicas simples a seguir. Sempre que possível, simplifique as frações obtidas.',
    subQuestions: [
      { letter: 'a', question: '0,777… =', placeholder: 'Digite aqui...', correctAnswer: '7/9' },
      { letter: 'b', question: '0,151515… =', placeholder: 'Digite aqui...', correctAnswer: '15/99 = 5/33' },
      { letter: 'c', question: '0,102102… =', placeholder: 'Digite aqui...', correctAnswer: '102/999 = 34/333' },
      { letter: 'd', question: '0,20252025… =', placeholder: 'Digite aqui...', correctAnswer: '2025/9999 = 225/1111' }
    ]
  },
  {
    id: 'p5_q2',
    type: 'text-input',
    number: 2,
    question: 'Observe, a seguir, como determinar a fração geratriz de uma dízima periódica simples com a parte inteira diferente de zero. Em seguida, resolva os itens propostos.',
    subQuestions: [
      { letter: 'a', question: '1,333… =', placeholder: 'Digite aqui...', correctAnswer: '4/3' },
      { letter: 'b', question: '4,132132… =', placeholder: 'Digite aqui...', correctAnswer: '1376/333' }
    ]
  },
  {
    id: 'p6_q1',
    type: 'text-input',
    number: 1,
    question: 'Determine a fração geratriz das seguintes dízimas periódicas compostas. Sempre que possível, simplifique as frações obtidas.',
    subQuestions: [
      { letter: 'a', question: '0,6888… =', placeholder: 'Digite aqui...', correctAnswer: '62/90 = 31/45' },
      { letter: 'b', question: '0,23666… =', placeholder: 'Digite aqui...', correctAnswer: '213/900 = 71/300' },
      { letter: 'c', question: '2,051717… =', placeholder: 'Digite aqui...', correctAnswer: '5078/2475' }
    ]
  },
  {
    id: 'p7_q1',
    type: 'text-input',
    number: 1,
    question: 'Escreva os números a seguir na região adequada do diagrama anterior.',
    correctAnswer: 'Respostas no diagrama.',
  },
  {
    id: 'p7_q2',
    type: 'fill-blanks',
    number: 2,
    question: 'Complete as sentenças com o símbolo ∈ (pertence) ou ∉ (não pertence), indicando se o número faz parte ou não do conjunto numérico indicado.',
    items: [
      { letter: 'a', fragments: ['–1,2 ', ' Q₊'], correctAnswers: ['∉'] },
      { letter: 'b', fragments: ['0 ', ' Q₊'], correctAnswers: ['∈'] },
      { letter: 'c', fragments: ['0 ', ' Q*₊'], correctAnswers: ['∉'] },
      { letter: 'd', fragments: ['−1/2 ', ' Q*₋'], correctAnswers: ['∈'] },
      { letter: 'e', fragments: ['0,1 ', ' Q*₋'], correctAnswers: ['∉'] },
      { letter: 'f', fragments: ['–0,8 ', ' Q*₋'], correctAnswers: ['∈'] },
      { letter: 'g', fragments: ['1,3241 ', ' Q₊'], correctAnswers: ['∈'] },
      { letter: 'h', fragments: ['3/8 ', ' Q*₋'], correctAnswers: ['∉'] },
      { letter: 'i', fragments: ['0 ', ' Q*'], correctAnswers: ['∉'] },
    ],
  },
  {
    id: 'p8_q3',
    type: 'text-input',
    number: 3,
    question: 'Resolva as expressões a seguir e registre os resultados na forma fracionária e na forma decimal.',
    subQuestions: [
      { letter: 'a', question: '2 – 0,2 – 0,2...', placeholder: 'Digite aqui...', correctAnswer: '107/90' },
      { letter: 'b', question: '1/3 + 0,333... + 0,356...', placeholder: 'Digite aqui...', correctAnswer: '1333/900' },
      { letter: 'c', question: '2/3 + 5/2 - 3/5', placeholder: 'Digite aqui...', correctAnswer: '77/30' },
      { letter: 'd', question: '2³ + 5/2 - 3/5', placeholder: 'Digite aqui...', correctAnswer: '99/10' }
    ]
  },
  {
    id: 'p8_q1_reta',
    type: 'text-input',
    number: 1,
    question: 'A reta numérica a seguir representa a avenida principal de uma cidade. Na reta, o ponto de referência O localiza um prédio comercial, e os pontos A, B, C e D indicam, cada um, a posição de uma casa. Sabendo que a distância entre dois inteiros consecutivos é sempre a mesma, determine a fração que representa a posição de cada casa.',
    placeholder: 'Digite aqui...',
    correctAnswer: 'A = -6/9 = -2/3; B = -2/9; C = 3/9 = 1/3; D = 8/9'
  },
  {
    id: 'p8_q2_reta',
    type: 'text-input',
    number: 2,
    question: 'Desenhe uma reta numérica e represente nela os seguintes números racionais: –3,5; –1,25; 3,75; 2/3; -1/4; 1,45; 10/4; 2; -1',
    placeholder: 'Descreva ou desenhe aqui...',
    correctAnswer: 'Representação na reta numérica.'
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
          badge="CAPÍTULO"
          chapterNumber={1}
          chapterTitle="Fim do acordo nuclear entre EUA e Rússia"
        />

        <Pagination currentPage={START_PAGE} />

        <Poster
          imageSrc={capAsset('images/page_1_img_462_150.png')}
          creditLine1=""
          creditLine2="Imagem extraída do PDF."
          alt="Imagem extraída do PDF."
        />

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
                  Explore as informações do infográfico para introduzir a importância dos números na compreensão de dados reais e históricos.
                </p>
              }
            />
          </div>

          <p className="mb-4 indent-6">
            Você já se deu conta da variedade de números que utilizamos no dia a dia? Eles estão presentes, por exemplo, em grande parte das informações que consumimos na internet.
          </p>

          <div className="bloco-leitura__linha">
            <p className="mb-4 indent-6">
              Leia, a seguir, o trecho de uma reportagem sobre o fim do tratado New START, um acordo entre EUA e Rússia, encerrado em 2026, que limitava a quantidade de <strong>ogivas nucleares</strong> pertencentes a ambos os países. Durante a leitura, atente-se ao uso recorrente dos números para a comunicação, buscando identificar o significado de cada um deles na análise das informações.
            </p>
            <div className="caixa-destaque bg-gray-100 p-4 rounded-lg ml-4 mb-4">
              <p><strong>Ogiva nuclear</strong> é um dispositivo explosivo que utiliza reações físicas para liberar grandes quantidades de energia em um curto espaço de tempo.</p>
            </div>
          </div>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6 text-center">Fim do acordo nuclear entre EUA e Rússia</h3>
          <p className="mb-4 text-center">Os EUA e a Rússia têm, juntos, a maior parte do estoque de ogivas nucleares do mundo.</p>
          <p className="mb-4 font-bold text-center">Arsenais dos 5 países com mais ogivas nucleares no mundo</p>
          
          <div className="flex flex-col gap-2 mb-6">
            <p><strong>1. Rússia:</strong> 5 459*</p>
            <p><strong>2. EUA:</strong> 5 177</p>
            <p><strong>3. China</strong></p>
            <p><strong>4. França</strong></p>
            <p><strong>5. Reino Unido</strong></p>
            <p className="text-sm text-gray-600">*quantidade de ogivas nucleares, segundo Instituto Internacional de Pesquisa da Paz de Estocolmo (Sipri) em janeiro de 2025.</p>
          </div>

          <p className="mb-4 indent-6">
            Após o término do tratado New START, expirado em fevereiro de 2026, os países seguem sem um acordo que limite seus estoques, gerando certa instabilidade na política global. Veja, a seguir, os arsenais estimados para ambos os países.
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
              </div>
            </article>
          </div>

          <p className="infografico-arsenais__fonte mt-4 text-sm">
            G1. Veja países com armas nucleares: infográfico. <em>G1</em>, 5 fev. 2026. Disponível em: https://g1.globo.com. Acesso em: 24 jun. 2026.
          </p>

          <div className="caixa-hipotese caixa-atividade-leitura mt-6">
            <p>
              <span className="caixa-atividade-leitura__seta" aria-hidden>»</span>
              Sublinhe todos os números que você encontrar no texto e identifique dois exemplos de números naturais e dois exemplos de números racionais que não são naturais.
            </p>
          </div>

          <Pagination currentPage={2} expandToBookColumn />

          <p className="mb-4 indent-6">
            Neste capítulo, você aprofundará seus estudos sobre os conjuntos numéricos e conhecerá dois novos conjuntos: o <strong>conjunto dos números irracionais</strong> e o <strong>conjunto dos números reais</strong>. Também estudará, de forma mais aprofundada, a operação da potenciação, suas propriedades e sua operação inversa, a radiciação.
          </p>

          <h2 className="titulo-sas titulo-sas--laranja mb-4 mt-6">Conjuntos numéricos</h2>
          <p className="mb-4 indent-6">
            Os conjuntos numéricos são agrupamentos de números que compartilham características em comum. Entre eles, destacam-se o conjunto dos números naturais, o dos inteiros e o dos racionais.
          </p>
          <p className="mb-4 indent-6">
            A seguir, veja quais são as principais características que definem cada um desses conjuntos.
          </p>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Números naturais e números inteiros</h3>
          <p className="mb-4 indent-6">
            O <strong>conjunto dos números naturais</strong> é indicado pelo símbolo N.
          </p>
          <p className="mb-4 text-center font-mono">N = {'{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...}'}</p>
          <p className="mb-4 indent-6">
            Já o <strong>conjunto dos números naturais não nulos</strong> é indicado pelo símbolo N*, pois convencionou-se o uso do asterisco (*) para indicar a exclusão do número zero de qualquer conjunto numérico.
          </p>
          <p className="mb-4 text-center font-mono">N* = {'{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...}'}</p>
          <p className="mb-4 indent-6">
            Acrescentando os números inteiros negativos ao conjunto dos números naturais, forma-se o <strong>conjunto dos números inteiros</strong>, indicado pelo símbolo Z.
          </p>
          <p className="mb-4 text-center font-mono">Z = {'{..., –6, –5, –4, –3, –2, –1, 0, 1, 2, 3, 4, 5, 6, ...}'}</p>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Números racionais</h3>
          <p className="mb-4 indent-6">
            O número racional é definido como todo número que pode ser escrito na forma de fração na qual o numerador e o denominador são números inteiros, sendo o denominador diferente de zero.
          </p>
          <p className="mb-4 indent-6">
            Em outras palavras, são racionais os números que são razões (quocientes) de dois números inteiros. Simbolicamente, o conjunto dos números racionais, indicado pelo símbolo Q, é representado da seguinte maneira:
          </p>
          <p className="mb-4 text-center font-mono">Q = {'{ x | x = a/b, sendo a ∈ Z e b ∈ Z* }'}</p>

          <DialogarEConhecer iconSrc={capAsset('images/selo-dialogar-conhecer.png')}>
            <QuestionRenderer
              question={getQuestionById('p2_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </DialogarEConhecer>

          <Pagination currentPage={3} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('p3_q2'),
                    getQuestionById('p3_q3'),
                    getQuestionById('p3_q4'),
                  ]}
                />
              }
            />
          </div>

          <QuestionRenderer
            question={getQuestionById('p3_q2')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('p3_q3')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={getQuestionById('p3_q4')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Transformação de frações racionais em números decimais</h3>
          <p className="mb-4 indent-6">
            Dado um número racional <span className="fracao"><span>a</span><span>b</span></span>, com b ≠ 0, a representação decimal desse número é obtida dividindo-se <strong>a</strong> por <strong>b</strong>.
          </p>
          <p className="mb-4 indent-6">Veja alguns exemplos:</p>
          
          <div className="flex flex-col md:flex-row justify-around items-center mb-6 gap-4">
            <div>
              <p>a) <span className="fracao"><span>5</span><span>2</span></span> = 2,5</p>
            </div>
            <div>
              <p>b) <span className="fracao"><span>2</span><span>3</span></span> = 0,666... ou 0,<span className="dizima-barra">6</span></p>
            </div>
            <div>
              <p>c) <span className="fracao"><span>14</span><span>11</span></span> = 1,272727... ou 1,<span className="dizima-barra">27</span></p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-sm mb-6">
            <img src={capAsset('images/page_3_img_44_574.png')} alt="Biscoitos" className="w-32 object-contain" />
            <p className="text-sm">
              Nicole notou que sobraram cinco biscoitos no pote da cozinha. Por ordem de sua mãe, ela terá que dividir esses biscoitos igualmente entre ela e seu irmão. Ao fazer a divisão de 5 por 2, Nicole viu que é possível obter a transformação da fração em número decimal, como visto no exemplo anterior. Assim, cada irmão ficará com 2,5 biscoitos (dois biscoitos e meio).
            </p>
          </div>

          <Pagination currentPage={4} expandToBookColumn />

          <p className="mb-4 indent-6">
            Como pôde ser observado nos exemplos anteriores, é possível que as frações tenham representações decimais exatas ou não exatas. Na representação decimal não exata, um algarismo ou um grupo de algarismos repete-se periodicamente. Números com essas características são denominados <strong>dízimas periódicas</strong>.
          </p>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Dízima periódica</h3>
          <p className="mb-4 indent-6">Em uma dízima periódica, é utilizada a seguinte nomenclatura.</p>

          <div className="dizima-nomenclatura mb-6">
            <p className="dizima-nomenclatura__item">
              <span className="dizima-nomenclatura__seta" aria-hidden>↘</span>
              <span>
                <strong className="dizima-nomenclatura__termo">Parte inteira (I)</strong>
                {' — '}Algarismo ou grupo de algarismos que antecede a vírgula.
              </span>
            </p>
            <p className="dizima-nomenclatura__item">
              <span className="dizima-nomenclatura__seta" aria-hidden>↘</span>
              <span>
                <strong className="dizima-nomenclatura__termo">Período (P)</strong>
                {' — '}Algarismo ou grupo de algarismos que se repete indefinidamente na parte decimal (após a vírgula).
              </span>
            </p>
            <CaixaNota iconSrc={capAsset('images/selo-nota.png')}>
              <p>Uma dízima periódica pode ter ou não a parte não periódica.</p>
            </CaixaNota>
            <p className="dizima-nomenclatura__item">
              <span className="dizima-nomenclatura__seta" aria-hidden>↘</span>
              <span>
                <strong className="dizima-nomenclatura__termo">Parte não periódica (N)</strong>
                {' — '}Algarismo ou grupo de algarismos que aparece logo após a vírgula e que não compõe o período.
              </span>
            </p>
          </div>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Dízimas periódicas simples</h3>
          <p className="mb-4 indent-6">
            São chamadas de dízimas periódicas simples aquelas que não apresentam a parte não periódica (<strong>N</strong>).
          </p>
          <p className="mb-2">Exemplos:</p>
          <div className="flex flex-col md:flex-row gap-8 mb-6 ml-6">
            <div>
              <p><strong>0,666...</strong></p>
              <p>I = 0</p>
              <p>P = 6</p>
            </div>
            <div>
              <p><strong>1,272727...</strong></p>
              <p>I = 1</p>
              <p>P = 27</p>
            </div>
          </div>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Dízimas periódicas compostas</h3>
          <p className="mb-4 indent-6">
            São chamadas de dízimas periódicas compostas aquelas que apresentam a parte não periódica (<strong>N</strong>).
          </p>
          <p className="mb-2">Exemplos:</p>
          <div className="flex flex-col md:flex-row gap-8 mb-6 ml-6">
            <div>
              <p><strong>1,3888...</strong></p>
              <p>I = 1</p>
              <p>N = 3</p>
              <p>P = 8</p>
            </div>
            <div>
              <p><strong>0,10242424...</strong></p>
              <p>I = 0</p>
              <p>N = 10</p>
              <p>P = 24</p>
            </div>
          </div>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Fração geratriz de uma dízima periódica</h3>
          <p className="mb-4 indent-6">
            Toda dízima periódica é um número racional, pois pode ser escrita na forma de fração. Essa fração é chamada de <strong>geratriz da dízima periódica</strong>.
          </p>
          <p className="mb-4 indent-6">
            É possível obter a fração geratriz de uma dízima periódica simples utilizando os princípios da igualdade. Observe como se dá a aplicação desse processo a seguir.
          </p>
          
          <p className="mb-2 font-bold">Exemplos:</p>
          <p className="mb-2">I. Determine a fração geratriz da dízima periódica simples 0,222…</p>
          <p className="mb-2 ml-4">Considerando x = 0,222… e multiplicando os dois membros dessa igualdade por 10, tem-se:</p>
          <p className="mb-2 ml-8 font-mono">10x = 2,222…</p>
          <p className="mb-2 ml-4">Subtraindo, membro a membro, os termos dessas igualdades, chega-se a:</p>
          <div className="ml-8 font-mono mb-4">
            <p>10x = 2,222...</p>
            <p>– (x = 0,222...)</p>
            <hr className="w-32 border-gray-400 my-1" />
            <p>9x = 2</p>
            <p>x = 2/9</p>
          </div>

          <Pagination currentPage={5} expandToBookColumn />

          <p className="mb-2">II. Determine a fração geratriz da dízima periódica simples 0,103103…</p>
          <p className="mb-2 ml-4">Considerando x = 0,103103103…, observe que o período dessa dízima (103) possui três algarismos.</p>
          <p className="mb-2 ml-4"><strong>1.</strong> Inicialmente, multiplicam-se os dois membros da igualdade por 1 000. Assim, tem-se:</p>
          <p className="mb-2 ml-8 font-mono">1 000x = 103,103103103…</p>
          <p className="mb-2 ml-4"><strong>2.</strong> Subtraindo, membro a membro, os termos dessas igualdades, chega-se a:</p>
          <div className="ml-8 font-mono mb-6">
            <p>1000x = 103,103103...</p>
            <p>– (x = 0,103103...)</p>
            <hr className="w-40 border-gray-400 my-1" />
            <p>999x = 103</p>
            <p>x = 103/999</p>
          </div>

          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <p className="organize-ideias__titulo">Regra prática</p>
            <p>
              Portanto, para determinar a fração geratriz de uma dízima periódica simples (de parte inteira nula), escrevem-se, no numerador da fração, o período e, no denominador, um número formado por tantos noves quantos forem os algarismos do período.
            </p>
          </OrganizeAsIdeias>

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('p5_q1'),
                    getQuestionById('p5_q2'),
                  ]}
                />
              }
            />
          </div>

          <AgoraEComVoce iconSrc={capAsset('images/selo-agora-e-com-voce.png')}>
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
          </AgoraEComVoce>

          <Pagination currentPage={6} expandToBookColumn />

          <p className="mb-4 indent-6">
            Para obter a fração geratriz de uma dízima periódica composta, também é possível utilizar os princípios da igualdade. Observe como se dá a aplicação desse processo a seguir.
          </p>

          <p className="mb-2 font-bold">Exemplo:</p>
          <p className="mb-2">I. Determine a fração geratriz da dízima periódica composta 0,1434343…</p>
          <p className="mb-2 ml-4">Essa dízima periódica apresenta uma parte decimal não periódica (<strong>1</strong>) e um período com dois algarismos (<strong>43</strong>).</p>
          <p className="mb-2 ml-4"><strong>1.</strong> Inicialmente, transforma-se a parte decimal não periódica em parte inteira. Para isso, multiplicam-se os dois membros da igualdade x = 0,1434343… por 10, obtendo-se:</p>
          <p className="mb-2 ml-8 font-mono">10x = 1,434343…</p>
          <p className="mb-2 ml-4"><strong>2.</strong> Em seguida, multiplicam-se os dois membros da igualdade anterior por 100, obtendo-se:</p>
          <p className="mb-2 ml-8 font-mono">1 000x = 143,434343…</p>
          <p className="mb-2 ml-4"><strong>3.</strong> Por fim, subtraindo, membro a membro, os termos dessas igualdades chega-se a:</p>
          <div className="ml-8 font-mono mb-6">
            <p>1000x = 143,434343...</p>
            <p>– (10x = 1,434343...)</p>
            <hr className="w-48 border-gray-400 my-1" />
            <p>990x = 142</p>
            <p>x = 142/990 = 71/495</p>
          </div>

          <OrganizeAsIdeias iconSrc={capAsset('images/selo-organize-ideias.png')}>
            <p className="organize-ideias__titulo">Regra prática</p>
            <p>
              Para determinar a fração geratriz de uma dízima periódica composta (de parte inteira nula), escreve-se, no numerador da fração, o número formado pela parte decimal não periódica seguido do período, menos o número formado pela parte decimal não periódica. No denominador, escreve-se um número formado por tantos noves quantos forem os algarismos do período seguido de tantos zeros quantos forem os algarismos da parte decimal não periódica.
            </p>
          </OrganizeAsIdeias>

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('p6_q1'),
                  ]}
                />
              }
            />
          </div>

          <AgoraEComVoce iconSrc={capAsset('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('p6_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={7} expandToBookColumn />

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Subconjuntos dos números racionais</h3>
          <p className="mb-4 indent-6">
            Além dos números naturais (N) e dos números inteiros (Z), também são subconjuntos especiais dos números racionais (Q) os conjuntos dos:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li>números racionais não nulos: Q* = {'{ x | x ∈ Q, x ≠ 0 }'}</li>
            <li>números racionais não negativos: Q₊ = {'{ x | x ∈ Q, x ≥ 0 }'}</li>
            <li>números racionais positivos: Q*₊ = {'{ x | x ∈ Q, x > 0 }'}</li>
            <li>números racionais não positivos: Q₋ = {'{ x | x ∈ Q, x ≤ 0 }'}</li>
            <li>números racionais negativos: Q*₋ = {'{ x | x ∈ Q, x < 0 }'}</li>
          </ul>

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Representação dos números racionais em diagrama</h3>
          <p className="mb-4 indent-6">
            Os números racionais podem ser escritos na forma inteira, na forma decimal (decimal exato ou dízima periódica) ou na forma fracionária com numerador e denominador inteiros, sendo o denominador diferente de zero.
          </p>
          <p className="mb-4 indent-6">
            A representação desses números em diagrama permite visualizar as relações entre os conjuntos dos números naturais, dos números inteiros e dos números racionais. No diagrama a seguir, a região azul representa o conjunto dos números naturais (N); as regiões azul e verde, juntas, representam o conjunto dos números inteiros (Z); e as regiões azul, verde e rosa, juntas, representam o conjunto dos números racionais (Q).
          </p>

          <div className="flex justify-center my-6">
            <img src={capAsset('images/page_7_img_49_504.png')} alt="Diagrama dos conjuntos numéricos" className="max-w-full" />
          </div>

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('p7_q1'),
                    getQuestionById('p7_q2'),
                  ]}
                />
              }
            />
          </div>

          <AgoraEComVoce iconSrc={capAsset('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('p7_q1')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
              hideInput
            />
            <div className="grade-racionais mb-6" aria-label="Números para classificar no diagrama">
              <span className="grade-racionais__item">3</span>
              <span className="grade-racionais__item">−1,2</span>
              <span className="grade-racionais__item">0</span>
              <span className="grade-racionais__item">1/5</span>
              <span className="grade-racionais__item">0,54</span>
              <span className="grade-racionais__item">15/3</span>
              <span className="grade-racionais__item">7,04</span>
              <span className="grade-racionais__item">6</span>
              <span className="grade-racionais__item">4</span>
              <span className="grade-racionais__item">–3</span>
              <span className="grade-racionais__item">–2,5</span>
              <span className="grade-racionais__item">−2</span>
              <span className="grade-racionais__item">−16</span>
            </div>
            <QuestionRenderer
              question={getQuestionById('p7_q2')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

          <Pagination currentPage={8} expandToBookColumn />

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('p8_q3'),
                  ]}
                />
              }
            />
          </div>

          <QuestionRenderer
            question={getQuestionById('p8_q3')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h3 className="titulo-sas titulo-sas--azul mb-4 mt-6">Representação dos números racionais na reta numérica</h3>
          <p className="mb-4 indent-6">
            Os números racionais podem ser representados em uma reta. Para isso, têm-se:
          </p>
          <ul className="list-disc ml-8 mb-6">
            <li>um ponto O, denominado <strong>origem</strong>, associado ao número <strong>zero</strong>;</li>
            <li>um <strong>sentido positivo</strong>, indicado pela seta;</li>
            <li>uma <strong>unidade de medida</strong>.</li>
          </ul>

          <div className="flex justify-center my-6">
            <img src={capAsset('images/page_8_img_54_382.png')} alt="Reta numérica" className="max-w-full" />
          </div>

          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <TeacherAnswers
                  questions={[
                    getQuestionById('p8_q1_reta'),
                    getQuestionById('p8_q2_reta'),
                  ]}
                />
              }
            />
          </div>

          <AgoraEComVoce iconSrc={capAsset('images/selo-agora-e-com-voce.png')}>
            <QuestionRenderer
              question={getQuestionById('p8_q1_reta')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
            <div className="flex justify-center my-4">
              <img src={capAsset('images/page_8_img_279_540.png')} alt="Reta numérica com pontos A, B, C, D" className="max-w-full" />
            </div>
            <QuestionRenderer
              question={getQuestionById('p8_q2_reta')}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showResults={showTeacherView}
            />
          </AgoraEComVoce>

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