import { createClient } from "@/lib/supabase/server"

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

const TABLE = "campaigns"

export async function getAllCampaigns(): Promise<DonationCampaign[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("createdAt", { ascending: false })
  if (error) {
    console.error("Erreur récupération campaigns:", error)
    return []
  }
  return data as DonationCampaign[]
}

export async function getActiveCampaigns(): Promise<DonationCampaign[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("active", true)
    .order("createdAt", { ascending: false })
  return (data as DonationCampaign[]) || []
}

export async function getFeaturedCampaigns(): Promise<DonationCampaign[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("createdAt", { ascending: false })
  return (data as DonationCampaign[]) || []
}

export async function getCampaignById(id: string): Promise<DonationCampaign | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single()
  if (error || !data) return null
  return data as DonationCampaign
}

export async function createCampaign(
  campaignData: Omit<DonationCampaign, "id" | "currentAmount" | "createdAt">,
): Promise<DonationCampaign | null> {
  const supabase = await createClient()
  const toInsert = {
    ...campaignData,
    currentAmount: 0,
    createdAt: new Date().toISOString(),
  }
  const { data, error } = await supabase
    .from(TABLE)
    .insert([toInsert])
    .select()
    .single()
  if (error) {
    console.error("Erreur création campaign:", error)
    return null
  }
  return data as DonationCampaign
}

export async function updateCampaign(id: string, updates: Partial<DonationCampaign>): Promise<DonationCampaign | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single()
  if (error || !data) {
    console.error("Erreur maj campaign:", error)
    return null
  }
  return data as DonationCampaign
}

export async function deleteCampaign(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
  if (error) {
    console.error("Erreur suppression campaign:", error)
    return false
  }
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
  const activeCampaigns = await getActiveCampaigns()

  return {
    totalCampaigns: await getAllCampaigns().then((c) => c.length),
    activeCampaigns: activeCampaigns.length,
    totalRaised: activeCampaigns.reduce((sum, c) => sum + c.currentAmount, 0),
    totalTarget: activeCampaigns.reduce((sum, c) => sum + c.targetAmount, 0),
  }
}
