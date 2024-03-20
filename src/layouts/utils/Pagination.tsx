/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../utils/Pagination.css";

interface PaginationInterface {
	currentPage: number;
	totalPages: number;
	handlePagination: any;
}

const Pagination: React.FC<PaginationInterface> = (props) => {
	const showListPage = [];

	if (props.currentPage === 1) {
		// Thêm trang hiện tại vào
		showListPage.push(props.currentPage);

		// Thêm 2 trang kế tiếp vào
		if (props.totalPages >= 2) {
			// Nếu có trang 2 thì thêm vào
			showListPage.push(props.currentPage + 1);
		}
		if (props.totalPages >= 3) {
			// Nếu có trang 3 thì thêm vào
			showListPage.push(props.currentPage + 2);
		}
	} else if (props.currentPage > 1) {
		// Trang - 2
		if (props.currentPage >= 3) {
			// Thêm trang đằng sau vào
			showListPage.push(props.currentPage - 2);
		}

		// Trang - 1
		if (props.currentPage >= 2) {
			// Thêm trang đăng sau vào
			showListPage.push(props.currentPage - 1);
		}

		// Trang hiện tại
		showListPage.push(props.currentPage);

		// Trang + 1
		if (props.currentPage + 1 <= props.totalPages) {
			// Thêm trang đằng trước vào
			showListPage.push(props.currentPage + 1);
		}

		// Trang + 2
		if (props.currentPage + 2 <= props.totalPages) {
			// Thêm trang đằng trước vào
			showListPage.push(props.currentPage + 2);
		}
	}

	return (
		<nav aria-label='Page navigation example' className='mt-5 fs-5'>
			<ul className='pagination justify-content-center'>
				<li
					className={
						"page-item " + (props.currentPage === 1 ? "disabled" : "")
					}
					onClick={
						props.currentPage === 1
							? () => {}
							: () => props.handlePagination(props.currentPage - 1)
					}
				>
					<button className='page-link' tabIndex={-1}>
						Previous
					</button>
				</li>
				{/* Hiện trang đầu tiên */}
				{props.currentPage >= 4 && (
					<>
						<li
							className='page-item'
							onClick={() => props.handlePagination(1)}
						>
							<button className='page-link'>1</button>
						</li>
						<li className='page-item'>
							<button className='page-link'>...</button>
						</li>
					</>
				)}

				{/* Hiện các trang tiếp theo */}
				{showListPage.map((pageNumber, index) => (
					<li
						className={
							"page-item" +
							(props.currentPage === pageNumber ? " actived" : "")
						}
						key={pageNumber}
						onClick={() => props.handlePagination(pageNumber)}
					>
						<button className='page-link'>{pageNumber}</button>
					</li>
				))}

				{/* Hiện trang cuối cùng */}
				{props.currentPage < props.totalPages - 2 && (
					<>
						<li className='page-item'>
							<button className='page-link'>...</button>
						</li>
						<li
							className='page-item'
							onClick={() => props.handlePagination(props.totalPages)}
						>
							<button className='page-link'>{props.totalPages}</button>
						</li>
					</>
				)}
				<li
					className={
						"page-item " +
						(props.totalPages === props.currentPage ? "disabled" : "")
					}
					onClick={
						props.totalPages === props.currentPage
							? () => {}
							: () => props.handlePagination(props.currentPage + 1)
					}
				>
					<button className='page-link'>Next</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
