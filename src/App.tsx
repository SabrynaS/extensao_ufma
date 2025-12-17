import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AlertsContainer } from "@/components/AlertsContainer";
import { AlertProvider } from "@/contexts/AlertContext";
import { useAlerts } from "@/hooks/useAlerts";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/student/Dashboard";
import StudentRequests from "./pages/student/Requests";
import StudentEvents from "./pages/student/Events";
import StudentCertificates from "./pages/student/Certificates";
import StudentProfile from "./pages/student/Profile";
import CoordinatorReports from "./pages/coordinator/Reports";
import CoordinatorApprovals from "./pages/coordinator/Approvals";
import CoordinatorStudents from "./pages/coordinator/Students";
import CoordinatorOpportunities from "./pages/coordinator/Opportunities";
import CoordinatorSettings from "./pages/coordinator/Settings";
import CoordinatorAlerts from "./pages/coordinator/Alerts";
import CreateEvent from "./pages/events/CreateEvent";
import EditEvent from "./pages/events/EditEvent";
import NotFound from "./pages/NotFound";
import GroupsManagement from "./pages/coordinator/GroupsManagement";
import GroupMemberRoles from "./pages/teacher/GroupMembersRoles";
import { AppLayout } from "@/components/layout/AppLayout";
import AdminUsersPage from "./pages/admin/Users";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  // enquanto verifica auth, renderiza null para evitar redirect imediato
  if (loading) return null; // pode trocar por spinner se quiser
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// helper para aplicar ProtectedRoute + AppLayout de forma consistente
const withLayout = (node: React.ReactNode) => (
  <ProtectedRoute>
    <AppLayout breadcrumb={[]}>{node}</AppLayout>
  </ProtectedRoute>
);

function AppRoutes() {
  const { isAuthenticated, user, loading } = useAuth();

  // DEBUG: log para inspecionar estado
  console.log("[AppRoutes] loading:", loading, "isAuthenticated:", isAuthenticated, "user:", user);

  const loginRedirect = (() => {
    if (!user) return "/login";
    const role = user.role;
    if (role === "admin") return "/admin";
    if (role === "coordinator") return "/coordinator";
    if (role === "teacher") return "/teacher/groups";
    return "/student";
  })();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to={loginRedirect} replace /> : <Login />
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Student Routes (com layout) */}
      <Route path="/student" element={withLayout(<StudentDashboard />)} />
      <Route path="/student/requests" element={withLayout(<StudentRequests />)} />
      <Route path="/student/certificates" element={withLayout(<StudentCertificates />)} />
      <Route path="/student/profile" element={withLayout(<StudentProfile />)} />

      {/* Coordinator Routes (com layout) */}
      <Route path="/coordinator" element={withLayout(<CoordinatorReports />)} />
      <Route path="/coordinator/approvals" element={withLayout(<CoordinatorApprovals />)} />
      <Route path="/coordinator/students" element={withLayout(<CoordinatorStudents />)} />
      <Route path="/coordinator/reports" element={withLayout(<CoordinatorReports />)} />
      <Route path="/coordinator/opportunities" element={withLayout(<CoordinatorOpportunities />)} />
      <Route path="/coordinator/settings" element={withLayout(<CoordinatorSettings />)} />
      <Route path="/coordinator/alerts" element={withLayout(<CoordinatorAlerts />)} />
      <Route path="/coordinator/groups" element={withLayout(<GroupsManagement />)} />

      {/* Events Routes (com layout) */}
      <Route path="/events" element={withLayout(<StudentEvents />)} />
      <Route path="/events/create" element={withLayout(<CreateEvent />)} />
      <Route path="/events/edit/:id" element={withLayout(<EditEvent />)} />

      {/* Teacher Routes */}
      <Route path="/teacher/groups" element={<ProtectedRoute><GroupMemberRoles /></ProtectedRoute>} />

      {/* Admin (mantém sidebar/header via AppLayout) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AppLayout breadcrumb={[]}>
              <AdminUsersPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppWithAlerts() {
  const { alerts, removeAlert } = useAlerts();

  return (
    <>
      <AlertsContainer alerts={alerts} onRemove={removeAlert} />
      <AppRoutes />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AlertProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppWithAlerts />
          </AuthProvider>
        </BrowserRouter>
      </AlertProvider>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
