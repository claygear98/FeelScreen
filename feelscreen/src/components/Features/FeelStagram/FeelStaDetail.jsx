import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useFetcher, useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import useHeaderInfo from '../Header/HeadStore';

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
		margin-right: 5px;
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

	const [feelsta, setFeelsta] = useState({});
	const [commentsLists, setCommentsLists] = useState([]);

	const callDetail = () => {
		axios
			.get(`http://localhost:3001/feelstadetail?feelsta_id=${state}`)
			.then((res) => {
				if (res.data.success === true) {
					// Feelsta 데이터를 상태에 설정
					setFeelsta(res.data.feelsta[0]);
					// Comment 데이터를 상태에 설정
					setCommentsLists(res.data.feelsta[0].COMMENTS);
				}
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			});
	};

	useEffect(() => {
		callDetail();
	}, []);

	const [plus, setPlus] = useState('');
	const [newComment, setNewComment] = useState([]);
	const cookies = new Cookies();

	const [isHeart, setIsHeart] = useState(true);

	const { username, userImage } = useHeaderInfo();
	const handleHeart = () => {
		setIsHeart(!isHeart);
		if (isHeart === true) {
			axios.get('http://localhost:3001//feelstalike', {
				headers: {
					Authorization: cookies.get('Authorization'),
					feelsta_id: username,
				},
			});
		} else {
			axios.delete('http://localhost:3001//feelstalike', {
				headers: {
					Authorization: cookies.get('Authorization'),
					feelsta_id: username,
				},
			});
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
	const commenting = useCallback(() => {
		return newComment.map((a, i) => (
			<CommentList>
				<Comment key={i}>
					<img
						src={userImage}
						alt=""
						style={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
						}}
					/>
					<div>
						<div>{username}</div>
						<div>{a}</div>
					</div>
				</Comment>
			</CommentList>
		));
	}, [newComment]);

	useEffect(() => {
		commenting();
	}, [commenting]);

	return (
		<DetailContainer>
			{
				<ItemPreview>
					<ItemTop>
						<img
							src={`/${feelsta.PROFILEIMAGE}`}
							alt=""
							style={{ width: '60px', height: '60px', borderRadius: '50%' }}
						/>
						<NameDate>
							<div>{feelsta.USERNAME}</div>
							<div>{feelsta.FEELSTA_DATE}</div>
						</NameDate>
					</ItemTop>
					<ItemSec>
						<div>{feelsta.FEELSTA_CONTENT}</div>
						{feelsta.FEELSTA_TAG &&
							feelsta.FEELSTA_TAG.split(',').map((a, i) => (
								<span key={i}>{a}</span>
							))}
					</ItemSec>
					<ItemImg>
						<img
							src={feelsta.FEELSTA_IMAGE}
							alt=""
							style={{ width: '300px', borderRadius: '10px' }}
						/>
					</ItemImg>
					<ItemBot>
						<Likes>
							<span className="heartPush" onClick={handleHeart}>
								{isHeart ? <FaRegHeart /> : <FaHeart />}
							</span>
							<span>{feelsta.FEELSTA_LIKE}</span>
						</Likes>
						<Comments>
							<span>
								<FaRegCommentAlt />
							</span>
							{/* 댓글이 없으면 오류가 납니다 list에서 들어갈때 이거 일단 길이가 0 보다 크면 뜨고 아니면 0으로 뜨게 해놔서 한번다시 해보세요 */}
							<span>{commentsLists.length > 0 ? commentsLists.length : 0}</span>
						</Comments>
					</ItemBot>
					<div>
						{commentsLists.map((a) => (
							<CommentList>
								<Comment>
									<img
										src={`/${a.PROFILEIMAGE}`}
										alt=""
										style={{
											width: '30px',
											height: '30px',
											borderRadius: '50%',
										}}
									/>
									<div>
										<div>{a.USER_ID}</div>
										<div>{a.COMMENT_CONTENT}</div>
									</div>
								</Comment>
							</CommentList>
						))}
						{commenting}
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
			}
		</DetailContainer>
	);
};

export default FeelStaDetail;
