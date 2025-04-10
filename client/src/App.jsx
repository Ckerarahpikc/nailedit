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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
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
          removeDelay: 1000,
          style: {
            background: "var(--color-grey-50)",
            color: "var(--color-grey-900)",
            border: "1px solid var(--color-grey-300)",
            borderRadius: "var(--border-radius-md)",
            boxShadow: "var(--shadow-md)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "var(--color-brand-500)",
              secondary: "var(--color-grey-50)",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "var(--color-brand-600)",
              secondary: "var(--color-grey-50)",
            },
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
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
