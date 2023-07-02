"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure you want to delete the store?'
      description='This action is irreversible.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex items-center justify-end w-full pt-6 space-x-2'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
