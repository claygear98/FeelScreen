//not yet
import React, { useState } from 'react';
import styled from 'styled-components';
import ContentEditor from './Ckeditor/ContentEditor';
const PostNoticeFrom = styled.div`
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
	// const [Title, SetTitle] = useState('');
	// const [editor, setEditor] = useState(null);

	return (
		<PostNoticeFrom>
			<h1>공지 제목</h1>
			<textarea cols={50} placeholder="공지제목을 입력해 주세요" />
			<div className="hi">본문내용</div>
			<ContentEditor SetContent={SetContent} data={Content} />
			<button>작성완료</button>
		</PostNoticeFrom>
	);
};

export default PostNotice;
