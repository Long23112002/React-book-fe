class UserModel {
   id?: any;
   idUser: number;
   dateOfBirth: Date;
   deliveryAddress: string;
   purchaseAddress?: string;
   email: string;
   firstName: string;
   lastName: string;
   gender: string;
   password?: string;
   phoneNumber: string;
   username: string;
   avatar: string;
   role?: number;

   constructor(idUser: number,
      dateOfBirth: Date,
      deliveryAddress: string,
      purchaseAddress: string,
      email: string,
      firstName: string,
      lastName: string,
      gender: string,
      password: string,
      phoneNumber: string,
      username: string, avatar: string) {
      this.idUser = idUser;
      this.dateOfBirth = dateOfBirth;
      this.deliveryAddress = deliveryAddress;
      this.purchaseAddress = purchaseAddress;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.username = username;
      this.avatar = avatar;
   }
}

export default UserModel;