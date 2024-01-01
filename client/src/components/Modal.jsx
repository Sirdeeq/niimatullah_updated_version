import React from "react";

const Modal = ({ closeModal, title, children }) => {
  return (
    <div className="fixed px-5 bottom-0 left-0 w-full flex items-end justify-start">
      <div
        className="modal-overlay bg-black bg-opacity-50 w-full h-full"
        onClick={closeModal}
      ></div>
      <div
        className="modal-content bg-white rounded-tl-lg p-4 w-64"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header border-b border-gray-300 pb-2 mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
