import { useState } from 'react';
import React from 'react';
import useHeaderInfo from '../Header/HeadStore';
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
	const { username } = useHeaderInfo();

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
			axios
				.get(`http://localhost:3001/feelsta/postlike`, {
					headers: {
						Authorization: cookies.get('Authorization'),
						feelsta_id: feelstaId,
					},
				})
				.then(setIsHeart(true));
		} else {
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
		<Likes>
			<span
				className="heartPush"
				onClick={(e) => {
					e.preventDefault();
					handleHeart(props.FEELSTA_ID);
				}}
			>
				{isHeart ? <FaHeart /> : <FaRegHeart />}
			</span>

			<span>{isHeart ? props.FEELSTA_LIKE + 1 : props.FEELSTA_LIKE}</span>
		</Likes>
	);
};

export default FeelstaLike;
