import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 ml-1 text-sm font-bold text-secondary-grey-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "flex w-full rounded-2xl bg-main-bg px-4 py-4 text-sm font-medium text-secondary-grey-700 outline-none transition-all duration-200 border border-transparent focus:border-brand-500 focus:shadow-[0px_0px_0px_4px_rgba(67,24,255,0.1)] appearance-none cursor-pointer",
            error && "border-error focus:border-error focus:shadow-[0px_0px_0px_4px_rgba(238,93,80,0.1)]",
            className
          )}
          {...props}
        >
          <option value="" disabled>Seçiniz</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 ml-1 text-xs font-medium text-error">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
