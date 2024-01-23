import { create } from 'zustand';
// import axios from 'axios';

const useHeaderInfo = create((set) => ({
	username: '기본값',
	userImage: `/assets/5f.png`,
	getInfo() {
		// axios.get('/header').then((Response)=>{
		//  set((state)=>({userImage:Response.data.userImage,username:Response.data.username}))
		// }
		// )
	},
}));

export default useHeaderInfo;
