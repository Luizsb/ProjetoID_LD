import { publicUrl } from '../lib/publicUrl';

interface HeaderProps {
  chapterNumber?: number | string;
  chapterTitle?: string;
  marca?: 'sae' | 'sas';
}

function Header({
  chapterNumber = 7,
  chapterTitle = 'Comércio',
  marca = 'sae',
}: HeaderProps) {
  const isSas = marca === 'sas';
  const capaSrc = publicUrl(isSas ? 'images/Capa-sas.svg' : 'images/Capa-1.svg');

  return (
    <header
      className={`livro-header relative w-full min-w-0 overflow-visible bg-no-repeat py-8 px-8 text-white ${isSas ? 'livro-header--sas' : 'livro-header--sae'}`}
      style={{
        backgroundColor: isSas ? '#1b4b8a' : '#80298F',
        backgroundImage: `url('${capaSrc}')`,
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col" style={{ marginLeft: '90px' }}>
            <p
              className="font-inter rounded-[20px]"
              style={{
                backgroundColor: isSas ? '#8ec5ff' : '#F4C2FF',
                color: isSas ? '#1b4b8a' : '#80298F',
                textAlign: 'center',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '30px',
                letterSpacing: '-0.5px',
                width: '108px',
                height: '27px',
              }}
            >
              LIVRO DIGITAL
            </p>
            <h1
              className="font-inter font-bold"
              style={{
                fontWeight: 900,
                fontSize: '48px',
              }}
            >
              <span style={{ color: isSas ? '#8ec5ff' : '#FBB733' }}>{chapterNumber}.</span> {chapterTitle}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
