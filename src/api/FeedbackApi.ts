import { endpointBE } from "../layouts/utils/Constant";
import FeedbackModel from "../model/FeedbackModel";
import { requestAdmin } from "./Request";

export async function getAllFeedback(): Promise<FeedbackModel[]> {
   const endpoint = endpointBE + "/feedbacks?sort=idFeedback,desc";
   const response = await requestAdmin(endpoint);

   let feedbacks: FeedbackModel[] = [];

   if (response) {
      feedbacks = await response._embedded.feedbackses.map((feedbackData: any) => ({
         ...feedbackData,
         user: feedbackData._embedded.user.username,
      }))
   }

   return feedbacks;
}
export async function getTotalNumberOfFeedbacks(): Promise<number> {
   const endpoint = endpointBE + "/feedbacks/search/countBy";
   try {
      const response = await requestAdmin(endpoint);
      if (response) {
         return response;
      }
   } catch (error) {
      throw new Error("Lỗi không gọi được endpoint lấy tổng feedback\n" + error);
   }
   return 0;
}