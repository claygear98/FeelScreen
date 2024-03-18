import { create } from 'zustand';
import axios from 'axios';

const server_port = 'http://localhost:3001';
const useNoticeInfo = create((set) => ({
	noticeList: [],
	fetchNoticeList() {
		axios
			.get(`${server_port}/notice`)
			.then((response) => {
				set((state) => ({
					noticeList: response.data.notice,
				}));
			})
			.catch((error) => {
				console.error('Error fetching notices:', error);
			});
	},
}));

export default useNoticeInfo;
