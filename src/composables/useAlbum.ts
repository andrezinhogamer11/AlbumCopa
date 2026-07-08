import { ref, computed } from 'vue';
import { stickers as allStickersData, Sticker } from '@/data/stickers';
import { listStickers, updateStickerCollected } from '@/services/database';
import { useAuth } from '@/composables/useAuth';

const allStickers = ref<Sticker[]>(allStickersData);
const collectedStickerIds = ref<Set<number>>(new Set());
const searchTerm = ref<string>('');
const filterStatus = ref<'all' | 'collected' | 'pending'>('all');
const isLoadingAlbum = ref(false);

const normalizeSticker = (sticker: any): Sticker => ({
  id: sticker.id,
  name: sticker.name || '',
  team: sticker.team,
  image: sticker.image,
  collected: Boolean(sticker.collected),
  rarity: sticker.rarity || 'Comum',
  isShiny: Boolean(sticker.is_shiny ?? sticker.isShiny),
});

export function useAlbum() {
  const { currentUser } = useAuth();

  const loadAlbum = async () => {
    isLoadingAlbum.value = true;
    const stickersFromDb = await listStickers();
    allStickers.value = stickersFromDb.map(normalizeSticker);
    collectedStickerIds.value = new Set(allStickers.value.filter(s => s.collected).map(s => s.id));
    isLoadingAlbum.value = false;
  };

  const toggleCollected = async (stickerId: number) => {
    const nextCollected = !collectedStickerIds.value.has(stickerId);
    await updateStickerCollected(stickerId, nextCollected, currentUser.value?.id || 1);

    const stickerIndex = allStickers.value.findIndex(s => s.id === stickerId);
    if (stickerIndex !== -1) {
      allStickers.value[stickerIndex].collected = nextCollected;
    }

    if (nextCollected) {
      collectedStickerIds.value.add(stickerId);
    } else {
      collectedStickerIds.value.delete(stickerId);
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

  return { allStickers, searchTerm, filterStatus, isLoadingAlbum, loadAlbum, toggleCollected, setSearchTerm, setFilterStatus, filteredStickers, albumSummary };
}
