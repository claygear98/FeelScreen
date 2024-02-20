import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const SignForm = {
	title: '',
	// image: new FormData(),
	image: [''],
	tag: [''],
	description: '',
};

const Container = styled.div`
	margin-top: 15px;
	text-align: left;
	display: flex;
	justify-content: center;
`;

const FeelstaForm = styled.form`
	width: 360px;
`;

const Title = styled.div`
	width: 360px; /* Full width */
	margin-top: 20px;
	text-align: left;
	input {
		width: 350px;
		margin-top: 10px;
		height: 25px;
		border-radius: 10px;
		border: 2px solid black;
	}
`;

const Image = styled.div`
	width: 360px;
	margin-top: 20px;
	text-align: left;
`;

const ImageBox = styled.div`
	padding: 0;
	width: 360px;
	margin-top: 10px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	overflow: hidden;

	.image-container input {
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	#input-file {
		display: none;
	}

	img {
		display: inline-block;
		width: 80px;
		height: 80px;
		margin-right: 10px;
		border-radius: 5px;
	}
`;

const PlusBtn = styled.div`
	width: 80px;
	height: 80px;
	border-radius: 5px;
	border: 1px solid black;
	text-align: center;
	line-height: 110px;
`;

const Tag = styled.div`
	width: 360px;
	margin-top: 20px;
	> input {
		margin-top: 10px;
		margin-bottom: 10px;
		width: 150px;
		height: 15px;
	}
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		justify-content: flex-start;
	}

	ul li {
		color: #4ecb71;
	}
	ul li:hover {
		color: red;
		transition: 0.3s all;
	}
	h6 {
		color: red;
	}
`;

const Chuga = styled.button`
	margin-left: 10px;
	width: 50px;
	height: 20px;
`;

const PlusTag = styled.span`
	margin: 0 5px 0 5px;
	font-size: 15px;
`;

const Des = styled.div`
	width: 360px;
	margin-top: 20px;
	textarea {
		margin-top: 10px;
		width: 350px;
		height: 60px;
		border: 2px solid black;
		border-radius: 10px;
	}
`;

const Done = styled.button`
	width: 360px;
	height: 30px;
	margin-bottom: 20px;
	margin-top: 20px;
	border: 2px solid black;
	border-radius: 5px;
`;
const Error = styled.span`
	font-size: 11px;
	font-weight: 600;
	color: red;
`;

