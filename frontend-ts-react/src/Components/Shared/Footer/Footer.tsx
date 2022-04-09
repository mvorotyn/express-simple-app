import { Paper, Typography, Box } from "@mui/material/";

const Styles = {
  root: {
    background: "#52c7b8",
    //"linear-gradient(to right, #6a3093 0%, #a044ff  51%, #6a3093  100%) ",

    border: 0,
    borderRadius: 0,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    display: "flex",
  },
  test: {
    backgroundColor: "grey",
    color: "red",
  },
};

function Footer() {
  return (
    <Box
      sx={Styles.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      justifyItems="center"
      alignItems="center"
    >
      <Typography variant="h5" component="h3">
        Mark Vorotyntsev
      </Typography>
      <Typography component="p">
        @2022 All right reserved.Tech Stack: TypeScript, React, Material UI,
        Mobx-State-Tree
      </Typography>
    </Box>
  );
}

export default Footer;
