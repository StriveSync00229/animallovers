"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Users } from "lucide-react"

interface Campaign {
  id: string
  title: string
  target_amount: number
  current_amount: number
  donor_count: number
  is_active: boolean
}

export function RealtimeCampaignStats({ campaignId }: { campaignId: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Charger les données initiales de la campagne
    const loadCampaign = async () => {
      try {
        const { data, error } = await supabase
          .from("donation_campaigns")
          .select("*")
          .eq("id", campaignId)
          .single()

        if (!error && data) {
          setCampaign(data as Campaign)
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la campagne:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCampaign()

    // S'abonner aux changements en temps réel de la campagne
    const campaignChannel = supabase
      .channel(`campaign-${campaignId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "donation_campaigns",
          filter: `id=eq.${campaignId}`,
        },
        (payload) => {
          setCampaign(payload.new as Campaign)
        },
      )
      .subscribe()

    // S'abonner aux nouveaux dons pour cette campagne
    const donationsChannel = supabase
      .channel(`campaign-donations-${campaignId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "donations",
          filter: `campaign_id=eq.${campaignId}`,
        },
        async () => {
          // Recharger les données de la campagne après un nouveau don
          const { data } = await supabase
            .from("donation_campaigns")
            .select("*")
            .eq("id", campaignId)
            .single()

          if (data) {
            setCampaign(data as Campaign)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(campaignChannel)
      supabase.removeChannel(donationsChannel)
    }
  }, [campaignId])

  if (isLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </Card>
    )
  }

  if (!campaign) {
    return null
  }

  const progress = campaign.target_amount > 0
    ? Math.min((Number(campaign.current_amount) / Number(campaign.target_amount)) * 100, 100)
    : 0

  return (
    <Card className="p-6 bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{campaign.title}</h3>

      <div className="space-y-4">
        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-rose-600">
              {Number(campaign.current_amount).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            <span className="text-gray-500">
              sur {Number(campaign.target_amount).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="text-center text-sm font-semibold text-gray-700">{Math.round(progress)}%</div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-rose-200">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{campaign.donor_count || 0}</div>
              <div className="text-xs text-gray-600">Donateurs</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</div>
              <div className="text-xs text-gray-600">Objectif</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

