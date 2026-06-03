<template>
  <ion-page>
    <AppHeader title="Meu Álbum" />
    <ion-content>
      <ion-card class="ion-padding">
        <ion-card-title>Progresso: {{ albumSummary.percentage.toFixed(0) }}%</ion-card-title>
        <ion-progress-bar :value="albumSummary.percentage / 100"></ion-progress-bar>
      </ion-card>
      <StickerList />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardTitle, IonProgressBar } from '@ionic/vue';
import AppHeader from '@/components/AppHeader.vue';
import StickerList from '@/components/StickerList.vue';
import { useAlbum } from '@/composables/useAlbum';
const { albumSummary } = useAlbum();
</script>