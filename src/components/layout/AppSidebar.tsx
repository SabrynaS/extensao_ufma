import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Search,
  Award,
  User,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  CalendarIcon,
  Network,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {NavLink} from "@/components/NavLink";

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

const studentScholarNavItems: NavItem[] = [
  { title: "Visão Geral", icon: LayoutDashboard, path: "/student" },
  { title: "Minhas Solicitações", icon: FileText, path: "/student/requests" },
  { title: "Oportunidades", icon: Search, path: "/events" },
  { title: "Criar Evento", icon: CalendarIcon, path: "/events/create" },
  { title: "Meus Certificados", icon: Award, path: "/student/certificates" },
  { title: "Perfil", icon: User, path: "/student/profile" },
];

const studentNavItems: NavItem[] = [
  { title: "Visão Geral", icon: LayoutDashboard, path: "/student" },
  { title: "Minhas Solicitações", icon: FileText, path: "/student/requests" },
  { title: "Oportunidades", icon: Search, path: "/events" },
  { title: "Meus Certificados", icon: Award, path: "/student/certificates" },
  { title: "Perfil", icon: User, path: "/student/profile" },
];



const coordinatorNavItems: NavItem[] = [
  { title: "Painel Geral", icon: LayoutDashboard, path: "/coordinator" },
  {
    title: "Solicitações de Validação",
    icon: ClipboardList,
    path: "/coordinator/approvals",
  },
  { title: "Gerenciar Comissão", icon: Users, path: "/coordinator/commission" },
  { title: "Gerenciar Alunos", icon: Users, path: "/coordinator/students" },
  { title: "Gerenciar Grupos", icon: Network, path: "/coordinator/groups" },
  {
    title: "Gerenciar Oportunidades",
    icon: Search,
    path: "/coordinator/opportunities",
  },
  {
    title: "Configurações do Curso",
    icon: Settings,
    path: "/coordinator/settings",
  },
  {
    title: "Central de Alertas",
    icon: Bell,
    path: "/coordinator/alerts",
    badge: 1,
  },
];

const teacherNavItems: NavItem[] = [
  { title: 'Painel Geral', icon: LayoutDashboard, path: '/teacher' },
  { title: 'Meus Grupos', icon: Users, path: '/teacher/groups' },
  { title: 'Minhas Oportunidades', icon: Search, path: '/teacher/opportunities' },
  { title: 'Perfil', icon: User, path: '/teacher/profile' },
];

// Novos itens do admin
const adminNavItems: NavItem[] = [
  { title: "Gestão de Usuários", icon: Users, path: "/admin/users" },
];

const roleConfig = {
  coordinator: {
    navItems: coordinatorNavItems,
    panelTitle: "Painel da Coordenação",
  },

  coordenador: {
    navItems: coordinatorNavItems,
    panelTitle: "Painel da Coordenação",
  },

  secretary: {
    navItems: coordinatorNavItems,
    panelTitle: "Painel da Secretaria",
  },

  secretaria: {
    navItems: coordinatorNavItems,
    panelTitle: "Painel da Secretaria",
  },

  teacher: {
    navItems: teacherNavItems,
    panelTitle: "Painel do Docente",
  },

  docente: {
    navItems: teacherNavItems,
    panelTitle: "Painel do Docente",
  },

  student: {
    navItems: studentNavItems,
    panelTitle: "Painel do Discente",
  },

  discente: {
    navItems: studentNavItems,
    panelTitle: "Painel do Discente",
  },

  student_scholar: {
    navItems: studentScholarNavItems,
    panelTitle: "Painel do Discente",
  },

  admin: {
    navItems: adminNavItems,
    panelTitle: "Painel do Administrador",
  },
} as const;

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const role = (user?.role ?? "student") as keyof typeof roleConfig;

  const { navItems, panelTitle } = roleConfig[role] ?? roleConfig.student;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <img src="/logoUfma.png" alt="Logo UFMA" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Extensão UFMA</h1>
            <p className="text-xs text-sidebar-foreground/70">{panelTitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                console.log("Navigating to:", item.path);
                navigate(item.path);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
