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
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getGraphData } from "@/@core/api/api";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function ChartArea() {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const monthOptions = [
    { name: "All", disabled: false },
    ...months.map((month, idx) => ({
      name: month,
      disabled: selectedYear === currentYear && idx > currentMonthIndex,
    })),
  ];

// inside useEffect
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getGraphData(selectedYear);

      // API raw data
      const rawData = Array.isArray(response.data) ? response.data : [];

      // remove summary row
      const cleaned = rawData.filter((item: any) => item.month);

      // create baseline for all months (0 values)
      const baseline = months.map((month, idx) => ({
        month,
        products: 0,
        expenses: 0,
        monthIndex: idx,
        year: selectedYear,
      }));

      // merge API values into baseline
      const merged = baseline.map((base) => {
        const found = cleaned.find((d: any) => d.month === base.month);
        return found
          ? {
              ...base,
              products: Number(found.products) || 0,
              expenses: Number(found.expenses) || 0,
            }
          : base;
      });

      setChartData(merged);
    } catch (err) {
      console.error("Error fetching graph data:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [selectedYear]);


  // filter data by month
  const filteredData = chartData.filter((item) => {
    if (selectedMonth === "All") {
      return selectedYear === currentYear
        ? item.monthIndex <= currentMonthIndex
        : true;
    }
    return item.month === selectedMonth;
  });

  // rotated labels
  const renderRotatedTick = ({ x, y, payload }: any) => (
    <text
      x={x}
      y={y + 10}
      textAnchor="end"
      transform={`rotate(-35, ${x}, ${y})`}
      fontSize="12"
      fill="#9CA3AF"
    >
      {payload.value}
    </text>
  );

  return (
    <Card className="bg-[#1E1E1E] border border-gray-800 shadow rounded-xl text-white">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-[#00E5FF]">
            Expense vs Products Overview
          </CardTitle>

          <div className="flex gap-4">
            {/* Year Filter */}
            <div className="flex flex-col w-[160px]">
              <Label className="text-xs text-gray-400 mb-1">Year</Label>
              <Select
                value={selectedYear.toString()}
                onValueChange={(val) => setSelectedYear(parseInt(val))}
              >
                <SelectTrigger className="h-9 text-sm w-full bg-[#2A2A2A] border-none text-white focus:ring-[#00E5FF]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="w-full bg-[#1E1E1E] text-white">
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
              <Label className="text-xs text-gray-400 mb-1">Month</Label>
              <Select
                value={selectedMonth}
                onValueChange={(val) => setSelectedMonth(val)}
              >
                <SelectTrigger className="h-9 text-sm w-full bg-[#2A2A2A] border-none text-white focus:ring-[#00E5FF]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto w-full bg-[#1E1E1E] text-white">
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
  {loading ? (
    <div className="flex justify-center items-center h-full">Loading...</div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={filteredData}
        margin={{ top: 10, right: 30, bottom: 20, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
        <XAxis
          dataKey="month"
          height={60}
          interval={0}
          tick={renderRotatedTick}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1E1E1E",
            border: "1px solid #00E5FF",
            color: "#fff",
          }}
        />
        <defs>
          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#ef4444"
          fill="url(#colorExpense)"
        />
        <Area
          type="monotone"
          dataKey="products"
          stroke="#00E5FF"
          fill="url(#colorProducts)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )}
</CardContent>

    </Card>
  );
}
