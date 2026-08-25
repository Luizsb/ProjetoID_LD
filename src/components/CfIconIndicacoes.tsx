import CfIconModal from './CfIconModal';
import type { ReactNode } from 'react';

interface CfIconIndicacoesProps {
  iconSrc: string;
  children: ReactNode;
}

function CfIconIndicacoes({ iconSrc, children }: CfIconIndicacoesProps) {
  return (
    <CfIconModal iconSrc={iconSrc} title="INDICAÇÕES">
      {children}
    </CfIconModal>
  );
}

export default CfIconIndicacoes;
