import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogIn from './pages/SignUp';
function App() {
	return (
		
		<div className="App">
			<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LogIn />} />
			</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
