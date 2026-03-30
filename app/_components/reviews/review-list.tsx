"use client";

import { useEffect, useState } from "react";
import { Star, Trash2, MessageSquare, Quote } from "lucide-react";
import { toast } from "sonner";
import ConfirmationModal from "@/app/_components/ui/confirmation-modal";

export default function ReviewList({ currentUserId }: { currentUserId: number | undefined }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  async function fetchReviews() {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      toast.error("Error al cargar las reseñas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function confirmDelete() {
    if (reviewToDelete === null) return;

    try {
      const res = await fetch(`/api/reviews/${reviewToDelete}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Reseña eliminada.");
        setReviews(reviews.filter((r) => r.id !== reviewToDelete));
      } else {
        toast.error("No se pudo eliminar la reseña.");
      }
    } catch (error) {
      toast.error("Error de red.");
    } finally {
      setReviewToDelete(null);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-slate-100 dark:bg-slate-900 rounded-[2rem]"></div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-16 text-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <MessageSquare className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
        <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Sin reseñas aún</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
          Sé el primero en compartir tu opinión literaria con la biblioteca.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500 flex flex-col"
        >
          <div className="absolute top-6 left-6 opacity-5 dark:opacity-10 pointer-events-none">
             <Quote className="h-12 w-12 text-sky-600" />
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-sky-500 text-sky-500"
                      : "text-slate-200 dark:text-slate-700"
                  }`}
                />
              ))}
            </div>
            {currentUserId === review.user_id && (
              <button
                onClick={() => {
                  setReviewToDelete(review.id);
                  setIsDeleteModalOpen(true);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all active:scale-90"
                title="Eliminar reseña"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
            {review.book_title}
          </h3>
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-4">
            {review.user?.name || "Lector Anónimo"}
          </p>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic mb-6 flex-grow overflow-hidden line-clamp-4">
            "{review.review}"
          </p>

          <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800/50 flex justify-between items-center text-xs">
            <span className="px-3 py-1 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-full font-medium">
              {review.mood}
            </span>
            <span className="text-slate-400 dark:text-slate-500">
              {new Date(review.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      ))}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setReviewToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="¿Eliminar reseña?"
        description="Esta acción es permanente y no se puede deshacer. La reseña se borrará de la biblioteca pública."
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  );
}
