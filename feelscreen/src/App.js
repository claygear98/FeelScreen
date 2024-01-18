import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/log-in" element={<LogIn />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
