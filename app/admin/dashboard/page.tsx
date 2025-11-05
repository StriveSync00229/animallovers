"use client"

import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const donationsData = [
  { month: "Jan", montant: 2400 },
  { month: "Fév", montant: 3200 },
  { month: "Mar", montant: 2800 },
  { month: "Avr", montant: 4100 },
  { month: "Mai", montant: 3800 },
  { month: "Juin", montant: 5200 },
]

const salesData = [
  { month: "Jan", ventes: 1200 },
  { month: "Fév", ventes: 1900 },
  { month: "Mar", ventes: 1600 },
  { month: "Avr", ventes: 2400 },
  { month: "Mai", ventes: 2100 },
  { month: "Juin", ventes: 2800 },
]

const recentActivities = [
  {
    id: 1,
    type: "don",
    user: "Marie Dupont",
    action: "a fait un don de 50€",
    time: "Il y a 5 min",
    image: "/smiling-woman.png",
  },
  {
    id: 2,
    type: "product",
    user: "Jean Martin",
    action: 'a acheté "Croquettes Premium"',
    time: "Il y a 12 min",
    image: "/man-smiling.jpg",
  },
  {
    id: 3,
    type: "adoption",
    user: "Sophie Bernard",
    action: 'a réservé "Max le Golden"',
    time: "Il y a 23 min",
    image: "/woman-happy.jpg",
  },
  {
    id: 4,
    type: "message",
    user: "Pierre Leroy",
    action: "a envoyé un message",
    time: "Il y a 1h",
    image: "/man-professional.jpg",
  },
  {
    id: 5,
    type: "newsletter",
    user: "Emma Rousseau",
    action: "s'est inscrite à la newsletter",
    time: "Il y a 2h",
    image: "/professional-woman.png",
  },
]

const quickLinks = [
  { title: "Dressage & Santé", href: "/admin/dressage-sante", icon: "📚", color: "bg-blue-50 text-blue-600" },
  { title: "Produits", href: "/admin/produits", icon: "🛍️", color: "bg-green-50 text-green-600" },
  { title: "Don", href: "/admin/don", icon: "💝", color: "bg-pink-50 text-pink-600" },
  { title: "Adoption", href: "/admin/adoption", icon: "🐾", color: "bg-purple-50 text-purple-600" },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayoutWrapper title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium text-gray-600">Total Dons</CardDescription>
              <CardTitle className="text-3xl font-bold text-gray-900">21,500€</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600 font-medium">+12.5% ce mois</p>
            </CardContent>
          </Card>

          <Card className="animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium text-gray-600">Ventes Produits</CardDescription>
              <CardTitle className="text-3xl font-bold text-gray-900">12,800€</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600 font-medium">+8.3% ce mois</p>
            </CardContent>
          </Card>

          <Card className="animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium text-gray-600">Adoptions</CardDescription>
              <CardTitle className="text-3xl font-bold text-gray-900">47</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600 font-medium">+15 ce mois</p>
            </CardContent>
          </Card>

          <Card className="animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium text-gray-600">Utilisateurs</CardDescription>
              <CardTitle className="text-3xl font-bold text-gray-900">1,234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600 font-medium">+23 cette semaine</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Évolution des Dons</CardTitle>
              <CardDescription>Montants collectés par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={donationsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="montant" stroke="#dc2626" strokeWidth={3} name="Montant (€)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.6s" }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Ventes de Produits</CardTitle>
              <CardDescription>Chiffre d'affaires mensuel</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventes" fill="#dc2626" name="Ventes (€)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.7s" }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Activités Récentes</CardTitle>
              <CardDescription>Dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fadeInUp border-0 shadow-lg" style={{ animationDelay: "0.8s" }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Raccourcis</CardTitle>
              <CardDescription>Accès rapide aux sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 hover:scale-105 ${link.color}`}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-medium">{link.title}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayoutWrapper>
  )
}
