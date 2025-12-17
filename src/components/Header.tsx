import { Button } from "@/components/ui/button";
import { GraduationCap, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleNavLogin() {
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Extensão UFMA</span>
            <span className="text-xs text-muted-foreground">Sistema de Extensão</span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="opportunities"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Oportunidades
          </a>
          <a
            href="help"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Ajuda
          </a>
          <a
            href="certificate/validate"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Certificados
          </a>
        </nav>

        <div className="hidden md:block">
          <Button variant="hero" size="default" onClick={handleNavLogin}>
            <LogIn className="h-4 w-4" />
            Entrar
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <a
              href="opportunities"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Oportunidades
            </a>
            <a
              href="help"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ajuda
            </a>
            <a
              href="certificate/validate"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Certificados
            </a>
            <a href="login" className="w-full">
              <LogIn className="h-4 w-4" />
              Entrar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
