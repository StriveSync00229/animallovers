import { NextRequest, NextResponse } from "next/server"

// Comptes d'administration de test
const ADMIN_ACCOUNTS = [
  {
    email: "admin@animallovers.fr",
    password: "admin123",
    name: "Administrateur",
    role: "admin"
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Vérifier les credentials
    const admin = ADMIN_ACCOUNTS.find(
      account => account.email === email && account.password === password
    )

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    // Générer un token simple (en production, utilisez JWT)
    const token = Buffer.from(`${admin.email}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    })

  } catch (error) {
    console.error("Erreur de connexion:", error)
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
