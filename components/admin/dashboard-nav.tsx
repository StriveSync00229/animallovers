"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BarChart3,
  FileText,
  Package,
  Heart,
  Users,
  Settings,
  Home,
  MessageSquare,
  Mail,
  TrendingUp,
  Shield,
  Database,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navigationGroups = [
  {
    title: "Vue d'ensemble",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: Home,
        description: "Vue d'ensemble des statistiques",
        badge: null,
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: TrendingUp,
        description: "Analyses et métriques détaillées",
        badge: "Pro",
      },
    ],
  },
  {
    title: "Contenu",
    items: [
      {
        title: "Articles",
        href: "/admin/articles",
        icon: FileText,
        description: "Gestion des articles de blog",
        badge: "12",
      },
      {
        title: "Produits",
        href: "/admin/products",
        icon: Package,
        description: "Catalogue de produits",
        badge: "156",
      },
      {
        title: "Commentaires",
        href: "/admin/comments",
        icon: MessageSquare,
        description: "Modération des commentaires",
        badge: "3",
      },
    ],
  },
  {
    title: "Communauté",
    items: [
      {
        title: "Utilisateurs",
        href: "/admin/users",
        icon: Users,
        description: "Gestion des utilisateurs",
        badge: "1.2k",
      },
      {
        title: "Newsletter",
        href: "/admin/newsletter",
        icon: Mail,
        description: "Campagnes d'emailing",
        badge: null,
      },
    ],
  },
  {
    title: "Finances",
    items: [
      {
        title: "Dons",
        href: "/admin/donations",
        icon: Heart,
        description: "Collectes et campagnes",
        badge: "€12.5k",
      },
      {
        title: "Rapports",
        href: "/admin/reports",
        icon: BarChart3,
        description: "Rapports financiers",
        badge: null,
      },
    ],
  },
  {
    title: "Système",
    items: [
      {
        title: "Paramètres",
        href: "/admin/settings",
        icon: Settings,
        description: "Configuration du site",
        badge: null,
      },
      {
        title: "Sécurité",
        href: "/admin/security",
        icon: Shield,
        description: "Logs et sécurité",
        badge: null,
      },
      {
        title: "Base de données",
        href: "/admin/database",
        icon: Database,
        description: "Gestion de la DB",
        badge: "New",
      },
    ],
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-8">
      {/* Logo et titre */}
      <div className="flex items-center space-x-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg">
          <Heart className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">AnimalLovers</h1>
          <p className="text-xs text-gray-500">Administration</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-6">
        {navigationGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
            className="space-y-3"
          >
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                            isActive
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-600">{item.description}</div>
                        </div>
                      </div>

                      {item.badge && (
                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            isActive ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : "bg-gray-100 text-gray-600",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}

                      {/* Indicateur actif */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-600"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6">
        <div className="px-3">
          <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <Heart className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Aide précieuse</p>
                <p className="text-xs text-green-700">872 animaux aidés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
