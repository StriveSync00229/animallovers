"use client"

import { getAdminAuth } from "../../lib/admin-auth"
import { useEffect, useState } from "react"
import { User } from "lucide-react"

export default function AdminHeader({ title }: { title: string }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const userInfo = getAdminAuth()
    if (userInfo) {
      setUser({ name: userInfo.name, email: userInfo.email })
    } else {
      setUser(null)
    }
  }, [])

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-red-600" />
        </div>
      </div>
    </header>
  )
}
