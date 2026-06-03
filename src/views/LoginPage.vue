<template>
  <ion-page>
    <ion-header><ion-toolbar color="primary"><ion-title>Login</ion-title></ion-toolbar></ion-header>
    <ion-content class="ion-padding ion-text-center">
      <h2>Álbum da Copa</h2>
      <LoginForm @login-submitted="handleLogin" />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonRouter } from '@ionic/vue';
import LoginForm from '@/components/LoginForm.vue';
import { useAuth } from '@/composables/useAuth';
const { login } = useAuth(); const router = useIonRouter();
const handleLogin = async (e: string, p: string) => { if (await login(e, p)) router.replace("/tabs/album"); };
</script>