import React from 'react';

export default function ModalFeedback({ open, onClose, title, message, type = "success" }) {
  if (!open) return null;
  const color = type === "success" ? "bg-emerald-500" : type === "error" ? "bg-red-500" : "bg-blue-500";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 relative flex flex-col items-center">
        <span className={`w-12 h-12 flex items-center justify-center rounded-full ${color} text-white text-3xl mb-3`}>
          {type === "success" && "✓"}
          {type === "error" && "!"}
          {type === "info" && "i"}
        </span>
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-center text-gray-600 mb-3">{message}</p>
        <button className="bg-blue-600 text-white rounded-lg px-5 py-2 font-semibold hover:bg-blue-700" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
