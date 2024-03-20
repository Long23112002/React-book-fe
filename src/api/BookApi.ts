import { endpointBE } from '../layouts/utils/Constant';
import BookModel from '../model/BookModel'
import GenreModel from '../model/GenreModel';
import { getGenreByIdBook } from './GenreApi';
import { getAllImageByBook } from './ImageApi';
import { request, requestAdmin } from './Request';

interface resultInterface { // Tạo ra các biến trả về
   bookList: BookModel[];
   totalPage: number;
   size: number;
}

async function getBook(endpoint: string): Promise<resultInterface> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   // Lấy ra thông tin trang
   const totalPage: number = response.page.totalPages;
   const size: number = response.page.totalElements;

   // Lấy ra danh sách quyển sách
   const bookList: BookModel[] = response._embedded.books.map((bookData: BookModel) => ({
      ...bookData,
   }))

   // Lấy ra ảnh của từng quyển sách
   const bookList1 = await Promise.all(
      bookList.map(async (book: BookModel) => {
         const responseImg = await getAllImageByBook(book.idBook);
         const thumbnail = responseImg.filter(image => image.thumbnail);
         return {
            ...book,
            thumbnail: thumbnail[0].urlImage,
         };
      })
   );

   return { bookList: bookList1, totalPage: totalPage, size: size };
}

export async function getAllBook(size?: number, page?: number): Promise<resultInterface> {
   // Nếu không truyền size thì mặc định là 8
   if (!size) {
      size = 8;
   }

   // Xác định endpoint
   const endpoint: string = endpointBE + `/books?sort=idBook,desc&size=${size}&page=${page}`;

   return getBook(endpoint);
}

export async function getHotBook(): Promise<resultInterface> {
   // Xác định endpoint
   const endpoint: string = endpointBE + "/books?sort=avgRating,desc&size=4";

   return getBook(endpoint);
}

export async function getNewBook(): Promise<resultInterface> {
   // Xác định endpoint
   const endpoint: string = endpointBE + "/books?sort=idBook,desc&size=4";

   return getBook(endpoint);
}

export async function get3BestSellerBooks(): Promise<BookModel[]> {
   const endpoint: string = endpointBE + "/books?sort=soldQuantity,desc&size=3";
   let bookList = await getBook(endpoint);

   // Use Promise.all to wait for all promises in the map to resolve
   let newBookList = await Promise.all(bookList.bookList.map(async (book: any) => {
      // Trả về quyển sách
      const responseImg = await getAllImageByBook(book.idBook);
      const thumbnail = responseImg.find(image => image.thumbnail);

      return {
         ...book,
         thumbnail: thumbnail ? thumbnail.urlImage : null,
      };
   }));

   return newBookList;
}


