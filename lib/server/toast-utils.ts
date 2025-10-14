import type { Toast } from "@/components/ui/use-toast"

export type ToastType = "success" | "error" | "info" | "debug"

export interface ToastOptions {
  title?: string
  description: string
  type: ToastType
}

export const createToast = ({ title, description, type }: ToastOptions): Toast => {
  const defaultTitles: Record<ToastType, string> = {
    success: "Succès",
    error: "Erreur",
    info: "Information",
    debug: "Débogage",
  }

  const variants: Record<ToastType, "default" | "destructive"> = {
    success: "default",
    error: "destructive",
    info: "default",
    debug: "default",
  }

  return {
    title: title || defaultTitles[type],
    description,
    variant: variants[type],
  }
}
