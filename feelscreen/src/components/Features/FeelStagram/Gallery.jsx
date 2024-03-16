import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
	width: 100%;
	overflow: hidden;
`;

const Slider = styled.div`
	display: flex;
	transition: transform 0.5s ease;
`;

const Slide = styled.img`
	min-width: 100%;
	height: auto;
`;

const Gallery = ({ images }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
	};

	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
	};

	return (
		<GalleryContainer>
			<Slider style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
				{images.map((image, index) => (
					<Slide key={index} src={image} alt={`Slide ${index + 1}`} />
				))}
			</Slider>
			<button onClick={prevSlide}>◀</button>
			<button onClick={nextSlide}>▶</button>
		</GalleryContainer>
	);
};

export default Gallery;
