"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { login } from "@/app/_lib/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] p-8 border border-slate-100/80 dark:border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
            <Link href="/" className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400">
                <BookOpen className="h-6 w-6" />
            </Link>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Bienvenido
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm">
            Inicia sesión para comenzar a escribir y organizar tu biblioteca literaria.
          </p>
        </div>

        <form action={action} className="space-y-5">
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
              placeholder="lector@ejemplo.com"
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
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-500">{state.errors.password[0]}</p>
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
            className="w-full rounded-2xl bg-slate-900 dark:bg-white px-4 py-3 text-sm font-semibold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-sm shadow-slate-900/10 dark:shadow-white/10"
          >
            {pending ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
