import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"*"} element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
