import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/log-in" element={<LogIn />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
