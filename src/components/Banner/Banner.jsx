import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Carousel from "./Carousel";

const bannerIMGNew03 =
  "https://drive.google.com/uc?export=view&id=1Vu89c8R3v2MvOCeihGI3B4HEasrSjQLD";

const useStyles = makeStyles({
  banner: {
    backgroundImage: `linear-gradient(to top,       
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.9) 100%),url(${bannerIMGNew03})`
  },
  bannerContainer: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around"
  },
  tagLine: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  }
});

export default function Banner() {
  const bannerClasses = useStyles();

  return (
    <>
      <div className={bannerClasses.banner}>
        <Container className={bannerClasses.bannerContainer}>
          <div className={bannerClasses.tagLine}>
            <Typography
              variant="h2"
              style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "mantserrat"
              }}
            >
              Trending Coins
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "mantserrat"
              }}
            >
              Get all the info regarding your crypto currency.
            </Typography>
          </div>
          <Carousel />
        </Container>
      </div>
    </>
  );
}
