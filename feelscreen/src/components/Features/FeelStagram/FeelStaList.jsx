import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeelstaItem from './FeelstaItem';
import { useInView } from 'react-intersection-observer';

const ListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
`;

const ListInfo = styled.div`
	display: flex;
	justify-content: space-around;
`;

const ListItem = styled.div`
	width: 100%;
	height: 500px;
	list-style: none;
	margin: 0;
	overflow: auto;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ObserverDiv = styled.div`
	width: 100%;
	height: 150px;
	background-color: black;
	opacity: 0;
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
	const [stackList, setStackList] = useState([]);
	const [sortList, setSortList] = useState('latest');
	const [ref, inView] = useInView();
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [end, setEnd] = useState(false);

	const handleFilterChange = (e) => {
		setSortList(e.target.value);
	};

	const [toSearch, setToSearch] = useState('');
	const [searchType, setSearchType] = useState('fromtitle');

	const handleSearchChange = (e) => {
		setSearchType(e.target.value);
	};

	const handleTypeChange = (e) => {
		setToSearch(e.target.value);
	};

	const searchSubmit = () => {
		// feelsta-search로 바꾸던지 해야됨
		axios
			.get(`http://localhost:3001/feelsta/search`, {
				headers: {
					type: searchType,
					search: toSearch,
				},
			})
			.then((response) => {
				console.log(response);
				if (response.data.success === true) {
					let dataLists = response.data.feelsta;
					setStackList(dataLists);
				}
			});
	};

	//새로 만들기
	const productFetch = () => {
		if (!loading && !end) {
			setLoading(true);
			if (sortList === 'latest') {
				axios
					.get(`http://localhost:3001/feelsta/view`, {
						headers: {
							counter: page,
						},
					})
					.then((response) => {
						if (response.data.success === true) {
							let dataLists = response.data.feelsta;
							setStackList((prevStackList) => [...prevStackList, ...dataLists]);
							setPage((prevPage) => prevPage++);
							if (response.data.end === true) {
								setEnd(true);
							}
						}
					})
					.catch((err) => {
						console.log(err);
					})
					.finally(() => {
						setLoading(false);
					});
			} else if (sortList === 'likest') {
				axios
					.get(`http://localhost:3001/feelstalikes`, {
						headers: {
							counter: page,
						},
					})
					.then((response) => {
						if (response.data.success === true) {
							let dataLists = response.data.feelsta;
							setStackList((prevStackList) => [...prevStackList, ...dataLists]);
							setPage((prevPage) => prevPage++);
						}
						if (response.data.end === true) {
							setEnd(true);
						}
					})
					.catch((err) => {
						console.log(err);
					})
					.finally(() => {
						setLoading(false);
					});
			}
		}
	};
	// 마지막 요소를 보낼때 마지막이라는 걸 확인할수있어야 하니까 전송할 데이터가 3개 이하일 경우 end: true 이런식으로 보내주라

	useEffect(() => {
		// inView가 true 일때만 실행한다.
		if (inView && !end) {
			console.log(inView, '무한 스크롤 요청 🎃');

			productFetch();
		}
	}, [inView, end]);

	useEffect(() => {
		setPage(0);
		setStackList([]);
	}, [sortList]);

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
				{stackList &&
					stackList.map((feelsta) => (
						<FeelstaItem
							key={feelsta.FEELSTA_ID}
							PROFILEIMAGE={feelsta.PROFILEIMAGE}
							USERNAME={feelsta.USERNAME}
							FEELSTA_DATE={feelsta.FEELSTA_DATE}
							FEELSTA_CONTENT={feelsta.FEELSTA_CONTENT}
							FEELSTA_TAG={feelsta.FEELSTA_TAG}
							FEELSTA_ID={feelsta.FEELSTA_ID}
							FEELSTA_LIKE={feelsta.FEELSTA_LIKE}
							FEELSTA_IMAGE={feelsta.FEELSTA_IMAGE}
							COMMENTS={feelsta.COMMENTS}
							LIKE_NAME={feelsta.LIKE_NAME}
						/>
					))}
				{end && <div>더 이상 데이터가 없습니다.</div>}
				<ObserverDiv ref={ref}>;l;;;;;</ObserverDiv>
			</ListItem>
			<Poster onClick={() => navigate('http://localhost:3001/feelsta/post')}>
				글쓰기
			</Poster>
		</ListContainer>
	);
};

export default FeelStaList;
