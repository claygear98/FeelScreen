import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import Feelstagram from './pages/Feelstagram';
import Notice from './pages/Notice';
import Mypage from './pages/Mypage';
import Mypost from './pages/Mypost';
import FeelstaCreate from './pages/FeelstaCreate';
// import Mypage from './pages/Mypage';
import DetailNotice from './components/Features/Notice/DetailNotice';
import PostNotice from './components/Features/Notice/PostNotice';
// import Mypost from './pages/Mypost';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/log-in" element={<LogIn />} />
					<Route path="/" element={<Home />} />
					<Route path="/notice" element={<Notice />} />
					<Route path="/feelstagram" element={<Feelstagram />} />
					<Route path="/feelstacreate" element={<FeelstaCreate />} />
					<Route path="/mypage" element={<Mypage />} />
					<Route path="/mypost" element={<Mypost />} />
					<Route path="notice">
						<Route path="read" element={<Notice />} />
						<Route path="detail" element={<DetailNotice />} />
						<Route path="post" element={<PostNotice />} />
					</Route>
					{/* <Route path="fillstagram" element={<Fillstagram />} /> */}
					{/* <Route path="mypage" element={<Mypage />} /> */}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
