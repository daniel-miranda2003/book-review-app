import Link from "next/link";
import { ThemeToggle } from "@/app/_components/ui/theme-toggle";
import { BookOpen, Star, Sparkles, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/60 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          <span className="font-serif font-bold tracking-tight text-xl text-slate-900 dark:text-white">
            Daniel's Library
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none dark:bg-sky-500/20" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none dark:bg-sky-500/20" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
            <h1 className="font-serif text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl my-6 leading-tight">
              Lee, reseña y{" "}
              <span className="italic font-light text-sky-600 dark:text-sky-400">
                comparte opiniones
              </span>
              .
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Únete a una comunidad de lectores apasionados. Registra tu viaje literario, encuentra listas curadas y comparte ideas sobre los libros que marcan tu mundo.
            </p>
            <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-xl"
              >
                Comienza a explorar
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/login"
                className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-white dark:bg-slate-900 px-8 text-sm font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Inicia sesión
              </Link>
            </div>

            <div className="mt-16 flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-950 bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center"
                  >
                    <Star className="h-3 w-3 text-sky-500 dark:text-sky-400 drop-shadow-sm" />
                  </div>
                ))}
              </div>
              <span>Confiado por miles de lectores</span>
            </div>
        </div>
      </main>
    </div>
  );
}
