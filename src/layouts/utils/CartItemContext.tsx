import React, { createContext, useContext, useEffect, useState } from "react";
import CartItemModel from "../../model/CartItemModel";

interface CartItemProps {
	children: React.ReactNode;
}

interface CartItemType {
	cartList: CartItemModel[];
	setCartList: any;
	totalCart: number;
	setTotalCart: any;
}

const CartItem = createContext<CartItemType | undefined>(undefined);

export const CartItemProvider: React.FC<CartItemProps> = (props) => {
	const [cartList, setCartList] = useState<CartItemModel[]>([]);
	const [totalCart, setTotalCart] = useState(0);

	useEffect(() => {
		const cartData: string | null = localStorage.getItem("cart");
		let cart: CartItemModel[] = [];
		cart = cartData ? JSON.parse(cartData) : [];
		setCartList(cart);
		setTotalCart(cart.length);
	}, []);

	return (
		<CartItem.Provider
			value={{ cartList, setCartList, totalCart, setTotalCart }}
		>
			{props.children}
		</CartItem.Provider>
	);
};

export const useCartItem = (): CartItemType => {
	const context = useContext(CartItem);
	if (!context) {
		throw new Error("Lỗi context");
	}
	return context;
};
