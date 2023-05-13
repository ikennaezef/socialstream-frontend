import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostsWidget from "../components/PostsWidget";
import UserWidget from "../components/UserWidget";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import FriendsListWidget from "../components/FriendsListWidget";
import Loader from "../components/Loader";
import { setProfilePage } from "../features";

const ProfilePage = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const { userId } = useParams();
	const dispatch = useDispatch();
	const { id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);

	const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
	const isLoggedInUser = userId === id;

	const getUser = async () => {
		const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			setUser(data);
		}
		setLoading(false);
	};

	useEffect(() => {
		dispatch(setProfilePage(true));
		getUser();
	}, []);

	if (loading)
		return (
			<Box
				minHeight="65vh"
				display="flex"
				alignItems="center"
				justifyContent="center">
				<Loader />
			</Box>
		);

	if (!user) return null;

	return (
		<div>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 5%"
				flexDirection={isNonMobileScreen ? "row" : "column"}
				display="flex"
				gap="2rem"
				justifyContent="center">
				<Box flexBasis={isNonMobileScreen ? "30%" : undefined}>
					<UserWidget userId={userId} picturePath={user.picturePath} />
					<Box m="2rem 0" />
					<FriendsListWidget userId={userId} editable={isLoggedInUser} />
				</Box>
				<Box
					flexBasis={isNonMobileScreen ? "50%" : undefined}
					mt={isNonMobileScreen ? undefined : "2rem"}>
					<Box>
						<Typography variant="h3" mb="1rem">
							User Posts
						</Typography>
						<PostsWidget userId={userId} isProfile={true} />
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default ProfilePage;
