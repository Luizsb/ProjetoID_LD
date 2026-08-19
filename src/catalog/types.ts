export type BookStatus = 'aguardando' | 'fonte-recebida' | 'pronto';

export interface CatalogBrand {
  id: string;
  nome: string;
  cor: string;
  corAcento: string;
}

export interface CatalogBook {
  id: string;
  marcaId: string;
  titulo: string;
  subtitulo?: string;
  disciplina?: string;
  segmento?: string;
  ano?: string;
  capitulo?: string;
  status: BookStatus;
  fontePdf?: string;
  playerKey: string;
}

export interface PlayerReferencia {
  id: string;
  titulo: string;
  subtitulo?: string;
  playerKey: string;
}

export interface Catalog {
  titulo: string;
  descricao: string;
  playerReferencia?: PlayerReferencia;
  marcas: CatalogBrand[];
  livros: CatalogBook[];
}
