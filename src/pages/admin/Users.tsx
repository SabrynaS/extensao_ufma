import React, { useState } from "react";
import { useAdmin } from "../../hooks/useAdmin";
import { UsersTable } from "../../components/admin/UsersTable";
import { UserFormModal } from "../../components/admin/UserFormModal";
import { AdminUser } from "../../data/mockData";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Login";
import SignUp from "../SignUp";
import StudentDashboard from "../student/Dashboard";


export default function AdminUsersPage() {
  const { users, loading, create, update, remove } = useAdmin();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);

  const handleOpenNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSave = async (payload: Omit<AdminUser, "id" | "createdAt">) => {
    if (editing) {
      await update(editing.id, payload);
    } else {
      await create(payload);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestão de usuários</h1>
        <div>
          <button onClick={handleOpenNew} className="px-4 py-2 rounded bg-primary text-white">
            Novo usuário
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <UsersTable
            users={users}
            onEdit={(u) => {
              setEditing(u);
              setOpen(true);
            }}
            onRemove={(id) => remove(id)}
          />
        )}
      </div>

      <UserFormModal open={open} onClose={() => setOpen(false)} onSave={handleSave} initial={editing} />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={
                user?.role === "coordinator"
                  ? "/coordinator"
                  : user?.role === "admin"
                  ? "/admin"
                  : "/student"
              }
              replace
            />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}