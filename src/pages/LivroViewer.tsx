import { Suspense, lazy, useMemo } from 'react';
import { getBook, getBrand, useCatalogo } from '../catalog/catalogo';
import { bookLoaders } from '../catalog/registry';
import { catalogHref } from '../catalog/useHashRoute';
import AguardandoCapitulo from './AguardandoCapitulo';

interface LivroViewerProps {
  bookId: string;
}

function LivroViewer({ bookId }: LivroViewerProps) {
  const { catalogo, error } = useCatalogo();
  const book = catalogo ? getBook(catalogo, bookId) : undefined;
  const brand = catalogo && book ? getBrand(catalogo, book.marcaId) : undefined;

  const BookComponent = useMemo(() => {
    if (!book) return null;
    const loader = bookLoaders[book.playerKey];
    if (!loader) return null;
    return lazy(loader);
  }, [book]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-red-700">{error}</div>
    );
  }

  if (!catalogo) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-600">
        Carregando catálogo…
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-8">
        <p className="text-lg">Livro não encontrado no catálogo.</p>
        <a className="text-[#80298F] underline" href={catalogHref()}>
          Voltar ao catálogo
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-neutral-900 px-4 py-2 text-sm text-white">
        <a className="hover:underline" href={catalogHref()}>
          ← Catálogo
        </a>
        <span className="truncate">
          {brand ? `${brand.nome} · ${book.titulo}` : book.titulo}
        </span>
      </div>
      {BookComponent ? (
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center text-neutral-600">
              Carregando livro…
            </div>
          }
        >
          <BookComponent />
        </Suspense>
      ) : (
        <AguardandoCapitulo book={book} brand={brand} />
      )}
    </div>
  );
}

export default LivroViewer;
