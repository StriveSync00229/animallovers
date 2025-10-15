import Image from "next/image"
import { notFound } from "next/navigation"
import { getCampaignById } from "@/lib/server/campaign-service"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaignById(params.id)
  if (!campaign) return notFound()

  const progress = Math.min(100, (campaign.currentAmount / Math.max(1, campaign.targetAmount)) * 100)
  const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="relative w-full h-72 md:h-[28rem] rounded-2xl overflow-hidden shadow-xl">
            <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white/90 text-gray-800">
                <Calendar className="w-3 h-3 mr-1" />
                {daysLeft > 0 ? `${daysLeft}j restants` : "Terminée"}
              </Badge>
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
            <p className="text-gray-700 mb-6">{campaign.description}</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Progression</span>
                <span className="text-sm font-bold text-purple-600">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{campaign.currentAmount.toLocaleString()}€ collectés</span>
                <span>Objectif: {campaign.targetAmount.toLocaleString()}€</span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none mb-8">
              <h2>Histoire</h2>
              <p>{campaign.story}</p>
            </div>

            <div className="flex gap-3">
              <Button asChild className="bg-purple-500 hover:bg-purple-600">
                <Link href="/faire-un-don">Faire un don</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/campagnes">Retour aux campagnes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


