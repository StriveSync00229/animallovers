"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, Search, Edit, Trash2, Heart, Target, Calendar } from "lucide-react"
import { motion } from "framer-motion"

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

export default function AdminDonationsPage() {
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([
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
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<DonationCampaign | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.animalName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateCampaign = () => {
    setEditingCampaign(null)
    setIsDialogOpen(true)
  }

  const handleEditCampaign = (campaign: DonationCampaign) => {
    setEditingCampaign(campaign)
    setIsDialogOpen(true)
  }

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
  }

  const handleSaveCampaign = (campaignData: any) => {
    if (editingCampaign) {
      setCampaigns(
        campaigns.map((campaign) => (campaign.id === editingCampaign.id ? { ...campaign, ...campaignData } : campaign)),
      )
    } else {
      const newCampaign: DonationCampaign = {
        id: Date.now().toString(),
        ...campaignData,
        currentAmount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setCampaigns([...campaigns, newCampaign])
    }
    setIsDialogOpen(false)
  }

  if (!isAuthenticated) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Collectes de dons</h1>
              <p className="text-gray-600">Gérez vos campagnes de collecte de fonds</p>
            </div>
          </div>
          <Button onClick={handleCreateCampaign} className="bg-purple-500 hover:bg-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle collecte
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-rose-50 to-pink-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collectes actives</CardTitle>
              <div className="p-2 rounded-md bg-white/70 shadow-sm">
                <Heart className="h-4 w-4 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{campaigns.filter((c) => c.active).length}</div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-emerald-50 to-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total collecté</CardTitle>
              <div className="p-2 rounded-md bg-white/70 shadow-sm">
                <Target className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {campaigns.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString()}€
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Objectif total</CardTitle>
              <div className="p-2 rounded-md bg-white/70 shadow-sm">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {campaigns.reduce((sum, c) => sum + c.targetAmount, 0).toLocaleString()}€
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Campagnes de collecte ({campaigns.length})</CardTitle>
                <CardDescription>Gérez vos campagnes de collecte de fonds pour les animaux</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une campagne..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campagne</TableHead>
                  <TableHead>Animal</TableHead>
                  <TableHead>Progression</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date fin</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => {
                  const progressPercentage = (campaign.currentAmount / campaign.targetAmount) * 100
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={campaign.image || "/placeholder.svg"}
                            alt={campaign.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{campaign.title}</div>
                            <div className="text-sm text-gray-500">{campaign.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {campaign.animalType === "chien" ? "🐕" : "🐱"} {campaign.animalName}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{campaign.currentAmount.toLocaleString()}€</span>
                            <span>{campaign.targetAmount.toLocaleString()}€</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                          <div className="text-xs text-gray-500">{progressPercentage.toFixed(1)}% atteint</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <Badge variant={campaign.active ? "default" : "secondary"}>
                            {campaign.active ? "Active" : "Inactive"}
                          </Badge>
                          {campaign.featured && (
                            <Badge variant="outline" className="text-xs">
                              Mise en avant
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{campaign.endDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditCampaign(campaign)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteCampaign(campaign.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog pour créer/éditer une campagne */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCampaign ? "Modifier la campagne" : "Créer une nouvelle campagne"}</DialogTitle>
              <DialogDescription>Créez une campagne de collecte de fonds pour aider un animal</DialogDescription>
            </DialogHeader>
            <CampaignForm
              campaign={editingCampaign}
              onSave={handleSaveCampaign}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function CampaignForm({
  campaign,
  onSave,
  onCancel,
}: {
  campaign: DonationCampaign | null
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: campaign?.title || "",
    description: campaign?.description || "",
    story: campaign?.story || "",
    targetAmount: campaign?.targetAmount || 0,
    image: campaign?.image || "/placeholder.svg?height=200&width=300",
    active: campaign?.active ?? true,
    featured: campaign?.featured ?? false,
    endDate: campaign?.endDate || "",
    animalName: campaign?.animalName || "",
    animalType: campaign?.animalType || ("chien" as "chien" | "chat"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre de la campagne</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Photo de la campagne</Label>
        <div className="space-y-2">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                // Créer une URL temporaire pour l'aperçu
                const imageUrl = URL.createObjectURL(file)
                setFormData({ ...formData, image: imageUrl })
              }
            }}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          <div className="text-sm text-gray-500">Ou entrez une URL d'image :</div>
          <Input
            placeholder="https://exemple.com/image.jpg"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Aperçu"
                className="w-32 h-24 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=96&width=128"
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description courte</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="story">Histoire détaillée</Label>
        <Textarea
          id="story"
          value={formData.story}
          onChange={(e) => setFormData({ ...formData, story: e.target.value })}
          rows={4}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="animalName">Nom de l'animal</Label>
          <Input
            id="animalName"
            value={formData.animalName}
            onChange={(e) => setFormData({ ...formData, animalName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="animalType">Type d'animal</Label>
          <select
            id="animalType"
            value={formData.animalType}
            onChange={(e) => setFormData({ ...formData, animalType: e.target.value as "chien" | "chat" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="chien">Chien</option>
            <option value="chat">Chat</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="targetAmount">Objectif (€)</Label>
          <Input
            id="targetAmount"
            type="number"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: Number.parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Date de fin</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={formData.active}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
          <Label htmlFor="active">Campagne active</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
          />
          <Label htmlFor="featured">Mettre en avant</Label>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
          {campaign ? "Modifier" : "Créer"}
        </Button>
      </DialogFooter>
    </form>
  )
}
