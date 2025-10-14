"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Bell, Settings, User, Moon, Sun, ChevronDown, LogOut, Shield, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Fonction pour générer les breadcrumbs basés sur le pathname
function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = []
  
  let currentPath = ''
  
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    currentPath += `/${segment}`
    
    // Mapper les segments aux titres français
    const titles: { [key: string]: string } = {
      'admin': 'Administration',
      'dashboard': 'Tableau de bord',
      'articles': 'Articles',
      'products': 'Produits',
      'donations': 'Donations',
      'users': 'Utilisateurs',
      'settings': 'Paramètres',
      'stats': 'Statistiques',
      'activity': 'Activité',
      'revenue': 'Revenus',
      'reports': 'Rapports',
      'newsletter': 'Newsletter',
      'notifications': 'Notifications',
      'events': 'Événements',
      'help': 'Aide',
      'security': 'Sécurité',
    }
    
    const title = titles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    
    breadcrumbs.push({
      title,
      href: currentPath,
      isLast: i === segments.length - 1
    })
  }
  
  return breadcrumbs
}

export function AdminHeader() {
  const pathname = usePathname()
  const [isDark, setIsDark] = React.useState(false)
  const [notifications] = React.useState(5)
  const breadcrumbs = generateBreadcrumbs(pathname)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Ici vous pourriez implémenter la logique de thème
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="md:hidden" />

        {/* Breadcrumb */}
        <div className="hidden md:flex">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.href}>
                  <BreadcrumbItem>
                    {breadcrumb.isLast ? (
                      <BreadcrumbPage className="font-medium">{breadcrumb.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={breadcrumb.href} className="text-muted-foreground">
                        {breadcrumb.title}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!breadcrumb.isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 bg-slate-50/50 border-slate-200/60 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-full">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </motion.div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1">
                  <Badge
                    variant="destructive"
                    className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notifications}
                  </Badge>
                </motion.div>
              )}
            </Button>
          </motion.div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button variant="ghost" className="h-9 px-3 rounded-full flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg?height=28&width=28" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs">
                      AL
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm font-medium">Admin</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Administrateur</p>
                  <p className="text-xs text-muted-foreground">admin@animallovers.fr</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Sécurité
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Aide
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
