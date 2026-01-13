import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.25),transparent_50%)]" />
      <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/30 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full px-4 py-2 text-sm hover:opacity-80 transition-all">
            <Sparkles className="h-4 w-4 text-primary font-bold" />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-bold">Bem-vindo ao portal de extensão</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 animate-fade-in text-5xl font-black tracking-tighter text-foreground [animation-delay:100ms] sm:text-6xl lg:text-7xl">
            <span className="block">Sistema de</span>
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent animate-pulse drop-shadow-lg">
              Extensão UFMA
            </span>
          </h1>

          {/* Description */}
          <p className="mb-12 animate-fade-in text-lg text-foreground/80 [animation-delay:200ms] sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Conectando a universidade à comunidade através de projetos, cursos e ações
            extensionistas que <span className="text-lg ">transformam realidades</span> e constroem um futuro melhor.
          </p>

          {/* CTA Button */}
          <div className="flex animate-fade-in flex-col items-center justify-center gap-4 [animation-delay:300ms] sm:flex-row mb-16">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate("/opportunities")}
              className="group"
            >
              Explorar Oportunidades
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in [animation-delay:400ms]">
            <div className="relative overflow-hidden rounded-xl border-2 border-primary/40 bg-primary/10 p-6 backdrop-blur-sm hover:border-primary hover:bg-primary/20 transition-all duration-300 group shadow-lg hover:shadow-primary/20 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-lg bg-primary/40 flex items-center justify-center mb-4 group-hover:bg-primary/50 transition-colors shadow-md">
                  <BookOpen className="h-6 w-6 text-primary-foreground font-bold" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">150+</h3>
                <p className="text-sm text-foreground/80 font-medium">Oportunidades Ativas</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border-2 border-primary/40 bg-primary/10 p-6 backdrop-blur-sm hover:border-primary hover:bg-primary/20 transition-all duration-300 group shadow-lg hover:shadow-primary/20 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-lg bg-primary/40 flex items-center justify-center mb-4 group-hover:bg-primary/50 transition-colors shadow-md">
                  <Users className="h-6 w-6 text-primary-foreground font-bold" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">5000+</h3>
                <p className="text-sm text-foreground/80 font-medium">Estudantes Participando</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border-2 border-primary/40 bg-primary/10 p-6 backdrop-blur-sm hover:border-primary hover:bg-primary/20 transition-all duration-300 group shadow-lg hover:shadow-primary/20 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-lg bg-primary/40 flex items-center justify-center mb-4 group-hover:bg-primary/50 transition-colors shadow-md">
                  <Award className="h-6 w-6 text-primary-foreground font-bold" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">2000+</h3>
                <p className="text-sm text-foreground/80 font-medium">Certificados Emitidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
