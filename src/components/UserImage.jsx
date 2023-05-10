import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
	return (
		<Box width={size} height={size}>
			<img
				src={`http://localhost:3001/assets/${image}`}
				style={{ objectFit: "cover", borderRadius: "50%" }}
				width={size}
				height={size}
				alt="User"
			/>
		</Box>
	);
};

export default UserImage;
