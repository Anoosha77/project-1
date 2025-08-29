import { axiosInstanceAuth } from "../instances/instances";
import { axiosInstanceAdmin } from "../instances/instances";
// import { axiosInstanceUser } from "../instances/instances";


interface LoginData { 
  email: string;
  password?: string;
  otp?: number
}
export const login = (data: LoginData) => {
  return axiosInstanceAuth.post("login", data);
};

export const verifyLoginOtp = async (email: string, otp: string) => {
  return axiosInstanceAuth.post("verify-otp", { email, otp }, { withCredentials: true });
};

export const resendOtp = async (email: string) => {
  return axiosInstanceAuth.post("resend-otp", { email }, );
};

export const getUsers = async () => {
  return (await axiosInstanceAdmin.get("/get-users")).data;
};

export const createUser = async (data: { name: string; email: string; password: string }) => {
  return axiosInstanceAdmin.post("/create-user", data);
};
export const sendEmail = async (data: { userId: string; note: string; title: string }) => {
  return axiosInstanceAdmin.post("/send-email", data, );
};

// ---------- CATEGORY APIs ----------
export const getCategories = async () => {
  try {
    const response = await axiosInstanceAdmin.get('categories');
    return response.data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const createCategory = async (name: string) => {
  try {
    const response = await axiosInstanceAdmin.post('create-category', { name });
    return response.data.category; 
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id: number, name: string) => {
  const res = await axiosInstanceAdmin.put(`update-category/${id}`, { name });
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const res = await axiosInstanceAdmin.post(`delete-category/${id}`);
  return res.data;
};

// ---------- PRODUCT APIs ----------


export const getProductsByCategory = async (categoryId: string) => {
  try {
    const res = await axiosInstanceAdmin.get(`categories/products/${categoryId}`);
    return res.data?.products || res.data?.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const createProduct = async (data: {
  name: string;
  price: number;
  category_id: string;
}) => {
  const res = await axiosInstanceAdmin.post(`create-product`, data);
  console.log(data)
  return res.data;
};

export const updateProduct = async (
  id: number,
  data: { name: string; price: number; category_id: string; user_id: number }
) => {
  const res = await axiosInstanceAdmin.put(`update-product/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axiosInstanceAdmin.post(`delete-product/${id}`);
  return res.data;
};

// ---------- GRAPH DATA API ----------
export const getGraphData = async (year: number) => {
  try {
    const res = await axiosInstanceAdmin.get(`graph-data?year=${year}`);
    return res.data; // assuming API returns { data: [...] }
  } catch (error) {
    console.error("Error fetching graph data:", error);
    return { data: [] };
  }
};
