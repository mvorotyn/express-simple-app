import { BrowserRouter, Routes, Route,} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainPage from "./Pages/MainPage";
import Footer from "./Components/Shared/Footer/Footer";
import AddNewUser from "./Pages/AddNewUser";
import { Page404 } from "./Pages/Page404";

export function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new_user" element={<AddNewUser />} />
        <Route  path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
