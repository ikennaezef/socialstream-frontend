export const colorTokens = {
	grey: {
		0: "#FFFFFF",
		10: "#F6F6F6",
		50: "#F0F0F0",
		100: "#E0E0E0",
		200: "#C2C2C2",
		300: "#A3A3A3",
		400: "#858585",
		500: "#666666",
		600: "#4D4D4D",
		700: "#333333",
		800: "#1A1A1A",
		900: "#0A0A0A",
		1000: "#000000",
	},
	primary: {
		50: "#e6fff5",
		100: "#ccfee7",
		200: "#99fdd5",
		300: "#66fcac",
		400: "#33fbae",
		500: "#1afa7b",
		600: "#00bc5e",
		700: "#007d3e",
		800: "#003f26",
		900: "#001911",
	},
	error: {
		200: "#f87777",
		300: "#f34f4f",
		500: "#d22424",
	},
};

export const themeSettings = (mode) => {
	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? {
						// Dark mode palette
						primary: {
							dark: colorTokens.primary[200],
							mediumMain: colorTokens.primary[600],
							main: colorTokens.primary[500],
							light: colorTokens.primary[800],
						},
						error: {
							dark: colorTokens.error[200],
							main: colorTokens.error[300],
							light: colorTokens.error[500],
						},
						neutral: {
							dark: colorTokens.grey[100],
							main: colorTokens.grey[200],
							mediumMain: colorTokens.grey[300],
							medium: colorTokens.grey[400],
							light: colorTokens.grey[700],
						},
						background: {
							default: colorTokens.grey[900],
							alt: colorTokens.grey[800],
						},
				  }
				: {
						// Light mode palette
						primary: {
							dark: colorTokens.primary[700],
							mediumMain: colorTokens.primary[600],
							main: colorTokens.primary[500],
							light: colorTokens.primary[50],
						},
						error: {
							dark: colorTokens.error[500],
							main: colorTokens.error[300],
							light: colorTokens.error[200],
						},
						neutral: {
							dark: colorTokens.grey[700],
							main: colorTokens.grey[500],
							mediumMain: colorTokens.grey[400],
							medium: colorTokens.grey[300],
							light: colorTokens.grey[50],
						},
						background: {
							default: colorTokens.grey[10],
							alt: colorTokens.grey[0],
						},
				  }),
		},
		typography: {
			fontFamily: ["Rubik", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	};
};
