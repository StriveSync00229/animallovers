"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Target } from "lucide-react"

interface DonationCampaign {
  id: string
  title: string
  description: string
  story: string
  targetAmount: number
  currentAmount: number
  image: string
  active: boolean
  featured: boolean
  createdAt: string
  endDate: string
  animalName: string
  animalType: "chien" | "chat"
}

// Fonction pour récupérer les campagnes (simulation - à remplacer par un vrai service)
const getActiveCampaigns = (): DonationCampaign[] => {
  // Ici on récupérerait les données depuis l'API ou le localStorage
  // Pour l'instant, on simule avec les mêmes données que l'admin
  const campaigns: DonationCampaign[] = [
    {
      id: "1",
      title: "Sauvons Bella",
      description: "Bella, une chienne de 3 ans, a besoin d'une opération urgente",
      story:
        "Bella a été trouvée blessée sur le bord de la route. Elle nécessite une intervention chirurgicale coûteuse pour retrouver l'usage de sa patte arrière.",
      targetAmount: 2500,
      currentAmount: 1850,
      image: "/placeholder.svg?height=200&width=300",
      active: true,
      featured: true,
      createdAt: "2024-01-10",
      endDate: "2024-02-10",
      animalName: "Bella",
      animalType: "chien",
    },
    {
      id: "2",
      title: "Refuge pour Minou",
      description: "Aidez-nous à construire un nouveau refuge pour chats abandonnés",
      story:
        "Notre refuge actuel est saturé. Nous avons besoin de fonds pour construire de nouveaux espaces d'accueil pour les chats abandonnés.",
      targetAmount: 15000,
      currentAmount: 8500,
      image: "/placeholder.svg?height=200&width=300",
      active: true,
      featured: false,
      createdAt: "2024-01-05",
      endDate: "2024-03-05",
      animalName: "Collectif",
      animalType: "chat",
    },
  ]

  return campaigns.filter((campaign) => campaign.active)
}

export default function DonationCampaigns() {
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([])

  useEffect(() => {
    const activeCampaigns = getActiveCampaigns()
    setCampaigns(activeCampaigns)
  }, [])

  // Si aucune campagne active, ne rien afficher
  if (campaigns.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campagnes de collecte urgentes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aidez-nous à sauver des vies. Chaque don compte pour offrir une seconde chance à nos amis à quatre pattes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const progressPercentage = (campaign.currentAmount / campaign.targetAmount) * 100
            const daysLeft = Math.ceil(
              (new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
            )

            return (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=192&width=384"
                    }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {campaign.animalType === "chien" ? "🐕" : "🐱"} {campaign.animalName}
                    </Badge>
                    {campaign.featured && <Badge className="bg-purple-500 text-white">⭐ Urgent</Badge>}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-800">
                      <Calendar className="w-3 h-3 mr-1" />
                      {daysLeft > 0 ? `${daysLeft}j restants` : "Terminée"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progression</span>
                        <span className="text-sm font-bold text-purple-600">{progressPercentage.toFixed(0)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{campaign.currentAmount.toLocaleString()}€ collectés</span>
                        <span>Objectif: {campaign.targetAmount.toLocaleString()}€</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-purple-500 hover:bg-purple-600">
                        <Link href="/faire-un-don">
                          <Heart className="w-4 h-4 mr-2" />
                          Faire un don
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Target className="w-4 h-4 mr-2" />
                        En savoir plus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600">
            <Link href="/faire-un-don">
              <Heart className="w-5 h-5 mr-2" />
              Voir toutes les campagnes
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
