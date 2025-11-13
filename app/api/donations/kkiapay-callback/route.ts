import { type NextRequest, NextResponse } from "next/server"
import { processDonation } from "@/lib/server/donation-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const transactionId = searchParams.get("transactionId") || searchParams.get("id")
    const status = searchParams.get("status")
    const data = searchParams.get("data")

    // Récupérer les données du don depuis le paramètre data
    let donationData = null
    if (data) {
      try {
        donationData = JSON.parse(data)
      } catch (e) {
        console.error("Erreur lors du parsing des données:", e)
      }
    }

    // Si le paiement est réussi, traiter le don
    if (status === "SUCCESS" && transactionId && donationData) {
      try {
        await processDonation({
          amount: donationData.amount || 0,
          isMonthly: donationData.isMonthly || false,
          cause: donationData.cause || "general",
          email: donationData.email || "",
          firstName: donationData.firstName,
          message: donationData.message,
          campaignId: donationData.campaignId,
          paymentMethod: "kkiapay" as any,
        })
      } catch (error) {
        console.error("Erreur lors du traitement du don:", error)
      }
    }

    // Rediriger vers la page de remerciement ou d'erreur
    const redirectUrl = status === "SUCCESS"
      ? "/merci-pour-votre-don?status=success"
      : "/faire-un-don?status=error"

    return NextResponse.redirect(new URL(redirectUrl, request.url))
  } catch (error: any) {
    console.error("Erreur dans le callback KKiaPay:", error)
    return NextResponse.redirect(new URL("/faire-un-don?status=error", request.url))
  }
}

