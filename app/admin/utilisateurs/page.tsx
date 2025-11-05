"use client"

import { useState } from "react"
import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const mockUsers = [
  {
    id: 1,
    name: "Marie Dupont",
    email: "marie@email.com",
    phone: "+33 6 12 34 56 78",
    address: "15 rue de la Paix, 75001 Paris",
    joinDate: "2024-06-15",
    status: "active",
    totalDonations: 250,
    totalPurchases: 450,
    donationsCount: 5,
    purchasesCount: 8,
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean@email.com",
    phone: "+33 6 98 76 54 32",
    address: "28 avenue Victor Hugo, 69002 Lyon",
    joinDate: "2024-08-20",
    status: "active",
    totalDonations: 500,
    totalPurchases: 780,
    donationsCount: 10,
    purchasesCount: 15,
  },
  {
    id: 3,
    name: "Sophie Bernard",
    email: "sophie@email.com",
    phone: "+33 6 45 67 89 01",
    address: "42 boulevard Saint-Germain, 75005 Paris",
    joinDate: "2024-11-10",
    status: "blocked",
    totalDonations: 75,
    totalPurchases: 120,
    donationsCount: 3,
    purchasesCount: 4,
  },
]

const mockUserDonations = [
  { id: 1, date: "2025-01-20", amount: 50, campaign: "Sauvetage de Max" },
  { id: 2, date: "2025-01-10", amount: 100, campaign: "Refuge pour chatons" },
  { id: 3, date: "2024-12-25", amount: 25, campaign: "Noël solidaire" },
]

const mockUserPurchases = [
  { id: 1, date: "2025-01-18", product: "Croquettes Premium", amount: 45.99 },
  { id: 2, date: "2025-01-05", product: "Jouet Interactif", amount: 15.99 },
  { id: 3, date: "2024-12-20", product: "Panier Confort XL", amount: 89.99 },
]

export default function UtilisateursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayoutWrapper title="Gestion des Utilisateurs">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-fadeInUp">
            <CardHeader className="pb-3">
              <CardDescription>Total Utilisateurs</CardDescription>
              <CardTitle className="text-3xl font-bold">1,234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+23 cette semaine</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Actifs</CardDescription>
              <CardTitle className="text-3xl font-bold text-green-600">1,198</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">97% du total</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Bloqués</CardDescription>
              <CardTitle className="text-3xl font-bold text-red-600">36</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">3% du total</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Nouveaux (7j)</CardDescription>
              <CardTitle className="text-3xl font-bold">23</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">+15% vs semaine dernière</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle>Rechercher un Utilisateur</CardTitle>
            <CardDescription>Trouvez un utilisateur par nom ou email</CardDescription>
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

        {/* Users List */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle>Liste des Utilisateurs</CardTitle>
            <CardDescription>Gérez les comptes utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-lg">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <Badge
                        className={user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                      >
                        {user.status === "active" ? "Actif" : "Bloqué"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 ml-15">
                      <span>Inscrit le {user.joinDate}</span>
                      <span>
                        {user.donationsCount} dons ({user.totalDonations}€)
                      </span>
                      <span>
                        {user.purchasesCount} achats ({user.totalPurchases}€)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowUserDetails(true)
                      }}
                    >
                      Voir détails
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={user.status === "active" ? "text-red-600" : "text-green-600"}
                    >
                      {user.status === "active" ? "Bloquer" : "Débloquer"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Details Dialog */}
        <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Profil Utilisateur</DialogTitle>
              <DialogDescription>Informations détaillées et historique</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6 py-4">
                {/* User Info */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <h3 className="font-bold text-lg text-gray-900">{selectedUser.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Email:</span>{" "}
                      <span className="text-gray-600">{selectedUser.email}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Téléphone:</span>{" "}
                      <span className="text-gray-600">{selectedUser.phone}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-gray-700">Adresse:</span>{" "}
                      <span className="text-gray-600">{selectedUser.address}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Inscrit le:</span>{" "}
                      <span className="text-gray-600">{selectedUser.joinDate}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Statut:</span>{" "}
                      <Badge
                        className={
                          selectedUser.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }
                      >
                        {selectedUser.status === "active" ? "Actif" : "Bloqué"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Donations History */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Historique des Dons ({selectedUser.donationsCount})</h3>
                  <div className="space-y-2">
                    {mockUserDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{donation.campaign}</p>
                          <p className="text-sm text-gray-600">{donation.date}</p>
                        </div>
                        <p className="font-bold text-red-600">{donation.amount}€</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Total: <span className="font-bold">{selectedUser.totalDonations}€</span>
                  </p>
                </div>

                {/* Purchases History */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    Historique des Achats ({selectedUser.purchasesCount})
                  </h3>
                  <div className="space-y-2">
                    {mockUserPurchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{purchase.product}</p>
                          <p className="text-sm text-gray-600">{purchase.date}</p>
                        </div>
                        <p className="font-bold text-gray-900">{purchase.amount}€</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Total: <span className="font-bold">{selectedUser.totalPurchases}€</span>
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayoutWrapper>
  )
}
