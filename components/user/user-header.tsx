"use client"

import { useEffect, useState } from "react"
import { Menu, User } from "lucide-react"
import { getUserAuth } from "../../lib/user-auth"

interface UserHeaderProps {
  onMenuClick: () => void
}

export default function UserHeader({ onMenuClick }: UserHeaderProps) {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const auth = getUserAuth()
    if (auth) {
      setUserName(auth.name)
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex-1 lg:flex-none">
          <h1 className="text-xl font-semibold text-gray-900">Mon Espace</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
