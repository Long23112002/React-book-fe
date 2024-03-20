class RoleModel {
   id?: number;
   idRole: number;
   nameRole: string;

   constructor(idRole: number, nameRole: string) {
      this.idRole = idRole;
      this.nameRole = nameRole;
   }
}

export default RoleModel;