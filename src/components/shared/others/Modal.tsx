import { JobData } from "@/types";
import React, { useEffect } from "react";

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  childCss: string;
  handleModalClose: () => void;
  children?: React.ReactNode;
};

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  handleModalClose,
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
      className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-sm w-full h-full max-h-screen flex justify-center items-center overflow-y-auto"
      onClick={handleModalClose}
    >
      <div onClick={(e) => e.stopPropagation()} className={childCss}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
