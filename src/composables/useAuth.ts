import { computed, ref } from 'vue';
import { addUsuario, findUsuarioByEmail, realizarLogin } from '@/services/database';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const currentUser = ref<User | null>(null);
const fallbackUsersKey = 'albumcopa_users';

const seedUsers: User[] = [
  { id: 1, name: 'Admin', email: 'admin@teste.com', password: '123' },
  { id: 2, name: 'Usuario Teste', email: 'andre@gmail.com', password: 'andre123' },
];

const loadFallbackUsers = () => {
  const savedUsers = localStorage.getItem(fallbackUsersKey);
  if (!savedUsers) {
    localStorage.setItem(fallbackUsersKey, JSON.stringify(seedUsers));
    return seedUsers;
  }

  return JSON.parse(savedUsers) as User[];
};

const saveFallbackUsers = (users: User[]) => {
  localStorage.setItem(fallbackUsersKey, JSON.stringify(users));
};

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null);

  const login = async (email: string, pass: string) => {
    try {
      const users = await realizarLogin(email, pass);
      const user = users[0];

      if (user) {
        currentUser.value = {
          id: user.id,
          name: user.nome,
          email: user.email,
          password: user.senha,
        };

        return true;
      }
    } catch (error) {
      console.warn('SQLite indisponivel para login, usando fallback local.', error);
    }

    const fallbackUser = loadFallbackUsers().find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === pass,
    );

    if (!fallbackUser) {
      return false;
    }

    currentUser.value = fallbackUser;
    return true;
  };

  const register = async (name: string, email: string, pass: string) => {
    try {
      const exists = await findUsuarioByEmail(email);
      if (exists.length > 0) {
        return { success: false, message: 'Este e-mail ja esta cadastrado.' };
      }

      await addUsuario(name, email, pass);
      return { success: true, message: 'Conta criada!' };
    } catch (error) {
      console.warn('SQLite indisponivel para cadastro, usando fallback local.', error);
    }

    const fallbackUsers = loadFallbackUsers();
    const exists = fallbackUsers.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return { success: false, message: 'Este e-mail ja esta cadastrado.' };
    }

    fallbackUsers.push({
      id: Date.now(),
      name,
      email,
      password: pass,
    });
    saveFallbackUsers(fallbackUsers);

    return { success: true, message: 'Conta criada!' };
  };

  const logout = () => {
    currentUser.value = null;
  };

  return { currentUser, isAuthenticated, login, register, logout };
}
