import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeelstaItem from './FeelstaItem';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

const ListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
`;

const ListInfo = styled.div`
	display: flex;
	justify-content: space-around;
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

const SizeContainer = styled.div`
	width: 400px;
	height: 500px;
`;

const FeelStaList = () => {
	const [feelstaList, setFeelstaList] = useState([]);
	const [sortList, setSortList] = useState('latest');
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const handleFilterChange = (e) => {
		setSortList(e.target.value);
	};

	const getList = () => {
		axios.get(`http://localhost:3001/feelsta`).then((response) => {
			console.log(response);
			if (response.data.success === true) {
				let dataList = response.data.feelsta;
				if (sortList === 'latest') {
					dataList = dataList.sort(
						(a, b) => new Date(b.FEELSTA_DATE) - new Date(a.FEELSTA_DATE)
					);
				} else if (sortList === 'likest') {
					dataList = dataList.sort((a, b) => b.FEELSTA_LIKE - a.FEELSTA_LIKE);
				}
				setFeelstaList(dataList);
			}
		});
	};

	useEffect(() => {
		console.log(2);
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
		axios.get(`http://localhost:3001/feelsta`).then((response) => {
			console.log(response);
			if (response.data.success === true) {
				let dataLists = response.data.feelsta;

				if (searchType === 'fromtitle') {
					dataLists = dataLists.filter((item) =>
						item.FEELSTA_CONTENT.includes(toSearch)
					);
				} else if (searchType === 'tagging') {
					dataLists = dataLists.filter((item) =>
						item.FEELSTA_TAG.includes(toSearch)
					);
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
			{/* <ListItem> */}
			<SizeContainer>
				<AutoSizer>
					{({ width, height }) => (
						<InfiniteLoader>
							<List
								height={height}
								itemCount={feelstaList.length}
								width={width}
								itemSize={350}
							>
								{({ index, style }) => (
									<div style={style}>
										<FeelstaItem
											key={feelstaList[index].FEELSTA_ID}
											PROFILEIMAGE={feelstaList[index].PROFILEIMAGE}
											USERNAME={feelstaList[index].USERNAME}
											FEELSTA_DATE={feelstaList[index].FEELSTA_DATE}
											FEELSTA_CONTENT={feelstaList[index].FEELSTA_CONTENT}
											FEELSTA_TAG={feelstaList[index].FEELSTA_TAG}
											FEELSTA_ID={feelstaList[index].FEELSTA_ID}
											FEELSTA_LIKE={feelstaList[index].FEELSTA_LIKE}
											FEELSTA_IMAGE={feelstaList[index].FEELSTA_IMAGE}
											COMMENTS={feelstaList[index].COMMENTS}
											LIKE_NAME={feelstaList[index].LIKE_NAME}
										/>
									</div>
								)}
							</List>
						</InfiniteLoader>
					)}
				</AutoSizer>
			</SizeContainer>

			{/* </ListItem> */}
			<Poster onClick={() => navigate('/feelstacreate')}>글쓰기</Poster>
		</ListContainer>
	);
};

export default FeelStaList;
