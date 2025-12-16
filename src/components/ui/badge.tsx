import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        active: "border-transparent bg-emerald-500/10 text-emerald-600 font-medium",
        inactive: "border-transparent bg-muted text-muted-foreground font-medium",
        diretor: "border bg-primary/10 text-primary border-primary/20 font-semibold",
        vice: "border bg-green-600/10 text-green-600 border-green-600/20 font-semibold",
        tesoureiro: "border bg-amber-500/10 text-amber-600 border-amber-500/20 font-semibold",
        membro: "border bg-muted text-muted-foreground border-border",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
