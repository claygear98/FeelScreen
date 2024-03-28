import { useState } from 'react';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import axios from 'axios';

const Likes = styled.span`
	span {
		margin: 0 5px 0 0;
	}
`;
const FeelstaLike = (props) => {
	const headerInfoString = localStorage.getItem('headerInfo');
	// JSON 형식의 문자열을 객체로 파싱
	const headerInfo = JSON.parse(headerInfoString);
	// headerInfo 객체에서 username 가져오기
	const username = headerInfo.username;
	// 가져온 username 콘솔에 출력
	console.log(username);
	const pushLikeBtn = () => {
		if (props.LIKE_NAME && props.LIKE_NAME.includes(username)) {
			return true;
		} else {
			return false;
		}
	};
	const [isHeart, setIsHeart] = useState(pushLikeBtn);
	const cookies = new Cookies();

	const handleHeart = (feelstaId) => {
		if (isHeart === false) {
			console.log('좋아요 누름');
			console.log(feelstaId);
			axios
				.get(`http://localhost:3001/feelsta/postlike`, {
					headers: {
						Authorization: cookies.get('Authorization'),
						feelsta_id: feelstaId,
					},
				})
				.then(setIsHeart(true));
		} else {
			console.log('좋아요 누름ww22');
			console.log(feelstaId);
			axios
				.delete(`http://localhost:3001/feelsta/postlike`, {
					headers: {
						Authorization: cookies.get('Authorization'),
						feelsta_id: feelstaId,
					},
				})
				.then(setIsHeart(false));
		}
	};
	return (
		<Likes
			onClick={(e) => {
				e.preventDefault();
				handleHeart(props.FEELSTA_ID);
			}}
		>
			<span className="heartPush">
				{isHeart ? <FaHeart /> : <FaRegHeart />}
			</span>

			<span>{isHeart ? props.FEELSTA_LIKE : props.FEELSTA_LIKE - 1}</span>
		</Likes>
	);
};

export default FeelstaLike;
