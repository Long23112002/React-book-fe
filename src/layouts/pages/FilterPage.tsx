/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import ToolFilter from "./components/ToolFilter";
import BookList from "../products/BookList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";

interface FilterPageProps {
	keySearchNav?: string; // key search từ navbar
}

const FilterPage: React.FC<FilterPageProps> = (props) => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

	const [size, setSize] = useState(12); // Hiển thị bao nhiêu sản phẩm
	const [keySearch, setKeySearch] = useState(""); // Từ khoá của sách
	const [idGenre, setIdGenre] = useState(0); // Thể loại muốn hiển thị
	const [filter, setFilter] = useState(0); // Lọc theo chế độ gì (tên từ A - Z, Z - A, ...)

	if (props.keySearchNav !== undefined && props.keySearchNav !== "") {
		setKeySearch(props.keySearchNav);
	}

	// Lấy value id genre từ url
	const { idGenreParam } = useParams();
	var idGenreNumber: number = 0;
	try {
		idGenreNumber = parseInt(idGenreParam + ""); // Có thể nó làm object nên phải + thêm chuỗi rỗng vào
		// Nếu mà id genre mà có thay đổi thì id genre trên param sẽ không có tác dụng
		// Đang bị bug khúc này chưa có idea để xử lý
		if (idGenre !== 0) {
			idGenreNumber = 0;
		}

		if (Number.isNaN(idGenreNumber)) {
			idGenreNumber = 0;
		}
	} catch (error) {
		console.error("Error: ", error);
	}

	return (
		<>
			<div className='container-book container bg-light my-3 py-3 px-5'>
				<ToolFilter
					size={size}
					setSize={setSize}
					keySearch={keySearch}
					setKeySearch={setKeySearch}
					idGenre={idGenreNumber ? idGenreNumber : idGenre}
					setIdGenre={setIdGenre}
					filter={filter}
					setFilter={setFilter}
				/>
			</div>
			<BookList
				paginable={true}
				size={size}
				keySearch={keySearch}
				idGenre={idGenreNumber ? idGenreNumber : idGenre}
				filter={filter}
			/>
		</>
	);
};

export default FilterPage;
