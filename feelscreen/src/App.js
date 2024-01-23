import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import Fillstagram from './pages/Fillstagram';
import Notice from './pages/Notice';
import Mypage from './pages/Mypage';
import Mypost from './pages/Mypost';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/log-in" element={<LogIn />} />
					<Route path="/" element={<Home />} />
					<Route path="/notice" element={<Notice />} />
					<Route path="/fillstagram" element={<Fillstagram />} />
					<Route path="/mypage" element={<Mypage />} />
					<Route path="/mypost" element={<Mypost />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
