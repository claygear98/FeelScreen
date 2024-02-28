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
import FeelstaDetail from './pages/FeelstaDetail';

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
					<Route path="/feelstadetail/:id" element={<FeelstaDetail />} />
					<Route path="/mypage" element={<Mypage />} />
					<Route path="/mypost" element={<Mypost />} />
					<Route path="notice">
						<Route path="read" element={<Notice />} />
<<<<<<< HEAD
						{/* <Route path="detail" element={<DetailNotice />} /> */}
						{/* <Route path="post" element={<PostNotice />} /> */}
=======
						{/* <Route path="detail" element={<DetailNotice />} />
						<Route path="post" element={<PostNotice />} /> */}
>>>>>>> 7a837fedb1a6ef159018608da4f97f2e06401136
					</Route>
					{/* <Route path="fillstagram" element={<Fillstagram />} /> */}
					{/* <Route path="mypage" element={<Mypage />} /> */}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
