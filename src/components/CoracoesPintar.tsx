import { useEffect, useState } from 'react';

interface CoracoesPintarProps {
  storageKey: string;
  total?: number;
}

function CoracoesPintar({ storageKey, total = 5 }: CoracoesPintarProps) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setFilled(Math.min(total, Math.max(0, parseInt(raw, 10) || 0)));
    } catch {
      // ignore
    }
  }, [storageKey, total]);

  const select = (value: number) => {
    setFilled(value);
    try {
      localStorage.setItem(storageKey, String(value));
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 py-4" role="group" aria-label="Avaliação com corações">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const active = n <= filled;
        return (
          <button
            key={n}
            type="button"
            onClick={() => select(n)}
            aria-label={`${n} coração${n > 1 ? 'ões' : ''}`}
            className="text-4xl transition hover:scale-110"
            style={{ color: active ? '#e11d48' : '#d1d5db' }}
          >
            {active ? '♥' : '♡'}
          </button>
        );
      })}
    </div>
  );
}

export default CoracoesPintar;
