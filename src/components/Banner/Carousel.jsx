import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

import {
  Box,
  createTheme,
  ThemeProvider,
  Typography,
  Paper
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { NavLink } from "react-router-dom";
// for react-alice-carousel
import AliceCarousel from "react-alice-carousel";
// for react-alice-carousel End

const useStyle = makeStyles({
  carouselStyle: {
    height: "50%",
    display: "flex",
    alignItems: "center"
  },
  carouselItem: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white"
  },
  forTry: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around"
  }
});

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

export default function Carousel() {
  const carouselClass = useStyle();

  const [trending, setTrending] = useState([]);

  const { currency, symbol, BtnActive } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  // console.log("Carousel.jsx" + trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profite = coin.price_change_percentage_24h >= 0;

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: "100%",
              height: "100%",
              p: 2
            }
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `1px solid ${BtnActive}`,
              backgroundColor: "#0b1426",
              scrollBehavior: "smooth",
              transition: "all 0.5s"
            }}
            onClick={() => window.scroll(0, 150)}
          >
            <NavLink to={`/${coin.id}`} className={carouselClass.carouselItem}>
              <div className={carouselClass.forTry}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  {coin?.symbol}
                  &nbsp;
                </Typography>
                <span
                  style={{
                    color: profite > 0 ? "rgb(14,203,129)" : "red",
                    fontWeight: 500
                  }}
                >
                  {profite && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>

              <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{
                  marginBottom: 10
                }}
              />
              <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol}
                {numberWithCommas(coin?.current_price.toFixed(2))}
              </span>
            </NavLink>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  });

  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 4
    }
  };

  return (
    <div className={carouselClass.carouselStyle}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
}
