import { conteudoUrl } from '../catalog/catalogo';
import type { CatalogBook, CatalogBrand } from '../catalog/types';

interface AguardandoCapituloProps {
  book: CatalogBook;
  brand?: CatalogBrand;
}

const STATUS_LABEL: Record<CatalogBook['status'], string> = {
  aguardando: 'Aguardando fonte',
  'fonte-recebida': 'PDF recebido — falta o capítulo React',
  pronto: 'Pronto',
};

function AguardandoCapitulo({ book, brand }: AguardandoCapituloProps) {
  const pdfHref = book.fontePdf ? conteudoUrl(book, book.fontePdf) : null;
  const accent = brand?.cor ?? '#80298F';

  return (
    <div className="min-h-screen w-full bg-gray-200">
      <div className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]">
        <header className="px-8 py-10 text-white" style={{ backgroundColor: accent }}>
          <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wide">
            {brand?.nome ?? book.marcaId} · {STATUS_LABEL[book.status]}
          </p>
          <h1 className="text-3xl font-black md:text-4xl">{book.titulo}</h1>
          {book.subtitulo ? <p className="mt-2 text-white/90">{book.subtitulo}</p> : null}
        </header>

        <div className="space-y-6 p-8 md:p-12" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
          <p className="text-lg text-neutral-800">
            Este slot já existe no catálogo. O player compartilhado (header, questões, professor,
            paginação) entra quando o pacote gerado estiver em:
          </p>
          <pre className="overflow-x-auto rounded-xl bg-neutral-100 p-4 text-sm text-neutral-800">
            {`ProjetoID_LD/marcas/${book.marcaId}/livros/${book.id}/
  fonte/          ← PDF original
  capitulos/      ← Capitulo.tsx + images/
  public/         ← ODAs e mídias`}
          </pre>
          {pdfHref ? (
            <p>
              <a
                className="font-medium underline"
                href={pdfHref}
                rel="noreferrer"
                style={{ color: accent }}
                target="_blank"
              >
                Abrir PDF-fonte
              </a>
            </p>
          ) : (
            <p className="text-neutral-600">
              Ainda não há PDF em <code>fonte/</code>. Copie o arquivo para essa pasta e atualize{' '}
              <code>livro.json</code>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AguardandoCapitulo;
