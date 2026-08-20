import { useEffect } from 'react';

const STORAGE_PREFIX = 'book_scroll_position:';

type SavedScroll = {
  y: number;
  page: number | null;
  ratio: number;
};

function getBookKey(): string {
  const hash = window.location.hash.replace(/^#/, '');
  const match = hash.match(/^\/?livros\/([^/?#]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : 'default';
}

function storageKey(): string {
  return `${STORAGE_PREFIX}${getBookKey()}`;
}

function readSaved(): SavedScroll | null {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) {
      const legacy = localStorage.getItem('book_scroll_position');
      if (!legacy) return null;
      const y = parseInt(legacy, 10);
      return Number.isFinite(y) ? { y, page: null, ratio: 0 } : null;
    }
    const parsed = JSON.parse(raw) as Partial<SavedScroll>;
    if (typeof parsed.y !== 'number') return null;
    return {
      y: parsed.y,
      page: typeof parsed.page === 'number' ? parsed.page : null,
      ratio: typeof parsed.ratio === 'number' ? parsed.ratio : 0,
    };
  } catch {
    return null;
  }
}

function currentBookPage(): number | null {
  const markers = document.querySelectorAll<HTMLElement>('[data-book-page]');
  if (!markers.length) return null;

  const triggerY = Math.min(160, Math.max(56, Math.round(window.innerHeight * 0.1)));
  let page: number | null = null;

  markers.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const value = parseInt(el.getAttribute('data-book-page') || '', 10);
    if (Number.isNaN(value)) return;
    if (rect.top <= triggerY) page = value;
  });

  return page;
}

function scrollMetrics(): { y: number; max: number; ratio: number } {
  const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return { y, max, ratio: max > 0 ? y / max : 0 };
}

function saveScrollPosition() {
  const { y, ratio } = scrollMetrics();
  const payload: SavedScroll = {
    y,
    page: currentBookPage(),
    ratio,
  };
  try {
    localStorage.setItem(storageKey(), JSON.stringify(payload));
  } catch {
    // ignore
  }
}

function applySavedScroll(saved: SavedScroll) {
  const { max } = scrollMetrics();

  // Quando a página já tem altura suficiente, volta exatamente (ou por proporção)
  if (saved.y > 0 && max >= saved.y - 80) {
    window.scrollTo({ top: saved.y, behavior: 'auto' });
    return;
  }

  if (saved.ratio > 0 && max > 200) {
    window.scrollTo({ top: saved.ratio * max, behavior: 'auto' });
    return;
  }

  // Enquanto o conteúdo ainda carrega, ancora na página do livro
  if (saved.page != null) {
    const marker = document.querySelector<HTMLElement>(`[data-book-page="${saved.page}"]`);
    if (marker) {
      const top = marker.getBoundingClientRect().top + window.scrollY - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    }
  }
}

/**
 * Salva e restaura a posição de leitura do livro no F5 / reabertura.
 * Chave por livro (#/livro/:id) e restaura após o layout estabilizar.
 */
export function useScrollPosition() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const saved = readSaved();
    let cancelled = false;
    let lastHeight = 0;
    let allowAutoRestore = Boolean(saved);
    let restoring = false;
    const timeouts: number[] = [];

    let resizeObserver: ResizeObserver | null = null;

    const restore = () => {
      if (cancelled || !saved || !allowAutoRestore) return;
      restoring = true;
      applySavedScroll(saved);
      window.setTimeout(() => {
        restoring = false;
      }, 50);
    };

    const stopAutoRestore = () => {
      allowAutoRestore = false;
      resizeObserver?.disconnect();
    };

    const schedule = (ms: number) => {
      timeouts.push(window.setTimeout(restore, ms));
    };

    requestAnimationFrame(() => {
      restore();
      schedule(50);
      schedule(150);
      schedule(400);
      schedule(900);
      schedule(1600);
    });

    const images = Array.from(document.images);
    let pending = 0;
    images.forEach((img) => {
      if (img.complete) return;
      pending += 1;
      const done = () => {
        pending -= 1;
        if (pending <= 0) restore();
      };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (!allowAutoRestore) return;
        const height = document.documentElement.scrollHeight;
        if (Math.abs(height - lastHeight) < 40) return;
        lastHeight = height;
        restore();
      });
      resizeObserver.observe(document.documentElement);
    }

    timeouts.push(
      window.setTimeout(() => {
        stopAutoRestore();
      }, 2500),
    );

    let scrollTimeout: number | undefined;
    const handleScroll = () => {
      if (restoring || allowAutoRestore) return;
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(saveScrollPosition, 150);
    };

    const handleUserGesture = () => {
      stopAutoRestore();
      saveScrollPosition();
    };
    const handleBeforeUnload = () => saveScrollPosition();
    const handleVisibilityChange = () => {
      if (document.hidden) saveScrollPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleUserGesture, { passive: true });
    window.addEventListener('touchstart', handleUserGesture, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(scrollTimeout);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      saveScrollPosition();
    };
  }, []);
}
