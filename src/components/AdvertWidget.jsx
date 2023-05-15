import React from "react";
import { Link, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";

const AdvertWidget = () => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	return (
		<WidgetWrapper>
			<FlexBetween>
				<Typography color={dark} variant="h5" fontWeight="500">
					Sponsored
				</Typography>
				<Typography color={medium}>Create Ad</Typography>
			</FlexBetween>
			<img
				width="100%"
				height="auto"
				alt="advert"
				src="/assets/cosmetics.jpg"
				style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
			/>
			<FlexBetween>
				<Typography color={main}>Kimett Cosmetics</Typography>
				<Link href="https://kimett.netlify.app" target="_blank" color={medium}>
					kimett.com
				</Link>
			</FlexBetween>
			<Typography color={medium} m="0.5rem 0">
				Your pathway to stunning beauty and amazing skin...
			</Typography>
		</WidgetWrapper>
	);
};

export default AdvertWidget;
