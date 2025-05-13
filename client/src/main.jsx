import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import NotificationProvider from "./contexts/NotificationContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
