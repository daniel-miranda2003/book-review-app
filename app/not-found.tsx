import Link from "next/link";
import { BookX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <BookX className="h-12 w-12 text-slate-400" />
          </div>
        </div>
        <h1 className="font-serif text-6xl font-black text-slate-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Page torn out
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          The page you're looking for seems to have been ripped from this book. It might have been moved or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 dark:bg-white px-8 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:scale-105 shadow-md"
        >
          Return to Library
        </Link>
      </div>
    </div>
  );
}
