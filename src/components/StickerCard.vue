<template>
  <ion-card>
    <ion-img :src="sticker.image"></ion-img>
    <ion-card-header>
      <ion-card-title>{{ sticker.name }}</ion-card-title>
      <ion-card-subtitle>{{ sticker.team }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-item lines="none">
        <ion-label>Coletada</ion-label>
        <ion-toggle :checked="sticker.collected" @ionChange="onToggle"></ion-toggle>
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>
<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonItem, IonLabel, IonToggle } from '@ionic/vue';
const props = defineProps<{ sticker: any }>();
const emit = defineEmits(['toggle-collected']);
const onToggle = () => emit('toggle-collected', props.sticker.id);
</script>
<style scoped>ion-card { margin: 5px; } ion-img { height: 120px; object-fit: cover; }</style>