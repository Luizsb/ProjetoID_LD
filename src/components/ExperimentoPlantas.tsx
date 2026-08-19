interface ExperimentoPlantasProps {
  plantaSaudavelSrc: string;
  plantaRegadaSrc: string;
  plantaMurchaSrc: string;
}

function ExperimentoPlantas({
  plantaSaudavelSrc,
  plantaRegadaSrc,
  plantaMurchaSrc,
}: ExperimentoPlantasProps) {
  return (
    <section className="experimento-plantas" aria-label="Experimento com plantas">
      <h4 className="experimento-plantas__titulo">As plantas precisam de água para viver?</h4>

      <div className="experimento-plantas__linha">
        <span className="experimento-plantas__numero" aria-hidden>
          1
        </span>
        <div className="experimento-plantas__caixa">
          <p className="experimento-plantas__legenda experimento-plantas__legenda--cheia">
            Duas plantas iguais foram mantidas em um mesmo local.
          </p>
          <div className="experimento-plantas__dupla">
            <PlantaCelula src={plantaSaudavelSrc} alt="Planta A saudável" selo="A" />
            <PlantaCelula src={plantaSaudavelSrc} alt="Planta B saudável" selo="B" />
          </div>
        </div>
      </div>

      <div className="experimento-plantas__linha">
        <span className="experimento-plantas__numero" aria-hidden>
          2
        </span>
        <div className="experimento-plantas__caixa">
          <div className="experimento-plantas__dupla">
            <PlantaCelula
              src={plantaRegadaSrc}
              alt="Planta A recebendo água"
              selo="A"
              legenda="Uma planta recebeu água..."
            />
            <PlantaCelula
              src={plantaSaudavelSrc}
              alt="Planta B sem água"
              selo="B"
              legenda="...e a outra não."
            />
          </div>
        </div>
      </div>

      <div className="experimento-plantas__linha">
        <span className="experimento-plantas__numero" aria-hidden>
          3
        </span>
        <div className="experimento-plantas__caixa">
          <div className="experimento-plantas__dupla">
            <PlantaCelula
              src={plantaSaudavelSrc}
              alt="Planta A que não murchou"
              selo="A"
              legenda="A planta que recebeu água não murchou."
            />
            <PlantaCelula
              src={plantaMurchaSrc}
              alt="Planta B murcha"
              selo="B"
              legenda="A planta que não recebeu água murchou."
            />
          </div>
        </div>
      </div>

      <p className="experimento-plantas__credito">Imagens: Shutterstock</p>
    </section>
  );
}

function PlantaCelula({
  src,
  alt,
  selo,
  legenda,
}: {
  src: string;
  alt: string;
  selo: string;
  legenda?: string;
}) {
  return (
    <div className="experimento-plantas__celula">
      {legenda ? <p className="experimento-plantas__legenda">{legenda}</p> : null}
      <img src={src} alt={alt} />
      <span className="experimento-plantas__selo">{selo}</span>
    </div>
  );
}

export default ExperimentoPlantas;
