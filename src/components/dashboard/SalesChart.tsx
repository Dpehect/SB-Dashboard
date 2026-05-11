"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { salesData } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/40 p-4 shadow-xl">
        <p className="text-[10px] font-bold text-apple-gray uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-extrabold text-secondary-grey-900 dark:text-white">
          {`₺${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};

export function SalesChart() {
  return (
    <Card className="p-8">
      <div className="mb-8">
        <h3 className="visionary-title text-xl">Satış Performansı</h3>
        <p className="visionary-alt">Son 7 günlük gelir analizi</p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8E8E93', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#007AFF', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#007AFF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
