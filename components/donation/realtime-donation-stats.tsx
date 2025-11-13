"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Heart, TrendingUp, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

interface DonationStats {
  totalAmount: number
  donorsCount: number
  animalsHelped: number
}

export function RealtimeDonationStats() {
  const [stats, setStats] = useState<DonationStats>({
    totalAmount: 0,
    donorsCount: 0,
    animalsHelped: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Charger les statistiques initiales
    const loadInitialStats = async () => {
      try {
        const { data: donations, error } = await supabase
          .from("donations")
          .select("amount")
          .eq("payment_status", "completed")

        if (!error && donations) {
          const totalAmount = donations.reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0)
          const donorsCount = donations.length
          const animalsHelped = Math.floor(donorsCount * 0.3)

          setStats({
            totalAmount,
            donorsCount,
            animalsHelped,
          })
        }
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialStats()

    // S'abonner aux changements en temps réel
    const channel = supabase
      .channel("donations-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "donations",
          filter: "payment_status=eq.completed",
        },
        async (payload) => {
          // Recharger les statistiques après un changement
          const { data: donations } = await supabase
            .from("donations")
            .select("amount")
            .eq("payment_status", "completed")

          if (donations) {
            const totalAmount = donations.reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0)
            const donorsCount = donations.length
            const animalsHelped = Math.floor(donorsCount * 0.3)

            setStats({
              totalAmount,
              donorsCount,
              animalsHelped,
            })
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          <span className="text-sm text-gray-600">Total collecté</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {stats.totalAmount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </div>
        <p className="text-sm text-gray-600 mt-2">Merci pour votre générosité !</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm text-gray-600">Donateurs</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">{stats.donorsCount}</div>
        <p className="text-sm text-gray-600 mt-2">Personnes qui nous soutiennent</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-sm text-gray-600">Animaux aidés</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">{stats.animalsHelped}</div>
        <p className="text-sm text-gray-600 mt-2">Vies transformées</p>
      </Card>
    </div>
  )
}

