import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import GenreModel from "../../model/GenreModel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface SelectMultipleProps {
	values: GenreModel[]; // Giá trị để in ra dữ liệu select
	selectedList: any[]; // Biến dữ liệu đã select
	setSelectedList: any; // Hàm gán dữ liệu đã select
	setValue: any; // Hàm gán lại dữ liệu
	required: boolean; // có bắt buộc chọn không
	selectedListName: any[]; // Biến để lúc chọn thì nó sẽ hiện ra (kiểu tag)
	setSelectedListName: any; // Hàm để gán những gì mình chọn bằng tên
}

export const SelectMultiple: React.FC<SelectMultipleProps> = (props) => {
	const handleChange = (
		event: SelectChangeEvent<typeof props.selectedListName>
	) => {
		const value = event.target.value;

		// Lọc từ dữ liệu vào so sánh với dữ liệu đã chọn
		const dataSelected = props.values.filter((i) =>
			value.includes(i.nameGenre)
		);
		// Từ dữ liệu trên lọc và lấy id ra
		const dataSelectedId = dataSelected.map((i) => i.idGenre);

		props.setSelectedList(dataSelectedId);

		props.setSelectedListName(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<FormControl sx={{ mb: 3, width: "100%" }} size='small'>
				<InputLabel id='demo-multiple-checkbox-label'>Thể loại</InputLabel>
				<Select
					labelId='demo-multiple-checkbox-label'
					id='demo-multiple-checkbox'
					multiple
					value={Array.from(new Set(props.selectedListName))}
					onChange={handleChange}
					input={<OutlinedInput label='Thể loại' />}
					renderValue={(selected) => selected.join(", ")}
					MenuProps={MenuProps}
					required={props.required}
				>
					{props.values.map((genre) => (
						<MenuItem key={genre.idGenre} value={genre.nameGenre}>
							<Checkbox
								checked={
									props.selectedListName.indexOf(genre.nameGenre) > -1
								}
							/>
							<ListItemText primary={genre.nameGenre} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
