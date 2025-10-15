import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Image from "next/image"

type Campaign = {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  image: string
  createdAt: string
  endDate: string
  active: boolean
}

function getAllCampaigns(): Campaign[] {
  const today = new Date()
  const sample: Campaign[] = [
    {
      id: "1",
      title: "Sauvons Bella",
      description: "Opération urgente pour la patte arrière de Bella",
      targetAmount: 2500,
      currentAmount: 1850,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-10",
      endDate: "2099-12-31",
      active: true,
    },
    {
      id: "2",
      title: "Refuge Minou",
      description: "Nouveaux espaces d'accueil pour chats abandonnés",
      targetAmount: 15000,
      currentAmount: 8500,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-05",
      endDate: "2099-03-05",
      active: true,
    },
    {
      id: "3",
      title: "Vaccination de printemps",
      description: "Campagne saisonnière de vaccination",
      targetAmount: 5000,
      currentAmount: 0,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2025-12-01",
      endDate: "2026-03-01",
      active: false,
    },
    {
      id: "4",
      title: "Soins d'hiver (terminée)",
      description: "Aide aux animaux pendant l'hiver",
      targetAmount: 4000,
      currentAmount: 4000,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2023-11-01",
      endDate: "2023-12-15",
      active: false,
    },
  ]

  // normalize actives by date
  return sample.map(c => ({
    ...c,
    active: new Date(c.endDate) > today && new Date(c.createdAt) <= today,
  }))
}

function CampaignGrid({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {campaigns.map(c => {
        const progress = Math.min(100, (c.currentAmount / Math.max(1, c.targetAmount)) * 100)
        const daysLeft = Math.ceil((new Date(c.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

        return (
          <Card key={c.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <div className="relative w-full h-48">
                <Image
                  src={c.image || "/placeholder.svg"}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-white/90 text-gray-800">
                  <Calendar className="w-3 h-3 mr-1" />
                  {daysLeft > 0 ? `${daysLeft}j restants` : "Terminée"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{c.description}</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progression</span>
                    <span className="text-sm font-bold text-purple-600">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{c.currentAmount.toLocaleString()}€ collectés</span>
                    <span>Objectif: {c.targetAmount.toLocaleString()}€</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function CampaignsPage() {
  const all = getAllCampaigns()
  const now = new Date()
  const enCours = all.filter(c => new Date(c.createdAt) <= now && new Date(c.endDate) > now)
  const aVenir = all.filter(c => new Date(c.createdAt) > now)
  const anciennes = all.filter(c => new Date(c.endDate) <= now)

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Toutes les campagnes</h1>
          <p className="text-gray-600">Parcourez les campagnes en cours, à venir et passées.</p>
        </div>

        <Tabs defaultValue="toutes" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="toutes">Toutes</TabsTrigger>
            <TabsTrigger value="encours">En cours</TabsTrigger>
            <TabsTrigger value="avenir">À venir</TabsTrigger>
            <TabsTrigger value="anciennes">Anciennes</TabsTrigger>
          </TabsList>

          <TabsContent value="toutes">
            <CampaignGrid campaigns={all} />
          </TabsContent>
          <TabsContent value="encours">
            <CampaignGrid campaigns={enCours} />
          </TabsContent>
          <TabsContent value="avenir">
            <CampaignGrid campaigns={aVenir} />
          </TabsContent>
          <TabsContent value="anciennes">
            <CampaignGrid campaigns={anciennes} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}


