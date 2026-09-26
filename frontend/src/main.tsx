import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/maintheme.tsx";
import { HTTPProvider } from "./providers/HTTPProvider.tsx";
import { AppContextProvider } from "./providers/AppContextProvider.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <HTTPProvider>
            <AppContextProvider>
              <App />
            </AppContextProvider>
          </HTTPProvider>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  </StrictMode>,
);
