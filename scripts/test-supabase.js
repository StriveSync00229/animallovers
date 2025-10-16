#!/usr/bin/env node

/**
 * Script de test direct de la connexion Supabase
 */

const { createClient } = require('@supabase/supabase-js')

// Configuration Supabase
const supabaseUrl = 'https://uegwnvoaumemwmiaufbp.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dudm9hdW1lbXdtaWF1ZmJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjE3OTEwNiwiZXhwIjoyMDY3NzU1MTA2fQ.lBkCSHs8L00Dyltyiqhd-A2frJILmK5uTeT0SB_LQRc'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testConnection() {
  console.log('🔌 Test de connexion à Supabase...')
  console.log('URL:', supabaseUrl)
  console.log('Service Key:', supabaseServiceKey.substring(0, 20) + '...')
  
  try {
    // Test 1: Connexion de base
    console.log('\n1️⃣ Test de connexion de base...')
    
    // Test simple avec une requête qui fonctionne toujours
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1)
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message)
      return false
    }
    
    console.log('✅ Connexion de base réussie')
    
    // Test 2: Vérifier les tables
    console.log('\n2️⃣ Vérification des tables...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (tablesError) {
      console.error('❌ Erreur lors de la récupération des tables:', tablesError.message)
      return false
    }
    
    console.log('✅ Tables trouvées:', tables?.map(t => t.table_name).join(', ') || 'Aucune')
    
    // Test 3: Tester les tables principales
    console.log('\n3️⃣ Test des tables principales...')
    
    // Test articles
    try {
      const { data: articles, error: articlesError } = await supabase
        .from('articles')
        .select('id')
        .limit(1)
      
      if (articlesError) {
        console.log('⚠️  Table articles non accessible:', articlesError.message)
      } else {
        console.log('✅ Table articles accessible')
      }
    } catch (err) {
      console.log('⚠️  Table articles non trouvée ou erreur:', err.message)
    }
    
    // Test categories
    try {
      const { data: categories, error: categoriesError } = await supabase
        .from('article_categories')
        .select('id')
        .limit(1)
      
      if (categoriesError) {
        console.log('⚠️  Table article_categories non accessible:', categoriesError.message)
      } else {
        console.log('✅ Table article_categories accessible')
      }
    } catch (err) {
      console.log('⚠️  Table article_categories non trouvée ou erreur:', err.message)
    }
    
    // Test donations
    try {
      const { data: donations, error: donationsError } = await supabase
        .from('donations')
        .select('id')
        .limit(1)
      
      if (donationsError) {
        console.log('⚠️  Table donations non accessible:', donationsError.message)
      } else {
        console.log('✅ Table donations accessible')
      }
    } catch (err) {
      console.log('⚠️  Table donations non trouvée ou erreur:', err.message)
    }
    
    return true
    
  } catch (err) {
    console.error('❌ Erreur générale:', err.message)
    return false
  }
}

async function main() {
  console.log('🚀 Test de connexion Supabase')
  console.log('============================')
  
  const success = await testConnection()
  
  console.log('\n============================')
  if (success) {
    console.log('🎉 Test de connexion réussi !')
    console.log('\n📝 Prochaines étapes :')
    console.log('1. Les tables peuvent ne pas exister encore')
    console.log('2. Exécutez les scripts SQL pour créer les tables')
    console.log('3. Testez l\'API Next.js')
  } else {
    console.log('❌ Test de connexion échoué')
    console.log('\n🔧 Vérifications à faire :')
    console.log('1. Vérifiez que les clés Supabase sont correctes')
    console.log('2. Vérifiez que l\'URL Supabase est accessible')
    console.log('3. Vérifiez les permissions de la clé service role')
  }
}

// Exécution du script
if (require.main === module) {
  main().catch(console.error)
}
