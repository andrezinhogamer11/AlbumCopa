<template>
  <ion-list>
    <ion-item><ion-input label="E-mail" type="email" v-model="email" placeholder="seu@email.com"></ion-input></ion-item>
    <ion-item><ion-input label="Senha" type="password" v-model="password" placeholder="Sua senha"></ion-input></ion-item>
    <ion-button expand="block" @click="onLogin">Login</ion-button>
    <ion-item lines="none" class="ion-text-center">
      <ion-label>
        <p>Não tem uma conta? <router-link to="/register">Crie uma aqui</router-link></p>
        <p><router-link to="/reset-password">Esqueceu a senha?</router-link></p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/vue';
const email = ref(''); const password = ref('');
const emit = defineEmits(['login-submitted']);
const onLogin = () => { if (email.value && password.value) emit('login-submitted', email.value, password.value); };
</script>