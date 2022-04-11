import { BrowserRouter, Routes, Route,} from "react-router-dom";

import MainPage from "./Pages/MainPage";
import Footer from "../Components/Shared/Footer/Footer";
import AddNewUser from "./Pages/AddNewUser";
import { PageNotFound } from "./Pages/Page404";
import { CssBaseline } from "@mui/material";

export function Layout() {
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
        <Route  path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
