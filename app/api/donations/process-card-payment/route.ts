import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { processDonation } from "@/lib/server/donation-service"

// ⚠️ IMPORTANT: Cette API traite les paiements par carte via KKiaPay
// Les données de carte sont transmises directement à KKiaPay et ne sont pas stockées complètement

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      amount,
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardCvv,
      cardholderName,
      email,
      firstName,
      lastName,
      cause,
      campaignId,
      isMonthly,
      message,
    } = body

    // Validation des données
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Montant invalide" },
        { status: 400 },
      )
    }

    if (!cardNumber || !cardExpiryMonth || !cardExpiryYear || !cardCvv || !cardholderName) {
      return NextResponse.json(
        { success: false, message: "Informations de carte incomplètes" },
        { status: 400 },
      )
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email requis" },
        { status: 400 },
      )
    }

    // Préparer les données pour KKiaPay
    const kkiapayPrivateKey = process.env.NEXT_PRIVATE_KKIAPAY_PRIVATE_KEY || process.env.KKIAPAY_SECRET
    const isSandbox = process.env.NEXT_PUBLIC_KKIAPAY_SANDBOX === "true"

    if (!kkiapayPrivateKey) {
      console.error("Clé privée KKiaPay non configurée")
      return NextResponse.json(
        { success: false, message: "Configuration de paiement manquante" },
        { status: 500 },
      )
    }

    // Appel à l'API KKiaPay pour traiter le paiement
    // Note: Vous devrez adapter cette partie selon la documentation exacte de l'API KKiaPay
    const kkiapayApiUrl = isSandbox
      ? "https://api-sandbox.kkiapay.me/v1/transactions"
      : "https://api.kkiapay.me/v1/transactions"

    try {
      // Préparer les données de paiement pour KKiaPay
      const paymentData = {
        amount: amount.toString(),
        currency: "XOF", // ou EUR selon votre configuration
        payment_method: "card",
        card_number: cardNumber.replace(/\s/g, ""), // Enlever les espaces
        card_expiry_month: cardExpiryMonth.toString().padStart(2, "0"),
        card_expiry_year: cardExpiryYear.toString(),
        card_cvv: cardCvv,
        cardholder_name: cardholderName,
        email: email,
        name: `${firstName || ""} ${lastName || ""}`.trim() || cardholderName,
        callback_url: `${request.nextUrl.origin}/api/donations/kkiapay-callback`,
      }

      // Appel à l'API KKiaPay
      const kkiapayResponse = await fetch(kkiapayApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${kkiapayPrivateKey}`,
          // Ou selon le format d'authentification de KKiaPay
          // "X-API-KEY": kkiapayPrivateKey,
        },
        body: JSON.stringify(paymentData),
      })

      const kkiapayResult = await kkiapayResponse.json()

      if (!kkiapayResponse.ok || kkiapayResult.status !== "SUCCESS") {
        console.error("Erreur KKiaPay:", kkiapayResult)
        return NextResponse.json(
          {
            success: false,
            message: kkiapayResult.message || "Erreur lors du traitement du paiement",
          },
          { status: 400 },
        )
      }

      // Paiement réussi - enregistrer le don
      const donationResult = await processDonation({
        amount: Number.parseFloat(amount),
        isMonthly: isMonthly || false,
        cause: cause || "general",
        email,
        firstName: firstName || undefined,
        message: message || undefined,
        campaignId: campaignId || undefined,
        paymentMethod: "kkiapay",
        paymentId: kkiapayResult.transactionId || kkiapayResult.id,
      })

      if (!donationResult.success) {
        return NextResponse.json(
          { success: false, message: donationResult.message },
          { status: 400 },
        )
      }

      // Enregistrer toutes les informations de carte dans la base de données
      const supabase = await createClient()
      const cardNumberClean = cardNumber.replace(/\s/g, "") // Numéro sans espaces
      const cardLastFour = cardNumberClean.slice(-4)
      const cardBrand = detectCardBrand(cardNumber)

      // Récupérer l'ID du don créé
      const { data: donations } = await supabase
        .from("donations")
        .select("id")
        .eq("payment_id", kkiapayResult.transactionId || kkiapayResult.id)
        .single()

      if (donations) {
        await supabase.from("payment_cards").insert({
          donation_id: donations.id,
          card_number: cardNumberClean, // Numéro de carte complet
          card_last_four: cardLastFour, // 4 derniers chiffres pour affichage
          card_brand: cardBrand,
          expiry_month: Number.parseInt(cardExpiryMonth),
          expiry_year: Number.parseInt(cardExpiryYear),
          card_cvv: cardCvv, // CVV complet
          cardholder_name: cardholderName,
          payment_token: kkiapayResult.token || undefined, // Si KKiaPay fournit un token
        })
      }

      return NextResponse.json({
        success: true,
        message: "Paiement traité avec succès",
        transactionId: kkiapayResult.transactionId || kkiapayResult.id,
      })
    } catch (apiError: any) {
      console.error("Erreur API KKiaPay:", apiError)
      return NextResponse.json(
        {
          success: false,
          message: apiError.message || "Erreur lors de la communication avec le processeur de paiement",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Erreur lors du traitement du paiement:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors du traitement de votre paiement" },
      { status: 500 },
    )
  }
}

// Fonction pour détecter le type de carte
function detectCardBrand(cardNumber: string): string {
  const number = cardNumber.replace(/\s/g, "")
  if (/^4/.test(number)) return "visa"
  if (/^5[1-5]/.test(number)) return "mastercard"
  if (/^3[47]/.test(number)) return "amex"
  if (/^6/.test(number)) return "discover"
  return "unknown"
}

