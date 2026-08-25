import type { ReactNode } from 'react';
import BotaoVideoResolucao from './BotaoVideoResolucao';

interface QuestaoEnemProps {
  nivelSrc: string;
  nivelAlt?: string;
  /** Link da videoaula de resolução (substitui o QR Code impresso). */
  videoLink?: string;
  children: ReactNode;
}

function QuestaoEnem({
  nivelSrc,
  nivelAlt = 'Nível da questão',
  videoLink,
  children,
}: QuestaoEnemProps) {
  return (
    <div className={`enem-questao${videoLink !== undefined ? ' enem-questao--com-video' : ''}`}>
      <div className="enem-questao__lateral">
        <img className="enem-questao__nivel" src={nivelSrc} alt={nivelAlt} />
        {videoLink !== undefined ? (
          <BotaoVideoResolucao link={videoLink} />
        ) : null}
      </div>
      <div className="enem-questao__corpo">{children}</div>
    </div>
  );
}

export default QuestaoEnem;
