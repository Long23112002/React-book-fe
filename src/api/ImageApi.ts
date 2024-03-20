import { endpointBE } from "../layouts/utils/Constant";
import ImageModel from "../model/ImageModel";
import { request } from "./Request";

async function getBookImage(endpoint: string): Promise<ImageModel[]> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response._embedded.images.map((imageData: any) => ({
      ...imageData,
   }));
}

export async function getAllImageByBook(idBook: number): Promise<ImageModel[]> {
   // Xác định endpoint
   const endpoint: string = endpointBE + `/books/${idBook}/listImages`;

   return getBookImage(endpoint);
}