export interface Expenses {
    id: string, 
    userId: string, 
    amount: number,
     description: string, 
     deleted: boolean, 
     createdAt: string
}
export interface expenseInputData {
    amount: number;
    description: string;
}
 export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  user_id: string;
  deleted_id?: string | null;
  created_at: string;
}
