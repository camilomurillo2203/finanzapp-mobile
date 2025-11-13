// src/services/index.ts
import { wait } from "../utils";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface InternalUser extends User {
  password: string;
}

// Usuario demo inicial (por si quieres seguir probando)
const INITIAL_USERS: InternalUser[] = [
  {
    id: "1",
    name: "Usuario FinanzApp",
    email: "demo@finanzapp.com",
    password: "123456",
  },
];

let users: InternalUser[] = [...INITIAL_USERS];
let currentUser: User | null = null;

export const authService = {
  /**
   * Registro de usuario en memoria.
   */
  async register(name: string, email: string, password: string): Promise<User> {
    await wait(800);

    const normalizedEmail = email.trim().toLowerCase();

    const exists = users.some(
      (u) => u.email.trim().toLowerCase() === normalizedEmail
    );

    if (exists) {
      throw new Error("Ya existe una cuenta con ese correo.");
    }

    const newUser: InternalUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    users.push(newUser);

    const { password: _pw, ...safeUser } = newUser;
    currentUser = safeUser;
    return safeUser;
  },

  /**
   * Inicio de sesión.
   */
  async login(email: string, password: string): Promise<User> {
    await wait(800);

    const normalizedEmail = email.trim().toLowerCase();

    const found = users.find(
      (u) =>
        u.email.trim().toLowerCase() === normalizedEmail &&
        u.password === password
    );

    if (!found) {
      throw new Error("Correo o contraseña incorrectos.");
    }

    const { password: _pw, ...safeUser } = found;
    currentUser = safeUser;
    return safeUser;
  },

  async logout(): Promise<void> {
    await wait(300);
    currentUser = null;
  },

  getCurrentUser(): User | null {
    return currentUser;
  },
};
