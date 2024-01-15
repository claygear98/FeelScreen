import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUp from './components/Features/Sign/Sign-Up/SignUp.jsx';

function App() {
	return (
		<h1 className='text-3xl font-bold underline'>Hello</h1>
		// <div className="App">
		// 	<BrowserRouter>
		// 	<Routes>
		// 		<Route path="/login" element={<SignUp />} />
		// 	</Routes>
		// 	</BrowserRouter>
		// </div>
	);
}

export default App;
