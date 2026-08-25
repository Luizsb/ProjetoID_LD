import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode, type TouchEvent } from 'react';

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

type DrawTool = 'freehand' | 'line' | 'eraser';

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
  /** Malha quadriculada desenhada (CSS), para o aluno desenhar por cima */
  showGrid?: boolean;
  gridCols?: number;
  gridRows?: number;
  gridColor?: string;
  /** Largura máxima de exibição do canvas (ex.: '100%', '320px') */
  maxWidth?: string;
  /** Mostra a ferramenta de reta (linha reta entre dois pontos). */
  enableLineTool?: boolean;
  /** Conteúdo sobreposto ao quadro de desenho (ex.: fichas arrastáveis). */
  canvasOverlay?: ReactNode;
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
  showGrid = false,
  gridCols = 7,
  gridRows = 4,
  gridColor = '#7eb8d4',
  maxWidth,
  enableLineTool = false,
  canvasOverlay,
}: AreaDesenhoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lineStartRef = useRef<{ x: number; y: number } | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);
  const [currentColor, setCurrentColor] = useState<string>(COLORS[0]);
  const [currentSize, setCurrentSize] = useState<(typeof BRUSH_SIZES)[number]>(3);
  const [tool, setTool] = useState<DrawTool>('freehand');

  const applyStrokeStyle = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const isEraser = tool === 'eraser';
      ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
      ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : currentColor;
      ctx.lineWidth = currentSize;
      ctx.lineCap = tool === 'line' ? 'butt' : 'round';
      ctx.lineJoin = 'round';
    },
    [currentColor, currentSize, tool],
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
    setTool((current) => (current === 'eraser' ? 'freehand' : current));
  };

  const drawStraightLine = (
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) => {
    applyStrokeStyle(ctx);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    const pos = getCanvasPosition(canvas, clientX, clientY);

    if (tool === 'line') {
      lineStartRef.current = pos;
      snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return;
    }

    applyStrokeStyle(ctx);
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

    if (tool === 'line') {
      const start = lineStartRef.current;
      const snapshot = snapshotRef.current;
      if (!start || !snapshot) return;
      ctx.putImageData(snapshot, 0, 0);
      drawStraightLine(ctx, start, pos);
      return;
    }

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const handlePointerUp = (clientX?: number, clientY?: number) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (tool === 'line') {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const start = lineStartRef.current;
      const snapshot = snapshotRef.current;
      if (canvas && ctx && start && snapshot && clientX !== undefined && clientY !== undefined) {
        const pos = getCanvasPosition(canvas, clientX, clientY);
        ctx.putImageData(snapshot, 0, 0);
        drawStraightLine(ctx, start, pos);
      }
      lineStartRef.current = null;
      snapshotRef.current = null;
    }

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
  const hasOverlaySurface = Boolean(backgroundImage || showGrid);
  const showExternalHint = hasOverlaySurface && !compact && Boolean(hint);
  const isEraser = tool === 'eraser';

  const canvasPointerProps = {
    onMouseDown: (e: MouseEvent<HTMLCanvasElement>) =>
      handlePointerDown(e.clientX, e.clientY),
    onMouseMove: (e: MouseEvent<HTMLCanvasElement>) =>
      handlePointerMove(e.clientX, e.clientY),
    onMouseUp: (e: MouseEvent<HTMLCanvasElement>) =>
      handlePointerUp(e.clientX, e.clientY),
    onMouseLeave: () => handlePointerUp(),
    onTouchStart: (e: TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      handlePointerDown(touch.clientX, touch.clientY);
    },
    onTouchMove: (e: TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      handlePointerMove(touch.clientX, touch.clientY);
    },
    onTouchEnd: (e: TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      handlePointerUp(touch?.clientX, touch?.clientY);
    },
  };

  const canvasClassName = [
    'area-desenho__canvas',
    hasOverlaySurface ? 'area-desenho__canvas--com-fundo' : '',
    isEraser ? 'area-desenho__canvas--borracha' : '',
    tool === 'line' ? 'area-desenho__canvas--reta' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`area-desenho ${className}`.trim()}
      style={maxWidth ? { maxWidth, marginLeft: 'auto', marginRight: 'auto' } : undefined}
    >
      <div className="area-desenho__layout">
        <div className="area-desenho__quadro-wrap">
          {showExternalHint ? (
            <p
              className="area-desenho__hint-externo"
              style={{ color: accent, borderColor: accent, backgroundColor: `${accent}14` }}
            >
              {hint}
            </p>
          ) : null}
          <div
            className={`area-desenho__quadro${hasOverlaySurface ? ' area-desenho__quadro--com-fundo' : ''}`}
            style={{ borderColor: accent }}
          >
            {hasOverlaySurface ? (
              <div
                className={`area-desenho__superficie${showGrid ? ' area-desenho__superficie--malha' : ''}`}
                style={{
                  ...(showGrid ? { aspectRatio: `${width} / ${height}` } : {}),
                  ...(maxWidth && !showGrid ? { maxWidth } : {}),
                }}
              >
                {backgroundImage ? (
                  <img
                    src={backgroundImage}
                    alt=""
                    className="area-desenho__fundo"
                    draggable={false}
                  />
                ) : null}
                {showGrid ? (
                  <div
                    className="area-desenho__malha"
                    aria-hidden
                    style={
                      {
                        '--malha-cols': gridCols,
                        '--malha-rows': gridRows,
                        '--malha-cor': gridColor,
                      } as CSSProperties
                    }
                  />
                ) : null}
                <canvas
                  ref={canvasRef}
                  width={width}
                  height={height}
                  className={canvasClassName}
                  style={{ aspectRatio: `${width} / ${height}`, minHeight: 0 }}
                  {...canvasPointerProps}
                />
              </div>
            ) : (
              <>
                <canvas
                  ref={canvasRef}
                  width={width}
                  height={height}
                  className={canvasClassName}
                  {...canvasPointerProps}
                />
                {!compact ? (
                  <div
                    className="area-desenho__hint"
                    style={{ backgroundColor: `${accent}1a`, color: accent }}
                  >
                    {hint}
                  </div>
                ) : null}
              </>
            )}
            {canvasOverlay}
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
                    className={`area-desenho__cor${tool !== 'eraser' && currentColor === color ? ' is-ativa' : ''}`}
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
                {enableLineTool ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setTool('freehand')}
                      className={`area-desenho__btn area-desenho__btn--lapis${tool === 'freehand' ? ' is-ativa' : ''}`}
                    >
                      Lápis
                    </button>
                    <button
                      type="button"
                      onClick={() => setTool('line')}
                      className={`area-desenho__btn area-desenho__btn--reta${tool === 'line' ? ' is-ativa' : ''}`}
                      title="Clique e arraste para traçar uma reta"
                    >
                      Reta
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => setTool((current) => (current === 'eraser' ? 'freehand' : 'eraser'))}
                  className={`area-desenho__btn area-desenho__btn--borracha${tool === 'eraser' ? ' is-ativa' : ''}`}
                >
                  {tool === 'eraser' ? 'Borracha ativa' : 'Borracha'}
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
