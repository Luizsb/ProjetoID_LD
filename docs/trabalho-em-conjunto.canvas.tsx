import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
  computeDAGLayout,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

const STEPS = [
  {
    id: "pull",
    title: "Atualizar",
    when: "Antes de começar a mexer",
    cmds: ["git checkout main", "git pull origin main"],
  },
  {
    id: "branch",
    title: "Branch",
    when: "Uma tarefa = uma branch",
    cmds: ["git checkout -b feat/nome-curto"],
  },
  {
    id: "dev",
    title: "Desenvolver",
    when: "Código, PDF, catálogo",
    cmds: ["npm run dev"],
  },
  {
    id: "commit",
    title: "Commit",
    when: "Pacote de mudança pronto",
    cmds: ["git add .", 'git commit -m "Por que mudou"'],
  },
  {
    id: "push",
    title: "Push",
    when: "Subir para o GitHub",
    cmds: ["git push -u origin feat/nome-curto"],
  },
  {
    id: "pr",
    title: "Pull Request",
    when: "Pedir revisão",
    cmds: ["GitHub: New pull request → base main"],
  },
  {
    id: "merge",
    title: "Merge",
    when: "Aprovar e juntar na main",
    cmds: ["GitHub: Merge pull request"],
  },
  {
    id: "sync",
    title: "Sincronizar",
    when: "Todo mundo puxa o resultado",
    cmds: ["git checkout main", "git pull origin main"],
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

function FlowDiagram({ active }: { active: StepId }) {
  const theme = useHostTheme();
  const layout = computeDAGLayout({
    nodes: STEPS.map((s) => ({ id: s.id })),
    edges: [
      { from: "pull", to: "branch" },
      { from: "branch", to: "dev" },
      { from: "dev", to: "commit" },
      { from: "commit", to: "push" },
      { from: "push", to: "pr" },
      { from: "pr", to: "merge" },
      { from: "merge", to: "sync" },
    ],
    direction: "horizontal",
    nodeWidth: 92,
    nodeHeight: 44,
    rankGap: 28,
    nodeGap: 16,
    padding: 8,
  });
  const byId = Object.fromEntries(layout.nodes.map((n) => [n.id, n]));

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label="Fluxo: atualizar, branch, desenvolver, commit, push, pull request, merge, sincronizar"
    >
      {layout.edges.map((e) => (
        <line
          key={`${e.from}-${e.to}`}
          x1={e.sourceX}
          y1={e.sourceY}
          x2={e.targetX}
          y2={e.targetY}
          stroke={theme.stroke.secondary}
          strokeWidth={1.5}
        />
      ))}
      {STEPS.map((step) => {
        const n = byId[step.id];
        const on = step.id === active;
        return (
          <g key={step.id}>
            <rect
              x={n.x}
              y={n.y}
              width={92}
              height={44}
              rx={6}
              fill={on ? theme.accent.primary : theme.fill.secondary}
              stroke={on ? theme.accent.primary : theme.stroke.tertiary}
            />
            <text
              x={n.x + 46}
              y={n.y + 27}
              textAnchor="middle"
              fill={on ? theme.text.onAccent : theme.text.primary}
              fontSize={11}
              fontFamily="inherit"
            >
              {step.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TrabalhoEmConjunto() {
  const theme = useHostTheme();
  const [active, setActive] = useCanvasState<StepId>("fluxo-passo", "pull");
  const step = STEPS.find((s) => s.id === active) ?? STEPS[0];

  return (
    <Stack gap={22}>
      <Stack gap={8}>
        <H1>Trabalhar em conjunto</H1>
        <Text tone="secondary">
          Todo o time usa o mesmo repositório. Ninguém edita a main direto:
          cada alteração vai numa branch, vira Pull Request e só então entra
          para todo mundo.
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        <Stat value="ProjetoID_LD" label="Repositório compartilhado" />
        <Stat value="main" label="Branch estável — não editar direto" />
        <Stat value="feat/…" label="Branch de cada tarefa" />
      </Grid>

      <Callout tone="info" title="Acesso ao repositório">
        Quem ainda não tem o projeto: clone, npm install e npm run dev. Quem já
        tem a pasta: git pull origin main e segue o fluxo abaixo.
      </Callout>

      <H2>Como sobe uma alteração</H2>
      <Text tone="secondary">
        Clique num passo para ver o comando. A ordem é sempre a mesma.
      </Text>

      <Card>
        <CardHeader>Fluxo da tarefa</CardHeader>
        <CardBody>
          <FlowDiagram active={active} />
        </CardBody>
      </Card>

      <Row gap={6} wrap>
        {STEPS.map((s) => (
          <span key={s.id}>
            <Pill active={s.id === active} onClick={() => setActive(s.id)}>
              {s.title}
            </Pill>
          </span>
        ))}
      </Row>

      <Card>
        <CardHeader trailing={<Pill size="sm">{step.when}</Pill>}>
          {step.title}
        </CardHeader>
        <CardBody>
          <Stack gap={8}>
            {step.cmds.map((cmd) => (
              <div key={cmd}>
                <Code>{cmd}</Code>
              </div>
            ))}
          </Stack>
        </CardBody>
      </Card>

      <H2>Combinado do time</H2>
      <Table
        headers={["Momento", "O que fazer"]}
        rows={[
          [
            "Antes de codar",
            "git pull na main — pega o que já foi juntado",
          ],
          [
            "Durante a tarefa",
            "Trabalhar só na própria branch feat/…",
          ],
          [
            "Subir",
            "commit + push da branch e abrir Pull Request para main",
          ],
          [
            "Revisar",
            "Outra pessoa do time revisa o PR e faz merge",
          ],
          [
            "Depois do merge",
            "git checkout main e git pull — o time fica alinhado",
          ],
        ]}
        rowTone={["info", "neutral", "success", "warning", "info"]}
      />

      <Divider />

      <H2>Se duas pessoas editarem o mesmo arquivo</H2>
      <Callout tone="warning" title="Conflito no git pull">
        O Git para e marca o arquivo. Ajustem o trecho entre os marcadores e
        depois:
      </Callout>
      <Stack gap={8}>
        <div>
          <Code>git add .</Code>
        </div>
        <div>
          <Code>git commit -m "Resolve conflito."</Code>
        </div>
        <div>
          <Code>git push</Code>
        </div>
      </Stack>

      <H3>O que não vai para o Git</H3>
      <Text tone="secondary">
        node_modules, dist e .env ficam no .gitignore. Sobe código, catálogo e
        fontes dos livros.
      </Text>
      <Text tone="tertiary" style={{ color: theme.text.tertiary }}>
        Fluxo do time · branch main · ProjetoID_LD
      </Text>
    </Stack>
  );
}
