import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";

import FullCalendarStyles from "./styles/FullCalendarStyles";
import CalendarDay from "./elements/schedule/CalendarDay";
import Settings from "./pages/Settings";
import ProtectedRouteContext from "./contexts/ProtectedRouteContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            color: "var(--color-grey-900)",
            border: "1px solid var(--color-grey-300)",
            borderRadius: "var(--border-radius-md)",
            boxShadow: "var(--shadow-md)",
            fontFamily: "'Lato', sans-serif",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "var(--color-success)",
              secondary: "var(--color-grey-100)",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "var(--color-error)",
              secondary: "var(--color-grey-100)",
            },
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <FullCalendarStyles />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRouteContext>
                <AppLayout />
              </ProtectedRouteContext>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule/:dateId" element={<CalendarDay />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
