import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/tabs/TabsPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue'; // Import adicionado
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'; // Import adicionado
import { useAuth } from '@/composables/useAuth';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage }, // Componente RegisterPage importado diretamente
  { path: '/reset-password', component: ResetPasswordPage }, // Componente ResetPasswordPage importado diretamente
  {
    path: '/tabs/', component: TabsPage,
    children: [
      { path: 'album', component: () => import('@/views/AlbumPage.vue'), meta: { requiresAuth: true } },
      { path: 'collection', component: () => import('@/views/CollectionPage.vue'), meta: { requiresAuth: true } },
      { path: 'profile', component: () => import('@/views/ProfilePage.vue'), meta: { requiresAuth: true } }
    ]
  }
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
  if (to.meta.requiresAuth && !isAuthenticated.value) next('/login');
  else if ((to.path === '/login' || to.path === '/register' || to.path === '/reset-password') && isAuthenticated.value) {
    next('/tabs/album'); // Redireciona para o álbum se já estiver logado e tentar acessar login/cadastro/reset
  } else {
    next();
  }
});

export default router;