import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const DetailContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 15px;
`;

const ItemPreview = styled.div`
	width: 360px;
	border-radius: 10px;
	box-shadow: 1px 1px 7px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ItemTop = styled.div`
	margin-top: 15px;
	width: 300px;
	display: flex;
`;

const NameDate = styled.div`
	width: 200px;
	margin-left: 20px;
	text-align: left;
	div {
		margin-top: 10px;
		color: #555;
		font-size: 10px;
	}
	> div:first-child {
		margin-top: 15px;
		color: #222;
		font-size: 16px;
	}
`;
const ItemSec = styled.div`
	width: 300px;
	margin-top: 20px;
	text-align: left;
	font-size: 15px;
	margin-bottom: 10px;
	div {
		margin-bottom: 8px;
	}
	span {
		color: #4ecb71;
	}
`;
const ItemImg = styled.div`
	width: 300px;
`;
const ItemBot = styled.div`
	margin-top: 7px;
	width: 300px;
	margin-bottom: 10px;
	display: flex;
`;

const Likes = styled.span`
	span {
		margin: 0 5px 0 0;
	}
`;
const Comments = styled.span`
	span {
		margin: 0 5px 0 0;
	}
	margin-left: 10px;
`;

const CommentList = styled.ul`
	border-top: 2px solid black;
	width: 300px;
	list-style: none;
	padding: 0;
`;
const Comment = styled.li`
	margin-top: 10px;
	display: flex;
	text-align: left;
	> div {
		margin-left: 10px;
	}

	> div > div:first-child {
		font-size: 15px;
		margin-bottom: 5px;
	}

	> div > div {
		font-size: 13px;
	}
`;

const InputComment = styled.textarea`
	margin: 10px 0 10px 0;
	width: 270px;
	border: none;
	background-color: #cecece;
	border-radius: 10px 0px 0px 10px;
	border: 1px solid black;
	border-right: none;
	resize: none;
`;

const CommentSet = styled.div`
	display: flex;
	height: 50px;
	button {
		margin: 10px 0 10px 0;
		border-radius: 0px 10px 10px 0px;

		border: 1px solid black;
	}

	.scroll::-webkit-scrollbar {
		display: none;
	}
`;

const FeelStaDetail = () => {
	const { state } = useLocation();
	axios
		.get(`http://localhost:3001/feelstadetail?feelsta_id=${state}`)
		.then((res) => {
			if (res.success === true) {
				const CommentLists = res.comments;
				const details = res.feelsta;
			}
		});

	const [plus, setPlus] = useState('');
	const [newComment, setNewComment] = useState([]);
	const cookies = new Cookies();

	const [heart, setHeart] = useState(5);
	const [isHeart, setIsHeart] = useState(true);

	const handleHeart = () => {
		setIsHeart(!isHeart);
		if (isHeart === true) {
			setHeart(heart + 1);
		} else {
			setHeart(heart - 1);
		}
	};

	const handleComment = (e) => {
		const comment = e.target.value;
		setPlus(comment);
		console.log(plus);
	};

	const handleCommentSubmit = () => {
		if (plus !== '') {
			axios
				.post('http://localhost:3001/comment-register', {
					Authorization: cookies.get('Authorization'),
					Comment: plus,
				})
				.then((response) => {
					if (response.data.success === true) {
						let abc = newComment;
						abc.push(plus);
						setNewComment(abc);
						setPlus('');
						console.log(newComment);
					}
				});
		}
	};

	const createComment = useCallback(() => {
		console.log('aa');
		return newComment.map((a, i) => (
			<CommentList>
				<Comment key={i}>
					<img
						src={'/assets/images/2f1.jpg'}
						alt=""
						style={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
						}}
					/>
					<div>
						<div>사과튀김</div>
						<div>{a}</div>
					</div>
				</Comment>
			</CommentList>
		));
	}, [newComment]);

	return (
		<DetailContainer>
			<ItemPreview>
				<ItemTop>
					<img
						src={details.PROFILEIMAGE}
						alt=""
						style={{ width: '60px', height: '60px', borderRadius: '50%' }}
					/>
					<NameDate>
						<div>{details.USERNAME}</div>
						<div>{details.FEELSTA_DATE}</div>
					</NameDate>
				</ItemTop>
				<ItemSec>
					<div>{details.FEELSTA_CONTENT}</div>
					{details.FEELSTA_TAG.map((tag) => (
						<span>{tag}</span>
					))}
				</ItemSec>
				<ItemImg>
					<img
						src={details.FEELSTA_IMAGE}
						alt=""
						style={{ width: '300px', borderRadius: '10px' }}
					/>
				</ItemImg>
				<ItemBot>
					<Likes>
						<span className="heartPush" onClick={handleHeart}>
							{isHeart ? <FaRegHeart /> : <FaHeart />}
						</span>
						<span>{heart}</span>
					</Likes>
					<Comments>
						<span>
							<FaRegCommentAlt />
						</span>
						<span>{CommentLists.length}</span>
					</Comments>
				</ItemBot>
				<div>
					{CommentLists.map((a) => (
						<CommentList>
							<Comment>
								<img
									src={'/assets/images/2f1.jpg'}
									alt=""
									style={{ width: '30px', height: '30px', borderRadius: '50%' }}
								/>
								<div>
									<div>{a.comment_id}</div>
									<div>{a.comment}</div>
								</div>
							</Comment>
						</CommentList>
					))}
					{createComment()}
				</div>
				<CommentSet>
					<InputComment
						className="scroll"
						onChange={handleComment}
						value={plus}
					></InputComment>
					<button onClick={handleCommentSubmit}>댓글작성</button>
				</CommentSet>
			</ItemPreview>
		</DetailContainer>
	);
};

export default FeelStaDetail;
