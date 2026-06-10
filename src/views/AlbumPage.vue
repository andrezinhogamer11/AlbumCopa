<template>
  <ion-page>
    <AppHeader title="tchau" />
    
    <ion-content :fullscreen="true">
      <!-- Dashboard de Progresso Estilizado -->
      <div class="dashboard">
        <div class="progress-info">
          <h3>Sua Jornada</h3>
          <h1>{{ albumSummary.percentage.toFixed(0) }}% <span>concluído</span></h1>
        </div>
        <div class="progress-bar-container">
          <div class="progress-fill" :style="{ width: albumSummary.percentage + '%' }"></div>
        </div>
        <div class="stats-row">
          <p><strong>{{ albumSummary.figurinhasColetadas }}</strong> de {{ albumSummary.totalFigurinhas }} figurinhas</p>
          <p>Faltam: <strong>{{ albumSummary.totalFigurinhas - albumSummary.figurinhasColetadas }}</strong></p>
        </div>
      </div>

      <!-- Lista de Figurinhas -->
      <StickerList />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import AppHeader from '@/components/AppHeader.vue';
import StickerList from '@/components/StickerList.vue';
import { useAlbum } from '@/composables/useAlbum';

const { albumSummary } = useAlbum();
</script>

<style scoped>
.dashboard {
  background: linear-gradient(135deg, var(--ion-color-primary) 0%, #004d26 100%);
  color: white;
  padding: 24px 20px 35px 20px;
  border-radius: 0 0 32px 32px;
  margin-bottom: 10px;
  box-shadow: 0 8px 20px rgba(0, 103, 51, 0.2);
}

.progress-info h3 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  margin: 0;
}

.progress-info h1 {
  font-size: 2.4rem;
  margin: 8px 0;
  font-weight: 900;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.progress-info h1 span {
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
}

.progress-bar-container {
  background: rgba(255, 255, 255, 0.15);
  height: 12px;
  border-radius: 6px;
  margin: 15px 0 12px;
  overflow: hidden;
  backdrop-filter: blur(4px);
}

.progress-fill {
  background: linear-gradient(90deg, var(--ion-color-secondary) 0%, #ffeb3b 100%);
  height: 100%;
  border-radius: 6px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-row p {
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.95;
}

.stats-row strong {
  font-size: 1rem;
  color: var(--ion-color-secondary);
}
</style>
