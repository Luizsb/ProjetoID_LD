// @ld-export-metadata: {"chapterNumber":1,"chapterTitle":"CAPÍTULO 5","startPage":1,"pageCount":24,"componentName":"BookCap01","exportFolderName":"livro_digital_C01"}
import { useEffect, useId, useState, type ReactNode } from 'react';
import { publicUrl, withBase } from '@player/lib/publicUrl';
import Poster from '@player/components/Poster';
import Header from '@player/components/Header';
import Pagination from '@player/components/Pagination';
import QuestionRenderer from '@player/components/QuestionRenderer';
import TeacherButton from '@player/components/TeacherButton';
import AtividadeLigar, { Ligacao } from '@player/components/AtividadeLigar';
import AreaDesenho from '@player/components/AreaDesenho';
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
const SHOW_TEACHER_BUTTON = true;

const textQuestion = (id: string, question: string, correctAnswer?: string, options?: any): Question => {
  let number: number | undefined;
  let letter: string | undefined;
  let text = question.trim();

  const numbered = text.match(/^(\d+)\s+(.*)$/);
  if (numbered) {
    number = Number(numbered[1]);
    text = numbered[2];
  }

  const lettered = text.match(/^([A-H])\)\s*(.*)$/i);
  if (lettered) {
    letter = lettered[1].toUpperCase();
    text = lettered[2];
  }

  return {
    id,
    type: 'text-input',
    question: text,
    number,
    letter,
    placeholder: 'Digite aqui...',
    correctAnswer,
    ...options,
  };
};

type MarcaLugar = 'circulo' | 'retangulo';
type MarcaTarefa = 'circulo' | 'xis';

const LUGARES_P6 = [
  'MERCADO',
  'PARQUE',
  'ESCOLA',
  'HOSPITAL',
  'FEIRA LIVRE',
  'CASA DE PARENTES',
  'RUA',
  'PRAÇA',
] as const;

function PalavrasCirculoRetangulo({
  value,
  onChange,
  disabled = false,
}: {
  value: Record<string, MarcaLugar> | undefined;
  onChange: (next: Record<string, MarcaLugar>) => void;
  disabled?: boolean;
}) {
  const marks = value ?? {};

  return (
    <div className="banco-lugares" role="group" aria-label="Lugares para marcar com círculo ou retângulo">
      {LUGARES_P6.map((lugar) => {
        const marca = marks[lugar];
        return (
          <button
            key={lugar}
            type="button"
            disabled={disabled}
            className={`banco-lugares__item${marca ? ` banco-lugares__item--${marca}` : ''}`}
            onClick={() => {
              const nextMarca: MarcaLugar | undefined =
                marca === 'circulo' ? 'retangulo' : marca === 'retangulo' ? undefined : 'circulo';
              const next = { ...marks };
              if (nextMarca) next[lugar] = nextMarca;
              else delete next[lugar];
              onChange(next);
            }}
            aria-pressed={Boolean(marca)}
            aria-label={
              marca === 'circulo'
                ? `${lugar}, círculo, família`
                : marca === 'retangulo'
                  ? `${lugar}, retângulo, colegas ou vizinhos`
                  : lugar
            }
          >
            {lugar}
          </button>
        );
      })}
    </div>
  );
}

const TAREFAS_P12 = [
  'ARRUMAR A CAMA',
  'ESTUDAR COM O PROFESSOR',
  'LANCHAR NO RECREIO COM OS COLEGAS',
  'JANTAR COM FAMILIARES',
  'PRESTAR ATENÇÃO NA AULA',
  'COLOCAR ROUPA SUJA NO CESTO',
] as const;

const PROFISSOES_P16 = [
  { id: 'professor', label: 'ENSINA DIFERENTES HABILIDADES E SABERES', answer: 'Professor' },
  { id: 'costureiro', label: 'COSTURA E PRODUZ ROUPAS', answer: 'Costureiro' },
  { id: 'arquiteto', label: 'CRIA PROJETOS DE CONSTRUÇÃO DE PRÉDIOS E CASAS', answer: 'Arquiteto' },
  { id: 'cozinheiro', label: 'PREPARA ALIMENTOS NO RESTAURANTE', answer: 'Cozinheiro' },
  { id: 'coletor', label: 'COLETA OBJETOS E LIXOS DESCARTADOS', answer: 'Coletor de lixo' },
  { id: 'veterinario', label: 'CUIDA DE ANIMAIS EM UM CONSULTÓRIO', answer: 'Veterinário' },
  { id: 'motorista', label: 'LEVA PESSOAS DE UM PONTO A OUTRO DA CIDADE', answer: 'Motorista' },
] as const;

function TarefasCirculoX({
  value,
  onChange,
  disabled = false,
}: {
  value: Record<string, MarcaTarefa> | undefined;
  onChange: (next: Record<string, MarcaTarefa>) => void;
  disabled?: boolean;
}) {
  const marks = value ?? {};

  return (
    <div className="banco-tarefas" role="group" aria-label="Tarefas para circular ou marcar com X">
      {TAREFAS_P12.map((tarefa) => {
        const marca = marks[tarefa];
        return (
          <button
            key={tarefa}
            type="button"
            disabled={disabled}
            className={`banco-tarefas__item${marca ? ` banco-tarefas__item--${marca}` : ''}`}
            onClick={() => {
              const nextMarca: MarcaTarefa | undefined =
                marca === 'circulo' ? 'xis' : marca === 'xis' ? undefined : 'circulo';
              const next = { ...marks };
              if (nextMarca) next[tarefa] = nextMarca;
              else delete next[tarefa];
              onChange(next);
            }}
            aria-pressed={Boolean(marca)}
            aria-label={
              marca === 'circulo'
                ? `${tarefa}, círculo, casa`
                : marca === 'xis'
                  ? `${tarefa}, X, escola`
                  : tarefa
            }
          >
            {tarefa}
          </button>
        );
      })}
    </div>
  );
}

type FotoRegra = {
  id: string;
  src: string;
  alt: string;
  credit: string;
  caption: ReactNode;
};

