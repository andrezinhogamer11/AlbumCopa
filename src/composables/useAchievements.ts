import { computed, ref } from 'vue';
import { AchievementRow, listAchievements } from '@/services/database';
import { useAuth } from '@/composables/useAuth';

const achievements = ref<AchievementRow[]>([]);
const isLoadingAchievements = ref(false);

export function useAchievements() {
  const { currentUser } = useAuth();

  const loadAchievements = async () => {
    isLoadingAchievements.value = true;
    achievements.value = await listAchievements(currentUser.value?.id || 1);
    isLoadingAchievements.value = false;
  };

  const unlockedCount = computed(() => achievements.value.filter(a => Boolean(a.desbloqueada)).length);
  const totalCount = computed(() => achievements.value.length);
  const progress = computed(() => totalCount.value > 0 ? unlockedCount.value / totalCount.value : 0);

  return {
    achievements,
    isLoadingAchievements,
    loadAchievements,
    unlockedCount,
    totalCount,
    progress,
  };
}
