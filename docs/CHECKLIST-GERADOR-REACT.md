# Checklist — Geração React para Livro Digital (LD_BETT)

Documento de referência para a ferramenta que exporta capítulos em React/TypeScript para o projeto **livro-bett** (`React 18 + Vite + TypeScript`).

**Template de referência no repositório:**
- Capítulo completo refinado: `src/components/BookCap08.tsx`
- Capítulo original do livro: `src/components/Book.tsx`
- Tipos de questão: `src/types/questions.ts`
- Validação local: `npm run typecheck` (deve passar sem erros)

---

## 1. Entrega do export (por capítulo)

Cada capítulo deve sair como um pacote autocontido:

```text
SAE_NV_2026_..._C09/
  SAE_NV_2026_..._C09.tsx    # componente do capítulo
  images/                     # todas as imagens referenciadas no TSX
    page_1_img_83_221.png
    page_10_img_102_521.png
    ...
```

Na integração, as imagens vão para `public/images/` do projeto e o `.tsx` vira `src/components/BookCap09.tsx` (ou número equivalente).

---

## 2. Erros obrigatórios a corrigir na geração

Estes itens **quebram o app** ou geram **bug visual** se não forem corrigidos na origem.

### 2.1 Header

**Errado (visto no cap 9):**
```tsx
<Header chapterNumber={1} chapterTitle="Locomotiva Movida a vapor, corria sobre trilhos..." />
```

**Correto:**
```tsx
<Header chapterNumber={9} chapterTitle="Transportes da história" />
```

- `chapterNumber`: número real do capítulo no livro (ex.: 7, 8, 9).
- `chapterTitle`: título editorial do capítulo — **não** usar trecho aleatório do corpo do PDF.

---

### 2.2 Poster (imagem de abertura)

**Errado:**
```tsx
<Poster
  imageSrc="/api/extract-assets/uuid/images/page_1_img_0_0.png"
  creditLine1=""
  creditLine2="Imagem extraída do PDF."
/>
```

**Correto:**
```tsx
<Poster
  imageSrc="images/page_1_img_83_221.png"
  alt="Descrição acessível da imagem"
  creditLine1="Royal Museums Greenwich/Wikimedia Commons"
  creditLine2="CÍRCULO de Joachim Patinir: naus portuguesas..."
/>
```

Regras:
- Path relativo: `images/nome-do-arquivo.png` (sem `/api/...`, sem URL absoluta).
- Créditos extraídos do PDF (fonte + legenda).
- **Não repetir** a mesma imagem de abertura dentro do conteúdo (`<img>` solto no `<Chapter>`). Se está no `Poster`, não duplicar abaixo.

---

### 2.3 Questões — tipos TypeScript válidos

**Errado:**
```ts
{ id: 'ch1_q1', type: 'open', text: 'Pergunta?', answer: 'Resposta esperada.' }
{ id: 'ch1_q2', type: 'text', ... }
{ id: 'ch1_q3', type: 'textarea', ... }
```

**Correto (discursivas abertas):**
```ts
import { Question } from '../types/questions';

const textQuestion = (
  id: string,
  question: string,
  correctAnswer?: string,
  options?: { listDiscLayout?: boolean; number?: number }
): Question => ({
  id,
  type: 'text-input',
  question,
  placeholder: 'Digite aqui...',
  correctAnswer,
  ...options,
});

const chapterQuestions: Question[] = [
  textQuestion(
    'p1_q1',
    'Que detalhes você percebe na imagem dos navios?',
    'Velas grandes, presença de bandeiras...',
    { listDiscLayout: true }
  ),
];
```

Tipos suportados pelo `QuestionRenderer`:
- `text-input`
- `multiple-choice`
- `true-false`
- `alternative`
- `table-fill`
- `fill-blanks`
- `ordering`

Usar `listDiscLayout: true` quando a pergunta aparece como item de lista com bullet roxo no livro impresso (perguntas da página de abertura, por exemplo).

`TeacherAnswers` usa `correctAnswer` para montar o gabarito na visão do professor.

---

### 2.4 Critérios de avaliação (“Agora você já sabe”)

**Errado:**
```tsx
emojiImages={{
  jaSei: publicUrl('images/ja_sei.svg'),
  precisoSaberMais: publicUrl('images/preciso_saber_mais.svg'),
  aindaNaoSei: publicUrl('images/ainda_nao_sei.svg'),
}}
```

