import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import Gallery from './Gallery';
import { MdDeleteForever } from 'react-icons/md';
import { GoPencil } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import useHeaderInfo from '../Header/HeadStore';
import tokenCheckAxios from '../../../hooks/customAxios';
// import { token } from 'aligoapi';

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
	width: 330px;
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

const Control = styled.div`
	display: flex;
	font-size: 30px;
	cursor: pointer;
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
	const navigate = useNavigate();
	const { state } = useLocation();
	const [feelsta, setFeelsta] = useState({});
	const [commentsLists, setCommentsLists] = useState([]);

	const [isModify, setIsModify] = useState(false);

	const callDetail = () => {
		console.log(state);
		axios
			.get(`http://localhost:3001/feelsta/detail?feelsta_id=${state}`)
			.then((res) => {
				console.log(res.data);
				if (res.data.success === true) {
					// Feelsta 데이터를 상태에 설정
					setFeelsta(res.data.feelsta[0]);
					// Comment 데이터를 상태에 설정
					setCommentsLists(res.data.feelsta[0].COMMENTS);
					if (feelsta[0].LIKE_NAME && feelsta[0].LIKE_NAME.includes(username)) {
						setIsHeart(true);
					} else {
						setIsHeart(false);
					}
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
	const [modi, setModi] = useState('');
	const [newComment, setNewComment] = useState([]);
	const cookies = new Cookies();

	const [isHeart, setIsHeart] = useState(false);

	const { username, userImage } = useHeaderInfo();
	const handleHeart = (feelstaId) => {
		if (isHeart === false) {
			tokenCheckAxios
				.get(`http://localhost:3001/feelsta/likes`, {
					headers: {
						Authorization: cookies.get('Authorization'),
						feelsta_id: feelstaId,
					},
				})
				.then(setIsHeart(!isHeart));
		} else {
			tokenCheckAxios
				.delete(`http://localhost:3001/feelsta/likes`, {
					headers: {
						Authorization: cookies.get('Authorization'),
						feelsta_id: feelstaId,
					},
				})
				.then(setIsHeart(!isHeart));
		}
	};

	const handleComment = (e) => {
		const comment = e.target.value;
		setPlus(comment);
		console.log(plus);
	};

	const handleCommentSubmit = () => {
		if (plus !== '') {
			tokenCheckAxios
				.post('http://localhost:3001/feelsta/comment-register', {
					Authorization: cookies.get('Authorization'),
					feelsta_id: state,
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

	const deleteComment = (e) => {
		tokenCheckAxios.delete('/feelsta/comment-delete', {
			Authorization: cookies.get('Authorization'),
			feelsta_id: state,
			comment_id: commentsLists.COMMENT_ID,
		});
	};

	const changeComment = (e) => {
		const changer = e.target.value;
		setModi(changer);
	};

	const modifyComment = () => {
		tokenCheckAxios.patch('/feelsta/comment-modify', {
			Authorization: cookies.get('Authorization'),
			feelsta_id: state,
			comment_id: commentsLists.COMMENT_ID,
			comment: modi,
		});
	};

	const commenting = useCallback(() => {
		return newComment.map((a, i) => (
			<CommentList key={i}>
				<Comment>
					<img
						src={`/${userImage}`}
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
	}, [newComment, userImage, username]);

	useEffect(() => {
		commenting();
	}, [commenting]);

	const deletePost = () => {
		axios.delete('http://localhost:3001/feelsta/delete', {
			headers: {
				Authorization: cookies.get('Authorization'),
				feelsta_id: state,
			},
		});
	};

	// 토큰확인하고 본인이면 수정 삭제 버튼 처 만들기
	return (
		<DetailContainer>
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
					<Control>
						<GoPencil
							onClick={() => navigate(`/feelsta/modify?feelsta_id=${state}`)}
						/>
						<MdDeleteForever onClick={deletePost} />
					</Control>
				</ItemTop>
				<ItemSec>
					<div>{feelsta.FEELSTA_CONTENT}</div>
					{feelsta.FEELSTA_TAG &&
						feelsta.FEELSTA_TAG.split(',').map((a, i) => (
							<span key={i}>{a}</span>
						))}
				</ItemSec>
				<ItemImg>
					{feelsta.FEELSTA_IMAGE && (
						<Gallery images={feelsta.FEELSTA_IMAGE.split(',')} />
					)}
				</ItemImg>
				<ItemBot>
					<Likes>
						<span
							className="heartPush"
							onClick={() => {
								handleHeart(feelsta.FEELSTA_ID);
							}}
						>
							{isHeart ? <FaHeart /> : <FaRegHeart />}
						</span>
						<span>
							{isHeart ? feelsta.FEELSTA_LIKE + 1 : feelsta.FEELSTA_LIKE}
						</span>
					</Likes>
					<Comments>
						<span>
							<FaRegCommentAlt />
						</span>

						{commentsLists && commentsLists.length > 0 ? (
							<span>{commentsLists.length}</span>
						) : (
							<span>0</span>
						)}
					</Comments>
				</ItemBot>
				<div>
					{commentsLists &&
						commentsLists.map((a) => (
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
										<div>{a.USERNAME}</div>
										{isModify ? (
											<div>
												<input
													type="text"
													defaultValue={a.COMMENT_CONTENT}
													onChange={changeComment}
												/>
												<span
													onClick={() => {
														modifyComment();
														setIsModify(false);
													}}
												>
													수정하기
												</span>
											</div>
										) : (
											<div>{a.COMMENT_CONTENT}</div>
										)}

										<div>
											<span
												onClick={() => {
													setIsModify(true);
												}}
											>
												<GoPencil />
											</span>
											<span
												onClick={() => {
													deleteComment();
												}}
											>
												<MdDeleteForever />
											</span>
										</div>
									</div>
								</Comment>
							</CommentList>
						))}
					{commenting()}
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
