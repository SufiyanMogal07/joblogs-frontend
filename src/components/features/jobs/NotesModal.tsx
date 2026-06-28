import Modal from "@/components/shared/others/Modal";
import { Notebook, X } from "lucide-react";

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
      handleModalClose={() => {setIsModalOpen(false)}}
      childCss="
    mt-10 md:m-0
    bg-slate-900/95 backdrop-blur-xl
    border border-slate-700/50
    w-[90vw] max-w-2xl
    h-[80vh]
    rounded-2xl
    shadow-2xl shadow-black/50
    overflow-hidden
    flex flex-col
  "
    >
      {/* Header - Fixed Height */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Job Notes
          </h1>
          <p className="text-xs text-slate-400">Reviewing details</p>
        </div>

        <button
          onClick={() => setIsModalOpen(false)}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content - Scrollable area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-700">
        {notes ? (
          <div className="prose prose-invert prose-slate max-w-none">
            <p className="font-mono text-[15px] text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-indigo-500/30">
              {notes}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <Notebook className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-lg font-medium">No notes available</p>
            <span className="text-sm">Start by editing the job details.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NotesModal;
