/** Texto preto ou branco sobre um fundo hexadecimal, para contraste de leitura. */
export function textoSobreFundo(hex: string): '#1a1a1a' | '#ffffff' {
  const raw = hex.replace('#', '').trim();
  const full = raw.length === 3 ? raw.split('').map((ch) => ch + ch).join('') : raw;
  if (full.length !== 6) return '#1a1a1a';

  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 0.55 ? '#1a1a1a' : '#ffffff';
}
