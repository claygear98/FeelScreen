//not yet
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ContentEditor from './Ckeditor/ContentEditor';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const sever_port = 'http://localhost:3001';

const PostNoticeFrom = styled.form`
	.ck-editor__editable {
		height: 250px;
	}
	.ck-content {
		font-size: 12px;
	}
	.hi {
		width: 100%;
		height: 30px;
		background-color: blue;
		color: white;
		line-height: 30px;
	}
	input {
		width: 100%;
		height: 40px;
		font-size: 1.2em;
	}
`;
const PostNotice = () => {
	const [Content, SetContent] = useState('');
	const [Title, SetTitle] = useState('');
	// const [editor, setEditor] = useState(null);
	const navigate = useNavigate();
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
			.post(`${sever_port}/notice-post`, {
				title: Title,
				content: Content,
			})
			.then((Response) => {
				if (Response.sucess === 'true') {
					alert('등록성공!!');
					navigate('/notice/read');
				} else if (Response.sucess === 'false') {
					alert('실패했습니다! 다시 시도해주세요');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<PostNoticeFrom>
			<h1>공지 제목</h1>
			<textarea
				cols={50}
				placeholder="공지제목을 입력해 주세요"
				onChange={onChangeTitle}
				value={Title}
			/>
			<div className="hi">본문내용</div>
			<ContentEditor SetContent={SetContent} data={Content} />
			<div onClick={onSubmitPost}>작성완료</div>
		</PostNoticeFrom>
	);
};

export default PostNotice;
