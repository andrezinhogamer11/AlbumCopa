<template>
  <div class="login-form-container">
    <ion-list lines="none">
      <ion-item class="custom-input">
        <ion-input 
          label="E-mail" 
          label-placement="floating" 
          type="email" 
          v-model="email" 
          placeholder="exemplo@email.com"
        ></ion-input>
      </ion-item>
      
      <ion-item class="custom-input">
        <ion-input 
          label="Senha" 
          label-placement="floating" 
          type="password" 
          v-model="password" 
          placeholder="••••••••"
        ></ion-input>
      </ion-item>

      <div class="forgot-password">
        <router-link to="/reset-password">Esqueceu a senha?</router-link>
      </div>

      <ion-button expand="block" class="login-button" @click="onLogin">
        Entrar no Álbum
      </ion-button>

      <div class="register-link">
        <p>Ainda não tem álbum? <router-link to="/register">Começar agora</router-link></p>
      </div>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonInput, IonButton } from '@ionic/vue';
const email = ref(''); const password = ref('');
const emit = defineEmits(['login-submitted']);
const onLogin = () => { if (email.value && password.value) emit('login-submitted', email.value, password.value); };
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
  color: var(--ion-color-primary);
  text-decoration: none;
  font-weight: 600;
}

.login-button {
  --border-radius: 12px;
  --background: var(--ion-color-primary);
  --box-shadow: 0 6px 15px rgba(0, 103, 51, 0.3);
  height: 54px;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.register-link {
  text-align: center;
}

.register-link p {
  font-size: 0.9rem;
  color: #666;
}

.register-link a {
  color: var(--ion-color-primary);
  text-decoration: none;
  font-weight: 700;
}
</style>
