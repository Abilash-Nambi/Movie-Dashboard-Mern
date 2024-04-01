import "./App.css";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import { router } from "./routes/AllRoutes";
import { RouterProvider } from "react-router-dom";

let theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  spacing: 6,
  palette: {
    mode: "dark",
    primary: {
      main: "#e2e2e8",
    },
    secondary: {
      main: "#00ca30",
      light: "#424242",
    },
  },
});
theme = responsiveFontSizes(theme);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
