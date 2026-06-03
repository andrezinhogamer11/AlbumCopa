<template>
  <ion-page>
    <AppHeader title="Coleção" />
    <ion-content><StickerList /></ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import AppHeader from '@/components/AppHeader.vue';
import StickerList from '@/components/StickerList.vue';
import { useAlbum } from '@/composables/useAlbum';
import { onMounted } from 'vue';
const { setFilterStatus } = useAlbum();
onMounted(() => setFilterStatus('collected'));
</script>