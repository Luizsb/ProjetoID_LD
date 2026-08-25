import CfIconModal from './CfIconModal';
import type { ReactNode } from 'react';

interface CfIconInfoMaisProps {
  iconSrc: string;
  children: ReactNode;
}

function CfIconInfoMais({ iconSrc, children }: CfIconInfoMaisProps) {
  return (
    <CfIconModal iconSrc={iconSrc} title="INFO+">
      {children}
    </CfIconModal>
  );
}

export default CfIconInfoMais;
