import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
const server_port = 'http://localhost:3001';

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
const NoticeItem = styled.div`
	display: flex;
	flex-direction: column;
	.title_writer {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background-color: #d9d9d9;
		border-radius: 5px;
	}
`;
const MinNotice = () => {
	const [noticeList, setNoticeList] = useState([]);
	const navigate = useNavigate();
	const fetchNoticeList = useCallback(() => {
		axios
			.get(`${server_port}/noticemin`)
			.then((res) => {
				if (res.data.success === true) {
					setNoticeList(res.data.result);
				} else {
					console.log('fail to fetch');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const goNotie = () => {
		navigate('/notice/read');
	};
	useEffect(() => {
		fetchNoticeList();
	}, [fetchNoticeList]);
	return (
		<div>
			{noticeList.length !== 0 ? (
				<NoticeCards>
					{noticeList.map((notice) => {
						return (
							<NoticeItem
								key={notice.NOTICE_ID}
								className="noticeItem"
								onClick={goNotie}
							>
								<div className="title_writer">
									<div>
										<HiOutlineSpeakerphone
											style={{ color: '#d8f7e0', backgroundColor: '#4ecb71' }}
										/>
										<span>{notice.NOTICETITLE}</span>
									</div>
									<div>사장님</div>
								</div>
							</NoticeItem>
						);
					})}
				</NoticeCards>
			) : (
				<NoticeCards>
					<NoticeItem className="noticeItem">
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
					</NoticeItem>
				</NoticeCards>
			)}
		</div>
	);
};

export default MinNotice;
