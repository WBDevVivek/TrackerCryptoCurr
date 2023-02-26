import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CoinList, HistoricalChart, SingleCoin } from "./config/api";

// for firebase-------------------------------------

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { createTheme } from "@mui/material";

// for firebase-------------------------------------

// ------------for color------------

export const BackColor = "#0b1426";
export const Buttoncolor = "rgba(17,153,250,.25)";
export const BtnTxt = "#0b1e37";
export const BtnActive = "#24a0f5";
export const siteLogoColor = BtnActive;
export const siteBackColor = BackColor;
export const siteTextColor = BtnActive;
export const linearProgressColor = BtnActive;
export const circularProgressColor = BtnActive;
export const paginationColor = BtnActive;
export const buttonBorderColor = Buttoncolor;
export const buttonBackColor = "";
export const buttonTextColor = BtnActive;
export const buttonBorderHoverColor = "";
export const buttonBackHoverColor = BtnTxt;
export const buttonTextHoverColor = BtnActive;
export const buttonBorderActiveColor = "";
export const buttonBackActiveColor = BtnActive;
export const buttonTextActiveColor = BtnTxt;
export const buttonBorderActiveHoverColor = "";
export const buttonBackActiveHoverColor = BackColor;
export const buttonTextActiveHoverColor = BtnActive;
export const authButtonBackColor = Buttoncolor;
export const authButtonTextColor = BtnActive;
export const authButtonBorderColor = "transparent";
export const authButtonBackHoverColor = BtnTxt;
export const authButtonTextHoverColor = BtnActive;
export const authButtonBorderHoverColor = BtnActive;
export const coinListGridBackColor = BtnTxt;
export const graphGridBackColor = BackColor;
export const graphGridBorderColor = Buttoncolor;
export const graphLineBorderColor = Buttoncolor;
export const currencySymbolColor = BtnActive;
export const textFieldInputColor = "#fff";
export const textFieldLabelColor = Buttoncolor;
export const textFieldBorderColor = BtnActive;
export const textFieldBorderHoverColor = BackColor;
export const textFieldBorderFocusColor = Buttoncolor;
export const selectBoxPopupBackColor = BtnTxt;
export const selectBoxPopupTextColor = BtnActive;
export const selectBoxBackColor = "";
export const selectBoxBackHoverColor = BtnTxt;
export const selectBoxTextColor = BtnActive;
export const selectBoxTextHoverColor = BtnActive;
export const selectBoxIconColor = BtnActive;
export const selectBoxOutlineColor = BtnActive;
export const selectBoxOutlineFocusColor = BtnTxt;
export const selectBoxOutlineHoverColor = Buttoncolor;
export const appBarBackColor = Buttoncolor;
export const appBarBackHoverColor = BackColor;
export const appBarTextColor = BtnActive;
export const appBarTextHoverColor = BtnActive;

// ------------for color------------

const Crypto = createContext();

export function CryptoContext({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  // ------------------for user singIn--------------------------------------------

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // ---------------------for user singIn-----------------------------------------

  // ------------for alert msj when login or signup-----------------------------------

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  });

  // ------------for alert msj when login or signup-----------------------------------

  // -----------------for watchlist-------------------

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  // -----------------for watchlist-------------------

  // for Coinstable state-------------------------------------

  const [coins, setCoins] = useState([]);
  const [coinDetails, setCoinDetails] = useState();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  const [loading, setLoading] = useState(false);

  const [paramCoinIDState, setParamCoinIDState] = useState("bitcoin");

  // -----------------------------------------

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(paramCoinIDState));

    setCoinDetails(data);
  };

  const fetchHistoricData = async () => {
    const { data } = await axios.get(
      HistoricalChart(paramCoinIDState, days, currency)
    );
    setHistoricData(data.prices);
    setflag(true);
  };

  // --------------------memoize Var-----------------

  const memoizeParamCoinID = React.useMemo(() => paramCoinIDState, [
    paramCoinIDState
  ]);
  const memoizeDays = React.useMemo(() => days, [days]);
  const memoizeCurrency = React.useMemo(() => currency, [currency]);

  // --------------------memoize Var-----------------

  // --------------------memoize fu-----------------

  const memoizeFetchCoins = React.useCallback(
    () => fetchCoins(),

    [memoizeCurrency, memoizeDays]
  );

  const memoizeFetchCoin = React.useCallback(
    () => fetchCoin(),

    [memoizeParamCoinID]
  );

  const memoizeFetchHistoricData = React.useCallback(
    () => fetchHistoricData(),

    [memoizeParamCoinID, memoizeDays, memoizeCurrency]
  );

  // --------------------memoize fu-----------------

  useEffect(() => {
    memoizeFetchCoin();
    memoizeFetchHistoricData();
    return () => setHistoricData();
  }, [memoizeParamCoinID, memoizeDays]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    memoizeFetchHistoricData();
    memoizeFetchCoins();
  }, [memoizeCurrency]);

  // for Coinstable state------------------------------------

  // ----------------------------------

  // -------------------------------------

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fffff"
      },
      mode: "dark"
    }
  });

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        setSymbol,
        days,
        setDays,
        flag,
        setflag,
        paramCoinIDState,
        setParamCoinIDState,
        alert,
        setAlert,

        user,
        watchlist,
        coins,
        CoinList,
        coinDetails,
        historicData,

        loading,

        fetchCoins,

        darkTheme,
        Buttoncolor,
        BackColor,
        BtnTxt,
        BtnActive,

        siteLogoColor,
        siteBackColor,
        siteTextColor,
        linearProgressColor,
        circularProgressColor,
        paginationColor,
        buttonBorderColor,
        buttonBackColor,
        buttonTextColor,
        buttonBorderHoverColor,
        buttonBackHoverColor,
        buttonTextHoverColor,
        buttonBorderActiveColor,
        buttonBackActiveColor,
        buttonTextActiveColor,
        buttonBorderActiveHoverColor,
        buttonBackActiveHoverColor,
        buttonTextActiveHoverColor,
        authButtonBackColor,
        authButtonTextColor,
        authButtonBorderColor,
        authButtonBackHoverColor,
        authButtonTextHoverColor,
        authButtonBorderHoverColor,
        coinListGridBackColor,
        graphGridBackColor,
        graphGridBorderColor,
        graphLineBorderColor,
        currencySymbolColor,
        textFieldInputColor,
        textFieldLabelColor,
        textFieldBorderColor,
        textFieldBorderHoverColor,
        textFieldBorderFocusColor,
        selectBoxPopupBackColor,
        selectBoxPopupTextColor,
        selectBoxBackColor,
        selectBoxBackHoverColor,
        selectBoxTextColor,
        selectBoxTextHoverColor,
        selectBoxIconColor,
        selectBoxOutlineColor,
        selectBoxOutlineFocusColor,
        selectBoxOutlineHoverColor,
        appBarBackColor,
        appBarBackHoverColor,
        appBarTextColor,
        appBarTextHoverColor,
        navigate,
        location
      }}
    >
      {children}
    </Crypto.Provider>
  );
}

export const CryptoState = () => {
  return useContext(Crypto);
};
