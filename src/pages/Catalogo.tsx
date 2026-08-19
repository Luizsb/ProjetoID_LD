import { useMemo, useState } from 'react';
import { conteudoUrl, getBrand, useCatalogo } from '../catalog/catalogo';
import { bookHref } from '../catalog/useHashRoute';
import type { CatalogBook } from '../catalog/types';

const STATUS_LABEL: Record<CatalogBook['status'], string> = {
  aguardando: 'Aguardando',
  'fonte-recebida': 'Fonte recebida',
  pronto: 'Pronto para ver',
};

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
            className="mb-8 block rounded-2xl bg-neutral-900 p-6 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-xs font-semibold tracking-wide text-[#F4C2FF]">Player compartilhado</p>
            <h2 className="mt-1 text-xl font-bold">{catalogo.playerReferencia.titulo}</h2>
            {catalogo.playerReferencia.subtitulo ? (
              <p className="mt-2 text-sm text-white/75">{catalogo.playerReferencia.subtitulo}</p>
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
            return (
              <li key={livro.id}>
                <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-md">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: marca?.corAcento ?? '#eee',
                        color: marca?.cor ?? '#333',
                      }}
                    >
                      {marca?.nome ?? livro.marcaId}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      {STATUS_LABEL[livro.status]}
                    </span>
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
                      className="rounded-full px-4 py-2 text-sm font-medium text-white"
                      style={{ backgroundColor: marca?.cor ?? '#80298F' }}
                    >
                      Ver no player
                    </a>
                    {pdfHref ? (
                      <a
                        href={pdfHref}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-800"
                      >
                        Abrir PDF
                      </a>
                    ) : (
                      <span className="rounded-full bg-neutral-50 px-4 py-2 text-sm text-neutral-400">
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
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-medium transition"
      style={
        active
          ? { backgroundColor: color ?? '#80298F', color: '#fff' }
          : { backgroundColor: '#fff', color: '#444' }
      }
    >
      {children}
    </button>
  );
}

export default Catalogo;
