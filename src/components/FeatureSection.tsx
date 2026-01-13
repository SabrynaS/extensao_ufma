import { Briefcase, HelpCircle, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  const navigate = useNavigate();
  const features = [
    {
      icon: Briefcase,
      title: "Oportunidades",
      description:
        "Descubra projetos de extensão, cursos, eventos e ações que conectam você à comunidade.",
      href: "opportunities",
      accentColor: "primary" as const,
    },
    {
      icon: HelpCircle,
      title: "Ajuda",
      description:
        "Encontre respostas para suas dúvidas, tutoriais e suporte para usar o sistema.",
      href: "help",
      accentColor: "accent" as const,
    },
    {
      icon: FileCheck,
      title: "Validar Certificado",
      description:
        "Verifique a autenticidade dos certificados emitidos pelo sistema de extensão.",
      href: "certificate/validate",
      accentColor: "secondary" as const,
    },
  ];

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Acesso Rápido
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Navegue pelas principais funcionalidades do sistema de extensão da
            UFMA
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              accentColor={feature.accentColor}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Papéis Link */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/papeis")}
            className="text-primary font-semibold hover:text-primary/80 transition-colors text-sm"
          >
            Papéis
          </button>
        </div>
      </div>
    </section>
  );
}
