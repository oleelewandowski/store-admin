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

  return <div className='p-2'>Root Page</div>;
};

export default RootPage;
