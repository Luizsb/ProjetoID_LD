import { useCallback, useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import AreaDesenho from './AreaDesenho';

type AreaColarImagemProps = {
  storageKey: string;
  borderColor?: string;
  hint?: string;
};

function compressImage(file: Blob, maxSide = 1400, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('canvas'));
        return;
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('image'));
    };
    img.src = objectUrl;
  });
}

function readStored(key: string): string {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // quota / private mode
  }
}

function clearStored(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function AreaColarImagem({
  storageKey,
  borderColor = '#80298F',
  hint = 'Clique para enviar um arquivo ou cole uma imagem (Ctrl+V).',
}: AreaColarImagemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const drawKey = `${storageKey}__desenho`;
  const [imageSrc, setImageSrc] = useState('');
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setImageSrc(readStored(storageKey));
  }, [storageKey]);

  const applyFile = useCallback(
    async (file: Blob | undefined) => {
      if (!file || !file.type.startsWith('image/')) {
        setError('Envie ou cole um arquivo de imagem.');
        return;
      }
      try {
        const dataUrl = await compressImage(file);
        writeStored(storageKey, dataUrl);
        clearStored(drawKey);
        setImageSrc(dataUrl);
        setError('');
      } catch {
        setError('Não foi possível carregar essa imagem. Tente outro arquivo.');
      }
    },
    [drawKey, storageKey],
  );

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      const items = event.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          event.preventDefault();
          void applyFile(item.getAsFile() ?? undefined);
          return;
        }
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [applyFile]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void applyFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    void applyFile(event.dataTransfer.files[0]);
  };

  const removeImage = () => {
    clearStored(storageKey);
    clearStored(drawKey);
    setImageSrc('');
    setError('');
  };

  return (
    <div className="area-colar-imagem my-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onFileChange}
      />
      {imageSrc ? (
        <>
          <AreaDesenho
            backgroundImage={imageSrc}
            storageKey={drawKey}
            borderColor={borderColor}
            maxWidth="100%"
            width={780}
            height={980}
            enableLineTool
            hint="Desenhe sobre o mapa: capital, cidade mais antiga e municípios."
          />
          <div className="area-colar-imagem__acoes">
            <button type="button" onClick={() => inputRef.current?.click()}>
              Trocar imagem
            </button>
            <button type="button" onClick={removeImage}>
              Remover mapa
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className={`area-colar-imagem__drop${dragging ? ' is-dragging' : ''}`}
          style={{ borderColor: borderColor, color: borderColor }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="area-colar-imagem__titulo">Cole o mapa aqui</span>
          <span className="area-colar-imagem__dica">{hint}</span>
        </button>
      )}
      {error ? <p className="area-colar-imagem__erro">{error}</p> : null}
    </div>
  );
}

export default AreaColarImagem;
