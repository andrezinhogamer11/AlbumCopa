import { computed, ref } from 'vue';
import { addUsuario, findUsuarioByEmail, realizarLogin } from '@/services/database';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const currentUser = ref<User | null>(null);

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null);

  const login = async (email: string, pass: string) => {
    const users = await realizarLogin(email, pass);
    const user = users[0];

    if (!user) {
      return false;
    }

    currentUser.value = {
      id: user.id,
      name: user.nome,
      email: user.email,
      password: user.senha,
    };

    return true;
  };

  const register = async (name: string, email: string, pass: string) => {
    const exists = await findUsuarioByEmail(email);
    if (exists.length > 0) {
      return { success: false, message: 'Este e-mail ja esta cadastrado.' };
    }

    await addUsuario(name, email, pass);
    return { success: true, message: 'Conta criada!' };
  };

  const logout = () => {
    currentUser.value = null;
  };

  return { currentUser, isAuthenticated, login, register, logout };
}
