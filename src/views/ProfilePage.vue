<template>
  <ion-page>
    <AppHeader title="Perfil" />
    <ion-content class="ion-padding ion-text-center">
      <ion-card v-if="currentUser">
        <ion-card-header><ion-card-title>{{ currentUser.name }}</ion-card-title></ion-card-header>
        <ion-card-content><p>{{ currentUser.email }}</p></ion-card-content>
      </ion-card>
      <ion-button expand="block" color="danger" @click="logout">Sair</ion-button>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import AppHeader from '@/components/AppHeader.vue';
import { useAuth } from '@/composables/useAuth';
const { currentUser, logout } = useAuth();
</script>