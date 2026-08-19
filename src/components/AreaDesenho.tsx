import { useEffect, useRef } from 'react';

interface AreaDesenhoProps {
  storageKey: string;
  height?: number;
}

function AreaDesenho({ storageKey, height = 220 }: AreaDesenhoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = saved;
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const persist = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      localStorage.setItem(storageKey, canvas.toDataURL('image/png'));
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="w-full touch-none rounded-xl border-2 border-dashed border-[#832c87]/40 bg-[#fffdf8]"
        style={{ height: `${height}px` }}
        onPointerDown={(e) => {
          drawing.current = true;
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (!ctx) return;
          const { x, y } = getPos(e);
          ctx.beginPath();
          ctx.moveTo(x, y);
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const ctx = canvasRef.current?.getContext('2d');
          if (!ctx) return;
          const { x, y } = getPos(e);
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.strokeStyle = '#832c87';
          ctx.lineTo(x, y);
          ctx.stroke();
        }}
        onPointerUp={() => {
          drawing.current = false;
          persist();
        }}
        onPointerLeave={() => {
          if (drawing.current) {
            drawing.current = false;
            persist();
          }
        }}
      />
      <p className="mt-1 text-center text-xs text-slate-500">Área para desenhar / registrar</p>
    </div>
  );
}

export default AreaDesenho;
