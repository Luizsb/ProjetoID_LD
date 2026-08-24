// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"CAPÍTULO 5","startPage":1,"pageCount":24,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useState } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import AgoraVoceJaSabe from '@player/components/AgoraVoceJaSabe';
import CriteriosAvaliacao from '@player/components/CriteriosAvaliacao';
import Footer from '@player/components/Footer';
import { useUserAnswers } from '@player/hooks/useUserAnswers';
import { usePagination } from '@player/hooks/usePagination';
import { useScrollPosition } from '@player/hooks/useScrollPosition';
import { Question } from '@player/types/questions';

function capAsset(pathFromCapitulos: string): string {
  return encodeURI(
    withBase(
      `conteudo/marcas/GEEKIE/livros/GEE_EFAI_01_26_2S_LV_HIS_AL_C5/capitulos/${pathFromCapitulos.replace(/^\/+/, '')}`,
    ),
  );
}

const textQuestion = (id: string, question: string, correctAnswer?: string, options?: any): Question => ({
  id,
  type: 'text-input',
  question,
  placeholder: 'Digite aqui...',
  correctAnswer,
  ...options
});

function BookCap01() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination(1);
  const [showTeacherView] = useState(false);

  useScrollPosition();

  return (
    <div className="marca-geekie min-h-screen w-full bg-gray-200">
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Header marca="geekie" chapterNumber={5} chapterTitle="Aprendendo a conviver" />
        
        <Pagination currentPage={1} />
        
        <Poster 
          imageSrc={capAsset('images/page_1_img_64_134.png')} 
          creditLine1="" 
          creditLine2="Imagem extraída do PDF." 
        />
        
        <div className="p-8 md:p-12">
          
          {/* Página 2 */}
          <Pagination currentPage={2} expandToBookColumn />
          <h3 className="mb-6 text-xl font-bold text-[#80298F]">NESTE CAPÍTULO VOCÊ IRÁ:</h3>
          <ul className="list-disc marker:text-[#80298F] ml-6 mb-8 space-y-4 text-gray-800">
            <li>NOMEAR OS ESPAÇOS QUE FREQUENTA E OS PROFISSIONAIS PRESENTES EM CADA UM DELES</li>
            <li>EXPLICAR AS REGRAS E OS HÁBITOS DE CONVIVÊNCIA QUE ORGANIZAM OS AMBIENTES QUE DIVIDIMOS COM AS PESSOAS</li>
            <li>RELACIONAR O QUE CADA PESSOA FAZ AOS ESPAÇOS ONDE VIVE OU TRABALHA</li>
            <li>DIFERENCIAR AS RESPONSABILIDADES E FORMAS DE COOPERAÇÃO EM CASA, NA ESCOLA E EM OUTROS ESPAÇOS DE USO COLETIVO</li>
            <li>REFLETIR SOBRE ATITUDES DE RESPEITO E COLABORAÇÃO NOS ESPAÇOS QUE FREQUENTA</li>
          </ul>
          <div className="flex justify-center mb-8">
            <img src={capAsset('images/page_2_img_13_133.png')} alt="Ilustração de crianças" className="w-full max-w-2xl rounded-xl" />
          </div>

          {/* Página 3 */}
          <Pagination currentPage={3} expandToBookColumn />
          <h3 className="mb-4 text-2xl font-bold text-[#80298F] uppercase">Missão 1 Aprender atitudes que contribuem para uma boa convivência</h3>
          <p className="mb-6 indent-6 text-gray-800">
            NESTA MISSÃO, VOCÊ VAI APRENDER A PRATICAR COM RESPEITO REGRAS DE CONVIVÊNCIA NOS DIFERENTES LUGARES QUE FREQUENTA. QUAIS SÃO AS REGRAS DE CONVIVÊNCIA NA SUA CASA E NA SUA ESCOLA? VOCÊ E SEUS AMIGOS CRIAM REGRAS NA HORA DE BRINCAR?
          </p>
          
          <h4 className="mb-4 text-xl font-bold text-[#80298F]">PARA COMEÇAR</h4>
          <h5 className="mb-4 font-bold text-gray-800">PALAVRAS QUE DEMONSTRAM RESPEITO</h5>
          <p className="mb-4 text-gray-800"><strong>1</strong> OBSERVE A TIRINHA E CONVERSE COM SEUS COLEGAS SOBRE AS PERGUNTAS A SEGUIR.</p>
          
          <div className="flex flex-col items-center mb-8">
            <img src={capAsset('images/page_3_img_128_401.png')} alt="Tirinha Armandinho" className="w-full max-w-2xl rounded-xl" />
            <p className="text-xs text-gray-500 mt-2">Armandinho, de Alexandre Beck</p>
          </div>

          <QuestionRenderer
            question={textQuestion('p3_q1a', 'A) EM QUAIS MOMENTOS VOCÊ USA AS PALAVRAS DA TIRINHA?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p3_q1b', 'B) COMO VOCÊ SE SENTE QUANDO AS PESSOAS USAM ESSAS PALAVRAS COM VOCÊ?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p3_q1c', 'C) POR QUE VOCÊ ACHA QUE É IMPORTANTE FALAR ESSAS PALAVRAS?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <p className="mb-4 mt-8 text-gray-800"><strong>2</strong> LEIA A CHARADA E ADIVINHE A PALAVRA. FAÇA DUPLA COM UM COLEGA. DEPOIS, INVERTAM OS PAPÉIS.</p>
          <p className="mb-4 font-bold text-gray-800">O QUE É O QUE É:</p>
          <ul className="list-disc marker:text-[#80298F] ml-6 mb-8 space-y-2 text-gray-800">
            <li>QUANDO QUERO ALGO, MAS PRECISO MOSTRAR EDUCAÇÃO, COMEÇO DIZENDO…</li>
            <li>QUANDO FAÇO ALGO ERRADO E QUERO RESOLVER, DIGO…</li>
            <li>QUANDO ALGUÉM ME AJUDA E QUERO AGRADECER, FALO…</li>
          </ul>

          {/* Página 4 */}
          <Pagination currentPage={4} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">ESTAÇÃO DOCUMENTAL</h3>
          <h4 className="mb-4 font-bold text-gray-800">ROTINA DE PENSAMENTO VER, PENSAR E PERGUNTAR</h4>
          <p className="mb-6 text-gray-800">OBSERVE COM ATENÇÃO A FOTOGRAFIA A SEGUIR.</p>
          
          <div className="flex flex-col items-center mb-8">
            <img src={capAsset('images/page_4_img_105_344.png')} alt="Pessoas no cinema" className="w-full max-w-2xl rounded-xl" />
            <p className="text-xs text-gray-500 mt-2">Zoriana/stock.adobe.com</p>
          </div>

          <QuestionRenderer
            question={textQuestion('p4_q1', 'VER: O QUE VOCÊ VÊ NESTA IMAGEM?', 'As pessoas estão sentadas, em silêncio, assistindo a um filme no cinema.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p4_q2', 'PENSAR: O QUE VOCÊ PENSA SOBRE ESSE LUGAR?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p4_q3', 'PERGUNTAR: QUE PERGUNTAS VOCÊ TEM AO OBSERVAR ESSA IMAGEM? O QUE VOCÊ GOSTARIA DE SABER SOBRE AS REGRAS DESSE ESPAÇO DE CONVIVÊNCIA?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h4 className="mb-4 mt-8 font-bold text-gray-800">PARA CONVIVER BEM</h4>
          <p className="mb-8 text-gray-800">
            PARA MANTER A BOA CONVIVÊNCIA COM AS PESSOAS, PRECISAMOS SEGUIR ALGUMAS PRÁTICAS, RESPEITANDO OS LUGARES E OS DIFERENTES GRUPOS COM QUEM CONVIVEMOS.
          </p>

          {/* Página 5 */}
          <Pagination currentPage={5} expandToBookColumn />
          <p className="mb-4 text-gray-800"><strong>1</strong> MARQUE UM <strong>X</strong> NAS REGRAS QUE DEVEM SER SEGUIDAS NA SALA DE CINEMA.</p>
          <ul className="list-disc marker:text-[#80298F] ml-6 mb-8 space-y-2 text-gray-800">
            <li>CONVERSAR DURANTE O FILME</li>
            <li>MANTER SILÊNCIO</li>
            <li>ASSISTIR AO FILME</li>
            <li>LEVANTAR A TODO MOMENTO</li>
            <li>USAR O CELULAR DURANTE O FILME</li>
            <li>CONVERSAR SOMENTE APÓS O FILME</li>
          </ul>

          <QuestionRenderer
            question={textQuestion('p5_q1a', 'A) EM QUAIS OUTROS LUGARES VOCÊ PRECISA SEGUIR ALGUMAS DESSAS REGRAS?', 'Biblioteca, hospital, teatro.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p5_q1b', 'B) SE VOCÊ ESTIVESSE ASSISTINDO UM FILME EM CASA, VOCÊ COLOCARIA, TIRARIA OU MUDARIA ALGUMA DESSAS REGRAS? QUAIS?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 6 */}
          <Pagination currentPage={6} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">VIAJANDO NO DOCUMENTO</h3>
          <p className="mb-6 text-gray-800">CONFORME CRESCEMOS, CONHECEMOS NOVAS PESSOAS E CRIAMOS NOVOS VÍNCULOS.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_86_290.png')} alt="Crianças jogando futebol" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">CRIANÇAS <strong>JOGANDO FUTEBOL</strong>.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_86_409.png')} alt="Crianças na aula de artes" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">CRIANÇAS DURANTE <strong>AULA DE ARTES</strong>.</p>
            </div>
          </div>

          <QuestionRenderer
            question={textQuestion('p6_q1a', 'A) QUAIS DAS ATIVIDADES ACIMA VOCÊ COSTUMA PRATICAR?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p6_q1b', 'B) QUE OUTRAS ATIVIDADES VOCÊ FAZ COM SUA FAMÍLIA?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <h4 className="mb-4 mt-8 font-bold text-gray-800">GRUPOS DE CONVIVÊNCIA</h4>
          <p className="mb-6 text-gray-800">FAZEMOS PARTE DE MUITOS GRUPOS DE CONVIVÊNCIA. GERALMENTE, O PRIMEIRO GRUPO COM QUEM CONVIVEMOS É A FAMÍLIA.</p>
          
          <p className="mb-4 text-gray-800"><strong>1</strong> ANALISE AS FOTOGRAFIAS A SEGUIR COM OS SEUS COLEGAS. DEPOIS, LEIA AS LEGENDAS COM ATENÇÃO.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_338_290.png')} alt="Passeio de família" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center"><strong>PASSEIO</strong> DE FAMÍLIA DURANTE VIAGEM NAS FÉRIAS.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_339_409.png')} alt="Estudantes e professora" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">ESTUDANTES E PROFESSORA EM <strong>SALA DE AULA.</strong></p>
            </div>
          </div>

          <QuestionRenderer
            question={textQuestion('p6_q2', '2 FAÇA UM CÍRCULO NOS LUGARES ONDE VOCÊ VAI COM SUA FAMÍLIA. DEPOIS, FAÇA UM RETÂNGULO NOS LUGARES ONDE VOCÊ VAI COM SEUS COLEGAS DA ESCOLA OU COM OS VIZINHOS. (Escreva abaixo)')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <p className="text-sm text-gray-600 mb-8 text-center font-bold">MERCADO - PARQUE - ESCOLA - HOSPITAL - FEIRA LIVRE - CASA DE PARENTES - RUA - PRAÇA</p>

          {/* Página 7 */}
          <Pagination currentPage={7} expandToBookColumn />
          <p className="mb-6 text-gray-800"><strong>3</strong> LIGUE CADA ATIVIDADE AOS GRUPOS DE CONVIVÊNCIA. SE VOCÊ ACHAR QUE COMBINA COM A SUA EXPERIÊNCIA, PODE LIGAR A MESMA ATIVIDADE PARA MAIS DE UM GRUPO.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={capAsset('images/page_7_img_84_131.png')} alt="Brincar" className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="font-bold">BRINCAR</p>
                  <p className="text-sm">BRINCADEIRA AO AR LIVRE.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={capAsset('images/page_7_img_84_263.png')} alt="Almoçar" className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="font-bold">ALMOÇAR</p>
                  <p className="text-sm">ALMOÇO EM FAMÍLIA.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={capAsset('images/page_7_img_84_393.png')} alt="Viajar" className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="font-bold">VIAJAR</p>
                  <p className="text-sm">VIAGEM DE FÉRIAS.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={capAsset('images/page_7_img_84_518.png')} alt="Estudar" className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="font-bold">ESTUDAR</p>
                  <p className="text-sm">ESTUDANTES E PROFESSORA EM SALA DE AULA.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={capAsset('images/page_7_img_84_655.png')} alt="Cursos" className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="font-bold">CURSOS FORA DA ESCOLA</p>
                  <p className="text-sm">CURSO DE ROBÓTICA.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-8 text-xl font-bold text-[#80298F] text-center">
              <p>FAMÍLIA</p>
              <p>AMIGOS</p>
              <p>PROFESSORES</p>
              <p>COLEGAS</p>
            </div>
          </div>

          {/* Página 8 */}
          <Pagination currentPage={8} expandToBookColumn />
          <p className="mb-4 text-gray-800"><strong>4</strong> MARQUE AS OPÇÕES DOS LUGARES QUE VOCÊ NÃO PODE FREQUENTAR SEM ESTAR ACOMPANHADO DE UM ADULTO RESPONSÁVEL.</p>
          <ul className="list-disc marker:text-[#80298F] ml-6 mb-8 space-y-2 text-gray-800">
            <li>A) PRAÇA</li>
            <li>B) ESCOLA</li>
            <li>C) SUPERMERCADO</li>
            <li>D) SEU QUARTO</li>
            <li>E) PARQUE</li>
            <li>F) RUA</li>
            <li>G) CASA DE PARENTES</li>
          </ul>
          <QuestionRenderer
            question={textQuestion('p8_q4h', 'H) OUTROS:')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <QuestionRenderer
            question={textQuestion('p8_q5', '5 EM ALGUM LUGAR A QUE VOCÊ VAI, É PRECISO USAR UNIFORME OU ALGUMA ROUPA DIFERENTE?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p8_q5a', 'POR QUE É NECESSÁRIO USAR UNIFORMES OU ROUPAS ESPECÍFICAS EM ALGUNS LUGARES?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p8_q5b', 'NOS LUGARES QUE VOCÊ FREQUENTA, HÁ PROFISSIONAIS QUE USAM UNIFORME?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p8_q5c', 'OS PROFISSIONAIS DESSES LUGARES PRECISAM USAR ALGUM TIPO DE EQUIPAMENTO?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <div className="flex justify-center mt-8">
            <img src={capAsset('images/page_8_img_122_650.png')} alt="Profissionais com uniforme" className="w-full max-w-md rounded-xl" />
          </div>

          {/* Página 9 */}
          <Pagination currentPage={9} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">COMBINADOS DA MINHA CASA</h3>
          <p className="mb-6 text-gray-800">
            PARA MANTER A ORGANIZAÇÃO E O BOM CONVÍVIO DENTRO DE CASA, TODOS DEVEM SE RESPONSABILIZAR POR UMA TAREFA E RESPEITAR OS COMBINADOS ESTABELECIDOS.
          </p>
          <p className="mb-6 text-gray-800"><strong>1</strong> COM OS SEUS COLEGAS, OBSERVE AS FOTOGRAFIAS A SEGUIR.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_114_197.png')} alt="Menina limpando o quarto" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">MENINA LIMPANDO E ORGANIZANDO O PRÓPRIO QUARTO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_318_197.png')} alt="Irmãos estudando" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">IRMÃOS ESTUDANDO COM O APOIO DOS PAIS.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_114_377.png')} alt="Menino escovando os dentes" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">MENINO ESCOVANDO OS DENTES COM A SUPERVISÃO DA MÃE.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_317_377.png')} alt="Filha ajudando no almoço" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">FILHA AJUDANDO NO PREPARO DO ALMOÇO.</p>
            </div>
          </div>

          <QuestionRenderer
            question={textQuestion('p9_q1a', 'A) QUAIS TAREFAS VOCÊ FAZ OU AJUDA A FAZER EM CASA?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p9_q1b', 'B) QUAIS SÃO AS DIFERENÇAS ENTRE OS PAPÉIS DAS CRIANÇAS E DOS ADULTOS?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p9_q1c', 'C) QUAL A IMPORTÂNCIA DE CUMPRIR OS COMBINADOS DENTRO DE CASA?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 10 */}
          <Pagination currentPage={10} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">COMBINADOS DA ESCOLA</h3>
          <p className="mb-6 text-gray-800">
            NA ESCOLA HÁ REGRAS E COMBINADOS QUE PRECISAM SER SEGUIDOS PARA MANTER A BOA CONVIVÊNCIA E A ORGANIZAÇÃO. ALÉM DISSO, É SEMPRE IMPORTANTE RESPEITAR AS PESSOAS AO NOSSO REDOR.
          </p>
          <p className="mb-6 text-gray-800"><strong>1</strong> MARQUE AS REGRAS DE CONVIVÊNCIA QUE SÃO IMPORTANTES NA ESCOLA.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_10_img_138_199.png')} alt="Participar das aulas" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">PARTICIPAR DAS AULAS, APOIANDO OS COLEGAS.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_10_img_338_198.png')} alt="Respeitar espaços" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">RESPEITAR ESPAÇOS COMPARTILHADOS, COMO O REFEITÓRIO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_10_img_138_343.png')} alt="Comer sem permissão" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">COMER SEM PERMISSÃO EM SALA DE AULA E SEM TER ORGANIZADO OS MATERIAIS EM CIMA DA MESA.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_10_img_338_344.png')} alt="Não acolher colegas" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">NÃO ACOLHER OS COLEGAS DA SALA DE AULA QUANDO ELES ESTIVEREM PRECISANDO.</p>
            </div>
          </div>

          <QuestionRenderer
            question={textQuestion('p10_q1a', 'A) POR QUE É IMPORTANTE CUMPRIR AS REGRAS E OS COMBINADOS NA ESCOLA?', 'É importante porque ajuda a praticar a boa convivência e manter o lugar limpo e organizado, em respeito a todos que convivem nele.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p10_q1b', 'B) ESCOLHA UMA DAS IMAGENS QUE VOCÊ DEIXOU DE MARCAR E CRIE UMA REGRA A PARTIR DA SITUAÇÃO MOSTRADA NA IMAGEM.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p10_q2', '2 ESCREVA UMA TAREFA OU PRÁTICA DE BOA CONVIVÊNCIA QUE VOCÊ FAZ TANTO EM CASA QUANTO NA ESCOLA.', 'Organizar os materiais que uso; manter os lugares que uso limpos; cumprimentar e respeitar as pessoas ao meu redor.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 11 */}
          <Pagination currentPage={11} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">A NOSSA LÍNGUA</h3>
          <h4 className="mb-4 font-bold text-gray-800">PALAVRAS DE GENTILEZA</h4>
          <p className="mb-6 text-gray-800"><strong>1</strong> LEIA O TEXTO A SEGUIR COM MUITA ATENÇÃO.</p>
          
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-200">
            <p className="mb-4">COMO É QUE SE DIZ QUANDO VOCÊ VAI A UMA CONFEITARIA E TE DÃO UM BISCOITO PARA PROVAR?</p>
            <p className="mb-4">E QUANDO VOCÊ QUER QUE ALGUÉM PEGUE UM LIVRO DE UMA ESTANTE QUE AINDA NÃO ALCANÇA, COMO É QUE SE DIZ?</p>
            <p className="mb-4">QUANDO UM URSO TE DEIXA HIBERNAR NA CAVERNA DELE ATÉ CHEGAR A PRIMAVERA, COMO É QUE SE DIZ?</p>
            <p className="mb-4">SE VOCÊ FOR PEDIR LICENÇA AO REI PARA BRINCAR NO LABIRINTO DO CASTELO, COMO É QUE SE DIZ?</p>
          </div>

          <div className="flex justify-center mb-8">
            <img src={capAsset('images/page_11_img_358_220.png')} alt="Ilustração do livro" className="w-full max-w-sm rounded-xl" />
          </div>

          <QuestionRenderer
            question={textQuestion('p11_q1a', 'A) QUAIS SÃO AS RESPOSTAS PARA AS DUAS PRIMEIRAS PERGUNTAS DO TEXTO LIDO?', 'Obrigado e por favor.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p11_q1b', 'B) COMO VOCÊ PEDIRIA AO REI PARA BRINCAR NO LABIRINTO DO CASTELO COM EDUCAÇÃO?', 'Por favor, posso brincar no castelo?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p11_q1c', 'C) QUAL PALAVRA VOCÊ PRECISA USAR QUANDO FEZ ALGO QUE NÃO FOI LEGAL?', 'Me desculpe.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 12 */}
          <Pagination currentPage={12} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">PARA PRATICAR</h3>
          <p className="mb-6 text-gray-800"><strong>1</strong> LEIA AS SITUAÇÕES E COMPLETE COM UMA DAS PALAVRAS A SEGUIR.</p>
          <p className="text-center font-bold text-[#80298F] mb-6">POR FAVOR – SILÊNCIO – OBRIGADO <br/> COM LICENÇA – ORGANIZAR – ATENÇÃO</p>
          
          <QuestionRenderer
            question={textQuestion('p12_q1a', 'A) VOCÊ PODERIA ME EMPRESTAR A RÉGUA, ______________ ?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p12_q1b', 'B) ______________ POR TER SERVIDO O JANTAR.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p12_q1c', 'C) ______________ AO REALIZAR A LIÇÃO DE CASA.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p12_q1d', 'D) ______________ , PRECISO PASSAR PELO CORREDOR.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p12_q1e', 'E) ______________ , A PROFESSORA SANDRA QUER FALAR.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p12_q1f', 'F) EU PRECISO ______________ O QUARTO ANTES DE DORMIR.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <p className="mb-4 mt-8 text-gray-800"><strong>2</strong> AGORA É A SUA VEZ DE CRIAR UMA TIRINHA SOBRE RESPEITO E BOA CONVIVÊNCIA.</p>
          <ul className="list-disc marker:text-[#80298F] ml-6 mb-8 space-y-2 text-gray-800">
            <li>CRIE DOIS PERSONAGENS.</li>
            <li>DESENHE UMA HISTÓRIA EM QUE UM DOS PERSONAGENS PRECISA PEDIR AJUDA, SE DESCULPAR OU AGRADECER.</li>
          </ul>

          <p className="mb-4 mt-8 text-gray-800"><strong>3</strong> CIRCULE AS TAREFAS QUE VOCÊ REALIZA NA SUA CASA E FAÇA UM <strong>X</strong> NAS QUE VOCÊ REALIZA NA SUA ESCOLA.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-center font-bold text-gray-700">
            <p>ARRUMAR A CAMA</p>
            <p>ESTUDAR COM O PROFESSOR</p>
            <p>LANCHAR NO RECREIO COM OS COLEGAS</p>
            <p>JANTAR COM FAMILIARES</p>
            <p>PRESTAR ATENÇÃO NA AULA</p>
            <p>COLOCAR ROUPA SUJA NO CESTO</p>
          </div>

          {/* Página 13 */}
          <Pagination currentPage={13} expandToBookColumn />
          <p className="mb-6 text-gray-800"><strong>4</strong> OBSERVE AS IMAGENS A SEGUIR. DEPOIS, PINTE DE <strong>AZUL</strong> AS ATIVIDADES QUE VOCÊ JÁ FEZ COM SUA FAMÍLIA E <strong>VERDE</strong> AS ATIVIDADE QUE JÁ FEZ COM SEUS AMIGOS.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_13_img_89_150.png')} alt="Brincar no parque" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">BRINCAR NO PARQUE.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_13_img_330_153.png')} alt="Churrasco" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">PREPARAR CHURRASCO NO FIM DE SEMANA.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_13_img_90_342.png')} alt="Conversar" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">CONVERSAR SOBRE COMO FOI O DIA.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_13_img_330_342.png')} alt="Brincar na rua" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">BRINCAR NA RUA FECHADA.</p>
            </div>
            <div className="flex flex-col items-center md:col-span-2">
              <img src={capAsset('images/page_13_img_91_541.png')} alt="Natureza" className="w-full max-w-md rounded-xl" />
              <p className="text-sm mt-2 text-center">DEFENDER E PRESERVAR A NATUREZA.</p>
            </div>
          </div>

          {/* Página 14 */}
          <Pagination currentPage={14} expandToBookColumn />
          <h3 className="mb-4 text-2xl font-bold text-[#80298F] uppercase">Missão 2 Conhecer a comunidade em que se vive</h3>
          <p className="mb-6 indent-6 text-gray-800">
            NESTA MISSÃO, VOCÊ CONHECERÁ DIFERENTES PESSOAS E SEUS PAPÉIS NOS LUGARES ONDE VIVEM E TRABALHAM. QUAIS PESSOAS VOCÊ OBSERVA NOS LUGARES QUE FREQUENTA? COMO ESSAS PESSOAS CUIDAM DOS LUGARES QUE FREQUENTAM?
          </p>
          
          <h4 className="mb-4 text-xl font-bold text-[#80298F]">PARA COMEÇAR</h4>
          <h5 className="mb-4 font-bold text-gray-800">VIVENDO EM COMUNIDADE</h5>
          <p className="mb-4 text-gray-800">
            VIVER EM <strong>COMUNIDADE</strong> SIGNIFICA COMPARTILHAR LUGARES COM DIFERENTES PESSOAS, MANTENDO A BOA CONVIVÊNCIA. ALÉM DISSO, AS PESSOAS PODEM AJUDAR UMAS ÀS OUTRAS EM DIFERENTES SITUAÇÕES.
          </p>
          <p className="mb-6 text-gray-800">
            <strong>COMUNIDADE</strong>: É UM GRUPO DE PESSOAS QUE VIVEM JUNTAS EM UM MESMO LUGAR E APRENDEM A CONVIVER E RESPEITAR UMAS ÀS OUTRAS.
          </p>

          <p className="mb-4 text-gray-800"><strong>1</strong> OBSERVE A IMAGEM A SEGUIR.</p>
          <div className="flex justify-center mb-8">
            <img src={capAsset('images/page_14_img_195_534.png')} alt="Festa na vizinhança" className="w-full max-w-md rounded-xl" />
          </div>

          <QuestionRenderer
            question={textQuestion('p14_q1a', 'A) O QUE VOCÊ OBSERVA NA IMAGEM?', 'É esperado que os estudantes comentem sobre se tratar de uma festa/confraternização aparentemente organizada pela vizinhança, com pessoas interagindo entre si.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p14_q1b', 'B) O QUE VOCÊ APRENDE QUANDO CONVIVE COM OUTRAS PESSOAS?', 'Os estudantes podem responder que se aprendem a dividir o mesmo espaço com respeito, a se comunicar melhor uns com os outros e que se sentem próximos dos amigos, vizinhos e familiares.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 15 */}
          <Pagination currentPage={15} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">ESTAÇÃO DOCUMENTAL</h3>
          <h4 className="mb-4 font-bold text-gray-800">ESPAÇOS DE CONVIVÊNCIA DA COMUNIDADE</h4>
          <p className="mb-4 text-gray-800">VOCÊ JÁ VIU ALGUÉM QUE TRABALHA NA SUA ESCOLA EM OUTRO LUGAR?</p>
          <p className="mb-4 text-gray-800">A CONVIVÊNCIA COM A COMUNIDADE TAMBÉM ACONTECE NO DIA A DIA, EM ESPAÇOS COMPARTILHADOS E FREQUENTADOS POR DIFERENTES PESSOAS.</p>
          <p className="mb-6 text-gray-800">OS LUGARES TAMBÉM PODEM SE MODIFICAR AO LONGO DO TEMPO E TER NOVAS PESSOAS QUE SE PASSARÃO A FREQUENTÁ-LOS.</p>

          <p className="mb-6 text-gray-800"><strong>1</strong> COM SEUS COLEGAS, COMPARE AS FOTOGRAFIAS A SEGUIR.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_15_img_88_317.png')} alt="Feira livre antiga" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">DIA DE FEIRA LIVRE NA PRAÇA DA BANDEIRA, RIO DE JANEIRO, RIO DE JANEIRO. 1922.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_15_img_330_320.png')} alt="Feira livre atual" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">DIA DE FEIRA LIVRE DE RUA, TABOÃO DA SERRA, SÃO PAULO. 2019.</p>
            </div>
          </div>

          <QuestionRenderer
            question={textQuestion('p15_q1a', 'A) ESCREVA UM ELEMENTO QUE AS DUAS FOTOGRAFIAS TÊM EM COMUM.', 'vender ou comprar produtos agrícolas.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p15_q1b', 'B) ALÉM DAS CORES, O MAIS HÁ DE DIFERENTE ENTRE AS FOTOGRAFIAS?', 'As roupas, as casas e a arquitetura.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p15_q1c', 'C) SE VOCÊ ESTIVER NA FEIRA E ENCONTRAR O PROFESSOR DE SUA TURMA, É UMA BOA HORA PARA TIRAR DÚVIDAS SOBRE ALGUMA ATIVIDADE REALIZADA NA ESCOLA?', 'Não, porque o professor está fora do horário de trabalho no momento do encontro.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 16 */}
          <Pagination currentPage={16} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">VIAJANDO NO DOCUMENTO</h3>
          <p className="mb-6 text-gray-800"><strong>1</strong> ABAIXO DE CADA IMAGEM A SEGUIR, ESCREVA UMA LEGENDA QUE COMPLETE A SEGUINTE FRASE:</p>
          <h4 className="mb-4 font-bold text-center text-gray-800">PARA NOS ALIMENTARMOS, HÁ PESSOAS QUE:</h4>
          
          <div className="flex justify-center mb-8">
            <img src={capAsset('images/page_16_img_85_284.png')} alt="Processo de alimentação" className="w-full max-w-3xl rounded-xl" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-sm font-bold text-gray-700 mb-8">
            <p>Plantam. Transportam os alimentos. Fazem a colheita.</p>
            <p>Vendem os alimentos.</p>
            <p>Preparam as refeições.</p>
          </div>

          <h4 className="mb-4 font-bold text-gray-800">PROFISSÕES E SEUS PROFISSIONAIS</h4>
          <p className="mb-6 text-gray-800">
            A COMUNIDADE TAMBÉM É FORMADA POR DIFERENTES PROFISSIONAIS QUE TRABALHAM FAZENDO COISAS DE QUE PRECISAMOS, COMO ROUPAS, ALIMENTOS, SERVIÇOS E CASAS.
          </p>
          
          <p className="mb-6 text-gray-800"><strong>2</strong> PREENCHA A TABELA A SEGUIR COM OS PROFISSIONAIS RESPONSÁVEIS.</p>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 space-y-4">
            <p>ENSINA DIFERENTES HABILIDADES E SABERES: <strong>Professor</strong></p>
            <p>COSTURA E PRODUZ ROUPAS: <strong>Costureiro</strong></p>
            <p>CRIA PROJETOS DE CONSTRUÇÃO DE PRÉDIOS E CASAS: <strong>Arquiteto</strong></p>
            <p>PREPARA ALIMENTOS NO RESTAURANTE: <strong>Cozinheiro</strong></p>
            <p>COLETA OBJETOS E LIXOS DESCARTADOS: <strong>Coletor de lixo</strong></p>
            <p>CUIDA DE ANIMAIS EM UM CONSULTÓRIO: <strong>Veterinário</strong></p>
            <p>LEVA PESSOAS DE UM PONTO A OUTRO DA CIDADE: <strong>Motorista</strong></p>
          </div>

          {/* Página 17 */}
          <Pagination currentPage={17} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">PROFISSÕES DO NOSSO BAIRRO</h3>
          <p className="mb-6 text-gray-800">
            HÁ PROFISSIONAIS PODEM REALIZAR AS MESMAS ATIVIDADES EM DIFERENTES LOCAIS, COMO EM CASA, NA RUA OU EM OUTROS ESPAÇOS. ESSES PROFISSIONAIS SÃO RESPONSÁVEIS PELOS LUGARES E SERVIÇOS QUE SÃO IMPORTANTES PARA MUITAS PESSOAS.
          </p>
          <p className="mb-6 text-gray-800"><strong>3</strong> COM OS SEUS COLEGAS, OBSERVE AS FOTOGRAFIAS A SEGUIR.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_87_208.png')} alt="Jardineiro" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">JARDINEIRO PLANTANDO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_316_208.png')} alt="Catador" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">CATADOR DE MATERIAL RECICLÁVEL SEPARANDO RESÍDUOS EM COOPERATIVA.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_87_376.png')} alt="Costureira" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">COSTUREIRA FAZENDO REPAROS NA ROUPA.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_317_375.png')} alt="Cozinheiro" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">COZINHEIRO PREPARANDO UMA REFEIÇÃO NO RESTAURANTE.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_86_540.png')} alt="Pedreiro" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">PEDREIRO TRABALHANDO NA CONSTRUÇÃO DE UM MURO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_317_532.png')} alt="Eletricista" className="w-full rounded-xl" />
              <p className="text-sm mt-2 text-center">ELETRICISTA REALIZANDO REPARO.</p>
            </div>
          </div>

          {/* Página 18 */}
          <Pagination currentPage={18} expandToBookColumn />
          <QuestionRenderer
            question={textQuestion('p18_q3a', 'A) QUAIS DESSES PROFISSIONAIS VOCÊ JÁ OBSERVOU TRABALHANDO NA SUA CASA OU NA SUA RUA?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p18_q3b', 'B) ESCOLHA UMA DAS PROFISSÕES MOSTRADAS NAS FOTOGRAFIAS E ESCREVA COMO VOCÊ ACHA QUE É O DIA DO PROFISSIONAL QUANDO ELE NÃO ESTÁ TRABALHANDO.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p18_q3c', 'C) CONVERSE COM SEUS COLEGAS E ESCREVA DUAS PROFISSÕES QUE NÃO ESTÃO NAS FOTOGRAFIAS, MAS QUE VOCÊ JÁ OBSERVOU TRABALHANDO NA SUA CASA OU NA SUA RUA.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p18_q3d', 'D) ESCREVA O NOME DAS PROFISSÕES DOS ADULTOS QUE MORAM NA SUA CASA.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 19 */}
          <Pagination currentPage={19} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">A NOSSA LÍNGUA</h3>
          <h4 className="mb-4 font-bold text-gray-800">AJUDANDO UNS AOS OUTROS</h4>
          <p className="mb-6 text-gray-800">
            VIVER EM COMUNIDADE INCLUI AJUDAR SEUS VIZINHOS QUANDO ELES PRECISAM. ISSO É FUNDAMENTAL PARA MANTER AS PESSOAS UNIDAS E O BEM-ESTAR ENTRE TODOS.
          </p>
          <p className="mb-6 text-gray-800"><strong>1</strong> LEIA A FÁBULA DA GALINHA RUIVA. DEPOIS, FAÇA O QUE SE PEDE.</p>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h5 className="font-bold text-center mb-4">A GALINHA RUIVA</h5>
            <p className="mb-4">EM UM SÍTIO NO INTERIOR, MORAVA UMA GALINHA <strong>RUIVA</strong>. ELA VIVIA COM SEUS PINTINHOS E TINHA MUITOS AMIGOS. UM DIA, PERCEBEU QUE O MILHO ESTAVA MADURO E PRONTO PARA SER COLHIDO. DECIDIU FAZER UM BOLO E PEDIU AJUDA PARA SEUS AMIGOS PATO, GATO E PORCO.</p>
            <p className="mb-4">O GATO DISSE QUE NÃO PODIA AJUDAR, POIS ESTAVA SONOLENTO. O PATO TAMBÉM DISSE QUE NÃO PODIA, PORQUE HAVIA ACABADO DE ALMOÇAR. O PORCO TAMBÉM RECUSOU, E DISSE QUE IRIA BRINCAR.</p>
            <p className="mb-4">A GALINHA RUIVA DESISTIU DE PEDIR AJUDA PARA SEUS AMIGOS E FOI PREPARAR O BOLO SOZINHA. ELA COLHEU AS ESPIGAS DE MILHO, FEZ A FARINHA E A MASSA E PÔS NO FORNO.</p>
            <p className="mb-4">QUANDO O BOLO QUASE PRONTO, SEUS AMIGOS PATO, GATO E PORCO SENTIRAM UM CHEIRO DELICIOSO E RESOLVERAM, ENTÃO, CONVIDAR-SE PARA COMER O BOLO PREPARADO PELA GALINHA RUIVA.</p>
            <p className="mb-4">ELA PERGUNTOU QUEM HAVIA PARTICIPADO DO PREPARO DO BOLO, E, COMO NINGUÉM HAVIA COLABORADO, A GALINHA RUIVA E SEUS PINTINHOS COMERAM O BOLO SEM A COMPANHIA DOS AMIGOS.</p>
            <p className="text-xs text-gray-500 mt-4 text-right">Texto criado para fins didáticos.</p>
          </div>

          {/* Página 20 */}
          <Pagination currentPage={20} expandToBookColumn />
          <QuestionRenderer
            question={textQuestion('p20_q1a', 'A) O QUE ACONTECEU NA HISTÓRIA?', 'A Galinha Ruiva percebeu que o milho estava pronto para ser colhido e resolveu fazer um bolo com ele.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p20_q1b', 'B) QUEM ERAM OS AMIGOS DA GALINHA? MARQUE A ALTERNATIVA CORRETA.', 'GATO, PATO E PORCO')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p20_q1c', 'C) POR QUE A GALINHA RUIVA PEDIU AJUDA AOS SEUS AMIGOS?', 'A Galinha Ruiva pediu ajuda aos seus amigos porque queria fazer um bolo de milho.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p20_q1d', 'D) OS AMIGOS DA GALINHA RUIVA A AJUDARAM A FAZER O BOLO? POR QUÊ?', 'Não. O Gato disse que estava com sono; o Pato, que havia acabado de almoçar; e o Porco disse que ia brincar.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          
          <p className="mb-4 mt-8 text-gray-800"><strong>E)</strong> OBSERVE AS IMAGENS E ENUMERE AS CENAS, DE 1 A 3, DE ACORDO COM O QUE ACONTECEU NA HISTÓRIA.</p>
          <div className="flex justify-center mb-8">
            <img src={capAsset('images/page_20_img_119_297.png')} alt="Cenas da história" className="w-full max-w-2xl rounded-xl" />
          </div>

          <QuestionRenderer
            question={textQuestion('p20_q1f', 'F) ESCREVA O NOME DAS PROFISSÕES QUE FAZEM AS ATIVIDADES QUE A GALINHA RUIVA FEZ.', 'Agricultor e cozinheiro/boleiro/confeiteiro.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p20_q1g', 'G) DESENHE COMO VOCÊ IMAGINA QUE A HISTÓRIA TERIA TERMINADO SE OS AMIGOS DA GALINHA A TIVESSEM AJUDADO A PREPARAR O BOLO.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 21 */}
          <Pagination currentPage={21} expandToBookColumn />
          <h3 className="mb-4 text-xl font-bold text-[#80298F]">PARA PRATICAR</h3>
          <QuestionRenderer
            question={textQuestion('p21_q1', '1 QUAIS OUTROS PROFISSIONAIS VOCÊ CONHECE QUE NÃO TRABALHAM NA ESCOLA?', 'Resposta esperada: ator, dentista, eletricista etc.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          
          <p className="mb-4 mt-8 text-gray-800"><strong>2</strong> COMPLETE A FRASE A SEGUIR UTILIZANDO AS PALAVRAS DO QUADRO.</p>
          <p className="text-center font-bold text-[#80298F] mb-6">ENSINAR – COZINHAR – CONSTRUIR</p>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 leading-loose">
            O PROFESSOR DEVE <span className="border-b-2 border-gray-400 px-4">ensinar</span> AOS ESTUDANTES EM SALA DE AULA E GARANTIR QUE TODOS APRENDAM. O COZINHEIRO DEVE <span className="border-b-2 border-gray-400 px-4">cozinhar</span> PARA QUE AS PESSOAS SE ALIMENTEM. E O PEDREIRO DEVE <span className="border-b-2 border-gray-400 px-4">construir</span> CASAS, EDIFÍCIOS E OUTRAS CONSTRUÇÕES, PARA AS PESSOAS MORAREM, TRABALHAREM E REALIZAR DIVERSAS ATIVIDADES.
          </div>

          {/* Página 22 */}
          <Pagination currentPage={22} expandToBookColumn />
          <p className="mb-6 text-gray-800"><strong>3</strong> EM UM GRUPO COM OS SEUS COLEGAS, SIGA AS INSTRUÇÕES DO PROFESSOR E ENTREVISTE UM TRABALHADOR DA ESCOLA.</p>
          <ul className="list-disc marker:text-[#80298F] ml-6 mb-8 space-y-2 text-gray-800">
            <li>FAÇA AS PERGUNTAS A SEGUIR E REGISTRE AS RESPOSTAS.</li>
            <li>QUANDO TERMINAREM, COMPARTILHEM A ENTREVISTA COM OS OUTROS GRUPOS E COM O SEU PROFESSOR.</li>
          </ul>

          <QuestionRenderer
            question={textQuestion('p22_q3a', 'A) NOME DO TRABALHADOR:')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p22_q3b', 'B) PROFISSÃO:')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p22_q3c', 'C) HÁ QUANTO TEMPO TRABALHA NA ESCOLA?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p22_q3d', 'D) COMO É A SUA ROTINA QUANDO VOCÊ NÃO ESTÁ TRABALHANDO?')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          {/* Página 23 */}
          <Pagination currentPage={23} expandToBookColumn />
          <h3 className="mb-6 text-2xl font-bold text-center text-[#80298F]">PERCURSOS DAS APRENDIZAGENS</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center font-bold text-gray-700 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">PRÁTICAS DE BOA CONVIVÊNCIA</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">CONHECENDO A COMUNIDADE</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">PASSEANDO PELA MINHA CASA, ESCOLA E BAIRRO</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">RESPEITO</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">RESPEITAR AS PESSOAS AO MEU REDOR</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">REGRAS DE CONVIVÊNCIA</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">ROTINA DOS TRABALHADORES QUANDO NÃO ESTÃO NO TRABALHO</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">COMBINADOS E TAREFAS</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">MEU BAIRRO E AS PROFISSÕES ESSENCIAIS</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">AJUDANDO A COMUNIDADE</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">PAPÉIS QUE AS PESSOAS EXERCEM</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">MESMA PESSOA EXERCENDO DIFERENTES PAPÉIS</div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">TAREFAS EM CASA E NA ESCOLA</div>
          </div>

          {/* Página 24 */}
          <Pagination currentPage={24} expandToBookColumn />
          <AgoraVoceJaSabe />
          <CriteriosAvaliacao
            instanceId="criterios_cap01"
            emojiImages={{
              jaSei: capAsset('images/page_10_img_138_199.png'),
              precisoSaberMais: capAsset('images/page_10_img_138_343.png'),
              aindaNaoSei: capAsset('images/page_10_img_338_198.png'),
            }}
            criterios={[
              { id: 'crit_1', nome: '', pergunta: 'APRENDENDO A CONVIVER EM CASA, NA ESCOLA E NO BAIRRO 33' },
              { id: 'crit_2', nome: '', pergunta: 'RECONHECER OS DIFERENTES LOCAIS QUE EU FREQUENTO E COM QUEM FREQUENTO' },
              { id: 'crit_3', nome: '', pergunta: 'RECONHECER A IMPORTÂNCIA DE CADA PROFISSIONAL EM MINHA COMUNIDADE' },
              { id: 'crit_4', nome: '', pergunta: 'IDENTIFICAR AS RESPONSABILIDADES DE CADA UM NOS DIFERENTES ESPAÇOS COLETIVOS' }
            ]}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
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