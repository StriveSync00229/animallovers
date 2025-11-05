"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { clearAdminAuth } from "../../lib/admin-auth"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Heart,
  PawPrint,
  Users,
  MessageSquare,
  Mail,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Dressage & Santé",
    href: "/admin/dressage-sante",
    icon: BookOpen,
  },
  {
    label: "Produits",
    href: "/admin/produits",
    icon: ShoppingBag,
  },
  {
    label: "Don",
    href: "/admin/don",
    icon: Heart,
  },
  {
    label: "Adoption",
    href: "/admin/adoption",
    icon: PawPrint,
  },
  {
    label: "Utilisateurs",
    href: "/admin/utilisateurs",
    icon: Users,
  },
  {
    label: "Messagerie Client",
    href: "/admin/messagerie",
    icon: MessageSquare,
  },
  {
    label: "Newsletter",
    href: "/admin/newsletter",
    icon: Mail,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    clearAdminAuth()
    router.push("/admin/login")
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%201%20nov.%202025%2C%2019_57_13-swunlmmQEJUwVb0khHxHdtd9x9wb1G.png"
              alt="AnimalLovers"
              width={40}
              height={40}
              className="object-contain"
            />
            {!isCollapsed && <span className="font-bold text-lg text-gray-900">Admin</span>}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const IconComponent = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                      isActive ? "bg-red-50 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm">Déconnexion</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}
