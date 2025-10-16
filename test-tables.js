const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://uegwnvoaumemwmiaufbp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dudm9hdW1lbXdtaWF1ZmJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjE3OTEwNiwiZXhwIjoyMDY3NzU1MTA2fQ.lBkCSHs8L00Dyltyiqhd-A2frJILmK5uTeT0SB_LQRc'

console.log('🚀 Test des tables Supabase')
console.log('URL:', supabaseUrl)

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
