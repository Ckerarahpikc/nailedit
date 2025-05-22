import { useRef } from "react";
import toast from "react-hot-toast";

import { MAX_TOASTS_NOTIFICATIONS } from "../utils/constants";
import { NotificationContext } from "../hooks/useNotification";

export default function NotificationProvider({ children }) {
  const toasts = useRef([]);

  const showNotification = (message, type = "error") => {
    if (!message) {
      return;
    }

    if (toasts.current.length >= MAX_TOASTS_NOTIFICATIONS) {
      const oldToast = toasts.current.shift();
      if (oldToast) toast.dismiss(oldToast);
    }

    let toastId;
    if (type === "error") {
      toastId = toast.error(message);
    } else if (type === "success") {
      toastId = toast.success(message);
    } else {
      toastId = toast(message);
    }

    toasts.current.push(toastId);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
