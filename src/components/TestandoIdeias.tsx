import { publicUrl } from '../lib/publicUrl';
import SecaoAf from './SecaoAf';

interface TestandoIdeiasProps {
  imageSrc?: string;
  title?: string;
}

function TestandoIdeias({
  imageSrc,
  title = 'Testando as ideias',
}: TestandoIdeiasProps) {
  if (imageSrc) {
    return <SecaoAf imageSrc={imageSrc} title={title} alt={title} />;
  }

  return (
    <div className="flex items-center gap-3 my-6">
      <img
        src={publicUrl('images/testandoIdeias.png')}
        alt="Testando as ideias"
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
        Testando as ideias
      </h2>
    </div>
  );
}

export default TestandoIdeias;
