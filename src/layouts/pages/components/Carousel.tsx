import React from "react";

function Carousel() {
	return (
		<div
			id='carouselExampleIndicators'
			className='carousel slide'
			data-mdb-ride='carousel'
		>
			<div className='carousel-indicators'>
				<button
					type='button'
					data-mdb-target='#carouselExampleIndicators'
					data-mdb-slide-to='0'
					className='active'
					aria-current='true'
					aria-label='Slide 1'
				></button>
				<button
					type='button'
					data-mdb-target='#carouselExampleIndicators'
					data-mdb-slide-to='1'
					aria-label='Slide 2'
				></button>
				<button
					type='button'
					data-mdb-target='#carouselExampleIndicators'
					data-mdb-slide-to='2'
					aria-label='Slide 3'
				></button>
			</div>
			<div className='carousel-inner'>
				<div className='carousel-item active'>
					<img
						src={"./../../../images/books/banner-1.jpg"}
						className='d-block w-100'
						alt='Wild Landscape'
					/>
				</div>
				<div className='carousel-item'>
					<img
						src={"./../../../images/books/banner-2.jpg"}
						className='d-block w-100'
						alt='Camera'
					/>
				</div>
				<div className='carousel-item'>
					<img
						src={"./../../../images/books/banner-3.jpg"}
						className='d-block w-100'
						alt='Exotic Fruits'
					/>
				</div>
			</div>
			<button
				className='carousel-control-prev'
				type='button'
				data-mdb-target='#carouselExampleIndicators'
				data-mdb-slide='prev'
			>
				<span
					className='carousel-control-prev-icon'
					aria-hidden='true'
				></span>
				<span className='visually-hidden'>Previous</span>
			</button>
			<button
				className='carousel-control-next'
				type='button'
				data-mdb-target='#carouselExampleIndicators'
				data-mdb-slide='next'
			>
				<span
					className='carousel-control-next-icon'
					aria-hidden='true'
				></span>
				<span className='visually-hidden'>Next</span>
			</button>
		</div>
	);
}

export default Carousel;
