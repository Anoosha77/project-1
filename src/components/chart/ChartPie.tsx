"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Food", value: 200 },
  { name: "Books", value: 100 },
];

const COLORS = ["#3b82f6", "#10b981", "#facc15", "#f43f5e"];

export default function ChartPie() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const highlightedData = pieData.map((item) => ({
    ...item,
    isDimmed: selectedCategory !== "All" && item.name !== selectedCategory,
  }));

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <CardTitle className="text-base font-semibold text-gray-800 dark:text-white">
            Product Categories {selectedCategory !== "All" && `- ${selectedCategory}`}
          </CardTitle>

          <div className="w-full sm:w-auto flex flex-col">
            <Label className="text-xs text-muted-foreground mb-1">
              Filter by Category
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-8 text-xs w-full sm:min-w-[140px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {pieData.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[300px] pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={highlightedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {highlightedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={entry.isDimmed ? 0.3 : 1}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `Rs. ${value}`} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
