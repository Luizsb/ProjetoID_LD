type RetaAvenidaProps = {
  className?: string;
  images: {
    a: string;
    b: string;
    o: string;
    c: string;
    d: string;
  };
  credit?: string;
};

const MARKERS = [
  { key: 'a', label: 'A', ticks: -6, imageKey: 'a' as const },
  { key: 'b', label: 'B', ticks: -2, imageKey: 'b' as const },
  { key: 'o', label: 'O', ticks: 0, imageKey: 'o' as const },
  { key: 'c', label: 'C', ticks: 3, imageKey: 'c' as const },
  { key: 'd', label: 'D', ticks: 8, imageKey: 'd' as const },
];

function RetaAvenida({
  className,
  images,
  credit = 'Sapphire/Stock.adobe.com',
}: RetaAvenidaProps) {
  const ticks = Array.from({ length: 19 }, (_, index) => index - 9);
  const centerX = 360;
  const step = 35;
  const lineY = 52;

  return (
    <figure className={`reta-avenida ${className ?? ''}`.trim()}>
      <svg
        viewBox="0 0 720 175"
        role="img"
        aria-label="Reta numérica de -1 a 1 com pontos A, B, O, C e D"
      >
        <text x="45" y="22" textAnchor="middle" fontSize="16" fill="#111">
          −1
        </text>
        <text x={centerX} y="22" textAnchor="middle" fontSize="16" fill="#111">
          0
        </text>
        <text x="675" y="22" textAnchor="middle" fontSize="16" fill="#111">
          1
        </text>

        <line x1="40" y1={lineY} x2="680" y2={lineY} stroke="#333" strokeWidth="2" />
        <polygon points={`680,${lineY} 668,${lineY - 6} 668,${lineY + 6}`} fill="#333" />

        {ticks.map((tick) => {
          const x = centerX + tick * step;
          const isInteger = tick === -9 || tick === 0 || tick === 9;
          return (
            <line
              key={tick}
              x1={x}
              y1={isInteger ? lineY - 12 : lineY - 8}
              x2={x}
              y2={isInteger ? lineY + 12 : lineY + 8}
              stroke="#333"
              strokeWidth={isInteger ? 2 : 1.5}
            />
          );
        })}

        {MARKERS.map((marker) => {
          const x = centerX + marker.ticks * step;
          const img = images[marker.imageKey];
          const isOrigin = marker.key === 'o';
          const imgW = isOrigin ? 54 : 62;
          const imgH = isOrigin ? 72 : 58;
          return (
            <g key={marker.key}>
              <text
                x={x}
                y={lineY - 18}
                textAnchor="middle"
                fontSize="17"
                fontWeight="700"
                fill="#24459d"
              >
                {marker.label}
              </text>
              <circle cx={x} cy={lineY} r="5" fill={isOrigin ? '#24459d' : '#ee55af'} />
              <image
                href={img}
                x={x - imgW / 2}
                y={lineY + 14}
                width={imgW}
                height={imgH}
                preserveAspectRatio="xMidYMin meet"
              />
            </g>
          );
        })}
      </svg>
      <figcaption className="reta-avenida__credito">{credit}</figcaption>
    </figure>
  );
}

export default RetaAvenida;
