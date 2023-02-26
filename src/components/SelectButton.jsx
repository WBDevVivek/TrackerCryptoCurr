import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  selectbutton: {
    transition: "all 0.5s",

    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    textAlign: "center"
  }
});

const SelectButton = ({ children, selected, onClick, style }) => {
  const classes = useStyles();

  return (
    <Box onClick={onClick} className={classes.selectbutton} sx={style}>
      {children}
    </Box>
  );
};

export default SelectButton;

// ---------------------------------------------------------------------------
