/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/pages/HomePage";
import About from "./layouts/about/About";
import BookDetail from "./layouts/products/BookDetail";
import FilterPage from "./layouts/pages/FilterPage";
import MyFavoriteBooksPage from "./layouts/pages/MyFavoriteBooksPage";
import CartPage from "./layouts/pages/CartPage";
import RegisterPage from "./layouts/user/RegisterPage";
import LoginPage from "./layouts/user/LoginPage";
import ProfilePage from "./layouts/user/ProfilePage";
import ActiveAccount from "./layouts/user/ActiveAccount";
import { useState } from "react";
import { Slidebar } from "./admin/components/Slidebar";
import DashboardPage from "./admin/Dashboard";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import BookManagementPage from "./admin/BookManagement";
import UserManagementPage from "./admin/UserManagement";
import GenreManagementPage from "./admin/GenreManagement";
import OrderManagementPage from "./admin/OrderManagement";
import PolicyPage from "./layouts/pages/PolicyPage";
import FeedbackPage from "./admin/FeedbackManagement";
import { FeedbackCustomerPage } from "./layouts/pages/FeedbackCustomerPage";
import { Error403Page } from "./layouts/pages/403Page";
import { AuthProvider } from "./layouts/utils/AuthContext";
import { Error404Page } from "./layouts/pages/404Page";
import { ForgotPassword } from "./layouts/user/ForgotPassword";
import { CartItemProvider } from "./layouts/utils/CartItemContext";
import CheckoutStatus from "./layouts/pages/CheckoutStatus";

const MyRoutes = () => {
	const [reloadAvatar, setReloadAvatar] = useState(0);

	// XỬ LÝ ẨN HIỆN NAV VÀ FOOTER /////////////////
	const location = useLocation();

	// Check if the current path starts with '/admin'
	const isAdminPath = location.pathname.startsWith("/admin");
	///////////////////////////////////////////////

	return (
		<AuthProvider>
			<CartItemProvider>
				<ConfirmProvider>
					{/* Customer */}
					{!isAdminPath && <Navbar key={reloadAvatar} />}
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/book/:idBook' element={<BookDetail />} />
						<Route path='/about' element={<About />} />
						<Route
							path='/search/:idGenreParam'
							element={<FilterPage />}
						/>
						<Route path='/search' element={<FilterPage />} />
						<Route
							path='/my-favorite-books'
							element={<MyFavoriteBooksPage />}
						/>
						<Route path='/cart' element={<CartPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route
							path='/profile'
							element={<ProfilePage setReloadAvatar={setReloadAvatar} />}
						/>
						<Route
							path='/active/:email/:activationCode'
							element={<ActiveAccount />}
						/>
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/policy' element={<PolicyPage />} />
						<Route path='/feedback' element={<FeedbackCustomerPage />} />
						<Route path='/error-403' element={<Error403Page />} />
						<Route
							path='/check-out/status'
							element={<CheckoutStatus />}
						/>
						{!isAdminPath && (
							<Route path='*' element={<Error404Page />} />
						)}
					</Routes>
					{!isAdminPath && <Footer />}

					{/* Admin */}
					{isAdminPath && (
						<div className='row overflow-hidden w-100'>
							<div className='col-2 col-md-3 col-lg-2'>
								<Slidebar />
							</div>
							<div className='col-10 col-md-9 col-lg-10'>
								<Routes>
									<Route path='/admin' element={<DashboardPage />} />
									<Route
										path='/admin/dashboard'
										element={<DashboardPage />}
									/>
									<Route
										path='/admin/book'
										element={<BookManagementPage />}
									/>
									<Route
										path='/admin/user'
										element={<UserManagementPage />}
									/>
									<Route
										path='/admin/genre'
										element={<GenreManagementPage />}
									/>
									<Route
										path='/admin/order'
										element={<OrderManagementPage />}
									/>
									<Route
										path='/admin/feedback'
										element={<FeedbackPage />}
									/>
									{isAdminPath && (
										<Route path='*' element={<Error404Page />} />
									)}
								</Routes>
							</div>
						</div>
					)}
					<ToastContainer
						position='bottom-center'
						autoClose={3000}
						pauseOnFocusLoss={false}
					/>
				</ConfirmProvider>
			</CartItemProvider>
		</AuthProvider>
	);
};

function App() {
	return (
		<BrowserRouter>
			<MyRoutes />
		</BrowserRouter>
	);
}

export default App;