**Correto:**
```tsx
<CriteriosAvaliacao
  instanceId="criterios_cap09"
  emojiImages={{
    jaSei: 'images/page_10_img_102_521.png',
    precisoSaberMais: 'images/page_10_img_189_521.png',
    aindaNaoSei: 'images/page_10_img_358_521.png',
  }}
  criterios={[
    { id: 'crit_1', nome: '', pergunta: 'Texto do critério 1.' },
    // ...
  ]}
  userAnswers={userAnswers}
  onAnswerChange={handleAnswerChange}
/>
```

Regras:
- Emojis = PNGs extraídos da **última página** do capítulo (não SVG genérico).
- `instanceId` único por capítulo: `criterios_cap08`, `criterios_cap09`, etc.
- Texto dos critérios: **sem** classes `text-center text-[40px]` — o estilo correto vem do componente (`.criterio-pergunta` dentro de `.chapter-content`).
- Incluir `<AgoraVoceJaSabe />` imediatamente antes de `<CriteriosAvaliacao />`.

---

### 2.5 Imagens no JSX

**Errado:**
```tsx
src="/api/extract-assets/..."
src="C:\Users\...\images\..."
```

**Correto:**
```tsx
src={publicUrl('images/page_3_img_45_120.png')}
```

Toda imagem referenciada deve existir na pasta `images/` do export.

---

### 2.6 JSX — texto com seta

Em strings JSX, usar `→` (unicode), **não** `->` (quebra o TypeScript).

---

## 3. Estrutura React esperada (layout)

Ordem recomendada dentro do componente do capítulo (`BookCapNN`):

```tsx
function BookCap09() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination(START_PAGE); // ver seção 4
  const [showTeacherView] = useState(false);
  useScrollPosition();

  return (
    <div className="min-h-screen w-full bg-gray-200">
      <div className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]">
        <Header chapterNumber={9} chapterTitle="..." />
        <Pagination currentPage={START_PAGE} />
        <Poster imageSrc="images/..." alt="..." creditLine1="..." creditLine2="..." />

        <div className="p-8 md:p-12">
          {/* Se houver vídeo no PDF */}
          <EscolaDigital videoSrc="images/SAE26_AI43_HIS_C09_VA1.mp4" />

          <div className="my-6">
            <TeacherButton visible={SHOW_TEACHER_BUTTON} content={...} />
          </div>

          {/* Conteúdo do capítulo — pode usar <Chapter> ou fragmento direto */}
          <ConversaVai />   {/* início do capítulo, se aplicável */}
          {/* textos, imagens, QuestionRenderer... */}

          <Pagination currentPage={START_PAGE + 1} expandToBookColumn />
          {/* mais conteúdo... */}

          <OrganizandoConhecimentos />  {/* antes das atividades de organização */}
          <TestandoIdeias />            {/* antes de linha do tempo / testes */}
          <SaberesAcao />               {/* antes da investigação final */}

          <AgoraVoceJaSabe />
          <CriteriosAvaliacao ... />
        </div>

        <Footer />
      </div>

      {currentPage > START_PAGE && (
        <button onClick={scrollToTop} ...>
          <img src={publicUrl('images/setaTopo.svg')} alt="Voltar ao início do livro" />
        </button>
      )}
    </div>
  );
}
```

### Regras de layout

| Regra | Detalhe |
|-------|---------|
| Um único `div.p-8.md:p-12` | Todo o conteúdo do capítulo dentro de um wrapper |
| Paginação interna | `<Pagination currentPage={N} expandToBookColumn />` **dentro** do `div.p-8` |
| Poster fora do `p-8` | Entre header/paginação inicial e o bloco de conteúdo |
| Escola Digital | Antes do primeiro `TeacherButton`, se o capítulo tiver vídeo |
| `expandToBookColumn` | Obrigatório nas paginações internas (evita bandeira cortada) |

---

## 4. Paginação do livro inteiro

A ferramenta pode numerar páginas **relativas ao capítulo** (1, 2, 3…) na geração, desde que exporte também:

```json
{
  "chapterNumber": 9,
  "chapterTitle": "Transportes da história",
  "startPage": 23,
  "pageCount": 10
}
```

Na integração: `usePagination(startPage)` e cada `<Pagination currentPage={startPage + offset} />`.

Exemplo cap 9 (10 páginas, livro começa na 23):
- Página do capítulo 1 → `currentPage={23}`
- Página do capítulo 10 → `currentPage={32}`

Botão “voltar ao topo”: `currentPage > startPage` (não usar número fixo como `> 3`).

---

## 5. Nome do componente e imports

Por capítulo:
- Função: `BookCap09` (não `Book`)
- Export: `export default BookCap09`
- Imports relativos ao projeto: `'../lib/publicUrl'`, `'../types/questions'`, `'../hooks/useUserAnswers'`, etc.

