import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
	user: null,
	isProfilePage: false,
	friendsList: [],
	token: null,
	posts: [],
	snackBar: {
		isOpen: false,
		state: "success",
		message: "",
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		toggleMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.friendsList = action.payload.user.friends;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
			state.isProfilePage = false;
			state.friendsList = [];
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.error("User friends does not exist");
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post) => {
				if (post._id === action.payload.post_id) return action.payload.post;
				return post;
			});

			state.posts = updatedPosts;
		},
		setFriendsList: (state, action) => {
			state.friendsList = action.payload.friendsList;
		},
		setProfilePage: (state, action) => {
			state.isProfilePage = action.payload;
		},
		setSnackbar: (state, action) => {
			state.snackBar = { ...state.snackBar, ...action.payload };
		},
	},
});

export const {
	toggleMode,
	setLogin,
	setFriends,
	setLogout,
	setPost,
	setPosts,
	setFriendsList,
	setProfilePage,
	setSnackbar,
} = authSlice.actions;

export default authSlice.reducer;
