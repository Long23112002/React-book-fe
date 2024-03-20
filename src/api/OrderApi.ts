import { endpointBE } from "../layouts/utils/Constant";
import CartItemModel from "../model/CartItemModel";
import OrderModel from "../model/OrderModel";
import { request } from "./Request";

export async function getAllOrders(): Promise<OrderModel[]> {
   try {
      const endpoint: string = endpointBE + "/orders?sort=idOrder,desc&size=100000";
      const response = await request(endpoint);

      const datas = await Promise.all(response._embedded.orders.map(async (data: any) => {
         const responsePayment = await request(endpointBE + `/orders/${data.idOrder}/payment`);
         return {
            idOrder: data.idOrder,
            deliveryAddress: data.deliveryAddress,
            totalPrice: data.totalPrice,
            totalPriceProduct: data.totalPriceProduct,
            feeDelivery: data.feeDelivery,
            feePayment: data.feePayment,
            dateCreated: data.dateCreated,
            status: data.status,
            user: data._embedded.user,
            fullName: data.fullName,
            note: data.note,
            payment: responsePayment.namePayment,
         };
      }));

      return datas;
   } catch (error) {
      console.error("Error while fetching orders:", error);
      throw error;
   }
}


export async function getAllOrdersByIdUser(idUser: number): Promise<OrderModel[]> {
   const endpoint = endpointBE + `/users/${idUser}/listOrders?sort=idOrder,desc`;
   const response = await request(endpoint);
   const datas = await Promise.all(response._embedded.orders.map(async (data: any) => {
      const responsePayment = await request(endpointBE + `/orders/${data.idOrder}/payment`);
      const order: OrderModel = {
         idOrder: data.idOrder,
         deliveryAddress: data.deliveryAddress,
         totalPrice: data.totalPrice,
         totalPriceProduct: data.totalPriceProduct,
         feeDelivery: data.feeDelivery,
         feePayment: data.feePayment,
         dateCreated: data.dateCreated,
         status: data.status,
         user: data._embedded.user,
         fullName: data.fullName,
         note: data.note,
         payment: responsePayment.namePayment,
      }
      return order;
   }))

   return datas;
}

export async function get1Orders(idOrder: number): Promise<OrderModel> {
   const endpoint: string = endpointBE + `/orders/${idOrder}`;
   const responseOrder = await request(endpoint);
   const responsePayment = await request(endpointBE + `/orders/${responseOrder.idOrder}/payment`);
   const responseOrderDetail = await request(endpointBE + `/orders/${responseOrder.idOrder}/listOrderDetails`);
   let cartItems: CartItemModel[] = [];

   // Sử dụng Promise.all để chờ tất cả các promise hoàn thành
   await Promise.all(responseOrderDetail._embedded.orderDetails.map(async (orderDetail: any) => {
      const responseBook = await request(endpointBE + `/order-detail/${orderDetail.idOrderDetail}/book`);
      cartItems.push({ book: responseBook, quantity: orderDetail.quantity, review: orderDetail.review });
   }));

   const order: OrderModel = {
      idOrder: responseOrder.idOrder,
      deliveryAddress: responseOrder.deliveryAddress,
      totalPrice: responseOrder.totalPrice,
      totalPriceProduct: responseOrder.totalPriceProduct,
      feeDelivery: responseOrder.feeDelivery,
      feePayment: responseOrder.feePayment,
      dateCreated: responseOrder.dateCreated,
      status: responseOrder.status,
      user: responseOrder._embedded.user,
      fullName: responseOrder.fullName,
      phoneNumber: responseOrder.phoneNumber,
      note: responseOrder.note,
      cartItems: cartItems,
      payment: responsePayment.namePayment,
   }

   return order;
}