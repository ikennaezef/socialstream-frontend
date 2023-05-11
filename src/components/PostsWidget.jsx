import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features";
import SinglePostWidget from "./SinglePostWidget";
import { Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const token = useSelector((state) => state.token);

	const endpoint = isProfile
		? `http://localhost:3001/api/posts/${userId}/posts`
		: "http://localhost:3001/api/posts";

	const getPosts = async () => {
		const response = await fetch(endpoint, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			dispatch(setPosts({ posts: data }));
		} else {
			const res = await response.json();
			console.log("An error occured-->", res.message);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<Box>
			{posts?.map(
				({
					_id,
					userId,
					firstName,
					lastName,
					description,
					location,
					picturePath,
					userPicturePath,
					likes,
					comments,
				}) => (
					<SinglePostWidget
						key={_id}
						postId={_id}
						postUserId={userId}
						name={`${firstName} ${lastName}`}
						description={description}
						location={location}
						picturePath={picturePath}
						userPicturePath={userPicturePath}
						likes={likes}
						comments={comments}
					/>
					// <p key={_id}>Heloooo</p>
				)
			)}
		</Box>
	);
};

export default PostsWidget;
