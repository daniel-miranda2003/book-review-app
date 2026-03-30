"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function ToastListener() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const successType = searchParams.get("success");
    if (successType) {
      if (successType === "register") {
        toast.success("Cuenta creada con éxito. ¡Bienvenido a Luminary!");
      } else if (successType === "login") {
        toast.success("Sesión iniciada con éxito. ¡Hola de nuevo!");
      }
      const newUrl = pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}
