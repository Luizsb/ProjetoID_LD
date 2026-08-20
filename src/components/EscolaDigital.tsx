import { publicUrl } from '../lib/publicUrl';
import GameModal from './GameModal';

interface EscolaDigitalProps {
  /**
   * URL externa da videoaula (ex.: https://go.sae.digital/6JolSP).
   * Quando informada, o modal abre a página em iframe.
   */
  link?: string;
  /** Arquivo MP4 local em `public/` (usado se `link` não for passado). */
  videoSrc?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  introHint?: string;
}

function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function EscolaDigital({
  link,
  videoSrc = 'images/SAE26_AI43_HIS_C07_VA1.mp4',
  thumbnailSrc = 'images/thumbEscolaDigital.svg',
  thumbnailAlt = 'Abrir vídeo Escola Digital',
  introHint = 'Clique para assistir a videoaula.',
}: EscolaDigitalProps) {
  const externalUrl = link?.trim() || (isExternalUrl(videoSrc) ? videoSrc : undefined);

  return (
    <section className="my-6">
      <div className="mb-4 flex items-center gap-3">
        <img
          src={publicUrl('images/escolaDigital.svg')}
          alt="Escola Digital"
          className="object-contain"
        />
        <h2
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
          Escola Digital
        </h2>
      </div>

      <div className="flex w-full justify-center">
        <GameModal
          thumbnailSrc={thumbnailSrc}
          thumbnailAlt={thumbnailAlt}
          introHint={introHint}
        >
          {externalUrl ? (
            <iframe
              src={externalUrl}
              title="Videoaula Escola Digital"
              className="h-full w-full border-0 bg-black"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              controls
              playsInline
              preload="metadata"
              className="h-full w-full bg-black object-contain"
            >
              <source src={publicUrl(videoSrc)} type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          )}
        </GameModal>
      </div>
    </section>
  );
}

export default EscolaDigital;
