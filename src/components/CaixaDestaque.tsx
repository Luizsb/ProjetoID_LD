import type { ReactNode } from 'react';

interface CaixaDestaqueProps {
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  credit?: string;
  /** Cor de fundo da caixa. Padrão SAS: #b1e0ea */
  backgroundColor?: string;
  /** Se true, a foto fica em círculo. */
  circular?: boolean;
  /** Lado da foto. Padrão: direita. */
  imageSide?: 'left' | 'right';
}

function CaixaDestaque({
  children,
  imageSrc,
  imageAlt = '',
  credit,
  backgroundColor = '#b1e0ea',
  circular = true,
  imageSide = 'right',
}: CaixaDestaqueProps) {
  const foto = imageSrc ? (
    <figure className={`caixa-hipotese__foto${circular ? ' caixa-hipotese__foto--circular' : ''}`}>
      <img src={imageSrc} alt={imageAlt} />
      {credit ? <figcaption className="caixa-hipotese__credito">{credit}</figcaption> : null}
    </figure>
  ) : null;

  const textos = <div className="caixa-hipotese__textos">{children}</div>;

  return (
    <div className="caixa-hipotese" style={{ backgroundColor }}>
      {imageSide === 'left' ? (
        <>
          {foto}
          {textos}
        </>
      ) : (
        <>
          {textos}
          {foto}
        </>
      )}
    </div>
  );
}

export default CaixaDestaque;
