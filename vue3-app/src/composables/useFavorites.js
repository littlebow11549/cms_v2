import { ref } from 'vue';

const FAV_KEY = 'lobby_favs_v1';

function loadFavs() {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
  catch { return new Set(); }
}

export function useFavorites() {
  const favs = ref(loadFavs());

  function toggle(id) {
    const next = new Set(favs.value);
    next.has(id) ? next.delete(id) : next.add(id);
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...next])); } catch {}
    favs.value = next;
  }

  return { favs, toggle };
}
