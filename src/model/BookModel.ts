import GenreModel from "./GenreModel";

class BookModel {
   id?: any;
   idBook: number;
   nameBook?: string; // Có thể NULL
   author?: string;
   isbn?: string;
   description?: string;
   listPrice: number;
   sellPrice: number;
   quantity?: number;
   avgRating?: number;
   soldQuantity?: number;
   discountPercent?: number;
   thumbnail?: string;
   relatedImg?: string[];
   idGenres?: number[];
   genresList?: GenreModel[];
   isFavorited?: boolean;

   constructor(idBook: number, nameBook: string, author: string, isbn: string, description: string, listPrice: number, sellPrice: number, quantity: number, avgRating: number, soldQuantity: number, discountPercent: number, thumbnail: string) {
      this.idBook = idBook;
      this.nameBook = nameBook;
      this.author = author;
      this.isbn = isbn;
      this.description = description;
      this.listPrice = listPrice;
      this.sellPrice = sellPrice;
      this.quantity = quantity;
      this.avgRating = avgRating;
      this.soldQuantity = soldQuantity;
      this.discountPercent = discountPercent;
      this.thumbnail = thumbnail;
   }
}

export default BookModel;