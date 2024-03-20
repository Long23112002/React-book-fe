import { endpointBE } from "../layouts/utils/Constant";
import ReviewModel from "../model/ReviewModel";
import { request, requestAdmin } from "./Request";

async function getReview(endpoint: string): Promise<ReviewModel[]> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response._embedded.reviews.map((reviewData: any) => ({
      ...reviewData,
   }));
}

export async function getAllReview(idBook: number): Promise<ReviewModel[]> {
   // Xác định endpoint
   const endpoint: string = endpointBE + `/books/${idBook}/listReviews`;

   return getReview(endpoint);
}

export async function getTotalNumberOfReviews(): Promise<number> {
   const endpoint = endpointBE + "/reviews/search/countBy";
   try {
      const response = await requestAdmin(endpoint);
      if (response) {
         return response;
      }
   } catch (error) {
      throw new Error("Lỗi không gọi được endpoint lấy tổng review\n" + error);
   }
   return 0;
}