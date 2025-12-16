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

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
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
              to={user?.role === "coordinator" ? "/coordinator" : "/student"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/sign-up" element={<SignUp />} />

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
        path="/student/certificates"
        element={
          <ProtectedRoute>
            <StudentCertificates />
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
        path="/coordinator/students"
        element={
          <ProtectedRoute>
            <CoordinatorStudents />
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

      {/* Events Routes - Accessible by students and student leaders */}
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
