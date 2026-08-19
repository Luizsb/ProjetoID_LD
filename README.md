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

- **Biblioteca** — filtro por marca e um card por livro
- **Ver no player** — livro digital (ou tela de slot, se o capítulo ainda não foi convertido)
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

Repositório: [https://github.com/Luizsb/ProjetoID_LD](https://github.com/Luizsb/ProjetoID_LD)

### 1. Convidar a colega (só o dono do repo)

No GitHub: **Settings → Collaborators → Add people**. Ela aceita o convite no e-mail.

Permissão **Write** (pode dar push). Sem isso ela só vê, não sobe alteração.

### 2. Primeiro clone (cada pessoa)

```bash
git clone https://github.com/Luizsb/ProjetoID_LD.git
cd ProjetoID_LD
npm install
npm run dev
```

### 3. Rotina no dia a dia

Antes de mexer, atualize o que a outra pessoa já subiu:

```bash
git checkout main
git pull origin main
```

Trabalhe numa **branch** (evita um sobrescrever o outro na `main`):

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

No GitHub, abra um **Pull Request** da branch para `main`. A outra pessoa revisa e faz merge. Depois:

```bash
git checkout main
git pull origin main
```

Se os dois editarem o mesmo arquivo, o `git pull` pode pedir para resolver conflito. Ajustem o arquivo, depois:

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
