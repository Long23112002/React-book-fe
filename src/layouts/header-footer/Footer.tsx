import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminEnpoint } from "../../admin/AdminEnpoint";

function Footer() {
	const location = useLocation();
	const adminEnpoint = AdminEnpoint; // Thêm các path bạn muốn ẩn Navbar vào đây

	if (adminEnpoint.includes(location.pathname)) {
		return null; // Nếu location.pathname nằm trong danh sách ẩn, trả về null để ẩn Navbar
	}
	return (
		// <!-- Footer -->
		<footer className='bg-primary text-center text-white'>
			{/* <!-- Grid container --> */}
			<div className='container p-4'>
				{/* <!-- Section: Social media --> */}
				<section className='mb-4'>
					{/* <!-- Facebook --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-facebook-f'></i>
					</a>

					{/* <!-- Twitter --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-twitter'></i>
					</a>

					{/* <!-- Google --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-google'></i>
					</a>

					{/* <!-- Instagram --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-instagram'></i>
					</a>

					{/* <!-- Linkedin --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-linkedin-in'></i>
					</a>

					{/* <!-- Github --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-github'></i>
					</a>
				</section>
				{/* <!-- Section: Social media --> */}

				{/* <!-- Section: Form --> */}
				<section className=''>
					<form action=''>
						{/* <!--Grid row--> */}
						<div className='row d-flex justify-content-center'>
							<div className='col-auto'>
								<p className='pt-2'>
									<strong>Đăng ký nhận bản tin</strong>
								</p>
							</div>

							<div className='col-md-5 col-12'>
								{/* <!-- Email input --> */}
								<div className=' form-white mb-4'>
									<input
										type='email'
										id='form5Example21'
										className='form-control'
										placeholder='Nhập Email'
									/>
								</div>
							</div>

							<div className='col-auto'>
								{/* <!-- Submit button --> */}
								<button
									type='button'
									className='btn btn-outline-light mb-4'
								>
									Đăng ký
								</button>
							</div>
						</div>
						{/* <!--Grid row--> */}
					</form>
				</section>
				{/* <!-- Section: Form --> */}

				{/* <!-- Section: Links --> */}
				<section className=''>
					{/* <!--Grid row--> */}
					<div className='row'>
						<div className='col-lg-6 col-md-12'>
							<div className='row'>
								<div className='col-lg-4 col-md-12 mb-4'>
									<h5 className='text-uppercase'>DỊCH VỤ</h5>

									<ul className='list-unstyled mb-0'>
										<li>
											<a href='#!' className='text-white'>
												Điều khoản sử dụng
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Chính sách bảo mật thông tin cá nhân
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Chính sách bảo mật thanh toán
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Hệ thống trung tâm - nhà sách
											</a>
										</li>
									</ul>
								</div>

								<div className='col-lg-4 col-md-12 mb-4'>
									<h5 className='text-uppercase'>HỖ TRỢ</h5>

									<ul className='list-unstyled mb-0'>
										<li>
											<a href='#!' className='text-white'>
												Chính sách đổi - trả - hoàn tiền
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Chính sách bảo hành - bồi hoàn
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Chính sách vận chuyển
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Chính sách khách sỉ
											</a>
										</li>
									</ul>
								</div>

								<div className='col-lg-4 col-md-12 mb-4'>
									<h5 className='text-uppercase'>TÀI KHOẢN CỦA TÔI</h5>

									<ul className='list-unstyled mb-0'>
										<li>
											<Link to={"/login"} className='text-white'>
												Đăng nhập/Tạo mới tài khoản
											</Link>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Thay đổi địa chỉ khách hàng
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Chi tiết tài khoản
											</a>
										</li>
										<li>
											<a href='#!' className='text-white'>
												Lịch sử mua hàng
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='col-lg-6 col-md-12'>
						<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29788.123865460097!2d105.74686499999999!3d21.052064200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1710915649200!5m2!1svi!2s" width="500" height="200" style={{ border : "0" }} 
						loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</div>
					{/* <!--Grid row--> */}
				</section>
				{/* <!-- Section: Links --> */}
			</div>
			{/* <!-- Grid container --> */}

			{/* <!-- Copyright --> */}
			<div
				className='text-center p-3'
				style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
			>
				© 2023 Copyright
				<span className='text-white text-decoration-underline'>
					{" "}
					pezoiks1
				</span>
			</div>
			{/* <!-- Copyright --> */}
		</footer>
	);
}

export default Footer;
