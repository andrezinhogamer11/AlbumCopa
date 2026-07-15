<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button router-link="/tabs/profile"><ion-icon :icon="personCircleOutline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton, IonIcon } from '@ionic/vue';
import { personCircleOutline } from 'ionicons/icons';
defineProps<{ title: string }>();
</script>

