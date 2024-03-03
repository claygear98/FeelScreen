import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FeelMin = () => {
	const navigate = useNavigate();

	return (
		<div>
			{/* <div>
				<div>
					<div>
						<img
							src={props.PROFILEIMAGE}
							alt=""
							style={{ width: '30px', height: '30px', borderRadius: '50%' }}
						/>
						<div>
							<div>{props.USERNAME}</div>
							<div>{props.FEELSTA_DATE}</div>
						</div>
					</div>
					<div>
						<div>{props.FEELSTA_CONTENT}</div>
					</div>
					<div
						onClick={() => {
							navigate(`/feelstadetail/${props.FEELSTA_ID}`, {
								state: props.FEELSTA_ID,
							});
						}}
					>
						<img
							src={props.PROFILEIMAGE}
							alt=""
							style={{ width: '150px', borderRadius: '10px' }}
						/>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default FeelMin;
