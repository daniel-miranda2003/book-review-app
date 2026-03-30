import { BookOpen, LogOut, Plus, Search } from "lucide-react";
import { logout } from "@/app/_lib/actions/auth";
import { ThemeToggle } from "@/app/_components/ui/theme-toggle";
import { verifySession } from "@/app/_lib/auth";
import ReviewList from "@/app/_components/reviews/review-list";
import Link from "next/link";

export default function ReviewsDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-slate-200/60 bg-white/70 px-8 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/70 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-sky-500/10 dark:bg-sky-500/20 rounded-xl flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
          <span className="font-serif font-bold tracking-tight text-2xl text-slate-900 dark:text-white">
            Daniel's Library
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-8 md:p-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest mb-6 border border-sky-100 dark:border-sky-900/50">
               Lectura Actual
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Tu Diario de Lectura
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
              Bienvenido a tu espacio literario. Explora todas las historias que has curado y comparte tus impresiones con la comunidad.
            </p>
          </div>

          <Link
            href="/add-review"
            className="inline-flex items-center justify-center gap-3 rounded-3xl bg-sky-600 px-8 py-4 text-white text-base font-bold shadow-2xl shadow-sky-600/30 hover:bg-sky-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 whitespace-nowrap"
          >
            <Plus className="h-6 w-6" />
            Nueva Reseña
          </Link>
        </div>

        <section className="relative">
           <ReviewListWrapper />
        </section>
      </main>
    </div>
  );
}

async function ReviewListWrapper() {
  const session = await verifySession();
  return <ReviewList currentUserId={session?.userId} />;
}
