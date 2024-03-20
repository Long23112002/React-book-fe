import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	maxHeight: "600px",
	overflowY: "scroll",
	bgcolor: "background.paper",
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
};

interface FadeModalProps {
	open: boolean;
	handleOpen: any;
	handleClose: any;
	children: any;
}

export const FadeModal: React.FC<FadeModalProps> = (props) => {
	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={props.open}
				onClose={props.handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={props.open}>
					<Box sx={style}>{props.children}</Box>
				</Fade>
			</Modal>
		</div>
	);
};
