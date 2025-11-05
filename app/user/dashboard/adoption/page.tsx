"use client"

import { useState } from "react"
import { PawPrint, Heart, MapPin, MessageSquare, Send, Paperclip, Smile, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Animal {
  id: string
  name: string
  species: string
  breed: string
  age: string
  gender: string
  location: string
  image: string
  description: string
  personality: string[]
  vaccinated: boolean
  sterilized: boolean
  reserved: boolean
}

interface Message {
  id: string
  sender: "user" | "admin"
  text: string
  timestamp: string
  file?: string
}

export default function UserAdoptionPage() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)
  const [showReservation, setShowReservation] = useState(false)
  const [showMessaging, setShowMessaging] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    motivation: "",
  })

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "admin",
      text: "Bonjour ! Merci de votre intérêt pour l'adoption. Comment puis-je vous aider ?",
      timestamp: "10:30",
    },
  ])

  const animals: Animal[] = [
    {
      id: "1",
      name: "Max",
      species: "Chien",
      breed: "Golden Retriever",
      age: "3 ans",
      gender: "Mâle",
      location: "Paris, France",
      image: "/golden-retriever-dog-happy.jpg",
      description:
        "Max est un chien adorable et très affectueux. Il adore jouer et est parfait pour une famille avec enfants.",
      personality: ["Affectueux", "Joueur", "Sociable", "Obéissant"],
      vaccinated: true,
      sterilized: true,
      reserved: false,
    },
    {
      id: "2",
      name: "Luna",
      species: "Chat",
      breed: "Européen",
      age: "2 ans",
      gender: "Femelle",
      location: "Lyon, France",
      image: "/cute-gray-cat.jpg",
      description: "Luna est une chatte calme et indépendante. Elle aime les câlins et les siestes au soleil.",
      personality: ["Calme", "Indépendante", "Câline", "Propre"],
      vaccinated: true,
      sterilized: true,
      reserved: false,
    },
    {
      id: "3",
      name: "Rocky",
      species: "Chien",
      breed: "Berger Allemand",
      age: "5 ans",
      gender: "Mâle",
      location: "Marseille, France",
      image: "/german-shepherd-dog.jpg",
      description: "Rocky est un chien protecteur et loyal. Il a besoin d'espace et d'exercice régulier.",
      personality: ["Protecteur", "Loyal", "Énergique", "Intelligent"],
      vaccinated: true,
      sterilized: true,
      reserved: true,
    },
    {
      id: "4",
      name: "Mimi",
      species: "Chat",
      breed: "Siamois",
      age: "1 an",
      gender: "Femelle",
      location: "Toulouse, France",
      image: "/siamese-cat-blue-eyes.jpg",
      description: "Mimi est une chatte très bavarde et sociable. Elle adore l'attention et les jeux interactifs.",
      personality: ["Bavarde", "Sociable", "Curieuse", "Joueuse"],
      vaccinated: true,
      sterilized: false,
      reserved: false,
    },
  ]

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessageText("")

    // Simulate admin response
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "admin",
        text: "Merci pour votre message. Un membre de notre équipe vous répondra dans les plus brefs délais.",
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, adminResponse])
    }, 1500)
  }

  const handleReservation = () => {
    if (!reservationData.name || !reservationData.email || !reservationData.phone) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    alert("Demande d'adoption envoyée avec succès ! Nous vous contacterons bientôt.")
    setShowReservation(false)
    setReservationData({
      name: "",
      email: "",
      phone: "",
      address: "",
      experience: "",
      motivation: "",
    })
  }

  const selectedAnimalData = animals.find((a) => a.id === selectedAnimal)

  if (showMessaging) {
    return (
      <div className="space-y-6 animate-fadeInUp">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Messagerie Service Client</h1>
          <Button variant="outline" onClick={() => setShowMessaging(false)}>
            <X className="w-4 h-4 mr-2" />
            Fermer
          </Button>
        </div>

        <Card className="h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.sender === "user" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Smile className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Écrivez votre message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (showReservation && selectedAnimalData) {
    return (
      <div className="space-y-6 animate-fadeInUp">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Demande d'adoption - {selectedAnimalData.name}</h1>
          <Button variant="outline" onClick={() => setShowReservation(false)}>
            Retour
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Animal info */}
          <Card className="p-6">
            <div className="relative h-64 bg-gray-200 rounded-lg mb-4">
              <Image
                src={selectedAnimalData.image || "/placeholder.svg"}
                alt={selectedAnimalData.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedAnimalData.name}</h3>
            <p className="text-gray-600 mb-4">
              {selectedAnimalData.breed} • {selectedAnimalData.age}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{selectedAnimalData.location}</span>
            </div>
          </Card>

          {/* Reservation form */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Formulaire de demande</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet <span className="text-red-600">*</span>
                  </label>
                  <Input
                    value={reservationData.name}
                    onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="email"
                    value={reservationData.email}
                    onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone <span className="text-red-600">*</span>
                  </label>
                  <Input
                    value={reservationData.phone}
                    onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <Input
                    value={reservationData.address}
                    onChange={(e) => setReservationData({ ...reservationData, address: e.target.value })}
                    placeholder="Votre adresse"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expérience avec les animaux</label>
                <Textarea
                  value={reservationData.experience}
                  onChange={(e) => setReservationData({ ...reservationData, experience: e.target.value })}
                  placeholder="Décrivez votre expérience avec les animaux..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Motivation pour l'adoption</label>
                <Textarea
                  value={reservationData.motivation}
                  onChange={(e) => setReservationData({ ...reservationData, motivation: e.target.value })}
                  placeholder="Pourquoi souhaitez-vous adopter cet animal ?"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6" onClick={handleReservation}>
                  Envoyer la demande
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 py-6 bg-transparent"
                  onClick={() => {
                    setShowReservation(false)
                    setShowMessaging(true)
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contacter le service
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <PawPrint className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Adoption</h1>
            <p className="text-gray-600">Trouvez votre compagnon idéal</p>
          </div>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowMessaging(true)}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Contacter le service
        </Button>
      </div>

      {/* Animals grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal, index) => (
          <Card
            key={animal.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-64 bg-gray-200">
              <Image src={animal.image || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
              {animal.reserved && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Réservé
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                {animal.species}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{animal.name}</h3>
                <Heart className="w-5 h-5 text-red-600 cursor-pointer hover:fill-red-600 transition-all" />
              </div>

              <p className="text-sm text-gray-600">
                {animal.breed} • {animal.age} • {animal.gender}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{animal.location}</span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-2">{animal.description}</p>

              <div className="flex flex-wrap gap-2">
                {animal.personality.slice(0, 3).map((trait) => (
                  <span key={trait} className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                    {trait}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 text-xs text-gray-600 pt-2 border-t">
                <span className={animal.vaccinated ? "text-green-600" : "text-gray-400"}>
                  {animal.vaccinated ? "✓" : "✗"} Vacciné
                </span>
                <span className={animal.sterilized ? "text-green-600" : "text-gray-400"}>
                  {animal.sterilized ? "✓" : "✗"} Stérilisé
                </span>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  setSelectedAnimal(animal.id)
                  setShowReservation(true)
                }}
                disabled={animal.reserved}
              >
                {animal.reserved ? "Déjà réservé" : "Demander l'adoption"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
