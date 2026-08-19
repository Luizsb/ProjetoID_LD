# ProjetoID_LD — biblioteca de livros digitais

Projeto **independente** para visualizar vários livros (SAE, Geekie, SAS e Conquista) no novo modelo. A BETT ficou só como referência de UI; não é preciso abrir nem alterar `livro-bett-main`.

---

## Tecnologia

| Camada | Stack |
| ------ | ----- |
| App no navegador | React 18, TypeScript, Vite 5, Tailwind CSS |
| Conteúdo | `catalogo.json` + pastas por marca |
| Persistência no player | `localStorage` |
| Capítulos convertidos | React/TSX em `capitulos/` + imagens |

---

## Como rodar

Abra **esta pasta** no Cursor/Codex (`ProjetoID_LD`) e no terminal:

```bash
npm install
npm run dev
```

Abra o endereço do Vite (em geral `http://localhost:5173`).

## Ver no GitHub Pages (sem `npm run dev`)

Depois do merge na `main`, o GitHub Actions gera o site estático.

1. No repositório: **Settings → Pages → Build and deployment**
2. **Source:** GitHub Actions
3. Na primeira vez, rode o workflow **GitHub Pages** em **Actions** (ou faça um push na `main`)

Endereço (usuário `Luizsb`, repo `ProjetoID_LD`):

https://luizsb.github.io/ProjetoID_LD/

O catálogo e os PDFs/imagens de `marcas/` entram no `dist/conteudo` no build. O player usa hash (`#/livros/...`), então o Pages funciona sem servidor.

---

- **Biblioteca** — filtro por marca e um card por livro
- **Abrir livro digital** — livro digital (ou tela de slot, se o capítulo ainda não foi convertido)
- **Abrir PDF** — PDF-fonte no navegador
- **Construção atual do player** — capítulo de referência já montado na UI

Outros comandos:

```bash
npm run build
npm run preview
npm run typecheck
```

---

## Como estruturar um livro dentro da marca

Códigos de pasta: `SAE`, `GEEKIE`, `SAS`, `CONQUISTA`.

```text
ProjetoID_LD/
  catalogo.json
  src/                              ← player (não misturar com conteúdo)
  public/                           ← imagens/fontes da UI
  _modelo/                          ← copie para um livro novo
  marcas/
    {MARCA}/
      marca.json
      livros/
        {ID_DO_LIVRO}/
          livro.json
          fonte/                    ← PDF original
          capitulos/
            Capitulo.tsx            ← depois da conversão
            images/
          public/                   ← ODAs, vídeos, mídias
```

### Passo a passo

1. Copie `_modelo` para `marcas/{MARCA}/livros/{ID_DO_LIVRO}`.
2. Coloque o PDF em `fonte/` e preencha `fontePdf` em `livro.json`.
3. Complete título, disciplina, segmento (`AI` / `AF` / `EM`), capítulo e `playerKey`.
4. Inclua o livro em `catalogo.json`.
5. Após a geração React: `capitulos/Capitulo.tsx` + `capitulos/images/`.
6. Registre o `playerKey` em `src/catalog/registry.ts`. Sem isso, **Abrir PDF** já funciona; o player mostra a tela de aguardando.

### Exemplo de `livro.json`

```json
{
  "id": "SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03",
  "marcaId": "SAE",
  "titulo": "Matemática — 4º ano",
  "disciplina": "Matemática",
  "segmento": "AI",
  "ano": "4",
  "capitulo": "C03",
  "status": "fonte-recebida",
  "fontePdf": "fonte/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03.pdf",
  "playerKey": "sae-at27-ai4-mat-c03",
  "componente": "capitulos/Capitulo.tsx"
}
```

`status`: `aguardando` · `fonte-recebida` · `pronto`.

---

## Git — trabalhar em conjunto

O guia visual entra no Git com o restante do projeto.

**Acesso rápido (depois de `npm run dev`):** http://localhost:5173/#/guia  
Na biblioteca, o botão **Como trabalhar em conjunto** abre a mesma página.

Cópia no repositório: `docs/trabalho-em-conjunto.canvas.tsx`

Repositório: https://github.com/Luizsb/ProjetoID_LD

### Primeira vez no projeto

```bash
git clone https://github.com/Luizsb/ProjetoID_LD.git
cd ProjetoID_LD
npm install
npm run dev
```

### Rotina no dia a dia

Antes de mexer:

```bash
git checkout main
git pull origin main
```

Uma tarefa = uma branch:

```bash
git checkout -b feat/nome-curto-da-tarefa
```

Quando terminar:

```bash
git add .
git status
git commit -m "Descreva o porquê da mudança."
git pull origin main
git push -u origin feat/nome-curto-da-tarefa
```

No GitHub, abra um **Pull Request** da branch para `main`. Depois do merge:

```bash
git checkout main
git pull origin main
```

Se o `git pull` apontar conflito, ajustem o arquivo e:

```bash
git add .
git commit -m "Resolve conflito."
git push
```

Não commitar `node_modules`, `.env` nem `dist` (já estão no `.gitignore`).

---

## Pilotos atuais

| Marca     | Segmento | Livro |
| --------- | -------- | ----- |
| SAE       | AI       | Matemática 4º ano · C03 |
| SAE       | AF       | Geografia 7º ano · C01 |
| SAE       | EM       | Biologia 1ª série · C01 |
| Geekie    | AI       | História 1º ano 2S · C05 |
| SAS       | AI       | Ciências 3º ano · C01 |
| SAS       | AF       | Matemática 8º ano · C01 |
| SAS       | EM       | Literatura 1ª série · C01 |
| Conquista | —        | Aguardando PDF |
