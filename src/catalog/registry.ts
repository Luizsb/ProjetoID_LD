import type { ComponentType } from 'react';

type BookModule = { default: ComponentType };

/**
 * Liga o playerKey do catálogo ao componente React do livro.
 * Livros ainda sem capítulo gerado caem no placeholder (AguardandoCapitulo).
 */
export const bookLoaders: Record<string, () => Promise<BookModule>> = {
  'player-referencia': () => import('../components/Book'),
};
