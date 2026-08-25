type RetaReaisBasicaProps = {
  showResults?: boolean;
};

/** Reta de −1 a 1 com marcas de 0,1 (atividade reta real). */
function RetaReaisBasica({ showResults = false }: RetaReaisBasicaProps) {
  const min = -1;
  const max = 1;
  const width = 720;
  const height = showResults ? 110 : 70;
  const padX = 36;
  const lineY = showResults ? 72 : 36;
  const span = max - min;

  const xOf = (value: number) => padX + ((value - min) / span) * (width - padX * 2);

  const tenths: number[] = [];
  for (let v = -10; v <= 10; v += 1) {
    tenths.push(v / 10);
  }

  const labelsTeacher = [
    -0.8, -0.7, -0.5, -0.3, -0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.9,
  ];
  const zoomLabels = [
    { value: 0.42, label: '0,42' },
    { value: 0.45, label: '0,45' },
    { value: 0.48, label: '0,48' },
  ];

  return (
    <svg
      className="reta-reais-basica"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Reta numérica de menos um a um"
    >
      <line x1={padX} y1={lineY} x2={width - padX} y2={lineY} stroke="#111" strokeWidth="2" />
      <polygon
        points={`${width - padX + 10},${lineY} ${width - padX - 2},${lineY - 5} ${width - padX - 2},${lineY + 5}`}
        fill="#111"
      />

      {tenths.map((value) => {
        const x = xOf(value);
        const isInteger = Number.isInteger(value);
        return (
          <g key={value}>
            <line
              x1={x}
              y1={lineY - (isInteger ? 8 : 5)}
              x2={x}
              y2={lineY + (isInteger ? 8 : 5)}
              stroke="#111"
              strokeWidth={isInteger ? 2 : 1}
            />
            {isInteger && (
              <text
                x={x}
                y={lineY + 22}
                textAnchor="middle"
                fill="#111"
                fontSize="14"
                fontFamily="Myriad VF, sans-serif"
                fontWeight="700"
              >
                {value}
              </text>
            )}
          </g>
        );
      })}

      {showResults &&
        labelsTeacher.map((value) => {
          const x = xOf(value);
          const label = String(value).replace('.', ',');
          return (
            <g key={`t-${value}`}>
              <line x1={x} y1={lineY - 14} x2={x} y2={lineY} stroke="#ee55af" strokeWidth="1.5" />
              <text
                x={x}
                y={lineY - 18}
                textAnchor="middle"
                fill="#ee55af"
                fontSize="11"
                fontFamily="Myriad VF, sans-serif"
                fontWeight="700"
              >
                {label}
              </text>
            </g>
          );
        })}

      {showResults &&
        zoomLabels.map((item) => {
          const x = xOf(item.value);
          return (
            <g key={item.label}>
              <line x1={x} y1={lineY - 28} x2={x} y2={lineY} stroke="#ee55af" strokeWidth="1" />
              <text
                x={x}
                y={lineY - 32}
                textAnchor="middle"
                fill="#ee55af"
                fontSize="10"
                fontFamily="Myriad VF, sans-serif"
                fontWeight="700"
              >
                {item.label}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

export default RetaReaisBasica;
