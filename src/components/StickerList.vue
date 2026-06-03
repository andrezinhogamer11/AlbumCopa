<template>
  <ion-toolbar>
    <!-- Chamamos a função handleSearch passando o evento -->
    <ion-searchbar @ionInput="handleSearch($event)" placeholder="Buscar..."></ion-searchbar>
  </ion-toolbar>

  <ion-segment :value="filterStatus" @ionChange="handleFilter($event)">
    <ion-segment-button value="all">
      <ion-label>Todas</ion-label>
    </ion-segment-button>
    <ion-segment-button value="collected">
      <ion-label>Coletadas</ion-label>
    </ion-segment-button>
    <ion-segment-button value="pending">
      <ion-label>Pendentes</ion-label>
    </ion-segment-button>
  </ion-segment>

  <ion-grid>
    <ion-row>
      <ion-col size="6" v-for="s in filteredStickers" :key="s.id">
        <StickerCard :sticker="s" @toggle-collected="toggleCollected" />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { 
  IonToolbar, 
  IonSearchbar, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonGrid, 
  IonRow, 
  IonCol 
} from '@ionic/vue';
import StickerCard from './StickerCard.vue';
import { useAlbum } from '@/composables/useAlbum';

const { filterStatus, filteredStickers, toggleCollected, setSearchTerm, setFilterStatus } = useAlbum();

// Função para tratar a busca sem erro de tipagem
const handleSearch = (ev: any) => {
  const value = ev.detail.value;
  setSearchTerm(value || '');
};

// Função para tratar o filtro sem erro de tipagem
const handleFilter = (ev: any) => {
  const value = ev.detail.value;
  setFilterStatus(value);
};
</script>

<style scoped>
ion-searchbar {
  --background: var(--ion-color-light);
}
ion-segment {
  margin: 10px 0;
}
</style>
