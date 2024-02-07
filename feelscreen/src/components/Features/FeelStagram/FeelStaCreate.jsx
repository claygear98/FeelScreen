import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

const SignForm = {
	title: '',
	image: [],
	tag: ['', '', '', ''],
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
	width: 170px;
	margin-top: 10px;
	display: grid;
	grid-template-columns: repeat(2, 1fr); /* 2개의 열로 나눔 */
	grid-gap: 3px; /* 그리드 아이템 간의 간격 */
	.image-container {
		width: 80px;
		height: 80px;
		background-size: cover;
		background-position: center;
		border: 2px solid black;
		border-radius: 5px;
	}

	.image-container input {
		width: 100%;
		height: 100%;
		opacity: 0;
	}
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
	> button {
		margin-left: 10px;
		width: 50px;
		height: 20px;
	}
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		justify-content: flex-start;
	}
	h6 {
		color: red;
	}
`;

const PlusTag = styled.span`
	margin: 0 5px 0 5px;
	font-size: 15px;
	color: #4ecb71;
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
		// for (let i = 0; i < imageFields.length; i++) {
		const formData = new FormData();
		formData.append(imageFields, SignForm.image);
		register(`image`);
		// 	console.log(i);
		// 	console.log(getValues('image'));
		// }
		console.log(getValues('image'));
	}, [register('image'), watch]);

	const [tagIndex, setTagIndex] = useState(0);
	// const [imageSrcs, setImageSrcs] = useState(['', '', '', '']); // 이미지 src 상태

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
			}
			tagInput.value = '';
		}
	};

	// const encodeFileToBase64 = (fileBlob, index) => {
	// 	// 이미지의 인덱스 전달
	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(fileBlob);
	// 	reader.onload = () => {
	// 		const updatedImageSrcs = [...imageSrcs]; // 이미지 srcs 배열 복사
	// 		updatedImageSrcs[index] = reader.result; // 특정 인덱스에 새 이미지 데이터 업데이트
	// 		setImageSrcs(updatedImageSrcs); // 이미지 srcs 상태 업데이트
	// 		console.log(imageSrcs);
	// 	};
	// };

	const postFeelsta = (data) => {
		axios
			.post('http://localhost:3001/feelsta', {
				title: data.title,
				image: data.image,
				tag: data.tag.filter((item) => item !== undefined),
				description: data.description,
			})
			.then((Response) => {
				console.log(Response);
				if (Response.status === 201) {
					alert('게시물 등록 완료!');
					//네비게이트 어디로
				} else {
					alert('게시물 등록이 실패했습니다. 다시 시도해주세요.');
				}
			});
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
					{/* 눌러서 사진 등록 */}
					<ImageBox>
						<div
							className="image-container"
							// style={{ backgroundImage: `url(${imageSrcs[0]})` }}
						>
							<input
								type="file"
								name={`img1`} // 동적으로 이름 설정
								{...register(`image`)}
								onChange={(e) => {
									// encodeFileToBase64(e.target.files[0], 0); // 인덱스를 encodeFileToBase64 함수에 전달
									console.log(getValues('image'));
								}}
							/>
						</div>
						{/* <div
							className="image-container"
							style={{ backgroundImage: `url(${imageSrcs[1]})` }}
						>
							<input
								type="file"
								name={`img2`} // 동적으로 이름 설정
								{...register(`image.1`)}
								onChange={(e) => {
									encodeFileToBase64(e.target.files[0], 1); // 인덱스를 encodeFileToBase64 함수에 전달
									console.log(getValues(`image.1`));
								}}
							/>
						</div> */}
						{/* <div
							className="image-container"
							style={{ backgroundImage: `url(${imageSrcs[2]})` }}
						>
							<input
								type="file"
								name={`img3`} // 동적으로 이름 설정
								{...register(`image.2`)}
								onChange={(e) => {
									encodeFileToBase64(e.target.files[0], 2); // 인덱스를 encodeFileToBase64 함수에 전달
								}}
							/>
						</div>
						<div
							className="image-container"
							style={{ backgroundImage: `url(${imageSrcs[3]})` }}
						>
							<input
								type="file"
								name={`img4`} // 동적으로 이름 설정
								{...register(`image.3`)}
								onChange={(e) => {
									encodeFileToBase64(e.target.files[0], 3); // 인덱스를 encodeFileToBase64 함수에 전달
								}}
							/>
						</div> */}
					</ImageBox>
				</Image>
				<Tag>
					<h4>태그 추가</h4>
					<h6>태그는 4개까지만 가능합니다</h6>
					<input type="text" {...register(`tag.${tagIndex}`)} id="tagInput" />
					<button type="button" onClick={plusTagAdd} id="addTagButton">
						추가
					</button>
					<br />
					<ul>
						{Array.from({ length: tagIndex }, (_, index) => (
							<li key={index}>
								<PlusTag>{getValues(`tag.${index}`)}</PlusTag>
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
