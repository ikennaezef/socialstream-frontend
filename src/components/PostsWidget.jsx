import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features";
import SinglePostWidget from "./SinglePostWidget";
import { Box, Typography, useTheme } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const token = useSelector((state) => state.token);

	const { palette } = useTheme();

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
			{posts?.map((post) => (
				<SinglePostWidget
					key={post._id}
					postId={post._id}
					postUserId={post.userId}
					name={`${post.firstName} ${post.lastName}`}
					description={post.description}
					location={post.location}
					picturePath={post.picturePath}
					userPicturePath={post.userPicturePath}
					likes={post.likes}
					comments={post.comments}
				/>
			))}
			{posts.length < 1 && (
				<Box>
					<Typography
						variant="h4"
						fontWeight="400"
						m="1rem 0"
						color={palette.neutral.medium}>
						No posts yet.
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default PostsWidget;
