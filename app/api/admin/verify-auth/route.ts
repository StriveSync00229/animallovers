import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Token manquant" },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Enlever "Bearer "

    // Vérifier le token (en production, vérifiez un vrai JWT)
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8')
      const [email, timestamp] = decoded.split(':')
      
      // Vérifier que le token n'est pas trop ancien (24h)
      const tokenAge = Date.now() - parseInt(timestamp)
      const maxAge = 24 * 60 * 60 * 1000 // 24 heures
      
      if (tokenAge > maxAge) {
        return NextResponse.json(
          { success: false, error: "Token expiré" },
          { status: 401 }
        )
      }

      // Vérifier que l'email est valide
      if (email === "admin@animallovers.fr") {
        return NextResponse.json({
          success: true,
          user: {
            email,
            name: "Administrateur",
            role: "admin"
          }
        })
      }

    } catch (decodeError) {
      return NextResponse.json(
        { success: false, error: "Token invalide" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, error: "Token invalide" },
      { status: 401 }
    )

  } catch (error) {
    console.error("Erreur de vérification d'authentification:", error)
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
