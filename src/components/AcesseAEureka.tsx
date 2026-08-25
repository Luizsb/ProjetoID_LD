interface AcesseAEurekaProps {
  iconSrc: string;
  href: string;
  iconAlt?: string;
  ctaLabel?: string;
}

function AcesseAEureka({
  iconSrc,
  href,
  iconAlt = 'Acesse a Eureka!',
  ctaLabel = 'Clique para acessar',
}: AcesseAEurekaProps) {
  return (
    <section className="acesse-eureka">
      <a
        className="acesse-eureka__link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="acesse-eureka__selo" src={iconSrc} alt="" />
        <span className="acesse-eureka__texto">
          Amplie seus
          <br />
          conhecimentos.
          <br />
          Acesse a Eureka!
        </span>
        <span className="acesse-eureka__botao">{ctaLabel}</span>
        <span className="sr-only">{iconAlt}</span>
      </a>
    </section>
  );
}

export default AcesseAEureka;
