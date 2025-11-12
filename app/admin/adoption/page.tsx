"use client"

import { useEffect, useRef, useState } from "react"
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
import { useToast } from "@/hooks/use-toast"

const fallbackAnimals = [
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

interface AdoptionAnimalCard {
  id: string
  name: string
  category: string
  age: string
  breed: string
  description: string
  character: string
  vaccinations: string
  adoptionFee: number
  image: string | null
  reservations: number
  isAvailable: boolean
}

const fallbackAnimalCards: AdoptionAnimalCard[] = fallbackAnimals.map((animal) => ({
  id: animal.id.toString(),
  name: animal.name,
  category: animal.category,
  age: animal.age,
  breed: animal.breed || "Race non renseignée",
  description: animal.description,
  character: animal.character,
  vaccinations: animal.vaccinations,
  adoptionFee: animal.adoptionFee,
  image: animal.image || "/placeholder.svg?height=300&width=300",
  reservations: animal.reservations ?? 0,
  isAvailable: true,
}))

export default function AdoptionPage() {
  const { toast } = useToast()
  const [animals, setAnimals] = useState<AdoptionAnimalCard[]>([])
  const [animalsLoading, setAnimalsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [showAddAnimal, setShowAddAnimal] = useState(false)
  const [showReservations, setShowReservations] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)
  const [showMessaging, setShowMessaging] = useState(false)
  const [animalFormData, setAnimalFormData] = useState({
    name: "",
    category: "chien",
    age_range: "adulte",
    breed: "",
    description: "",
    character: "",
    vaccinations: "",
    adoption_fee: "",
    image_url: "",
  })

  const resetForm = () => {
    setAnimalFormData({
      name: "",
      category: "chien",
      age_range: "adulte",
      breed: "",
      description: "",
      character: "",
      vaccinations: "",
      adoption_fee: "",
      image_url: "",
    })
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatCategory = (category: string | null) => {
    switch (category) {
      case "chien":
      case "Chien":
        return "Chien"
      case "chat":
      case "Chat":
        return "Chat"
      default:
        return "Autre"
    }
  }

  const formatAge = (age: string | null) => {
    switch (age) {
      case "chiot":
        return "Chiot"
      case "chaton":
        return "Chaton"
      case "senior":
        return "Senior"
      case "adulte":
      default:
        return "Adulte"
    }
  }

  const loadAnimals = async () => {
    try {
      setAnimalsLoading(true)
      const response = await fetch("/api/admin/adoption-animals")

      if (!response.ok) {
        console.error("Erreur lors du chargement des animaux")
        setAnimals(fallbackAnimalCards)
        return
      }

      const result = await response.json()

      if (result.success && Array.isArray(result.data)) {
        const mapped: AdoptionAnimalCard[] = result.data.map((animal: any) => ({
          id: animal.id,
          name: animal.name,
          category: formatCategory(animal.category),
          age: formatAge(animal.age_range),
          breed: animal.breed || "Race non renseignée",
          description: animal.description || "Description à venir",
          character: animal.character || "Caractère à définir",
          vaccinations: animal.vaccinations || "Informations non disponibles",
          adoptionFee: Number(animal.adoption_fee || 0),
          image: animal.image_url || "/placeholder.svg?height=300&width=300",
          reservations: animal.reservations_count ?? 0,
          isAvailable: animal.is_available !== false,
        }))

        if (mapped.length > 0) {
          setAnimals(mapped)
        } else {
          setAnimals(fallbackAnimalCards)
        }
      } else {
        setAnimals(fallbackAnimalCards)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des animaux:", error)
      setAnimals(fallbackAnimalCards)
    } finally {
      setAnimalsLoading(false)
    }
  }

  useEffect(() => {
    loadAnimals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "adoption/animals")
      formData.append("type", "image")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setAnimalFormData({
          ...animalFormData,
          image_url: result.data.url,
        })
        setImagePreview(result.data.url)
        toast({
          title: "Succès",
          description: "Image uploadée avec succès",
        })
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de l'upload de l'image",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'upload de l'image",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        handleImageUpload(file)
      } else {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une image",
          variant: "destructive",
        })
      }
    }
  }

  const handleCreateAnimal = async () => {
    try {
      if (!animalFormData.name.trim()) {
        toast({
          title: "Erreur",
          description: "Le nom de l'animal est requis",
          variant: "destructive",
        })
        return
      }

      if (!animalFormData.adoption_fee || Number(animalFormData.adoption_fee) < 0) {
        toast({
          title: "Erreur",
          description: "Les frais de réservation doivent être un montant positif",
          variant: "destructive",
        })
        return
      }

      setLoading(true)

      const response = await fetch("/api/admin/adoption-animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...animalFormData,
          adoption_fee: animalFormData.adoption_fee,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Animal ajouté avec succès",
        })
        setShowAddAnimal(false)
        resetForm()
        loadAnimals()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible d'ajouter l'animal",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'animal:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'animal",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayoutWrapper title="Gestion des Adoptions">
      <div className="space-y-6">
        {/* Action Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Animaux à Adopter</h2>
          <Dialog
            open={showAddAnimal}
            onOpenChange={(open) => {
              setShowAddAnimal(open)
              if (!open) {
                resetForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700" onClick={resetForm}>
                Ajouter un Animal
              </Button>
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
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadingImage ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Upload en cours...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>
                            Choisir une image
                          </>
                        )}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-500">ou</span>
                    </div>

                    {imagePreview && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            setAnimalFormData({ ...animalFormData, image_url: "" })
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Ou entrez une URL d'image</Label>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={animalFormData.image_url}
                        onChange={(e) => {
                          setAnimalFormData({ ...animalFormData, image_url: e.target.value })
                          if (e.target.value) {
                            setImagePreview(e.target.value)
                          } else {
                            setImagePreview(null)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label>Nom de l'animal</Label>
                  <Input
                    placeholder="Ex: Max"
                    value={animalFormData.name}
                    onChange={(e) => setAnimalFormData({ ...animalFormData, name: e.target.value })}
                  />
                </div>

                {/* Breed */}
                <div className="space-y-2">
                  <Label>Race / Type</Label>
                  <Input
                    placeholder="Ex: Golden Retriever"
                    value={animalFormData.breed}
                    onChange={(e) => setAnimalFormData({ ...animalFormData, breed: e.target.value })}
                  />
                </div>

                {/* Category & Age */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select
                      value={animalFormData.category}
                      onValueChange={(value) =>
                        setAnimalFormData({ ...animalFormData, category: value as "chien" | "chat" | "autre" })
                      }
                    >
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
                    <Select
                      value={animalFormData.age_range}
                      onValueChange={(value) =>
                        setAnimalFormData({
                          ...animalFormData,
                          age_range: value as "chiot" | "chaton" | "adulte" | "senior",
                        })
                      }
                    >
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
                  <Textarea
                    placeholder="Décrivez l'animal..."
                    rows={4}
                    value={animalFormData.description}
                    onChange={(e) => setAnimalFormData({ ...animalFormData, description: e.target.value })}
                  />
                </div>

                {/* Character */}
                <div className="space-y-2">
                  <Label>Caractère de l'animal</Label>
                  <Input
                    placeholder="Ex: Doux, sociable, énergique"
                    value={animalFormData.character}
                    onChange={(e) => setAnimalFormData({ ...animalFormData, character: e.target.value })}
                  />
                </div>

                {/* Vaccinations */}
                <div className="space-y-2">
                  <Label>Vaccinations reçues</Label>
                  <Textarea
                    placeholder="Listez les vaccinations..."
                    rows={3}
                    value={animalFormData.vaccinations}
                    onChange={(e) => setAnimalFormData({ ...animalFormData, vaccinations: e.target.value })}
                  />
                </div>

                {/* Adoption Fee */}
                <div className="space-y-2">
                  <Label>Frais de réservation (€)</Label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={animalFormData.adoption_fee}
                    onChange={(e) => setAnimalFormData({ ...animalFormData, adoption_fee: e.target.value })}
                  />
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleCreateAnimal}
                  disabled={loading}
                >
                  {loading ? "Ajout en cours..." : "Ajouter l'animal"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Animals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {animalsLoading ? (
            <div className="col-span-2 flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : animals.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-500">
              Aucun animal n'est enregistré pour le moment. Ajoutez-en un pour commencer.
            </div>
          ) : (
            animals.map((animal, idx) => (
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
            ))
          )}
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
