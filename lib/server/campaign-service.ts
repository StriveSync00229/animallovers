// Types pour les campagnes de collecte
export interface DonationCampaign {
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

// Simulation d'une base de données en mémoire
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

// Fonction pour obtenir toutes les campagnes
export async function getAllCampaigns(): Promise<DonationCampaign[]> {
  return campaigns
}

// Fonction pour obtenir les campagnes actives
export async function getActiveCampaigns(): Promise<DonationCampaign[]> {
  return campaigns.filter((campaign) => campaign.active)
}

// Fonction pour obtenir les campagnes mises en avant
export async function getFeaturedCampaigns(): Promise<DonationCampaign[]> {
  return campaigns.filter((campaign) => campaign.active && campaign.featured)
}

// Fonction pour obtenir une campagne par ID
export async function getCampaignById(id: string): Promise<DonationCampaign | null> {
  return campaigns.find((campaign) => campaign.id === id) || null
}

// Fonction pour créer une nouvelle campagne
export async function createCampaign(
  campaignData: Omit<DonationCampaign, "id" | "currentAmount" | "createdAt">,
): Promise<DonationCampaign> {
  const newCampaign: DonationCampaign = {
    id: Date.now().toString(),
    currentAmount: 0,
    createdAt: new Date().toISOString().split("T")[0],
    ...campaignData,
  }

  campaigns.push(newCampaign)
  return newCampaign
}

// Fonction pour mettre à jour une campagne
export async function updateCampaign(id: string, updates: Partial<DonationCampaign>): Promise<DonationCampaign | null> {
  const index = campaigns.findIndex((campaign) => campaign.id === id)
  if (index === -1) return null

  campaigns[index] = { ...campaigns[index], ...updates }
  return campaigns[index]
}

// Fonction pour supprimer une campagne
export async function deleteCampaign(id: string): Promise<boolean> {
  const index = campaigns.findIndex((campaign) => campaign.id === id)
  if (index === -1) return false

  campaigns.splice(index, 1)
  return true
}

// Fonction pour faire un don à une campagne
export async function donateToCampaign(
  campaignId: string,
  amount: number,
): Promise<{ success: boolean; message: string }> {
  try {
    const campaign = await getCampaignById(campaignId)
    if (!campaign) {
      return { success: false, message: "Campagne introuvable" }
    }

    if (!campaign.active) {
      return { success: false, message: "Cette campagne n'est plus active" }
    }

    // Mettre à jour le montant collecté
    await updateCampaign(campaignId, {
      currentAmount: campaign.currentAmount + amount,
    })

    return { success: true, message: "Don effectué avec succès" }
  } catch (error) {
    console.error("Erreur lors du don:", error)
    return { success: false, message: "Erreur lors du traitement du don" }
  }
}

// Fonction pour obtenir les statistiques des campagnes
export async function getCampaignStats(): Promise<{
  totalCampaigns: number
  activeCampaigns: number
  totalRaised: number
  totalTarget: number
}> {
  const activeCampaigns = campaigns.filter((c) => c.active)

  return {
    totalCampaigns: campaigns.length,
    activeCampaigns: activeCampaigns.length,
    totalRaised: campaigns.reduce((sum, c) => sum + c.currentAmount, 0),
    totalTarget: campaigns.reduce((sum, c) => sum + c.targetAmount, 0),
  }
}
