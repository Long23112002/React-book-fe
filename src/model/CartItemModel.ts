import BookModel from "./BookModel";

class CartItemModel {
   idCart?: any;
   quantity: number;
   book: BookModel;
   idUser?: number;
   review?: boolean;

   constructor(quantity: number, book: BookModel) {
      this.quantity = quantity;
      this.book = book;
   }
}

export default CartItemModel;