import React, { useEffect, useState } from "react";
import {
	Box,
	Alert,
	useTheme,
	Typography,
	TextField,
	Button,
	useMediaQuery,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../features";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

const registerSchema = yup.object({
	firstName: yup.string().required("This field is required"),
	lastName: yup.string().required("This field is required"),
	email: yup.string().email("Invalid email").required("This field is required"),
	password: yup
		.string()
		.min(6, "Password is too short")
		.required("This field is required"),
	location: yup.string().required("This field is required"),
	occupation: yup.string().required("This field is required"),
	picture: yup.string().required("This field is required"),
});

const loginSchema = yup.object({
	email: yup.string().email("Invalid email").required("This field is required"),
	password: yup.string().required("This field is required"),
});

const initialRegisterValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
	picture: "",
};

const initialLoginValues = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const [pageType, setPageType] = useState("login");
	const [error, setError] = useState({ state: false, message: "" });
	const { palette } = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery("(min-width: 600px)");

	const isLogin = pageType === "login";
	const isRegister = pageType === "register";

	useEffect(() => {
		setError({ state: false, message: "" });
	}, [pageType]);

	const login = async (values, onSubmitProps) => {
		const loggedInResponse = await fetch(
			"http://localhost:3001/api/auth/login",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}
		);

		if (loggedInResponse.ok) {
			const loggedIn = await loggedInResponse.json();
			onSubmitProps.resetForm();

			if (loggedIn) {
				const picturePath =
					loggedIn.user.picturePath === ""
						? "default_pfp.jpg"
						: loggedIn.user.picturePath;

				dispatch(
					setLogin({
						user: { ...loggedIn.user, picturePath },
						token: loggedIn.token,
					})
				);
				navigate("/home");
			}
		} else {
			const response = await loggedInResponse.json();
			setError({ state: true, message: response.message });
		}
	};

	const register = async (values, onSubmitProps) => {
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		formData.append("picturePath", values.picture.name);

		const savedUserResponse = await fetch(
			"http://localhost:3001/api/auth/register",
			{
				method: "POST",
				body: formData,
			}
		);

		if (savedUserResponse.ok) {
			const savedUser = await savedUserResponse.json();
			onSubmitProps.resetForm();

			if (savedUser) {
				setPageType("login");
			}
		} else {
			const response = await savedUserResponse.json();
			setError({ state: true, message: response.message });
		}
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		setError({ state: false, message: "" });
		if (isLogin) await login(values, onSubmitProps);
		if (isRegister) await register(values, onSubmitProps);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={isLogin ? initialLoginValues : initialRegisterValues}
			validationSchema={isLogin ? loginSchema : registerSchema}>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
				resetForm,
			}) => (
				<form onSubmit={handleSubmit}>
					<Box
						display="grid"
						gap="30px"
						gridTemplateColumns="repeat(4, minmax(0, 1fr))"
						sx={{
							"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
						}}>
						{isRegister && (
							<>
								<TextField
									label="First Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="firstName"
									error={
										Boolean(touched.firstName) && Boolean(errors.firstName)
									}
									helperText={touched.firstName && errors.firstName}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="Last Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name="lastName"
									error={Boolean(touched.lastName) && Boolean(errors.lastName)}
									helperText={touched.lastName && errors.lastName}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="Location"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.location}
									name="location"
									error={Boolean(touched.location) && Boolean(errors.location)}
									helperText={touched.location && errors.location}
									sx={{ gridColumn: "span 4" }}
								/>
								<TextField
									label="Occupation"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.occupation}
									name="occupation"
									error={
										Boolean(touched.occupation) && Boolean(errors.occupation)
									}
									helperText={touched.occupation && errors.occupation}
									sx={{ gridColumn: "span 4" }}
								/>
								<Box
									gridColumn="span 4"
									border={`1px solid ${palette.neutral.medium}`}
									borderRadius="5px"
									p="1rem">
									<Dropzone
										acceptedFiles=".jpg,.jpeg,.png"
										multiple={false}
										onDrop={(acceptedFiles) =>
											setFieldValue("picture", acceptedFiles[0])
										}>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border={`2px dashed ${palette.primary.main}`}
												p="1rem"
												sx={{ "&:hover": { cursor: "pointer" } }}>
												<input {...getInputProps} style={{ display: "none" }} />
												{!values.picture ? (
													<p>Add picture here</p>
												) : (
													<FlexBetween>
														<Typography>{values.picture.name}</Typography>
														<EditOutlined />
													</FlexBetween>
												)}
											</Box>
										)}
									</Dropzone>
								</Box>
							</>
						)}

						<TextField
							label="Email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name="email"
							error={Boolean(touched.email) && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
							label="Password"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
							error={Boolean(touched.password) && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							sx={{ gridColumn: "span 4" }}
						/>
					</Box>

					{error.state && (
						<Box paddingTop="1rem">
							<Alert severity="error">{error?.message}</Alert>
						</Box>
					)}

					{/* BUTTONS */}
					<Box>
						<Button
							fullWidth
							type="submit"
							sx={{
								m: "2rem 0",
								p: "1rem",
								backgroundColor: palette.primary.main,
								color: palette.background.alt,
								"&:hover": { color: palette.primary.main },
							}}>
							{isLogin ? "LOGIN" : "REGISTER"}
						</Button>
						<Typography
							onClick={() => {
								setPageType(isLogin ? "register" : "login");
								resetForm();
							}}
							sx={{
								textDecoration: "underline",
								color: palette.primary.main,
								"&:hover": { cursor: "pointer", color: palette.primary.light },
							}}>
							{isLogin
								? "Don't have an account? Sign Up here."
								: "Already have an account? Login here."}
						</Typography>
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default LoginForm;
