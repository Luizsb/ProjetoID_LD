import type { ComponentType } from 'react';

type BookModule = { default: ComponentType };

/**
 * Liga o playerKey do catálogo ao componente React do livro.
 * Livros ainda sem capítulo gerado caem no placeholder (AguardandoCapitulo).
 */
export const bookLoaders: Record<string, () => Promise<BookModule>> = {
  'player-referencia': () => import('../components/Book'),
  'sas-pg27-ai3-cie-c1': () =>
    import('../../marcas/SAS/livros/SAS_PG27_AI3_L1_LDIDA_CIE_AL_IMP_C1/capitulos/Capitulo.tsx'),
};
