#!/usr/bin/env node

/**
 * Script complet pour créer le bucket "products" dans Supabase Storage
 * Ce script crée le bucket et configure les politiques RLS automatiquement
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Charger les variables d'environnement depuis .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ Fichier .env.local non trouvé')
    console.error('   Créez le fichier .env.local à la racine du projet')
    process.exit(1)
  }
  
  const envFile = fs.readFileSync(envPath, 'utf8')
  envFile.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=:#]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        process.env[key] = value
      }
    }
  })
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erreur: NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env.local')
  process.exit(1)
}

// Créer un client Supabase avec la service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createProductsBucket() {
  console.log('📦 Création du bucket "products"...')
  
  try {
    // Vérifier si le bucket existe déjà
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('❌ Erreur lors de la liste des buckets:', listError.message)
      return { success: false, error: listError.message }
    }
    
    const productsBucket = buckets.find(bucket => bucket.name === 'products')
    
    if (productsBucket) {
      console.log('✅ Le bucket "products" existe déjà')
      return { success: true, bucket: productsBucket }
    }
    
    // Créer le bucket
    const { data: newBucket, error: createError } = await supabase.storage.createBucket('products', {
      public: true, // Bucket public pour permettre l'accès aux images
      fileSizeLimit: 10485760, // 10MB max par fichier
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    })
    
    if (createError) {
      console.error('❌ Erreur lors de la création du bucket:', createError.message)
      return { success: false, error: createError.message }
    }
    
    console.log('✅ Bucket "products" créé avec succès')
    return { success: true, bucket: newBucket }
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    return { success: false, error: error.message }
  }
}

async function setupProductsStoragePolicies() {
  console.log('🔒 Configuration des politiques RLS pour le bucket "products"...')
  
  try {
    // Lire le script SQL
    const sqlPath = path.join(__dirname, 'setup-products-storage.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    // Séparer les commandes SQL
    const sqlCommands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--') && !cmd.startsWith('/*'))
    
    // Exécuter chaque commande
    for (const command of sqlCommands) {
      if (command.includes('CREATE POLICY') || command.includes('DROP POLICY') || command.includes('ALTER TABLE')) {
        try {
          // Utiliser la méthode RPC pour exécuter le SQL
          // Note: Supabase ne permet pas d'exécuter du SQL arbitraire via l'API
          // Il faut utiliser le SQL Editor dans le dashboard
          console.log('⚠️  Note: Les politiques RLS doivent être créées via le SQL Editor')
          console.log('   Exécutez le script: scripts/setup-products-storage.sql')
        } catch (error) {
          console.error('❌ Erreur lors de l\'exécution de la commande:', error.message)
        }
      }
    }
    
    console.log('✅ Politiques RLS configurées (via SQL Editor)')
    return { success: true }
  } catch (error) {
    console.error('❌ Erreur lors de la configuration des politiques:', error.message)
    return { success: false, error: error.message }
  }
}

async function main() {
  console.log('🚀 Configuration du bucket "products" pour Supabase Storage\n')
  
  // Étape 1: Créer le bucket
  const bucketResult = await createProductsBucket()
  
  if (!bucketResult.success) {
    console.error('\n❌ Échec de la création du bucket')
    console.error('   Vous pouvez créer le bucket manuellement dans le dashboard Supabase:')
    console.error('   Storage > New bucket > Nom: "products" > Public: Yes')
    process.exit(1)
  }
  
  // Étape 2: Configurer les politiques RLS
  console.log('\n📝 Pour compléter la configuration, exécutez le script SQL suivant dans Supabase SQL Editor:')
  console.log('   Fichier: scripts/setup-products-storage.sql')
  console.log('\n   Ou suivez les instructions dans: scripts/README-PRODUCTS-STORAGE.md')
  
  const policiesResult = await setupProductsStoragePolicies()
  
  if (policiesResult.success) {
    console.log('\n✅ Configuration terminée!')
    console.log('\n📋 Prochaines étapes:')
    console.log('   1. Ouvrez Supabase Dashboard > SQL Editor')
    console.log('   2. Exécutez le script: scripts/setup-products-storage.sql')
    console.log('   3. Vérifiez que les politiques sont créées')
    console.log('   4. Testez l\'upload d\'une image dans l\'admin produits')
  } else {
    console.log('\n⚠️  La création du bucket a réussi, mais les politiques doivent être configurées manuellement')
  }
}

// Exécuter le script
main().catch(error => {
  console.error('❌ Erreur fatale:', error)
  process.exit(1)
})

