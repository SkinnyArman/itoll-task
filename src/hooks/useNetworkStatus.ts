"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";

export const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState<boolean>(true); // Default to true initially
  const [isBackOnline, setIsBackOnline] = useState<boolean>(false);
  const wasOfflineRef = useRef<boolean>(false);

  const updateNetworkStatus = () => {
    if (typeof navigator !== "undefined") {
      setOnline(navigator.onLine);
    }
  };

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      // Initialize state based on actual navigator status
      setOnline(navigator.onLine);
      wasOfflineRef.current = !navigator.onLine;

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
    }
  }, []);

  return { isOnline, isBackOnline };
};
