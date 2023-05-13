import React from "react";
import { Snackbar, SnackbarContent, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../features";

const CustomSnackbar = () => {
	const { isOpen, state, message } = useSelector((state) => state.snackBar);
	const dispatch = useDispatch();
	const { palette } = useTheme();

	const handleClose = () => {
		dispatch(setSnackbar({ isOpen: false }));
	};
	return (
		<Snackbar
			open={isOpen}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			autoHideDuration={5000}
			onClose={handleClose}>
			<SnackbarContent
				style={{
					backgroundColor:
						state === "success"
							? palette.primary.mediumMain
							: palette.error.dark,
					color: "#fff",
				}}
				message={message}
			/>
		</Snackbar>
	);
};

export default CustomSnackbar;
