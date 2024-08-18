"use client";

import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function NetworkCheck() {
  const { isOnline, isBackOnline } = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) {
      toast.error("You Lost Your Connection.");
    }
  }, [isOnline]);

  useEffect(() => {
    if (isBackOnline) {
      toast.success("You're Back Online!");
    }
  }, [isBackOnline]);

  return null;
}
