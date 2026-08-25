type RetaIrracionaisProps = {
  showResults?: boolean;
};

/** Reta de −3 a 4 com posicionamento das raízes (atividade 2). */
function RetaIrracionais({ showResults = false }: RetaIrracionaisProps) {
  const min = -3;
  const max = 4;
  const width = 720;
  const height = showResults ? 90 : 70;
  const padX = 28;
  const lineY = showResults ? 48 : 32;
  const span = max - min;

  const xOf = (value: number) => padX + ((value - min) / span) * (width - padX * 2);

  const integers = [-3, -2, -1, 0, 1, 2, 3, 4];
  const roots = [
    { value: -Math.sqrt(8), label: '−√8' },
    { value: -Math.sqrt(5), label: '−√5' },
    { value: -Math.sqrt(2), label: '−√2' },
    { value: Math.sqrt(3), label: '√3' },
    { value: Math.sqrt(10), label: '√10' },
    { value: Math.sqrt(15), label: '√15' },
  ];

  return (
    <svg
      className="reta-irracionais"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Reta numérica de menos três a quatro"
    >
      <line
        x1={padX}
        y1={lineY}
        x2={width - padX}
        y2={lineY}
        stroke="#7b3fa0"
        strokeWidth="2.5"
      />
      <polygon
        points={`${width - padX + 10},${lineY} ${width - padX - 2},${lineY - 5} ${width - padX - 2},${lineY + 5}`}
        fill="#7b3fa0"
      />

      {integers.map((value) => {
        const x = xOf(value);
        return (
          <g key={value}>
            <circle cx={x} cy={lineY} r="4" fill="#111" />
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
          </g>
        );
      })}

      {showResults &&
        roots.map((item) => {
          const x = xOf(item.value);
          return (
            <g key={item.label}>
              <line x1={x} y1={lineY - 16} x2={x} y2={lineY} stroke="#ee55af" strokeWidth="1.5" />
              <text
                x={x}
                y={lineY - 20}
                textAnchor="middle"
                fill="#ee55af"
                fontSize="12"
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

export default RetaIrracionais;
