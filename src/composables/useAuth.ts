import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { users } from '@/data/stickers';

interface User {
  email: string;
  name: string;
}

const currentUser = ref<User | null>(null);
const isAuthenticated = computed(() => currentUser.value !== null);

export function useAuth() {
  const router = useRouter();

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const userFound = users.find(u => u.email === email && u.password === password);
    if (userFound) {
      currentUser.value = { email: userFound.email, name: userFound.name };
      return true;
    }
    return false;
  };

  const logout = () => {
    currentUser.value = null;
    router.replace('/login');
  };

  const cadastrar = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (users.some(u => u.email === email)) return false;
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) return false;
    users.push({ email, password, name });
    return true;
  };

  const resetarSenha = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return users.some(u => u.email === email);
  };

  return { currentUser, isAuthenticated, login, logout, cadastrar, resetarSenha };
}