import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test simple sans Supabase d'abord
    return NextResponse.json({
      success: true,
      message: "API fonctionne correctement",
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur interne du serveur",
      details: error
    }, { status: 500 })
  }
}
