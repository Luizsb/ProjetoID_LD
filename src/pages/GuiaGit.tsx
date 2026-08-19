import { useState } from 'react';
import { catalogHref } from '../catalog/useHashRoute';

const STEPS = [
  {
    id: 'pull',
    title: 'Atualizar',
    when: 'Antes de começar a mexer',
    cmds: ['git checkout main', 'git pull origin main'],
  },
  {
    id: 'branch',
    title: 'Branch',
    when: 'Uma tarefa = uma branch',
    cmds: ['git checkout -b feat/nome-curto'],
  },
  {
    id: 'dev',
    title: 'Desenvolver',
    when: 'Código, PDF, catálogo',
    cmds: ['npm run dev'],
  },
  {
    id: 'commit',
    title: 'Commit',
    when: 'Pacote de mudança pronto',
    cmds: ['git add .', 'git commit -m "Por que mudou"'],
  },
  {
    id: 'push',
    title: 'Push',
    when: 'Subir para o GitHub',
    cmds: ['git push -u origin feat/nome-curto'],
  },
  {
    id: 'pr',
    title: 'Pull Request',
    when: 'Pedir revisão',
    cmds: ['GitHub: New pull request → base main'],
  },
  {
    id: 'merge',
    title: 'Merge',
    when: 'Aprovar e juntar na main',
    cmds: ['GitHub: Merge pull request'],
  },
  {
    id: 'sync',
    title: 'Sincronizar',
    when: 'Todo mundo puxa o resultado',
    cmds: ['git checkout main', 'git pull origin main'],
  },
] as const;

const COMBINADO: [string, string][] = [
  ['Antes de codar', 'git pull na main — pega o que já foi juntado'],
  ['Durante a tarefa', 'Trabalhar só na própria branch feat/…'],
  ['Subir', 'commit + push da branch e abrir Pull Request para main'],
  ['Revisar', 'Outra pessoa do time revisa o PR e faz merge'],
  ['Depois do merge', 'git checkout main e git pull — o time fica alinhado'],
];

function GuiaGit() {
  const [activeId, setActiveId] = useState<(typeof STEPS)[number]['id']>('pull');
  const step = STEPS.find((item) => item.id === activeId) ?? STEPS[0];

  return (
    <div className="min-h-screen bg-[#f3f0f5]">
      <header className="bg-[#80298F] px-6 py-10 text-white md:px-12">
        <a className="text-sm text-[#F4C2FF] hover:underline" href={catalogHref()}>
          ← Biblioteca
        </a>
        <h1 className="mt-3 text-3xl font-black md:text-4xl">Trabalhar em conjunto</h1>
        <p className="mt-3 max-w-2xl text-white/90">
          O time usa o mesmo repositório. Ninguém edita a main direto: cada alteração
          vai numa branch, vira Pull Request e só então entra para todo mundo.
        </p>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-6 py-8 md:px-12">
        <div className="grid gap-3 sm:grid-cols-3">
          <Info label="Repositório" value="ProjetoID_LD" />
          <Info label="Branch estável" value="main" />
          <Info label="Branch da tarefa" value="feat/…" />
        </div>

        <section>
          <h2 className="mb-2 text-xl font-bold text-neutral-900">Como sobe uma alteração</h2>
          <p className="mb-4 text-sm text-neutral-600">
            Clique num passo para ver o comando. A ordem é sempre a mesma.
          </p>
          <ol className="mb-6 flex flex-wrap gap-2">
            {STEPS.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={
                    item.id === activeId
                      ? { backgroundColor: '#80298F', color: '#fff' }
                      : { backgroundColor: '#fff', color: '#444' }
                  }
                >
                  {index + 1}. {item.title}
                </button>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl bg-white p-6">
            <p className="text-xs font-semibold tracking-wide text-[#80298F]">{step.when}</p>
            <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
            <div className="mt-4 space-y-2">
              {step.cmds.map((cmd) => (
                <pre
                  key={cmd}
                  className="overflow-x-auto rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-800"
                >
                  {cmd}
                </pre>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-neutral-900">Combinado do time</h2>
          <div className="overflow-hidden rounded-2xl bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-5 py-3 font-medium">Momento</th>
                  <th className="px-5 py-3 font-medium">O que fazer</th>
                </tr>
              </thead>
              <tbody>
                {COMBINADO.map(([momento, acao]) => (
                  <tr key={momento} className="border-t border-neutral-100">
                    <td className="px-5 py-3 font-medium text-neutral-900">{momento}</td>
                    <td className="px-5 py-3 text-neutral-700">{acao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-neutral-900">Se duas pessoas editarem o mesmo arquivo</h2>
          <p className="mb-4 text-sm text-neutral-600">
            O Git para e marca o arquivo. Ajustem o trecho e depois:
          </p>
          <pre className="overflow-x-auto rounded-2xl bg-neutral-900 p-5 text-sm text-white">
            {`git add .
git commit -m "Resolve conflito."
git push`}
          </pre>
          <p className="mt-4 text-sm text-neutral-500">
            Não commitar node_modules, dist nem .env — já estão no .gitignore.
          </p>
        </section>
      </main>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-5 py-4">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 font-bold text-neutral-900">{value}</p>
    </div>
  );
}

export default GuiaGit;
