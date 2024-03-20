/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from "@mui/material/Button";
import React, { useState } from "react";

interface TextEllipsis {
	isShow?: boolean;
	text: string;
	limit: number;
}

const TextEllipsis: React.FC<TextEllipsis> = (props) => {
	const [showFullText, setShowFullText] = useState(false);

	const truncatedText = showFullText
		? props.text
		: props.text.slice(0, props.limit) +
		  (props.text.length > props.limit ? "..." : "");

	return (
		<>
			<div>
				<p
					style={{
						width: "100%",
						overflowWrap: "break-word",
						whiteSpace: "pre-wrap",
						lineHeight: "20px",
					}}
				>
					{truncatedText}
				</p>
				{props.isShow && (
					<div className='d-flex align-items-center justify-content-center mt-3'>
						{props.text.length > props.limit && (
							<Button
								variant='outlined'
								className='text-primary'
								style={{
									cursor: "pointer",
									width: "20%",
								}}
								onClick={() => setShowFullText(!showFullText)}
							>
								{showFullText ? "Rút gọn" : "Xem thêm"}
							</Button>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default TextEllipsis;
