import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckoutSuccess } from "./components/CheckoutSuccess";
import { CheckoutFail } from "./components/CheckoutFail";
import { endpointBE } from "../utils/Constant";
import { getIdUserByToken } from "../utils/JwtService";
import { useAuth } from "../utils/AuthContext";

const CheckoutStatus: React.FC = () => {
	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigation("/login");
		}
	});

	const location = useLocation();
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const vnpResponseCode = searchParams.get("vnp_ResponseCode");

		if (vnpResponseCode === "00") {
			setIsSuccess(true);
		} else {
			const token = localStorage.getItem("token");
			fetch(endpointBE + "/order/cancel-order", {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					idUser: getIdUserByToken(),
				}),
			}).catch((error) => {
				console.log(error);
			});
		}
	}, [location.search]);

	return <>{isSuccess ? <CheckoutSuccess /> : <CheckoutFail />}</>;
};

export default CheckoutStatus;
