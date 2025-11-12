import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    console.log("📤 POST /api/admin/upload - Début de l'upload")
    
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || "uploads"
    const type = formData.get("type") as string || "image" // "image" ou "pdf"
    const bucket = formData.get("bucket") as string || "products" // "products", "ebooks", "uploads"

    console.log("📋 Paramètres reçus:", {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      folder,
      type,
      bucket,
    })

    if (!file) {
      console.error("❌ Aucun fichier fourni")
      return NextResponse.json(
        { success: false, error: "Aucun fichier fourni" },
        { status: 400 }
      )
    }

    // Validation du type de fichier
    if (type === "image") {
      const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
      if (!allowedImageTypes.includes(file.type)) {
        console.error("❌ Type de fichier non autorisé:", file.type)
        return NextResponse.json(
          { success: false, error: "Type de fichier image non autorisé. Types autorisés: JPEG, PNG, WebP, GIF" },
          { status: 400 }
        )
      }
    } else if (type === "pdf") {
      if (file.type !== "application/pdf") {
        console.error("❌ Type de fichier PDF invalide:", file.type)
        return NextResponse.json(
          { success: false, error: "Le fichier doit être un PDF" },
          { status: 400 }
        )
      }
    }

    // Validation de la taille (max 10MB pour images, 50MB pour PDF)
    const maxSize = type === "pdf" ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      console.error("❌ Fichier trop volumineux:", file.size, "max:", maxSize)
      return NextResponse.json(
        { success: false, error: `Le fichier est trop volumineux. Taille maximale: ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Vérifier les variables d'environnement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("❌ Variables d'environnement manquantes")
      return NextResponse.json(
        { 
          success: false, 
          error: "Configuration Supabase manquante",
          details: "NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis"
        },
        { status: 500 }
      )
    }

    console.log("🔌 Connexion à Supabase...")
    
    // Créer un client Supabase avec la service role key pour avoir tous les droits
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Vérifier que le bucket existe, sinon essayer avec "ebooks"
    console.log(`🔍 Vérification du bucket "${bucket}"...`)
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error("❌ Erreur lors de la liste des buckets:", listError)
    } else {
      console.log("📦 Buckets disponibles:", buckets?.map(b => b.name) || [])
    }

    // Générer un nom de fichier unique
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`

    const bucketExists = buckets?.some(b => b.name === bucket)
    
    if (!bucketExists) {
      console.warn(`⚠️  Bucket "${bucket}" n'existe pas`)
      
      // Essayer avec "ebooks" comme fallback
      const fallbackBucket = "ebooks"
      const fallbackExists = buckets?.some(b => b.name === fallbackBucket)
      
      if (fallbackExists) {
        console.log(`🔄 Utilisation du bucket de fallback: "${fallbackBucket}"`)
        return await uploadToBucket(supabase, file, folder, type, fallbackBucket, fileName)
      } else {
        console.error(`❌ Aucun bucket disponible (ni "${bucket}", ni "${fallbackBucket}")`)
        return NextResponse.json(
          { 
            success: false, 
            error: `Le bucket "${bucket}" n'existe pas. Veuillez créer le bucket dans Supabase Dashboard.`,
            hint: `Créez le bucket "${bucket}" dans Storage > New bucket > Nom: "${bucket}" > Public: Yes`,
            availableBuckets: buckets?.map(b => b.name) || [],
            instructions: "Voir scripts/README-PRODUCTS-STORAGE.md pour les instructions complètes"
          },
          { status: 500 }
        )
      }
    }

    const filePath = `${folder}/${fileName}`

    console.log(`📁 Chemin du fichier: ${filePath}`)

    // Convertir le fichier en ArrayBuffer puis en Buffer
    console.log("🔄 Conversion du fichier...")
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log(`📤 Upload vers le bucket "${bucket}"...`)
    // Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("❌ Erreur Supabase lors de l'upload:")
      console.error("   Code:", error.statusCode || error.code)
      console.error("   Message:", error.message)
      console.error("   Détails:", error)
      
      // Si le bucket n'existe pas, essayer avec "ebooks" comme fallback
      if ((error.message?.includes("Bucket not found") || error.message?.includes("not found")) && bucket !== "ebooks") {
        console.warn(`🔄 Bucket "${bucket}" non trouvé, tentative avec le bucket "ebooks"`)
        const fallbackBucket = "ebooks"
        return await uploadToBucket(supabase, file, folder, type, fallbackBucket, fileName)
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Erreur lors de l'upload: ${error.message}`,
          code: error.statusCode || error.code,
          details: process.env.NODE_ENV === "development" ? error : undefined
        },
        { status: 500 }
      )
    }

    console.log("✅ Upload réussi:", data?.path)

    // Obtenir l'URL publique du fichier
    const publicUrlResponse = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    // L'URL publique est dans publicUrlResponse.data.publicUrl
    const publicUrl = publicUrlResponse.data.publicUrl
    console.log("🔗 URL publique:", publicUrl)

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        path: filePath,
        fileName: fileName,
        size: file.size,
        type: file.type,
        bucket: bucket,
      },
      message: "Fichier uploadé avec succès",
    })
  } catch (error) {
    console.error("❌ Erreur dans l'API upload:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Une erreur est survenue lors de l'upload",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}

// Fonction helper pour uploader vers un bucket spécifique
async function uploadToBucket(
  supabase: any,
  file: File,
  folder: string,
  type: string,
  bucket: string,
  fileName?: string
) {
  try {
    // Générer un nom de fichier unique si non fourni
    if (!fileName) {
      const fileExt = file.name.split(".").pop()
      fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    }
    const filePath = `${folder}/${fileName}`

    console.log(`📤 Upload vers le bucket "${bucket}" (fallback)...`)
    
    // Convertir le fichier en ArrayBuffer puis en Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error(`❌ Erreur lors de l'upload vers "${bucket}":`, error)
      return NextResponse.json(
        { 
          success: false, 
          error: `Erreur lors de l'upload: ${error.message}`,
          code: error.statusCode || error.code,
          bucket: bucket,
          details: process.env.NODE_ENV === "development" ? error : undefined
        },
        { status: 500 }
      )
    }

    console.log(`✅ Upload réussi vers "${bucket}":`, data?.path)

    // Obtenir l'URL publique du fichier
    const publicUrlResponse = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    const publicUrl = publicUrlResponse.data.publicUrl
    console.log("🔗 URL publique:", publicUrl)

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        path: filePath,
        fileName: fileName,
        size: file.size,
        type: file.type,
        bucket: bucket,
      },
      message: `Fichier uploadé avec succès dans le bucket "${bucket}"`,
      warning: bucket !== "products" ? `Le bucket "products" n'existe pas encore. Le fichier a été uploadé dans "${bucket}" à la place.` : undefined
    })
  } catch (error) {
    console.error(`❌ Erreur dans uploadToBucket pour "${bucket}":`, error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur lors de l'upload",
        bucket: bucket
      },
      { status: 500 }
    )
  }
}

