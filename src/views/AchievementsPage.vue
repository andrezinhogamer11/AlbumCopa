<template>
  <ion-page>
    <AppHeader title="Conquistas" />
    <ion-content :fullscreen="true">
      <section class="summary">
        <div>
          <p>Insignias desbloqueadas</p>
          <h1>{{ unlockedCount }} / {{ totalCount }}</h1>
        </div>
        <ion-progress-bar :value="progress"></ion-progress-bar>
      </section>

      <div class="achievement-list">
        <ion-card
          v-for="achievement in achievements"
          :key="achievement.id"
          class="achievement-card"
          :class="{ locked: !achievement.desbloqueada }"
        >
          <div class="badge-icon">
            <ion-icon :icon="iconFor(achievement.icone)"></ion-icon>
          </div>

          <ion-card-header>
            <div class="title-row">
              <ion-card-title>{{ achievement.nome }}</ion-card-title>
              <ion-badge :color="achievement.desbloqueada ? 'success' : 'medium'">
                {{ achievement.desbloqueada ? 'Desbloqueada' : 'Bloqueada' }}
              </ion-badge>
            </div>
            <ion-card-subtitle>{{ achievement.descricao }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <span>Data de desbloqueio</span>
            <strong>{{ formatDate(achievement.data_desbloqueio) }}</strong>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onIonViewWillEnter } from '@ionic/vue';
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  IonProgressBar,
} from '@ionic/vue';
import {
  albumsOutline,
  constructOutline,
  diamondOutline,
  footballOutline,
  medalOutline,
  ribbonOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  sunnyOutline,
  trendingUpOutline,
  trophyOutline,
} from 'ionicons/icons';
import AppHeader from '@/components/AppHeader.vue';
import { useAchievements } from '@/composables/useAchievements';

const { achievements, loadAchievements, unlockedCount, totalCount, progress } = useAchievements();

const icons: Record<string, string> = {
  'albums-outline': albumsOutline,
  'construct-outline': constructOutline,
  'diamond-outline': diamondOutline,
  'football-outline': footballOutline,
  'medal-outline': medalOutline,
  'ribbon-outline': ribbonOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
  'sparkles-outline': sparklesOutline,
  'sunny-outline': sunnyOutline,
  'trending-up-outline': trendingUpOutline,
  'trophy-outline': trophyOutline,
};

const iconFor = (icon: string) => icons[icon] || ribbonOutline;

const formatDate = (value: string | null) => {
  if (!value) return 'Ainda nao desbloqueada';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
};

onIonViewWillEnter(() => {
  loadAchievements();
});
</script>

<style scoped>
.summary {
  background: #121212;
  color: #fff;
  padding: 22px 20px 26px;
  border-bottom: 4px solid var(--ion-color-primary);
}

.summary p {
  margin: 0 0 8px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0.75;
}

.summary h1 {
  margin: 0 0 14px;
  font-size: 2rem;
  font-weight: 900;
}

ion-progress-bar {
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.achievement-list {
  display: grid;
  gap: 12px;
  padding: 14px;
}

.achievement-card {
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  margin: 0;
  border-radius: 8px;
  border-left: 5px solid var(--ion-color-primary);
}

.achievement-card.locked {
  opacity: 0.62;
  border-left-color: var(--ion-color-medium);
}

.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: 12px;
  border-radius: 50%;
  background: #f2f2f2;
  color: var(--ion-color-primary);
  font-size: 1.55rem;
}

.locked .badge-icon {
  color: var(--ion-color-medium);
}

ion-card-header {
  padding: 14px 14px 6px 8px;
}

.title-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  justify-content: space-between;
}

ion-card-title {
  font-size: 1rem;
  line-height: 1.2;
}

ion-card-subtitle {
  margin-top: 6px;
  font-size: 0.78rem;
  line-height: 1.3;
}

ion-card-content {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 14px 14px 8px;
  font-size: 0.78rem;
}

ion-card-content span {
  color: var(--ion-color-medium);
}

ion-card-content strong {
  color: var(--ion-text-color);
}
</style>
