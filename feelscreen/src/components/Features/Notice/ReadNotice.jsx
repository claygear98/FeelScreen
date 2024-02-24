import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

const server_port = 'http://localhost:3001';
const NoticeHeader = styled.div`
	box-sizing: border-box;
	padding: 10px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	> div:last-child {
		border: #d9d9d9 1px solid;
		background-color: #f3f2f2;
		padding: 3px;
		border-radius: 5px;
	}
`;
const NoticeCards = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	.noticeItem {
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background-color: #d9d9d9;
		> div:first-child {
			display: flex;
			gap: 10px;
		}
	}
`;
const ReadNotice = () => {
	const [noticeList, setNoticeList] = useState([]);

	const fetchNoticeList = useCallback(() => {
		axios
			.get(`${server_port}/notice`)
			.then((response) => {
				if (response.data.success === true) {
					setNoticeList(response.data.notice);
				} else {
					console.log('Failed to fetch notices');
				}
			})
			.catch((error) => {
				console.error('Error fetching notices:', error);
			});
	}, []);

	useEffect(() => {
		fetchNoticeList();
	}, [fetchNoticeList]);
	return (
		<div>
			<div>
				<NoticeHeader>
					<div>공지사항 및이벤트</div>
					<div className="">글쓰기</div>
				</NoticeHeader>
				{noticeList.length !== 0 ? (
					noticeList.map((notice) => (
						<NoticeCards>
							<div key={notice.notice_id} className="noticeItem">
								<div>
									<HiOutlineSpeakerphone
										style={{ color: '#d8f7e0', backgroundColor: '#4ecb71' }}
									/>
									<span>{notice.title}</span>
								</div>
								<div>사장님</div>
							</div>
						</NoticeCards>
					))
				) : (
					<NoticeCards>
						<div className="noticeItem">
							<div>
								<HiOutlineSpeakerphone style={{ color: '#d8f7e0' }} />
								<span>아직없음</span>
							</div>
							<div>사장님</div>
						</div>
						<div className="noticeItem">
							<div>
								<HiOutlineSpeakerphone style={{ color: '#d8f7e0' }} />
								<span>아직없음</span>
							</div>
							<div>사장님</div>
						</div>
						<div className="noticeItem">
							<div>
								<HiOutlineSpeakerphone style={{ color: '#d8f7e0' }} />
								<span>아직없음</span>
							</div>
							<div>사장님</div>
						</div>
					</NoticeCards>
				)}
			</div>
		</div>
	);
};

export default ReadNotice;
