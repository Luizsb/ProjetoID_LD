import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    MathJax?: {
      startup?: { promise?: Promise<unknown> };
      typesetClear?: (elements?: Element[]) => void;
      typesetPromise?: (elements?: Element[]) => Promise<unknown>;
    };
  }
}

interface FormulaProps {
  tex: string;
}

function Formula({ tex }: FormulaProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    el.textContent = `\\(${tex}\\)`;

    let cancelled = false;

    const typeset = async () => {
      for (let attempt = 0; attempt < 50; attempt += 1) {
        if (cancelled || !ref.current) {
          return;
        }
        const mathJax = window.MathJax;
        if (mathJax?.startup?.promise) {
          await mathJax.startup.promise;
        }
        if (mathJax?.typesetPromise && ref.current) {
          mathJax.typesetClear?.([ref.current]);
          await mathJax.typesetPromise([ref.current]);
          return;
        }
        await new Promise((resolve) => {
          window.setTimeout(resolve, 80);
        });
      }
    };

    void typeset();

    return () => {
      cancelled = true;
    };
  }, [tex]);

  return <span ref={ref} className="formula-mj" />;
}

export default Formula;
