/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Rating from "@mui/material/Rating";
import React from "react";

interface RatingStarProps {
	readonly?: boolean;
	ratingPoint?: number;
}

const RatingStar: React.FC<RatingStarProps> = (props) => {
	const [value, setValue] = React.useState<number | null>(
		props.ratingPoint || 0
	);

	return (
		<Rating
			name='half-rating'
			value={value}
			precision={0.5}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			readOnly={props.readonly}
			size='small'
		/>
	);
};

export default RatingStar;
