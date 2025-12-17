import { useEffect, useState } from "react";
import { AdminUser } from "../data/mockData";
import { adminService } from "../services/adminService";

export function useAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const list = await adminService.list();
    setUsers(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (u: Omit<AdminUser, "id" | "createdAt">) => {
    const created = await adminService.create(u);
    setUsers((s) => [created, ...s]);
    return created;
  };

  const update = async (id: string, patch: Partial<Omit<AdminUser, "id" | "createdAt">>) => {
    const updated = await adminService.update(id, patch);
    if (updated) setUsers((s) => s.map((it) => (it.id === id ? updated : it)));
    return updated;
  };

  const remove = async (id: string) => {
    await adminService.remove(id);
    setUsers((s) => s.filter((it) => it.id !== id));
  };

  return { users, loading, load, create, update, remove };
}