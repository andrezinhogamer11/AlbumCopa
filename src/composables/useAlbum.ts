import { ref, computed } from 'vue';
import { stickers as allStickersData, Sticker } from '@/data/stickers';

const allStickers = ref<Sticker[]>(allStickersData);
const collectedStickerIds = ref<Set<number>>(new Set());
const searchTerm = ref<string>('');
const filterStatus = ref<'all' | 'collected' | 'pending'>('all');

export function useAlbum() {
  const toggleCollected = (stickerId: number) => {
    if (collectedStickerIds.value.has(stickerId)) {
      collectedStickerIds.value.delete(stickerId);
    } else {
      collectedStickerIds.value.add(stickerId);
    }
    const stickerIndex = allStickers.value.findIndex(s => s.id === stickerId);
    if (stickerIndex !== -1) {
      allStickers.value[stickerIndex].collected = collectedStickerIds.value.has(stickerId);
    }
  };

  const setSearchTerm = (term: string) => { searchTerm.value = term.toLowerCase(); };
  const setFilterStatus = (status: 'all' | 'collected' | 'pending') => { filterStatus.value = status; };

  const filteredStickers = computed(() => {
    let filtered = allStickers.value;
    if (searchTerm.value) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(searchTerm.value) || s.team.toLowerCase().includes(searchTerm.value));
    }
    if (filterStatus.value === 'collected') {
      filtered = filtered.filter(s => collectedStickerIds.value.has(s.id));
    } else if (filterStatus.value === 'pending') {
      filtered = filtered.filter(s => !collectedStickerIds.value.has(s.id));
    }
    return filtered;
  });

  const albumSummary = computed(() => {
    const total = allStickers.value.length;
    const collected = collectedStickerIds.value.size;
    return { totalFigurinhas: total, figurinhasColetadas: collected, percentage: total > 0 ? (collected / total) * 100 : 0 };
  });

  return { allStickers, searchTerm, filterStatus, toggleCollected, setSearchTerm, setFilterStatus, filteredStickers, albumSummary };
}