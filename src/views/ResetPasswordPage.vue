<template>
  <ion-page>
    <ion-header><ion-toolbar color="primary"><ion-title>Recuperar</ion-title></ion-toolbar></ion-header>
    <ion-content class="ion-padding ion-text-center">
      <h2>Recuperar Senha</h2>
      <ResetPasswordForm @reset-password-submitted="handleReset" />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ResetPasswordForm from "../components/ResetPasswordForm.vue";
import { useAuth } from '@/composables/useAuth';
const { resetarSenha } = useAuth();
const handleReset = async (e: string) => { await resetarSenha(e); alert('E-mail enviado!'); };
</script>