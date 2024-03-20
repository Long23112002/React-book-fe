class ReviewModel {
   idReview: number;
   content: string;
   ratingPoint: number;
   timestamp?: string;

   constructor(idReview: number,
      content: string,
      ratingPoint: number,) {
      this.idReview = idReview;
      this.content = content;
      this.ratingPoint = ratingPoint;
   }
}

export default ReviewModel;