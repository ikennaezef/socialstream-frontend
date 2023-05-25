import React, { useEffect, useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriendsList } from "../features";
import WidgetWrapper from "./WidgetWrapper";
import Friend from "./Friend";
import Loader from "./Loader";

const FriendsListWidget = ({ userId, editable = false }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const friendsList = useSelector((state) => state.friendsList);
	const token = useSelector((state) => state.token);

	const { palette } = useTheme();
	const dark = palette.neutral.dark;

	const getFriends = async () => {
		setError(false);
		setLoading(true);
		const response = await fetch(
			`https://socialstream-backend.vercel.app/api/users/${userId}/friends`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const data = await response.json();
		if (response.ok) {
			dispatch(setFriendsList({ friendsList: data }));
			setLoading(false);
		} else {
			console.log("An  error occured--->", data.message);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		getFriends();
	}, []);

	if (loading) {
		return (
			<WidgetWrapper>
				<Loader />
			</WidgetWrapper>
		);
	}

	if (error) {
		<WidgetWrapper>
			<Typography>An error occured</Typography>
		</WidgetWrapper>;
	}

	return (
		<WidgetWrapper>
			<Typography
				color={dark}
				variant="h5"
				fontWeight="500"
				sx={{ mb: "1.5rem" }}>
				Friend List
			</Typography>
			<Box display="flex" flexDirection="column" gap="1.5rem">
				{friendsList.map((friend) => (
					<Friend
						key={friend?._id}
						friendId={friend?._id}
						name={`${friend?.firstName} ${friend?.lastName}`}
						subtitle={friend?.occupation}
						userPicturePath={friend?.picturePath}
						isEditable={editable}
					/>
				))}
				{friendsList.length < 1 && (
					<Typography variant="h5" color={palette.neutral.medium}>
						No friends...
					</Typography>
				)}
			</Box>
		</WidgetWrapper>
	);
};

export default FriendsListWidget;
