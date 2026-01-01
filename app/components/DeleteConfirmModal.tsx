"use client";

import Modal from "./Modal";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <Modal title="Confirm delete" onClose={onClose}>
      <p>This action cannot be undone.</p>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm} className="bg-red-500 text-white">
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;
