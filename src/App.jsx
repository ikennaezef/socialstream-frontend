import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CustomSnackbar from "./components/CustomSnackbar";

function App() {
	const mode = useSelector((state) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	const isAuthenticated = Boolean(useSelector((state) => state.token));

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<CustomSnackbar />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route
						path="/home"
						element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
					/>
					<Route
						path="/profile/:userId"
						element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
					/>
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
