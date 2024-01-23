import React from 'react';
import styled from 'styled-components';
const SeeMyPost = styled.div``;
const MyPostList = styled.li``;
const MyPostBox = styled.div``;
const PostPic = styled.div``;
const PostDescription = styled.div``;
const MyPost = () => {
	return (
		<SeeMyPost>
			<div>내가 쓴글</div>
			<div>filter</div>
			<hr />
			<ul>
				<MyPostList>
					<MyPostBox>
						<PostPic>사진</PostPic>
						<PostDescription>
							<div>이번주에 스크린 같이 치실 분~?</div>
							<div>작성 날짜</div>
						</PostDescription>
					</MyPostBox>
				</MyPostList>
			</ul>
		</SeeMyPost>
	);
};

export default MyPost;
