<template>
  <ion-page>
    <ion-header><ion-toolbar color="primary"><ion-title>Cadastro</ion-title></ion-toolbar></ion-header>
    <ion-content class="ion-padding ion-text-center">
      <h2>Crie sua conta</h2>
      <RegisterForm @register-submitted="handleRegister" />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonRouter } from '@ionic/vue';
import RegisterForm from '@/components/RegisterForm.vue';
import { useAuth } from '@/composables/useAuth';
const { cadastrar } = useAuth(); const router = useIonRouter();
const handleRegister = async (n: string, e: string, p: string) => { if (await cadastrar(n, e, p)) router.replace("/login"); };
</script>