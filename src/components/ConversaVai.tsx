import { publicUrl } from '../lib/publicUrl';
import SecaoAf from './SecaoAf';

interface ConversaVaiProps {
  imageSrc?: string;
}

function ConversaVai({ imageSrc }: ConversaVaiProps) {
  if (imageSrc) {
    return <SecaoAf imageSrc={imageSrc} title="Conversa vai..." alt="Conversa vai" />;
  }

  return (
    <div className="flex items-center gap-3 my-6">
      <img
        src={publicUrl('images/conversaVai.png')}
        alt="Conversa vai"
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
        Conversa vai
      </h2>
    </div>
  );
}

export default ConversaVai;
