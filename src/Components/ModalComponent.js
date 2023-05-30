import { useEffect } from "react";
import React from "react";
import Modal from "react-modal";

function ModalComponent({ isOpen, closeModal, title, description, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel={title}
      shouldCloseOnOverlayClick={false}
      overlayClassName="fixed inset-0 bg-slate-600 opacity-80"
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded shadow-lg p-8"
    >
      <h2 className="font-bold text-slate-200 text-2xl mb-4">{description}</h2>

      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-700 text-slate-200 font-bold py-2 px-4 rounded mr-4"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}

export default ModalComponent;
