<template>
  <ion-list>
    <ion-item>
      <ion-input label="E-mail" type="email" v-model="email" placeholder="seu@email.com"></ion-input>
    </ion-item>
    <ion-button expand="block" @click="onReset">Redefinir Senha</ion-button>
    <ion-item lines="none" class="ion-text-center">
      <ion-label>
        <p><router-link to="/login">Voltar para o Login</router-link></p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/vue';

const email = ref('');
const emit = defineEmits(['reset-password-submitted']);

const onReset = () => {
  if (email.value) {
    emit('reset-password-submitted', email.value);
  }
};
</script>
