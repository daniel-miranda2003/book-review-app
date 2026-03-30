"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Star, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AddReviewPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      book_title: formData.get("book_title"),
      rating: rating,
      review: formData.get("review"),
      mood: formData.get("mood"),
    };

    if (rating === 0) {
      toast.error("Por favor selecciona una calificación de estrellas.");
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Reseña publicada con éxito.");
        router.push("/reviews");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.message || "Error al publicar la reseña.");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8">
      <div className="max-w-xl mx-auto">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a mi biblioteca
        </Link>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-xl p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full" />
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-14 w-14 rounded-2xl bg-sky-50 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
              <BookOpen className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
              Nueva Reseña
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Comparte tu opinión literaria con la comunidad.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Título del Libro
              </label>
              <input
                name="book_title"
                required
                placeholder="Ej. Cien años de soledad"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Calificación
              </label>
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 w-fit p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-0.5 transition-transform active:scale-90"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        star <= (hover || rating)
                          ? "fill-sky-500 text-sky-500"
                          : "text-slate-300 dark:text-slate-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Estado de Ánimo (Mood)
              </label>
              <select
                name="mood"
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all appearance-none"
              >
                <option value="Inspirador">Inspirador</option>
                <option value="Melancólico">Melancólico</option>
                <option value="Emocionante">Emocionante</option>
                <option value="Nostálgico">Nostálgico</option>
                <option value="Reflexivo">Reflexivo</option>
                <option value="Sorprendente">Sorprendente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Tu Reseña
              </label>
              <textarea
                name="review"
                required
                rows={4}
                placeholder="¿Qué te pareció esta lectura?..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl shadow-sky-500/10 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {pending ? "Publicando..." : "Publicar Reseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
