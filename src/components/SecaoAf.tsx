interface SecaoAfProps {
  imageSrc: string;
  title: string;
  alt?: string;
}

function SecaoAf({ imageSrc, title, alt }: SecaoAfProps) {
  return (
    <div className="secao-af">
      <img className="secao-af__icone" src={imageSrc} alt={alt ?? title} />
      <div className="secao-af__barra">
        <h2 className="secao-af__titulo">{title}</h2>
      </div>
    </div>
  );
}

export default SecaoAf;