function FotosMarcarRegras({
  fotos,
  value,
  onChange,
  disabled = false,
}: {
  fotos: FotoRegra[];
  value: string[] | undefined;
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
  const selected = Array.isArray(value) ? value : [];

  return (
    <div className="fotos-marcar" role="group" aria-label="Regras de convivência para marcar">
      {fotos.map((foto) => {
        const marcada = selected.includes(foto.id);
        return (
          <article key={foto.id} className="fotos-marcar__card">
            <button
              type="button"
              className="fotos-marcar__botao"
              disabled={disabled}
              aria-pressed={marcada}
              onClick={() => {
                onChange(
                  marcada ? selected.filter((id) => id !== foto.id) : [...selected, foto.id],
                );
              }}
            >
              <span className="fotos-marcar__midia">
                <img src={foto.src} alt={foto.alt} />
                <span className={`fotos-marcar__marca${marcada ? ' is-on' : ''}`} aria-hidden>
                  {marcada ? 'X' : ''}
                </span>
              </span>
              <span className="fotos-marcar__legenda">{foto.caption}</span>
            </button>
            <p className="rotina-pensamento__credito">{foto.credit}</p>
          </article>
        );
      })}
    </div>
  );
}

type CorPintura = 'azul' | 'verde';

type FotoPintar = {
  id: string;
  src: string;
  alt: string;
  credit: string;
  caption: string;
  wide?: boolean;
};

function FotosPintarCores({
  fotos,
  value,
  onChange,
  disabled = false,
}: {
  fotos: FotoPintar[];
  value: Record<string, CorPintura> | undefined;
  onChange: (next: Record<string, CorPintura>) => void;
  disabled?: boolean;
}) {
  const cores = value ?? {};

  return (
    <div className="fotos-pintar" role="group" aria-label="Atividades para pintar de azul ou verde">
      {fotos.map((foto) => {
        const cor = cores[foto.id];
        return (
          <article
            key={foto.id}
            className={`fotos-pintar__card${foto.wide ? ' fotos-pintar__card--largo' : ''}`}
          >
            <button
              type="button"
              className="fotos-pintar__botao"
              disabled={disabled}
              aria-label={
                cor === 'azul'
                  ? `${foto.alt}, azul, família`
                  : cor === 'verde'
                    ? `${foto.alt}, verde, amigos`
                    : `${foto.alt}, pintar`
              }
              onClick={() => {
                const nextCor: CorPintura | undefined =
                  cor === 'azul' ? 'verde' : cor === 'verde' ? undefined : 'azul';
                const next = { ...cores };
                if (nextCor) next[foto.id] = nextCor;
                else delete next[foto.id];
                onChange(next);
              }}
            >
              <span className="fotos-pintar__midia">
                <img src={foto.src} alt={foto.alt} />
                <span
                  className={`fotos-pintar__marca${cor ? ` fotos-pintar__marca--${cor}` : ''}`}
                  aria-hidden
                />
              </span>
            </button>
            <p className="rotina-pensamento__credito">{foto.credit}</p>
            <p className="text-sm mt-2 text-center">{foto.caption}</p>
          </article>
        );
      })}
    </div>
  );
}

type NivelAutoaval = 'consigo' | 'tentando' | 'ajuda';

const MISSOES_AUTOAVAL = [
  { id: 'respeitar', texto: 'RESPEITAR AS PESSOAS AO MEU REDOR' },
  { id: 'tarefas', texto: 'RECONHECER MINHAS TAREFAS E OBRIGAÇÕES' },
  { id: 'responsabilidades', texto: 'IDENTIFICAR AS RESPONSABILIDADES DE CADA UM NOS DIFERENTES ESPAÇOS COLETIVOS' },
  { id: 'locais', texto: 'RECONHECER OS DIFERENTES LOCAIS QUE EU FREQUENTO E COM QUEM FREQUENTO' },
  { id: 'profissionais', texto: 'RECONHECER A IMPORTÂNCIA DE CADA PROFISSIONAL EM MINHA COMUNIDADE' },
] as const;

const NIVEIS_AUTOAVAL: { id: NivelAutoaval; label: string }[] = [
  { id: 'consigo', label: 'eu consigo' },
  { id: 'tentando', label: 'estou tentando' },
  { id: 'ajuda', label: 'preciso de ajuda' },
];

function proximoNivelAutoaval(atual: NivelAutoaval | undefined): NivelAutoaval | undefined {
  if (atual === 'consigo') return 'tentando';
  if (atual === 'tentando') return 'ajuda';
  if (atual === 'ajuda') return undefined;
  return 'consigo';
}

function AutoavaliacaoMissoes({
  value,
  onChange,
  disabled = false,
}: {
  value: Record<string, NivelAutoaval> | undefined;
  onChange: (next: Record<string, NivelAutoaval>) => void;
  disabled?: boolean;
}) {
  const marcas = value ?? {};

  return (
    <div className="autoaval-efai__tabela">
      {MISSOES_AUTOAVAL.map((missao) => {
        const nivel = marcas[missao.id];
        const nivelMeta = NIVEIS_AUTOAVAL.find((item) => item.id === nivel);
        return (
          <div key={missao.id} className="autoaval-efai__linha">
            <p>{missao.texto}</p>
            <button
              type="button"
              className={`autoaval-efai__caixa${nivel ? ` autoaval-efai__caixa--${nivel}` : ''}`}
              disabled={disabled}
              aria-label={
                nivelMeta ? `${missao.texto}, ${nivelMeta.label}` : `${missao.texto}, pintar`
              }
              onClick={() => {
                const nextNivel = proximoNivelAutoaval(nivel);
                const next = { ...marcas };
                if (nextNivel) next[missao.id] = nextNivel;
                else delete next[missao.id];
                onChange(next);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function CaixaPercurso({
  children,
  variant,
  elo = false,
}: {
  children: string;
  variant: 'titulo' | 'verde-cheia' | 'verde-linha' | 'verde-sombra' | 'laranja-cheia' | 'laranja-sombra' | 'rosa';
  elo?: boolean;
}) {
  return (
    <div className={`mapa-percursos__caixa mapa-percursos__caixa--${variant}${elo ? ' mapa-percursos__caixa--elo' : ''}`}>
      {children}
    </div>
  );
}

function SetaPercurso({ cor }: { cor: 'verde' | 'laranja' | 'rosa' }) {
  return <span className={`mapa-percursos__seta mapa-percursos__seta--${cor}`} aria-hidden />;
}

function MapaPercursosVisual() {
  return (
    <div className="mapa-percursos__folha">
      <div className="mapa-percursos__cabeca">
        <CaixaPercurso variant="titulo">PASSEANDO PELA MINHA CASA, ESCOLA E BAIRRO</CaixaPercurso>
        <svg className="mapa-percursos__ramos" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden>
          <path d="M50 1 L16 15" />
          <path d="M50 1 L84 15" />
        </svg>
      </div>
      <div className="mapa-percursos__grade">
        <CaixaPercurso variant="verde-cheia">RESPEITAR AS PESSOAS AO MEU REDOR</CaixaPercurso>
        <span />
        <CaixaPercurso variant="laranja-cheia">CONHECENDO A COMUNIDADE</CaixaPercurso>

        <SetaPercurso cor="verde" />
        <span />
        <SetaPercurso cor="laranja" />

        <CaixaPercurso variant="verde-linha">REGRAS DE CONVIVÊNCIA</CaixaPercurso>
        <CaixaPercurso variant="rosa" elo>
          RESPEITO
        </CaixaPercurso>
        <CaixaPercurso variant="laranja-sombra">PRÁTICAS DE BOA CONVIVÊNCIA</CaixaPercurso>

        <SetaPercurso cor="verde" />
        <SetaPercurso cor="rosa" />
        <SetaPercurso cor="laranja" />

        <CaixaPercurso variant="verde-linha">COMBINADOS E TAREFAS</CaixaPercurso>
        <CaixaPercurso variant="rosa" elo>
          AJUDANDO A COMUNIDADE
        </CaixaPercurso>
        <CaixaPercurso variant="laranja-sombra">MEU BAIRRO E AS PROFISSÕES ESSENCIAIS</CaixaPercurso>

        <SetaPercurso cor="verde" />
        <SetaPercurso cor="rosa" />
        <span />

        <CaixaPercurso variant="verde-sombra">MESMA PESSOA EXERCENDO DIFERENTES PAPÉIS</CaixaPercurso>
        <span />
        <span />

        <SetaPercurso cor="verde" />
        <span />
        <SetaPercurso cor="laranja" />

        <CaixaPercurso variant="verde-sombra">TAREFAS EM CASA E NA ESCOLA</CaixaPercurso>
        <CaixaPercurso variant="rosa" elo>
          PAPÉIS QUE AS PESSOAS EXERCEM
        </CaixaPercurso>
        <CaixaPercurso variant="laranja-sombra">ROTINA DOS TRABALHADORES QUANDO NÃO ESTÃO NO TRABALHO</CaixaPercurso>
      </div>
    </div>
  );
}

function MapaPercursosZoom() {
  const [aberto, setAberto] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!aberto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [aberto]);

  return (
    <>
      <figure className="mapa-percursos">
        <button
          type="button"
          className="mapa-percursos__abrir"
          onClick={() => setAberto(true)}
          aria-label="Ampliar mapa Percursos das aprendizagens"
        >
          <MapaPercursosVisual />
        </button>
        <figcaption className="mapa-percursos__dica">Clique no mapa para ver maior.</figcaption>
      </figure>

      {aberto ? (
        <div className="imagem-zoom__overlay" role="presentation">
          <button
            type="button"
            className="imagem-zoom__fundo"
            aria-label="Fechar mapa"
            onClick={() => setAberto(false)}
          />
          <div
            className="imagem-zoom__dialog imagem-zoom__dialog--claro"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <p id={titleId} className="sr-only">
              Percursos das aprendizagens
            </p>
            <button
              type="button"
              className="imagem-zoom__fechar"
              onClick={() => setAberto(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <div className="imagem-zoom__palco mapa-percursos__palco">
              <div className="mapa-percursos mapa-percursos--ampliado">
                <MapaPercursosVisual />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

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
        <Header marca="geekie" chapterNumber={5} chapterTitle="APRENDENDO A 
CONVIVER EM CASA, NA 
ESCOLA E NO BAIRRO" />

        <Pagination currentPage={10} />

        <Poster
          imageSrc={capAsset('images/page_1_img_64_134.jpg')}
          creditLine1=""
          creditLine2="Gabrielli Masi"
        />

        <div className="p-8 md:p-12">

          {/* Página 2 */}
          <Pagination currentPage={11} expandToBookColumn />
          <h3 className="mb-6 text-xl font-bold text-[#f4823b]">NESTE CAPÍTULO VOCÊ IRÁ:</h3>
          <ul className="list-disc marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
            <li>NOMEAR OS ESPAÇOS QUE FREQUENTA E OS PROFISSIONAIS PRESENTES EM CADA UM DELES</li>
            <li>EXPLICAR AS REGRAS E OS HÁBITOS DE CONVIVÊNCIA QUE ORGANIZAM OS AMBIENTES QUE DIVIDIMOS COM AS PESSOAS</li>
            <li>RELACIONAR O QUE CADA PESSOA FAZ AOS ESPAÇOS ONDE VIVE OU TRABALHA</li>
            <li>DIFERENCIAR AS RESPONSABILIDADES E FORMAS DE COOPERAÇÃO EM CASA, NA ESCOLA E EM OUTROS ESPAÇOS DE USO COLETIVO</li>
            <li>REFLETIR SOBRE ATITUDES DE RESPEITO E COLABORAÇÃO NOS ESPAÇOS QUE FREQUENTA</li>
          </ul>


          {/* Página 3 */}
          <Pagination currentPage={12} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>Respostas pessoais. </li>
                  <li>Resposta pessoal. </li>

                </ol>
              }
            />
          </div>
          <div style={{ backgroundColor: '#cde5c0', padding: '1rem', borderRadius: '0.5rem' }}>
            <h3 className="titulo-secao titulo-secao--laranja titulo-secao--missao">
              <img src={capAsset('images/icone_missao.png')} alt="" />
              <span>
                MISSÃO 1
                <i className="titulo-secao__seta" aria-hidden="true" />
                APRENDER ATITUDES QUE
                <br />
                CONTRIBUEM PARA UMA BOA CONVIVÊNCIA
              </span>
            </h3>
            <p className="mb-6 indent-6 text-gray-800">
              NESTA MISSÃO, VOCÊ VAI APRENDER A PRATICAR COM RESPEITO REGRAS DE CONVIVÊNCIA NOS DIFERENTES LUGARES QUE FREQUENTA. QUAIS SÃO AS REGRAS DE CONVIVÊNCIA NA SUA CASA E NA SUA ESCOLA? VOCÊ E SEUS AMIGOS CRIAM REGRAS NA HORA DE BRINCAR?
            </p>
          </div>

          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_paracomecar.png')} alt="" />
            <span>PARA COMEÇAR</span>
          </h4>
          <h5 className="titulo-subsecao">PALAVRAS QUE DEMONSTRAM RESPEITO</h5>
          <p className="mb-4 text-gray-800"><span className="question-number">1</span> OBSERVE A TIRINHA E CONVERSE COM SEUS COLEGAS SOBRE AS PERGUNTAS A SEGUIR.</p>

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

          <p className="mb-4 mt-8 text-gray-800"><span className="question-number">2</span> LEIA A CHARADA E ADIVINHE A PALAVRA. FAÇA DUPLA COM UM COLEGA. DEPOIS, INVERTAM OS PAPÉIS.</p>
          <p className="mb-4 font-bold text-gray-800">O QUE É O QUE É:</p>
          <ul className="list-disc marker:text-[#f4823b] ml-6 mb-8 space-y-2 text-gray-800">
            <li>QUANDO QUERO ALGO, MAS PRECISO MOSTRAR EDUCAÇÃO, COMEÇO DIZENDO…</li>
            <li>QUANDO FAÇO ALGO ERRADO E QUERO RESOLVER, DIGO…</li>
            <li>QUANDO ALGUÉM ME AJUDA E QUERO AGRADECER, FALO…</li>
          </ul>

          {/* Página 4 */}
          <Pagination currentPage={13} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ul className="list-disc marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>As  pessoas estão sentadas, em silêncio, assistindo a um filme no cinema. </li>
                  <li>Resposta pessoal. </li>
                  <li>Resposta pessoal. </li>

                </ul>
              }
            />
          </div>
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_estacaodocumental.png')} alt="" />
            <span>ESTAÇÃO DOCUMENTAL</span>
          </h4>
          <h5 className="titulo-subsecao">PARA CONVIVER BEM</h5>

          <p className="mb-6 indent-6 text-gray-800">
            PARA MANTER A BOA CONVIVÊNCIA COM AS PESSOAS, PRECISAMOS SEGUIR ALGUMAS PRÁTICAS, RESPEITANDO OS LUGARES E OS DIFERENTES GRUPOS COM QUEM CONVIVEMOS.
          </p>
          <section className="rotina-pensamento">
            <header className="rotina-pensamento__cabecalho">
              <p className="rotina-pensamento__nome">VER, PENSAR E PERGUNTAR</p>
              <p className="rotina-pensamento__tipo">ROTINA DE PENSAMENTO</p>
              <svg className="rotina-pensamento__raio" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="18.5" fill="#fff" stroke="#87c76f" strokeWidth="2.2" />
                <path
                  d="M22.5 7.5 13 21.2h7.1L16.4 32.5 27.8 17.8h-7.2z"
                  fill="#f4d03f"
                  stroke="#5b4db1"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </header>

            <p className="rotina-pensamento__instrucao">OBSERVE COM ATENÇÃO A FOTOGRAFIA A SEGUIR.</p>

            <figure className="rotina-pensamento__foto">
              <img src={capAsset('images/page_4_img_105_344.png')} alt="Pessoas no cinema" />
            </figure>
            <p className="rotina-pensamento__credito">Zoriana/stock.adobe.com</p>

            <div className="rotina-pensamento__item">
              <span className="rotina-pensamento__icone" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="10.5" cy="10.5" r="6.2" stroke="#fff" strokeWidth="2.2" />
                  <path d="M15.2 15.2 20 20" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>
              <div className="rotina-pensamento__pergunta">
                <p className="rotina-pensamento__enunciado">VER: O QUE VOCÊ VÊ NESTA IMAGEM?</p>
                <QuestionRenderer
                  hidePrompt
                  question={textQuestion('p4_q1', 'VER: O QUE VOCÊ VÊ NESTA IMAGEM?', 'As pessoas estão sentadas, em silêncio, assistindo a um filme no cinema.')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
              </div>
            </div>

            <div className="rotina-pensamento__item">
              <span className="rotina-pensamento__icone" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4.2c-3.1 0-5.6 2.4-5.6 5.3 0 1.9 1 3.5 2.5 4.5v2.2h6.2v-2.2c1.5-1 2.5-2.6 2.5-4.5 0-2.9-2.5-5.3-5.6-5.3Z"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <path d="M10 18.8h4M10.6 20.6h2.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <div className="rotina-pensamento__pergunta">
                <p className="rotina-pensamento__enunciado">
                  PENSAR: O QUE VOCÊ PENSA SOBRE ESSE LUGAR?
                  {showTeacherView ? (
                    <span className="rotina-pensamento__nota">
                      <svg viewBox="0 0 24 24" fill="#d94e82" aria-hidden="true">
                        <path d="M5 5.5h14a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H10l-5 3.2V7.5a2 2 0 0 1 2-2Z" />
                        <circle cx="9" cy="11.2" r="1.1" fill="#fff" />
                        <circle cx="12" cy="11.2" r="1.1" fill="#fff" />
                        <circle cx="15" cy="11.2" r="1.1" fill="#fff" />
                      </svg>
                      Resposta pessoal.
                    </span>
                  ) : null}
                </p>
                <QuestionRenderer
                  hidePrompt
                  question={textQuestion('p4_q2', 'PENSAR: O QUE VOCÊ PENSA SOBRE ESSE LUGAR?', 'Resposta pessoal.')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
              </div>
            </div>

            <div className="rotina-pensamento__item">
              <span className="rotina-pensamento__icone" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 5.8h14a1.8 1.8 0 0 1 1.8 1.8v7.1a1.8 1.8 0 0 1-1.8 1.8H10.2L5 20.2V7.6A1.8 1.8 0 0 1 6.8 5.8Z"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <path d="M12 9.1v.2a2 2 0 0 1 1.2 1.8c0 1.1-.9 1.6-1.2 1.8v.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="15.6" r="0.85" fill="#fff" />
                </svg>
              </span>
              <div className="rotina-pensamento__pergunta">
                <p className="rotina-pensamento__enunciado">
                  PERGUNTAR: QUE PERGUNTAS VOCÊ TEM AO OBSERVAR ESSA IMAGEM? O QUE VOCÊ GOSTARIA DE SABER SOBRE AS REGRAS DESSE ESPAÇO DE CONVIVÊNCIA?
                  {showTeacherView ? (
                    <span className="rotina-pensamento__nota">Resposta pessoal.</span>
                  ) : null}
                </p>
                <QuestionRenderer
                  hidePrompt
                  question={textQuestion('p4_q3', 'PERGUNTAR: QUE PERGUNTAS VOCÊ TEM AO OBSERVAR ESSA IMAGEM? O QUE VOCÊ GOSTARIA DE SABER SOBRE AS REGRAS DESSE ESPAÇO DE CONVIVÊNCIA?', 'Resposta pessoal.')}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
              </div>
            </div>
          </section>



          {/* Página 5 */}
          <Pagination currentPage={14} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>Manter silêncio, assistir ao fi lme, conversar após o filme. </li>
                  <p>A) Biblioteca, hospital, teatro.</p>
                  <p>B) Resposta pessoal.</p>

                </ol>
              }
            />
          </div>
          <p className="mb-4 text-gray-800"><span className="question-number">1</span> MARQUE UM <strong>X</strong> NAS REGRAS QUE DEVEM SER SEGUIDAS NA SALA DE CINEMA.</p>
          <QuestionRenderer
            hidePrompt
            question={{
              id: 'p5_q1x',
              type: 'multiple-select',
              question: 'MARQUE UM X NAS REGRAS QUE DEVEM SER SEGUIDAS NA SALA DE CINEMA.',
              options: [
                'CONVERSAR DURANTE O FILME',
                'MANTER SILÊNCIO',
                'ASSISTIR AO FILME',
                'LEVANTAR A TODO MOMENTO',
                'USAR O CELULAR DURANTE O FILME',
                'CONVERSAR SOMENTE APÓS O FILME',
              ],
              correctAnswer: [1, 2, 5],
              columns: 1,
            }}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

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
          <Pagination currentPage={15} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) Resposta pessoal.</p>
                  <p>B) Resposta pessoal.</p>
                  <li>Resposta pessoal. </li>
                </ol>
              }
            />
          </div>
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_viajandonodocumento.png')} alt="" />
            <span>VIAJANDO NO DOCUMENTO</span>
          </h4>
          <h5 className="titulo-subsecao">GRUPOS DE CONVIVÊNCIA</h5>
          
          <p className="mb-6 indent-6 text-gray-800">FAZEMOS PARTE DE MUITOS GRUPOS DE CONVIVÊNCIA. GERALMENTE, O PRIMEIRO GRUPO COM QUEM CONVIVEMOS É A FAMÍLIA.</p>
          <p className="mb-6 text-gray-800">CONFORME CRESCEMOS, CONHECEMOS NOVAS PESSOAS E CRIAMOS NOVOS VÍNCULOS.</p>

          <p className="mb-4 text-gray-800"><span className="question-number">1</span> ANALISE AS FOTOGRAFIAS A SEGUIR COM OS SEUS COLEGAS. DEPOIS, LEIA AS LEGENDAS COM ATENÇÃO.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_86_290.png')} alt="Passeio de família" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Jirakul/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center"><strong>PASSEIO</strong> DE FAMÍLIA DURANTE VIAGEM NAS FÉRIAS.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_338_290.png')} alt="Estudantes e professora" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Sergio Pedreira/Pulsar Imagens</p>
              <p className="text-sm mt-2 text-center">ESTUDANTES E PROFESSORA EM <strong>SALA DE AULA.</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_86_409.png')} alt="Crianças jogando futebol" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Renato Soares/Pulsar Imagens</p>
              <p className="text-sm mt-2 text-center">CRIANÇAS <strong>JOGANDO FUTEBOL</strong>.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_6_img_339_409.png')} alt="Crianças na aula de artes" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Luciana Whitaker/Pulsar Imagens</p>
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




          <p className="mb-3 text-gray-800">
            <span className="question-number">2</span>
            FAÇA UM CÍRCULO NOS LUGARES ONDE VOCÊ VAI COM SUA FAMÍLIA. DEPOIS, FAÇA UM RETÂNGULO NOS LUGARES ONDE VOCÊ VAI COM SEUS COLEGAS DA ESCOLA OU COM OS VIZINHOS.
          </p>
          <p className="banco-lugares__dica">
            Clique na palavra: 1 vez = círculo (família) · 2 vezes = retângulo (colegas ou vizinhos) · 3 vezes = tira a marca
          </p>
          <PalavrasCirculoRetangulo
            value={userAnswers.p6_q2 as unknown as Record<string, MarcaLugar> | undefined}
            onChange={(next) => handleAnswerChange('p6_q2', next)}
            disabled={showTeacherView}
          />

          {/* Página 7 */}
          <Pagination currentPage={16} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol start={3} className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>Resposta pessoal.</li>
                </ol>
              }
            />
          </div>
          <p className="mb-3 text-gray-800"><span className="question-number">3</span> LIGUE CADA ATIVIDADE AOS GRUPOS DE CONVIVÊNCIA. SE VOCÊ ACHAR QUE COMBINA COM A SUA EXPERIÊNCIA, PODE LIGAR A MESMA ATIVIDADE PARA MAIS DE UM GRUPO.</p>

          <AtividadeLigar
            left={[
              {
                id: 'brincar',
                label: 'BRINCAR',
                caption: 'BRINCADEIRA AO AR LIVRE.',
                imageSrc: capAsset('images/page_7_img_84_131.png'),
                imageAlt: 'Crianças brincando ao ar livre',
              },
              {
                id: 'almocar',
                label: 'ALMOÇAR',
                caption: 'ALMOÇO EM FAMÍLIA.',
                imageSrc: capAsset('images/page_7_img_84_263.png'),
                imageAlt: 'Almoço em família',
              },
              {
                id: 'viajar',
                label: 'VIAJAR',
                caption: 'VIAGEM DE FÉRIAS.',
                imageSrc: capAsset('images/page_7_img_84_393.png'),
                imageAlt: 'Viagem de férias',
              },
              {
                id: 'estudar',
                label: 'ESTUDAR',
                caption: 'ESTUDANTES E PROFESSORA EM SALA DE AULA.',
                imageSrc: capAsset('images/page_7_img_84_518.png'),
                imageAlt: 'Estudantes e professora em sala de aula',
              },
              {
                id: 'cursos',
                label: 'CURSOS FORA DA ESCOLA',
                caption: 'CURSO DE ROBÓTICA.',
                imageSrc: capAsset('images/page_7_img_84_655.png'),
                imageAlt: 'Curso de robótica',
              },
            ]}
            right={[
              { id: 'familia', label: 'FAMÍLIA' },
              { id: 'amigos', label: 'AMIGOS' },
              { id: 'professores', label: 'PROFESSORES' },
              { id: 'colegas', label: 'COLEGAS' },
            ]}
            value={userAnswers.p7_q3 as unknown as Ligacao[] | undefined}
            onChange={(next) => handleAnswerChange('p7_q3', next)}
            disabled={showTeacherView}
          />
          <p className="rotina-pensamento__credito">New Africa/stock.adobe.com | spotmatikphoto/stock.adobe.com | Gorodenkoff/stock.adobe.com | kapinon/stock.adobe.com | Viktor/Gerado com IA/stock.
            adobe.com</p>
          {/* Página 8 */}
          <Pagination currentPage={17} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol start={4} className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>Resposta pessoal.</li>
                  <li>Resposta pessoal.</li>
                </ol>
              }
            />
          </div>
          <p className="mb-4 text-gray-800"><span className="question-number">4</span> MARQUE AS OPÇÕES DOS LUGARES QUE VOCÊ NÃO PODE FREQUENTAR SEM ESTAR ACOMPANHADO DE UM ADULTO RESPONSÁVEL.</p>
          <QuestionRenderer
            hidePrompt
            question={{
              id: 'p8_q4x',
              type: 'multiple-select',
              question: 'MARQUE AS OPÇÕES DOS LUGARES QUE VOCÊ NÃO PODE FREQUENTAR SEM ESTAR ACOMPANHADO DE UM ADULTO RESPONSÁVEL.',
              options: [
                'PRAÇA',
                'ESCOLA',
                'SUPERMERCADO',
                'SEU QUARTO',
                'PARQUE',
                'RUA',
                'CASA DE PARENTES',
              ],
              correctAnswer: [],
              columns: 1,
              showLetters: true,
            }}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <QuestionRenderer
            question={textQuestion('p8_q4h', 'H) OUTROS:')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <p className="mb-4 text-gray-800"><span className="question-number">5</span> EM ALGUM LUGAR A QUE VOCÊ VAI, É PRECISO USAR UNIFORME OU ALGUMA ROUPA DIFERENTE?</p>
          <QuestionRenderer
            hidePrompt
            question={{
              id: 'p8_q5',
              type: 'multiple-select',
              question: 'EM ALGUM LUGAR A QUE VOCÊ VAI, É PRECISO USAR UNIFORME OU ALGUMA ROUPA DIFERENTE?',
              options: ['SIM', 'NÃO'],
              correctAnswer: [],
              columns: 2,
              exclusive: true,
            }}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <ul className="prompt-conversa">
            <li>POR QUE É NECESSÁRIO USAR UNIFORMES OU ROUPAS ESPECÍFICAS EM ALGUNS LUGARES? CONVERSE COM SEUS COLEGAS E COM O SEU PROFESSOR.</li>
            <li>NOS LUGARES QUE VOCÊ FREQUENTA, HÁ PROFISSIONAIS QUE USAM UNIFORME? CONVERSE COM SEUS COLEGAS E COM O SEU PROFESSOR.</li>
            <li>OS PROFISSIONAIS DESSES LUGARES PRECISAM USAR ALGUM TIPO DE EQUIPAMENTO? CONVERSE COM SEUS COLEGAS E COM O SEU PROFESSOR.</li>
          </ul>

          <div className="flex justify-center mt-8">
            <img src={capAsset('images/page_8_img_122_650.png')} alt="Estudantes com uniforme" className="w-full max-w-md rounded-xl" />
          </div>
          <p className="rotina-pensamento__credito">Александра Гвардейце/stock.adobe.com</p>

          {/* Página 9 */}
          <Pagination currentPage={18} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) Resposta pessoal.</p>
                  <p>B) Resposta pessoal.</p>
                  <p>C) Resposta pessoal.</p>
                 
                </ol>
              }
            />
          </div>
          
          <h5 className="titulo-subsecao">COMBINADOS DA MINHA CASA</h5>
          
          <p className="mb-6 indent-6 text-gray-800">
            PARA MANTER A ORGANIZAÇÃO E O BOM CONVÍVIO DENTRO DE CASA, TODOS DEVEM SE RESPONSABILIZAR POR UMA TAREFA E RESPEITAR OS COMBINADOS ESTABELECIDOS.
          </p>
          <p className="mb-6 text-gray-800"><span className="question-number">1</span> COM OS SEUS COLEGAS, OBSERVE AS FOTOGRAFIAS A SEGUIR.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_114_197.png')} alt="Menina limpando o quarto" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">mashiki/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">MENINA LIMPANDO E ORGANIZANDO O PRÓPRIO QUARTO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_318_197.png')} alt="Irmãos estudando" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Charlize D/peopleimages.com/
              stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">IRMÃOS ESTUDANDO COM O APOIO DOS PAIS.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_114_377.png')} alt="Filha ajudando no almoço" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Prostock-studio/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">FILHA AJUDANDO NO PREPARO DO ALMOÇO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_9_img_317_377.png')} alt="Menino escovando os dentes" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Vergani Fotografi a/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">MENINO ESCOVANDO OS DENTES COM A SUPERVISÃO DA MÃE.</p>
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
          <Pagination currentPage={19} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>PARTICIPAR DAS AULAS, APOIANDO 
                  OS COLEGAS. e RESPEITAR ESPAÇOS COMPARTILHADOS, 
                  COMO O REFEITÓRIO.</li>
                  <p>A) Resposta esperada:  É importante porque ajuda a  praticar a boa convivência 
                  e manter o lugar limpo e organizado, em respeito a todos que convivem nele.</p>
                  <p>B) Resposta pessoal.</p>
                  <li>Resposta esperada:  Organizar os materiais que uso; manter os lugares que uso limpos; cumprimentar e 
                  respeitar as pessoas ao meu redor.</li>
                 
                </ol>
              }
            />
          </div>
          <h5 className="titulo-subsecao">COMBINADOS DA ESCOLA</h5>
         
          <p className="mb-6 indent-6 text-gray-800">
            NA ESCOLA HÁ REGRAS E COMBINADOS QUE PRECISAM SER SEGUIDOS PARA MANTER A BOA CONVIVÊNCIA E A ORGANIZAÇÃO. ALÉM DISSO, É SEMPRE IMPORTANTE RESPEITAR AS PESSOAS AO NOSSO REDOR.
          </p>
          <p className="mb-6 text-gray-800"><span className="question-number">1</span> MARQUE AS REGRAS DE CONVIVÊNCIA QUE SÃO IMPORTANTES NA ESCOLA.</p>

          <FotosMarcarRegras
            fotos={[
              {
                id: 'participar',
                src: capAsset('images/page_10_img_138_199.png'),
                alt: 'Participar das aulas',
                credit: 'Rido/stock.adobe.com',
                caption: 'PARTICIPAR DAS AULAS, APOIANDO OS COLEGAS.',
              },
              {
                id: 'respeitar',
                src: capAsset('images/page_10_img_338_198.png'),
                alt: 'Respeitar espaços compartilhados',
                credit: 'InsideCreativeHouse/stock.adobe.com',
                caption: 'RESPEITAR ESPAÇOS COMPARTILHADOS, COMO O REFEITÓRIO.',
              },
              {
                id: 'comer',
                src: capAsset('images/page_10_img_138_343.png'),
                alt: 'Comer sem permissão em sala de aula',
                credit: 'stockbusters/stock.adobe.com',
                caption: 'COMER SEM PERMISSÃO EM SALA DE AULA E SEM TER ORGANIZADO OS MATERIAIS EM CIMA DA MESA.',
              },
              {
                id: 'acolher',
                src: capAsset('images/page_10_img_338_344.png'),
                alt: 'Não acolher os colegas',
                credit: 'micromonkey/stock.adobe.com',
                caption: (
                  <>
                    NÃO ACOLHER OS COLEGAS DA SALA DE AULA QUANDO ELES ESTIVEREM PRECISANDO.
                  </>
                ),
              },
            ]}
            value={userAnswers.p10_q1x as unknown as string[] | undefined}
            onChange={(next) => handleAnswerChange('p10_q1x', next)}
            disabled={showTeacherView}
          />

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
          <Pagination currentPage={20} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) Resposta esperada: Obrigado e por favor.</p>
                  <p>B) Resposta esperada: Por favor, posso brincar no castelo?</p>
                  <p>C) Resposta esperada: Me desculpe.</p>
                </ol>
              }
            />
          </div>
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_nossalingua.png')} alt="" />
            <span>A NOSSA LÍNGUA</span>
          </h4>
          <h5 className="titulo-subsecao">PALAVRAS DE GENTILEZA</h5>
          
          <p className="mb-6 text-gray-800"><span className="question-number">1</span> LEIA O TEXTO A SEGUIR COM MUITA ATENÇÃO.</p>

          <div className="trecho-livro">
            <div className="trecho-livro__miolo">
              <div className="trecho-livro__texto">
                <p>COMO É QUE SE DIZ QUANDO VOCÊ VAI A UMA CONFEITARIA E TE DÃO UM BISCOITO PARA PROVAR?</p>
                <p>E QUANDO VOCÊ QUER QUE ALGUÉM PEGUE UM LIVRO DE UMA ESTANTE QUE AINDA NÃO ALCANÇA, COMO É QUE SE DIZ?</p>
                <p>QUANDO UM URSO TE DEIXA HIBERNAR NA CAVERNA DELE ATÉ CHEGAR A PRIMAVERA, COMO É QUE SE DIZ?</p>
                <p>SE VOCÊ FOR PEDIR LICENÇA AO REI PARA BRINCAR NO LABIRINTO DO CASTELO, COMO É QUE SE DIZ?</p>
              </div>
              <figure className="trecho-livro__capa">
                <img src={capAsset('images/page_11_img_358_220.png')} alt="Capa do livro Como é que se diz?" />
                <figcaption>Callis Editora</figcaption>
              </figure>
            </div>
            <p className="trecho-livro__ref">
              SCHIMEL, LAWRENCE. <em>Como é que se diz?</em> Ilustrado por Thiago Lopes; traduzido por Raquel Parrine. São Paulo: Callis, 2020.
            </p>
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
          <Pagination currentPage={21} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) por favor </p>
                  <p>B) Obrigado </p>
                  <p>C) Atenção</p>
                  <p>D) Com licença</p>
                  <p>E) Silêncio</p>
                  <p>F) organizar</p>
                  <li>Produção pessoal.</li>
                  <li> </li>
                  <p>CIRCULE: ARRUMAR A CAMA; JANTAR COM FAMILIARES; COLOCAR ROUPA SUJA NO CESTO.</p>
                  <p>FAÇA UM X: ESTUDAR COM O PROFESSOR; LANCHAR NO RECREIO COM OS COLEGAS; PRESTAR ATENÇÃO NA AULA.</p>
                </ol>
              }
            />
          </div>
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_parapraticar.png')} alt="" />
            <span>PARA PRATICAR</span>
          </h4>
          <h3 className="mb-4 text-xl font-bold text-[#f4823b]"></h3>
          <p className="mb-6 text-gray-800"><span className="question-number">1</span> LEIA AS SITUAÇÕES E COMPLETE COM UMA DAS PALAVRAS A SEGUIR.</p>
          <p className="text-center font-bold text-[#f4823b] mb-6">POR FAVOR – SILÊNCIO – OBRIGADO <br /> COM LICENÇA – ORGANIZAR – ATENÇÃO</p>

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

          <p className="mb-4 mt-8 text-gray-800"><span className="question-number">2</span> AGORA É A SUA VEZ DE CRIAR UMA TIRINHA SOBRE RESPEITO E BOA CONVIVÊNCIA.</p>
          <ul className="list-disc marker:text-[#f4823b] ml-6 mb-4 space-y-2 text-gray-800">
            <li>CRIE DOIS PERSONAGENS.</li>
            <li>DESENHE UMA HISTÓRIA EM QUE UM DOS PERSONAGENS PRECISA PEDIR AJUDA, SE DESCULPAR OU AGRADECER.</li>
          </ul>
          <p className="tirinha__dica">Desenhe a história nos três quadrinhos. O desenho fica salvo neste aparelho.</p>
          <div className="tirinha">
            <AreaDesenho
              compact
              storageKey="gee-efai-01-his-c5-tirinha"
              width={960}
              height={280}
              maxWidth="100%"
              borderColor="#f6c9a8"
              hint="Desenhe a tirinha nos três quadrinhos"
            />
          </div>

          <p className="mb-3 mt-8 text-gray-800"><span className="question-number">3</span> CIRCULE AS TAREFAS QUE VOCÊ REALIZA NA SUA CASA E FAÇA UM <strong>X</strong> NAS QUE VOCÊ REALIZA NA SUA ESCOLA.</p>
          <p className="banco-lugares__dica">
            Clique na tarefa: 1 vez = círculo (casa) · 2 vezes = X (escola) · 3 vezes = tira a marca
          </p>
          <TarefasCirculoX
            value={userAnswers.p12_q3 as unknown as Record<string, MarcaTarefa> | undefined}
            onChange={(next) => handleAnswerChange('p12_q3', next)}
            disabled={showTeacherView}
          />

          {/* Página 13 */}
          <Pagination currentPage={22} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol start={4} className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li> Resposta pessoal.</li>
                  
                </ol>
              }
            />
          </div>
          <p className="mb-3 text-gray-800"><span className="question-number">4</span> OBSERVE AS IMAGENS A SEGUIR. DEPOIS, PINTE DE <strong style={{ color: '#00adee' }}>AZUL</strong> AS ATIVIDADES QUE VOCÊ JÁ FEZ COM SUA FAMÍLIA E <strong style={{ color: '#61c196' }}>VERDE</strong> AS ATIVIDADE QUE JÁ FEZ COM SEUS AMIGOS.</p>
          <p className="banco-lugares__dica">
            Clique no quadradinho da foto: 1 vez = azul (família) · 2 vezes = verde (amigos) · 3 vezes = tira a cor
          </p>
          <FotosPintarCores
            fotos={[
              {
                id: 'parque',
                src: capAsset('images/page_13_img_89_150.png'),
                alt: 'Brincar no parque',
                credit: 'NDABCREATIVITY/stock.adobe.com',
                caption: 'BRINCAR NO PARQUE.',
              },
              {
                id: 'churrasco',
                src: capAsset('images/page_13_img_330_153.png'),
                alt: 'Churrasco',
                credit: 'Wosunan/stock.adobe.com',
                caption: 'PREPARAR CHURRASCO NO FIM DE SEMANA.',
              },
              {
                id: 'rua',
                src: capAsset('images/page_13_img_90_342.png'),
                alt: 'Brincar na rua fechada',
                credit: 'Monkey Business/stock.adobe.com',
                caption: 'BRINCAR NA RUA FECHADA.',
              },
              {
                id: 'conversar',
                src: capAsset('images/page_13_img_330_342.png'),
                alt: 'Conversar sobre como foi o dia',
                credit: 'WavebreakMediaMicro/stock.adobe.com',
                caption: 'CONVERSAR SOBRE COMO FOI O DIA.',
              },
              {
                id: 'natureza',
                src: capAsset('images/page_13_img_91_541.png'),
                alt: 'Natureza',
                credit: 'sutlafk/stock.adobe.com',
                caption: 'DEFENDER E PRESERVAR A NATUREZA.',
                wide: true,
              },
            ]}
            value={userAnswers.p13_q4 as unknown as Record<string, CorPintura> | undefined}
            onChange={(next) => handleAnswerChange('p13_q4', next)}
            disabled={showTeacherView}
          />

          {/* Página 14 */}
          <Pagination currentPage={23} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) Resposta pessoal. É esperado que os estudantes comentem sobre se tratar de uma festa/confraternização aparentemente organizada pela vizinhança, com pessoas interagindo entre si.</p>
                  <p>B) Resposta pessoal. Os estudantes podem responder que se aprendem a dividir o mesmo espaço com respeito, a se comunicar melhor uns com os outros e que se sentem próximos dos amigos, vizinhos e familiares.</p>
                </ol>
              }
            />
          </div>
          <div style={{ backgroundColor: '#cde5c0', padding: '1rem', borderRadius: '0.5rem' }}>
            <h3 className="titulo-secao titulo-secao--laranja titulo-secao--missao">
              <img src={capAsset('images/icone_missao.png')} alt="" />
              <span>
                MISSÃO 2
                <i className="titulo-secao__seta" aria-hidden="true" />
                CONHECER A COMUNIDADE
                <br />
                EM QUE SE VIVE
              </span>
            </h3>
            <p className="mb-6 indent-6 text-gray-800">
              NESTA MISSÃO, VOCÊ CONHECERÁ DIFERENTES PESSOAS E SEUS PAPÉIS NOS LUGARES ONDE VIVEM E TRABALHAM. QUAIS PESSOAS VOCÊ OBSERVA NOS LUGARES QUE FREQUENTA? COMO ESSAS PESSOAS CUIDAM DOS LUGARES QUE FREQUENTAM?
            </p>
          </div>

          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_paracomecar.png')} alt="" />
            <span>PARA COMEÇAR</span>
          </h4>
          <h5 className="titulo-subsecao">VIVENDO EM COMUNIDADE</h5>
          <p className="mb-4 indent-6 text-gray-800">
            VIVER EM <span className="palavra-glossario"><strong>COMUNIDADE</strong></span> SIGNIFICA COMPARTILHAR LUGARES COM DIFERENTES PESSOAS, MANTENDO A BOA CONVIVÊNCIA. ALÉM DISSO, AS PESSOAS PODEM AJUDAR UMAS ÀS OUTRAS EM DIFERENTES SITUAÇÕES.
          </p>
          <aside className="caixa-definicao" aria-label="Definição de comunidade">
            <p>
              <strong>COMUNIDADE:</strong> É UM GRUPO DE PESSOAS QUE VIVEM JUNTAS EM UM MESMO LUGAR E APRENDEM A CONVIVER E RESPEITAR UMAS ÀS OUTRAS.
            </p>
          </aside>

          <p className="mb-4 text-gray-800"><span className="question-number">1</span> OBSERVE A IMAGEM A SEGUIR.</p>
          <div className="flex justify-center mb-8">
            <img src={capAsset('images/page_14_img_195_534.png')} alt="Festa na vizinhança" className="w-full max-w-md rounded-xl" />
          </div>
          <p className="rotina-pensamento__credito">fl ysnowfl y/Shutterstock</p>
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
          <Pagination currentPage={24} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) Resposta esperada: Ambas fotografi as apresentam pessoas frequentando a feira livre, na rua, para 
                  vender ou comprar produtos agrícolas.</p>
                  <p>B) Resposta esperada: As roupas, as casas e a arquitetura. </p>
                  <p>C) Resposta esperada: Não, porque o professor está fora do horário de trabalho no momento do encontro.</p>
                </ol>
              }
            />
          </div>
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_estacaodocumental.png')} alt="" />
            <span>ESTAÇÃO DOCUMENTAL</span>
          </h4>
          <h5 className="titulo-subsecao">ESPAÇOS DE CONVIVÊNCIA DA COMUNIDADE</h5>
          <p className="mb-4 indent-6 text-gray-800">VOCÊ JÁ VIU ALGUÉM QUE TRABALHA NA SUA ESCOLA EM OUTRO LUGAR?</p>
          <p className="mb-4 indent-6 text-gray-800">A CONVIVÊNCIA COM A COMUNIDADE TAMBÉM ACONTECE NO DIA A DIA, EM ESPAÇOS COMPARTILHADOS E FREQUENTADOS POR DIFERENTES PESSOAS.</p>
          <p className="mb-6 indent-6 text-gray-800">OS LUGARES TAMBÉM PODEM SE MODIFICAR AO LONGO DO TEMPO E TER NOVAS PESSOAS QUE SE PASSARÃO A FREQUENTÁ-LOS.</p>

          <p className="mb-6 text-gray-800"><span className="question-number">1</span> COM SEUS COLEGAS, COMPARE AS FOTOGRAFIAS A SEGUIR.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_15_img_88_317.png')} alt="Feira livre antiga" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Augusto Malta/Biblioteca Nacional; 
              Instituto Moreira Salles, Rio de Janeiro</p>
              <p className="text-sm mt-2 text-center">DIA DE FEIRA LIVRE NA PRAÇA DA BANDEIRA, RIO DE JANEIRO, RIO DE JANEIRO. 1922.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_15_img_330_320.png')} alt="Feira livre atual" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Roberto Epifanio/Shutterstock</p>
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
          <Pagination currentPage={25} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>Plantam. Fazem a colheita. Transportam os alimentos. Vendem os alimentos. Preparam as refeições.</li>
                  <li>Professor; Costureiro; Arquiteto; Cozinheiro; Coletor de lixo; Veterinário; Motorista.</li>
                </ol>
              }
            />
          </div>
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_viajandonodocumento.png')} alt="" />
            <span>VIAJANDO NO DOCUMENTO</span>
          </h4>
          <h5 className="titulo-subsecao">PROFISSÕES E SEUS PROFISSIONAIS</h5>
          <p className="mb-6 indent-6 text-gray-800">
            A COMUNIDADE TAMBÉM É FORMADA POR DIFERENTES PROFISSIONAIS QUE TRABALHAM FAZENDO COISAS DE QUE PRECISAMOS, COMO ROUPAS, ALIMENTOS, SERVIÇOS E CASAS.
          </p>
          <p className="mb-6 text-gray-800"><span className="question-number">1</span> ABAIXO DE CADA IMAGEM A SEGUIR, ESCREVA UMA LEGENDA QUE COMPLETE A SEGUINTE FRASE:</p>
          <h4 className="mb-4 font-bold text-center text-gray-800">PARA NOS ALIMENTARMOS, HÁ PESSOAS QUE:</h4>

          <div className="etapas-alimento">
            <img src={capAsset('images/page_16_img_85_284.png')} alt="Processo de alimentação" />
            <p className="rotina-pensamento__credito">Flaper. 2016. Digital</p>
            <div className="etapas-alimento__legendas">
              <QuestionRenderer
                hidePrompt
                question={textQuestion('p16_q1a', 'Legenda 1', 'Plantam.')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
              <QuestionRenderer
                hidePrompt
                question={textQuestion('p16_q1b', 'Legenda 2', 'Fazem a colheita.')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
              <QuestionRenderer
                hidePrompt
                question={textQuestion('p16_q1c', 'Legenda 3', 'Transportam os alimentos.')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
              <QuestionRenderer
                hidePrompt
                question={textQuestion('p16_q1d', 'Legenda 4', 'Vendem os alimentos.')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
              <QuestionRenderer
                hidePrompt
                question={textQuestion('p16_q1e', 'Legenda 5', 'Preparam as refeições.')}
                userAnswers={userAnswers}
                onAnswerChange={handleAnswerChange}
                showResults={showTeacherView}
              />
            </div>
          </div>

          

          <p className="mb-6 text-gray-800"><span className="question-number">2</span> PREENCHA A TABELA A SEGUIR COM OS PROFISSIONAIS RESPONSÁVEIS.</p>
          <table className="tabela-profissoes">
            <tbody>
              {PROFISSOES_P16.map((item) => (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  <td>
                    <input
                      type="text"
                      value={(userAnswers[`p16_q2_${item.id}`] as string) || ''}
                      onChange={(e) => handleAnswerChange(`p16_q2_${item.id}`, e.target.value)}
                      placeholder="Digite aqui..."
                      disabled={showTeacherView}
                      aria-label={item.label}
                    />
                    {showTeacherView ? <span className="tabela-profissoes__gabarito">{item.answer}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Página 17 */}
          <Pagination currentPage={26} expandToBookColumn />
          
          <h5 className="titulo-subsecao">PROFISSÕES DO NOSSO BAIRRO</h5>
          <p className="mb-6 indent-6 text-gray-800">
            HÁ PROFISSIONAIS PODEM REALIZAR AS MESMAS ATIVIDADES EM DIFERENTES LOCAIS, COMO EM CASA, NA RUA OU EM OUTROS ESPAÇOS. ESSES PROFISSIONAIS SÃO RESPONSÁVEIS PELOS LUGARES E SERVIÇOS QUE SÃO IMPORTANTES PARA MUITAS PESSOAS.
          </p>
          <p className="mb-6 text-gray-800"><span className="question-number">3</span> COM OS SEUS COLEGAS, OBSERVE AS FOTOGRAFIAS A SEGUIR.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_87_208.png')} alt="Jardineiro" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Tomasz Zajda/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">JARDINEIRO PLANTANDO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_316_208.png')} alt="Catador" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Svitlana/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">CATADOR DE MATERIAL RECICLÁVEL SEPARANDO RESÍDUOS EM COOPERATIVA.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_87_376.png')} alt="Costureira" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Drazen/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">COSTUREIRA FAZENDO REPAROS NA ROUPA.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_317_375.png')} alt="Cozinheiro" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Achira22/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">COZINHEIRO PREPARANDO UMA REFEIÇÃO NO RESTAURANTE.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_86_540.png')} alt="Pedreiro" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Ivan Bruno de M/Shutterstock</p>
              <p className="text-sm mt-2 text-center">PEDREIRO TRABALHANDO NA CONSTRUÇÃO DE UM MURO.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={capAsset('images/page_17_img_317_532.png')} alt="Eletricista" className="w-full rounded-xl" />
              <p className="rotina-pensamento__credito">Kadmy/stock.adobe.com</p>
              <p className="text-sm mt-2 text-center">ELETRICISTA REALIZANDO REPARO.</p>
            </div>
          </div>

          {/* Página 18 */}
          <Pagination currentPage={27} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol start={3} className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) Resposta pessoal.</p>
                  <p>B) Resposta pessoal.</p>
                  <p>C) Resposta pessoal.</p>
                  <p>D) Resposta pessoal.</p>
                </ol>
              }
            />
          </div>
          <p className="mb-3 text-gray-800">
            <span className="question-letter">A)</span> QUAIS DESSES PROFISSIONAIS VOCÊ JÁ OBSERVOU TRABALHANDO NA SUA CASA OU NA SUA RUA?
          </p>
          <QuestionRenderer
            hidePrompt
            question={{
              id: 'p18_q3a',
              type: 'multiple-select',
              question: 'QUAIS DESSES PROFISSIONAIS VOCÊ JÁ OBSERVOU TRABALHANDO NA SUA CASA OU NA SUA RUA?',
              options: [
                'JARDINEIRO',
                'CATADOR DE RECICLÁVEIS',
                'COZINHEIRO',
                'COSTUREIRO',
                'ELETRICISTA',
                'PEDREIRO',
              ],
              correctAnswer: [],
              columns: 2,
            }}
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
          <Pagination currentPage={28} expandToBookColumn />
          
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_nossalingua.png')} alt="" />
            <span>A NOSSA LÍNGUA</span>
          </h4>
          <h5 className="titulo-subsecao">AJUDANDO UNS AOS OUTROS</h5>
          <p className="mb-6 indent-6 text-gray-800">
            VIVER EM COMUNIDADE INCLUI AJUDAR SEUS VIZINHOS QUANDO ELES PRECISAM. ISSO É FUNDAMENTAL PARA MANTER AS PESSOAS UNIDAS E O BEM-ESTAR ENTRE TODOS.
          </p>
          <p className="mb-6 text-gray-800"><span className="question-number">1</span> LEIA A FÁBULA DA GALINHA RUIVA. DEPOIS, FAÇA O QUE SE PEDE.</p>

          <article className="fabula-galinha">
            <h5 className="fabula-galinha__titulo">A GALINHA RUIVA</h5>
            <div className="fabula-galinha__topo">
              <aside className="caixa-definicao caixa-definicao--curta" aria-label="Definição de ruivo">
                <p>
                  <strong>RUIVO:</strong> COR DE CABELO ENTRE O VERMELHO E O AMARELO.
                </p>
              </aside>
              <p className="mb-6 indent-6">
                EM UM SÍTIO NO INTERIOR, MORAVA UMA GALINHA <span className="palavra-glossario"><strong>RUIVA</strong></span>.
                ELA VIVIA COM SEUS PINTINHOS E TINHA MUITOS AMIGOS. UM DIA, PERCEBEU QUE O MILHO ESTAVA MADURO E
                PRONTO PARA SER COLHIDO. DECIDIU FAZER UM BOLO E PEDIU AJUDA PARA SEUS AMIGOS PATO, GATO E PORCO.
              </p>
            </div>
            <p className="mb-6 indent-6">
              O GATO DISSE QUE NÃO PODIA AJUDAR, POIS ESTAVA SONOLENTO. O PATO TAMBÉM DISSE QUE NÃO PODIA, PORQUE
              HAVIA ACABADO DE ALMOÇAR. O PORCO TAMBÉM RECUSOU, E DISSE QUE IRIA BRINCAR.
            </p>
            <p className="mb-6 indent-6">
              A GALINHA RUIVA DESISTIU DE PEDIR AJUDA PARA SEUS AMIGOS E FOI PREPARAR O BOLO SOZINHA. ELA COLHEU AS
              ESPIGAS DE MILHO, FEZ A FARINHA E A MASSA E PÔS NO FORNO.
            </p>
            <figure className="fabula-galinha__foto">
              <img src={capAsset('images/pag28_img1.png')} alt="Bolo de milho em um prato, com espigas de milho ao fundo" />
              <p className="rotina-pensamento__credito">juliana/stock.adobe.com</p>
            </figure>
            <p className="mb-6 indent-6">
              QUANDO O BOLO QUASE PRONTO, SEUS AMIGOS PATO, GATO E PORCO SENTIRAM UM CHEIRO DELICIOSO E RESOLVERAM,
              ENTÃO, CONVIDAR-SE PARA COMER O BOLO PREPARADO PELA GALINHA RUIVA.
            </p>
            <p className="mb-6 indent-6">
              ELA PERGUNTOU QUEM HAVIA PARTICIPADO DO PREPARO DO BOLO, E, COMO NINGUÉM HAVIA COLABORADO, A GALINHA
              RUIVA E SEUS PINTINHOS COMERAM O BOLO SEM A COMPANHIA DOS AMIGOS.
            </p>
            <p className="fabula-galinha__credito">Texto criado para fins didáticos.</p>
          </article>

          {/* Página 20 */}
          <Pagination currentPage={29} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) A Galinha Ruiva percebeu que o milho estava pronto para ser colhido e resolveu fazer um bolo com ele.</p>
                  <p>B) GATO, PATO E PORCO</p>
                  <p>C) A Galinha Ruiva pediu ajuda aos seus amigos porque queria fazer um bolo de milho.</p>
                  <p>D) Não. O Gato disse que estava com sono; o Pato, que havia acabado de almoçar; e o Porco disse que ia brincar.</p>
                  <p>E) 3, 1, 2.</p>
                  <p>F) Agricultor e cozinheiro/boleiro/confeiteiro.</p>
                  <p>G) Produção pessoal.</p>
                </ol>
              }
            />
          </div>
          <QuestionRenderer
            question={textQuestion('p20_q1a', 'A) O QUE ACONTECEU NA HISTÓRIA?', 'A Galinha Ruiva percebeu que o milho estava pronto para ser colhido e resolveu fazer um bolo com ele.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <p className="mb-3 text-gray-800">
            <span className="question-letter">B)</span> QUEM ERAM OS AMIGOS DA GALINHA? MARQUE A ALTERNATIVA CORRETA.
          </p>
          <QuestionRenderer
            hidePrompt
            question={{
              id: 'p20_q1b',
              type: 'multiple-select',
              question: 'QUEM ERAM OS AMIGOS DA GALINHA? MARQUE A ALTERNATIVA CORRETA.',
              options: [
                'GATO, PORCO E RATO',
                'GATO, PATO E PORCO',
                'ELEFANTE, GIRAFA E GATO',
                'PATO, PORCO E LEÃO',
              ],
              correctAnswer: [1],
              columns: 2,
              exclusive: true,
            }}
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

          <p className="mb-4 mt-8 text-gray-800">
            <span className="question-letter">E)</span> OBSERVE AS IMAGENS E ENUMERE AS CENAS, DE 1 A 3, DE ACORDO COM O QUE ACONTECEU NA HISTÓRIA.
          </p>
          <div className="cenas-galinha">
            <img src={capAsset('images/page_20_img_119_297.png')} alt="Três cenas da história da Galinha Ruiva" />
            <p className="rotina-pensamento__credito">Pedro Nogueira</p>
            <div className="cenas-galinha__numeros">
              {[
                { id: 'p20_q1e_a', label: 'Número da cena da esquerda' },
                { id: 'p20_q1e_b', label: 'Número da cena do meio' },
                { id: 'p20_q1e_c', label: 'Número da cena da direita' },
              ].map((cena) => (
                <input
                  key={cena.id}
                  className="cenas-galinha__numero"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={cena.label}
                  value={typeof userAnswers[cena.id] === 'string' ? (userAnswers[cena.id] as string) : ''}
                  disabled={showTeacherView}
                  onChange={(e) => handleAnswerChange(cena.id, e.target.value.replace(/\D/g, '').slice(0, 1))}
                />
              ))}
            </div>
          </div>

          <QuestionRenderer
            question={textQuestion('p20_q1f', 'F) ESCREVA O NOME DAS PROFISSÕES QUE FAZEM AS ATIVIDADES QUE A GALINHA RUIVA FEZ.', 'Agricultor e cozinheiro/boleiro/confeiteiro.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />
          <p className="mb-3 text-gray-800">
            <span className="question-letter">G)</span> DESENHE COMO VOCÊ IMAGINA QUE A HISTÓRIA TERIA TERMINADO SE OS AMIGOS DA GALINHA A TIVESSEM AJUDADO A PREPARAR O BOLO.
          </p>
          <p className="tirinha__dica">Desenhe no quadro. O desenho fica salvo neste aparelho.</p>
          <div className="desenho-galinha">
            <AreaDesenho
              compact
              storageKey="gee-efai-01-his-c5-galinha-final"
              width={760}
              height={420}
              maxWidth="100%"
              borderColor="#f6c9a8"
              hint="Clique e arraste para desenhar"
            />
          </div>

          {/* Página 21 */}
          <Pagination currentPage={30} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li>Resposta esperada: ator, dentista, eletricista etc.</li>
                  <li>ensinar; cozinhar; construir.</li>
                </ol>
              }
            />
          </div>
          <h4 className="titulo-para-comecar">
            <img src={capAsset('images/icone_parapraticar.png')} alt="" />
            <span>PARA PRATICAR</span>
          </h4>
          <QuestionRenderer
            question={textQuestion('p21_q1', '1 QUAIS OUTROS PROFISSIONAIS VOCÊ CONHECE QUE NÃO TRABALHAM NA ESCOLA?', 'Resposta esperada: ator, dentista, eletricista etc.')}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showResults={showTeacherView}
          />

          <p className="mb-4 mt-8 text-gray-800"><span className="question-number">2</span> COMPLETE A FRASE A SEGUIR UTILIZANDO AS PALAVRAS DO QUADRO.</p>
          <p className="quadro-palavras">ENSINAR – COZINHAR – CONSTRUIR</p>
          <p className="frase-completar">
            O PROFESSOR DEVE{' '}
            <input
              className="frase-completar__lacuna"
              type="text"
              aria-label="Complete: o professor deve"
              value={typeof userAnswers.p21_q2_a === 'string' ? userAnswers.p21_q2_a : ''}
              disabled={showTeacherView}
              onChange={(e) => handleAnswerChange('p21_q2_a', e.target.value)}
            />{' '}
            AOS ESTUDANTES EM SALA DE AULA E GARANTIR QUE TODOS APRENDAM. O COZINHEIRO DEVE{' '}
            <input
              className="frase-completar__lacuna"
              type="text"
              aria-label="Complete: o cozinheiro deve"
              value={typeof userAnswers.p21_q2_b === 'string' ? userAnswers.p21_q2_b : ''}
              disabled={showTeacherView}
              onChange={(e) => handleAnswerChange('p21_q2_b', e.target.value)}
            />{' '}
            PARA QUE AS PESSOAS SE ALIMENTEM. E O PEDREIRO DEVE{' '}
            <input
              className="frase-completar__lacuna"
              type="text"
              aria-label="Complete: o pedreiro deve"
              value={typeof userAnswers.p21_q2_c === 'string' ? userAnswers.p21_q2_c : ''}
              disabled={showTeacherView}
              onChange={(e) => handleAnswerChange('p21_q2_c', e.target.value)}
            />{' '}
            CASAS, EDIFÍCIOS E OUTRAS CONSTRUÇÕES, PARA AS PESSOAS MORAREM, TRABALHAREM E REALIZAR DIVERSAS ATIVIDADES.
          </p>

          {/* Página 22 */}
          <Pagination currentPage={31} expandToBookColumn />
          <div className="my-6">
            <TeacherButton
              visible={SHOW_TEACHER_BUTTON}
              content={
                <ol start={3} className="list-decimal marker:text-[#f4823b] ml-6 mb-8 space-y-4 text-gray-800">
                  <li></li>
                  <p>A) Resposta pessoal.</p>
                  <p>B) Resposta pessoal.</p>
                  <p>C) Resposta pessoal.</p>
                  <p>D) Resposta pessoal.</p>
                </ol>
              }
            />
          </div>
          <p className="mb-6 text-gray-800"><span className="question-number">3</span> EM UM GRUPO COM OS SEUS COLEGAS, SIGA AS INSTRUÇÕES DO PROFESSOR E ENTREVISTE UM TRABALHADOR DA ESCOLA.</p>
          <ul className="list-disc marker:text-[#f4823b] ml-6 mb-8 space-y-2 text-gray-800">
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
          <Pagination currentPage={32} expandToBookColumn />
          <h3 className="titulo-percursos">
            <img src={capAsset('images/icone_percursosaprendizagem.png')} alt="" />
            <span>PERCURSOS DAS APRENDIZAGENS</span>
          </h3>

          <MapaPercursosZoom />

          {/* Página 24 */}
          <Pagination currentPage={33} expandToBookColumn />
          <section className="autoaval-efai">
            <h2 className="autoaval-efai__titulo">AUTOAVALIAÇÃO</h2>
            <p className="autoaval-efai__intro">
              AGORA É O MOMENTO DE VOCÊ AVALIAR SE CUMPRIU AS MISSÕES. PARA ISSO, USE AS CORES DA LEGENDA E PINTE CADA MISSÃO DO JEITO QUE A LEGENDA MOSTRA.
            </p>
            <p className="banco-lugares__dica">
              Clique na caixinha: 1 vez = eu consigo (roxo) · 2 vezes = estou tentando (laranja) · 3 vezes = preciso de ajuda (verde) · 4 vezes = tira a cor
            </p>
            <div className="autoaval-efai__corpo">
              <aside className="autoaval-efai__legenda" aria-label="Legenda da autoavaliação">
                <h3>LEGENDA</h3>
                <ul>
                  <li>
                    <span className="autoaval-efai__cor autoaval-efai__cor--consigo" aria-hidden />
                    EU CONSIGO:
                  </li>
                  <li>
                    <span className="autoaval-efai__cor autoaval-efai__cor--tentando" aria-hidden />
                    ESTOU TENTANDO:
                  </li>
                  <li>
                    <span className="autoaval-efai__cor autoaval-efai__cor--ajuda" aria-hidden />
                    PRECISO DE AJUDA PARA:
                  </li>
                </ul>
              </aside>
              <AutoavaliacaoMissoes
                value={userAnswers.p24_autoavaliacao as unknown as Record<string, NivelAutoaval> | undefined}
                onChange={(next) => handleAnswerChange('p24_autoavaliacao', next)}
                disabled={showTeacherView}
              />
            </div>
          </section>

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