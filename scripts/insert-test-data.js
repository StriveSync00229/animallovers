const { createClient } = require('@supabase/supabase-js')

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function insertTestData() {
  try {
    console.log('🚀 Début de l\'insertion des données de test...')

    // 1. Insérer les catégories d'articles
    console.log('📝 Insertion des catégories d\'articles...')
    const { data: categories, error: categoriesError } = await supabase
      .from('article_categories')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Dressage',
          slug: 'dressage',
          description: 'Articles sur le dressage et l\'éducation des animaux',
          color: '#3B82F6',
          icon: 'graduation-cap',
          sort_order: 1,
          is_active: true
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          name: 'Santé',
          slug: 'sante',
          description: 'Articles sur la santé et le bien-être des animaux',
          color: '#10B981',
          icon: 'heart',
          sort_order: 2,
          is_active: true
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          name: 'Nutrition',
          slug: 'nutrition',
          description: 'Articles sur l\'alimentation des animaux',
          color: '#F59E0B',
          icon: 'utensils',
          sort_order: 3,
          is_active: true
        }
      ])
      .select()

    if (categoriesError) {
      console.error('❌ Erreur lors de l\'insertion des catégories:', categoriesError)
      return
    }

    console.log('✅ Catégories insérées:', categories.length)

    // 2. Insérer les articles de test
    console.log('📝 Insertion des articles de test...')
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .upsert([
        {
          id: '770e8400-e29b-41d4-a716-446655440001',
          title: 'Comment dresser un chiot : les bases essentielles',
          slug: 'comment-dresser-un-chiot-bases-essentielles',
          excerpt: 'Découvrez les techniques fondamentales pour éduquer votre chiot et établir une relation harmonieuse dès les premiers mois.',
          content: 'Le dressage d\'un chiot est une étape cruciale qui détermine la qualité de votre relation future. Dans cet article, nous aborderons les techniques de base pour établir des règles claires et cohérentes.\n\n## Les premiers pas\n\nL\'éducation d\'un chiot commence dès son arrivée à la maison. Il est important de :\n\n- Établir des règles claires\n- Être cohérent dans les commandes\n- Récompenser les bons comportements\n- Éviter les punitions physiques\n\n## Les commandes de base\n\n### "Assis"\nLa commande "assis" est généralement la première à enseigner.\n\n### "Reste"\nUne fois que votre chiot maîtrise le "assis", vous pouvez lui apprendre à rester en position.\n\n### "Viens"\nLe rappel est essentiel pour la sécurité de votre animal.',
          category_id: '550e8400-e29b-41d4-a716-446655440001',
          species: 'chien',
          age_range: 'chiot-chaton',
          difficulty_level: 'debutant',
          reading_time: 8,
          is_vet_approved: true,
          is_featured: true,
          is_published: true,
          published_at: new Date().toISOString(),
          view_count: 156,
          seo_title: 'Dressage chiot : Guide complet pour débutants',
          seo_description: 'Apprenez à dresser votre chiot avec nos techniques éprouvées. Guide complet pour une éducation réussie dès les premiers mois.'
        },
        {
          id: '770e8400-e29b-41d4-a716-446655440002',
          title: 'Alimentation du chat senior : besoins spécifiques',
          slug: 'alimentation-chat-senior-besoins-specifiques',
          excerpt: 'Les chats âgés ont des besoins nutritionnels particuliers. Découvrez comment adapter leur alimentation pour maintenir leur santé.',
          content: 'Avec l\'âge, les besoins nutritionnels de nos compagnons félins évoluent. Un chat est considéré comme senior à partir de 7-8 ans, et ses besoins alimentaires changent progressivement.\n\n## Changements liés à l\'âge\n\n### Métabolisme ralenti\nLes chats seniors ont tendance à être moins actifs, ce qui peut conduire à une prise de poids si l\'alimentation n\'est pas adaptée.\n\n### Problèmes dentaires\nLes problèmes dentaires sont fréquents chez les chats âgés, rendant parfois difficile la mastication des croquettes dures.\n\n### Fonction rénale\nLes reins peuvent commencer à moins bien fonctionner, nécessitant une attention particulière à l\'apport en phosphore et protéines.',
          category_id: '550e8400-e29b-41d4-a716-446655440003',
          species: 'chat',
          age_range: 'senior',
          difficulty_level: 'intermediaire',
          reading_time: 6,
          is_vet_approved: true,
          is_featured: false,
          is_published: true,
          published_at: new Date().toISOString(),
          view_count: 89,
          seo_title: 'Alimentation chat senior : Guide nutrition pour chats âgés',
          seo_description: 'Découvrez les besoins nutritionnels spécifiques des chats seniors. Conseils d\'experts pour une alimentation adaptée à l\'âge.'
        },
        {
          id: '770e8400-e29b-41d4-a716-446655440003',
          title: 'Les signes de stress chez le chat : comment les reconnaître',
          slug: 'signes-stress-chat-reconnaitre',
          excerpt: 'Le stress peut affecter gravement la santé de votre chat. Apprenez à identifier les signes avant-coureurs.',
          content: 'Les chats sont des animaux sensibles qui peuvent facilement être stressés par des changements dans leur environnement. Reconnaître les signes de stress est essentiel pour maintenir leur bien-être.\n\n## Signes comportementaux\n\n### Changements dans les habitudes\n- Modification de l\'appétit\n- Changement dans les habitudes de sommeil\n- Comportement de toilettage excessif\n\n### Agressivité\n- Grognements inhabituels\n- Attaques soudaines\n- Refus de contact\n\n## Signes physiques\n\n### Problèmes digestifs\n- Vomissements fréquents\n- Diarrhée\n- Perte d\'appétit\n\n### Problèmes urinaires\n- Mictions fréquentes\n- Sang dans les urines\n- Refus d\'utiliser la litière',
          category_id: '550e8400-e29b-41d4-a716-446655440002',
          species: 'chat',
          age_range: 'tous',
          difficulty_level: 'debutant',
          reading_time: 5,
          is_vet_approved: true,
          is_featured: false,
          is_published: true,
          published_at: new Date().toISOString(),
          view_count: 234,
          seo_title: 'Stress chez le chat : Signes et solutions',
          seo_description: 'Découvrez comment reconnaître et gérer le stress chez votre chat. Guide complet des signes et solutions.'
        }
      ])
      .select()

    if (articlesError) {
      console.error('❌ Erreur lors de l\'insertion des articles:', articlesError)
      return
    }

    console.log('✅ Articles insérés:', articles.length)

    // 3. Vérifier les données insérées
    console.log('🔍 Vérification des données insérées...')
    const { data: allArticles, error: checkError } = await supabase
      .from('articles')
      .select(`
        *,
        category:article_categories(name, slug)
      `)
      .order('created_at', { ascending: false })

    if (checkError) {
      console.error('❌ Erreur lors de la vérification:', checkError)
      return
    }

    console.log('✅ Vérification terminée. Articles dans la base:', allArticles.length)
    console.log('📋 Résumé des articles:')
    allArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} (${article.category?.name || 'Sans catégorie'})`)
    })

    console.log('🎉 Insertion des données de test terminée avec succès!')

  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

// Exécuter le script
insertTestData()
