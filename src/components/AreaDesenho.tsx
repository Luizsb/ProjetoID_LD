import { useCallback, useEffect, useRef, useState } from 'react';

const COLORS = [
  '#000000',
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#e67e22',
  '#1abc9c',
  '#34495e',
  '#f1c40f',
] as const;

const BRUSH_SIZES = [3, 6, 10, 15] as const;

type AreaDesenhoProps = {
  width?: number;
  height?: number;
  className?: string;
  storageKey?: string;
  hint?: string;
  /** Layout estreito (ex.: 3 colunas): toolbar abaixo e canvas responsivo */
  compact?: boolean;
  borderColor?: string;
  /** Imagem de fundo para desenhar / pintar por cima */
  backgroundImage?: string;
  /** Largura máxima de exibição do canvas (ex.: '100%', '320px') */
  maxWidth?: string;
};

function getCanvasPosition(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height),
  };
}

function AreaDesenho({
  width = 600,
  height = 400,
  className = '',
  storageKey,
  hint = 'Clique e arraste para desenhar',
  compact = false,
  borderColor = '#ea8244',
  backgroundImage,
  maxWidth,
}: AreaDesenhoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [currentColor, setCurrentColor] = useState<string>(COLORS[0]);
  const [currentSize, setCurrentSize] = useState<(typeof BRUSH_SIZES)[number]>(3);
  const [isEraser, setIsEraser] = useState(false);

  const startStroke = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
      ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : currentColor;
      ctx.lineWidth = currentSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    },
    [currentColor, currentSize, isEraser],
  );

  const persist = useCallback(() => {
    if (!storageKey) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      localStorage.setItem(storageKey, canvas.toDataURL());
    } catch {
      // ignore quota / private mode
    }
  }, [storageKey]);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
  }, [storageKey]);

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    setIsEraser(false);
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    const pos = getCanvasPosition(canvas, clientX, clientY);
    startStroke(ctx);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getCanvasPosition(canvas, clientX, clientY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    persist();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !storageKey) return;

    let saved: string | null = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch {
      return;
    }
    if (!saved) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = saved;
  }, [storageKey]);

  const accent = borderColor;

  return (
    <div className={`area-desenho ${className}`.trim()}>
      <div className="area-desenho__layout">
        <div className="area-desenho__quadro-wrap">
          <div
            className="area-desenho__quadro"
            style={{ borderColor: accent }}
          >
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            ) : null}
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className={`area-desenho__canvas${isEraser ? ' area-desenho__canvas--borracha' : ''}`}
              onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
              onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                handlePointerDown(touch.clientX, touch.clientY);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                handlePointerMove(touch.clientX, touch.clientY);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handlePointerUp();
              }}
            />
            {!compact ? (
              <div
                className="area-desenho__hint"
                style={{ backgroundColor: `${accent}1a`, color: accent }}
              >
                {hint}
              </div>
            ) : null}
          </div>
        </div>

        <div className="area-desenho__toolbar">
          <div className="area-desenho__toolbar-grid">
            <div className="area-desenho__grupo">
              <span className="area-desenho__label">Escolha a cor:</span>
              <div className="area-desenho__swatches">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    title={color}
                    onClick={() => handleColorSelect(color)}
                    className={`area-desenho__cor${!isEraser && currentColor === color ? ' is-ativa' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="area-desenho__grupo">
              <span className="area-desenho__label">Tamanho:</span>
              <div className="area-desenho__tamanhos">
                {BRUSH_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setCurrentSize(size)}
                    className={`area-desenho__tamanho${currentSize === size ? ' is-ativa' : ''}`}
                    style={{ width: 10 + size, height: 10 + size }}
                    aria-label={`Tamanho ${size}`}
                  />
                ))}
              </div>
            </div>

            <div className="area-desenho__grupo">
              <span className="area-desenho__label">Ações:</span>
              <div className="area-desenho__acoes">
                <button
                  type="button"
                  onClick={() => setIsEraser((v) => !v)}
                  className={`area-desenho__btn area-desenho__btn--borracha${isEraser ? ' is-ativa' : ''}`}
                >
                  {isEraser ? 'Borracha ativa' : 'Borracha'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="area-desenho__btn area-desenho__btn--limpar"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaDesenho;
