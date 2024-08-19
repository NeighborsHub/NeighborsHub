"use client";
import makeStore from "store/store";
import { Provider } from "react-redux";
import Bootstrap from "./bootstrap";
import { ThemeProvider } from "@mui/material/styles";
import theme from "styles/theme";
import themeDark from "styles/theme-dark";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AxiosInterceptor } from "services/apiConfig";
import withSnackbarNotifications from "notification";

const App = ({ children }) => {
  const darkMode = false;
  return (
    <GoogleOAuthProvider clientId="1092960991760-7ih57lpsujsf5at6toka7o0vd24ogm21.apps.googleusercontent.com">
      <Provider store={makeStore}>
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <AxiosInterceptor>
            <Bootstrap>{children}</Bootstrap>
          </AxiosInterceptor>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default withSnackbarNotifications(App);
