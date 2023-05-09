import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

function App() {
	const mode = useSelector((state) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/profile/:userId" element={<ProfilePage />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
