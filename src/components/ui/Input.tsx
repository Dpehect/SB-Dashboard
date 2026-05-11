import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 ml-1 text-sm font-bold text-secondary-grey-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex w-full rounded-2xl bg-main-bg px-4 py-4 text-sm font-medium text-secondary-grey-700 outline-none transition-all duration-200 placeholder:text-secondary-grey-400 border border-transparent focus:border-brand-500 focus:shadow-[0px_0px_0px_4px_rgba(67,24,255,0.1)] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error focus:border-error focus:shadow-[0px_0px_0px_4px_rgba(238,93,80,0.1)]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 ml-1 text-xs font-medium text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
