import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FeelMinContainer = styled.div`
	width: 390px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	font-size: 10px;
`;
const FeelMinItem = styled.div`
	width: 113px;
	height: 110px;
	border: 1.5px solid black;
	border-radius: 10px;
	text-align: left;
	padding: 5px;
`;

const ItemTop = styled.div`
	width: 110px;
	display: flex;
	margin-bottom: 5px;
	> img {
		border: 2px solid black;
		margin-right: 8px;
	}
`;

const ItemContent = styled.div`
	width: 110px;
	height: 70px;
	border: 1px solid black;
	> div > img {
		width: 110px;
		border: 1px solid black;
	}
`;

const FeelMin = () => {
	const navigate = useNavigate();

	const [min, setMin] = useState([]);
	// const flowThree = () => {
	// axios.get('http://localhost:3001/feelstar-mini').then((res) => {
	// setMin(res.data.뭐든)
	// });
	// };

	let test = [0, 1, 2];
	return (
		<FeelMinContainer>
			{test.map((a, i) => (
				<FeelMinItem key={i}>
					<ItemTop>
						<img
							src="../public/logo192.png"
							alt=""
							style={{ width: '30px', height: '30px', borderRadius: '50%' }}
						/>
						<div>
							<div>서원준</div>
							<div style={{ fontSize: '8px' }}>2024-02-05</div>
						</div>
					</ItemTop>
					<ItemContent>
						<h5>스크린 조지깅</h5>
						<div
						// onClick={() => {
						// 	navigate(`/feelstadetail/${props.FEELSTA_ID}`, {
						// 		state: props.FEELSTA_ID,
						// 	});
						// }}
						>
							<img src="../public/assets/0f.png" alt="" />
						</div>
					</ItemContent>
				</FeelMinItem>
			))}
		</FeelMinContainer>
	);
};

export default FeelMin;
