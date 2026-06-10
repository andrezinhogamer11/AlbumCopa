<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="album" href="/tabs/album">
          <ion-icon :icon="albumsOutline"></ion-icon>
          <ion-label>Álbum</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="collection" href="/tabs/collection">
          <ion-icon :icon="gridOutline"></ion-icon>
          <ion-label>Coleção</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="about" href="/tabs/about">
          <ion-icon :icon="informationCircleOutline"></ion-icon>
          <ion-label>Sobre</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personCircleOutline"></ion-icon>
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { albumsOutline, gridOutline, personCircleOutline, informationCircleOutline } from 'ionicons/icons';
</script>
