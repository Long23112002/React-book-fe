/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ReviewModel from "../../../../model/ReviewModel";
import { getUserByIdReview } from "../../../../api/UserApi";
import UserModel from "../../../../model/UserModel";

interface CommentProps {
	review: ReviewModel;
	children: React.ReactNode;
}

const User: React.FC<CommentProps> = (props) => {
	const [user, setUser] = useState<UserModel | null>(null);

	useEffect(() => {
		getUserByIdReview(props.review.idReview).then((response) => {
			setUser(response);
		});
	}, []);

	const formatDate = (timestamp: string) => {
		const date = new Date(timestamp);

		const year = date.getFullYear();
		const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
	};

	return (
		<>
			<div className='me-4 mt-1'>
				<Avatar>{user?.lastName[0]}</Avatar>
			</div>
			<div>
				<strong>{user?.username}</strong>
				<span className='ms-2' style={{ fontSize: "12px", color: "#aaa" }}>
					{formatDate(props.review.timestamp + "")}
				</span>
				{props.children}
			</div>
		</>
	);
};

export default User;
