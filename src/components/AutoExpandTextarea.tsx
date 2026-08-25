import {
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from 'react';

type AutoExpandTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  /** vertical (padrão) cresce para baixo; horizontal cresce para o lado até o limite do layout */
  expand?: 'vertical' | 'horizontal';
};

function resolveMaxWidth(el: HTMLElement): number {
  const styles = getComputedStyle(el);
  const parsed = Number.parseFloat(styles.maxWidth);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  const wrap = el.parentElement;
  const row = wrap?.parentElement;
  const rowWidth = row?.clientWidth ?? wrap?.clientWidth ?? 0;
  if (rowWidth > 0) {
    // folga para o enunciado/expressão na mesma linha
    return Math.min(448, Math.max(160, rowWidth - 48));
  }
  return 420;
}

function AutoExpandTextarea({
  value,
  onChange,
  className,
  rows = 1,
  expand = 'vertical',
  ...rest
}: AutoExpandTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const styles = getComputedStyle(el);
    const minHeight = Number.parseFloat(styles.minHeight) || 31;

    if (expand === 'horizontal') {
      const measure = measureRef.current;
      const minWidth = Number.parseFloat(styles.minWidth) || 120;
      const maxWidth = resolveMaxWidth(el);

      const sample = value || (typeof rest.placeholder === 'string' ? rest.placeholder : '') || ' ';
      let contentWidth = minWidth;
      if (measure) {
        measure.textContent = sample;
        contentWidth = Math.ceil(measure.offsetWidth) + 28;
      }

      const nextWidth = Math.min(maxWidth, Math.max(minWidth, contentWidth));
      el.style.width = `${nextWidth}px`;

      if (contentWidth > maxWidth) {
        el.style.whiteSpace = 'pre-wrap';
        el.style.overflowX = 'hidden';
        el.style.height = 'auto';
        el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
      } else {
        el.style.whiteSpace = 'nowrap';
        el.style.overflowX = 'hidden';
        el.style.height = `${minHeight}px`;
      }
      return;
    }

    el.style.width = '';
    el.style.whiteSpace = '';
    el.style.height = 'auto';
    el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
  }, [value, expand, rest.placeholder]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <span className={expand === 'horizontal' ? 'campo-texto-expansivel-wrap' : undefined}>
      {expand === 'horizontal' ? (
        <span ref={measureRef} className="campo-texto-expansivel-medida" aria-hidden>
          {value || (typeof rest.placeholder === 'string' ? rest.placeholder : '') || ' '}
        </span>
      ) : null}
      <textarea
        {...rest}
        ref={ref}
        rows={rows}
        value={value}
        onChange={handleChange}
        className={[
          'campo-texto-expansivel',
          expand === 'horizontal' ? 'campo-texto-expansivel--lado' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </span>
  );
}

export default AutoExpandTextarea;
