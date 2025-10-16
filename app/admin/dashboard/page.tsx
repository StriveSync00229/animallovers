"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BarChart3, 
  FileText, 
  Package, 
  Users, 
  Heart, 
  TrendingUp, 
  DollarSign,
  Eye,
  Plus,
  Settings
} from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre plateforme AnimalLovers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <div className="p-2 rounded-md bg-white/70 shadow-sm">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">42</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <div className="p-2 rounded-md bg-white/70 shadow-sm">
              <Package className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">156</div>
            <p className="text-xs text-muted-foreground">
              +8% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-fuchsia-50 to-pink-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <div className="p-2 rounded-md bg-white/70 shadow-sm">
              <Users className="h-4 w-4 text-fuchsia-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">1,234</div>
            <p className="text-xs text-muted-foreground">
              +23% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }}>
        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-amber-50 to-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donations</CardTitle>
            <div className="p-2 rounded-md bg-white/70 shadow-sm">
              <Heart className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">€2,456</div>
            <p className="text-xs text-muted-foreground">
              +15% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        </motion.div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Gestion des articles
            </CardTitle>
            <CardDescription>
              Créez et gérez vos articles de blog
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Articles publiés</span>
              <Badge variant="secondary">38</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Brouillons</span>
              <Badge variant="outline">4</Badge>
            </div>
            <Button asChild className="w-full">
              <Link href="/admin/articles">
                <Eye className="h-4 w-4 mr-2" />
                Voir tous les articles
              </Link>
            </Button>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Gestion des produits
            </CardTitle>
            <CardDescription>
              Gérez votre catalogue de produits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Produits actifs</span>
              <Badge variant="secondary">142</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">En rupture</span>
              <Badge variant="destructive">14</Badge>
            </div>
            <Button asChild className="w-full">
              <Link href="/admin/products">
                <Eye className="h-4 w-4 mr-2" />
                Voir tous les produits
              </Link>
            </Button>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Donations
            </CardTitle>
            <CardDescription>
              Suivez vos campagnes de dons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ce mois</span>
              <Badge variant="secondary">€2,456</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Donateurs</span>
              <Badge variant="outline">89</Badge>
            </div>
            <Button asChild className="w-full">
              <Link href="/admin/donations">
                <TrendingUp className="h-4 w-4 mr-2" />
                Voir les donations
              </Link>
            </Button>
          </CardContent>
        </Card>
        </motion.div>
      </div>

      {/* Activité récente */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            Les dernières actions sur votre plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouvel article publié</p>
                <p className="text-xs text-gray-600">"Comment dresser un chiot" - il y a 2 heures</p>
              </div>
              <Badge variant="outline">Publié</Badge>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouvelle donation</p>
                <p className="text-xs text-gray-600">€50 de Marie D. - il y a 4 heures</p>
              </div>
              <Badge variant="outline">€50</Badge>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouvel utilisateur</p>
                <p className="text-xs text-gray-600">Jean P. s'est inscrit - il y a 6 heures</p>
              </div>
              <Badge variant="outline">Nouveau</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
