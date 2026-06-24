import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

export interface GameModalData {
  name: string;
  provider: string;
  src: string;
}

/**
 * Replicates the original Figma site's vanilla-JS game-page behaviour
 * (filters.js + games.js + modal.js) scoped to a single page root element:
 *  - live search filtering of game cards
 *  - "Load more" cloning of cards (+ hover styling)
 *  - favourite-star toggle on each card
 *  - game modal on card click (exposed as reactive state for <GameModal>)
 */
export function useGamesPage(rootRef: Ref<HTMLElement | null>) {
  const modal = ref<GameModalData | null>(null);

  const gameCards = (root: HTMLElement) =>
    [...root.querySelectorAll<HTMLElement>('div.group')].filter((c) => c.querySelector('img[alt]'));

  // --- live search filter ---
  function onInput(e: Event) {
    const root = rootRef.value;
    const input = e.target as HTMLInputElement | null;
    if (!root || !input || input.tagName !== 'INPUT') return;
    const ph = (input.getAttribute('placeholder') || '').toLowerCase();
    if (!/search/.test(ph)) return;
    const q = input.value.trim().toLowerCase();
    gameCards(root).forEach((c) => {
      const txt = (c.textContent || '').toLowerCase();
      c.style.display = !q || txt.includes(q) ? '' : 'none';
    });
  }

  // --- favourite toggle + game modal ---
  function onClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const card = target.closest<HTMLElement>('div.group');
    if (!card) return;
    const img = card.querySelector<HTMLImageElement>('img[alt]');
    if (!img) return;

    const fav = target.closest<HTMLElement>('button');
    if (fav && fav.querySelector('svg') && /absolute/.test(fav.className)) {
      e.preventDefault();
      e.stopPropagation();
      const on = fav.dataset.fav !== '1';
      fav.dataset.fav = on ? '1' : '';
      const svg = fav.querySelector('svg')!;
      svg.setAttribute('fill', on ? '#98E7D2' : 'none');
      svg.style.stroke = on ? '#98E7D2' : 'currentColor';
      return;
    }

    const ps = card.querySelectorAll('p');
    const name = (card.querySelector('h3')?.textContent || img.getAttribute('alt') || 'Game').trim();
    const provider = (ps[ps.length - 1]?.textContent || '').trim();
    modal.value = { name, provider, src: img.src };
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') modal.value = null;
  }

  // --- Load more (clone up to 12 cards into each grid) ---
  function setupLoadMore(root: HTMLElement) {
    const grids = new Set<HTMLElement>();
    root.querySelectorAll<HTMLElement>('[class*="grid-cols"]').forEach((g) => {
      if (g.children.length >= 4) grids.add(g);
    });

    grids.forEach((grid) => {
      // locate the existing "Load more" button after this grid
      let btn: HTMLButtonElement | null = null;
      let probe = grid.nextElementSibling;
      for (let i = 0; i < 3 && probe; i++, probe = probe.nextElementSibling) {
        const b = (probe.matches?.('button') ? probe : probe.querySelector?.('button')) as HTMLButtonElement | null;
        if (b && /load more/i.test(b.textContent || '')) {
          btn = b;
          break;
        }
      }
      if (!btn) return;
      const button = btn;
      button.addEventListener('mouseenter', () => {
        button.style.background = '#313E40';
        button.style.color = '#AAE5D3';
        button.style.borderColor = '#AAE5D3';
      });
      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(255,255,255,0.05)';
        button.style.color = '#D1D5DB';
        button.style.borderColor = 'rgba(255,255,255,0.2)';
      });
      button.addEventListener('click', () => {
        const originals = [...grid.children].filter((c) => !(c as HTMLElement).dataset.clone);
        originals.slice(0, Math.min(originals.length, 12)).forEach((c) => {
          const n = c.cloneNode(true) as HTMLElement;
          n.dataset.clone = '1';
          grid.appendChild(n);
        });
      });
    });
  }

  onMounted(() => {
    const root = rootRef.value;
    if (!root) return;
    root.addEventListener('input', onInput);
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    setupLoadMore(root);
  });

  onBeforeUnmount(() => {
    const root = rootRef.value;
    root?.removeEventListener('input', onInput);
    root?.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKey);
  });

  return { modal };
}
