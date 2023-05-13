import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserWidget from "../components/UserWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import AdvertWidget from "../components/AdvertWidget";
import FriendsListWidget from "../components/FriendsListWidget";
import { setProfilePage } from "../features";

const HomePage = () => {
	const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
	const { id, picturePath } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setProfilePage(false));
	}, []);

	return (
		<div>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 5%"
				flexDirection={isNonMobileScreen ? "row" : "column"}
				display="flex"
				gap="0.5rem"
				justifyContent="space-between">
				<Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
					<UserWidget userId={id} picturePath={picturePath} />
				</Box>
				<Box flexBasis={isNonMobileScreen ? "42%" : undefined}>
					{" "}
					<Box>
						<MyPostWidget picturePath={picturePath} />
					</Box>
					<Box>
						<PostsWidget userId={id} />
					</Box>
				</Box>
				{isNonMobileScreen && (
					<Box flexBasis="26%">
						<AdvertWidget />
						<Box m="1rem 0" />
						<FriendsListWidget userId={id} editable />
					</Box>
				)}
			</Box>
		</div>
	);
};

export default HomePage;
