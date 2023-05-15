import React, { useState } from "react";
import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	Send,
	ShareOutlined,
} from "@mui/icons-material";
import {
	Box,
	CircularProgress,
	Divider,
	IconButton,
	InputBase,
	Typography,
	useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setSnackbar } from "../features";
import WidgetWrapper from "./WidgetWrapper";

const SinglePostWidget = ({
	postId,
	postUserId,
	name,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	const [isComments, setIsComments] = useState(false);
	const [loading, setLoading] = useState(false);
	const [commentText, setCommentText] = useState("");

	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user.id);
	const isLiked = Boolean(likes[loggedInUserId]);
	const likesCount = Object.keys(likes).length;

	const { palette } = useTheme();
	const primary = palette.primary.main;
	const main = palette.neutral.main;

	const patchLike = async () => {
		const response = await fetch(
			`https://socialstream-backend.vercel.app/api/posts/${postId}/like`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: loggedInUserId }),
			}
		);

		if (response.ok) {
			const updatedPost = await response.json();
			dispatch(setPost({ post: updatedPost, post_id: updatedPost._id }));
		}
	};

	const postComment = async () => {
		setLoading(true);
		const response = await fetch(
			`https://socialstream-backend.vercel.app/api/posts/${postId}/comment`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: commentText }),
			}
		);

		if (response.ok) {
			setLoading(false);
			const updatedPost = await response.json();
			dispatch(
				setSnackbar({
					isOpen: true,
					state: "success",
					message: "Comment posted!",
				})
			);
			setCommentText("");
			dispatch(setPost({ post: updatedPost, post_id: updatedPost._id }));
		} else {
			dispatch(
				setSnackbar({
					isOpen: true,
					state: "error",
					message: "Comment not posted!",
				})
			);
		}
	};

	return (
		<WidgetWrapper m="2rem 0">
			<Friend
				friendId={postUserId}
				name={name}
				subtitle={location}
				userPicturePath={userPicturePath}
				isEditable
			/>
			<Typography color={main} sx={{ mt: "1rem" }}>
				{description}
			</Typography>
			{picturePath && (
				<img
					width="100%"
					height="auto"
					alt="post"
					style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
					src={picturePath}
				/>
			)}
			<FlexBetween mt="0.25rem">
				<FlexBetween gap="1rem">
					{/* LIKES */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={patchLike}>
							{isLiked ? (
								<FavoriteOutlined sx={{ color: primary }} />
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likesCount}</Typography>
					</FlexBetween>

					{/* COMMENTS */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={() => setIsComments(!isComments)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>

				<IconButton>
					<ShareOutlined />
				</IconButton>
			</FlexBetween>
			{isComments && (
				<>
					<FlexBetween gap="1.5rem" mt="1rem">
						<InputBase
							placeholder="Post a comment..."
							onChange={(e) => setCommentText(e.target.value)}
							value={commentText}
							sx={{
								width: "100%",
								backgroundColor: palette.neutral.light,
								borderRadius: "2rem",
								padding: "0.6rem 2rem",
							}}
						/>
						<IconButton
							disabled={!commentText || loading}
							onClick={postComment}
							sx={{
								backgroundColor: palette.neutral.light,
								padding: "1rem",
								"&:hover": {
									backgroundColor: palette.primary.light,
									color: palette.primary.dark,
								},
								"&:disabled": {
									color: loading
										? palette.primary.dark
										: palette.neutral.medium,
								},
							}}>
							{loading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								<Send />
							)}
						</IconButton>
					</FlexBetween>
					<Box mt="0.5rem">
						{comments.map((comment, i) => (
							<Box key={`${name}-${i}`}>
								<Divider />
								<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
									{comment}
								</Typography>
							</Box>
						))}
						<Divider />
					</Box>
				</>
			)}
		</WidgetWrapper>
	);
};

export default SinglePostWidget;
