import { publicUrl } from '../lib/publicUrl';

interface GlossarioAFProps {
  termo: string;
  definicao: string;
  /** Ícone do glossário SAS AF. Padrão: `public/images/glossario-af.png`. */
  iconSrc?: string;
}

function GlossarioAF({
  termo,
  definicao,
  iconSrc = publicUrl('images/glossario-af.png'),
}: GlossarioAFProps) {
  return (
    <aside className="glossario-caixa glossario-caixa--af" aria-label={`Glossário: ${termo}`}>
      <img className="glossario-caixa__icone-af" src={iconSrc} alt="" />
      <p className="glossario-caixa__texto">
        <strong className="glossario-caixa__termo">{termo}</strong>{' '}
        {definicao}
      </p>
    </aside>
  );
}

export default GlossarioAF;
