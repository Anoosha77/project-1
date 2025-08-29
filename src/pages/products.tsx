import { useEffect, useState } from "react";
import {
  getCategories,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/@core/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Products() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load Categories
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Load Products of selected category
  const fetchProducts = async (categoryId: string) => {
    try {
      const data = await getProductsByCategory(categoryId);
      setProducts(Array.isArray(data) ? data : data?.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

  // Add Product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !selectedCategory) return;

    await createProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      category_id: selectedCategory,
    });

    setNewProduct({ name: "", price: "" });
    fetchProducts(selectedCategory);
  };

  // Update Product
  const handleUpdateProduct = async () => {
    if (!editProduct?.id || !selectedCategory) return;

    await updateProduct(editProduct.id, {
      name: editProduct.name,
      price: Number(editProduct.price),
      category_id: selectedCategory,
      user_id: 1,
    });

    setEditProduct(null);
    setIsEditDialogOpen(false);
    fetchProducts(selectedCategory);
  };

  // Delete Product
  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    if (selectedCategory) fetchProducts(selectedCategory);
  };

  return (
    <div className="p-6 space-y-6 font-sans bg-[#121212] min-h-screen">
      {/* Heading */}
      
      <h1 className="text-2xl font-bold tracking-tight text-[#00E5FF]">
        Product Management
      </h1>
      <p className="text-gray-400">Manage products under each category.</p>

      {/* Category Selector */}
      <div className="mb-6">
        <select
          className="border border-gray-600 p-2 rounded bg-[#2A2A2A] text-white w-1/6"
          value={selectedCategory ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCategory(value || null);
          }}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="bg-[#1E1E1E]">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Product */}
      {selectedCategory && (
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border border-gray-600 p-2 rounded bg-[#2A2A2A] text-white"
          />
          <Input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border border-gray-600 p-2 rounded bg-[#2A2A2A] text-white"
          />
          <Button
            onClick={handleAddProduct}
            className="text-sm text-black rounded-md flex justify-center items-center bg-[#00E5FF] w-[140px] h-[35px] cursor-pointer hover:bg-cyan-400"
          >
            Add Product
          </Button>
        </div>
      )}

      {/* Product Table */}
      {selectedCategory && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left bg-[#1E1E1E] border border-gray-700 rounded-lg">
            <thead className="bg-[#2A2A2A]">
              <tr>
                <th className="p-2 border-b border-gray-600 text-white">#</th>
                <th className="p-2 border-b border-gray-600 text-white">Name</th>
                <th className="p-2 border-b border-gray-600 text-white">Price</th>
                <th className="p-2 border-b border-gray-600 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products.map((prod, index) => (
                  <tr key={prod.id} className="hover:bg-[#2A2A2A] transition-all">
                    <td className="p-2 border-b border-gray-600 text-white">
                      {index + 1}
                    </td>
                    <td className="p-2 border-b border-gray-600 text-white">
                      {prod.name}
                    </td>
                    <td className="p-2 border-b border-gray-600 text-white">
                      ${prod.price}
                    </td>
                    <td className="p-2 border-b border-gray-600 flex gap-2">
                      {/* Edit */}
                      <Dialog
                        open={isEditDialogOpen && editProduct?.id === prod.id}
                        onOpenChange={setIsEditDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500 text-white hover:border-[#00E5FF] hover:text-[#00E5FF]"
                            onClick={() => {
                              setEditProduct({ ...prod });
                              setIsEditDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-full bg-[#1E1E1E] text-white">
                          <DialogHeader>
                            <DialogTitle className="text-[#00E5FF]">
                              Edit Product
                            </DialogTitle>
                          </DialogHeader>
                          <Input
                            placeholder="Product Name"
                            value={editProduct?.name || ""}
                            onChange={(e) =>
                              setEditProduct({
                                ...editProduct,
                                name: e.target.value,
                              })
                            }
                            className="border border-gray-600 p-2 rounded bg-[#2A2A2A] text-white"
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            value={editProduct?.price || ""}
                            onChange={(e) =>
                              setEditProduct({
                                ...editProduct,
                                price: e.target.value,
                              })
                            }
                            className="border border-gray-600 p-2 rounded bg-[#2A2A2A] text-white"
                          />
                          <Button
                            onClick={handleUpdateProduct}
                            className="w-full bg-[#00E5FF] hover:bg-cyan-400 text-black"
                          >
                            Save
                          </Button>
                        </DialogContent>
                      </Dialog>

                      {/* Delete */}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-500 text-white"
                        onClick={() => handleDeleteProduct(prod.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-4 text-white border-b border-gray-600"
                  >
                    No products found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