const FeelStaCreate = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
		watch,
	} = useForm({
		mode: 'onChange',
		defaultValues: SignForm,
	});
	useEffect(() => {
		const imageFields = watch('image'); // 이미지 필드를 관찰합니다.
		// 각 이미지 필드에 대해 등록을 수행합니다.
		for (let i = 0; i < imageFields.length; i++) {
			register(`image`);
		}
	}, [register, watch]);

	const [tagIndex, setTagIndex] = useState(0);
	const [showImages, setShowImages] = useState([]);

	// 이미지 상대경로 저장
	const handleAddImages = (event) => {
		let imageLists = event.target.files;
		let imageUrlLists = [...showImages];

		for (let i = 0; i < imageLists.length; i++) {
			if (imageLists.length < 5) {
				const currentImageUrl = URL.createObjectURL(imageLists[i]);
				imageUrlLists.push(currentImageUrl);
				setValue(`image.${imageUrlLists.length - 1}`, imageLists[i]);
				console.log(getValues('image'));
			} else {
				alert('사진은 4장까지 선택가능합니다.');
				window.location.reload();
				imageLists = '';
			}
		}

		if (imageUrlLists.length > 4) {
			imageUrlLists = imageUrlLists.slice(0, 4);
			setValue('image', getValues('image').slice(0, 4));
		}

		setShowImages(imageUrlLists);
	};

	// 버튼 클릭 시 이미지 삭제
	const handleDeleteImage = (id) => {
		setShowImages(showImages.filter((_, index) => index !== id));
		setValue(`image.${id}`, null);
		console.log(getValues('image'));
	};

	const plusTagAdd = () => {
		const tagInput = document.getElementById('tagInput');
		const tagValue = getValues(`tag.${tagIndex}`);
		if (tagValue && tagIndex < 4) {
			const formattedTag = `#${tagValue}`;
			setTagIndex((index) => index + 1);
			setValue(`tag.${tagIndex}`, formattedTag);
			console.log(getValues('tag'));
			if (tagIndex === 3) {
				tagInput.disabled = true;
				document.getElementById('addTagButton').disabled = true;
			} else {
				document.getElementById('addTagButton').disabled = false;
			}
			tagInput.value = '';
		}
	};

	const handleDeleteTag = (index) => {
		const tagInput = document.getElementById('tagInput');
		// 클릭한 태그를 제거하는 로직
		const updatedTags =
			getValues('tag').length === 0 ? 0 : [...getValues('tag')];
		updatedTags.splice(index, 1);
		setValue('tag', updatedTags);
		setTagIndex((prevIndex) => prevIndex - 1);
		tagInput.value = '';
		console.log(getValues('tag'));
	};

	const postFeelsta = (data) => {
		const formData = new FormData();

		// 제목과 설명 추가
		formData.append('title', data.title);
		formData.append('description', data.description);

		// 이미지 파일 추가
		for (let i = 0; i < data.image.length; i++) {
			formData.append('image', data.image[i]);
		}

		// 태그 추가
		for (let i = 0; i < data.tag.length; i++) {
			if (getValues(`tag.${i}`) !== undefined) {
				formData.append('tag', data.tag[i]);
			}
		}

		axios
			.post('http://localhost:3001/feelsta-post', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((Response) => {
				console.log(Response);
				if (Response.status === 201) {
					alert('게시물 등록 완료!');
					//네비게이트 어디로
				} else {
					alert('게시물 등록이 실패했습니다. 다시 시도해주세요.');
				}
			})
			.catch((e) => console.log([data.image]));
	};

	return (
		<Container>
			<FeelstaForm onSubmit={handleSubmit(postFeelsta)}>
				<h2>게시글 작성</h2>
				<Title>
					<h4>제목</h4>
					<input
						type="text"
						{...register('title', {
							validate: {
								check: () => {
									if (
										getValues('title').length > 40 ||
										getValues('title').length < 2
									) {
										return '제목을 2~20자로 설정해주세요!';
									}
								},
							},
						})}
					/>
					{errors.title && <Error>{errors.title.message}</Error>}
				</Title>

				<Image>
					<h4>이미지</h4>
					<ImageBox>
						{/* // 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
						{showImages.map((image, id) => (
							<div key={id}>
								<img src={image} alt={`${image}-${id}`} />
								<button
									onClick={(e) => {
										e.preventDefault();
										handleDeleteImage(id);
									}}
								>
									<RiDeleteBin6Line />
								</button>
							</div>
						))}
						<label htmlFor="input-file" onChange={handleAddImages}>
							<input type="file" id="input-file" multiple />
							<PlusBtn>
								<FaPlus
									style={{
										fontSize: '40px',
									}}
								/>
							</PlusBtn>
						</label>
					</ImageBox>
				</Image>
				<Tag>
					<h4>태그 추가</h4>
					<h6>태그는 4개까지만 가능합니다</h6>
					<input type="text" {...register(`tag.${tagIndex}`)} id="tagInput" />
					<Chuga type="button" onClick={plusTagAdd} id="addTagButton">
						추가
					</Chuga>
					<br />
					<ul>
						{Array.from({ length: tagIndex }, (_, index) => (
							<li key={index}>
								<PlusTag
									onClick={(e) => {
										e.preventDefault();
										handleDeleteTag(index);
									}}
								>
									{getValues(`tag.${index}`)}
								</PlusTag>
							</li>
						))}
					</ul>
				</Tag>
				<Des>
					<h4>내용</h4>
					<textarea name="description" {...register('description')} />
				</Des>
				<Done>작성완료</Done>
			</FeelstaForm>
		</Container>
	);
};

export default FeelStaCreate;
