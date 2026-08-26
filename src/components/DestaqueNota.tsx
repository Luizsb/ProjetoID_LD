import { useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';

type DestaqueCor = 'verde' | 'azul' | 'amarelo' | 'roxo';

interface DestaqueNotaProps {
  cor: DestaqueCor;
  nota: ReactNode;
  children: ReactNode;
}

function DestaqueNota({ cor, nota, children }: DestaqueNotaProps) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [aberto]);

  const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setAberto(true);
    }
  };

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        className={`destaque-nota destaque-nota--${cor}`}
        onClick={() => setAberto(true)}
        onKeyDown={onKeyDown}
        aria-expanded={aberto}
      >
        {children}
      </span>

      {aberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setAberto(false)}
          role="presentation"
        >
          <div
            className={`destaque-nota__dialog destaque-nota__dialog--${cor} professor-button__dialog bg-white rounded-lg p-8 max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-end items-center mb-4">
              <button
                type="button"
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold leading-none"
                onClick={() => setAberto(false)}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <div className="prose max-w-none text-black">{nota}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default DestaqueNota;
