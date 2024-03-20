import { isTokenExpired } from "../layouts/utils/JwtService";

export async function request(endpoint: string) {
   // Truy cập đến đường dẫn
   const response = await fetch(endpoint);

   // Thất bại
   if (!response.ok) {
      throw new Error(`Không thể truy cập ${endpoint}`);
   }

   // Thành công
   return response.json();
}

export async function requestAdmin(endpoint: string) {
   const token = localStorage.getItem("token");

   if (!token) {
      return;
   }
   if (!isTokenExpired(token)) {
      return;
   }
   // Truy cập đến đường dẫn
   const response = await fetch(endpoint, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   // Thất bại
   if (!response.ok) {
      throw new Error(`Không thể truy cập ${endpoint}`);
   }

   // Thành công
   return response.json();
}