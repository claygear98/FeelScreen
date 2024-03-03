import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // axios import 주석 처리

import FeelstaItem from './FeelstaItem';

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

	const dummyData = [
		{
			PROFILEIMAGE: 'profile_image_url_1',
			USERNAME: 'User 1',
			FEELSTA_DATE: '2024-03-04',
			FEELSTA_CONTENT: 'Feelsta content 1',
			FEELSTA_TAG: 'tag1, tag2',
			FEELSTA_ID: 1,
			FEELSTA_LIKE: 10,
			COMMENTS: 5,
		},
		{
			PROFILEIMAGE: 'profile_image_url_2',
			USERNAME: 'User 2',
			FEELSTA_DATE: '2024-03-03',
			FEELSTA_CONTENT: 'Feelsta content 2',
			FEELSTA_TAG: 'tag3, tag4',
			FEELSTA_ID: 2,
			FEELSTA_LIKE: 20,
			COMMENTS: 8,
		},
		// Add more dummy data as needed
	];

	const getList = () => {
		// Simulate API call with dummy data
		// axios.get(`http://localhost:3001/feelsta`).then((response) => {
		// 	console.log(response);
		// 	if (response.data.success === true) {
		// 		let dataList = response.data.feelsta;
		// 		if (sortList === 'latest') {
		// 			dataList = dataList.sort((a, b) => new Date(b.FEELSTA_DATE) - new Date(a.FEELSTA_DATE));
		// 		} else if (sortList === 'likest') {
		// 			dataList = dataList.sort((a, b) => b.FEELSTA_LIKE - a.FEELSTA_LIKE);
		// 		}
		// 		setFeelstaList(dataList);
		// 	}
		// });

		// Set dummy data
		setFeelstaList(dummyData);
	};

	useEffect(() => {
		getList();
	}, [sortList]);

	const [toSearch, setToSearch] = useState('');
	const [searchType, setSearchType] = useState('fromtitle');

	const handleSearchChange = (e) => {
		setSearchType(e.target.value);
	};

	const handleTypeChange = (e) => {
		setToSearch(e.target.value);
	};

	const searchSubmit = () => {
		// Simulate search functionality
		// You can implement search logic here
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
			<hr />
			<ListItem>
				{feelstaList.map((feelsta) => (
					<FeelstaItem
						key={feelsta.FEELSTA_ID}
						PROFILEIMAGE={feelsta.PROFILEIMAGE}
						USERNAME={feelsta.USERNAME}
						FEELSTA_DATE={feelsta.FEELSTA_DATE}
						FEELSTA_CONTENT={feelsta.FEELSTA_CONTENT}
						FEELSTA_TAG={feelsta.FEELSTA_TAG}
						FEELSTA_ID={feelsta.FEELSTA_ID}
						FEELSTA_LIKE={feelsta.FEELSTA_LIKE}
						COMMENTS={feelsta.COMMENTS}
					/>
				))}
			</ListItem>
			<Poster onClick={() => navigate('/feelstacreate')}>글쓰기</Poster>
		</ListContainer>
	);
};

export default FeelStaList;
