import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import CustomTable from "@/components/CustomTable";
import AddEntryDialog from "@/components/AddEntryDialog";

const Products = () => {
  const { toggleSidebar } = useSidebar();
  const [products, setProducts] = useState<any[]>([]);

  const columns = [
    {
      key: "sr",
      label: "Sr.",
      render: (_row: any, index: number) => index + 1,
    },
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "type", label: "Type" },
    { key: "createdAt", label: "Created At" },
    { key: "createdBy", label: "Created By" },
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
    { key: "name", label: "Product Name", required: true },
    { key: "category", label: "Category", required: true },
    { key: "type", label: "Type", required: true },
    
  ];

  const handleAdd = (data: Record<string, string>) => {
    setProducts((prev) => [
      ...prev,
      {
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
        createdBy: "You",
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
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
        <AddEntryDialog fields={fields} onSubmit={handleAdd} buttonLabel="Add Product" />
      </div>
      <CustomTable columns={columns} data={products} />
    </div>
  );
};

export default Products;
