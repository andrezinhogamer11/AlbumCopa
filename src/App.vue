<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { initDatabase } from './services/database'
import { IonApp, IonRouterOutlet } from '@ionic/vue';

onMounted(() => {
  initDatabase().catch((error) => {
    console.error('Erro ao iniciar DB', error)
  })
})
</script>
