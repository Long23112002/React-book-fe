import { endpointBE } from "../layouts/utils/Constant";
import RoleModel from "../model/RoleModel";
import { request, requestAdmin } from "./Request";

export async function getAllRoles(): Promise<RoleModel[]> {
   const endpoint = endpointBE + "/roles";
   // Gọi phương thức request()
   const response = await requestAdmin(endpoint);

   const rolesList: RoleModel[] = response._embedded.roles.map((role: any) => ({
      ...role,
   }));

   return rolesList;
}

export async function getRoleByIdUser(idUser: any): Promise<RoleModel> {
   const endpoint = endpointBE + `/users/${idUser}/listRoles`;
   // Gọi phương thức request()
   const response = await request(endpoint);

   const rolesList: RoleModel[] = response._embedded.roles.map((role: any) => ({
      ...role,
   }));

   return rolesList[0];
}