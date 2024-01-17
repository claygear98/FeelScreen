import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Fillstagram from './pages/Fillstagram';
import Notice from './pages/Notice';
import Mypage from './pages/Mypage';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="notice" element={<Notice />} />
					<Route path="fillstagram" element={<Fillstagram />} />
					<Route path="mypage" element={<Mypage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
