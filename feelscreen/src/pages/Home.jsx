import React from 'react';
import FloorDescription from '../components/Features/FloorDessription/FloorDescription';
import Nav from '../components/Features/Nav/Nav';
import Header from '../components/Features/Header/Header';

const Home = () => {
	return (
		<div>
			<Header />
			<FloorDescription />
			<Nav />
		</div>
	);
};

export default Home;
