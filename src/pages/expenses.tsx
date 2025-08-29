// src/pages/Expense.tsx
import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Expenses, expenseInputData } from "@/@core/types/interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getAdminExpenses,
} from "../@core/api/expense.api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ExpensesResponse = {
  expenses: Expenses[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const Expense: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const role = useUserStore((state) => state.user.role);
  const queryClient = useQueryClient();

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const limit = 3;

  // forms
  const { register, handleSubmit, reset } = useForm<expenseInputData>();
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
  } = useForm<expenseInputData>();

  const [loading, setLoading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expenses | null>(null);

  // queries
  const { data: userData, isLoading } = useQuery<ExpensesResponse>({
    queryKey: ["expenses", page, limit],
    queryFn: () => getExpenses(page, limit),
    enabled: role === "user",
    placeholderData: (prev) => prev,
  });

  const { data: adminData, isLoading: adminLoading } =
    useQuery<ExpensesResponse>({
      queryKey: ["adminExpenses", page, limit],
      queryFn: () => getAdminExpenses(page, limit),
      enabled: role === "admin",
      placeholderData: (prev) => prev,
    });

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [page, navigate]);

  const expenses =
    role === "admin" ? adminData?.expenses || [] : userData?.expenses || [];
  const totalPages =
    role === "admin"
      ? adminData?.pagination.totalPages || 1
      : userData?.pagination.totalPages || 1;

  // -------------------- Add Expense -------------------
  const openAddModal = () => {
    reset();
    setIsAddOpen(true);
  };

  const handleAddExpense = async (data: expenseInputData) => {
    try {
      setLoading(true);
      await addExpense({ ...data, amount: Number(data.amount) });
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
      await queryClient.invalidateQueries({ queryKey: ["adminExpenses"] });
      setIsAddOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Edit Expense -------------------
  const openEditModal = (expense: Expenses) => {
    setEditingExpense(expense);
    resetEdit({ amount: expense.amount, description: expense.description });
    setIsEditOpen(true);
  };

  const handleEditExpense = async (data: expenseInputData) => {
    if (!editingExpense) return;
    try {
      setLoading(true);
      await updateExpense(editingExpense.id, {
        ...data,
        amount: Number(data.amount),
      });
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
      await queryClient.invalidateQueries({ queryKey: ["adminExpenses"] });
      setIsEditOpen(false);
      setEditingExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Delete Expense -------------------
  const handleDeleteExpense = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      setLoading(true);
      await deleteExpense(id);
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
      await queryClient.invalidateQueries({ queryKey: ["adminExpenses"] });
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Pagination Helper -------------------
  const renderPagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      // show all if 4 or fewer pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }

    return pages.map((p, idx) => (
      <PaginationItem key={idx}>
        {p === "..." ? (
          <span className="px-3 text-gray-400">...</span>
        ) : (
          <PaginationLink
            href="#"
            isActive={page === p}
            onClick={(e) => {
              e.preventDefault();
              setPage(Number(p));
            }}
          >
            {p}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  // -------------------- Render -------------------
  return (
    <div className="p-6 space-y-6 font-sans bg-[#121212] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="w-5 h-5 text-[#00E5FF]" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-[#00E5FF]">
          Expenses
        </h1>
      </div>

      <Button
        onClick={openAddModal}
        className="text-sm text-black bg-[#00E5FF] hover:bg-cyan-400 rounded-md w-[140px] h-[35px]"
      >
        Add Expense
      </Button>

      {/* Table */}
      <table className="w-full mt-4 border-collapse text-left bg-[#1E1E1E] border border-gray-700 rounded-lg">
        <thead className="bg-[#2A2A2A]">
          <tr>
            <th className="p-2 text-white border-b border-gray-600">#</th>
            <th className="p-2 text-white border-b border-gray-600">Amount</th>
            <th className="p-2 text-white border-b border-gray-600">
              Description
            </th>
            <th className="p-2 text-white border-b border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || adminLoading ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-white">
                Loading...
              </td>
            </tr>
          ) : expenses.length ? (
            expenses.map((exp, index) => (
              <tr key={exp.id} className="hover:bg-[#2A2A2A] transition-all">
                {/* Row Number reset each page */}
                <td className="p-2 text-white border-b border-gray-600">
                  {index + 1}
                </td>

                {/* Expense Amount */}
                <td className="p-2 text-white border-b border-gray-600">
                  {exp.amount}
                </td>

                {/* Expense Description */}
                <td className="p-2 text-white border-b border-gray-600">
                  {exp.description}
                </td>

                {/* Actions */}
                <td className="p-2 text-white border-b border-gray-600 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-500 text-white hover:border-[#00E5FF] hover:text-[#00E5FF]"
                    onClick={() => openEditModal(exp)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-500"
                    onClick={() => handleDeleteExpense(exp.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-white">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
                className={page === 1 ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
            {renderPagination()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
                className={
                  page === totalPages ? "opacity-50 pointer-events-none" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* ---------------- Add Expense Modal ---------------- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAddExpense)} className="space-y-4">
            <input
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ---------------- Edit Expense Modal ---------------- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmitEdit(handleEditExpense)}
            className="space-y-4"
          >
            <input
              type="number"
              placeholder="Amount"
              {...registerEdit("amount", { required: true })}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Description"
              {...registerEdit("description", { required: true })}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expense;
