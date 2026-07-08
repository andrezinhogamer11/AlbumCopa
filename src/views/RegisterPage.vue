<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="register-container">
        <h1>Criar Conta</h1>
        <p>Preencha os dados para comecar sua colecao.</p>

        <ion-list lines="none">
          <ion-item class="custom-input">
            <ion-input
              label="Nome"
              label-placement="floating"
              v-model="name"
              @ionInput="name = String($event.detail.value || '')"
              placeholder="Seu nome"
            ></ion-input>
          </ion-item>

          <ion-item class="custom-input">
            <ion-input
              label="E-mail"
              label-placement="floating"
              type="email"
              v-model="email"
              @ionInput="email = String($event.detail.value || '')"
              placeholder="email@teste.com"
            ></ion-input>
          </ion-item>

          <ion-item class="custom-input">
            <ion-input
              label="Senha"
              label-placement="floating"
              type="password"
              v-model="password"
              @ionInput="password = String($event.detail.value || '')"
              placeholder="Sua senha"
            ></ion-input>
          </ion-item>

          <ion-button expand="block" class="main-button" type="button" @click="handleRegister">
            Cadastrar e Entrar
          </ion-button>

          <ion-button fill="clear" expand="block" color="medium" router-link="/login">
            Ja tenho conta? Voltar ao Login
          </ion-button>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, useIonRouter, alertController } from '@ionic/vue';
import { useAuth } from '@/composables/useAuth';

const name = ref('');
const email = ref('');
const password = ref('');
const { register } = useAuth();
const router = useIonRouter();

const handleRegister = async () => {
  if (!name.value.trim() || !email.value.trim() || !password.value) {
    const alert = await alertController.create({
      header: 'Erro',
      message: 'Preencha todos os campos!',
      buttons: ['OK'],
    });
    await alert.present();
    return;
  }

  try {
    const result = await register(name.value.trim(), email.value.trim(), password.value);

    if (result.success) {
      const alert = await alertController.create({
        header: 'Sucesso!',
        message: 'Conta criada com sucesso! Agora faca seu login.',
        buttons: [{ text: 'Ir para Login', handler: () => router.replace('/login') }],
      });
      await alert.present();
      return;
    }

    const alert = await alertController.create({
      header: 'Erro',
      message: result.message,
      buttons: ['OK'],
    });
    await alert.present();
  } catch (error) {
    console.error('Erro no cadastro', error);
    const alert = await alertController.create({
      header: 'Erro',
      message: 'Nao foi possivel cadastrar agora.',
      buttons: ['OK'],
    });
    await alert.present();
  }
};
</script>

<style scoped>
.register-container { padding: 40px 20px; text-align: center; }
.custom-input { --background: #fff; margin-bottom: 15px; border-radius: 12px; border: 1px solid #ddd; }
.main-button { --border-radius: 12px; height: 50px; margin-top: 20px; }
</style>
