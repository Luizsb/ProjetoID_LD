import { publicUrl } from '../lib/publicUrl';
import { getBook, useCatalogo } from '../catalog/catalogo';
import { useHashRoute } from '../catalog/useHashRoute';

function Footer() {
  const route = useHashRoute();
  const { catalogo } = useCatalogo();
  const marcaId =
    route.name === 'book' && catalogo ? getBook(catalogo, route.bookId)?.marcaId : undefined;

  return (
    <footer
      className="livro-footer"
      data-marca={marcaId ?? ''}
      style={{
        backgroundColor: '#FFF',
        display: 'flex',
        boxShadow: '0 -2px 16.5px 0 rgba(0, 0, 0, 0.25)',
        height: '150px',
        paddingBottom: '10px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <img
        className="livro-footer__logo livro-footer__logo--sae"
        src={publicUrl('images/SAELogo.png')}
        alt="SAE"
      />
      <img
        className="livro-footer__logo livro-footer__logo--sas"
        src={publicUrl('images/SASLogo.png')}
        alt="SAS Educação"
      />
      <img
        className="livro-footer__logo livro-footer__logo--geekie"
        src={publicUrl('images/logo-geekie.png')}
        alt="Geekie Educação"
      />
      <p
        className="font-myriad-vf"
        style={{
          color: '#000',
          textAlign: 'center',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
        }}
      >
        É um Selo Editorial da Companhia Brasileira de Educação e
        Sistemas de Ensino S.A
      </p>
    </footer>
  );
}

export default Footer;
