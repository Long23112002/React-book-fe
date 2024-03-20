import { endpointBE } from "../layouts/utils/Constant";
import GenreModel from "../model/GenreModel";
import { request } from "./Request";

interface resultInterface {
   genreList: GenreModel[];
   genre: GenreModel;
}

async function getGenre(endpoint: string): Promise<resultInterface> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   // Lấy ra danh sách quyển sách
   const genreList: any = response._embedded.genres.map((genreData: any) => ({
      ...genreData,
   }))

   return { genreList: genreList, genre: response.genre };
}

export async function getAllGenres(): Promise<resultInterface> {
   const endpoint = endpointBE + "/genre?sort=idGenre";

   return getGenre(endpoint);
}

export async function get1Genre(idGenre: number): Promise<resultInterface> {
   const endpoint = endpointBE + `/genre/${idGenre}`;
   const response = await request(endpoint);

   return { genre: response, genreList: response };
}

export async function getGenreByIdBook(idBook: number): Promise<resultInterface> {
   const endpoint = endpointBE + `/books/${idBook}/listGenres`;

   return getGenre(endpoint);
}