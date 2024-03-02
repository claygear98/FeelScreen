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
	const [sortList, setSortList] = useState('latest');

	const handleFilterChange = (e) => {
		setSortList(e.target.value);
	};

	//검색결과 에 따라서 렌더링 시킬꺼 난항을 겪는중

	const getList = () => {
		axios.get(`http://localhost:3001/feelsta`).then((response) => {
			console.log(response);
			if (response.data.success === true) {
				let dataList = response.data.feelsta;
				// let dataList = [
				// 	{
				// 		FEELSTA_ID: 1,
				// 		PROFILEIMAGE: '../public/logo192.png',
				// 		USERNAME: '사과튀김',
				// 		FEELSTA_DATE: '2024-02-02',
				// 		FEELSTA_TAG: '#야호,#간만세,#검색기능구현,#마뜨급나',

				// 		FEELSTA_IMAGE: '../public/logo192.png',
				// 		FEELSTA_LIKE: 1232,
				// 		FEELSTA_CONTENT: '골프함칠사람없나요?1',
				// 		COMMENTS: 1123,
				// 	},
				// 	{
				// 		FEELSTA_ID: 2,
				// 		PROFILEIMAGE: '../public/logo192.png',
				// 		USERNAME: '사과튀김2',
				// 		FEELSTA_DATE: '2024-02-02',
				// 		FEELSTA_TAG: '#야호,#간만세,#검색기능구현',
				// 		FEELSTA_IMAGE: '../public/logo192.png',
				// 		FEELSTA_LIKE: 1233,
				// 		FEELSTA_CONTENT: '골프함칠사람없나요?123',
				// 		COMMENTS: 1123,
				// 	},
				// 	{
				// 		FEELSTA_ID: 3,
				// 		PROFILEIMAGE: '../public/logo192.png',
				// 		USERNAME: '사과튀김3',
				// 		FEELSTA_DATE: '2024-02-02',
				// 		FEELSTA_TAG: '#야호,#간만세,#검색기능구현',
				// 		FEELSTA_IMAGE: '../public/logo192.png',
				// 		FEELSTA_LIKE: 1234,
				// 		FEELSTA_CONTENT: '골프함칠사람없나요?1442341',
				// 		COMMENTS: 1123,
				// 	},
				// ];
				if (sortList === 'latest') {
					dataList = dataList.sort((a, b) => {
						return new Date(b.FEELSTA_DATE) - new Date(a.FEELSTA_DATE);
					});
				} else if (sortList === 'likest') {
					dataList = dataList.sort((a, b) => b.FEELSTA_LIKE - a.FEELSTA_LIKE);
				}
				setFeelstaList(dataList);
			}
		});
	};

	// 데이터를 동기적으로 가져오기 위해 useEffect 내부에서 getList 함수 호출
	useEffect(() => {
		console.log(2);
		getList();
	}, [sortList]); // sortList 전달하여 sortList값이 변경 될 때만 호출되도록 함

	const [toSearch, setToSearch] = useState('');
	const [searchType, setSearchType] = useState('fromtitle');

	const handleSearchChange = (e) => {
		setSearchType(e.target.value);
	};

	const handleTypeChange = (e) => {
		setToSearch(e.target.value);
	};

	const searchSubmit = () => {
		axios.get(`http://localhost:3001/feelsta`).then((response) => {
			console.log(response);
			if (response.data.success === true) {
				let dataLists = response.data.feelsta;
				// let dataLists = [
				// 	{
				// 		FEELSTA_ID: 1,
				// 		PROFILEIMAGE: '../public/logo192.png',
				// 		USERNAME: '사과튀김',
				// 		FEELSTA_DATE: '2024-02-02',
				// 		FEELSTA_TAG: '#야호,#간만세,#검색기능구현,#마뜨급나',
				// 		FEELSTA_IMAGE: '../public/logo192.png',
				// 		FEELSTA_LIKE: 1232,
				// 		FEELSTA_CONTENT: '골프함칠사람없나요?1',
				// 		COMMENTS: 1123,
				// 	},
				// 	{
				// 		FEELSTA_ID: 2,

				// 		PROFILEIMAGE: '../public/logo192.png',
				// 		USERNAME: '사과튀김2',
				// 		FEELSTA_DATE: '2024-02-02',
				// 		FEELSTA_TAG: '#야호,#간만세,#검색기능구현',
				// 		FEELSTA_IMAGE: '../public/logo192.png',
				// 		FEELSTA_LIKE: 1233,
				// 		FEELSTA_CONTENT: '골프함칠사람없나요?123',
				// 		COMMENTS: 1123,
				// 	},
				// 	{
				// 		FEELSTA_ID: 3,

				// 		PROFILEIMAGE: '../public/logo192.png',
				// 		USERNAME: '사과튀김3',
				// 		FEELSTA_DATE: '2024-02-02',
				// 		FEELSTA_TAG: '#야호,#간만세,#검색기능구현',
				// 		FEELSTA_IMAGE: '../public/logo192.png',
				// 		FEELSTA_LIKE: 1234,
				// 		FEELSTA_CONTENT: '골프함칠사람없나요?1442341',
				// 		COMMENTS: 1123,
				// 	},
				// ];
				if (searchType === 'fromtitle') {
					dataLists = dataLists.filter((item) =>
						item.FEELSTA_CONTENT.includes(toSearch)
					);
					console.log(dataLists);
				} else if (searchType === 'tagging') {
					dataLists = dataLists.filter((item) =>
						item.FEELSTA_TAG.includes(toSearch)
					);
					console.log(dataLists);
				}
				setFeelstaList(dataLists);
			}
		});
	};

	const navigate = useNavigate();

	return (
		<ListContainer>
			<ListInfo>
				<select name="selection" id="selection" onChange={handleFilterChange}>
					<option value="latest">최신순</option>
					<option value="likest">추천순</option>
				</select>
				<div>
					<select name="search" id="search" onChange={handleSearchChange}>
						<option value="fromtitle">제목</option>
						<option value="tagging">태그</option>
					</select>
					<input
						type="text"
						value={toSearch}
						onChange={handleTypeChange}
						placeholder="검색어를 입력하세요"
					></input>
					<button
						onClick={(e) => {
							e.preventDefault();
							searchSubmit();
						}}
					>
						검색
					</button>
				</div>
			</ListInfo>
			<hr></hr>
			<ListItem>
				{feelstaList.map((a, i) => (
					<Item
						onClick={() => {
							navigate(`/feelstadetail/${a.FEELSTA_ID}`, {
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
								{a.FEELSTA_TAG.split(',').map((tag, index) => (
									<span key={index}>{tag}</span>
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
