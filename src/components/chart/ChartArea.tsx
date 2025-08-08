"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Static month list
const months = [
  "January", "Feburary", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

// Dummy data
const allChartData = years.flatMap((year) =>
  months.map((month, idx) => ({
    year,
    month,
    monthIndex: idx,
    expense: Math.floor(Math.random() * 300 + 100),
    products: Math.floor(Math.random() * 200 + 50),
    disabled: year === currentYear && idx > currentMonthIndex,
  }))
);

export default function ChartArea() {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("All");

  const monthOptions = [
    { name: "All", disabled: false },
    ...months.map((month, idx) => ({
      name: month,
      disabled: selectedYear === currentYear && idx > currentMonthIndex,
    })),
  ];

  const filteredData = allChartData.filter((item) => {
    if (item.year !== selectedYear) return false;
    if (selectedMonth === "All") {
      return selectedYear === currentYear
        ? item.monthIndex <= currentMonthIndex
        : true;
    }
    return item.month === selectedMonth;
  });

  //  Custom rotated tick renderer for month names
  const renderRotatedTick = ({ x, y, payload }: any) => (
    <text
      x={x}
      y={y + 10}
      textAnchor="end"
      transform={`rotate(-35, ${x}, ${y})`}
      fontSize="12"
      fill="#4B5563"
    >
      {payload.value}
    </text>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Expense vs Products Overview</CardTitle>

          <div className="flex gap-4">
            {/* Year Filter */}
            <div className="flex flex-col w-[160px]">
              <Label className="text-xs text-muted-foreground mb-1">Year</Label>
              <Select
                value={selectedYear.toString()}
                onValueChange={(val) => setSelectedYear(parseInt(val))}
              >
                <SelectTrigger className="h-9 text-sm w-full">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Month Filter */}
            <div className="flex flex-col w-[160px]">
              <Label className="text-xs text-muted-foreground mb-1">Month</Label>
              <Select
                value={selectedMonth}
                onValueChange={(val) => setSelectedMonth(val)}
              >
                <SelectTrigger className="h-9 text-sm w-full">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto w-full">
                  {monthOptions.map(({ name, disabled }) => (
                    <SelectItem
                      key={name}
                      value={name}
                      disabled={disabled}
                      className={cn(disabled && "opacity-50 cursor-not-allowed")}
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 30, bottom: 20, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              height={60}
              interval={0}
              tick={renderRotatedTick} // ✅ Apply custom rotated labels
            />
            <Tooltip />
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fill="url(#colorExpense)"
            />
            <Area
              type="monotone"
              dataKey="products"
              stroke="#3b82f6"
              fill="url(#colorProducts)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
