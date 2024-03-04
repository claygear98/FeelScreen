import React from 'react';
import FloorDescription from '../components/Features/FloorDessription/FloorDescription';
import Nav from '../components/Features/Nav/Nav';
import Header from '../components/Features/Header/Header';
import FeelMin from '../components/Features/FeelStagram/FeelMin';

const Home = () => {
	return (
		<div>
			<Header />
			<FeelMin />
			<FloorDescription />
			<Nav />
		</div>
	);
};

export default Home;
