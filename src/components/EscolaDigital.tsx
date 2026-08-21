import { publicUrl } from '../lib/publicUrl';
import GameModal from './GameModal';

interface EscolaDigitalProps {
  /**
   * URL externa da videoaula (ex.: https://go.sae.digital/6JolSP).
   * Quando informada, o modal abre a página em iframe.
   */
  link?: string;
  /** Arquivo MP4 local em `public/` (usado se `link`/`href` não forem passados). */
  videoSrc?: string;
  /** Link da videoaula (YouTube, Vimeo, MP4 remoto ou URL da plataforma). */
  href?: string;
  /** Miniatura: arquivo em `public/` ou URL já resolvida (`capAsset(...)`) */
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  introHint?: string;
  /** Se omitido: "Escola Digital" no SAE e "Videoaula do capítulo" no SAS */
  title?: string;
}

function isAbsoluteSrc(src: string): boolean {
  return /^(https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('/');
}

function resolveSrc(src: string): string {
  return isAbsoluteSrc(src) ? src : publicUrl(src);
}

function toEmbedUrl(url: string): string | null {
  const youtube = url.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([\w-]+)/,
  );
  if (youtube) {
    return `https://www.youtube.com/embed/${youtube[1]}`;
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }
  return null;
}

function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function EscolaDigital({
  link,
  videoSrc = 'images/SAE26_AI43_HIS_C07_VA1.mp4',
  href,
  thumbnailSrc = 'images/thumbEscolaDigital.svg',
  thumbnailAlt,
  introHint = 'Clique para assistir a videoaula.',
  title,
}: EscolaDigitalProps) {
  const embedUrl = href ? toEmbedUrl(href) : null;
  const isRemoteVideo = Boolean(href && /\.mp4(\?|$)/i.test(href));
  const videoUrl = isRemoteVideo ? href : href ? null : resolveSrc(videoSrc);
  const heading = title ?? 'Escola Digital';
  const altText = thumbnailAlt ?? `Abrir ${heading}`;
  const externalUrl = link?.trim() || (!href && isExternalUrl(videoSrc) ? videoSrc : undefined);
  const openAsPageLink = Boolean(href && !embedUrl && !isRemoteVideo);

  return (
    <section className="my-6">
      <div className="mb-4 flex items-center gap-3">
        <img
          src={publicUrl('images/escolaDigital.svg')}
          alt=""
          className="object-contain"
        />
        <h2
          className="escola-digital__titulo"
          style={{
            color: '#00000',
            fontFamily: "'Filson Soft', sans-serif",
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'uppercase',
          }}
        >
          {title ? (
            heading
          ) : (
            <>
              <span className="escola-digital__nome escola-digital__nome--sae">Escola Digital</span>
              <span className="escola-digital__nome escola-digital__nome--sas">Videoaula do capítulo</span>
            </>
          )}
        </h2>
      </div>

      <div className="flex w-full justify-center">
        {openAsPageLink ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full max-w-[320px] flex-col items-center gap-3 text-center no-underline sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px]"
          >
            <img
              src={resolveSrc(thumbnailSrc)}
              alt={altText}
              className="h-auto w-full rounded-[24px] shadow-md"
            />
            <p className="mt-2 text-[10px] text-slate-600" style={{ fontSize: '10px' }}>
              {introHint}
            </p>
          </a>
        ) : (
          <GameModal
            thumbnailSrc={resolveSrc(thumbnailSrc)}
            thumbnailAlt={altText}
            introHint={introHint}
          >
            {embedUrl || externalUrl ? (
              <iframe
                src={embedUrl ?? externalUrl}
                title={heading}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full border-0 bg-black"
              />
            ) : (
              <video
                controls
                playsInline
                preload="metadata"
                className="h-full w-full bg-black object-contain"
              >
                <source src={videoUrl ?? resolveSrc(videoSrc)} type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeo.
              </video>
            )}
          </GameModal>
        )}
      </div>
    </section>
  );
}

export default EscolaDigital;
