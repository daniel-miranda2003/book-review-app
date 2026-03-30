"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";
import Portal from "./portal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "info";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "info",
}: ConfirmationModalProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <Portal>
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        <div
          className={`relative w-full max-w-sm transform overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl transition-all duration-300 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center mt-2">
            <div
              className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
                variant === "danger"
                  ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                  : "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400"
              }`}
            >
              <AlertCircle className="h-8 w-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              {description}
            </p>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
                  variant === "danger"
                    ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                    : "bg-sky-600 hover:bg-sky-700 shadow-sky-600/20"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
