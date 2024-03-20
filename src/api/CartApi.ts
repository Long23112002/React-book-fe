import { endpointBE } from "../layouts/utils/Constant";
import { getIdUserByToken } from "../layouts/utils/JwtService";
import CartItemModel from "../model/CartItemModel";
import { getBookByIdCartItem } from "./BookApi";
import { request } from "./Request";

export async function getCartAllByIdUser(): Promise<CartItemModel[]> {
   const idUser = getIdUserByToken();
   const endpoint = endpointBE + `/users/${idUser}/listCartItems`;
   try {
      const cartResponse = await request(endpoint);

      if (cartResponse) {
         const cartsResponseList: CartItemModel[] = await Promise.all(cartResponse._embedded.cartItems.map(async (item: any) => {
            const bookResponse = await getBookByIdCartItem(item.idCart);
            return { ...item, book: bookResponse };
         }));
         return cartsResponseList;
      }
   } catch (error) {
      console.error('Error: ', error);
   }
   return [];
}