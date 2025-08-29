import { useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
} from "@/@core/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function CategoryManagement() {
  const queryClient = useQueryClient();

  const [newCategory, setNewCategory] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<any | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  // ---------------- FETCH CATEGORIES ----------------
  const {
    data: categories = [],
    isLoading: loadingCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // ---------------- MUTATIONS ----------------
  const addCategory = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNewCategory("");
      setIsAddOpen(false);
    },
  });

  const editCategoryMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsEditOpen(false);
      setEditCategory(null);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // ---------------- FETCH PRODUCTS PER CATEGORY ----------------
  const {
    data: products = [],
    isLoading: loadingProducts,
  } = useQuery({
    queryKey: ["products", expandedCategory],
    queryFn: () =>
      expandedCategory ? getProductsByCategory(expandedCategory.toString()) : [],
    enabled: !!expandedCategory, // only fetch when expanded
  });

  // ---------------- HANDLERS ----------------
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    addCategory.mutate(newCategory);
  };

  const handleUpdateCategory = () => {
    if (!editCategory?.id || !editCategory?.name.trim()) return;
    editCategoryMutation.mutate({ id: editCategory.id, name: editCategory.name });
  };

  const handleDeleteCategory = (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    deleteCategoryMutation.mutate(id);
  };

  const handleToggleProducts = (categoryId: number) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null); // close
    } else {
      setExpandedCategory(categoryId); // expand + fetch via React Query
    }
  };

  return (
    <div className="p-6 space-y-6 font-sans bg-[#121212] min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-bold tracking-tight text-[#00E5FF]">
        Categories
      </h1>
      <p className="text-gray-400">Manage all your categories here.</p>

      {/* Add Category Button */}
      <Button
        onClick={() => setIsAddOpen(true)}
        className="text-sm text-black rounded-md flex justify-center items-center bg-[#00E5FF] w-[160px] h-[35px] cursor-pointer hover:bg-cyan-400"
      >
        Add Category
      </Button>

      {/* Add Category Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px] w-full bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#00E5FF]">
              Create New Category
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border border-gray-600 p-2 rounded w-full bg-[#2A2A2A] text-white"
            />
            <DialogFooter>
              <Button
                onClick={handleAddCategory}
                className="w-full bg-[#00E5FF] hover:bg-cyan-400 text-black"
                disabled={addCategory.isPending}
              >
                {addCategory.isPending ? "Creating..." : "Create Category"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px] w-full bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#00E5FF]">Update Category</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Category Name"
              value={editCategory?.name || ""}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
              className="border border-gray-600 p-2 rounded w-full bg-[#2A2A2A] text-white"
            />
            <DialogFooter>
              <Button
                onClick={handleUpdateCategory}
                className="w-full bg-[#00E5FF] hover:bg-cyan-400 text-black"
                disabled={editCategoryMutation.isPending}
              >
                {editCategoryMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Categories Table */}
      <table className="w-full border-collapse text-left bg-[#1E1E1E] border border-gray-700 rounded-lg mt-4">
        <thead className="bg-[#2A2A2A]">
          <tr>
            <th className="p-2 border-b border-gray-600 text-white">#</th>
            <th className="p-2 border-b border-gray-600 text-white">Category</th>
            <th className="p-2 border-b border-gray-600 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loadingCategories ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-white">
                Loading categories...
              </td>
            </tr>
          ) : categories.length ? (
            categories.map((cat: any, index: number) => (
              <>
                <tr
                  key={cat.id}
                  className="hover:bg-[#2A2A2A] transition-all"
                >
                  <td className="p-2 border-b border-gray-600 text-white">
                    {index + 1}
                  </td>
                  <td className="p-2 border-b border-gray-600 text-white">
                    {cat.name}
                  </td>
                  <td className="p-2 border-b border-gray-600 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-500 text-white hover:border-[#00E5FF] hover:text-[#00E5FF]"
                      onClick={() => {
                        setEditCategory(cat);
                        setIsEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-500 text-white"
                      onClick={() => handleDeleteCategory(cat.id)}
                      disabled={deleteCategoryMutation.isPending}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#00E5FF] hover:bg-cyan-400 text-black"
                      onClick={() => handleToggleProducts(cat.id)}
                    >
                      {expandedCategory === cat.id ? "Hide Products" : "View Products"}
                    </Button>
                  </td>
                </tr>

                {/* Expanded Products Row */}
                {expandedCategory === cat.id && (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-4 border-b border-gray-600 bg-[#181818] text-white"
                    >
                      {loadingProducts ? (
                        <p>Loading products...</p>
                      ) : products.length ? (
                        <ul className="space-y-2">
                          {products.map((prod: any) => (
                            <li
                              key={prod.id}
                              className="border p-2 rounded bg-[#2A2A2A]"
                            >
                              <span className="font-semibold">{prod.name}</span>{" "}
                              — ${prod.price}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No products found for this category.</p>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4 text-white">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
