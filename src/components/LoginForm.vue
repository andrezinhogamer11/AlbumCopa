<template>
  <div class="login-form-container">
    <ion-list lines="none">
      <form @submit.prevent="onLogin">
        <ion-item class="custom-input">
          <ion-input
            label="E-mail"
            label-placement="floating"
            type="email"
            :value="email"
            @ionInput="email = String($event.detail.value || '')"
            placeholder="exemplo@email.com"
          ></ion-input>
        </ion-item>

        <ion-item class="custom-input">
          <ion-input
            label="Senha"
            label-placement="floating"
            type="password"
            :value="password"
            @ionInput="password = String($event.detail.value || '')"
            placeholder="••••••••"
          ></ion-input>
        </ion-item>

        <div class="forgot-password">
          <router-link to="/reset-password">Esqueceu a senha?</router-link>
        </div>

        <!-- BOTÃO ATUALIZADO COM A COR PRIMÁRIA (VERMELHA) -->
        <ion-button expand="block" class="login-button" type="submit">
          Entrar no Álbum
        </ion-button>

        <div class="register-link">
          <p>Ainda não tem álbum? <router-link to="/register">Começar agora</router-link></p>
        </div>
      </form>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonInput, IonButton } from '@ionic/vue';

const email = ref('');
const password = ref('');
const emit = defineEmits(['login-submitted']);

const onLogin = () => {
  emit('login-submitted', email.value.trim(), password.value);
};
</script>

<style scoped>
.login-form-container {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

ion-list {
  background: transparent;
}

.custom-input {
  --background: rgba(255, 255, 255, 0.9);
  --border-radius: 12px;
  --padding-start: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid #e0e0e0;
}

.forgot-password {
  text-align: right;
  margin-bottom: 24px;
}

.forgot-password a {
  font-size: 0.85rem;
  color: #e62117; /* Vermelho Spitfire */
  text-decoration: none;
  font-weight: 600;
}

/* AQUI ESTÁ A MUDANÇA DA COR DO BOTÃO */
.login-button {
  --border-radius: 12px;
  --background: #e62117; /* Força a cor vermelha aqui */
  --background-activated: #ca1d14; /* Cor quando clica */
  --box-shadow: 0 6px 15px rgba(230, 33, 23, 0.4);
  height: 54px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: white;
}

.register-link {
  text-align: center;
}

.register-link p {
  font-size: 0.9rem;
  color: #666;
}

.register-link a {
  color: #e62117; /* Vermelho Spitfire */
  text-decoration: none;
  font-weight: 700;
}
</style>
