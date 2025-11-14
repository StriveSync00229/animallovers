"use client"

import { useState, useRef, useEffect, useCallback } from "react"
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
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

const currencyFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })

const formatCurrency = (value: number) => currencyFormatter.format(value || 0)

const defaultDonationStats = {
  total: 0,
  thisWeek: 0,
  thisWeekCount: 0,
  today: 0,
  todayCount: 0,
  average: 0,
}

type DonationRecord = {
  id: string
  amount: number
  donor_email: string | null
  donor_first_name: string | null
  created_at: string
}

type ChartPoint = {
  period: string
  montant: number
}

const getStartOfDay = (date: Date) => {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  return start
}

const getStartOfWeek = (date: Date) => {
  const start = getStartOfDay(date)
  const day = start.getDay()
  const diff = (day + 6) % 7
  start.setDate(start.getDate() - diff)
  return start
}

const sumAmounts = (donations: DonationRecord[]) =>
  donations.reduce((sum, donation) => sum + Number(donation.amount || 0), 0)

const calculateDonationStats = (donations: DonationRecord[]) => {
  if (!donations || donations.length === 0) {
    return { ...defaultDonationStats }
  }

  const now = new Date()
  const startToday = getStartOfDay(now)
  const startWeek = getStartOfWeek(now)

  const todayDonations = donations.filter((donation) => new Date(donation.created_at) >= startToday)
  const weekDonations = donations.filter((donation) => new Date(donation.created_at) >= startWeek)

  const totalAmount = sumAmounts(donations)

  return {
    total: totalAmount,
    thisWeek: sumAmounts(weekDonations),
    thisWeekCount: weekDonations.length,
    today: sumAmounts(todayDonations),
    todayCount: todayDonations.length,
    average: donations.length ? totalAmount / donations.length : 0,
  }
}

const buildChartData = (donations: DonationRecord[], filter: string): ChartPoint[] => {
  const entries = donations || []
  const now = getStartOfDay(new Date())

  switch (filter) {
    case "day":
      return buildDailyData(entries, now, 7)
    case "month":
      return buildMonthlyData(entries, now, 6)
    case "year":
      return buildYearlyData(entries, now, 5)
    case "week":
    default:
      return buildWeeklyData(entries, now, 8)
  }
}

const buildDailyData = (donations: DonationRecord[], reference: Date, days: number): ChartPoint[] => {
  const data: ChartPoint[] = []
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(reference)
    day.setDate(reference.getDate() - i)
    const total = donations.reduce((sum, donation) => {
      const donationDate = new Date(donation.created_at)
      return donationDate.toDateString() === day.toDateString() ? sum + Number(donation.amount || 0) : sum
    }, 0)
    data.push({
      period: day.toLocaleDateString("fr-FR", { weekday: "short" }),
      montant: total,
    })
  }
  return data
}

const buildWeeklyData = (donations: DonationRecord[], reference: Date, weeks: number): ChartPoint[] => {
  const startCurrentWeek = getStartOfWeek(reference)
  const data: ChartPoint[] = []
  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(startCurrentWeek)
    start.setDate(startCurrentWeek.getDate() - i * 7)
    const end = new Date(start)
    end.setDate(start.getDate() + 7)
    const total = donations.reduce((sum, donation) => {
      const created = new Date(donation.created_at)
      return created >= start && created < end ? sum + Number(donation.amount || 0) : sum
    }, 0)
    data.push({
      period: `${start.toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}`,
      montant: total,
    })
  }
  return data
}

