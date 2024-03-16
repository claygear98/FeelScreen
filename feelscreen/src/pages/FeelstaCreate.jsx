import React from 'react';
import Nav from '../components/Features/Nav/Nav';
import FeelStaCreate from '../components/Features/FeelStagram/FeelStaCreate';
import Header from '../components/Features/Header/Header';

const FeelstaCreate = () => {
	return (
		<div>
			<Header />
			<FeelStaCreate />
			<Nav />
		</div>
	);
};

export default FeelstaCreate;
