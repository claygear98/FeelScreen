import React from 'react';
import styled from 'styled-components';
const ListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
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
const FeelStaList = () => {
	return (
		<ListContainer>
			<ListInfo>
				<button>게시물 정렬</button>
				<div>
					<input type="text"></input>
					<button>검색</button>
				</div>
			</ListInfo>
			<hr></hr>
			<ListItem>
				<Item>
					<ItemPreview>
						<ItemTop>
							<img
								src={'/assets/images/2f1.jpg'}
								alt=""
								style={{ width: '60px', height: '60px', borderRadius: '50%' }}
							/>
							<NameDate>
								<div>사과튀김</div>
								<div>2202.12.12</div>
							</NameDate>
						</ItemTop>
						<ItemSec>
							<div>
								이번주 토요일 일요일 필스크린에서 대회모드 개같이 조지실분 구함
								100/100000
							</div>
							<span>#ㄱㄱ</span>
							<span>#ㄱㄱ</span>
							<span>#ㄱㄱ</span>
						</ItemSec>
						<ItemImg>
							<img
								src={'/assets/images/2f1.jpg'}
								alt=""
								style={{ width: '300px', borderRadius: '10px' }}
							/>
						</ItemImg>
						<ItemBot>
							<Likes>
								<span>하트</span>
								<span>갯수</span>
							</Likes>
							<Comments>
								<span>댓글</span>
								<span>갯수</span>
							</Comments>
						</ItemBot>
					</ItemPreview>
				</Item>
			</ListItem>

			<button>글쓰기</button>
		</ListContainer>
	);
};

export default FeelStaList;
