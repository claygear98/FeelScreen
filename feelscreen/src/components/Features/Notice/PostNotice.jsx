import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ContentEditor from './Ckeditor/ContentEditor';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePreventGoBack from './usePreventGoBack';

const server_port = 'http://localhost:3001';

const PostNoticeFrom = styled.form`
	box-sizing: border-box;
	width: 100%;
	height: 600px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	input {
		width: 100%;
		height: 40px;
		font-size: 1.2em;
	}
	> div:last-child {
		padding-right: 10px;
		display: flex;
		justify-content: right;
	}
`;
const Submit = styled.div`
	width: 100px;
	height: 50px;
	color: #ffffff;
	font-size: 20px;
	line-height: 50px;
	display: block;
	background-color: #4ecb71;
`;
const TitleForm = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
`;
const Editor = styled.div`
	height: 400px;
	padding: 6px;
	.ck-editor__editable {
		height: 300px;
	}
	.ck-content {
		font-size: 12px;
	}
	.hi {
		width: 100%;
		height: 30px;
		background-color: #4ecb71;
		color: white;
		line-height: 30px;
	}
`;

const PostNotice = () => {
	const [Content, SetContent] = useState('');
	const [Title, SetTitle] = useState('');
	// const [editor, setEditor] = useState(null);

	const navigate = useNavigate();
	const handlePreventGoBack = () => {
		navigate('/');
	};

	usePreventGoBack(handlePreventGoBack);

	const onChangeTitle = useCallback(
		(e) => {
			SetTitle(e.target.value);
			console.log(Title);
		},
		[Title]
	);
	const onSubmitPost = (e) => {
		console.log(123);
		axios
			.post(`${server_port}/notice/post`, {
				title: Title,
				content: Content.replaceAll('"', "'"),
			})
			.then((Response) => {
				if (Response.data.success === true) {
					alert('등록성공!!');
					navigate('/notice/read');
				} else if (Response.data.success === false) {
					alert('실패했습니다! 다시 시도해주세요');
				}
				console.log(Response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<PostNoticeFrom>
			<TitleForm>
				<h2>공지 제목</h2>
				<textarea
					cols={45}
					placeholder="공지제목을 입력해 주세요"
					onChange={onChangeTitle}
					value={Title}
				/>
			</TitleForm>
			<Editor>
				<div className="hi">본문내용</div>
				<ContentEditor SetContent={SetContent} data={Content} />
			</Editor>
			<div>
				<Submit onClick={onSubmitPost}>작성완료</Submit>
			</div>
		</PostNoticeFrom>
	);
};

export default PostNotice;
