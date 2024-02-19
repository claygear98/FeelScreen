//not yet
import React, { useState, useEffect, useCallback } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

const server_port = 'http://localhost:3001';

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
				<div>공지사항 및이벤트</div>
				<div>글쓰기</div>
				{noticeList.length !== 0 ? (
					noticeList.map((notice) => (
						<div key={notice.NOTICE_ID}>
							<HiOutlineSpeakerphone style={{ color: '#d8f7e0' }} />
							<span>{notice.NOTICETITLE}</span>
						</div>
					))
				) : (
					<div>asdf</div>
				)}
			</div>
		</div>
	);
};

export default ReadNotice;
