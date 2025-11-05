"use client"

import { useState } from "react"
import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"

const donationsStats = [
  { period: "Lun", montant: 450 },
  { period: "Mar", montant: 680 },
  { period: "Mer", montant: 520 },
  { period: "Jeu", montant: 890 },
  { period: "Ven", montant: 750 },
  { period: "Sam", montant: 1200 },
  { period: "Dim", montant: 980 },
]

const recentDonations = [
  { id: 1, donor: "Marie Dupont", email: "marie@email.com", amount: 50, date: "2025-01-20", time: "14:30" },
  { id: 2, donor: "Jean Martin", email: "jean@email.com", amount: 100, date: "2025-01-20", time: "12:15" },
  { id: 3, donor: "Sophie Bernard", email: "sophie@email.com", amount: 25, date: "2025-01-19", time: "18:45" },
  { id: 4, donor: "Pierre Leroy", email: "pierre@email.com", amount: 75, date: "2025-01-19", time: "10:20" },
]

const mockCampaigns = [
  {
    id: 1,
    title: "Sauvetage de Max",
    description: "Opération chirurgicale urgente pour Max, un golden retriever abandonné",
    category: "Chien",
    age: "Adulte",
    goal: 5000,
    raised: 3250,
    image: "/placeholder.svg?height=200&width=300",
    active: true,
  },
  {
    id: 2,
    title: "Refuge pour chatons",
    description: "Construction d'un nouvel espace pour accueillir les chatons abandonnés",
    category: "Chat",
    age: "Chaton",
    goal: 10000,
    raised: 7800,
    image: "/placeholder.svg?height=200&width=300",
    active: true,
  },
]

export default function DonPage() {
  const [timeFilter, setTimeFilter] = useState("week")
  const [showAddCampaign, setShowAddCampaign] = useState(false)

  return (
    <AdminLayoutWrapper title="Gestion des Dons">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-fadeInUp">
            <CardHeader className="pb-3">
              <CardDescription>Total Collecté</CardDescription>
              <CardTitle className="text-3xl font-bold text-red-600">21,500€</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+12.5% ce mois</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Cette Semaine</CardDescription>
              <CardTitle className="text-3xl font-bold">5,470€</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">142 dons</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Aujourd'hui</CardDescription>
              <CardTitle className="text-3xl font-bold">1,230€</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">23 dons</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Don Moyen</CardDescription>
              <CardTitle className="text-3xl font-bold">53€</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Par donateur</p>
            </CardContent>
          </Card>
        </div>

        {/* Donations Chart */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Évolution des Dons</CardTitle>
                <CardDescription>Visualisez les dons par période</CardDescription>
              </div>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Par jour</SelectItem>
                  <SelectItem value="week">Par semaine</SelectItem>
                  <SelectItem value="month">Par mois</SelectItem>
                  <SelectItem value="year">Par année</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationsStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="montant" stroke="#dc2626" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle>Dons Récents</CardTitle>
            <CardDescription>Liste des derniers dons effectués</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{donation.donor}</p>
                    <p className="text-sm text-gray-600">{donation.email}</p>
                    <p className="text-xs text-gray-500">
                      {donation.date} à {donation.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{donation.amount}€</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Management */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Campagnes de Don</h2>
          <Dialog open={showAddCampaign} onOpenChange={setShowAddCampaign}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">Créer une Campagne</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer une Campagne de Don</DialogTitle>
                <DialogDescription>Complétez tous les champs pour lancer une nouvelle campagne</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Media */}
                <div className="space-y-2">
                  <Label>Image ou Vidéo</Label>
                  <Input type="file" accept="image/*,video/*" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label>Titre de la campagne</Label>
                  <Input placeholder="Ex: Sauvetage de Max" />
                </div>

                {/* Object */}
                <div className="space-y-2">
                  <Label>Objet</Label>
                  <Input placeholder="Ex: Opération chirurgicale" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Décrivez la campagne en détail..." rows={5} />
                </div>

                {/* Category & Age */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chien">Chien</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tranche d'âge</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chiot">Chiot</SelectItem>
                        <SelectItem value="chaton">Chaton</SelectItem>
                        <SelectItem value="adulte">Adulte</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Goal Amount */}
                <div className="space-y-2">
                  <Label>Montant de collecte à atteindre (€)</Label>
                  <Input type="number" placeholder="5000" />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">Créer la campagne</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockCampaigns.map((campaign, idx) => (
            <Card key={campaign.id} className="animate-fadeInUp" style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
              <CardContent className="p-0">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{campaign.title}</h3>
                      <p className="text-sm text-gray-600">{campaign.description}</p>
                    </div>
                    {campaign.active && <Badge className="bg-green-100 text-green-700">Active</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{campaign.category}</Badge>
                    <Badge variant="outline">{campaign.age}</Badge>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{campaign.raised}€ collectés</span>
                      <span className="text-sm text-gray-600">Objectif: {campaign.goal}€</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% atteint
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-red-600 bg-transparent">
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayoutWrapper>
  )
}
