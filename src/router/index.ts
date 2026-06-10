import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/tabs/TabsPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ResetPasswordPage from '@/views/ResetPasswordPage.vue';
import { useAuth } from '@/composables/useAuth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/reset-password',
    component: ResetPasswordPage
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/album'
      },
      {
        path: 'album',
        component: () => import('@/views/AlbumPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'collection',
        component: () => import('@/views/CollectionPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'about',
        component: () => import('@/views/AboutPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        component: () => import('@/views/ProfilePage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Guarda de rota para proteger páginas que exigem login
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Se a página exige login e o usuário não está logado, vai para Login
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register' || to.path === '/reset-password') && isAuthenticated.value) {
    // Se o usuário já está logado e tenta ir para Login/Cadastro, vai para o Álbum
    next('/tabs/album');
  } else {
    // Caso contrário, segue normalmente
    next();
  }
});

export default router;
