import { NotificationContext } from "../hooks/useNotification";
import toast from "react-hot-toast";

export default function NotificationProvider({ children }) {
  const showNotification = (message, type = "error") => {
    if (!message) {
      console.error("Notification message is missing.");
      return;
    }
    if (type === "error") {
      toast.error(message);
    } else if (type === "success") {
      toast.success(message);
    } else {
      toast(message);
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
