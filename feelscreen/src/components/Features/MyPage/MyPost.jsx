import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tokenCheckAxios from '../../../hooks/customAxios';
import { Cookies } from 'react-cookie';
import axios from 'axios';
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
const PostPic = styled.img`
	margin: 10px;
	width: 80px;
	height: 80px;
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
		// tokenCheckAxios
		axios
			.get('http://localhost:3001/user-feelsta', {
				headers: {
					Authorization: cookies.get('Authorization'),
				},
			})
			.then((res) => {
				// console.log(res.data.user);
				setMPost(res.data.user);
			});
	};

	useEffect(() => {
		getMyPost();
	}, []);

	return (
		<SeeMyPost>
			<div>
				<h4>내가 쓴글</h4>
			</div>
			<hr />
			<MyPostList>
				{mPost.map((a, i) => (
					<li key={i}>
						<MyPostBox>
							<PostPic
								src={a.FEELSTA_IMAGE && a.FEELSTA_IMAGE.split(',')[0]}
								alt=""
							/>
							<PostDescription>
								<div>{a.FEELSTA_CONTENT}</div>
								<div>{a.FEELSTA_DATE}</div>
							</PostDescription>
						</MyPostBox>
					</li>
				))}
			</MyPostList>
		</SeeMyPost>
	);
};

export default MyPost;
