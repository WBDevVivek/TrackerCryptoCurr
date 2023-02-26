import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import "./styles.css";

import Alert from "./components/Alert";

import { makeStyles } from "@mui/styles";

import { CryptoState } from "./CryptoContext";

const useStyles = makeStyles({
  App: {
    minHeight: "100vh"
  }
});

export default function App() {
  const classes = useStyles();

  const { navigate, location, siteBackColor, siteTextColor } = CryptoState();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/bitcoin");
    }
  });

  return (
    <>
      <div
        className={classes.App}
        style={{ backgroundColor: siteBackColor, color: siteTextColor }}
      >
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/:paramCoinID" element={<Homepage />} />
        </Routes>
      </div>
      <Alert />
    </>
  );
}
