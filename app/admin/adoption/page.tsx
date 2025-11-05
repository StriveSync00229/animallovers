"use client"

import { useState } from "react"
import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"

const mockAnimals = [
  {
    id: 1,
    name: "Max",
    category: "Chien",
    age: "Adulte",
    breed: "Golden Retriever",
    description: "Chien affectueux et joueur, parfait pour une famille",
    character: "Doux, sociable, énergique",
    vaccinations: "Rage, Parvovirose, Maladie de Carré",
    adoptionFee: 150,
    image: "/placeholder.svg?height=300&width=300",
    reservations: 3,
  },
  {
    id: 2,
    name: "Luna",
    category: "Chat",
    age: "Chaton",
    breed: "Européen",
    description: "Petite chatte curieuse et câline",
    character: "Joueuse, indépendante, affectueuse",
    vaccinations: "Typhus, Coryza, Leucose",
    adoptionFee: 100,
    image: "/placeholder.svg?height=300&width=300",
    reservations: 5,
  },
]

const mockReservations = [
  {
    id: 1,
    animalId: 1,
    animalName: "Max",
    userName: "Sophie Bernard",
    email: "sophie@email.com",
    phone: "+33 6 12 34 56 78",
    address: "15 rue de la Paix, 75001 Paris",
    date: "2025-01-20",
    status: "En attente",
  },
  {
    id: 2,
    animalId: 1,
    animalName: "Max",
    userName: "Pierre Leroy",
    email: "pierre@email.com",
    phone: "+33 6 98 76 54 32",
    address: "28 avenue Victor Hugo, 69002 Lyon",
    date: "2025-01-19",
    status: "Confirmée",
  },
]

export default function AdoptionPage() {
  const [showAddAnimal, setShowAddAnimal] = useState(false)
  const [showReservations, setShowReservations] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null)
  const [showMessaging, setShowMessaging] = useState(false)

  return (
    <AdminLayoutWrapper title="Gestion des Adoptions">
      <div className="space-y-6">
        {/* Action Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Animaux à Adopter</h2>
          <Dialog open={showAddAnimal} onOpenChange={setShowAddAnimal}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">Ajouter un Animal</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter un Animal à l'Adoption</DialogTitle>
                <DialogDescription>Complétez le profil de l'animal</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Image */}
                <div className="space-y-2">
                  <Label>Photo de l'animal</Label>
                  <Input type="file" accept="image/*" />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label>Nom de l'animal</Label>
                  <Input placeholder="Ex: Max" />
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

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Décrivez l'animal..." rows={4} />
                </div>

                {/* Character */}
                <div className="space-y-2">
                  <Label>Caractère de l'animal</Label>
                  <Input placeholder="Ex: Doux, sociable, énergique" />
                </div>

                {/* Vaccinations */}
                <div className="space-y-2">
                  <Label>Vaccinations reçues</Label>
                  <Textarea placeholder="Listez les vaccinations..." rows={3} />
                </div>

                {/* Adoption Fee */}
                <div className="space-y-2">
                  <Label>Frais de réservation (€)</Label>
                  <Input type="number" placeholder="150" />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">Ajouter l'animal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Animals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockAnimals.map((animal, idx) => (
            <Card key={animal.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardContent className="p-0">
                <img
                  src={animal.image || "/placeholder.svg"}
                  alt={animal.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{animal.name}</h3>
                      <p className="text-sm text-gray-600">{animal.breed}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{animal.category}</Badge>
                      <Badge variant="outline">{animal.age}</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700">{animal.description}</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold text-gray-900">Caractère:</span>{" "}
                      <span className="text-gray-600">{animal.character}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">Vaccinations:</span>{" "}
                      <span className="text-gray-600">{animal.vaccinations}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">Frais d'adoption:</span>{" "}
                      <span className="text-red-600 font-bold">{animal.adoptionFee}€</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <button
                      onClick={() => {
                        setSelectedAnimal(animal.id)
                        setShowReservations(true)
                      }}
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      {animal.reservations} réservations
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAnimal(animal.id)
                        setShowMessaging(true)
                      }}
                      className="text-sm text-green-600 hover:underline font-medium"
                    >
                      Messagerie
                    </button>
                  </div>
                  <div className="flex gap-2">
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

        {/* Reservations Dialog */}
        <Dialog open={showReservations} onOpenChange={setShowReservations}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Réservations</DialogTitle>
              <DialogDescription>Liste des personnes intéressées par l'adoption</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {mockReservations.map((reservation) => (
                <div key={reservation.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{reservation.userName}</p>
                      <p className="text-sm text-gray-600">{reservation.email}</p>
                      <p className="text-sm text-gray-600">{reservation.phone}</p>
                      <p className="text-sm text-gray-600">{reservation.address}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          reservation.status === "Confirmée"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {reservation.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-2">{reservation.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Demander paiement
                    </Button>
                    <Button size="sm" variant="outline">
                      Contacter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Messaging Dialog */}
        <Dialog open={showMessaging} onOpenChange={setShowMessaging}>
          <DialogContent className="max-w-3xl h-[600px] flex flex-col">
            <DialogHeader>
              <DialogTitle>Messagerie - Adoption</DialogTitle>
              <DialogDescription>Échangez avec les utilisateurs intéressés</DialogDescription>
            </DialogHeader>
            <div className="flex-1 flex flex-col space-y-4 py-4">
              <div className="flex-1 border border-gray-200 rounded-lg p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-900">
                          Bonjour, je suis intéressée par l'adoption de Max. Est-il toujours disponible?
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Sophie - Il y a 2h</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-md">
                      <div className="bg-red-600 text-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm">
                          Bonjour Sophie! Oui, Max est toujours disponible. Souhaitez-vous planifier une visite?
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">Vous - Il y a 1h</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Écrivez votre message..." className="flex-1" />
                <Button variant="outline" size="icon">
                  📎
                </Button>
                <Button variant="outline" size="icon">
                  😊
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">Envoyer</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayoutWrapper>
  )
}
