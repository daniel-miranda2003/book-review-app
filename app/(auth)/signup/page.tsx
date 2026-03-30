"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { signup } from "@/app/_lib/actions/auth";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] p-8 border border-slate-100/80 dark:border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
            <Link href="/" className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400">
                <BookOpen className="h-6 w-6" />
            </Link>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
            Únete a Daniel's Library
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm">
            Crea una cuenta para comenzar a reseñar libros hoy mismo.
          </p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              className="w-full rounded-2xl border border-slate-300/80 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
            />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full rounded-2xl border border-slate-300/80 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-300/80 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[10px] p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full"
                aria-label={showPassword ? "Ocultar" : "Mostrar"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.password.join(" ")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
               <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-300/80 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors pr-10"
              />
               <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[10px] p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full"
                aria-label={showConfirmPassword ? "Ocultar" : "Mostrar"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {state?.errors?.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.confirmPassword.join(" ")}
              </p>
            )}
          </div>

          {state?.message && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-400 font-medium text-center border border-red-200 dark:border-red-900/50">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-sm shadow-sky-600/30"
          >
            {pending ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
