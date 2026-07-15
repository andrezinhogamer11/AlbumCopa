import { ref, computed } from 'vue';
import { stickers as allStickersData, Sticker } from '@/data/stickers';
import { listStickers, updateStickerCollected, updateStickerFavorite } from '@/services/database';
import { useAuth } from '@/composables/useAuth';

const allStickers = ref<Sticker[]>(allStickersData);
const collectedStickerIds = ref<Set<number>>(new Set());
const favoriteStickerIds = ref<Set<number>>(new Set());
const searchTerm = ref<string>('');
const filterStatus = ref<'all' | 'collected' | 'pending' | 'favorites'>('all');
const isLoadingAlbum = ref(false);

const normalizeSticker = (sticker: any): Sticker => ({
  id: sticker.id,
  name: sticker.name || '',
  team: sticker.team,
  image: sticker.image,
  collected: Boolean(sticker.collected),
  favorite: Boolean(sticker.favorite),
  rarity: sticker.rarity || 'Comum',
  isShiny: Boolean(sticker.is_shiny ?? sticker.isShiny),
});

const getStickerScore = (sticker: Sticker) => {
  if (sticker.isShiny) {
    return 10;
  }

  if (sticker.rarity === 'Rara') {
    return 5;
  }

  return 1;
};

const getCollectorLevel = (score: number) => {
  if (score > 500) {
    return {
      name: 'Diamante',
      color: 'tertiary',
      rangeStart: 501,
      nextLevel: null,
      nextThreshold: null,
    };
  }

  if (score >= 251) {
    return {
      name: 'Ouro',
      color: 'warning',
      rangeStart: 251,
      nextLevel: 'Diamante',
      nextThreshold: 501,
    };
  }

  if (score >= 101) {
    return {
      name: 'Prata',
      color: 'medium',
      rangeStart: 101,
      nextLevel: 'Ouro',
      nextThreshold: 251,
    };
  }

  return {
    name: 'Bronze',
    color: 'danger',
    rangeStart: 0,
    nextLevel: 'Prata',
    nextThreshold: 101,
  };
};

export function useAlbum() {
  const { currentUser } = useAuth();

  const loadAlbum = async () => {
    isLoadingAlbum.value = true;
    const stickersFromDb = await listStickers();
    allStickers.value = stickersFromDb.map(normalizeSticker);
    collectedStickerIds.value = new Set(allStickers.value.filter(s => s.collected).map(s => s.id));
    favoriteStickerIds.value = new Set(allStickers.value.filter(s => s.favorite).map(s => s.id));
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

  const toggleFavorite = async (stickerId: number) => {
    const nextFavorite = !favoriteStickerIds.value.has(stickerId);
    await updateStickerFavorite(stickerId, nextFavorite);

    const stickerIndex = allStickers.value.findIndex(s => s.id === stickerId);
    if (stickerIndex !== -1) {
      allStickers.value[stickerIndex].favorite = nextFavorite;
    }

    if (nextFavorite) {
      favoriteStickerIds.value.add(stickerId);
    } else {
      favoriteStickerIds.value.delete(stickerId);
    }
  };

  const setSearchTerm = (term: string) => { searchTerm.value = term.toLowerCase(); };
  const setFilterStatus = (status: 'all' | 'collected' | 'pending' | 'favorites') => { filterStatus.value = status; };

  const filteredStickers = computed(() => {
    let filtered = allStickers.value;
    if (searchTerm.value) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(searchTerm.value) || s.team.toLowerCase().includes(searchTerm.value));
    }
    if (filterStatus.value === 'collected') {
      filtered = filtered.filter(s => collectedStickerIds.value.has(s.id));
    } else if (filterStatus.value === 'pending') {
      filtered = filtered.filter(s => !collectedStickerIds.value.has(s.id));
    } else if (filterStatus.value === 'favorites') {
      filtered = filtered.filter(s => favoriteStickerIds.value.has(s.id));
    }
    return filtered;
  });

  const albumSummary = computed(() => {
    const total = allStickers.value.length;
    const collected = collectedStickerIds.value.size;
    return { totalFigurinhas: total, figurinhasColetadas: collected, percentage: total > 0 ? (collected / total) * 100 : 0 };
  });

  const collectorRanking = computed(() => {
    const totalScore = allStickers.value
      .filter(sticker => collectedStickerIds.value.has(sticker.id))
      .reduce((score, sticker) => score + getStickerScore(sticker), 0);
    const level = getCollectorLevel(totalScore);
    const pointsToNextLevel = level.nextThreshold === null ? 0 : Math.max(level.nextThreshold - totalScore, 0);
    const progress = level.nextThreshold === null
      ? 1
      : Math.min((totalScore - level.rangeStart) / (level.nextThreshold - level.rangeStart), 1);

    return {
      totalScore,
      levelName: level.name,
      levelColor: level.color,
      nextLevel: level.nextLevel,
      pointsToNextLevel,
      progress,
    };
  });

  return { allStickers, searchTerm, filterStatus, isLoadingAlbum, loadAlbum, toggleCollected, toggleFavorite, setSearchTerm, setFilterStatus, filteredStickers, albumSummary, collectorRanking };
}
