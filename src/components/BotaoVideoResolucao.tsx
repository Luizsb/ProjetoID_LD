import { useEffect, useId, useState } from 'react';

interface BotaoVideoResolucaoProps {
  /** URL da videoaula de resolução (go.sae.digital, YouTube, Vimeo etc.). */
  link?: string;
  label?: string;
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

function BotaoVideoResolucao({
  link,
  label = 'Assistir à vídeo-resolução',
}: BotaoVideoResolucaoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const url = link?.trim() ?? '';
  const embedUrl = url ? toEmbedUrl(url) : null;
  const iframeSrc = embedUrl ?? url;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="enem-questao__video"
        onClick={() => setIsOpen(true)}
        aria-label={label}
        title={label}
      >
        <span className="enem-questao__video-play" aria-hidden>
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="enem-questao__video-texto">
          <span>Vídeo-</span>
          <span>resolução</span>
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Fechar vídeo (fundo)"
            onClick={() => setIsOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[61] flex h-[75dvh] w-[95vw] min-h-0 min-w-0 max-h-[90dvh] max-w-[1100px] flex-col overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/15 sm:h-[75vh] sm:w-[75vw]"
          >
            <span id={titleId} className="sr-only">
              {label}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-[70] flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[46px] border-[3px] border-solid border-white bg-[#008fd5] shadow-md transition hover:bg-[#0077b3] focus:outline-none focus:ring-2 focus:ring-white/80 sm:right-4 sm:top-4"
              aria-label="Fechar vídeo"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#FFF"
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                />
              </svg>
            </button>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  title={label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full border-0 bg-black"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-900 px-6 text-center text-white">
                  <p className="max-w-md text-base leading-relaxed">
                    Link da videoaula de resolução ainda não configurado. Cole a URL do QR Code
                    na prop <code className="text-[#7dd3fc]">videoLink</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BotaoVideoResolucao;
