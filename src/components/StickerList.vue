<template>
  <div class="list-container">
    <ion-toolbar class="search-bar">
      <ion-searchbar @ionInput="handleSearch($event)" placeholder="Buscar craque..."></ion-searchbar>
    </ion-toolbar>

    <ion-segment :value="filterStatus" @ionChange="handleFilter($event)" mode="md">
      <ion-segment-button value="all"><ion-label>TODAS</ion-label></ion-segment-button>
      <ion-segment-button value="collected"><ion-label>COLETADAS</ion-label></ion-segment-button>
      <ion-segment-button value="pending"><ion-label>FALTANDO</ion-label></ion-segment-button>
      <ion-segment-button value="favorites"><ion-label>FAVORITAS</ion-label></ion-segment-button>
    </ion-segment>

    <ion-grid>
      <ion-row>
        <!-- Mudamos para size="4" para caber 3 figurinhas por linha no celular -->
        <ion-col size="4" size-md="3" size-lg="2" v-for="s in filteredStickers" :key="s.id">
          <StickerCard :sticker="s" @toggle-collected="toggleCollected" @toggle-favorite="toggleFavorite" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { IonToolbar, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol, onIonViewWillEnter } from '@ionic/vue';
import { onMounted } from 'vue';
import StickerCard from './StickerCard.vue';
import { useAlbum } from '@/composables/useAlbum';

const { filterStatus, filteredStickers, loadAlbum, toggleCollected, toggleFavorite, setSearchTerm, setFilterStatus } = useAlbum();

const handleSearch = (ev: any) => setSearchTerm(ev.detail.value || '');
const handleFilter = (ev: any) => setFilterStatus(ev.detail.value);

onIonViewWillEnter(() => {
  loadAlbum();
});

onMounted(() => {
  loadAlbum();
});
</script>

<style scoped>
.list-container { background: var(--ion-background-color); }
ion-segment { --background: transparent; margin: 10px 0; }
ion-segment-button { --color-checked: var(--ion-color-primary); font-weight: bold; }
ion-grid { padding: 5px; }
ion-col { padding: 2px; }
</style>