export async function searchBook(keySearch?: string, idGenre?: number, filter?: number, size?: number, page?: number): Promise<resultInterface> {

   // Nếu key search không undifined
   if (keySearch) {
      keySearch = keySearch.trim();
   }

   const optionsShow = `size=${size}&page=${page}`;

   // Endpoint mặc định
   let endpoint: string = endpointBE + `/books?` + optionsShow;

   let filterEndpoint = '';
   if (filter === 1) {
      filterEndpoint = "sort=nameBook";
   } else if (filter === 2) {
      filterEndpoint = "sort=nameBook,desc";
   } else if (filter === 3) {
      filterEndpoint = "sort=sellPrice";
   } else if (filter === 4) {
      filterEndpoint = "sort=sellPrice,desc";
   } else if (filter === 5) {
      filterEndpoint = "sort=soldQuantity,desc";
   }

   // Nếu có key search và không có lọc thể loại
   if (keySearch !== '') {
      // Mặc đinh nếu không có filter
      endpoint = endpointBE + `/books/search/findByNameBookContaining?nameBook=${keySearch}&` + optionsShow + '&' + filterEndpoint;
   }

   // Nếu idGenre không undifined
   if (idGenre !== undefined) {
      // Nếu có không có key search và có lọc thể loại
      if (keySearch === '' && idGenre > 0) {
         // Mặc định nếu không có filter
         endpoint = endpointBE + `/books/search/findByListGenres_idGenre?idGenre=${idGenre}&` + optionsShow + '&' + filterEndpoint;
      }

      // Nếu có key search và có lọc thể loại
      if (keySearch !== '' && idGenre > 0) {
         endpoint = endpointBE + `/books/search/findByNameBookContainingAndListGenres_idGenre?nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow + '&' + filterEndpoint;
      }

      // Chỉ lọc filter
      if (keySearch === '' && (idGenre === 0 || typeof (idGenre) === 'string')) {
         endpoint = endpointBE + "/books?" + optionsShow + '&' + filterEndpoint;
      }

      // console.log("idGenre: " + typeof (idGenre) + idGenre + ", filter: " + typeof (filter) + filter + ", keySearch" + +typeof (keySearch) + keySearch);
   }

   // console.log(endpoint);

   return getBook(endpoint);
}

// Lấy sách theo id (chỉ lấy thumbnail)
export async function getBookById(idBook: number): Promise<BookModel | null> {
   let bookResponse: BookModel = {
      idBook: 0,
      nameBook: "",
      author: "",
      description: "",
      listPrice: NaN,
      sellPrice: NaN,
      quantity: NaN,
      avgRating: NaN,
      soldQuantity: NaN,
      discountPercent: NaN,
      thumbnail: "",
   }
   const endpoint = endpointBE + `/books/${idBook}`;
   try {
      // Gọi phương thức request()
      const response = await request(endpoint);

      // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
      if (response) {
         bookResponse = response;
         // Trả về quyển sách
         const responseImg = await getAllImageByBook(response.idBook);
         const thumbnail = responseImg.filter(image => image.thumbnail);
         return {
            ...bookResponse,
            thumbnail: thumbnail[0].urlImage,
         };
      } else {
         throw new Error("Sách không tồn tại");
      }

   } catch (error) {
      console.error('Error: ', error);
      return null;
   }
}

export async function getBookByIdCartItem(idCart: number): Promise<BookModel | null> {
   const endpoint = endpointBE + `/cart-items/${idCart}/book`;

   try {
      // Gọi phương thức request()
      const response = await request(endpoint);

      // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
      if (response) {

         // Trả về quyển sách
         return response;
      } else {
         throw new Error("Sách không tồn tại");
      }

   } catch (error) {
      console.error('Error: ', error);
      return null;
   }
}

export async function getTotalNumberOfBooks(): Promise<number> {
   const endpoint = endpointBE + `/book/get-total`;
   try {
      // Gọi phương thức request()
      const response = await requestAdmin(endpoint);
      // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
      if (response) {
         // Trả về số lượng cuốn sách
         return response;
      }
   } catch (error) {
      throw new Error("Lỗi không gọi được endpoint lấy tổng cuốn sách\n" + error);
   }
   return 0;
}

// Lấy sách theo id (lấy thumbnail, ảnh liên quan, thể loại)
export async function getBookByIdAllInformation(idBook: number): Promise<BookModel | null> {
   let bookResponse: BookModel = {
      idBook: 0,
      nameBook: "",
      author: "",
      description: "",
      listPrice: NaN,
      sellPrice: NaN,
      quantity: NaN,
      avgRating: NaN,
      soldQuantity: NaN,
      discountPercent: NaN,
      thumbnail: "",
      relatedImg: [],
      idGenres: [],
      genresList: [],
   }

   try {
      // Gọi phương thức request()
      const response = await getBookById(idBook);

      // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
      if (response) {
         // Lưu dữ liệu sách
         bookResponse = response;

         // Lấy tất cả hình ảnh của sách
         const imagesList = await getAllImageByBook(response.idBook);
         const thumbnail = imagesList.find((image) => image.thumbnail);
         const relatedImg = imagesList.map((image) => {
            // Sử dụng conditional (ternary) để trả về giá trị
            return !image.thumbnail ? image.urlImage || image.dataImage : null;
         }).filter(Boolean); // Loại bỏ các giá trị null



         bookResponse = { ...bookResponse, relatedImg: relatedImg as string[], thumbnail: thumbnail?.urlImage || thumbnail?.dataImage };

         // Lấy tất cả thể loại của sách
         const genresList = await getGenreByIdBook(response.idBook);
         genresList.genreList.forEach((genre) => {
            const dataGenre: GenreModel = { idGenre: genre.idGenre, nameGenre: genre.nameGenre };
            bookResponse = { ...bookResponse, genresList: [...bookResponse.genresList || [], dataGenre] };
         })

         return bookResponse;
      } else {
         throw new Error("Sách không tồn tại");
      }

   } catch (error) {
      console.error('Error: ', error);
      return null;
   }
}