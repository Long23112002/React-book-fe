class GenreModel {
   id?: number;
   idGenre: number;
   nameGenre: string;

   constructor(idGenre: number, nameGenre: string) {
      this.idGenre = idGenre;
      this.nameGenre = nameGenre;
   }
}

export default GenreModel;