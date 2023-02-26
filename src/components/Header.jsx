import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles({
  title: {
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
});

export default function Header() {
  const headerClasses = useStyles();

  const {
    currency,
    setCurrency,
    user,
    darkTheme,
    siteLogocolor,
    selectBoxPopupBackColor,
    selectBoxPopupTextColor,
    selectBoxBackColor,
    selectBoxTextColor,
    selectBoxBackHoverColor,
    selectBoxTextHoverColor,
    selectBoxIconColor,
    selectBoxOutlineColor,
    selectBoxOutlineFocusColor,
    selectBoxOutlineHoverColor
  } = CryptoState();

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography
              className={headerClasses.title}
              onClick={() => navigate("/bitcoin")}
              variant="h6"
              sx={{ color: siteLogocolor }}
            >
              Crypto
            </Typography>
            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: selectBoxPopupBackColor,
                    color: selectBoxPopupTextColor,
                    "& .MuiMenuItem-root": {
                      padding: 1
                    },
                    "&:hover": {}
                  }
                }
              }}
              sx={[
                {
                  width: 100,
                  height: 40,

                  backgroundColor: selectBoxBackColor,
                  color: selectBoxTextColor,
                  "&:hover": {
                    backgroundColor: selectBoxBackHoverColor,
                    color: selectBoxTextHoverColor
                  },
                  ".MuiSelect-icon": {
                    color: selectBoxIconColor
                  },

                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: selectBoxOutlineColor
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: selectBoxOutlineFocusColor
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: selectBoxOutlineHoverColor
                  }
                }
              ]}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {/* for LogIn button & form */}
            {user ? <UserSidebar /> : <AuthModal />}
            {/* for LogIn button & form */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
