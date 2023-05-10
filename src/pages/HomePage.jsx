import React from "react";
import Navbar from "../components/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../components/UserWidget";

const HomePage = () => {
	const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
	const { id, picturePath } = useSelector((state) => state.user);

	return (
		<div>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreen ? "flex" : "block"}
				gap="0.5rem"
				justifyContent="space-between">
				<Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
					<UserWidget userId={id} picturePath={picturePath} />
				</Box>
				<Box flexBasis={isNonMobileScreen ? "42%" : undefined}></Box>
				{isNonMobileScreen && <Box flexBasis="26%"></Box>}
			</Box>
		</div>
	);
};

export default HomePage;
