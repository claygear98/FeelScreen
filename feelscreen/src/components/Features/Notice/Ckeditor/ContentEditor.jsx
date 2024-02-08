import React from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const sever_port = 'http://localhost:3000';
const apiAdress = 'image';
const ContentEditor = ({ SetContent }) => {
	function uploadAdapter(loader) {
		return {
			upload: () => {
				return new Promise((resolve, reject) => {
					const data = new FormData();
					loader.file.then((file) => {
						const renamedFile = new File([file], `${Date.now()}.jpeg`, {
							type: file.type,
						});
						console.log(renamedFile);
						data.append('imageName', renamedFile.name);
						data.append('image', renamedFile);
						axios
							.post(`${sever_port}/${apiAdress}`, {
								data: data,
							})
							.then((res) => {
								resolve({
									default: `${sever_port}/${res.filename}`,
								});
							})
							.catch((err) => {
								console.log(data);
								reject(err);
							});
					});
				});
			},
		};
	}
	function uploadPlugin(editor) {
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			return uploadAdapter(loader);
		};
	}
	return (
		<div>
			<CKEditor
				config={{
					extraPlugins: [uploadPlugin],
				}}
				editor={ClassicEditor}
				data="<p>공지 입력</p>"
				onReady={(editor) => {
					// You can store the "editor" and use when it is needed.
					console.log('Editor is ready to use!', editor);
				}}
				onChange={(event, editer) => {
					console.log(editer.getData());
					SetContent(editer.getData());
				}}
				onBlur={(event, editor) => {
					console.log('Blur.', editor);
				}}
				onFocus={(event, editor) => {
					console.log('Focus.', editor);
				}}
			/>
		</div>
	);
};
// 전송할때

export default ContentEditor;
