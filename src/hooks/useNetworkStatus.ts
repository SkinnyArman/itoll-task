"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";

export const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState<boolean>(navigator.onLine);
  const [isBackOnline, setIsBackOnline] = useState<boolean>(false);
  const wasOfflineRef = useRef<boolean>(!navigator.onLine); // Initialize based on current online status

  const updateNetworkStatus = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    const handleOnline = () => {
      updateNetworkStatus();
      if (wasOfflineRef.current) {
        toast.dismiss(); // Clear all previous toasts
        toast.success("You're Back Online!");
        setIsBackOnline(true);
        wasOfflineRef.current = false;
      }
    };

    const handleOffline = () => {
      updateNetworkStatus();
      toast.dismiss(); // Clear all previous toasts
      toast.error("You Lost Your Connection.");
      wasOfflineRef.current = true;
      setIsBackOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, isBackOnline };
};
