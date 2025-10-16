const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://uegwnvoaumemwmiaufbp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dudm9hdW1lbXdtaWF1ZmJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjE3OTEwNiwiZXhwIjoyMDY3NzU1MTA2fQ.lBkCSHs8L00Dyltyiqhd-A2frJILmK5uTeT0SB_LQRc'

console.log('Test Supabase...')
console.log('URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  try {
    console.log('Création du client...')
    
    // Test simple
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(5)
    
    if (error) {
      console.error('Erreur:', error.message)
    } else {
      console.log('Succès! Tables:', data?.length || 0)
      console.log('Premières tables:', data?.map(t => t.table_name))
    }
  } catch (err) {
    console.error('Erreur générale:', err.message)
  }
}

test()
