<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Mantendo seu fundo com degradê total -->
      <div class="login-wrapper">
        
        <!-- Branding da Copa -->
        <div class="header-section">
          <div class="logo-circle">
            <ion-icon :icon="trophyOutline" class="logo-icon"></ion-icon>
          </div>
          <h1>FIFA World Cup</h1>
          <p>Álbum Digital de Figurinhas</p>
        </div>

        <!-- Card de Login centralizado e com tamanho justo -->
        <div class="form-section">
          <div class="form-card">
            <h2>Bem-vindo de volta!</h2>
            <p class="subtitle">Acesse sua conta para gerenciar sua coleção.</p>
            
            <!-- O formulário que emite o evento de login -->
            <LoginForm @login-submitted="handleLogin" />
          </div>
        </div>
        
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonContent, 
  IonIcon,
  useIonRouter,
  alertController 
} from '@ionic/vue';
import { trophyOutline } from 'ionicons/icons';
import LoginForm from '@/components/LoginForm.vue';
import { useAuth } from '@/composables/useAuth';

const { login } = useAuth();
const router = useIonRouter();

// Lógica funcional de login conectada ao useAuth dinâmico
const handleLogin = async (email: string, pass: string) => {
  const success = await login(email, pass);
  
  if (success) {
    // Se der certo, vai para o álbum
    router.replace("/tabs/album");
  } else {
    // Se der errado, avisa o usuário
    const alert = await alertController.create({
      header: 'Acesso Negado',
      message: 'E-mail ou senha incorretos. Verifique seus dados ou crie uma conta.',
      buttons: ['Tentar Novamente'],
      mode: 'ios'
    });
    await alert.present();
  }
};
</script>

<style scoped>
/* Seu CSS de degradê total e centralização */
.login-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: linear-gradient(135deg, var(--ion-color-primary) 0%, #004d26 100%);
  padding: 40px 20px;
  align-items: center;
  justify-content: center;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  margin-bottom: 40px;
}

.logo-circle {
  background: var(--ion-color-secondary);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.logo-icon {
  font-size: 35px;
  color: #000;
}

.header-section h1 {
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-section p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 5px 0 0;
}

.form-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-card {
  background: white;
  padding: 30px 20px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 380px;
}

.form-card h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  text-align: center;
}

.subtitle {
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  margin-bottom: 25px;
}
</style>
