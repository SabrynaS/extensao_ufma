import { v4 as uuid } from "uuid";
import { AdminUser, AdminRole } from "../data/mockData";
import { users as mockUsers } from "../data/mockData";

let adminUsers: AdminUser[] = Object.values(mockUsers).map((u: any) => ({
  id: u.id ?? uuid(),
  name: u.name,
  email: u.email,
  registration: u.matricula ?? u.siape,
  role: (u.role as AdminRole) ?? "admin",
  createdAt: new Date().toISOString(),
}));

const sendInitialCredentials = async (user: AdminUser): Promise<void> => {
  // simula envio de e-mail (mock) - implementação local para evitar dependência de módulo inexistente
  // no-op em ambiente de teste / desenvolvimento
  return;
};

export const adminService = {
  list: async (): Promise<AdminUser[]> => {
    // simula delay
    await new Promise((r) => setTimeout(r, 150));
    return [...adminUsers];
  },
  create: async (data: Omit<AdminUser, "id" | "createdAt">): Promise<AdminUser> => {
    const user: AdminUser = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...data,
    };
    adminUsers = [user, ...adminUsers];
    // simula envio de e-mail (mock)
    await sendInitialCredentials(user);
    return user;
  },
  update: async (id: string, patch: Partial<Omit<AdminUser, "id" | "createdAt">>): Promise<AdminUser | null> => {
    const idx = adminUsers.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    adminUsers[idx] = { ...adminUsers[idx], ...patch };
    return adminUsers[idx];
  },
  remove: async (id: string): Promise<void> => {
    adminUsers = adminUsers.filter((u) => u.id !== id);
  },
};