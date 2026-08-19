import type { CSSProperties, ReactNode } from 'react';

interface AgoraEComVoceProps {
  iconSrc: string;
  iconAlt?: string;
  children: ReactNode;
}

const ICON_WRAP: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  display: 'block',
  width: 'fit-content',
  maxWidth: 380,
  height: 77,
  margin: '0 0 12px -28px',
  overflow: 'hidden',
};

const ICON: CSSProperties = {
  display: 'block',
  height: 77,
  width: 'auto',
  maxWidth: 380,
  objectFit: 'contain',
  objectPosition: 'left center',
};

function AgoraEComVoce({
  iconSrc,
  iconAlt = 'Agora é com você',
  children,
}: AgoraEComVoceProps) {
  return (
    <section className="agora-e-com-voce my-6">
      <div style={ICON_WRAP}>
        <img src={iconSrc} alt={iconAlt} style={ICON} />
      </div>
      {children}
    </section>
  );
}

export default AgoraEComVoce;
