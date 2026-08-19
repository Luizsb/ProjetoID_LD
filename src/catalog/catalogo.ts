import { useEffect, useState } from 'react';
import { withBase } from '../lib/publicUrl';
import type { Catalog, CatalogBook, CatalogBrand } from './types';

export function conteudoUrl(book: CatalogBook, relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, '');
  return withBase(`conteudo/marcas/${book.marcaId}/livros/${book.id}/${clean}`);
}

export function getBrand(catalogo: Catalog, marcaId: string): CatalogBrand | undefined {
  return catalogo.marcas.find((marca) => marca.id === marcaId);
}

export function getBook(catalogo: Catalog, bookId: string): CatalogBook | undefined {
  const referencia = catalogo.playerReferencia;
  if (referencia && referencia.id === bookId) {
    return {
      id: referencia.id,
      marcaId: 'REFERENCIA',
      titulo: referencia.titulo,
      subtitulo: referencia.subtitulo,
      status: 'pronto',
      playerKey: referencia.playerKey,
    };
  }

  return catalogo.livros.find((livro) => livro.id === bookId);
}

export function useCatalogo() {
  const [catalogo, setCatalogo] = useState<Catalog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(withBase('conteudo/catalogo.json'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível ler o catálogo em ProjetoID_LD.');
        }
        return response.json() as Promise<Catalog>;
      })
      .then((data) => {
        if (!cancelled) setCatalogo(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar o catálogo.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { catalogo, error };
}
