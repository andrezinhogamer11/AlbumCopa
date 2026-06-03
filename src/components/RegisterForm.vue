<template>
  <ion-list>
    <ion-item><ion-input label="Nome" v-model="name"></ion-input></ion-item>
    <ion-item><ion-input label="E-mail" type="email" v-model="email"></ion-input></ion-item>
    <ion-item><ion-input label="Senha" type="password" v-model="password"></ion-input></ion-item>
    <ion-item><ion-input label="Confirmar" type="password" v-model="confirmPassword"></ion-input></ion-item>
    <ion-button expand="block" @click="onRegister">Cadastrar</ion-button>
    <ion-item lines="none" class="ion-text-center">
      <ion-label><p>Já tem conta? <router-link to="/login">Login</router-link></p></ion-label>
    </ion-item>
  </ion-list>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/vue';
const name = ref(''); const email = ref(''); const password = ref(''); const confirmPassword = ref('');
const emit = defineEmits(['register-submitted']);
const onRegister = () => { if (name.value && email.value && password.value === confirmPassword.value) emit('register-submitted', name.value, email.value, password.value); };
</script>