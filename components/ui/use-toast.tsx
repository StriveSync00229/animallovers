"use client"

import { createContext, useState, useContext, type ReactNode, useCallback } from "react"

type Toast = {
  id?: string
  title?: string
  description?: string
  action?: ReactNode
  duration?: number
  variant?: "default" | "destructive"
}

type ToastContextProps = {
  toasts: Toast[]
  addToast: (toast: Toast) => void
  updateToast: (toast: Toast) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
  updateToast: () => {},
  removeToast: () => {},
})

type ToastProviderProps = {
  children: ReactNode
}

function generateId() {
  return String(Math.random())
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Toast) => {
    const id = generateId()
    setToasts((prevState) => [...prevState, { id, ...toast }])
  }, [])

  const updateToast = useCallback((toast: Toast) => {
    setToasts((prevState) => prevState.map((t) => (t.id === toast.id ? { ...t, ...toast } : t)))
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, updateToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => {
  return useContext(ToastContext)
}

export { ToastProvider, useToast }
export type { Toast }

// Fonction toast simplifiée pour l'export
export const toast = (options: Toast) => {
  // Cette fonction sera utilisée avec le hook useToast dans les composants
  console.warn("toast() called directly. Use useToast() hook in components instead.")
  return options
}
