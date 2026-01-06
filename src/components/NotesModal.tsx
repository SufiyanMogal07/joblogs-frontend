import React from "react";
import Modal from "./Modal";
import { X } from "lucide-react";

type NotesModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  notes?: string;
};

const NotesModal = ({
  isModalOpen,
  setIsModalOpen,
  notes,
}: NotesModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      childCss="
      mt-10
        md:m-0
        bg-gray-900 
        w-[90vw] max-w-2xl
        h-[80vh] 
        rounded-xl 
        shadow-xl 
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-white">Notes</h1>

        <button
          onClick={() => setIsModalOpen(false)}
          className="p-1 rounded-md hover:bg-gray-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Content */}
      <div className="h-[70vh] overflow-y-auto px-6 py-5">
        {notes ? (
          <p className="font-mono text-base text-slate-200 leading-relaxed whitespace-pre-wrap">
            {notes}
          </p>
        ) : (
          <p className="text-lg text-center mt-20 text-gray-300">
            No notes added yet
          </p>
        )}
      </div>
    </Modal>
  );
};

export default NotesModal;
