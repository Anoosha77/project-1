// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

// export const useChangePassword = () => {
//   return useMutation({
//     mutationFn: async (data: { oldPassword: string; newPassword: string }) => {
//       const token = localStorage.getItem("token"); // or however you're storing JWT
//       const res = await axios.post(
//         "http://localhost:4000/api/v1/auth/change-password",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res.data;
//     },
//   });
// };
