import React, { useEffect } from "react";

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  childCss: string;
  children?: React.ReactNode;
};

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  childCss,
  children,
}: ModalProps) => {

   useEffect(() => {
      if (!isModalOpen) {
        document.body.style.overflow = "auto";
        return;
      }
      document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isModalOpen]);
  if (!isModalOpen) return null;


  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm w-full h-full max-h-screen flex justify-center md:items-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className={childCss}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
