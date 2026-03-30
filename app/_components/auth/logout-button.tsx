"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/app/_lib/actions/auth";
import ConfirmationModal from "@/app/_components/ui/confirmation-modal";

export default function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <LogOut className="h-4 w-4" />
        Cerrar Sesión
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={async () => {
          await logout();
        }}
        title="¿Cerrar sesión?"
        description="¿Estás seguro de que deseas salir de tu cuenta? Tendrás que volver a ingresar para escribir nuevas reseñas."
        confirmText="Salir"
        cancelText="Volver"
        variant="info"
      />
    </>
  );
}
