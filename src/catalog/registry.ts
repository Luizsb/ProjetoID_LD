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
  'sae-at27-em1-bio-c01': () =>
    import('../../marcas/SAE/livros/SAE_AT27_EM1_V1_LDIDA_BIO_AL_IMP_C01/capitulos/Capitulo.tsx'),
  'sas-at27-af8-mat-c1': () =>
    import('../../marcas/SAS/livros/SAS_AT27_AF8_L1_LDIDA_MAT_AL_IMP_C1/capitulos/Capitulo.tsx'),
  'gki-27-em1-bio-c01': () =>
    import('../../marcas/GEEKIE/livros/GKI_27_EM1_V1_LDIDA_BIO_AL_C01/capitulos/GKI_27_EM1_V1_LDIDA_BIO_AL_C01.tsx'),
  'gki-27-af8-mat-c1': () =>
    import('../../marcas/GEEKIE/livros/GKI_27_AF8_V1_LDIDA_MAT_AL_PF_C1/capitulos/GKI_27_AF8_V1_LDIDA_MAT_AL_PF_C01.tsx'),
  'gee-efai-01-his-c5': () =>
    import('../../marcas/GEEKIE/livros/GEE_EFAI_01_26_2S_LV_HIS_AL_C5/capitulos/GEE_EFAI_01_26_2S_LV_HIS_AL_C01.tsx'),
};

export function livroEstaPronto(playerKey: string): boolean {
  return Object.prototype.hasOwnProperty.call(bookLoaders, playerKey);
}
