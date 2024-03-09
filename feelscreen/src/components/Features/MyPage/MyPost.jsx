import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tokenCheckAxios from '../../../hooks/customAxios';
import { Cookies } from 'react-cookie';
const SeeMyPost = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: 0 auto;
	margin-bottom: 20px;
	hr {
		width: 95%;
		border: 0;
		height: 2px;
		background-color: black;
		margin: 10px 0;
	}
	> div {
		text-align: left;
		width: 95%;
		display: flex;
		justify-content: flex-start;
		padding-left: 10px;
		> button {
			margin-left: 10px;
		}
	}
`;
const MyPostList = styled.ul`
	width: 90%;
	list-style: none;
	margin: 0;
	padding: 0;
	margin-top: 10px;
`;
const MyPostBox = styled.div`
	margin: 0 auto;
	width: 100%;
	height: 100px;
	border: 2px solid black;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
`;
const PostPic = styled.div`
	margin: 10px;
	width: 80px;
	height: 80px;
	background-color: #061d31;
	border-radius: 10px;
`;
const PostDescription = styled.div`
	margin: 10px;
	width: 280px;
	text-align: left;
	font-size: 13px;
	div {
		margin-bottom: 5px;
	}
`;
const MyPost = () => {
	const cookies = new Cookies();
	const [mPost, setMPost] = useState([]);
	const getMyPost = () => {
		tokenCheckAxios
			.get('http://localhost:3001/user-feelsta', {
				headers: {
					Authorization: cookies.get('Authorization'),
				},
			})
			.then((res) => {
				// setMPost(res.data.feelsta);
			});
	};

	useEffect(() => {
		getMyPost();
	}, []);
	return (
		<SeeMyPost>
			<div>
				<h4>내가 쓴글</h4>
				<button>필터</button>
			</div>
			<hr />
			<MyPostList>
				{mPost.map((a, i) => (
					<li key={i}>
						<MyPostBox>
							<PostPic>사진</PostPic>
							<PostDescription>
								<div>이번주에 스크린 같이 치실 분~?</div>
								<div>2023.12.12</div>
							</PostDescription>
						</MyPostBox>
					</li>
				))}
			</MyPostList>
		</SeeMyPost>
	);
};

export default MyPost;
