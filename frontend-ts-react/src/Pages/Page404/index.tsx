import { Box, Button, Container, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../Components/UsersTable/UsersTable";
import { useStore } from "../../hooks/use-store";
// import './main-page.css'
const Styles = {
  root: {
    background: "#e0e0e0",

    display: "flex",
    minHeight: "100vh",
  },
  test: {
    backgroundColor: "grey",
    color: "red",
  },
};

export function Page404() {
  const [count, setCount] = useState(0);
  const store = useStore();
  const navigate = useNavigate();

  return (
    <div style={Styles.root}>
      <Container maxWidth="md">
      <Box
      sx={Styles.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      justifyItems="center"
      alignItems="center"
    >
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography component="p">
        Page not found!
      </Typography>
      <Button color="primary"  onClick={(event)=>{navigate('/')}} variant="contained" style={{marginTop: 20, marginBottom: 20, backgroundColor:'grey'}}>Back to Home</Button>
    </Box>
       
      </Container>
    </div>
  );
}