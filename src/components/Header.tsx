import { publicUrl } from '../lib/publicUrl';

interface HeaderProps {
  chapterNumber?: number | string;
  chapterTitle?: string;
  marca?: 'sae' | 'sas';
  badge?: string;
  variante?: 'capa' | 'unidade';
}

function Header({
  chapterNumber = 7,
  chapterTitle = 'Comércio',
  marca = 'sae',
  badge = 'LIVRO DIGITAL',
  variante = 'capa',
}: HeaderProps) {
  const isSas = marca === 'sas';
  const isUnidade = variante === 'unidade';
  const capaSrc = `${publicUrl(
    isUnidade ? 'images/Capa-sas-unidade.svg' : isSas ? 'images/Capa-sas.svg' : 'images/Capa-1.svg',
  )}?v=3`;

  const badgeBg = isUnidade ? '#d4f1ff' : isSas ? '#8ec5ff' : '#F4C2FF';
  const badgeColor = isUnidade ? '#0b5f8a' : isSas ? '#1b4b8a' : '#80298F';
  const numberColor = isUnidade ? '#d4f1ff' : isSas ? '#8ec5ff' : '#FBB733';

  return (
    <header
      className={`livro-header relative w-full min-w-0 overflow-visible bg-no-repeat py-8 px-8 text-white ${isSas ? 'livro-header--sas' : 'livro-header--sae'}`}
      style={{
        backgroundColor: isUnidade ? '#1689c5' : isSas ? '#1b4b8a' : '#80298F',
        backgroundImage: `url('${capaSrc}')`,
        backgroundSize: isSas ? 'cover' : '100% auto',
        backgroundPosition: isSas ? 'center center' : 'top center',
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col" style={{ marginLeft: isSas ? 'clamp(6.5rem, 16%, 11rem)' : '90px' }}>
            <p
              className="font-inter rounded-[20px]"
              style={{
                backgroundColor: badgeBg,
                color: badgeColor,
                textAlign: 'center',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '30px',
                letterSpacing: '-0.5px',
                width: badge.length > 14 ? '132px' : '108px',
                height: '27px',
              }}
            >
              {badge}
            </p>
            <h1
              className="font-inter font-bold"
              style={{
                fontWeight: 900,
                fontSize: '48px',
                lineHeight: 1.15,
              }}
            >
              <span style={{ color: numberColor }}>{chapterNumber}.</span> {chapterTitle}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
