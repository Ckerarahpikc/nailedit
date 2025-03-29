import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<Navigate to="/home" replace />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/profile"} element={<Profile />} />
          </Route>

          <Route index path={"/login"} element={<Login />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
