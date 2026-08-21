interface AcesseAEurekaProps {
  iconSrc: string;
  href: string;
  iconAlt?: string;
}

function AcesseAEureka({
  iconSrc,
  href,
  iconAlt = 'Acesse a Eureka!',
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
        <span className="sr-only">{iconAlt}</span>
      </a>
    </section>
  );
}

export default AcesseAEureka;
