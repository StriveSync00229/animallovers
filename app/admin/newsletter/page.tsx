"use client"

import { useState } from "react"
import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mockSubscribers = [
  {
    id: 1,
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie@email.com",
    phone: "+33 6 12 34 56 78",
    country: "France",
    subscribeDate: "2025-01-15",
  },
  {
    id: 2,
    firstName: "Jean",
    lastName: "Martin",
    email: "jean@email.com",
    phone: "+33 6 98 76 54 32",
    country: "France",
    subscribeDate: "2025-01-10",
  },
  {
    id: 3,
    firstName: "Sophie",
    lastName: "Bernard",
    email: "sophie@email.com",
    phone: "+33 6 45 67 89 01",
    country: "Belgique",
    subscribeDate: "2025-01-05",
  },
  {
    id: 4,
    firstName: "Pierre",
    lastName: "Leroy",
    email: "pierre@email.com",
    phone: "+33 6 23 45 67 89",
    country: "France",
    subscribeDate: "2024-12-28",
  },
]

export default function NewsletterPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSubscribers = mockSubscribers.filter(
    (sub) =>
      sub.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleExportExcel = () => {
    alert("Export Excel en cours... (fonctionnalité à implémenter)")
  }

  return (
    <AdminLayoutWrapper title="Newsletter">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-fadeInUp">
            <CardHeader className="pb-3">
              <CardDescription>Total Abonnés</CardDescription>
              <CardTitle className="text-3xl font-bold">2,847</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+156 ce mois</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Cette Semaine</CardDescription>
              <CardTitle className="text-3xl font-bold text-green-600">42</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Nouveaux abonnés</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Taux d'Ouverture</CardDescription>
              <CardTitle className="text-3xl font-bold">68%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+5% vs mois dernier</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Taux de Clic</CardDescription>
              <CardTitle className="text-3xl font-bold">24%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+2% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Gérez vos abonnés et exportez les données</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button onClick={handleExportExcel} className="bg-green-600 hover:bg-green-700">
              Exporter en Excel
            </Button>
            <Button variant="outline">Importer des contacts</Button>
            <Button variant="outline">Envoyer une campagne</Button>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle>Rechercher un Abonné</CardTitle>
            <CardDescription>Trouvez un abonné par nom ou email</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Subscribers List */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
          <CardHeader>
            <CardTitle>Liste des Abonnés</CardTitle>
            <CardDescription>{filteredSubscribers.length} abonné(s) trouvé(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-900">Prénom</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Nom</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Email</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Téléphone</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Pays</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Date d'inscription</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-900">{subscriber.firstName}</td>
                      <td className="p-3 text-gray-900">{subscriber.lastName}</td>
                      <td className="p-3 text-gray-600">{subscriber.email}</td>
                      <td className="p-3 text-gray-600">{subscriber.phone}</td>
                      <td className="p-3 text-gray-600">{subscriber.country}</td>
                      <td className="p-3 text-gray-600">{subscriber.subscribeDate}</td>
                      <td className="p-3">
                        <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayoutWrapper>
  )
}
