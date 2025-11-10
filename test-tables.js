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

console.log('🚀 Test des tables Supabase')
console.log('URL:', supabaseUrl)
console.log('Clé:', supabaseKey.substring(0, 20) + '...')

const supabase = createClient(supabaseUrl, supabaseKey)

async function testTable(tableName) {
  try {
    console.log(`\n📋 Test de la table: ${tableName}`)
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
    
    if (error) {
      console.log(`❌ ${tableName}: ${error.message}`)
      return false
    } else {
      console.log(`✅ ${tableName}: OK (${data?.length || 0} lignes)`)
      return true
    }
  } catch (err) {
    console.log(`❌ ${tableName}: ${err.message}`)
    return false
  }
}

async function main() {
  const tables = [
    'users',
    'articles', 
    'article_categories',
    'donations',
    'donation_campaigns',
    'products'
  ]
  
  let successCount = 0
  
  for (const table of tables) {
    const success = await testTable(table)
    if (success) successCount++
  }
  
  console.log(`\n📊 Résultat: ${successCount}/${tables.length} tables accessibles`)
  
  if (successCount === 0) {
    console.log('\n💡 Les tables n\'existent pas encore. Créons-les !')
    console.log('Exécutez les scripts SQL pour créer le schéma.')
  } else {
    console.log('\n🎉 Connexion Supabase fonctionnelle !')
  }
}

main().catch(console.error)
