import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	IconButton,
	InputBase,
	Typography,
	Select,
	MenuItem,
	FormControl,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import {
	Search,
	Message,
	DarkMode,
	LightMode,
	Notifications,
	Help,
	Menu,
	Close,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import { setLogout, toggleMode } from "../features";

const Navbar = () => {
	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

	const theme = useTheme();

	const neutralLight = theme.palette.neutral.light;
	const dark = theme.palette.neutral.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const alt = theme.palette.background.alt;

	const fullName = `${user?.firstName} ${user?.lastName}`;

	return (
		<FlexBetween padding="1rem 5%" backgroundColor={alt}>
			<FlexBetween gap="1.75rem">
				<Typography
					fontWeight="bold"
					fontSize="clamp(1rem, 2rem, 2.25rem)"
					color="primary"
					onClick={() => navigate("/home")}
					sx={{
						"&:hover": {
							color: primaryLight,
							cursor: "pointer",
						},
					}}>
					SocialStream
				</Typography>
				{isNonMobileScreen && (
					<FlexBetween
						backgroundColor={neutralLight}
						borderRadius="9px"
						gap="3rem"
						padding="0.1rem 1.5rem">
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				)}
			</FlexBetween>

			{isNonMobileScreen ? (
				<FlexBetween gap="2rem">
					<IconButton onClick={() => dispatch(toggleMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkMode sx={{ fontSize: "25px" }} />
						) : (
							<LightMode sx={{ color: dark, fontSize: "25px" }} />
						)}
					</IconButton>
					<Message sx={{ fontSize: "25px" }} />
					<Notifications sx={{ fontSize: "25px" }} />
					<Help sx={{ fontSize: "25px" }} />
					<FormControl variant="standard" value={fullName}>
						<Select
							value={fullName}
							sx={{
								backgroundColor: neutralLight,
								width: "150",
								borderRadius: "0.25rem",
								padding: "0.25rem 1rem",
								"& .MuiSvgIcon-root": {
									pr: "0.25rem",
									width: "3rem",
								},
								"& . MuiSelect-select:focus": {
									backgroundColor: neutralLight,
								},
							}}
							input={<InputBase />}>
							{" "}
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>{" "}
							<MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton
					onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
					<Menu />
				</IconButton>
			)}

			{/* MOBILE MENU */}
			{!isNonMobileScreen && isMobileMenuToggled && (
				<Box
					position="fixed"
					right="0"
					bottom="0"
					height="100%"
					zIndex="10"
					maxWidth="500px"
					minWidth="300px"
					backgroundColor={background}>
					{/* CLOSE ICON */}
					<Box display="flex" justifyContent="flex-end" p="1rem">
						<IconButton onClick={() => setIsMobileMenuToggled(false)}>
							{" "}
							<Close />{" "}
						</IconButton>
					</Box>

					{/* MENU ITEMS */}
					<FlexBetween
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						gap="3rem">
						<IconButton onClick={() => dispatch(toggleMode())}>
							{theme.palette.mode === "dark" ? (
								<DarkMode sx={{ fontSize: "20px" }} />
							) : (
								<LightMode sx={{ color: dark, fontSize: "20px" }} />
							)}
						</IconButton>
						<Message sx={{ fontSize: "25px" }} />
						<Notifications sx={{ fontSize: "25px" }} />
						<Help sx={{ fontSize: "25px" }} />
						<FormControl variant="standard" value={fullName}>
							<Select
								value={fullName}
								sx={{
									backgroundColor: neutralLight,
									width: "150",
									borderRadius: "0.25rem",
									padding: "0.25rem 1rem",
									"& .MuiSvgIcon-root": {
										pr: "0.25rem",
										width: "3rem",
									},
									"& . MuiSelect-select:focus": {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}>
								{" "}
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>{" "}
								<MenuItem onClick={() => dispatch(setLogout())}>
									Log Out
								</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	);
};

export default Navbar;
