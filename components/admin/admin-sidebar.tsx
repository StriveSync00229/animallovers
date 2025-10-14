"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart3,
  Heart,
  Home,
  Package,
  FileText,
  Users,
  DollarSign,
  Settings,
  HelpCircle,
  Shield,
  Zap,
  TrendingUp,
  Calendar,
  Mail,
  Bell,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Types pour les éléments de navigation
interface SubItem {
  title: string
  url: string
}

interface NavigationItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  badgeVariant?: "default" | "secondary" | "outline" | "destructive"
  subItems?: SubItem[]
}

interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

const navigationItems: NavigationGroup[] = [
  {
    title: "Vue d'ensemble",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
        badge: "Nouveau",
        badgeVariant: "default",
      },
      {
        title: "Statistiques",
        url: "/admin/stats",
        icon: BarChart3,
        badge: "12",
        badgeVariant: "secondary",
      },
      {
        title: "Activité récente",
        url: "/admin/activity",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Gestion",
    items: [
      {
        title: "Produits",
        url: "/admin/products",
        icon: Package,
        badge: "156",
        badgeVariant: "outline",
        subItems: [
          { title: "Tous les produits", url: "/admin/products" },
          { title: "Ajouter un produit", url: "/admin/products/new" },
          { title: "Catégories", url: "/admin/products/categories" },
          { title: "Stock", url: "/admin/products/inventory" },
        ],
      },
      {
        title: "Articles",
        url: "/admin/articles",
        icon: FileText,
        badge: "42",
        badgeVariant: "outline",
        subItems: [
          { title: "Tous les articles", url: "/admin/articles" },
          { title: "Nouvel article", url: "/admin/articles/new" },
          { title: "Brouillons", url: "/admin/articles/drafts" },
        ],
      },
      {
        title: "Utilisateurs",
        url: "/admin/users",
        icon: Users,
        badge: "1.2k",
        badgeVariant: "secondary",
      },
    ],
  },
  {
    title: "Finances",
    items: [
      {
        title: "Donations",
        url: "/admin/donations",
        icon: Heart,
        badge: "€2.4k",
        badgeVariant: "default",
      },
      {
        title: "Revenus",
        url: "/admin/revenue",
        icon: DollarSign,
        badge: "€8.7k",
        badgeVariant: "default",
      },
      {
        title: "Rapports",
        url: "/admin/reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        title: "Newsletter",
        url: "/admin/newsletter",
        icon: Mail,
        badge: "3",
        badgeVariant: "destructive",
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
        icon: Bell,
      },
      {
        title: "Événements",
        url: "/admin/events",
        icon: Calendar,
      },
    ],
  },
]

const bottomItems: NavigationItem[] = [
  {
    title: "Paramètres",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Aide",
    url: "/admin/help",
    icon: HelpCircle,
  },
  {
    title: "Sécurité",
    url: "/admin/security",
    icon: Shield,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = React.useState<string[]>([])

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupTitle) ? prev.filter((title) => title !== groupTitle) : [...prev, groupTitle],
    )
  }

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="border-b border-border/40 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 px-3 py-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
          >
            <Heart className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AnimalLovers
            </h2>
            <p className="text-xs text-muted-foreground">Administration</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            <Zap className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-white to-slate-50/50">
        {navigationItems.map((group, groupIndex) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={item.title}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: groupIndex * 0.1 + itemIndex * 0.05 }}
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className="group relative overflow-hidden"
                        onClick={() => item.subItems && toggleGroup(item.title)}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                              pathname === item.url
                                ? "bg-blue-100 text-blue-600"
                                : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-500"
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                          </motion.div>
                          <span className="flex-1 font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant={item.badgeVariant} className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {item.subItems && (
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                expandedGroups.includes(item.title) ? "rotate-90" : ""
                              }`}
                            />
                          )}
                          {pathname === item.url && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r"
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                      {item.subItems && expandedGroups.includes(item.title) && (
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url} className="text-sm">
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </motion.div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 bg-gradient-to-r from-slate-50 to-blue-50">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-4 px-3 py-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs">
                AL
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Admin</p>
              <p className="text-xs text-slate-500 truncate">admin@animallovers.fr</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
