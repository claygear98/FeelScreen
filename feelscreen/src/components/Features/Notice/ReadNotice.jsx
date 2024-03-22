import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useHeaderInfo from '../Header/HeadStore';
import useNoticeInfo from './NoticeStore';
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
	.content {
		padding: 10px;
		text-align: initial;
	}
`;
const ReadNotice = () => {
	const [detail, setDetail] = useState([]);
	const [focus, setFocus] = useState(-1);
	const navigate = useNavigate();
	const { username } = useHeaderInfo();
	const { noticeList, fetchNoticeList } = useNoticeInfo();

	useEffect(() => {
		fetchNoticeList();
	}, [fetchNoticeList]);

	const handleDetail = (id) => {
		axios
			.get(`${server_port}/notice/detail?notice_id=${id}`, {
				headers: { 'Cache-Control': 'no-cache' },
			})
			.then((response) => {
				if ((response.data.success = true)) {
					response.data.notice.NOTICECONTENT =
						response.data.notice.NOTICECONTENT.replaceAll('"', '');
					setDetail(response.data.notice);
					setFocus(id);
				} else {
					console.log('ㅁㄴㅇㄹ');
				}
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(focus);
	};
	const isSame = (a, b) => {
		if (a === b) {
			return b;
		} else {
			return 0;
		}
	};
	return (
		<div>
			<div>
				<NoticeHeader>
					<div>공지사항 및이벤트</div>
					{username === '사장님' ? (
						<div
							className=""
							onClick={() => {
								navigate('/notice/post');
							}}
						>
							글쓰기
						</div>
					) : (
						<div></div>
					)}
				</NoticeHeader>
				{noticeList.length !== 0 ? (
					<NoticeCards>
						{noticeList.map((notice, index) => {
							return (
								<NoticeItem
									key={notice.NOTICE_ID}
									className="noticeItem"
									onClick={() => handleDetail(notice.NOTICE_ID)}
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
									<div className="content">
										{isSame(notice.NOTICE_ID, detail.NOTICE_ID) === focus ? (
											<div
												dangerouslySetInnerHTML={{
													__html: detail.NOTICECONTENT,
												}}
											/>
										) : (
											''
										)}
									</div>
								</NoticeItem>
							);
						})}
					</NoticeCards>
				) : (
					<NoticeCards>네트워크에러</NoticeCards>
				)}
			</div>
		</div>
	);
};

export default ReadNotice;
