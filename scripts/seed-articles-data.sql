-- Insertion de données de test pour les articles

-- Insertion des catégories d'articles
INSERT INTO public.article_categories (id, name, slug, description, color, icon, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Dressage', 'dressage', 'Articles sur le dressage et l''éducation des animaux', '#3B82F6', 'graduation-cap', 1),
('550e8400-e29b-41d4-a716-446655440002', 'Santé', 'sante', 'Articles sur la santé et le bien-être des animaux', '#10B981', 'heart', 2),
('550e8400-e29b-41d4-a716-446655440003', 'Nutrition', 'nutrition', 'Articles sur l''alimentation des animaux', '#F59E0B', 'utensils', 3),
('550e8400-e29b-41d4-a716-446655440004', 'Comportement', 'comportement', 'Articles sur le comportement animal', '#8B5CF6', 'brain', 4),
('550e8400-e29b-41d4-a716-446655440005', 'Soins', 'soins', 'Articles sur les soins quotidiens', '#EF4444', 'scissors', 5)
ON CONFLICT (id) DO NOTHING;

-- Insertion des tags d'articles
INSERT INTO public.article_tags (id, name, slug, color) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Chiot', 'chiot', '#3B82F6'),
('660e8400-e29b-41d4-a716-446655440002', 'Chaton', 'chaton', '#10B981'),
('660e8400-e29b-41d4-a716-446655440003', 'Débutant', 'debutant', '#F59E0B'),
('660e8400-e29b-41d4-a716-446655440004', 'Avancé', 'avance', '#EF4444'),
('660e8400-e29b-41d4-a716-446655440005', 'Urgence', 'urgence', '#DC2626'),
('660e8400-e29b-41d4-a716-446655440006', 'Prévention', 'prevention', '#059669'),
('660e8400-e29b-41d4-a716-446655440007', 'DIY', 'diy', '#7C3AED'),
('660e8400-e29b-41d4-a716-446655440008', 'Vétérinaire', 'veterinaire', '#0891B2')
ON CONFLICT (id) DO NOTHING;

-- Insertion d'articles de test
INSERT INTO public.articles (
  id, title, slug, excerpt, content, 
  category_id, species, age_range, difficulty_level, 
  reading_time, is_vet_approved, is_featured, is_published, 
  published_at, view_count, seo_title, seo_description
) VALUES
(
  '770e8400-e29b-41d4-a716-446655440001',
  'Comment dresser un chiot : les bases essentielles',
  'comment-dresser-un-chiot-bases-essentielles',
  'Découvrez les techniques fondamentales pour éduquer votre chiot et établir une relation harmonieuse dès les premiers mois.',
  'Le dressage d''un chiot est une étape cruciale qui détermine la qualité de votre relation future. Dans cet article, nous aborderons les techniques de base pour établir des règles claires et cohérentes.

## Les premiers pas

L''éducation d''un chiot commence dès son arrivée à la maison. Il est important de :

- Établir des règles claires
- Être cohérent dans les commandes
- Récompenser les bons comportements
- Éviter les punitions physiques

## Les commandes de base

### "Assis"
La commande "assis" est généralement la première à enseigner. Tenez une friandise au-dessus de la tête du chiot et déplacez-la lentement vers l''arrière.

### "Reste"
Une fois que votre chiot maîtrise le "assis", vous pouvez lui apprendre à rester en position.

### "Viens"
Le rappel est essentiel pour la sécurité de votre animal.

## Conseils pratiques

- Gardez les séances courtes (5-10 minutes)
- Pratiquez plusieurs fois par jour
- Soyez patient et positif
- Adaptez votre approche à la personnalité de votre chiot

L''éducation d''un chiot demande du temps et de la patience, mais les résultats en valent la peine !',
  '550e8400-e29b-41d4-a716-446655440001',
  'chien',
  'chiot-chaton',
  'debutant',
  8,
  true,
  true,
  true,
  CURRENT_TIMESTAMP,
  156,
  'Dressage chiot : Guide complet pour débutants',
  'Apprenez à dresser votre chiot avec nos techniques éprouvées. Guide complet pour une éducation réussie dès les premiers mois.'
),
(
  '770e8400-e29b-41d4-a716-446655440002',
  'Alimentation du chat senior : besoins spécifiques',
  'alimentation-chat-senior-besoins-specifiques',
  'Les chats âgés ont des besoins nutritionnels particuliers. Découvrez comment adapter leur alimentation pour maintenir leur santé.',
  'Avec l''âge, les besoins nutritionnels de nos compagnons félins évoluent. Un chat est considéré comme senior à partir de 7-8 ans, et ses besoins alimentaires changent progressivement.

## Changements liés à l''âge

### Métabolisme ralenti
Les chats seniors ont tendance à être moins actifs, ce qui peut conduire à une prise de poids si l''alimentation n''est pas adaptée.

### Problèmes dentaires
Les problèmes dentaires sont fréquents chez les chats âgés, rendant parfois difficile la mastication des croquettes dures.

### Fonction rénale
Les reins peuvent commencer à moins bien fonctionner, nécessitant une attention particulière à l''apport en phosphore et protéines.

## Recommandations nutritionnelles

### Protéines de qualité
Contrairement aux idées reçues, les chats seniors ont besoin de protéines de haute qualité pour maintenir leur masse musculaire.

### Contrôle des calories
Réduisez légèrement l''apport calorique si votre chat devient moins actif.

### Hydratation
Encouragez la consommation d''eau avec de la nourriture humide.

### Suppléments
Certains suppléments peuvent être bénéfiques :
- Oméga-3 pour les articulations
- Antioxydants pour le système immunitaire
- Probiotiques pour la digestion

## Transition alimentaire

Changez progressivement l''alimentation sur 7-10 jours pour éviter les troubles digestifs.

Consultez toujours votre vétérinaire avant de modifier l''alimentation de votre chat senior.',
  '550e8400-e29b-41d4-a716-446655440003',
  'chat',
  'senior',
  'intermediaire',
  6,
  true,
  false,
  true,
  CURRENT_TIMESTAMP,
  89,
  'Alimentation chat senior : Guide nutrition pour chats âgés',
  'Découvrez les besoins nutritionnels spécifiques des chats seniors. Conseils d''experts pour une alimentation adaptée à l''âge.'
)
ON CONFLICT (id) DO NOTHING;

-- Insertion des relations articles-tags
INSERT INTO public.article_tag_relations (article_id, tag_id) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'), -- Chiot
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003'), -- Débutant
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440006'), -- Prévention
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440008')  -- Vétérinaire
ON CONFLICT (article_id, tag_id) DO NOTHING;
