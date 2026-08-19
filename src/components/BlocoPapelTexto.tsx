import type { ReactNode } from 'react';

interface BlocoPapelTextoProps {
  imageSrc: string;
  imageAlt: string;
  credit?: string;
  children: ReactNode;
}

function BlocoPapelTexto({
  imageSrc,
  imageAlt,
  credit,
  children,
}: BlocoPapelTextoProps) {
  return (
    <figure className="bloco-papel-texto my-8">
      <div className="bloco-papel-texto__folha">
        <div className="bloco-papel-texto__foto">
          <img src={imageSrc} alt={imageAlt} />
          {credit ? (
            <span className="bloco-papel-texto__credito">{credit}</span>
          ) : null}
        </div>
        <figcaption className="bloco-papel-texto__texto">{children}</figcaption>
      </div>
    </figure>
  );
}

export default BlocoPapelTexto;
