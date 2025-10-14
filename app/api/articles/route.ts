import { type NextRequest, NextResponse } from "next/server"
import { getArticles, createArticle } from "@/lib/server/article-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      category: searchParams.get("category") || undefined,
      species: searchParams.get("species") || undefined,
      age: searchParams.get("age") || undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : undefined,
    }

    const articles = await getArticles(filters)

    return NextResponse.json({
      success: true,
      data: articles,
      count: articles.length,
    })
  } catch (error) {
    console.error("Error in articles API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const article = await createArticle(body)

    if (!article) {
      return NextResponse.json({ success: false, error: "Failed to create article" }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        data: article,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ success: false, error: "Failed to create article" }, { status: 500 })
  }
}
