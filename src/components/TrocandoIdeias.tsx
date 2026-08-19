import type { CSSProperties, ReactNode } from 'react';

interface TrocandoIdeiasProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

const ICON_WRAP: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  display: 'block',
  width: 'fit-content',
  maxWidth: 412,
  height: 92,
  margin: '0 0 -35px 0',
  overflow: 'hidden',
};

const ICON: CSSProperties = {
  display: 'block',
  height: 92,
  width: 'auto',
  maxWidth: 412,
  objectFit: 'contain',
  objectPosition: 'left center',
};

const BOX: CSSProperties = {
  border: '1.5px solid #7EB8E4',
  backgroundColor: '#EAF6FC',
  borderRadius: 18,
  padding: '56px 22px 10px',
};

function TrocandoIdeias({
  iconSrc,
  iconAlt = 'Trocando ideias',
  children,
}: TrocandoIdeiasProps) {
  return (
    <section className="trocando-ideias my-6">
      <div style={ICON_WRAP}>
        <img src={iconSrc} alt={iconAlt} style={ICON} />
      </div>
      <div className="trocando-ideias__box" style={BOX}>
        {children}
      </div>
    </section>
  );
}

export default TrocandoIdeias;
