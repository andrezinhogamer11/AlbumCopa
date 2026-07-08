<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Meus Contatos</IonTitle>
      </IonToolbar>
    </IonHeader>
    
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Meus Contatos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <!-- AQUI ESTÁ A CORREÇÃO: Chamando ContatoList e não ContatoForm -->
      <ContatoList />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ContatoList from '@/components/ContatoList.vue';
</script>
