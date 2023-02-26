// ------------fireBase-----------------
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
// ------------fireBase-----------------

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import {
  Container,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
  LinearProgress,
  Pagination,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box
} from "@mui/material";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

/* ---------------for tab------------- */

import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";

/* ---------------for tab------------- */

/* ---------------for graph------------- */

// for API data

import { chartDays } from "../config/data";

// for API data

// for chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

// for chart

import { CircularProgress } from "@mui/material";

import SelectButton from "./SelectButton";

import { paginationColor } from "../CryptoContext";

/* ---------------for graph------------- */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
    "&:hover": {},
    fontFamily: "Montserrat"
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: paginationColor
    }
  }
});

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Coinstable() {
  const {
    currency,
    setCurrency,
    symbol,

    days,
    setDays,
    flag,
    setflag,

    setParamCoinIDState,

    coins,
    coinDetails,
    historicData,

    user,
    setAlert,
    watchlist,
    loading,
    darkTheme,
    coinListGridBackColor,
    textFieldInputColor,
    textFieldLabelColor,
    textFieldBorderColor,
    textFieldBorderHoverColor,
    textFieldBorderFocusColor,
    appBarBackColor,
    appBarTextColor,
    appBarBackHoverColor,
    appBarTextHoverColor,
    circularProgressColor,
    linearProgressColor,
    currencySymbolColor,
    graphGridBackColor,
    graphGridBorderColor,
    graphLineBorderColor,
    buttonBorderColor,
    buttonBackColor,
    buttonTextColor,
    buttonBackHoverColor,
    buttonTextHoverColor,
    buttonBackActiveColor,
    buttonTextActiveColor,
    buttonBackActiveHoverColor,
    buttonTextActiveHoverColor
  } = CryptoState();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [favorite, setFavorite] = useState(false);

  const handleSearch = () => {
    if (!favorite) {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    } else {
      return coins.filter(
        (coin) =>
          watchlist.includes(coin.id) &&
          (coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search))
      );
    }
  };

  // -------------------------------------------------------

  // -----------------for watchlist--------------

  const watchlistLength = watchlist.length > 0;

  const addToWatchlist = async (coin2) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin2?.id] : [coin2?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin2.name} Added to the Watchlist !`,
        type: "success"
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      });
    }
  };

  const removeFromWatchlist = async (coin2) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin2?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin2.name} Removed from the Watchlist !`,
        type: "success"
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      });
    }
  };

  // -----------------for watchlist--------------

  // ------------------------------------------------------

  const classes = useStyles();
  const navigate = useNavigate();

  /* ---------------for tab------------- */

  const theme = useTheme();

  const [value, setValue] = useState(0);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
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
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ----------------for coinDetails--------------

  const { paramCoinID } = useParams();

  useEffect(() => {
    setParamCoinIDState(paramCoinID);
  }, [paramCoinID]);

  // --------------------------------------------------------------

  if (!coinDetails)
    return <LinearProgress style={{ backgroundColor: linearProgressColor }} />;

  // ----------------for coinDetails--------------

  /* ---------------for graph------------- */

  const theme2 = createTheme();

  const ContainerStyle = styled("div")({
    width: "100%",
    minHeight: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: 40,
    [theme2.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0
    }
  });

  const HeadingStyle = styled("span")({
    fontWeight: "bold",
    marginBottom: 1,
    fontFamily: "Montserrat"
  });

  const MarketDataStyle = styled("div")({
    padding: 1,
    paddingTop: 1,

    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around"
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start"
    }
  });

  // ---------------------------------

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  /* ---------------for graph------------- */

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "montserrat" }}
        >
          Cryptocurrency Price By Market Cap
        </Typography>

        {/* --------------------------------------------- */}

        {/* -----------------for tab and graph full width---------------- */}

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* ---------------for tab------------- */}

            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              sx={{
                bgcolor: coinListGridBackColor
              }}
            >
              {/* ---------------for searchField------------- */}

              <TextField
                label="search for cryptocurrency..."
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
                inputProps={{ sx: { color: textFieldInputColor } }}
                InputLabelProps={{
                  style: { color: textFieldLabelColor }
                }}
                sx={{
                  marginBottom: 2,
                  width: "50%",

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: textFieldBorderColor
                    },
                    "&:hover fieldset": {
                      borderColor: textFieldBorderHoverColor
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: textFieldBorderFocusColor
                    }
                  }
                }}
              />
              {/* ---------------for searchField------------- */}

              <Box sx={{ width: "100%" }}>
                <AppBar
                  position="static"
                  sx={{
                    transition: "all 0.5s",
                    backgroundColor: appBarBackColor,
                    color: appBarTextColor,
                    "&:hover": {
                      backgroundColor: appBarBackHoverColor,
                      color: appBarTextHoverColor
                    }
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    {user && (
                      <Tab
                        onClick={() => {
                          watchlistLength
                            ? setFavorite(!favorite)
                            : setFavorite(false);
                        }}
                        label={
                          watchlistLength ? (
                            <AiFillStar fontSize="25px" />
                          ) : (
                            <AiOutlineStar fontSize="25px" />
                          )
                        }
                        {...a11yProps(0)}
                      />
                    )}
                    <Tab
                      label="INR"
                      {...a11yProps(1)}
                      onClick={() => {
                        setCurrency("INR");
                      }}
                    />
                    <Tab
                      label="USD"
                      {...a11yProps(2)}
                      onClick={() => {
                        setCurrency("USD");
                      }}
                    />
                  </Tabs>
                </AppBar>

                {[0, 1, 2].map((indValue, i) => {
                  return (
                    <TabPanel
                      value={value}
                      index={indValue}
                      dir={theme.direction}
                      key={indValue}
                    >
                      {loading ? (
                        <CircularProgress
                          style={{ color: circularProgressColor }}
                          size={250}
                          thickness={1}
                        />
                      ) : (
                        handleSearch()
                          .slice((page - 1) * 10, (page - 1) * 10 + 10)
                          .map((row) => {
                            const profit = row.price_change_percentage_24h > 0;
                            return (
                              <Box
                                key={row?.id}
                                sx={{
                                  cursor: "pointer",
                                  width: "100%",
                                  height: "auto",

                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  backgroundColor: "primary.dark",
                                  "&:hover": {
                                    backgroundColor: "primary.main",
                                    opacity: [0.9, 0.8, 0.7]
                                  }
                                }}
                              >
                                {user && (
                                  <Box
                                    component="span"
                                    variant="outlined"
                                    style={{
                                      width: "10%",
                                      height: "auto",
                                      alignSelf: "center"
                                    }}
                                    onClick={() =>
                                      watchlist.includes(row?.id)
                                        ? removeFromWatchlist(row)
                                        : addToWatchlist(row)
                                    }
                                  >
                                    {watchlist.includes(row?.id) ? (
                                      <AiFillStar fontSize="25px" />
                                    ) : (
                                      <AiOutlineStar fontSize="25px" />
                                    )}
                                  </Box>
                                )}

                                <Box
                                  component="span"
                                  onClick={() => {
                                    return (
                                      navigate(`/${row.id}`),
                                      setParamCoinIDState(row.id)
                                    );
                                  }}
                                  sx={{
                                    width: "100%",

                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                  }}
                                >
                                  <Box
                                    component="span"
                                    sx={{
                                      alignSelf: "center"
                                    }}
                                  >
                                    <img
                                      src={row?.image}
                                      alt={row.name}
                                      height="30"
                                    />
                                  </Box>
                                  <Box
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "70%"
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        fontWeight: "bold",

                                        textTransform: "uppercase",
                                        alignSelf: "center"
                                      }}
                                    >
                                      {row?.symbol}
                                      &nbsp;
                                    </Box>

                                    <Box
                                      component="span"
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        width: "60%"
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: currencySymbolColor
                                        }}
                                      >
                                        {symbol}
                                      </span>
                                      {numberWithCommas(
                                        row?.current_price.toFixed(2)
                                      )}
                                      <span
                                        style={{
                                          color:
                                            profit > 0
                                              ? "rgb(14,203,129)"
                                              : "red",
                                          fontWeight: 500
                                        }}
                                      >
                                        {profit && "+"}
                                        {row?.price_change_percentage_24h?.toFixed(
                                          2
                                        )}
                                        %
                                      </span>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            );
                          })
                      )}
                    </TabPanel>
                  );
                })}
              </Box>

              <Pagination
                count={Number((handleSearch()?.length / 10).toFixed(0))}
                style={{
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
                classes={{ ul: classes.pagination }}
                onChange={(_, pagiValue) => {
                  setPage(pagiValue);
                }}
              />
            </Grid>
            {/* ---------------for tab------------- */}

            {/* ---------------for graph------------- */}
            <Grid
              item
              xs={12}
              sm={12}
              md={7}
              sx={{
                bgcolor: graphGridBackColor,

                transition: "all 2s"
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  transition: "all 2s"
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  {!historicData | (flag === false) ? (
                    <CircularProgress
                      style={{ color: circularProgressColor }}
                      size={250}
                      thickness={1}
                    />
                  ) : (
                    <ContainerStyle
                      sx={{
                        border: `1px solid ${graphGridBorderColor}`
                      }}
                    >
                      <img
                        src={coinDetails?.image.large}
                        alt={coinDetails.name || "img"}
                        height="50"
                        style={{ marginBottom: 1 }}
                      />

                      <MarketDataStyle>
                        <span style={{ display: "flex" }}>
                          <HeadingStyle variant="h5">Rank:</HeadingStyle>
                          &nbsp; &nbsp;
                          <HeadingStyle
                            variant="h5"
                            style={{
                              fontFamily: "Montserrat"
                            }}
                          >
                            {numberWithCommas(coinDetails?.market_cap_rank)}
                          </HeadingStyle>
                        </span>

                        <span style={{ display: "flex" }}>
                          <HeadingStyle variant="h5">
                            Current Price:
                          </HeadingStyle>
                          &nbsp; &nbsp;
                          <HeadingStyle
                            variant="h5"
                            style={{
                              fontFamily: "Montserrat"
                            }}
                          >
                            {symbol}
                            {numberWithCommas(
                              coinDetails?.market_data.current_price[
                                currency.toLowerCase()
                              ]
                            )}
                          </HeadingStyle>
                        </span>
                        <span style={{ display: "flex" }}>
                          <HeadingStyle variant="h5">Market Cap:</HeadingStyle>
                          &nbsp; &nbsp;
                          <HeadingStyle
                            variant="h5"
                            style={{
                              fontFamily: "Montserrat"
                            }}
                          >
                            {symbol}
                            {numberWithCommas(
                              coinDetails?.market_data.market_cap[
                                currency.toLowerCase()
                              ]
                                .toString()
                                .slice(0, -6)
                            )}
                            M
                          </HeadingStyle>
                        </span>
                      </MarketDataStyle>

                      {!historicData | (flag === false) ? (
                        <CircularProgress
                          style={{ color: circularProgressColor }}
                          size={250}
                          thickness={1}
                        />
                      ) : (
                        <>
                          <Line
                            data={{
                              labels: historicData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                  date.getHours() > 12
                                    ? `${
                                        date.getHours() - 12
                                      }:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1
                                  ? time
                                  : date.toLocaleDateString();
                              }),

                              datasets: [
                                {
                                  data: historicData.map((coin) => coin[1]),
                                  label: `Price ( Past ${days} Days ) in ${currency}`,
                                  borderColor: graphLineBorderColor
                                }
                              ]
                            }}
                          />

                          {/* ---------------------------------------------------------- */}
                          <div
                            style={{
                              display: "flex",
                              marginTop: 20,
                              justifyContent: "space-around",
                              width: "100%"
                            }}
                          >
                            {chartDays.map((day) => (
                              <SelectButton
                                key={day.value}
                                onClick={() => {
                                  setDays(day.value);
                                  setflag(false);
                                }}
                                selected={day.value === days}
                                style={[
                                  {
                                    border: `1px solid ${buttonBorderColor}`,

                                    backgroundColor: buttonBackColor,
                                    color: buttonTextColor,
                                    fontWeight: 500,

                                    "&:hover": {
                                      backgroundColor: buttonBackHoverColor,
                                      color: buttonTextHoverColor
                                    }
                                  },
                                  day.value === days && {
                                    backgroundColor: buttonBackActiveColor,
                                    color: buttonTextActiveColor,
                                    fontWeight: 700,
                                    "&:hover": {
                                      backgroundColor: buttonBackActiveHoverColor,
                                      color: buttonTextActiveHoverColor
                                    }
                                  }
                                ]}
                              >
                                {day.label}
                              </SelectButton>
                            ))}
                          </div>
                        </>
                      )}
                    </ContainerStyle>
                  )}
                </ThemeProvider>
              </Box>
            </Grid>
            {/* ---------------for graph------------- */}
          </Grid>
        </Box>

        {/* -----------------for tab and graph full width---------------- */}
      </Container>
    </ThemeProvider>
  );
}
