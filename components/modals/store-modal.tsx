"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const { isOpen, onClose } = storeModal;
  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      Future Create Store Form
    </Modal>
  );
};
