import { useMemo, useState } from 'react';
import { conteudoUrl, getBrand, useCatalogo } from '../catalog/catalogo';
import { livroEstaPronto } from '../catalog/registry';
import { textoSobreFundo } from '../catalog/contrast';
import { bookHref } from '../catalog/useHashRoute';

function StatusTag({ playerKey }: { playerKey: string }) {
  const ok = livroEstaPronto(playerKey);
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
      }`}
    >
      {ok ? 'OK' : 'Em produção'}
    </span>
  );
}

function Catalogo() {
  const { catalogo, error } = useCatalogo();
  const [marcaFiltro, setMarcaFiltro] = useState<string>('todas');

  const livros = useMemo(() => {
    if (!catalogo) return [];
    if (marcaFiltro === 'todas') return catalogo.livros;
    return catalogo.livros.filter((livro) => livro.marcaId === marcaFiltro);
  }, [catalogo, marcaFiltro]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!catalogo) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-600">
        Carregando catálogo…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f0f5]">
      <header className="bg-[#80298F] px-6 py-10 text-white md:px-12">
        <p className="mb-2 text-sm font-medium tracking-wide text-[#F4C2FF]">Novo modelo · ID</p>
        <h1 className="text-3xl font-black md:text-4xl">{catalogo.titulo}</h1>
        <p className="mt-3 max-w-2xl text-white/90">{catalogo.descricao}</p>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 md:px-12">
        {catalogo.playerReferencia ? (
          <a
            href={bookHref(catalogo.playerReferencia.id)}
            className="mb-8 block rounded-2xl bg-white p-6 text-neutral-900 shadow-md ring-2 ring-[#80298F]/25 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold tracking-wide text-[#80298F]">Livro modelo · referência</p>
              <StatusTag playerKey={catalogo.playerReferencia.playerKey} />
            </div>
            <h2 className="mt-2 text-xl font-bold">{catalogo.playerReferencia.titulo}</h2>
            {catalogo.playerReferencia.subtitulo ? (
              <p className="mt-2 text-sm text-neutral-600">{catalogo.playerReferencia.subtitulo}</p>
            ) : null}
          </a>
        ) : null}

        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip active={marcaFiltro === 'todas'} onClick={() => setMarcaFiltro('todas')}>
            Todas as marcas
          </FilterChip>
          {catalogo.marcas.map((marca) => (
            <FilterChip
              key={marca.id}
              active={marcaFiltro === marca.id}
              color={marca.cor}
              onClick={() => setMarcaFiltro(marca.id)}
            >
              {marca.nome}
            </FilterChip>
          ))}
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {livros.map((livro) => {
            const marca = getBrand(catalogo, livro.marcaId);
            const pdfHref = livro.fontePdf ? conteudoUrl(livro, livro.fontePdf) : null;
            const pillBg = marca?.corAcento ?? marca?.cor ?? '#eee';
            const btnBg = marca?.cor ?? '#80298F';
            return (
              <li key={livro.id}>
                <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: pillBg,
                        color: textoSobreFundo(pillBg),
                      }}
                    >
                      {marca?.nome ?? livro.marcaId}
                    </span>
                    <StatusTag playerKey={livro.playerKey} />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">{livro.titulo}</h2>
                  {livro.subtitulo ? (
                    <p className="mt-2 text-sm text-neutral-600">{livro.subtitulo}</p>
                  ) : null}
                  <p className="mt-4 text-sm text-neutral-500">
                    {[livro.disciplina, livro.segmento, livro.ano, livro.capitulo]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    <a
                      href={bookHref(livro.id)}
                      className="rounded-full px-4 py-2 text-sm font-medium"
                      style={{
                        backgroundColor: btnBg,
                        color: textoSobreFundo(btnBg),
                      }}
                    >
                      Abrir livro digital
                    </a>
                    {pdfHref ? (
                      <a
                        href={pdfHref}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900"
                      >
                        Abrir PDF
                      </a>
                    ) : (
                      <span className="rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800">
                        Sem PDF
                      </span>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </main>
      <footer className="border-t border-neutral-200 bg-white px-6 py-6 text-center text-sm text-neutral-600 md:px-12">
        Desenvolvido pelo time de Interações Digitais
      </footer>
    </div>
  );
}

function FilterChip({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: string;
}) {
  const fill = color ?? '#80298F';
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-medium transition"
      style={
        active
          ? { backgroundColor: fill, color: textoSobreFundo(fill) }
          : { backgroundColor: '#fff', color: '#444' }
      }
    >
      {children}
    </button>
  );
}

export default Catalogo;
