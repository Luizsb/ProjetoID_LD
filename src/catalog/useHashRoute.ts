import { useEffect, useState } from 'react';

export type AppRoute =
  | { name: 'catalog' }
  | { name: 'book'; bookId: string };

function parseHash(hash: string): AppRoute {
  const path = hash.replace(/^#/, '').replace(/^\/+/, '');
  const parts = path.split('/').filter(Boolean);

  if (parts[0] === 'livros' && parts[1]) {
    return { name: 'book', bookId: decodeURIComponent(parts[1]) };
  }

  return { name: 'catalog' };
}

export function useHashRoute(): AppRoute {
  const [route, setRoute] = useState<AppRoute>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export function catalogHref(): string {
  return '#/';
}

export function bookHref(bookId: string): string {
  return `#/livros/${encodeURIComponent(bookId)}`;
}
