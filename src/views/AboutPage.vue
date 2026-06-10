<template>
  <ion-page>
    <AppHeader title="Sobre o App" />
    <ion-content class="ion-padding ion-text-center">
      <div class="about-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Senac_logo.svg/3840px-Senac_logo.svg.png" class="app-logo" />
        <h2>Álbum da Copa</h2>
        <p><strong>Versão:</strong> 1.0.0</p>
        
        <ion-list lines="full" class="ion-margin-top">
          <ion-item button @click="openLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ' )">
            <ion-label>Termos de Uso</ion-label>
            <ion-icon slot="end" :icon="openOutline"></ion-icon>
          </ion-item>
          <ion-item button @click="openLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ' )">
            <ion-label>Política de Privacidade</ion-label>
            <ion-icon slot="end" :icon="openOutline"></ion-icon>
          </ion-item>
        </ion-list>

        <p class="ion-margin-top">Desenvolvido para fins educacionais.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { openOutline } from 'ionicons/icons';
import AppHeader from '@/components/AppHeader.vue';

const openLink = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.app-logo {
  width: 200px;
  border-radius: 0px;
  margin-bottom: 15px;
}
h2 {
  color: var(--ion-color-primary);
  margin-bottom: 5px;
}
ion-list {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
