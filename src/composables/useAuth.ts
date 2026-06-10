import { ref, computed } from 'vue';

interface User {
  name: string;
  email: string;
  password: string;
}

// IMPORTANTE: Estas variáveis ficam fora da função para serem compartilhadas por todas as telas
const registeredUsers = ref<User[]>([
  { name: 'Admin', email: 'admin@teste.com', password: '123' }
]);
const currentUser = ref<User | null>(null);

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null);

  const login = async (email: string, pass: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const user = registeredUsers.value.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass
        );
        if (user) {
          currentUser.value = user;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  };

  const register = async (name: string, email: string, pass: string) => {
    return new Promise<{ success: boolean; message: string }>((resolve) => {
      setTimeout(() => {
        const exists = registeredUsers.value.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          resolve({ success: false, message: 'Este e-mail já está cadastrado.' });
        } else {
          registeredUsers.value.push({ name, email, password: pass });
          resolve({ success: true, message: 'Conta criada!' });
        }
      }, 400);
    });
  };

  const logout = () => { currentUser.value = null; };

  return { currentUser, isAuthenticated, login, register, logout };
}
