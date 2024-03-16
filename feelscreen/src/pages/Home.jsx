import React from 'react';
import FloorDescription from '../components/Features/FloorDessription/FloorDescription';
import Nav from '../components/Features/Nav/Nav';
import Header from '../components/Features/Header/Header';
import FeelMin from '../components/Features/FeelStagram/FeelMin';
import MinNotice from '../components/Features/Notice/MinNotice';

const Home = () => {
	return (
		<div>
			<Header />
			<MinNotice />
			<FeelMin />
			<FloorDescription />
			<Nav />
		</div>
	);
};

export default Home;
