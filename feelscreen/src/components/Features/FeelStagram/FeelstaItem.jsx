import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Cookies } from 'react-cookie';

import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';

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

const FeelstaItem = (props) => {
	const [isHeart, setIsHeart] = useState(false);

	const cookies = new Cookies();

	const handleHeart = (feelstaId) => {
		if (isHeart === false) {
			axios
				.get(`http://localhost:3001/feelstalike`, {
					headers: {
						Authorization: cookies.get('Authorization'),
						feelsta_id: feelstaId,
					},
				})
				.then(setIsHeart(!isHeart));
		} else {
			axios
				.delete(`http://localhost:3001/feelstalike`, {
					headers: {
						Authorization: cookies.get('Authorization'),
						feelsta_id: feelstaId,
					},
				})
				.then(setIsHeart(!isHeart));
		}
	};

	const navigate = useNavigate();

	return (
		<div>
			<Item>
				<ItemPreview>
					<ItemTop>
						<img
							src={props.PROFILEIMAGE}
							alt=""
							style={{ width: '60px', height: '60px', borderRadius: '50%' }}
						/>
						<NameDate>
							<div>{props.USERNAME}</div>
							<div>{props.FEELSTA_DATE}</div>
						</NameDate>
					</ItemTop>
					<ItemSec>
						<div>{props.FEELSTA_CONTENT}</div>
						{props.FEELSTA_TAG.split(',').map((tag, index) => (
							<span key={index}>{tag}</span>
						))}
					</ItemSec>
					<ItemImg
						onClick={() => {
							navigate(`/feelstadetail/${props.FEELSTA_ID}`, {
								state: props.FEELSTA_ID,
							});
						}}
					>
						<img
							src={props.FEELSTA_IMAGE}
							alt=""
							style={{ width: '300px', borderRadius: '10px' }}
						/>
					</ItemImg>
					<ItemBot>
						<Likes>
							<span
								className="heartPush"
								onClick={() => {
									handleHeart(props.FEELSTA_ID);
								}}
							>
								{isHeart ? <FaHeart /> : <FaRegHeart />}
							</span>

							<span>
								{isHeart ? props.FEELSTA_LIKE + 1 : props.FEELSTA_LIKE}
							</span>
						</Likes>
						<Comments>
							<span>
								<FaRegCommentAlt />
							</span>
							<span>{props.COMMENTS}</span>
						</Comments>
					</ItemBot>
				</ItemPreview>
			</Item>
		</div>
	);
};

export default FeelstaItem;
