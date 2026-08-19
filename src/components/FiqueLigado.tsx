import type { ReactNode } from 'react';

interface FiqueLigadoProps {
  iconSrc: string;
  iconAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
  credit?: string;
  children: ReactNode;
}

function FiqueLigado({
  iconSrc,
  iconAlt = 'Fique ligado!',
  imageSrc,
  imageAlt = '',
  credit,
  children,
}: FiqueLigadoProps) {
  return (
    <section className="fique-ligado">
      <img className="fique-ligado__selo" src={iconSrc} alt={iconAlt} />
      <div className="fique-ligado__caixa">
        <div className="fique-ligado__textos">{children}</div>
        {imageSrc ? (
          <figure className="fique-ligado__capa">
            <img src={imageSrc} alt={imageAlt} />
            {credit ? <figcaption className="fique-ligado__credito">{credit}</figcaption> : null}
          </figure>
        ) : null}
      </div>
    </section>
  );
}

export default FiqueLigado;
