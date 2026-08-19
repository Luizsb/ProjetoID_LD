/**
 * URL para ficheiros em `public/` e em `/conteudo/`, respeitando o `base` do Vite
 * (dev `/`, GitHub Pages `/ProjetoID_LD/`).
 */
export function withBase(pathFromSiteRoot: string): string {
  const p = pathFromSiteRoot.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') {
    return `/${p}`;
  }
  const withSlash = base.endsWith('/') ? base : `${base}/`;
  return `${withSlash}${p}`;
}

export function publicUrl(pathFromPublic: string): string {
  if (/^(https?:)?\/\//.test(pathFromPublic)) {
    return pathFromPublic;
  }
  return withBase(pathFromPublic.replace(/^\/+/, ''));
}
