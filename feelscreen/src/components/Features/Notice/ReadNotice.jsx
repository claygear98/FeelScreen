import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
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
	const [noticeList, setNoticeList] = useState([]);
	const [detail, setDetail] = useState([]);

	const fetchNoticeList = useCallback(() => {
		axios
			.get(`${server_port}/notice`)
			.then((response) => {
				if (response.data.success === true) {
					setNoticeList(response.data.notice);
					console.log('Failed notices');
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

	const handleDetail = (id) => {
		axios.get(`${server_port}/notice?notice_id=${id}`).then((response) => {
			if ((response.data.success = true)) {
				response.data.notice.NOTICECONTENT =
					response.data.notice.NOTICECONTENT.replaceAll(/^style.*?;/g, '');
			}
		});
	};
	console.log(
		"<p>나는 사장</p><p>너는 손님!</p><p>&nbsp;</p><p>난 둥이다멍</p><figure class='image'><img style='aspect-ratio:128/128;' src='http://localhost:3001/개구리.png' width='128' height='128'></figure>"
			.replace(/style='(.*?)'/g, '') // style 속성 제거
			.replace(/<img(.*?)>/g, '<img$1 />') // 이미지 태그에 닫힌 태그 추가
	);
	return (
		<div>
			<div>
				<NoticeHeader>
					<div>공지사항 및이벤트</div>
					<div className="">글쓰기</div>
				</NoticeHeader>
				{1 !== 1 ? (
					noticeList.map((notice, index) => (
						<NoticeCards>
							<NoticeItem
								key={notice.NOTICE_ID}
								className="noticeItem"
								onClick={handleDetail(notice.NOTICE_ID)}
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
								<div className="content"></div>
							</NoticeItem>
						</NoticeCards>
					))
				) : (
					<NoticeCards>
						<NoticeItem className="noticeItem">
							<div className="title_writer">
								<div>
									<HiOutlineSpeakerphone style={{ color: '#d8f7e0' }} />
									<span>아직없음</span>
								</div>
								<div>사장님</div>
							</div>
							<div className="content">
								<p>나는 사장</p>
								<p>너는 손님!</p>
								<p>&nbsp;</p>
								<p>난 둥이다멍</p>
								<figure class="image">
									<img src="/assets/1f.png" width="128" height="128" />
								</figure>
							</div>
						</NoticeItem>
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
