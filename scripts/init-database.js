#!/usr/bin/env node

/**
 * Script d'initialisation de la base de données Supabase
 * Ce script crée les tables nécessaires et insère des données de test
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uegwnvoaumemwmiaufbp.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dudm9hdW1lbXdtaWF1ZmJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjE3OTEwNiwiZXhwIjoyMDY3NzU1MTA2fQ.lBkCSHs8L00Dyltyiqhd-A2frJILmK5uTeT0SB_LQRc'

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes')
  console.error('Assurez-vous que NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont définies')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testConnection() {
  console.log('🔌 Test de connexion à Supabase...')
  
  try {
    // Test simple de connexion
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1)
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message)
      return false
    }
    
    console.log('✅ Connexion à Supabase réussie')
    return true
  } catch (err) {
    console.error('❌ Erreur de connexion:', err.message)
    return false
  }
}

async function createTables() {
  console.log('🏗️  Création des tables...')
  
  try {
    // Lire le script SQL de création des tables
    const sqlPath = path.join(__dirname, 'create-database-schema.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    // Exécuter le script SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent })
    
    if (error) {
      console.error('❌ Erreur lors de la création des tables:', error.message)
      return false
    }
    
    console.log('✅ Tables créées avec succès')
    return true
  } catch (err) {
    console.error('❌ Erreur lors de la création des tables:', err.message)
    return false
  }
}

async function insertSampleData() {
  console.log('📊 Insertion des données d\'exemple...')
  
  try {
    // Lire le script SQL des données d'exemple
    const sqlPath = path.join(__dirname, 'seed-sample-data.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    // Exécuter le script SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent })
    
    if (error) {
      console.error('❌ Erreur lors de l\'insertion des données:', error.message)
      return false
    }
    
    console.log('✅ Données d\'exemple insérées avec succès')
    return true
  } catch (err) {
    console.error('❌ Erreur lors de l\'insertion des données:', err.message)
    return false
  }
}

async function verifyData() {
  console.log('🔍 Vérification des données...')
  
  try {
    // Vérifier les articles
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('id, title')
      .limit(5)
    
    if (articlesError) {
      console.error('❌ Erreur lors de la vérification des articles:', articlesError.message)
      return false
    }
    
    console.log(`✅ ${articles?.length || 0} articles trouvés`)
    
    // Vérifier les catégories
    const { data: categories, error: categoriesError } = await supabase
      .from('article_categories')
      .select('id, name')
      .limit(5)
    
    if (categoriesError) {
      console.error('❌ Erreur lors de la vérification des catégories:', categoriesError.message)
      return false
    }
    
    console.log(`✅ ${categories?.length || 0} catégories trouvées`)
    
    // Vérifier les campagnes
    const { data: campaigns, error: campaignsError } = await supabase
      .from('donation_campaigns')
      .select('id, title')
      .limit(5)
    
    if (campaignsError) {
      console.error('❌ Erreur lors de la vérification des campagnes:', campaignsError.message)
      return false
    }
    
    console.log(`✅ ${campaigns?.length || 0} campagnes trouvées`)
    
    return true
  } catch (err) {
    console.error('❌ Erreur lors de la vérification:', err.message)
    return false
  }
}

async function main() {
  console.log('🚀 Initialisation de la base de données Animal Lovers')
  console.log('====================================================')
  
  // Test de connexion
  const connected = await testConnection()
  if (!connected) {
    process.exit(1)
  }
  
  // Création des tables
  const tablesCreated = await createTables()
  if (!tablesCreated) {
    console.log('⚠️  Les tables existent peut-être déjà. Continuons...')
  }
  
  // Insertion des données d'exemple
  const dataInserted = await insertSampleData()
  if (!dataInserted) {
    console.log('⚠️  Les données existent peut-être déjà. Continuons...')
  }
  
  // Vérification
  const verified = await verifyData()
  if (!verified) {
    console.log('⚠️  Vérification échouée, mais l\'initialisation continue...')
  }
  
  console.log('====================================================')
  console.log('🎉 Initialisation terminée !')
  console.log('')
  console.log('📝 Prochaines étapes :')
  console.log('1. Démarrez votre serveur de développement : npm run dev')
  console.log('2. Testez l\'API : http://localhost:3000/api/test-connection')
  console.log('3. Vérifiez votre interface d\'administration')
}

// Exécution du script
if (require.main === module) {
  main().catch(console.error)
}

module.exports = {
  testConnection,
  createTables,
  insertSampleData,
  verifyData
}
