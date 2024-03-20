import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JwtPayload } from "../../admin/RequireAdmin";
import { endpointBE } from "../utils/Constant";
import CartItemModel from "../../model/CartItemModel";
import { getCartAllByIdUser } from "../../api/CartApi";
import { useAuth } from "../utils/AuthContext";
import { useCartItem } from "../utils/CartItemContext";
import useScrollToTop from "../../hooks/ScrollToTop";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

	const { setTotalCart, setCartList } = useCartItem();

	const navigation = useNavigate();
	const { isLoggedIn, setLoggedIn } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			navigation("/");
		}
	});
	// Biến cần thiết
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const loginRequest = {
			username,
			password,
		};

		fetch(endpointBE + "/user/authenticate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginRequest),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(async (data) => {
				const { jwtToken } = data;
				const decodedToken = jwtDecode(jwtToken) as JwtPayload;

				// Kiểm tra xem tài khoản kích hoạt chưa
				if (decodedToken.enabled === false) {
					toast.warning(
						"Tài khoản của bạn chưa kích hoạt hoặc đã bị vô hiệu hoá"
					);
					return;
				}
				toast.success("Đăng nhâp thành công");
				setLoggedIn(true); // Đã đăng nhập
				localStorage.setItem("token", jwtToken);

				const cartData: string | null = localStorage.getItem("cart");
				let cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
				// Khi đăng nhập thành công mà trước đó đã thêm sản phẩm vào giỏ hàng thì các sản phẩm đó sẽ được thêm vào db
				if (cart.length !== 0) {
					cart = cart.map((c) => ({ ...c, idUser: decodedToken.id }));

					const endpoint = endpointBE + "/cart-item/add-item";
					fetch(endpoint, {
						method: "POST",
						headers: {
							Authorization: `Bearer ${jwtToken}`,
							"content-type": "application/json",
						},
						body: JSON.stringify(cart),
					})
						.then((response) => {
							// Lấy giỏ hàng của user khi đăng nhâp thành công
							async function getCart() {
								const response = await getCartAllByIdUser();
								// Xoá cart mà lúc chưa đăng nhập
								localStorage.removeItem("cart");
								cart = response;
								// Thêm cart lúc đăng nhập
								localStorage.setItem("cart", JSON.stringify(cart));
								setTotalCart(cart.length);
								setCartList(cart);
							}
							getCart();
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					// Lấy giỏ hàng của user khi đăng nhâp thành công
					const response = await getCartAllByIdUser();
					// Xoá cart mà lúc chưa đăng nhập
					localStorage.removeItem("cart");
					cart = response;
					// Thêm cart lúc đăng nhập
					localStorage.setItem("cart", JSON.stringify(cart));
					setTotalCart(cart.length);
					setCartList(cart);
				}

				// Kiểm tra role để chuyển về link
				if (decodedToken.role === "ADMIN") {
					navigation("/admin/dashboard");
				} else {
					navigation("/");
				}
			})
			.catch((error) => {
				console.log("Lỗi đăng nhập: " + error);
				setError("Tài khoản hoặc mật khẩu không đúng");
				toast.error("Tài khoản hoặc mật khẩu không đúng");
			});
	}

	return (
		<div
			className='container my-5 py-4 rounded-5 shadow-5 bg-light'
			style={{ width: "450px" }}
		>
			<h1 className='text-center'>ĐĂNG NHẬP</h1>
			{error && <p className='text-danger text-center'>{error}</p>}
			<form
				onSubmit={handleSubmit}
				className='form'
				style={{ padding: "0 20px" }}
			>
				<TextField
					fullWidth
					required={true}
					id='outlined-required'
					label='Tên đăng nhập'
					placeholder='Nhập tên đăng nhập'
					value={username}
					onChange={(e: any) => setUserName(e.target.value)}
					className='input-field'
				/>
				<TextField
					fullWidth
					required={true}
					type='password'
					id='outlined-required'
					label='Mật khẩu'
					placeholder='Nhập mật khẩu'
					value={password}
					onChange={(e: any) => setPassword(e.target.value)}
					className='input-field'
				/>
				<div className='d-flex justify-content-end mt-2 px-3'>
					<span>
						Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>
					</span>
				</div>
				<div className='text-center my-3'>
					<Button
						fullWidth
						variant='outlined'
						type='submit'
						sx={{ padding: "10px" }}
					>
						Đăng nhập
					</Button>
				</div>
			</form>
			<div className='d-flex justify-content-end mt-2 px-3'>
				<Link to={"/forgot-password"}>Quên mật khẩu</Link>
			</div>
		</div>
	);
};

export default LoginPage;
