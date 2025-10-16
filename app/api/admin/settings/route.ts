import { NextResponse } from "next/server"

// Placeholder: selon besoin, stocker en table settings (key,value)
let IN_MEMORY_SETTINGS: Record<string, any> = {
  siteName: "AnimalLovers",
  defaultLocale: "fr-FR",
  theme: "light",
}

export async function GET() {
  return NextResponse.json({ success: true, data: IN_MEMORY_SETTINGS })
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    IN_MEMORY_SETTINGS = { ...IN_MEMORY_SETTINGS, ...body }
    return NextResponse.json({ success: true, data: IN_MEMORY_SETTINGS })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur" }, { status: 500 })
  }
}


