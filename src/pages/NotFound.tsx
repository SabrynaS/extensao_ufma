import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GraduationCap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Logo */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Extensão UFMA</h1>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Voltar para Início
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
