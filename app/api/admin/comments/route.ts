import { NextResponse } from "next/server"

// Placeholder API: à connecter à une table comments ultérieurement
export async function GET() {
  try {
    return NextResponse.json({ success: true, data: [], count: 0 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur" }, { status: 500 })
  }
}


