

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

// Fonction pour créer une fonction helper avec SECURITY DEFINER
async function createHelperFunction(pg, client) {
  const helperFunctionSQL = `
CREATE OR REPLACE FUNCTION setup_ebooks_storage_policies()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Activer RLS
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
END;
$$;
`

  try {
    await client.query(helperFunctionSQL)
    await client.query('SELECT setup_ebooks_storage_policies();')
    await client.query('DROP FUNCTION IF EXISTS setup_ebooks_storage_policies();')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Fonction pour exécuter du SQL via PostgreSQL direct (si les credentials sont fournis)
async function executeSQLDirect(sql) {
  // Vérifier si pg est disponible
  let pg
  try {
    pg = require('pg')
  } catch (e) {
    return { success: false, needsInstall: true, error: 'Package pg non installé' }
  }

  // Récupérer les credentials PostgreSQL depuis les variables d'environnement
  // IMPORTANT: Utilisez les credentials du service role pour avoir les permissions nécessaires
  // Ces credentials peuvent être trouvés dans Supabase Dashboard > Settings > Database
  const dbHost = process.env.SUPABASE_DB_HOST || process.env.DATABASE_HOST
  const dbPort = process.env.SUPABASE_DB_PORT || process.env.DATABASE_PORT || '5432'
  const dbName = process.env.SUPABASE_DB_NAME || process.env.DATABASE_NAME || 'postgres'
  const dbUser = process.env.SUPABASE_DB_USER || process.env.DATABASE_USER || 'postgres'
  const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.env.DATABASE_PASSWORD

  if (!dbHost || !dbPassword) {
    return { success: false, needsCredentials: true }
  }

  const client = new pg.Client({
    host: dbHost,
    port: parseInt(dbPort),
    database: dbName,
    user: dbUser,
    password: dbPassword,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await client.connect()
    console.log('   ✅ Connexion PostgreSQL établie')
    
    // Utiliser une fonction helper avec SECURITY DEFINER pour avoir les permissions
    const result = await createHelperFunction(pg, client)
    
    await client.end()
    return result
  } catch (error) {
    try {
      await client.end()
    } catch (e) {
      // Ignorer les erreurs de fermeture
    }
    return { success: false, error: error.message }
  }
}

// Fonction pour créer le bucket
async function createBucket() {
  console.log('📦 Création du bucket "ebooks"...')
  
  try {
    // Vérifier si le bucket existe déjà
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('❌ Erreur lors de la récupération des buckets:', listError.message)
      throw listError
    }

    const ebooksBucket = buckets.find(b => b.name === 'ebooks')

    if (ebooksBucket) {
      console.log('✅ Le bucket "ebooks" existe déjà')
      console.log(`   - Public: ${ebooksBucket.public ? 'Oui' : 'Non'}`)
      console.log(`   - Taille max: ${ebooksBucket.file_size_limit ? (ebooksBucket.file_size_limit / 1024 / 1024) + ' MB' : 'Illimitée'}\n`)
      return true
    }

    // Créer le bucket via l'API REST
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
          file_size_limit: 52428800, // 50 MB
          allowed_mime_types: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'image/gif',
            'application/pdf'
          ]
        })
      })

      if (response.ok) {
        console.log('✅ Bucket "ebooks" créé avec succès')
        console.log('   - Public: Oui')
        console.log('   - Taille max: 50 MB')
        console.log('   - Types autorisés: JPEG, PNG, WebP, GIF, PDF\n')
        return true
      }

      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      if (error.message && error.message.includes('already exists')) {
        console.log('✅ Le bucket "ebooks" existe déjà (créé entre-temps)\n')
        return true
      }
    } catch (fetchError) {
      // Continuer avec l'API JavaScript
    }

    // Essayer avec l'API JavaScript
    const { data, error: jsError } = await supabase.storage.createBucket('ebooks', {
      public: true,
      fileSizeLimit: 52428800,
      allowedMimeTypes: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf'
      ]
    })

    if (jsError) {
      if (jsError.message.includes('already exists')) {
        console.log('✅ Le bucket "ebooks" existe déjà\n')
        return true
      }
      throw jsError
    }

    console.log('✅ Bucket "ebooks" créé avec succès (via API JS)')
    console.log('   - Public: Oui')
    console.log('   - Taille max: 50 MB\n')
    return true

  } catch (error) {
    console.error('❌ Erreur lors de la création du bucket:', error.message)
    return false
  }
}

