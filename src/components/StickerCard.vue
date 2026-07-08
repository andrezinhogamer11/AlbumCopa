<template>
  <div class="sticker-wrapper" :class="{ 'missing': !sticker.collected }" @click="onToggle">
    <div class="sticker-body" :class="cardClass">
      <!-- Bordinha branca clássica da figurinha -->
      <div class="sticker-content">
        <div class="image-box">
          <ion-img :src="sticker.image" class="player-photo"></ion-img>
          <div class="team-tag">{{ sticker.team }}</div>
          <div class="rarity-tag" :class="rarityClass">{{ rarityText }}</div>
        </div>
        <div class="info-box">
          <span class="player-name">{{ sticker.name || `Figurinha #${sticker.id}` }}</span>
          <span class="rarity-label" :class="rarityClass">{{ rarityText }}</span>
          <ion-icon v-if="sticker.isShiny" :icon="sparkles" class="shiny-icon"></ion-icon>
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
import { computed } from 'vue';
import { checkmarkCircle, sparkles } from 'ionicons/icons';
const props = defineProps<{ sticker: any }>();
const emit = defineEmits(['toggle-collected']);
const onToggle = () => emit('toggle-collected', props.sticker.id);
const rarityText = computed(() => props.sticker.isShiny ? 'Brilhante' : props.sticker.rarity || 'Comum');
const rarityClass = computed(() => ({
  common: props.sticker.rarity === 'Comum' && !props.sticker.isShiny,
  rare: props.sticker.rarity === 'Rara',
  shiny: props.sticker.isShiny,
}));
const cardClass = computed(() => ({
  'card-common': props.sticker.rarity === 'Comum' && !props.sticker.isShiny,
  'card-rare': props.sticker.rarity === 'Rara',
  'card-shiny': props.sticker.isShiny,
}));
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
  border: 2px solid #e8e8e8;
}

.sticker-body.card-common {
  border-color: #d8d8d8;
}

.sticker-body.card-rare {
  border-color: #1f2937;
  box-shadow: 0 4px 14px rgba(31, 41, 55, 0.35);
}

.sticker-body.card-shiny {
  border-color: #f2b705;
  box-shadow: 0 4px 16px rgba(242, 183, 5, 0.45);
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

.rarity-tag {
  position: absolute;
  left: 5px;
  bottom: 5px;
  max-width: calc(100% - 10px);
  background: rgba(255, 255, 255, 0.92);
  color: #222;
  font-size: 0.55rem;
  padding: 2px 5px;
  border-radius: 4px;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,0.18);
}

.rarity-tag.common {
  background: #f2f2f2;
  color: #222;
}

.rarity-tag.rare {
  background: #222;
  color: #fff;
}

.rarity-tag.shiny {
  background: #ffd84d;
  color: #111;
}

.info-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 4px;
  text-align: center;
  gap: 3px;
}

.player-name {
  font-size: 0.75rem;
  font-weight: 900;
  color: #333;
  line-height: 1;
  text-transform: uppercase;
}

.rarity-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-height: 14px;
  padding: 2px 5px;
  border-radius: 4px;
  background: #eeeeee;
  color: #333;
  font-size: 0.55rem;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
}

.rarity-label.rare {
  background: #222;
  color: #fff;
}

.rarity-label.shiny {
  background: #ffd84d;
  color: #111;
}

.shiny-icon {
  flex: 0 0 auto;
  color: #f2b705;
  font-size: 0.85rem;
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
