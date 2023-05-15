import { useState } from "react";
import {
	Box,
	Typography,
	Divider,
	InputBase,
	useTheme,
	Button,
	IconButton,
	useMediaQuery,
	CircularProgress,
	Snackbar,
} from "@mui/material";
import {
	EditOutlined,
	DeleteOutline,
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setSnackbar } from "../features";

const MyPostWidget = ({ picturePath }) => {
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [post, setPost] = useState("");
	const [loading, setLoading] = useState(false);

	const { palette } = useTheme();
	const mediumMain = palette.neutral.mediumMain;
	const medium = palette.neutral.medium;

	const dispatch = useDispatch();
	const { id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);

	const isNonMobileScreeen = useMediaQuery("(min-width:1000px)");

	const handlePost = async () => {
		setLoading(true);
		const formData = new FormData();
		formData.append("userId", id);
		formData.append("description", post);

		if (image) {
			formData.append("picture", image);
			formData.append("picturePath", image.name);
		}

		const postResponse = await fetch(
			`https://socialstream-backend.vercel.app/api/posts`,
			{
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
				body: formData,
			}
		);

		const response = await postResponse.json();
		if (postResponse.ok) {
			dispatch(setPosts({ posts: response }));
			setLoading(false);
			setImage(null);
			setPost("");
			dispatch(
				setSnackbar({ isOpen: true, message: "Post sent!", state: "success" })
			);
		} else {
			setLoading(false);
			dispatch(
				setSnackbar({ isOpen: true, message: "Post not sent!", state: "error" })
			);
			console.log("An error occured -->", response.message);
		}
	};

	return (
		<>
			<WidgetWrapper>
				<FlexBetween gap="1.5rem">
					<UserImage image={picturePath} />
					<InputBase
						placeholder="What's on your mind..."
						onChange={(e) => setPost(e.target.value)}
						value={post}
						sx={{
							width: "100%",
							backgroundColor: palette.neutral.light,
							borderRadius: "2rem",
							padding: "1rem 2rem",
						}}
					/>
				</FlexBetween>
				{isImage && (
					<Box
						border={`1px solid ${medium}`}
						borderRadius="5px"
						mt="1rem"
						p="1rem">
						<Dropzone
							acceptedFiles=".jpg,.jpeg,.png"
							multiple={false}
							onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
							{({ getRootProps, getInputProps }) => (
								<FlexBetween>
									<Box
										{...getRootProps()}
										border={`2px dashed ${palette.primary.main}`}
										p="1rem"
										width="100%"
										sx={{ "&:hover": { cursor: "pointer" } }}>
										<input {...getInputProps} style={{ display: "none" }} />
										{!image ? (
											<p>Add Image here</p>
										) : (
											<FlexBetween>
												<Typography>{image.name}</Typography>
												<EditOutlined />
											</FlexBetween>
										)}
									</Box>
									{image && (
										<IconButton
											onClick={() => setImage(null)}
											sx={{ width: "15%" }}>
											<DeleteOutline />
										</IconButton>
									)}
								</FlexBetween>
							)}
						</Dropzone>
					</Box>
				)}

				<Divider sx={{ margin: "1.25rem 0" }} />

				<FlexBetween>
					<FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
						<ImageOutlined sx={{ color: mediumMain }} />
						<Typography
							color={mediumMain}
							sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
							Image
						</Typography>
					</FlexBetween>

					{isNonMobileScreeen ? (
						<>
							<FlexBetween gap="0.25rem">
								<GifBoxOutlined sx={{ color: mediumMain }} />
								<Typography color={mediumMain}>Clip</Typography>
							</FlexBetween>
							<FlexBetween gap="0.25rem">
								<AttachFileOutlined sx={{ color: mediumMain }} />
								<Typography color={mediumMain}>Attachment</Typography>
							</FlexBetween>
							<FlexBetween gap="0.25rem">
								<MicOutlined sx={{ color: mediumMain }} />
								<Typography color={mediumMain}>Audio</Typography>
							</FlexBetween>
						</>
					) : (
						<FlexBetween>
							<MoreHorizOutlined sx={{ color: mediumMain }} />
						</FlexBetween>
					)}

					<Button
						disabled={!post || loading}
						onClick={handlePost}
						sx={{
							color: palette.background.alt,
							backgroundColor: palette.primary.main,
							borderRadius: "3rem",
							"&:disabled": {
								color: loading
									? palette.background.alt
									: palette.neutral.medium,
							},
						}}>
						{loading ? <CircularProgress size={18} color="inherit" /> : "POST"}
					</Button>
				</FlexBetween>
			</WidgetWrapper>
		</>
	);
};

export default MyPostWidget;
