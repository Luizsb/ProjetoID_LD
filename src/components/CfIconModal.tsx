import { useEffect, useId, useState, type ReactNode } from 'react';

interface CfIconModalProps {
  iconSrc: string;
  title: string;
  children: ReactNode;
}

function CfIconModal({ iconSrc, title, children }: CfIconModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="cf-icon-modal"
        onClick={() => setIsOpen(true)}
        aria-label={`Abrir ${title}`}
      >
        <img className="cf-icon-modal__icone" src={iconSrc} alt="" />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="cf-icon-modal__dialog mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2
                id={titleId}
                className="cf-icon-modal__titulo"
                style={{ color: '#e98c56' }}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-slate-500 hover:text-slate-700"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <div className="cf-icon-modal__corpo">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CfIconModal;
