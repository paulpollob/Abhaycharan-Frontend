import { createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext(null);

const Modal = ({ isOpen, onClose, children, className }) => {
  const containerRef = useRef(null);

  const handleOutsideClose = (e) => {
    if (!containerRef.current?.contains(e.target)) {
      onClose();
    }
  };

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div
        onClick={handleOutsideClose}
        className={`fixed inset-0 flex justify-center items-center bg-gray-800/70 z-[999] delay-500 transition-all ${isOpen ? "visible" : "invisible"
          }`}
      >
        <div
          ref={containerRef}
          className={className || "bg-slate-700 w-fit rounded-md p-5"}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.getElementById("portal")
  );
};

const CloseButton = ({ children }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <button onClick={onClose} className="ml-auto">
      {children ? (
        children
      ) : (
        <svg
          className="size-6 bg-red-400 rounded-md p-0.5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
};

const Header = ({ children }) => {
  return (
    <div className="flex justify-between items-center w-full mb-2">
      {children}
    </div>
  );
};

// Assigning CloseButton and Header as static properties to Modal
Modal.CloseButton = CloseButton;
Modal.Header = Header;

export default Modal;
