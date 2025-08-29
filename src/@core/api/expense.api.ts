// src/@core/api/expense.api.ts
import { axiosInstanceAdmin, axiosInstanceUser } from "../instances/instances";

export interface ExpenseData {
  amount: number;
  description: string;
}

export const getExpenses = async (page: number, limit: number) => {
  const res = await axiosInstanceUser.get(`/my-expenses?page=${page}&limit=${limit}`);
  return res.data;
};

export const addExpense = (data: ExpenseData) => {
  return axiosInstanceUser.post("/create-expense", data);
};

export const updateExpense = (id: string, data: ExpenseData) => {
  return axiosInstanceUser.put(`/update-expense/${id}`, data);
};

export const deleteExpense = (id: string) => {
  return axiosInstanceUser.post(`/delete-expense/${id}`);
};

export const getAdminExpenses = async (page: number, limit: number) => {
  const res = await axiosInstanceAdmin.get(`/expenses?page=${page}&limit=${limit}`);
  return res.data;
};
