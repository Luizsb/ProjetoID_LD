import { publicUrl } from '../lib/publicUrl';
import SecaoAf from './SecaoAf';

interface ParaSaberMaisProps {
  imageSrc?: string;
}

function ParaSaberMais({ imageSrc }: ParaSaberMaisProps) {
  if (imageSrc) {
    return <SecaoAf imageSrc={imageSrc} title="Para saber mais" alt="Para saber mais" />;
  }

  return (
    <div className="flex items-center gap-3 my-6">
      <img
        src={publicUrl('images/paraSaberMais.png')}
        alt="Para saber mais"
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
        Para saber mais
      </h2>
    </div>
  );
}

export default ParaSaberMais;
