import React from "react";
import BookCartList from "../products/BookCartList";
import useScrollToTop from "../../hooks/ScrollToTop";

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = (props) => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

	return <BookCartList />;
};

export default CartPage;