Imports mínimos típicos:
```tsx
import { useState } from 'react';
import { publicUrl } from '../lib/publicUrl';
import { Question } from '../types/questions';
import Header from './Header';
import Pagination from './Pagination';
import Poster from './Poster';
import TeacherButton from './TeacherButton';
import { TeacherAnswers } from './TeacherAnswers';
import QuestionRenderer from './QuestionRenderer';
import AgoraVoceJaSabe from './AgoraVoceJaSabe';
import CriteriosAvaliacao from './CriteriosAvaliacao';
import Footer from './Footer';
import EscolaDigital from './EscolaDigital';
import ConversaVai from './ConversaVai';
import OrganizandoConhecimentos from './OrganizandoConhecimentos';
import TestandoIdeias from './TestandoIdeias';
import SaberesAcao from './SaberesAcao';
import { useUserAnswers } from '../hooks/useUserAnswers';
import { usePagination } from '../hooks/usePagination';
import { useScrollPosition } from '../hooks/useScrollPosition';
```

---

## 6. QuestionRenderer — uso correto

```tsx
<QuestionRenderer
  question={chapterQuestions[0]}
  userAnswers={userAnswers}
  onAnswerChange={handleAnswerChange}
  showResults={showTeacherView}
/>
```

Preferir busca por `id` em vez de índice fixo:
```tsx
const getQuestionById = (id: string) =>
  chapterQuestions.find((q) => q.id === id)!;

<QuestionRenderer question={getQuestionById('p5_q2')} ... />
```

---

## 7. Checklist de validação antes de entregar o export

### Bloqueantes (deve passar 100%)

- [ ] `npm run typecheck` passa no arquivo gerado (quando colocado no projeto)
- [ ] `Header` com `chapterNumber` e `chapterTitle` corretos
- [ ] `Poster` com `images/...` e créditos; sem imagem duplicada no corpo
- [ ] Nenhum path `/api/extract-assets/`
- [ ] Todas as questões com `type` válido (`text-input`, etc.)
- [ ] Campos `question` + `correctAnswer` (não `text` + `answer`)
- [ ] `CriteriosAvaliacao` com PNGs do capítulo + `instanceId` único
- [ ] `AgoraVoceJaSabe` presente antes dos critérios
- [ ] Pasta `images/` contém **todas** as imagens referenciadas no TSX
- [ ] Paginações internas com `expandToBookColumn`
- [ ] Um único `div.p-8.md:p-12` envolvendo o conteúdo

### Desejáveis (paridade visual com cap 7/8)

- [ ] `EscolaDigital` com `videoSrc` quando o PDF tiver videoaula
- [ ] `ConversaVai` no início do conteúdo
- [ ] `OrganizandoConhecimentos` antes das atividades de síntese
- [ ] `TestandoIdeias` antes de linha do tempo / exercícios de teste
- [ ] `SaberesAcao` antes da investigação / projeto
- [ ] Metadado `startPage` exportado junto ao TSX

---

## 8. Integração manual no projeto (fora da ferramenta)

Passos que o time do livro faz após receber o export:

1. Copiar `images/*` → `public/images/`
2. Copiar `.tsx` → `src/components/BookCapNN.tsx`
3. Ajustar `startPage` na paginação (se o export vier com páginas 1–N)
4. Registrar em `src/App.tsx`: `?cap=9` → `<BookCap09 />`
5. Rodar `npm run typecheck` e `npm run dev`
6. Testar: `http://localhost:5173/?cap=9`

---

## 9. Histórico de problemas por capítulo (referência)

| Cap | Problema na geração | Status após integração manual |
|-----|---------------------|-------------------------------|
| 8 | Header fixo cap 7, Poster errado, questões `open`, paginação fora do `p-8`, emojis SVG | Corrigido em `BookCap08.tsx` |
| 9 | Header cap 1 + título do PDF, `/api/extract-assets`, imagem duplicada, `type: 'open'`, emojis SVG | Corrigido pontualmente; estrutura `<Chapter>` mantida |

**Meta para próximo livro:** a ferramenta entregar o export já conforme este checklist, reduzindo correções manuais à paginação global (`startPage`) e registro no `App.tsx`.

---

## 10. Contato / referência rápida

- Repositório: `livro-bett-main`
- Arquivo modelo mais atual: `src/components/BookCap08.tsx`
- Tipos: `src/types/questions.ts`
- Componente de critérios: `src/components/CriteriosAvaliacao.tsx`
