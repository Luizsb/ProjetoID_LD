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
  'sae-at27-ai4-mat-c03': () =>
    import('../../marcas/SAE/livros/SAE_AT27_AI4_V1_LDIDA_MAT_AL_IMP_C03/capitulos/Capitulo.tsx'),
  'sas-at27-af8-mat-c1': () =>
    import('../../marcas/SAS/livros/SAS_AT27_AF8_L1_LDIDA_MAT_AL_IMP_C1/capitulos/Capitulo.tsx'),
  'sas-at27-af8-mat-c1-agoravai': () =>
    import('../../marcas/SAS/livros/SAS_AT27_AF8_L1_LDIDA_MAT_AL_IMP_C1-agoravai/capitulos/Capitulo.tsx'),
};

export function livroEstaPronto(playerKey: string): boolean {
  return Object.prototype.hasOwnProperty.call(bookLoaders, playerKey);
}
