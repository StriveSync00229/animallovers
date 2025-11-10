import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || "uploads"
    const type = formData.get("type") as string || "image" // "image" ou "pdf"

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Aucun fichier fourni" },
        { status: 400 }
      )
    }

    // Validation du type de fichier
    if (type === "image") {
      const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
      if (!allowedImageTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: "Type de fichier image non autorisé. Types autorisés: JPEG, PNG, WebP, GIF" },
          { status: 400 }
        )
      }
    } else if (type === "pdf") {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { success: false, error: "Le fichier doit être un PDF" },
          { status: 400 }
        )
      }
    }

    // Validation de la taille (max 10MB pour images, 50MB pour PDF)
    const maxSize = type === "pdf" ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `Le fichier est trop volumineux. Taille maximale: ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    const supabase = await createAdminClient()

    // Générer un nom de fichier unique
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Convertir le fichier en ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from("ebooks") // Nom du bucket (vous devrez créer ce bucket dans Supabase)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("Erreur lors de l'upload:", error)
      return NextResponse.json(
        { success: false, error: `Erreur lors de l'upload: ${error.message}` },
        { status: 500 }
      )
    }

    // Obtenir l'URL publique du fichier
    const publicUrlResponse = supabase.storage
      .from("ebooks")
      .getPublicUrl(filePath)

    // L'URL publique est dans publicUrlResponse.data.publicUrl
    const publicUrl = publicUrlResponse.data.publicUrl

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        path: filePath,
        fileName: fileName,
        size: file.size,
        type: file.type,
      },
      message: "Fichier uploadé avec succès",
    })
  } catch (error) {
    console.error("Erreur dans l'API upload:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de l'upload" },
      { status: 500 }
    )
  }
}

