import { publicUrl } from '../lib/publicUrl';

interface PosterProps {
  imageSrc?: string;
  alt?: string;
  creditLine1?: string;
  creditLine2?: string;
  creditAlign?: 'left' | 'center' | 'right';
  /** `contain` mostra a imagem inteira (mapas verticais). O padrão recorta no formato da capa. */
  fit?: 'cover' | 'contain';
}

function Poster({
  imageSrc = 'images/page_1_img_39_225.png',
  alt = 'O mercado de peixe nos degraus da ponte de Rialto, Veneza',
  creditLine1 = 'Myles Birket Foster/Wikimedia Commons. FOSTER, Myles Birket.',
  creditLine2 = 'FOSTER, Myles Birket. O mercado de peixe nos degraus da ponte de Rialto, Veneza. 1875. Aquarela realçada com bodycolor, 43 x 67 cm. Assinado com monograma.',
  creditAlign = 'right',
  fit = 'cover',
}: PosterProps) {
  const src =
    /^(https?:)?\/\//.test(imageSrc) || imageSrc.startsWith('/')
      ? imageSrc
      : publicUrl(imageSrc);
  const hasCredits = Boolean(creditLine1 || creditLine2);
  const creditMargin =
    creditAlign === 'center' ? '0 auto' : creditAlign === 'left' ? '0' : '0 0 0 auto';
  const isContain = fit === 'contain';

  return (
    <section
      className={
        isContain
          ? 'flex w-full items-center justify-center px-3 py-6 sm:px-4 sm:py-8 md:px-0'
          : 'flex w-full items-center justify-center px-3 py-4 sm:px-4 sm:py-5 md:h-[371px] md:px-0 md:py-0'
      }
      style={{
        backgroundImage: `url('${publicUrl('images/pattern_branco.png')}')`,
        backgroundRepeat: 'repeat',
        ...(isContain ? {} : { paddingTop: '0px!important' }),
        backgroundSize: 'contain',
      }}
    >
      <figure
        className={
          isContain
            ? 'relative w-full max-w-[420px] overflow-hidden rounded-[20px]'
            : 'relative aspect-[533/335] w-full max-w-[533px] overflow-hidden rounded-[20px]'
        }
      >
        <img
          src={src}
          alt={alt}
          className={
            isContain
              ? 'block h-auto w-full object-contain'
              : 'block h-full w-full object-cover'
          }
        />

        {hasCredits ? (
        <div
          className={`poster-creditos pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pb-8 pt-16 md:px-12 ${creditAlign === 'center' ? 'text-center' : creditAlign === 'left' ? 'text-left' : 'text-right'}`}
        >
          <p
            className="font-myriad-vf"
            style={{
              color: '#FFF',
              textAlign: creditAlign,
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              width: '497px',
              maxWidth: '100%',
              margin: creditMargin,
            }}
          >
            {creditLine1}
          </p>
          <p
            className="font-myriad-vf"
            style={{
              color: '#FFF',
              textAlign: creditAlign,
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              width: '497px',
              maxWidth: '100%',
              margin: creditAlign === 'center' ? '8px auto 0' : creditAlign === 'left' ? '8px 0 0' : '8px 0 0 auto',
            }}
          >
            {creditLine2}
          </p>
        </div>
        ) : null}
      </figure>
    </section>
  );
}

export default Poster;