// Fonction pour créer les politiques RLS
async function createPolicies() {
  console.log('🔐 Configuration des politiques RLS...\n')

  // Script SQL direct (nécessite les credentials du service role)
  const sqlScript = `-- Activer RLS sur storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- POLITIQUE 1: Lecture publique
DROP POLICY IF EXISTS "Allow public read access for ebooks" ON storage.objects;
CREATE POLICY "Allow public read access for ebooks"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ebooks');

-- POLITIQUE 2: Upload pour les utilisateurs authentifiés
DROP POLICY IF EXISTS "Allow authenticated users to upload ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload ebooks"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ebooks');

-- POLITIQUE 3: Mise à jour pour les utilisateurs authentifiés
DROP POLICY IF EXISTS "Allow authenticated users to update ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to update ebooks"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ebooks');

-- POLITIQUE 4: Suppression pour les utilisateurs authentifiés
DROP POLICY IF EXISTS "Allow authenticated users to delete ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete ebooks"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'ebooks');
`

  // Essayer d'exécuter le SQL directement si les credentials PostgreSQL sont fournis
  console.log('🔄 Tentative d\'exécution automatique du SQL...\n')
  
  const sqlResult = await executeSQLDirect(sqlScript)
  
  if (sqlResult.success) {
    console.log('✅ Politiques RLS créées automatiquement avec succès!\n')
    return true
  }

  // Si l'exécution automatique échoue, sauvegarder le script SQL
  const sqlFilePath = path.join(__dirname, 'setup-storage-policies.sql')
  
  // Ajouter les en-têtes au script SQL
  const fullSQLScript = `-- =====================================================
-- CONFIGURATION DES POLITIQUES RLS POUR LE BUCKET EBOOKS
-- =====================================================
-- 
-- Ce script configure les politiques RLS pour permettre:
-- - Lecture publique des fichiers
-- - Upload/Update/Delete pour les utilisateurs authentifiés
--
-- Exécutez ce script dans Supabase SQL Editor
--
-- =====================================================

${sqlScript}
-- =====================================================
-- VÉRIFICATION
-- =====================================================
-- 
-- Pour vérifier que les politiques sont créées, exécutez:
-- SELECT * FROM pg_policies 
-- WHERE tablename = 'objects' 
-- AND schemaname = 'storage'
-- AND policyname LIKE '%ebooks%';
--
-- Vous devriez voir 4 politiques créées
--
-- =====================================================
`
  
  fs.writeFileSync(sqlFilePath, fullSQLScript, 'utf8')
  
  console.log('⚠️  IMPORTANT: Les politiques RLS pour storage.objects ne peuvent pas être créées')
  console.log('   directement via SQL à cause des limitations de permissions dans Supabase.\n')
  
  if (sqlResult.needsInstall) {
    console.log('⚠️  Le package "pg" n\'est pas installé')
    console.log('   Même avec pg installé, les politiques doivent être créées via l\'interface web.\n')
  } else if (sqlResult.needsCredentials) {
    console.log('⚠️  Credentials PostgreSQL non fournis')
    console.log('   Même avec les credentials, les politiques doivent être créées via l\'interface web.\n')
  } else if (sqlResult.error && sqlResult.error.includes('must be owner')) {
    console.log('❌ Erreur de permissions: ' + sqlResult.error)
    console.log('   Cette erreur confirme que les politiques doivent être créées via l\'interface web.\n')
  } else if (sqlResult.error) {
    console.log(`⚠️  Erreur: ${sqlResult.error}\n`)
  }
  
  console.log('📝 SOLUTION: Créez les politiques via l\'interface Supabase Storage')
  console.log('   1. Allez dans Supabase Dashboard > Storage > Policies')
  console.log('   2. Sélectionnez le bucket "ebooks"')
  console.log('   3. Cliquez sur "New Policy" et créez les 4 politiques suivantes:\n')
  console.log('   📋 Politique 1: Allow public read access for ebooks')
  console.log('      - Operation: SELECT')
  console.log('      - Roles: public')
  console.log('      - USING: bucket_id = \'ebooks\'\n')
  console.log('   📋 Politique 2: Allow authenticated users to upload ebooks')
  console.log('      - Operation: INSERT')
  console.log('      - Roles: authenticated')
  console.log('      - WITH CHECK: bucket_id = \'ebooks\'\n')
  console.log('   📋 Politique 3: Allow authenticated users to update ebooks')
  console.log('      - Operation: UPDATE')
  console.log('      - Roles: authenticated')
  console.log('      - USING: bucket_id = \'ebooks\'\n')
  console.log('   📋 Politique 4: Allow authenticated users to delete ebooks')
  console.log('      - Operation: DELETE')
  console.log('      - Roles: authenticated')
  console.log('      - USING: bucket_id = \'ebooks\'\n')
  console.log('📖 Pour plus de détails, consultez: scripts/CREATE-POLICIES-MANUALLY.md\n')

  return false
}

// Fonction principale
async function setupStorage() {
  console.log('🚀 Démarrage de la configuration de Supabase Storage...\n')
  console.log(`📍 URL Supabase: ${supabaseUrl}\n`)

  try {
    // Étape 1: Créer le bucket
    const bucketCreated = await createBucket()
    
    if (!bucketCreated) {
      console.error('❌ Impossible de créer le bucket')
      process.exit(1)
    }

    // Étape 2: Configurer les politiques RLS
    const policiesCreated = await createPolicies()

    // Étape 3: Vérifier la configuration
    console.log('🔍 Vérification de la configuration...')
    
    const { data: testList, error: testError } = await supabase.storage
      .from('ebooks')
      .list('', { limit: 1 })

    if (testError) {
      if (policiesCreated) {
        console.log(`⚠️  Erreur lors de l'accès au bucket: ${testError.message}`)
        console.log('   Vérifiez que le bucket est bien public\n')
      } else {
        console.log(`⚠️  Erreur lors de l'accès au bucket: ${testError.message}`)
        console.log('   Cela peut être normal si les politiques RLS ne sont pas encore configurées\n')
      }
    } else {
      console.log('✅ Le bucket est accessible\n')
    }

    if (policiesCreated) {
      console.log('✅ Configuration terminée! Tout est prêt.\n')
      console.log('🎉 Vous pouvez maintenant uploader des fichiers depuis le dashboard admin\n')
    } else {
      console.log('✅ Bucket créé!')
      console.log('\n📝 Prochaines étapes:')
      console.log('   1. Ouvrez Supabase SQL Editor')
      console.log('   2. Exécutez le script SQL dans: scripts/setup-storage-policies.sql')
      console.log('   3. Vérifiez que les politiques sont créées')
      console.log('   4. Testez l\'upload depuis le dashboard admin\n')
    }

  } catch (error) {
    console.error('\n❌ Erreur lors de la configuration:', error.message)
    console.error(error)
    process.exit(1)
  }
}

// Exécuter le script
setupStorage()
