import React from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const sever_port = 'http://localhost:3001';
const apiAdress = 'image';
const editorConfiguration = {
	image: {
		outputType: 'auto',
	},
};
const ContentEditor = ({ SetContent }) => {
	function uploadAdapter(loader) {
		return {
			upload: () => {
				return new Promise((resolve, reject) => {
					const data = new FormData();
					loader.file.then((file) => {
						console.log(file.name);
						console.log('-----------------------');
						console.log(file);
						data.append('imageName', file.name);
						data.append('image', file);
						axios
							.post(
								`${sever_port}/${apiAdress}`,
								data,
								console.log(data.get('imageName'))
							)
							.then((res) => {
								resolve({
									default: `${sever_port}/${res.data.originalname}`,
								});
								console.log(res);
							})
							.catch((err) => {
								console.log(err);
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
					autoParagraph: false,
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

export default ContentEditor;
