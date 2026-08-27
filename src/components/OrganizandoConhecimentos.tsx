import { publicUrl } from '../lib/publicUrl';
import SecaoAf from './SecaoAf';

interface OrganizandoConhecimentosProps {
  imageSrc?: string;
  title?: string;
}

function OrganizandoConhecimentos({
  imageSrc,
  title = 'Organizando os Conhecimentos',
}: OrganizandoConhecimentosProps) {
  if (imageSrc) {
    return <SecaoAf imageSrc={imageSrc} title={title} alt={title} />;
  }

  return (
    <div className="flex items-center gap-3 my-6">
      <img
        src={publicUrl('images/organizandoConhecimento.png')}
        alt="Organizando os Conhecimentos"
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
        Organizando os Conhecimentos
      </h2>
    </div>
  );
}

export default OrganizandoConhecimentos;
