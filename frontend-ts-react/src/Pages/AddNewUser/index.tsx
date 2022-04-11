import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../Components/UsersTable/UsersTable";
import { useStore } from "../../hooks/use-store";

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

function AddNewUser() {
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
          <Typography variant="h4" component="h4">
            New User Registration
          </Typography>
          <Stack spacing={2} marginTop="30px" sx={{ width: "400px" }}>
            <TextField id="filled-basic" label="Name" variant="filled" />
            <TextField id="filled-basic" label="Postion" variant="filled" />
            <TextField id="filled-basic" label="Phone" variant="filled" />
          </Stack>

          <Button
            color="primary"
            onClick={(event) => {
              navigate("/");
            }}
            variant="contained"
            style={{ marginTop: 70, marginBottom: 20, backgroundColor: "grey" }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default observer(AddNewUser);
