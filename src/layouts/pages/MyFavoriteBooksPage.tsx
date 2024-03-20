import React, { useEffect } from "react";
import FavoriteBooksList from "../products/FavoriteBooksList";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";

interface MyFavoriteBooksPageProps {}

const MyFavoriteBooksPage: React.FC<MyFavoriteBooksPageProps> = (props) => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigation("/login");
		}
	});

	if (!isLoggedIn) {
		return null;
	}

	return (
		<>
			<FavoriteBooksList />
		</>
	);
};

export default MyFavoriteBooksPage;
