import React, { useState } from "react";
import {
	Box,
	CircularProgress,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { setFriends, setFriendsList, setSnackbar } from "../features";

const Friend = ({ friendId, name, subtitle, userPicturePath, isEditable }) => {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id, friends } = useSelector((state) => state.user);
	const isProfilePage = useSelector((state) => state.isProfilePage);
	const token = useSelector((state) => state.token);

	const { palette } = useTheme();
	const primaryLight = palette.primary.light;
	const primaryDark = palette.primary.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	const isFriend = friends.find((friend) => friend === friendId);
	const isUser = friendId === id;

	const getProfileFriends = async (profileId) => {
		const response = await fetch(
			`http://localhost:3001/api/users/${profileId}/friends`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (response.ok) {
			const data = await response.json();
			dispatch(setFriendsList({ friendsList: data }));
		}
	};

	const patchFriend = async () => {
		setLoading(true);
		const response = await fetch(
			`http://localhost:3001/api/users/${id}/${friendId}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (response.ok) {
			const newFriends = await response.json();
			const newList = newFriends.map((friend) => friend._id);
			dispatch(
				setSnackbar({
					state: "success",
					message: !isFriend ? "Friend added!" : "Friend removed",
					isOpen: true,
				})
			);
			dispatch(setFriends({ friends: newList }));
			if (isProfilePage) {
				getProfileFriends(friendId);
			} else {
				getProfileFriends(id);
			}
		} else {
			dispatch(
				setSnackbar({
					state: "error",
					message: "Could not add/remove friend",
					isOpen: true,
				})
			);
		}
		setLoading(false);
	};

	return (
		<FlexBetween>
			<FlexBetween gap="1rem">
				<UserImage image={userPicturePath} size="55px" />
				<Box
					onClick={() => {
						navigate(`/profile/${friendId}`);
						navigate(0);
					}}
					display="inline-block">
					<Typography
						color={main}
						variant="h5"
						fontWeight="500"
						sx={{
							"&:hover": { color: palette.primary.light, cursor: "pointer" },
						}}>
						{name}
					</Typography>
					<Typography color={medium} fontSize="0.75rem">
						{subtitle}
					</Typography>
				</Box>
			</FlexBetween>
			{!isUser && isEditable && (
				<IconButton
					disabled={loading}
					onClick={() => patchFriend()}
					sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
					{loading ? (
						<CircularProgress size={20} />
					) : isFriend ? (
						<PersonRemoveOutlined sx={{ color: primaryDark }} />
					) : (
						<PersonAddOutlined sx={{ color: primaryDark }} />
					)}
				</IconButton>
			)}
		</FlexBetween>
	);
};

export default Friend;
