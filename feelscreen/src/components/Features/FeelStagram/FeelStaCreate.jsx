import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
const SignForm = {
	title: '',
	image: '',
	tag: [],
	description: '',
};
const FeelStaCreate = () => {
	// const cookies = new Cookies();
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm({
		mode: 'onChange',
		defaultValues: SignForm,
	});
	const FeelstaForm = styled.form``;

	const postFeelsta = (data) => {
		axios
			.post('http://localhost:3001/feelsta', {
				username: data.username,
				title: data.title,
				image: data.image,
				tag: data.tag,
				description: data.description,
			})
			.then((Response) => {
				console.log(Response.status);
				if (Response.status === 201) {
					alert('게시물 등록 완료!');
					// navigateToFeelsta();
				} else {
					alert('게시물 등록이 실패했습니다. 다시 시도해주세요.');
				}
			});
	};

	return (
		<FeelstaForm onSubmit={handleSubmit(postFeelsta)}>
			<h2>게시글 작성</h2>
		</FeelstaForm>
	);
};

export default FeelStaCreate;
