// Node.js 18+ a fetch intégré nativement, pas besoin de node-fetch

async function testAPI() {
  console.log('🧪 Test de l\'API Next.js')
  console.log('========================')
  
  try {
    console.log('1️⃣ Test endpoint simple...')
    const response = await fetch('http://localhost:3000/api/test-simple')
    const data = await response.json()
    
    console.log('✅ Endpoint simple:', data.message)
    console.log('📊 Variables d\'environnement:', data.environment)
    
    console.log('\n2️⃣ Test endpoint Supabase...')
    const supabaseResponse = await fetch('http://localhost:3000/api/test-connection')
    const supabaseData = await supabaseResponse.json()
    
    if (supabaseData.success) {
      console.log('✅ Endpoint Supabase:', supabaseData.message)
      console.log('📊 Données:', supabaseData.data)
    } else {
      console.log('❌ Endpoint Supabase:', supabaseData.error)
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test API:', error.message)
    console.log('\n💡 Vérifiez que le serveur Next.js est démarré:')
    console.log('   pnpm dev')
  }
}

testAPI()
