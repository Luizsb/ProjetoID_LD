import { useEffect, useId, useState, type ReactNode } from 'react';
import { publicUrl } from '../lib/publicUrl';

interface GameModalProps {
  /** Texto do botão quando não há miniatura */
  buttonLabel?: string;
  /** Caminho público da miniatura (ex.: images/thumbODA.png) — se definido, substitui o botão de texto */
  thumbnailSrc?: string;
  /** Texto acima da miniatura */
  introTitle?: string;
  /** Texto abaixo da miniatura */
  introHint?: string;
  /** Atributo alt da imagem */
  thumbnailAlt?: string;
  /** Conteúdo do jogo: iframe, componente React, etc. */
  children: ReactNode;
}

function GameModal({
  buttonLabel = 'Abrir jogo',
  thumbnailSrc,
  introTitle,
  introHint = 'Clique para jogar',
  thumbnailAlt,
  children,
}: GameModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

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

  const altText =
    thumbnailAlt ?? introTitle ?? 'Abrir atividade interativa';

  const thumbResolved =
    thumbnailSrc &&
    (thumbnailSrc.startsWith('http:') ||
      thumbnailSrc.startsWith('https:') ||
      thumbnailSrc.startsWith('data:') ||
      thumbnailSrc.startsWith('/') ||
      thumbnailSrc.startsWith(import.meta.env.BASE_URL || '/'))
      ? thumbnailSrc
      : thumbnailSrc
        ? publicUrl(thumbnailSrc.replace(/^\//, ''))
        : undefined;

  return (
    <>
      {thumbResolved ? (
        <div className="flex w-full max-w-[320px] flex-col items-center gap-3 text-center sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px]">
          {introTitle && (
            <p className="font-myriad-vf text-base font-semibold text-black md:text-lg">{introTitle}</p>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative w-full overflow-hidden rounded-[24px] border-0 p-0 shadow-md ring-2 ring-transparent transition hover:ring-[#80298F] focus:outline-none focus:ring-2 focus:ring-[#80298F] focus:ring-offset-2"
            aria-label={altText}
          >
            <img
              src={thumbResolved}
              alt={altText}
              className="h-auto w-full max-w-[320px] rounded-[24px] brightness-[0.72] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px]"
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-[24px] bg-black/35 transition group-hover:bg-black/40"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[2.5px] border-white bg-[#7B2D8E] shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition group-hover:scale-105 sm:h-[88px] sm:w-[88px]"
              aria-hidden
            >
              {/* Padrão BET: play + anel em 3 arcos com sombra longa */}
              <svg
                viewBox="0 0 100 100"
                className="h-[58px] w-[58px] sm:h-[66px] sm:w-[66px]"
                aria-hidden
              >
                <defs>
                  <g id="oda-play-ring">
                    {/* gaps em ~12h, 4h e 8h */}
                    <path
                      d="M56.7 18.7 A32 32 0 0 1 80.4 59.9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M73.7 73.7 A32 32 0 0 1 26.3 73.7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.6 59.9 A32 32 0 0 1 43.3 18.7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                  </g>
                </defs>
                <g transform="translate(3.2 3.2)" color="#4A1560" opacity="0.5">
                  <use href="#oda-play-ring" />
                  <path d="M41 35 L41 65 L66 50 Z" fill="currentColor" />
                </g>
                <g color="white">
                  <use href="#oda-play-ring" />
                  <path d="M41 35 L41 65 L66 50 Z" fill="currentColor" />
                </g>
              </svg>
            </span>
          </button>
          {introHint && (
            <p className="mt-2 text-[10px] text-slate-600" style={{ fontSize: '10px' }}>{introHint}</p>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-full border-2 border-[#80298F] bg-white px-4 py-2 text-sm font-semibold text-[#80298F] shadow-sm transition hover:bg-[#F9DDFF] focus:outline-none focus:ring-2 focus:ring-[#80298F] focus:ring-offset-2 md:text-base"
        >
          {buttonLabel}
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Fechar atividade (fundo)"
            onClick={() => setIsOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[61] flex h-[75dvh] w-[95vw] min-h-0 min-w-0 max-h-[90dvh] max-w-[1100px] flex-col overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/15 sm:h-[75vh] sm:w-[75vw]"
          >
            <span id={titleId} className="sr-only">
              Atividade interativa
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-[70] flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[46px] border-[3px] border-solid border-white bg-[#80298F] shadow-md transition hover:bg-[#6b2178] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-transparent sm:right-4 sm:top-4"
              aria-label="Fechar atividade"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="aspect-[1/1] h-[14px] w-[14px] shrink-0"
                aria-hidden
              >
                <path
                  fill="#FFF"
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                />
              </svg>
            </button>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden [&_iframe]:h-full [&_iframe]:min-h-0 [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:max-h-none [&_iframe]:rounded-none">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameModal;
