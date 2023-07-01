"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

const RootPage = () => {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default RootPage;
