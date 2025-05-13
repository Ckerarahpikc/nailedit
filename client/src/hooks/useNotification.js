import { useContext, createContext } from "react";

const NotificationContext = createContext();

function useNotification() {
  return useContext(NotificationContext);
}

export { NotificationContext, useNotification };
