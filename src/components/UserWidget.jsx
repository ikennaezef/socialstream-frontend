import { useState, useEffect } from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	Twitter,
	LinkedIn,
} from "@mui/icons-material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const UserWidget = ({ userId, picturePath }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [user, setUser] = useState(null);
	const { palette } = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const token = useSelector((state) => state.token);
	const friendsList = useSelector((state) => state.friendsList);

	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	const getUser = async () => {
		setLoading(true);
		setError(false);
		const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (response.ok) {
			const data = await response.json();
			setUser(data);
			setLoading(false);
		} else {
			setLoading(false);
			setError(true);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	if (loading) {
		return (
			<WidgetWrapper>
				<Loader />
			</WidgetWrapper>
		);
	}

	if (error) {
		return (
			<WidgetWrapper>
				<Typography p="1rem 0 1.5rem" color={medium}>
					An error occured. Could not fetch user.
				</Typography>
			</WidgetWrapper>
		);
	}

	if (!user) {
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		picturePath: userPicture,
		viewedProfile,
		impressions,
	} = user;

	return (
		<WidgetWrapper>
			<FlexBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}>
				<FlexBetween gap="1rem">
					<UserImage image={picturePath ? picturePath : userPicture} />
					<Box>
						<Typography
							variant="h4"
							color={dark}
							fontWeight="500"
							sx={{
								"&:hover": {
									color: palette.primary.light,
									cursor: "pointer",
								},
							}}>
							{firstName} {lastName}
						</Typography>
						<Typography>{friendsList?.length}</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>

			<Divider />

			{/* SECOND ROW */}
			<Box p="1rem 0">
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="medium" sx={{ color: main }} />
					<Typography color={medium}>{location}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<WorkOutlineOutlined fontSize="medium" sx={{ color: main }} />
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>
			<Divider />

			{/* THIRD ROW */}
			<Box p="1rem 0">
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>Who's viewed your profile</Typography>
					<Typography color={main} fontWeight="500">
						{viewedProfile}
					</Typography>
				</FlexBetween>
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>Impressions of your posts</Typography>
					<Typography color={main} fontWeight="500">
						{impressions}
					</Typography>
				</FlexBetween>
			</Box>
			<Divider />

			{/* FOURTH ROW */}
			<Box p="1rem 0">
				<Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
					Social Profiles
				</Typography>

				{/* TWITTER */}
				<FlexBetween gap="1rem" mb="0.5rem">
					<FlexBetween gap="1rem">
						<Twitter />
						<Box>
							<Typography color={main} fontWeight="500">
								Twitter
							</Typography>
							<Typography color={medium}>Social Network</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>

				{/* LINKEDIN */}
				<FlexBetween gap="1rem">
					<FlexBetween gap="1rem">
						<LinkedIn />
						<Box>
							<Typography color={main} fontWeight="500">
								Linkedin
							</Typography>
							<Typography color={medium}>Network Platform</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
