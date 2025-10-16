const http = require('http');

function testAPI() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/test-env',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('✅ Test des variables d\'environnement:');
        console.log(JSON.stringify(response, null, 2));
        
        if (response.env.hasSupabaseUrl && response.env.hasSupabaseAnonKey && response.env.hasServiceRoleKey) {
          console.log('\n🎉 Toutes les variables d\'environnement sont chargées !');
          testSupabaseAPI();
        } else {
          console.log('\n❌ Variables d\'environnement manquantes');
        }
      } catch (err) {
        console.error('❌ Erreur parsing JSON:', err.message);
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ Erreur de connexion:', err.message);
    console.log('💡 Vérifiez que le serveur Next.js est démarré sur le port 3000');
  });

  req.end();
}

function testSupabaseAPI() {
  console.log('\n🔗 Test de l\'API Supabase...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/test-supabase-simple',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        if (response.success) {
          console.log('✅ Connexion Supabase réussie !');
          console.log(`📊 Articles trouvés: ${response.articlesCount}`);
        } else {
          console.log('❌ Erreur Supabase:', response.error);
        }
      } catch (err) {
        console.error('❌ Erreur parsing JSON:', err.message);
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ Erreur de connexion Supabase:', err.message);
  });

  req.end();
}

console.log('🚀 Test des variables d\'environnement et Supabase...');
testAPI();
