import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-50";
    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      outline: "border border-slate-300 text-slate-900 hover:border-slate-400",
      ghost: "text-slate-600 hover:text-slate-900",
    };
    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button };
