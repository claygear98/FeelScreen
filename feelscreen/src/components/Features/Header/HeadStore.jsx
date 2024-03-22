import { create } from 'zustand';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
console.log(cookies.get('Authorization'));
const useHeaderInfo = create((set) => ({
	username: '기본값',
	userImage: `/assets/5f.png`,
	getInfo() {
		axios
			.post('http://localhost:3001/user/header', {
				Authorization: cookies.get('Authorization'),
			})
			.then((Response) => {
				console.log(Response);
				set((state) => ({
					userImage: Response.data.image,
					username: Response.data.username,
				}));
			});
	},
}));

export default useHeaderInfo;
