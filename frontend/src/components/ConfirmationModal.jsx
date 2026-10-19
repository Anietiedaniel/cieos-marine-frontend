import React from "react";

const ConfirmationModal = ({ type, onClose, onConfirm }) => {
  const configs = {
    clear: {
      title: "Clear this chat?",
      description: "This chat will be cleared but will remain on your chat list",
      confirmText: "Clear chat",
      showSecondary: false,
    },
    delete: {
      title: 'Delete "Inspection of Deck"',
      description: 'This message will be removed from "Team Hub"',
      confirmText: "Delete",
      showSecondary: false,
    },
    exit: {
      title: 'Exit Chat "Inspection of Deck"',
      description: "Members would be notified of your exit",
      confirmText: "Exit Team",
      secondaryText: "Exit & delete for me",
      showSecondary: true,
    },
  };

  const config = configs[type];
  if (!config) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-[450px] rounded-[24px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-[20px] font-bold text-gray-900 mb-2">{config.title}</h2>
        <p className="text-[14px] text-gray-500 mb-8 font-medium">{config.description}</p>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-[14px] border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {config.showSecondary && (
            <button
              onClick={() => onConfirm('secondary')}
              className="px-6 py-3 rounded-[14px] border border-red-500 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors cursor-pointer"
            >
              {config.secondaryText}
            </button>
          )}

          <button
            onClick={() => onConfirm('primary')}
            className="px-8 py-3 rounded-[14px] bg-[#E11D48] text-white text-sm font-bold hover:bg-red-700 transition-shadow cursor-pointer shadow-md"
          >
            {config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;