const buildMonthlyData = (donations: DonationRecord[], reference: Date, months: number): ChartPoint[] => {
  const data: ChartPoint[] = []
  for (let i = months - 1; i >= 0; i--) {
    const start = new Date(reference.getFullYear(), reference.getMonth() - i, 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
    const total = donations.reduce((sum, donation) => {
      const created = new Date(donation.created_at)
      return created >= start && created < end ? sum + Number(donation.amount || 0) : sum
    }, 0)
    data.push({
      period: start.toLocaleDateString("fr-FR", { month: "short" }),
      montant: total,
    })
  }
  return data
}

const buildYearlyData = (donations: DonationRecord[], reference: Date, years: number): ChartPoint[] => {
  const data: ChartPoint[] = []
  for (let i = years - 1; i >= 0; i--) {
    const startYear = reference.getFullYear() - i
    const start = new Date(startYear, 0, 1)
    const end = new Date(startYear + 1, 0, 1)
    const total = donations.reduce((sum, donation) => {
      const created = new Date(donation.created_at)
      return created >= start && created < end ? sum + Number(donation.amount || 0) : sum
    }, 0)
    data.push({
      period: `${startYear}`,
      montant: total,
    })
  }
  return data
}

export default function DonPage() {
  const { toast } = useToast()
  const [timeFilter, setTimeFilter] = useState("week")
  const [showAddCampaign, setShowAddCampaign] = useState(false)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [campaignsLoading, setCampaignsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [donationsLoading, setDonationsLoading] = useState(true)
  const [donationsData, setDonationsData] = useState<DonationRecord[]>([])
  const [donationsChartData, setDonationsChartData] = useState<ChartPoint[]>([])
  const [donationStats, setDonationStats] = useState(defaultDonationStats)
  const [recentDonations, setRecentDonations] = useState<DonationRecord[]>([])

  // Charger les campagnes depuis l'API
  const loadCampaigns = async () => {
    try {
      setCampaignsLoading(true)
      const response = await fetch("/api/admin/campaigns")
      
      if (!response.ok) {
        console.error("Erreur lors du chargement des campagnes")
        setCampaigns([])
        return
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        // Transformer les données pour correspondre au format d'affichage
        const transformedCampaigns = result.data.map((campaign: any) => ({
          id: campaign.id,
          title: campaign.title,
          description: campaign.description || campaign.short_description || "",
          category: campaign.animal_type || "Autre",
          age: campaign.animal_age || "Non spécifié",
          goal: parseFloat(campaign.target_amount || 0),
          raised: parseFloat(campaign.current_amount || 0),
          image: campaign.featured_image || "/placeholder.svg?height=200&width=300",
          active: campaign.is_active || false,
        }))
        setCampaigns(transformedCampaigns)
      } else {
        setCampaigns([])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des campagnes:", error)
      setCampaigns([])
    } finally {
      setCampaignsLoading(false)
    }
  }

  // Charger les campagnes au montage du composant
  useEffect(() => {
    loadCampaigns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadDonationsData = useCallback(async () => {
    try {
      setDonationsLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("donations")
        .select("id, donor_email, donor_first_name, amount, payment_status, created_at")
        .order("created_at", { ascending: false })
        .limit(200)

      if (error) {
        throw error
      }

      const completed: DonationRecord[] =
        (data || [])
          .filter((item: any) => item.payment_status === "completed")
          .map((item: any) => ({
            id: item.id,
            amount: Number(item.amount) || 0,
            donor_email: item.donor_email,
            donor_first_name: item.donor_first_name,
            created_at: item.created_at,
          }))

      setDonationsData(completed)
      setRecentDonations(completed.slice(0, 5))
      setDonationStats(calculateDonationStats(completed))
    } catch (error) {
      console.error("Erreur lors du chargement des dons:", error)
      setDonationsData([])
      setRecentDonations([])
      setDonationStats({ ...defaultDonationStats })
    } finally {
      setDonationsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDonationsData()
    const supabase = createClient()
    const channel = supabase
      .channel("admin-donations-tracking")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "donations",
        },
        () => {
          loadDonationsData()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [loadDonationsData])

  useEffect(() => {
    setDonationsChartData(buildChartData(donationsData, timeFilter))
  }, [donationsData, timeFilter])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Formulaire de création de campagne
  const [campaignFormData, setCampaignFormData] = useState({
    title: "",
    object: "",
    description: "",
    category: "none",
    age: "none",
    target_amount: "",
    featured_image: "",
  })

  // Réinitialiser le formulaire
  const resetForm = () => {
    setCampaignFormData({
      title: "",
      object: "",
      description: "",
      category: "none",
      age: "none",
      target_amount: "",
      featured_image: "",
    })
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Gérer l'upload d'image
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)
      
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "campaigns/images")
      formData.append("type", "image")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setCampaignFormData({
          ...campaignFormData,
          featured_image: result.data.url,
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

  // Gérer le changement de fichier
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

  // Créer une campagne
  const handleCreateCampaign = async () => {
    try {
      if (!campaignFormData.title.trim()) {
        toast({
          title: "Erreur",
          description: "Le titre de la campagne est requis",
          variant: "destructive",
        })
        return
      }

      if (!campaignFormData.target_amount || parseFloat(campaignFormData.target_amount) <= 0) {
        toast({
          title: "Erreur",
          description: "Le montant cible doit être supérieur à 0",
          variant: "destructive",
        })
        return
      }

      setLoading(true)

      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: campaignFormData.title,
          object: campaignFormData.object,
          description: campaignFormData.description,
          animal_type: campaignFormData.category !== "none" ? campaignFormData.category : null,
          animal_age: campaignFormData.age !== "none" ? campaignFormData.age : null,
          target_amount: campaignFormData.target_amount,
          featured_image: campaignFormData.featured_image || null,
          is_active: true,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Campagne créée avec succès",
        })
        setShowAddCampaign(false)
        resetForm()
        // Recharger les campagnes
        loadCampaigns()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de créer la campagne",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la création de la campagne:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la campagne",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayoutWrapper title="Gestion des Dons">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-fadeInUp">
            <CardHeader className="pb-3">
              <CardDescription>Total Collecté</CardDescription>
              <CardTitle className="text-3xl font-bold text-red-600">
                {donationsLoading ? "—" : formatCurrency(donationStats.total)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {donationsLoading ? "Chargement des dons..." : `${donationsData.length} dons confirmés`}
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Cette Semaine</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {donationsLoading ? "—" : formatCurrency(donationStats.thisWeek)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {donationsLoading ? "" : `${donationStats.thisWeekCount} dons`}
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Aujourd'hui</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {donationsLoading ? "—" : formatCurrency(donationStats.today)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {donationsLoading ? "" : `${donationStats.todayCount} dons`}
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Don Moyen</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {donationsLoading ? "—" : formatCurrency(donationStats.average)}
              </CardTitle>
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
            {donationsLoading && donationsChartData.length === 0 ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : donationsChartData.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-10">Aucune donnée disponible pour cette période.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={donationsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line type="monotone" dataKey="montant" stroke="#dc2626" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle>Dons Récents</CardTitle>
            <CardDescription>Liste des derniers dons effectués</CardDescription>
          </CardHeader>
          <CardContent>
            {donationsLoading && recentDonations.length === 0 ? (
              <div className="flex items-center justify-center py-6">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recentDonations.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-4">Aucun don n'a encore été enregistré.</p>
            ) : (
              <div className="space-y-3">
                {recentDonations.map((donation) => {
                  const donationDate = new Date(donation.created_at)
                  const donorName = donation.donor_first_name || "Donateur anonyme"
                  const donorEmail = donation.donor_email || "Email non renseigné"

                  return (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{donorName}</p>
                        <p className="text-sm text-gray-600">{donorEmail}</p>
                        <p className="text-xs text-gray-500">
                          {donationDate.toLocaleDateString("fr-FR")} à{" "}
                          {donationDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(donation.amount)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Campaigns Management */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Campagnes de Don</h2>
          <Dialog
            open={showAddCampaign}
            onOpenChange={(open) => {
              setShowAddCampaign(open)
              if (!open) {
                resetForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700" onClick={resetForm}>
                Créer une Campagne
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer une Campagne de Don</DialogTitle>
                <DialogDescription>Complétez tous les champs pour lancer une nouvelle campagne</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Media */}
                <div className="space-y-2">
                  <Label>Image</Label>
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

                    {/* Aperçu de l'image */}
                    {imagePreview && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            setCampaignFormData({ ...campaignFormData, featured_image: "" })
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

                    {/* Champ URL (optionnel) */}
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Ou entrez une URL d'image</Label>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={campaignFormData.featured_image}
                        onChange={(e) => {
                          setCampaignFormData({ ...campaignFormData, featured_image: e.target.value })
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

                {/* Title */}
                <div className="space-y-2">
                  <Label>Titre de la campagne *</Label>
                  <Input
                    placeholder="Ex: Sauvetage de Max"
                    value={campaignFormData.title}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, title: e.target.value })}
                  />
                </div>

                {/* Object */}
                <div className="space-y-2">
                  <Label>Objet</Label>
                  <Input
                    placeholder="Ex: Opération chirurgicale"
                    value={campaignFormData.object}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, object: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Décrivez la campagne en détail..."
                    rows={5}
                    value={campaignFormData.description}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, description: e.target.value })}
                  />
                </div>

                {/* Category & Age */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select
                      value={campaignFormData.category}
                      onValueChange={(value) => setCampaignFormData({ ...campaignFormData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        <SelectItem value="chien">Chien</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tranche d'âge</Label>
                    <Select
                      value={campaignFormData.age}
                      onValueChange={(value) => setCampaignFormData({ ...campaignFormData, age: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
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
                  <Label>Montant de collecte à atteindre (€) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="5000"
                    value={campaignFormData.target_amount}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, target_amount: e.target.value })}
                  />
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleCreateCampaign}
                  disabled={loading}
                >
                  {loading ? "Création en cours..." : "Créer la campagne"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaignsLoading ? (
            <div className="col-span-2 flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-500">
              Aucune campagne n'a été créée pour le moment. Créez-en une pour commencer.
            </div>
          ) : (
            campaigns.map((campaign, idx) => (
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
            ))
          )}
        </div>
      </div>
    </AdminLayoutWrapper>
  )
}
