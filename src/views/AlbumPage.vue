<template>
  <ion-page>
    <AppHeader title="Meu Álbum" />
    <ion-content :fullscreen="true">
      
      <!-- Botão de Controle de Áudio (Flutuante) -->
      <ion-fab vertical="top" horizontal="end" slot="fixed" class="music-fab">
        <ion-fab-button size="small" @click="toggleMusic" color="secondary">
          <ion-icon :icon="isMuted ? volumeMuteOutline : volumeHighOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- Dashboard de Progresso -->
      <div class="dashboard">
        <div class="progress-info">
          <h3>Sua Jornada</h3>
          <h1>{{ albumSummary.percentage.toFixed(0) }}% <span>concluído</span></h1>
        </div>
        <div class="progress-bar-container">
          <div class="progress-fill" :style="{ width: albumSummary.percentage + '%' }"></div>
        </div>
        <div class="stats-row">
          <p><strong>{{ albumSummary.figurinhasColetadas }}</strong> de {{ albumSummary.totalFigurinhas }} shapes</p>
          <p>Faltam: <strong>{{ albumSummary.totalFigurinhas - albumSummary.figurinhasColetadas }}</strong></p>
        </div>
      </div>

      <StickerList />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { volumeHighOutline, volumeMuteOutline } from 'ionicons/icons';
import AppHeader from '@/components/AppHeader.vue';
import StickerList from '@/components/StickerList.vue';
import { useAlbum } from '@/composables/useAlbum';

const { albumSummary } = useAlbum();

// LÓGICA DE ÁUDIO
const audio = new Audio('/assets/audio/musica.mp3'); // Caminho do seu arquivo
audio.loop = true;
const isMuted = ref(false);

const toggleMusic = () => {
  if (audio.paused) {
    audio.play();
    isMuted.ref = false;
  } else {
    audio.pause();
    isMuted.value = true;
  }
};

onMounted(() => {
  // Tenta tocar assim que entra na página
  // O navegador permite pois o usuário já interagiu com o Login
  audio.play().catch(err => {
    console.log("Autoplay bloqueado. O usuário precisa clicar em algo primeiro.");
    isMuted.value = true;
  });
});

onUnmounted(() => {
  // Para a música ao sair da página do álbum
  audio.pause();
});
</script>

<style scoped>
/* Estilo do botão de música */
.music-fab {
  margin-top: 60px; /* Ajuste para não ficar em cima do header */
  margin-right: 10px;
}

.dashboard {
  background: linear-gradient(135deg, var(--ion-color-primary) 0%, #000000 100%);
  color: white;
  padding: 24px 20px 35px 20px;
  border-radius: 0 0 32px 32px;
  margin-bottom: 10px;
  box-shadow: 0 8px 20px rgba(230, 33, 23, 0.2);
}

.progress-info h3 { font-size: 0.85rem; text-transform: uppercase; opacity: 0.8; margin: 0; }
.progress-info h1 { font-size: 2.4rem; margin: 8px 0; font-weight: 900; display: flex; align-items: baseline; gap: 8px; }
.progress-info h1 span { font-size: 1rem; font-weight: 400; opacity: 0.9; }

.progress-bar-container {
  background: rgba(255, 255, 255, 0.15);
  height: 12px;
  border-radius: 6px;
  margin: 15px 0 12px;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, var(--ion-color-primary) 0%, #ff4d4d 100%);
  height: 100%;
  border-radius: 6px;
  transition: width 0.8s ease-out;
}

.stats-row { display: flex; justify-content: space-between; align-items: center; }
.stats-row p { font-size: 0.85rem; margin: 0; opacity: 0.95; }
.stats-row strong { font-size: 1rem; color: var(--ion-color-primary); }
</style>
