import { type NextRequest, NextResponse } from "next/server"
import { ArticleService } from "@/lib/server/article-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      category: searchParams.get("category") || undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : undefined,
      publishedOnly: true, // Uniquement les ebooks publiés pour l'API publique
    }

    const ebooks = await ArticleService.getEbooks(filters)

    return NextResponse.json({
      success: true,
      data: ebooks,
      count: ebooks.length,
    })
  } catch (error) {
    console.error("Error in ebooks API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch ebooks" }, { status: 500 })
  }
}

