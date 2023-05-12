import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
	return (
		<Box display="flex" alignItems="center" justifyContent="center" p="1rem 0">
			<CircularProgress size={24} />
		</Box>
	);
};

export default Loader;
