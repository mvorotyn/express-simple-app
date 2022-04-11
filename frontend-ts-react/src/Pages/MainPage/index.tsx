import { Button, Container } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../Components/UsersTable/UsersTable";
import { useStore } from "../../hooks/use-store";
// import './main-page.css'
const Styles = {
  root: {
    // background: "#e0e0e0",
    backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/0236.jpg')",

    display: "flex",
    minHeight: "100vh",
  },
  test: {
    backgroundColor: "grey",
    color: "red",
  },
  mainContainer: {
    backdropFilter: "blur(30px) opacity(1) contrast(0.95)",
  },
};

function App() {
  const [count, setCount] = useState(0);
  const store = useStore();
  const navigate = useNavigate();

  return (
    <div style={Styles.root}>
      <Container style={Styles.mainContainer} maxWidth="md">
        <UsersTable></UsersTable>
        {/* <Button color="primary" onClick={(event)=>{navigate('new_user')}} variant="contained" style={{marginTop: 20, marginBottom: 20, backgroundColor:'grey'}}>  + User</Button> */}
      </Container>
    </div>
  );
}

export default observer(App);

{
  /* <div className="App">
<header className="App-header">
  <p>Hello Vite + React!</p>
  <p>
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      count is: {count}
    </button>
  </p>
  <p>
    Edit <code>App.tsx</code> and save to test HMR updates. {store.tweets[0].toggle()}
  </p>

</header>
</div> */
}
