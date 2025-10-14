import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/types/database"

type DonationCampaign = Database["public"]["Tables"]["donation_campaigns"]["Row"]
type Donation = Database["public"]["Tables"]["donations"]["Row"]
type DonationInsert = Database["public"]["Tables"]["donations"]["Insert"]

export interface DonationData {
  amount: number
  isMonthly: boolean
  cause: string
  email: string
  firstName?: string
  message?: string
  paymentMethod: "card" | "paypal" | "bank_transfer"
  campaignId?: string
}

export async function processDonation(donationData: DonationData): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient()

    // Create donation record
    const donationRecord: DonationInsert = {
      amount: donationData.amount,
      is_monthly: donationData.isMonthly,
      donor_email: donationData.email,
      donor_first_name: donationData.firstName,
      message: donationData.message,
      payment_method: donationData.paymentMethod,
      payment_status: "completed", // In real app, this would be 'pending' initially
      campaign_id: donationData.campaignId,
    }

    const { data: donation, error: donationError } = await supabase
      .from("donations")
      .insert(donationRecord)
      .select()
      .single()

    if (donationError) {
      console.error("Error creating donation:", donationError)
      return {
        success: false,
        message: "Une erreur est survenue lors du traitement de votre don.",
      }
    }

    // Update campaign amount if campaign specified
    if (donationData.campaignId) {
      const { error: updateError } = await supabase.rpc("increment_campaign_amount", {
        campaign_id: donationData.campaignId,
        amount: donationData.amount,
      })

      if (updateError) {
        console.error("Error updating campaign amount:", updateError)
      }
    }

    return {
      success: true,
      message: "Votre don a été traité avec succès. Merci pour votre générosité !",
    }
  } catch (error) {
    console.error("Erreur lors du traitement du don:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors du traitement de votre don. Veuillez réessayer.",
    }
  }
}

export async function getDonationStats(): Promise<{
  totalAmount: number
  donorsCount: number
  animalsHelped: number
}> {
  const supabase = await createClient()

  const { data: donations, error } = await supabase.from("donations").select("amount").eq("payment_status", "completed")

  if (error) {
    console.error("Error fetching donation stats:", error)
    return {
      totalAmount: 0,
      donorsCount: 0,
      animalsHelped: 0,
    }
  }

  const totalAmount = donations?.reduce((sum: number, donation: any) => sum + donation.amount, 0) || 0
  const donorsCount = donations?.length || 0
  const animalsHelped = Math.floor(donorsCount * 0.3) // Estimation

  return {
    totalAmount,
    donorsCount,
    animalsHelped,
  }
}

export async function getActiveCampaigns(): Promise<DonationCampaign[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("donation_campaigns")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching campaigns:", error)
    return []
  }

  return data || []
}

export async function getFeaturedCampaigns(): Promise<DonationCampaign[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("donation_campaigns")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching featured campaigns:", error)
    return []
  }

  return data || []
}

export async function getCampaignById(id: string): Promise<DonationCampaign | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("donation_campaigns").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching campaign:", error)
    return null
  }

  return data
}
