import { type NextRequest, NextResponse } from "next/server"
import { processDonation } from "@/lib/server/donation-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transactionId, donationData } = body

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: "ID de transaction manquant" },
        { status: 400 },
      )
    }

    // TODO: Vérifier la transaction avec l'API KKiaPay
    // Pour l'instant, on fait confiance à la réponse du callback
    // Dans un environnement de production, vous devriez vérifier la transaction
    // avec l'API serveur de KKiaPay en utilisant votre clé privée

    // Traiter le don
    const result = await processDonation({
      ...donationData,
      paymentMethod: "kkiapay" as any, // Ajouter kkiapay comme méthode de paiement
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      transactionId,
    })
  } catch (error: any) {
    console.error("Erreur lors de la vérification:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la vérification de la transaction" },
      { status: 500 },
    )
  }
}

