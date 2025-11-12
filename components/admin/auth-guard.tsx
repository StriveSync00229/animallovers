"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "../../lib/admin-auth"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      if (!isAdminAuthenticated()) {
        router.push("/admin/login")
      } else {
        setIsChecking(false)
      }
    }
    
    checkAuth()
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
