import React, { useEffect } from 'react';
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
	> img {
		border: 1px solid black;
	}
`;

const FeelMin = () => {
	const navigate = useNavigate();

	const [min, setMin] = useState([]);
	const flowThree = () => {
		axios.get('http://localhost:3001/feelsta/min').then((res) => {
			setMin(res.data.result);
		});
	};

	useEffect(() => {
		flowThree();
	}, []);

	return (
		<FeelMinContainer>
			{min.map((a, i) => (
				<FeelMinItem key={i}>
					<div
						onClick={() => {
							navigate(`/feelstadetail/${a.FEELSTA_ID}`, {
								state: a.FEELSTA_ID,
							});
						}}
					>
						<ItemTop>
							<img
								src={a.PROFILEIMAGE}
								alt=""
								style={{ width: '30px', height: '30px', borderRadius: '50%' }}
							/>
							<div>
								<div>{a.USERNAME}</div>
								<div style={{ fontSize: '8px' }}>{a.FEELSTA_DATE}</div>
							</div>
						</ItemTop>
						<ItemContent>
							<h5>{a.FEELSTA_CONTENT}</h5>

							<img
								src={a.FEELSTA_IMAGE}
								alt=""
								style={{ width: '110px', height: '60px' }}
							/>
						</ItemContent>
					</div>
				</FeelMinItem>
			))}
		</FeelMinContainer>
	);
};

export default FeelMin;
