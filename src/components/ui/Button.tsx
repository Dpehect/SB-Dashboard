import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "none";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-apple-blue text-white hover:opacity-90 active:scale-[0.98] shadow-sm",
      secondary: "bg-apple-gray/10 text-apple-blue hover:bg-apple-gray/20 dark:bg-white/10 dark:text-white",
      ghost: "bg-transparent text-apple-gray hover:bg-apple-gray/5 dark:hover:bg-white/5",
      danger: "bg-error text-white hover:opacity-90",
      success: "bg-success text-white hover:opacity-90",
      none: "",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-[15px]", // ~44px height
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
