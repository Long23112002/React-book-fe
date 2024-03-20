import { Box, Button, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import FeedbackModel from "../../model/FeedbackModel";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { endpointBE } from "../utils/Constant";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";

export const FeedbackCustomerPage: React.FC = () => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng
	
	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigation("/login");
		}
	});
	const token = localStorage.getItem("token");
	const [feedback, setFeedback] = useState<FeedbackModel>({
		idFeedback: 0,
		title: "",
		comment: "",
		dateCreated: new Date(),
		readed: false,
		user: token ? jwtDecode(token).sub : "",
	});

	function hanleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const token = localStorage.getItem("token");

		toast.promise(
			fetch(endpointBE + "/feedback/add-feedback", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify(feedback),
			})
				.then((response) => {
					if (response.ok) {
						setFeedback({
							idFeedback: 0,
							title: "",
							comment: "",
							dateCreated: new Date(),
							readed: false,
							user: token ? jwtDecode(token).sub : "",
						});
						toast.success("Gửi nhận xét thành công");
					} else {
						toast.error("Gặp lỗi trong quá trình gửi nhận xét");
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error("Gặp lỗi trong quá trình gửi nhận xét");
				}),
			{
				pending: "Đang trong quá trình xử lý ...",
			}
		);
	}

	// Khúc này chủ yếu nếu mà không đăng nhập mà cố tình vào thì sẽ không render component ra
	if (!isLoggedIn) {
		return null;
	}

	return (
		<div className='container-book container bg-light my-3 py-3 px-5'>
			<h3 className='text-center m-3'>NHẬN XÉT VỀ CHÚNG TÔI</h3>
			<div className='d-flex align-items-center justify-content-center'>
				<div className='w-50'>
					<form className='form' onSubmit={hanleSubmit}>
						<Box
							sx={{
								"& .MuiTextField-root": { mb: 3 },
							}}
						>
							<TextField
								required
								id='filled-required'
								label='Tiêu đề'
								style={{ width: "100%" }}
								value={feedback.title}
								onChange={(e: any) =>
									setFeedback({ ...feedback, title: e.target.value })
								}
								size='small'
							/>

							<TextField
								required
								id='filled-required'
								label='Nội dung'
								style={{ width: "100%" }}
								value={feedback.comment}
								multiline
								maxRows={4}
								onChange={(e: any) =>
									setFeedback({ ...feedback, comment: e.target.value })
								}
								size='small'
							/>

							<Button
								className='w-100 my-3'
								type='submit'
								variant='outlined'
								sx={{ width: "25%", padding: "10px" }}
							>
								Gửi
							</Button>
						</Box>
					</form>
				</div>
			</div>
		</div>
	);
};
