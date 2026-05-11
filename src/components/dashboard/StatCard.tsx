import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendType?: "up" | "down";
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendType,
  className 
}: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-3 py-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-apple-blue/5 text-apple-blue dark:bg-white/5 dark:text-white">
          {icon}
        </div>
        {trend && (
            <div className={cn(
              "flex items-center gap-0.5 text-[13px] font-semibold",
              trendType === "up" 
                ? "text-success" 
                : "text-error"
            )}>
              {trendType === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {trend}
            </div>
          )}
      </div>
      <div>
        <p className="visionary-alt">{title}</p>
        <h3 className="visionary-title text-2xl mt-1">{value}</h3>
      </div>
    </Card>
  );
}

