import React from 'react';
import Nav from '../components/Features/Nav/Nav';
import Header from '../components/Features/Header/Header';
import ReadNotice from '../components/Features/Notice/ReadNotice';

const Notice = () => {
	return (
		<div>
			<Header />
			<ReadNotice />
			<Nav />
		</div>
	);
};

export default Notice;
