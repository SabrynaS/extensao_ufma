import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { OpportunitiesProvider } from "@/contexts/OpportunitiesContext";
import { StudentGroupsProvider } from "@/contexts/StudentGroupsContext";
import { SolicitationsProvider } from "@/contexts/SolicitationsContext";
import { CommissionProvider } from "@/contexts/CommissionContext";
import { AlertsContainer } from "@/components/AlertsContainer";
import { AlertProvider } from "@/contexts/AlertContext";
import { useAlerts } from "@/hooks/useAlerts";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/student/Dashboard";
import StudentRequests from "./pages/student/Requests";
import StudentEvents from "./pages/student/Events";
import StudentProfile from "./pages/student/Profile";
import MyGroupsStudent from "./pages/student/MyGroups";
import CoordinatorReports from "./pages/coordinator/Reports";
import CoordinatorApprovals from "./pages/coordinator/Approvals";
import SolicitationValidation from "./pages/coordinator/SolicitationValidation";
import CoordinatorStudents from "./pages/coordinator/Students";
import StudentHistory from "./pages/coordinator/StudentHistory";
import CoordinatorOpportunities from "./pages/coordinator/Opportunities";
import CreateOpportunity from "./pages/coordinator/CreateOpportunity";
import EditOpportunity from "./pages/coordinator/EditOpportunity";
import DelegateSolicitations from "./pages/coordinator/DelegateSolicitations";
import CommissionManagement from "./pages/coordinator/CommissionManagement";
import CoordinatorSettings from "./pages/coordinator/Settings";
import CoordinatorAlerts from "./pages/coordinator/Alerts";
import CreateEvent from "./pages/events/CreateEvent";
import EditEvent from "./pages/events/EditEvent";
import NotFound from "./pages/NotFound";
import GroupsManagement from "./pages/coordinator/GroupsManagement";
import GroupMemberRoles from "./pages/teacher/GroupMembersRoles";
import MyGroups from "./pages/teacher/MyGroups";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherOpportunities from "./pages/teacher/Opportunities";
import TeacherProfile from "./pages/teacher/Profile";
import { AppLayout } from "@/components/layout/AppLayout";
import AdminUsersPage from "./pages/admin/Users";
import { Home } from "./pages/Home";
import { PublicOpportunities } from "./pages/PublicOpportunities";
import Help from "./pages/Help";
import CertificatesPage from "./pages/Certificates";
import NotificationsPage from "./pages/Notifications";
import RegisterExternalActivityPage from "./pages/student/RegisterExternalActivity";
import PapeisPage from "./pages/Papeis";
import MockProfiles from "./pages/MockProfiles";

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
  console.log(
    "[AppRoutes] loading:",
    loading,
    "isAuthenticated:",
    isAuthenticated,
    "user:",
    user
  );

  const loginRedirect = (() => {
    if (!user) return "/login";
    const role = user.role;
    if (role === "admin") return "/admin";
    if (role === "coordenador" || role === "coordinator") return "/coordinator";
    if (role === "comissao" || role === "commission") return "/commission";
    if (role === "docente" || role === "teacher") return "/teacher";
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
      <Route path="/opportunities" element={<PublicOpportunities />} />
      <Route path="/papeis" element={<PapeisPage />} />
      <Route path="/help" element={<Help />} />
      <Route path="/certificate/validate" element={<CertificatesPage />} />
      <Route path="/mock-profiles" element={<MockProfiles />} />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/requests"
        element={
          <ProtectedRoute>
            <StudentRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/groups"
        element={
          <ProtectedRoute>
            <MyGroupsStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/register-external-activity"
        element={
          <ProtectedRoute>
            <RegisterExternalActivityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* Coordinator Routes */}
      <Route
        path="/coordinator"
        element={
          <ProtectedRoute>
            <CoordinatorReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/approvals"
        element={
          <ProtectedRoute>
            <CoordinatorApprovals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/approvals/:id"
        element={
          <ProtectedRoute>
            <SolicitationValidation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/approvals/delegate"
        element={
          <ProtectedRoute>
            <DelegateSolicitations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/commission"
        element={
          <ProtectedRoute>
            <CommissionManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/students"
        element={
          <ProtectedRoute>
            <CoordinatorStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/students/:id/history"
        element={
          <ProtectedRoute>
            <StudentHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/reports"
        element={
          <ProtectedRoute>
            <CoordinatorReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/opportunities"
        element={
          <ProtectedRoute>
            <CoordinatorOpportunities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/opportunities/create"
        element={
          <ProtectedRoute>
            <CreateOpportunity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/opportunities/edit/:id"
        element={
          <ProtectedRoute>
            <EditOpportunity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/settings"
        element={
          <ProtectedRoute>
            <CoordinatorSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/alerts"
        element={
          <ProtectedRoute>
            <CoordinatorAlerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinator/groups"
        element={
          <ProtectedRoute>
            <GroupsManagement />
          </ProtectedRoute>
        }
      />

      {/* Events Routes */}
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <StudentEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/create"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/edit/:id"
        element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        }
      />

      {/* Commission Routes */}
      <Route
        path="/commission"
        element={
          <ProtectedRoute>
            <CoordinatorApprovals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/commission/approvals/:id"
        element={
          <ProtectedRoute>
            <SolicitationValidation />
          </ProtectedRoute>
        }
      />

      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/groups"
        element={
          <ProtectedRoute>
            <MyGroups />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/group-roles/:groupId"
        element={
          <ProtectedRoute>
            <GroupMemberRoles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/opportunities"
        element={
          <ProtectedRoute>
            <TeacherOpportunities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/profile"
        element={
          <ProtectedRoute>
            <TeacherProfile />
          </ProtectedRoute>
        }
      />

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
        <OpportunitiesProvider>
          <StudentGroupsProvider>
            <SolicitationsProvider>
              <CommissionProvider>
                <BrowserRouter>
                  <AuthProvider>
                    <AppWithAlerts />
                  </AuthProvider>
                </BrowserRouter>
              </CommissionProvider>
            </SolicitationsProvider>
          </StudentGroupsProvider>
        </OpportunitiesProvider>
      </AlertProvider>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
