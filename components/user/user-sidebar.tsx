"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { X, Heart, BookOpen, ShoppingBag, PawPrint, MessageSquare } from "lucide-react"
import { clearUserAuth } from "../../lib/user-auth"

interface UserSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { label: "Don", href: "/user/dashboard/don", icon: Heart },
    { label: "Ebook", href: "/user/dashboard/ebook", icon: BookOpen },
    { label: "Produits", href: "/user/dashboard/produits", icon: ShoppingBag },
    { label: "Adoption", href: "/user/dashboard/adoption", icon: PawPrint },
    { label: "Service client", href: "/user/dashboard/service-client", icon: MessageSquare },
  ]

  const handleLogout = () => {
    clearUserAuth()
    router.push("/")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                <PawPrint className="w-7 h-7 text-red-500" />
              </span>
              <span className="text-lg font-bold text-gray-900">AnimalLovers</span>
            </Link>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-red-50 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
