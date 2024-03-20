/* eslint-disable no-lone-blocks */
import React, { FormEvent, useEffect, useState } from "react";
import { isTokenExpired } from "../../../layouts/utils/JwtService";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import GenreModel from "../../../model/GenreModel";
import { get1Genre } from "../../../api/GenreApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpointBE } from "../../../layouts/utils/Constant";

interface GenreFormProps {
	option: string;
	id: number;
	handleCloseModal: any;
	setKeyCountReload?: any;
}

export const GenreForm: React.FC<GenreFormProps> = (props) => {
	const [genre, setGenre] = useState<GenreModel>({
		idGenre: 0,
		nameGenre: "",
	});

	// Lấy dữ liệu khi mà update
	useEffect(() => {
		if (props.option === "update") {
			get1Genre(props.id).then((response) =>
				setGenre({
					idGenre: response.genre.idGenre,
					nameGenre: response.genre.nameGenre,
				})
			);
		}
	}, [props.id, props.option]);

	function hanleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const token = localStorage.getItem("token");

		if (!token) {
			alert("Bạn chưa đăng nhập!");
			return;
		}
		if (!isTokenExpired(token)) {
			alert("Token đã hết hạn. Vui lòng đăng nhập lại!");
			return;
		}

		const method = props.option === "add" ? "POST" : "PUT";
		const endpoint =
			props.option === "add"
				? endpointBE + "/genre"
				: endpointBE + `/genre/${props.id}`;

		fetch(endpoint, {
			method: method,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(genre),
		})
			.then((response) => {
				if (response.ok) {
					setGenre({
						idGenre: 0,
						nameGenre: "",
					});

					props.option === "add"
						? toast.success("Thêm thể loại thành công")
						: toast.success("Cập nhật thể loại thành công");

					props.setKeyCountReload(Math.random());
					props.handleCloseModal();
				} else {
					toast.error("Lỗi khi thưc hiện hành động");
					props.handleCloseModal();
				}
			})
			.catch((e) => {
				toast.error("Lỗi khi thưc hiện hành động");
				props.handleCloseModal();
				console.log(e);
			});
	}
	return (
		<div>
			<Typography className='text-center' variant='h4' component='h2'>
				{props.option === "add"
					? "TẠO THỂ LOẠI"
					: props.option === "update"
					? "SỬA THỂ LOẠI"
					: "XEM CHI TIẾT"}
			</Typography>
			<hr />
			<div className='container px-5'>
				<form onSubmit={hanleSubmit} className='form'>
					<input type='hidden' id='idGenre' value={genre.idGenre} hidden />
					<Box
						sx={{
							"& .MuiTextField-root": { mb: 3 },
						}}
					>
						<TextField
							required
							id='filled-required'
							label='Tên thể loại'
							style={{ width: "100%" }}
							value={genre.nameGenre}
							onChange={(e) =>
								setGenre({ ...genre, nameGenre: e.target.value })
							}
							size='small'
						/>
					</Box>
					{props.option !== "view" && (
						<button className='btn btn-primary w-100 my-3' type='submit'>
							{props.option === "add" ? "Tạo thể loại" : "Lưu thể loại"}
						</button>
					)}
				</form>
			</div>
		</div>
	);
};
