import React, { useState, useEffect, useRef, useCallback } from 'react';
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
	const [stackList, setStackList] = useState([]);
	const [sortList, setSortList] = useState('latest');
	const [ref, inView] = useInView();
	const lastContentRef = useRef(null);
	// const reRender = useCallback(() => {
	// 	const options = {
	// 		threshold: 0.5,
	// 	};
	// 	const observer = new IntersectionObserver((entries) => {
	// 		if (entries[0].isIntersecting) {
	// 			axios
	// 				.get(`http://localhost:3001/feelsta`)
	// 				.then((response) => {
	// 					if (response.data.success === true) {
	// 						let dataLists = response.data.feelsta;
	// 						setStackList((prevStackList) => [...prevStackList, ...dataLists]);
	// 					}
	// 				})
	// 				.catch((err) => {
	// 					console.log(err);
	// 				});
	// 			console.log(stackList);
	// 			// observer.unobserve(lastContentRef.current); // 이 부분 추가
	// 		}
	// 	}, options);

	// 	observer.observe(lastContentRef.current);

	// 	return () => {
	// 		observer && observer.disconnect();
	// 	};
	// }, []);

	// useEffect(() => {
	// 	if (stackList.length !== 0) {
	// 		reRender();
	// 	}
	// }, []);

	const handleFilterChange = (e) => {
		setSortList(e.target.value);
		if (sortList === 'latest') {
			setStackList(
				stackList.sort(
					(a, b) => new Date(b.FEELSTA_DATE) - new Date(a.FEELSTA_DATE)
				)
			);
		} else if (sortList === 'likest') {
			setStackList(stackList.sort((a, b) => b.FEELSTA_LIKE - a.FEELSTA_LIKE));
		}
	};

	// const getList = () => {
	// 	axios.get(`http://localhost:3001/feelsta`).then((response) => {
	// 		console.log(response);
	// 		if (response.data.success === true) {
	// 			let dataList = response.data.feelsta;
	// 			setFeelstaList(dataList);
	// 			setStackList(dataList);
	// 		}
	// 	});
	// };

	// useEffect(() => {
	// 	getList();
	// }, []);

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
				setStackList(dataLists);
			}
		});
	};

	//새로 만들기
	const productFetch = () => {
		axios
			.get(`http://localhost:3001/feelsta`)
			.then((response) => {
				if (response.data.success === true) {
					let dataLists = response.data.feelsta;
					setStackList((prevStackList) => [...prevStackList, ...dataLists]);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		// inView가 true 일때만 실행한다.
		if (inView) {
			console.log(inView, '무한 스크롤 요청 🎃');

			productFetch();
		}
	}, [inView]);

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
				<div ref={ref}>ddddd</div>
			</ListItem>
			<Poster onClick={() => navigate('/feelstacreate')}>글쓰기</Poster>
		</ListContainer>
	);
};

export default FeelStaList;
