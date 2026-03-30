"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-red-100 dark:border-red-900/30">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">
          A terrible chapter
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
          Something critically went wrong in the application server while loading this page.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 dark:bg-white px-8 text-sm font-semibold text-white dark:text-slate-900 transition-all hover:bg-slate-800 dark:hover:bg-slate-200"
        >
          Try reading again
        </button>
      </div>
    </div>
  );
}
