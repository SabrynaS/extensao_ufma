import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  breadcrumb: string[];
}

export function AppHeader({ breadcrumb }: AppHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNotifications = () => {
    navigate('/notifications');
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumb.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-muted-foreground">{'>'}</span>}
            <span className={index === breadcrumb.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {item}
            </span>
          </span>
        ))}
      </nav>

      {/* User section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleNotifications}
          className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
            2
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto py-1.5">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.course}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover">
            <DropdownMenuItem onClick={() => navigate(user?.role === 'coordinator' ? '/coordinator' : '/student/profile')}>
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
