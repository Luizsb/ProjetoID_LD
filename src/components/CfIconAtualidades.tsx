import CfIconModal from './CfIconModal';
import type { ReactNode } from 'react';

interface CfIconAtualidadesProps {
  iconSrc: string;
  children: ReactNode;
}

function CfIconAtualidades({ iconSrc, children }: CfIconAtualidadesProps) {
  return (
    <CfIconModal iconSrc={iconSrc} title="ATUALIDADES">
      {children}
    </CfIconModal>
  );
}

export default CfIconAtualidades;
