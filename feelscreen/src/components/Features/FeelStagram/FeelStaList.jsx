import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
const ListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
`;
const ListInfo = styled.div`
	display: flex;
	justify-content: space-around;
`;

const ListItem = styled.ul`
	width: 100%;
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Item = styled.li`
	margin-top: 10px;
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

const Poster = styled.button`
	width: 110px;
	height: 50px;
	border: 2px solid black;
	border-radius: 20px;
	background-color: #acf4c0;
	font-size: 15px;
	position: fixed;
	bottom: 90px;
	right: 20px;
	opacity: 0.8;
`;

const FeelStaList = () => {
	const [feelstaList, setFeelstaList] = useState([]);
	const fetchData = () => {
		axios.get(`http://localhost:3001/feelsta`).then((response) => {
			if (response.data.success === true) {
				setFeelstaList(response.data.feelsta);
				console.log(feelstaList);
			}
		});
	};

	const navigate = useNavigate();

	// 데이터를 동기적으로 가져오기 위해 useEffect 내부에서 fetchData 함수 호출
	useEffect(() => {
		console.log(2);
		fetchData();
	}, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

	return (
		<ListContainer>
			<ListInfo>
				<button>게시물 정렬</button>
				<div>
					<input type="text"></input>
					<button>검색</button>
				</div>
			</ListInfo>
			<hr></hr>
			<ListItem>
				{console.log(1)}

				{console.log(feelstaList)}
				{feelstaList.map((a, i) => (
					<Item
						onClick={() => {
							navigate(`/feelstadetail/feelsta_id=${a.FEELSTA_ID}`, {
								state: a.FEELSTA_ID,
							});
						}}
						key={i}
					>
						<ItemPreview>
							<ItemTop>
								<img
									src={a.PROFILEIMAGE}
									alt=""
									style={{ width: '60px', height: '60px', borderRadius: '50%' }}
								/>
								<NameDate>
									<div>{a.USERNAME}</div>
									<div>{a.FEELSTA_DATE}</div>
								</NameDate>
							</ItemTop>
							<ItemSec>
								<div>{a.FEELSTA_CONTENT}</div>
								{a.FEELSTA_TAG.map((tag) => (
									<span>{tag}</span>
								))}
							</ItemSec>
							<ItemImg>
								<img
									src={a.PROFILEIMAGE}
									alt=""
									style={{ width: '300px', borderRadius: '10px' }}
								/>
							</ItemImg>
							<ItemBot>
								<Likes>
									<span>
										<FaRegHeart />
									</span>
									<span>{a.FEELSTA_LIKE}</span>
								</Likes>
								<Comments>
									<span>
										<FaRegCommentAlt />
									</span>
									<span>{a.COMMENTS}</span>
								</Comments>
							</ItemBot>
						</ItemPreview>
					</Item>
				))}
			</ListItem>

			<Poster onClick={() => navigate('/feelstacreate')}>글쓰기</Poster>
		</ListContainer>
	);
};

export default FeelStaList;
