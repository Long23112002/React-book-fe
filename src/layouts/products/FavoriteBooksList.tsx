/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { endpointBE } from "../utils/Constant";
import { getIdUserByToken } from "../utils/JwtService";
import BookModel from "../../model/BookModel";
import BookProps from "./components/BookProps";
import { getBookById } from "../../api/BookApi";
import { Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

interface FavoriteBooksListProps {}

const FavoriteBooksList: React.FC<FavoriteBooksListProps> = (props) => {
	const [bookList, setBookList] = useState<BookModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [reloadComponent] = useState(0);

	useEffect(() => {
		fetch(
			endpointBE + `/favorite-book/get-favorite-book/${getIdUserByToken()}`
		)
			.then((response) => response.json())
			.then((idBookList) => {
				const fetchBookPromises = idBookList.map(async (idBook: any) => {
					const response = await getBookById(idBook);
					return response;
				});

				// Sử dụng Promise.all để đợi tất cả các yêu cầu fetch hoàn thành
				return Promise.all(fetchBookPromises);
			})
			.then((books) => {
				// Xử lý danh sách sách ở đây (mảng 'books')
				setBookList(books);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	}, []);

	if (loading) {
		return (
			<div className='container-book container mb-5 py-5 px-5 bg-light'>
				<div className='row'>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='container-book container mb-5 pb-5 px-5 bg-light'>
			<h2 className='mt-4 px-3 py-3 mb-0'>SÁCH YÊU THÍCH</h2>
			<hr className='mt-0' />
			<div className='row' key={reloadComponent}>
				{bookList.length > 0 ? (
					bookList.map((book) => (
						<BookProps key={book.idBook} book={book} />
					))
				) : (
					<div className='d-flex align-items-center justify-content-center flex-column'>
						<h4 className='text-center'>
							Bạn chưa yêu thích quyển sách nào
						</h4>
						<Link to={"/search"}>
							<Button variant='contained' className='mt-3'>
								Kho sách
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoriteBooksList;
