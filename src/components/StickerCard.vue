<template>
  <div class="sticker-wrapper" :class="{ 'missing': !sticker.collected }" @click="onToggle">
    <div class="sticker-body">
      <!-- Bordinha branca clássica da figurinha -->
      <div class="sticker-content">
        <div class="image-box">
          <ion-img :src="sticker.image" class="player-photo"></ion-img>
          <div class="team-tag">{{ sticker.team }}</div>
        </div>
        <div class="info-box">
          <span class="player-name">{{ sticker.name }}</span>
        </div>
      </div>
    </div>
    <!-- Indicador de "Já tenho" -->
    <div v-if="sticker.collected" class="collected-badge">
      <ion-icon :icon="checkmarkCircle"></ion-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonImg, IonIcon } from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';
const props = defineProps<{ sticker: any }>();
const emit = defineEmits(['toggle-collected']);
const onToggle = () => emit('toggle-collected', props.sticker.id);
</script>

<style scoped>
.sticker-wrapper {
  position: relative;
  padding: 10px;
  perspective: 1000px;
  transition: transform 0.2s;
}

.sticker-wrapper:active { transform: scale(0.92); }

.sticker-body {
  background: white;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  aspect-ratio: 3 / 4; /* Formato vertical de figurinha */
  display: flex;
  flex-direction: column;
}

.sticker-content {
  border: 1px solid #eee;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.image-box {
  position: relative;
  flex: 4;
  background: #f0f0f0;
}

.player-photo {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.team-tag {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
}

.info-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 4px;
  text-align: center;
}

.player-name {
  font-size: 0.75rem;
  font-weight: 900;
  color: #333;
  line-height: 1;
  text-transform: uppercase;
}

/* Efeito de figurinha faltando */
.missing .sticker-body {
  filter: grayscale(1) sepia(0.2);
  opacity: 0.4;
  box-shadow: none;
  border: 1px dashed #aaa;
}

.collected-badge {
  position: absolute;
  top: 0;
  right: 0;
  color: #2dd36f;
  font-size: 1.5rem;
  z-index: 10;
  background: white;
  border-radius: 50%;
  height: 20px;
  display: flex;
  align-items: center;
}
</style>
