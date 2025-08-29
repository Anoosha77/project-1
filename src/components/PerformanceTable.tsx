import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LuArrowDownUp } from "react-icons/lu";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { axiosInstanceAdmin } from "@/@core/instances/instances";

interface PerformanceData {
  uuid: string;
  name: string;
  totalExpenses: number;
  position: number;
  upBy: number;
  downBy: number;
}

const fetchPerformance = async (): Promise<PerformanceData[]> => {
  const { data } = await axiosInstanceAdmin.get("performance");
  return data;
};

export default function PerformanceTable() {
  const { data: performanceData, isLoading, isError, error } = useQuery<PerformanceData[], Error>({
    queryKey: ["performanceData"],
    queryFn: fetchPerformance,
    retry: 1,
  });

  if (isError) {
    return <div className="text-red-400">Error: {error.message}</div>;
  }

  return (
    <div className="border border-gray-800 bg-[#1E1E1E] rounded-xl shadow text-white">
      <Table>
        <TableHeader className="bg-[#2A2A2A]">
          <TableRow>
            <TableHead className="text-gray-300">Sr</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Total Expense</TableHead>
            <TableHead className="flex items-center gap-1 text-gray-300">
              Position <LuArrowDownUp size={16} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            performanceData?.map((data, index) => (
              <TableRow key={data.uuid} className="hover:bg-[#2A2A2A] transition">
                <TableCell className="font-medium text-[#00E5FF]">{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell className="text-gray-400">{data.totalExpenses}</TableCell>
                <TableCell>
                  {data.upBy > 0 ? (
                    <span className="flex text-xs items-center gap-1 text-green-400 font-medium">
                      <FaArrowUp /> +{data.upBy}
                    </span>
                  ) : data.downBy > 0 ? (
                    <span className="flex text-xs items-center gap-1 text-red-400 font-medium">
                      <FaArrowDown /> -{data.downBy}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
