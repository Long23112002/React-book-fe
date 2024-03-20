import Button from "@mui/material/Button";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { UserTable } from "./components/user/UserTable";
import { UserForm } from "./components/user/UserForm";
import { FadeModal } from "../layouts/utils/FadeModal";
import RequireAdmin from "./RequireAdmin";

const UserManagement = () => {
	// Tạo ra biến để mỗi khi thao tác CRUD thì sẽ update lại table
	const [keyCountReload, setKeyCountReload] = useState(0);

	const [option, setOption] = useState(""); // Truyền vào là có thể là (add, update)
	const [openModal, setOpenModal] = React.useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const [id, setId] = useState<number>(0);

	return (
		<div className='conatiner p-5'>
			<div className='shadow-4-strong rounded p-5'>
				<div className='mb-3'>
					<Button
						variant='contained'
						color='success'
						onClick={() => {
							handleOpenModal();
							setOption("add");
						}}
						startIcon={<AddIcon />}
					>
						Thêm người dùng
					</Button>
				</div>
				<div>
					<UserTable
						keyCountReload={keyCountReload}
						setOption={setOption}
						handleOpenModal={handleOpenModal}
						setKeyCountReload={setKeyCountReload}
						setId={setId}
					/>
				</div>
			</div>
			<FadeModal
				open={openModal}
				handleOpen={handleOpenModal}
				handleClose={handleCloseModal}
			>
				<UserForm
					option={option}
					setKeyCountReload={setKeyCountReload}
					id={id}
					handleCloseModal={handleCloseModal}
				/>
			</FadeModal>
		</div>
	);
};

const UserManagementPage = RequireAdmin(UserManagement);
export default UserManagementPage;
