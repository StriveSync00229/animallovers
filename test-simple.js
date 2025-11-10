const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Charger les variables d'environnement depuis .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local')
  
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        process.env[key] = value
      }
    })
  }
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement manquantes!')
  console.error('Assurez-vous que NEXT_PUBLIC_SUPABASE_URL est défini dans .env.local')
  console.error('Et que SUPABASE_SERVICE_ROLE_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY est défini')
  process.exit(1)
}

console.log('🚀 Test Supabase...')
console.log('URL:', supabaseUrl)
console.log('Clé:', supabaseKey.substring(0, 20) + '...')

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  try {
    console.log('\n📡 Test de connexion...')
    
    // Test simple avec une table réelle (articles)
    const { data, error } = await supabase
      .from('articles')
      .select('id, title')
      .limit(5)
    
    if (error) {
      console.error('❌ Erreur:', error.message)
      console.error('Détails:', error)
      
      // Si la table n'existe pas, tester une autre table
      console.log('\n🔄 Test avec une autre table...')
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id')
        .limit(1)
      
      if (usersError) {
        console.error('❌ Erreur avec users:', usersError.message)
      } else {
        console.log('✅ Connexion réussie! Table users accessible')
      }
    } else {
      console.log('✅ Connexion réussie!')
      console.log(`📊 Articles trouvés: ${data?.length || 0}`)
      if (data && data.length > 0) {
        console.log('Premiers articles:')
        data.forEach(article => {
          console.log(`  - ${article.title || article.id}`)
        })
      }
    }
  } catch (err) {
    console.error('❌ Erreur générale:', err.message)
    if (err.cause) {
      console.error('Cause:', err.cause)
    }
    console.error('\n💡 Vérifiez:')
    console.error('  1. Que le fichier .env.local existe')
    console.error('  2. Que les variables NEXT_PUBLIC_SUPABASE_URL sont correctes')
    console.error('  3. Votre connexion internet')
  }
}

test()
