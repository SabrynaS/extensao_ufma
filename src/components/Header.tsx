import { Button } from "@/components/ui/button";
import { GraduationCap, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavHome() {
    navigate("/");
  }

  function handleNavLogin() {
    navigate("/login");
  }

  function handleNavOpportunities() {
    navigate("/opportunities");
  }

  function handleNavHelp() {
    navigate("/help");
  }

  function handleNavCertificates() {
    navigate("/certificate/validate");
  }

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium transition-colors cursor-pointer px-3 py-2 rounded-md ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;
  };

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
          <button
            onClick={handleNavHome}
            className={getNavLinkClass("/")}
          >
            Início
          </button>
          <button
            onClick={handleNavOpportunities}
            className={getNavLinkClass("/opportunities")}
          >
            Oportunidades
          </button>
          <button
            onClick={handleNavHelp}
            className={getNavLinkClass("/help")}
          >
            Ajuda
          </button>
          <button
            onClick={handleNavCertificates}
            className={getNavLinkClass("/certificate/validate")}
          >
            Certificados
          </button>
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
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            <button
              onClick={handleNavHome}
              className={`text-sm font-medium transition-colors cursor-pointer px-3 py-2 rounded-md text-left ${
                location.pathname === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Início
            </button>
            <button
              onClick={handleNavOpportunities}
              className={`text-sm font-medium transition-colors cursor-pointer px-3 py-2 rounded-md text-left ${
                location.pathname === "/opportunities"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Oportunidades
            </button>
            <button
              onClick={handleNavHelp}
              className={`text-sm font-medium transition-colors cursor-pointer px-3 py-2 rounded-md text-left ${
                location.pathname === "/help"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Ajuda
            </button>
            <button
              onClick={handleNavCertificates}
              className={`text-sm font-medium transition-colors cursor-pointer px-3 py-2 rounded-md text-left ${
                location.pathname === "/certificate/validate"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Certificados
            </button>
            <button
              onClick={handleNavLogin}
              className="w-full flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer px-3 py-2"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
