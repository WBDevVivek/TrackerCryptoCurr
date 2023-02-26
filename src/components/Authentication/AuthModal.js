import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import PropTypes from "prop-types";

// ------------for SignUp & Login Page----------------

import Signup from "./Signup";
import Login from "./Login";

// ------------for SignUp & Login Page----------------

// ------------for GoogleButton to signIn----------------

import GoogleButton from "react-google-button";

// ------------for GoogleButton to signIn----------------

// ------------for firebase----------------

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

// ------------for firebase----------------

// ------------for CryptoState----------------
import { CryptoState } from "../../CryptoContext";
// ------------for CryptoState----------------

import SelectButton from "../SelectButton";

// -------------for to Style-----------------------
import { makeStyles } from "@mui/styles";
// -------------for to Style-----------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  transition: "all 0.5s",
  borderRadius: 10,
  boxShadow: 24,
  p: 2,
  margin: "10% 0",
  "@media (max-width: 950px)": {
    top: "70%"
  }
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.5s",
    overflowY: "scroll"
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20
  }
}));

export default function AuthModal() {
  // ----------to Style-------------
  const classes = useStyles();
  // ----------to Style-------------

  // ------------CryptoState----------------

  const {
    setAlert,
    graphGridBorderColor,
    siteBackColor,
    siteTextColor,
    authButtonBackColor,
    authButtonTextColor,
    authButtonBorderColor,
    authButtonBackHoverColor,
    authButtonTextHoverColor,
    authButtonBorderHoverColor
  } = CryptoState();

  // ------------CryptoState----------------

  // ---------------for tab----------

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  // ---------------for tab----------

  // -----------for Google Gmail SignIn----------------

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign In Successful. Welcome ${res.user.email}`,
          type: "success"
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error"
        });
        return;
      });
  };

  // -----------for Google Gmail SignIn----------------

  // -----------------------------------------------------------------------------------

  return (
    <div>
      <SelectButton
        onClick={handleOpen}
        style={{
          width: 85,
          height: 40,
          marginLeft: 2,
          backgroundColor: authButtonBackColor,
          color: authButtonTextColor,
          border: `1px solid ${authButtonBorderColor}`,
          "&:hover": {
            backgroundColor: authButtonBackHoverColor,
            color: authButtonTextHoverColor,
            border: `1px solid ${authButtonBorderHoverColor}`
          }
        }}
      >
        Login
      </SelectButton>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        className={classes.modal}
      >
        <Fade in={open}>
          <Box
            sx={style}
            style={{
              backgroundColor: siteBackColor,
              color: siteTextColor,
              border: `2px solid ${graphGridBorderColor}`
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider"
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Log In" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Login handleClose={handleClose} />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Signup handleClose={handleClose} />
            </TabPanel>

            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
