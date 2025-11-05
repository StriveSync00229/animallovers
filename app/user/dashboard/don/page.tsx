"use client"

import type React from "react"

import { useState } from "react"
import { Heart, TrendingUp, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function UserDonPage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  const campaigns = [
    {
      id: "1",
      title: "Refuge pour chiens abandonnés",
      description: "Aidez-nous à construire un nouveau refuge pour accueillir plus de chiens abandonnés",
      image: "/dog-shelter-construction-site.jpg",
      raised: 15420,
      goal: 25000,
      donors: 234,
    },
    {
      id: "2",
      title: "Soins vétérinaires d'urgence",
      description: "Financez les soins médicaux pour les animaux en détresse",
      image: "/veterinarian-treating-injured-cat.jpg",
      raised: 8750,
      goal: 15000,
      donors: 156,
    },
    {
      id: "3",
      title: "Programme de stérilisation",
      description: "Contrôlez la population de chats errants par la stérilisation",
      image: "/veterinary-surgery-room-professional.jpg",
      raised: 12300,
      goal: 20000,
      donors: 189,
    },
  ]

  const predefinedAmounts = [10, 25, 50, 100, 250]

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = donationAmount === "custom" ? customAmount : donationAmount
    alert(`Merci pour votre don de ${amount}€ ! ${selectedCampaign ? `pour la campagne sélectionnée` : ""}`)
  }

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-red-100 rounded-lg">
          <Heart className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faire un Don</h1>
          <p className="text-gray-600">Soutenez nos actions pour le bien-être animal</p>
        </div>
      </div>

      {/* Quick donation form */}
      <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Don rapide</h2>
        <form onSubmit={handleDonation} className="space-y-6">
          <div className="space-y-3">
            <Label>Choisissez un montant</Label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setDonationAmount(amount.toString())}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    donationAmount === amount.toString()
                      ? "bg-red-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-red-50 border border-gray-200"
                  }`}
                >
                  {amount}€
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customAmount">Ou entrez un montant personnalisé</Label>
            <div className="relative">
              <Input
                id="customAmount"
                type="number"
                placeholder="Montant en euros"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setDonationAmount("custom")
                }}
                className="pr-12"
                min="1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">€</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
            disabled={!donationAmount && !customAmount}
          >
            <Heart className="w-5 h-5 mr-2" />
            Faire un don maintenant
          </Button>
        </form>
      </Card>

      {/* Campaigns */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Campagnes de collecte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.raised / campaign.goal) * 100
            return (
              <Card
                key={campaign.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedCampaign(campaign.id)}
              >
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  {selectedCampaign === campaign.id && (
                    <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                      <div className="bg-white rounded-full p-3">
                        <Heart className="w-8 h-8 text-red-600 fill-red-600" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">{campaign.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-red-600">{campaign.raised.toLocaleString()}€</span>
                      <span className="text-gray-500">sur {campaign.goal.toLocaleString()}€</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{campaign.donors} donateurs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Target className="w-4 h-4" />
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCampaign(campaign.id)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Soutenir cette campagne
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Impact stats */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Votre impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">0€</div>
            <div className="text-sm text-gray-600">Total des dons</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Campagnes soutenues</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Animaux aidés</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
