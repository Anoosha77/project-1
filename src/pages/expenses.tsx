import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import CustomTable from "@/components/CustomTable";
import AddEntryDialog from "@/components/AddEntryDialog";

const Expense = () => {
  const { toggleSidebar } = useSidebar();
  const [expenses, setExpenses] = useState<any[]>([]);

  const columns = [
    {
      key: "sr",
      label: "Sr.",
      render: (_row: any, index: number) => index + 1,
    },
    { key: "title", label: "Title" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    {
      key: "actions",
      label: "Actions",
      render: (_row: any, index: number) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="cursor-pointer">
            Edit
          </Button>
          <Button size="sm" variant="destructive" className="cursor-pointer">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const fields = [
    { key: "title", label: "Title", required: true },
    { key: "amount", label: "Amount", required: true },
    { key: "category", label: "Category", required: true },
    
    
  ];

  const handleAdd = (data: Record<string, string>) => {
    setExpenses((prev) => [
      ...prev,
      {
        ...data,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="cursor-pointer">
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Expenses</h2>
        </div>
        <AddEntryDialog fields={fields} onSubmit={handleAdd} buttonLabel="Add Expense" />
      </div>
      <CustomTable columns={columns} data={expenses} />
    </div>
  );
};

export default Expense;
