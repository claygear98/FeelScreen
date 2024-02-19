//not yet
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const sever_port = 'http://localhost:3001';

const ReadNotice = () => {
	const noticeList = useCallback(() => {
		axios
			.get(`${sever_port}/notice`)
			.then((Response) => {
				if (Response.data.success === true) {
					alert('조회성공!!');
				}
				return Response.data.notice;
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div>
			<div></div>
		</div>
	);
};

export default ReadNotice;
