import { NextResponse } from "next/server"

// Placeholder API: à connecter à un provider (Mailchimp, etc.) ou table subscribers
export async function GET() {
  try {
    return NextResponse.json({ success: true, data: [], count: 0 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body?.email) return NextResponse.json({ success: false, error: "email requis" }, { status: 400 })
    // Enregistrer l'email côté provider/DB ici
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur" }, { status: 500 })
  }
}


