import { useEffect, useRef } from "react";

// this component will handle clicks from the user ("current click was inside or outside the modal?" ahh component)
export default function useClickOutsideEffect({ callback }) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // (the doom element being monitored && 'e.target' - the element was clicked)
      if (ref.current && !ref.current?.contains(e.target)) {
        // means that 'the element was clicked' IS inside the doom element -that was being monitored (ref.current)
        callback();
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [callback]);
  // we return ref and this ref should be attached to the element we want to use this effect of running 'callback' if clicked outside
  return { ref };
}
