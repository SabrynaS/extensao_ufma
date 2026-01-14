import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  accentColor?: "primary" | "accent" | "secondary";
  delay?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href, 
  accentColor = "primary",
  delay = 0,
}: FeatureCardProps) {
  const colorClasses = {
    primary: "bg-primary/60 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    accent: "bg-accent/90 text-accent-foreground group-hover:bg-accent group-hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground",
  };
  console.log("teste", href);
  return (
    <a
      href={href}
      className="group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
        <div
          className={cn(
            "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300",
            colorClasses[accentColor]
          )}
        >
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-card-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </a>
  );
};
