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
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherOpportunities from "./pages/teacher/Opportunities";
import TeacherReports from "./pages/teacher/Reports";
import TeacherProfile from "./pages/teacher/Profile";
import { AppLayout } from "@/components/layout/AppLayout";
import AdminUsersPage from "./pages/admin/Users";
import { Home } from "./pages/Home";
import CertificateValidation from "./pages/certifcates/CertificateValidation";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  // enquanto verifica auth, renderiza null para evitar redirect imediato
  if (loading) return null; // pode trocar por spinner se quiser
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user, loading } = useAuth();

  // DEBUG: log para inspecionar estado
  console.log("[AppRoutes] loading:", loading, "isAuthenticated:", isAuthenticated, "user:", user);

  const loginRedirect = (() => {
    if (!user) return "/login";
    const role = user.role;
    if (role === "admin") return "/admin";
    if (role === "coordenador" || role === "coordinator") return "/coordinator";
    if (role === "docente" || role === "teacher") return "/teacher/groups";
    if (role === "student_scholar") return "/events/create";
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
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Student Routes */}
      <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/requests" element={<ProtectedRoute><StudentRequests /></ProtectedRoute>} />
      <Route path="/student/certificates" element={<ProtectedRoute><StudentCertificates /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />

      {/* Coordinator Routes */}
      <Route path="/coordinator" element={<ProtectedRoute><CoordinatorReports /></ProtectedRoute>} />
      <Route path="/coordinator/approvals" element={<ProtectedRoute><CoordinatorApprovals /></ProtectedRoute>} />
      <Route path="/coordinator/students" element={<ProtectedRoute><CoordinatorStudents /></ProtectedRoute>} />
      <Route path="/coordinator/reports" element={<ProtectedRoute><CoordinatorReports /></ProtectedRoute>} />
      <Route path="/coordinator/opportunities" element={<ProtectedRoute><CoordinatorOpportunities /></ProtectedRoute>} />
      <Route path="/coordinator/settings" element={<ProtectedRoute><CoordinatorSettings /></ProtectedRoute>} />
      <Route path="/coordinator/alerts" element={<ProtectedRoute><CoordinatorAlerts /></ProtectedRoute>} />
      <Route path="/coordinator/groups" element={<ProtectedRoute><GroupsManagement /></ProtectedRoute>} />

      {/* Events Routes */}
      <Route path="/events" element={<ProtectedRoute><StudentEvents /></ProtectedRoute>} />
      <Route path="/events/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
      <Route path="/events/edit/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/groups" element={<ProtectedRoute><GroupMemberRoles /></ProtectedRoute>} />
      <Route path="/teacher/opportunities" element={<ProtectedRoute><TeacherOpportunities /></ProtectedRoute>} />
      <Route path="/teacher/reports" element={<ProtectedRoute><TeacherReports /></ProtectedRoute>} />
      <Route path="/teacher/profile" element={<ProtectedRoute><TeacherProfile /></ProtectedRoute>} />

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

      { /* documents Route */}
      <Route path="/certificate/validate" element={<CertificateValidation />} />

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
