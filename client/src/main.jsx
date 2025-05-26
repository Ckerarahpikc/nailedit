import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import NotificationProvider from "./contexts/NotificationContext";
import { ModalProvider } from "./contexts/ModalProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <ModalProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </ModalProvider>
);
