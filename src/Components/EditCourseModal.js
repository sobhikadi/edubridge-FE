import { useEffect } from "react";
import React from "react";
import Modal from "react-modal";
import UpdateCourse from "./UpdateCourse";

function EditCourseModal({ isOpen, closeModal, course, onConfirm }) {
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
      contentLabel={course?.title}
      shouldCloseOnOverlayClick={false}
      overlayClassName="fixed inset-0 bg-slate-600 opacity-100 overflow-y-auto"
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 bg-black rounded shadow-lg p-8 z-50"
    >
      <UpdateCourse courseInfo={course} onUpdateCourse={handleConfirm} />
      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-700 text-slate-200 font-bold py-2 px-4 rounded mt-4"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default EditCourseModal;