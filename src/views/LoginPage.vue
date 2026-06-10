<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="login-wrapper">
        
        <!-- VÍDEO DE FUNDO -->
        <video autoplay muted loop playsinline class="background-video">
  <!-- O caminho deve começar com / pois a pasta public é a raiz do site -->
  <source src="/assets/video/fundo.mp4" type="video/mp4">
  Seu navegador não suporta vídeos.
</video>


        <!-- Overlay escuro para dar contraste e o formulário aparecer melhor -->
        <div class="video-overlay"></div>
        
        <!-- Conteúdo por cima do vídeo -->
       <div class="content-overlay">
          <div class="header-section">
            <div class="logo-circle">
              <!-- Logo Spitfire -->
              <img src="https://1000logos.net/wp-content/uploads/2022/06/Spitfire-Logo-500x281.jpg" class="spitfire-logo" alt="Spitfire Logo" />
            </div>
            <h1 class="brand-name">dé room</h1>
            <p class="brand-sub">Álbum Digital de Shapes de Skate</p>
          </div>

          <div class="form-section">
            <div class="form-card">
              <h2>Bem-vindo!</h2>
              <p class="subtitle">Acesse sua conta para gerenciar sua coleção.</p>
              <LoginForm @login-submitted="handleLogin" />
            </div>
          </div>
        </div>
        
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, useIonRouter, alertController } from '@ionic/vue';
import LoginForm from '@/components/LoginForm.vue';
import { useAuth } from '@/composables/useAuth';

const { login } = useAuth( );
const router = useIonRouter();

const handleLogin = async (email: string, pass: string) => {
  const success = await login(email, pass);
  if (success) {
    router.replace("/tabs/album");
  } else {
    const alert = await alertController.create({
      header: 'Acesso Negado',
      message: 'E-mail ou senha incorretos.',
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
  }
};
</script>

<style scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  transform: translateX(-50%) translateY(-50%);
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.content-overlay {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.header-section {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.logo-circle {
  background: rgb(255, 255, 255);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 25px rgba(230, 33, 23, 0.4);
  padding: 12px;
}

.spitfire-logo {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.brand-name {
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: lowercase;
  margin: 0;
  letter-spacing: -1px;
  text-shadow: 2px 2px 15px rgba(250, 73, 73, 0.9);
}

.brand-sub {
  font-size: 0.9rem;
  opacity: 1;
  margin: 0;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.8);
  font-weight: 600;
  color: red;
}

.form-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px 20px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  width: 100%;
  max-width: 380px;
  backdrop-filter: blur(10px);
}

.form-card h2 { 
  font-size: 1.6rem; 
  font-weight: 900; 
  text-align: center; 
  margin: 0 0 5px; 
  color: #000;
  text-transform: uppercase;
}

.subtitle { 
  font-size: 0.85rem; 
  color: #555; 
  text-align: center; 
  margin-bottom: 25px; 
  font-weight: 500; 
}

</style>

