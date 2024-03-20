import React from "react";
import OrderModel from "../../../../model/OrderModel";
import { Chip } from "@mui/material";
import { StepperComponent } from "../../../utils/StepperComponent";
import { BookHorizontal } from "../BookHorizontalProps";
import format from "date-fns/format";

interface OrderDetailProps {
	order: OrderModel;
	activeStep: number;
	steps: String[];
	handleCloseModal: any;
	type?: string;
}

export const OrderDetail: React.FC<OrderDetailProps> = (props) => {
	return (
		<>
			<Chip
				label={props.order.status}
				sx={{ width: "auto-fit" }}
				color={
					props.order.status === "Thành công"
						? "success"
						: props.order.status === "Đang xử lý"
						? "info"
						: props.order.status === "Đang giao hàng"
						? "warning"
						: "error"
				}
				variant='outlined'
			/>
			<div className='row'>
				<div className='col-lg-3 col-md-6 col-sm-12'>
					<p className='mt-2'>
						Mã đơn hàng:{" "}
						<strong className='ms-2'>{props.order.idOrder}</strong>
					</p>
					<p>
						Ngày mua:
						<strong className='ms-2'>
							{format(new Date(props.order.dateCreated), "dd/MM/yyyy")}
						</strong>
					</p>
					<p>
						Tổng tiền:
						<strong className='ms-2'>
							{props.order.totalPrice.toLocaleString("vi-vn")} đ
						</strong>
					</p>
					<p>
						Phương thức thanh toán:
						<strong className='ms-2'>{props.order.payment}</strong>
					</p>
				</div>
				<div className='col-lg-4 col-md-6 col-sm-12'>
					<p>
						Họ và tên:
						<strong className='ms-2'>{props.order.fullName}</strong>
					</p>
					<p>
						Địa chỉ giao hàng:
						<strong className='ms-2'>
							{props.order.deliveryAddress}
						</strong>
					</p>
					<p>
						Số điện thoại:
						<strong className='ms-2'>{props.order.phoneNumber}</strong>
					</p>
				</div>
				<div className='col'>
					<StepperComponent
						steps={props.steps}
						activeStep={props.activeStep}
					/>
				</div>
			</div>
			<hr className='mt-3' />
			<p>
				<strong className='text-warning'>Ghi chú:</strong>
				<span className='ms-2'>{props.order.note}</span>
			</p>
			<hr className='mt-3' />
			{props.order.cartItems?.map((cartItem, index) => (
				<BookHorizontal
					cartItem={cartItem}
					key={index}
					type={props.type}
					idOrder={props.order.idOrder}
					handleCloseModalOrderDetail={props.handleCloseModal}
					statusOrder={props.order.status}
				/>
			))}
		</>
	);
};
