import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Bem-vindo ao portal de extensão</span>
          </div>

          <h1 className="mb-6 animate-fade-in text-4xl font-extrabold tracking-tight text-foreground [animation-delay:100ms] sm:text-5xl lg:text-6xl">
            Sistema de{" "}
            <span className="text-gradient">Extensão UFMA</span>
          </h1>

          <p className="mb-10 animate-fade-in text-lg text-muted-foreground [animation-delay:200ms] sm:text-xl">
            Conectando a universidade à comunidade através de projetos, cursos e ações
            extensionistas que transformam realidades.
          </p>

          <div className="flex animate-fade-in flex-col items-center justify-center gap-4 [animation-delay:300ms] sm:flex-row">
            <Button variant="hero" size="lg">
              Explorar Oportunidades
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
