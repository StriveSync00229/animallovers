#!/usr/bin/env node

/**
 * Script 100% automatisé pour configurer Supabase Storage
 * 
 * Ce script fait TOUT automatiquement :
 * 1. Crée le bucket "ebooks" via l'API
 * 2. Exécute le SQL pour créer les politiques RLS (si les credentials PostgreSQL sont fournis)
 * 
 * Usage:
 * node scripts/setup-storage-full-auto.js
 * 
 * Variables d'environnement requises:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * 
 * Optionnel (pour exécution SQL automatique):
 * - SUPABASE_DB_HOST (host de la base de données PostgreSQL)
 * - SUPABASE_DB_PORT (port, généralement 5432)
 * - SUPABASE_DB_NAME (nom de la base, généralement 'postgres')
 * - SUPABASE_DB_USER (utilisateur, généralement 'postgres')
 * - SUPABASE_DB_PASSWORD (mot de passe de la base de données)
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Charger les variables d'environnement
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ Fichier .env.local non trouvé')
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
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être dans .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// Fonction pour créer le bucket
async function createBucket() {
  console.log('📦 Création du bucket "ebooks"...')
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets()
    const exists = buckets?.find(b => b.name === 'ebooks')
    
    if (exists) {
      console.log('✅ Bucket "ebooks" existe déjà\n')
      return true
    }

    // Essayer avec l'API REST
    try {
      const response = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({
          name: 'ebooks',
          public: true,
          file_size_limit: 52428800,
          allowed_mime_types: [
            'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
            'application/pdf'
          ]
        })
      })

      if (response.ok) {
        console.log('✅ Bucket créé avec succès\n')
        return true
      }
    } catch (e) {
      // Continuer avec l'API JS
    }

    // Essayer avec l'API JavaScript
    const { error } = await supabase.storage.createBucket('ebooks', {
      public: true,
      fileSizeLimit: 52428800,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
    })

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Bucket "ebooks" existe déjà\n')
        return true
      }
      throw error
    }

    console.log('✅ Bucket créé avec succès\n')
    return true
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    return false
  }
}

// Fonction pour exécuter le SQL via PostgreSQL direct
async function executeSQLDirect(sql) {
  // Vérifier si pg est installé
  let pg
  try {
    pg = require('pg')
  } catch (e) {
    return { success: false, needsInstall: true }
  }

  const dbHost = process.env.SUPABASE_DB_HOST
  const dbPort = process.env.SUPABASE_DB_PORT || '5432'
  const dbName = process.env.SUPABASE_DB_NAME || 'postgres'
  const dbUser = process.env.SUPABASE_DB_USER || 'postgres'
  const dbPassword = process.env.SUPABASE_DB_PASSWORD

  if (!dbHost || !dbPassword) {
    return { success: false, needsCredentials: true }
  }

  const client = new pg.Client({
    host: dbHost,
    port: dbPort,
    database: dbName,
    user: dbUser,
    password: dbPassword,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await client.connect()
    await client.query(sql)
    await client.end()
    return { success: true }
  } catch (error) {
    await client.end().catch(() => {})
    return { success: false, error: error.message }
  }
}

// Fonction pour créer les politiques RLS
async function createPolicies() {
  console.log('🔐 Configuration des politiques RLS...\n')

  const sql = `
-- Activer RLS sur storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique
DROP POLICY IF EXISTS "Allow public read access for ebooks" ON storage.objects;
CREATE POLICY "Allow public read access for ebooks"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'ebooks');

-- Politique 2: Upload authentifié
DROP POLICY IF EXISTS "Allow authenticated users to upload ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload ebooks"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ebooks');

-- Politique 3: Update authentifié
DROP POLICY IF EXISTS "Allow authenticated users to update ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to update ebooks"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'ebooks');

-- Politique 4: Delete authentifié
DROP POLICY IF EXISTS "Allow authenticated users to delete ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete ebooks"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'ebooks');
`

  // Essayer d'exécuter directement
  const result = await executeSQLDirect(sql)
  
  if (result.success) {
    console.log('✅ Politiques RLS créées avec succès\n')
    return true
  }

  if (result.needsInstall) {
    console.log('⚠️  Le package "pg" n\'est pas installé')
    console.log('   Installez-le avec: pnpm add pg\n')
  } else if (result.needsCredentials) {
    console.log('⚠️  Credentials PostgreSQL non fournis')
    console.log('   Ajoutez dans .env.local:')
    console.log('   - SUPABASE_DB_HOST')
    console.log('   - SUPABASE_DB_PASSWORD')
    console.log('   - SUPABASE_DB_USER (optionnel, défaut: postgres)')
    console.log('   - SUPABASE_DB_NAME (optionnel, défaut: postgres)')
    console.log('   - SUPABASE_DB_PORT (optionnel, défaut: 5432)\n')
  } else {
    console.log('⚠️  Erreur lors de l\'exécution SQL:', result.error)
  }

  // Sauvegarder le script SQL
  const sqlFile = path.join(__dirname, 'setup-storage-policies.sql')
  fs.writeFileSync(sqlFile, sql, 'utf8')
  
  console.log('📝 Script SQL sauvegardé:', sqlFile)
  console.log('   Exécutez-le dans Supabase SQL Editor\n')
  console.log('=' .repeat(70))
  console.log(sql)
  console.log('=' .repeat(70))
  console.log()

  return false
}

// Fonction principale
async function main() {
  console.log('🚀 Configuration Supabase Storage\n')
  console.log(`📍 URL: ${supabaseUrl}\n`)

  const bucketOk = await createBucket()
  if (!bucketOk) {
    console.error('❌ Échec création bucket')
    process.exit(1)
  }

  await createPolicies()

  console.log('✅ Configuration terminée!')
}

main().catch(console.error)

