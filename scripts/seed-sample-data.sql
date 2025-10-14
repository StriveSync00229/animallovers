-- =====================================================
-- DONNÉES D'EXEMPLE POUR ANIMAL LOVERS
-- =====================================================

-- Utilisateurs de test
INSERT INTO users (id, email, first_name, last_name, role, email_verified) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@animallovers.fr', 'Admin', 'AnimalLovers', 'admin', true),
('550e8400-e29b-41d4-a716-446655440002', 'marie.dupont@email.fr', 'Marie', 'Dupont', 'user', true),
('550e8400-e29b-41d4-a716-446655440003', 'jean.martin@email.fr', 'Jean', 'Martin', 'user', true),
('550e8400-e29b-41d4-a716-446655440004', 'sophie.leclerc@email.fr', 'Dr. Sophie', 'Leclerc', 'user', true);

-- Tags d'articles
INSERT INTO article_tags (name, slug, color) VALUES
('dressage', 'dressage', '#3B82F6'),
('santé', 'sante', '#10B981'),
('nutrition', 'nutrition', '#F59E0B'),
('comportement', 'comportement', '#8B5CF6'),
('chiot', 'chiot', '#EC4899'),
('chat', 'chat', '#6366F1'),
('urgence', 'urgence', '#EF4444'),
('naturel', 'naturel', '#059669');

-- Articles d'exemple
INSERT INTO articles (
    id, title, slug, excerpt, content, featured_image, author_id, category_id,
    species, age_range, is_vet_approved, is_published, published_at, reading_time
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440101',
    'Les bases du dressage pour chiot : commandes essentielles',
    'bases-dressage-chiot',
    'Découvrez les techniques fondamentales pour apprendre à votre chiot les commandes de base comme assis, couché et le rappel.',
    'Le dressage d''un chiot est une étape cruciale dans son développement. Voici les commandes essentielles à enseigner dès les premiers mois...',
    'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    '550e8400-e29b-41d4-a716-446655440002',
    (SELECT id FROM article_categories WHERE slug = 'comportement-education'),
    'chien',
    'chiot-chaton',
    true,
    true,
    CURRENT_TIMESTAMP - INTERVAL '7 days',
    8
),
(
    '550e8400-e29b-41d4-a716-446655440102',
    'Alimentation équilibrée pour chats seniors',
    'alimentation-chats-seniors',
    'Guide complet pour adapter l''alimentation de votre chat âgé à ses besoins spécifiques.',
    'Les chats seniors ont des besoins nutritionnels particuliers. Découvrez comment adapter leur alimentation...',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    '550e8400-e29b-41d4-a716-446655440004',
    (SELECT id FROM article_categories WHERE slug = 'alimentation'),
    'chat',
    'senior',
    true,
    true,
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    12
);

-- Relations articles-tags
INSERT INTO article_tag_relations (article_id, tag_id) VALUES
('550e8400-e29b-41d4-a716-446655440101', (SELECT id FROM article_tags WHERE slug = 'dressage')),
('550e8400-e29b-41d4-a716-446655440101', (SELECT id FROM article_tags WHERE slug = 'chiot')),
('550e8400-e29b-41d4-a716-446655440102', (SELECT id FROM article_tags WHERE slug = 'nutrition')),
('550e8400-e29b-41d4-a716-446655440102', (SELECT id FROM article_tags WHERE slug = 'chat'));

-- Produits d'exemple
INSERT INTO products (
    id, name, slug, description, sku, brand_id, category_id,
    price, original_price, stock_quantity, weight, species,
    featured_image, is_featured, is_bestseller, rating_average, review_count
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440201',
    'Royal Canin Adult Medium',
    'royal-canin-adult-medium',
    'Alimentation complète pour chiens adultes de taille moyenne (11-25kg). Formule équilibrée pour maintenir la vitalité.',
    'RC-ADM-15KG',
    (SELECT id FROM product_brands WHERE slug = 'royal-canin'),
    (SELECT id FROM product_categories WHERE slug = 'nourriture-friandises'),
    45.99,
    52.99,
    25,
    15000,
    'chien',
    '/placeholder.svg?height=300&width=300',
    true,
    true,
    4.8,
    234
),
(
    '550e8400-e29b-41d4-a716-446655440202',
    'Whiskas Adult Saumon',
    'whiskas-adult-saumon',
    'Croquettes au saumon pour chats adultes. Riche en protéines et vitamines essentielles.',
    'WH-SAU-7KG',
    (SELECT id FROM product_brands WHERE slug = 'whiskas'),
    (SELECT id FROM product_categories WHERE slug = 'nourriture-friandises'),
    28.99,
    32.99,
    18,
    7000,
    'chat',
    '/placeholder.svg?height=300&width=300',
    false,
    true,
    4.4,
    156
);

-- Campagnes de dons d'exemple
INSERT INTO donation_campaigns (
    id, title, slug, description, story, target_amount, current_amount,
    featured_image, animal_name, animal_type, is_active, is_featured,
    start_date, end_date
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440301',
    'Sauvons Bella',
    'sauvons-bella',
    'Bella, une chienne de 3 ans, a besoin d''une opération urgente pour sa patte blessée.',
    'Bella a été trouvée blessée sur le bord de la route. Elle nécessite une intervention chirurgicale coûteuse pour retrouver l''usage de sa patte arrière. Votre aide peut lui donner une seconde chance.',
    2500.00,
    1850.00,
    '/placeholder.svg?height=200&width=300',
    'Bella',
    'chien',
    true,
    true,
    CURRENT_TIMESTAMP - INTERVAL '10 days',
    CURRENT_TIMESTAMP + INTERVAL '20 days'
),
(
    '550e8400-e29b-41d4-a716-446655440302',
    'Nouveau refuge pour chats',
    'nouveau-refuge-chats',
    'Aidez-nous à construire un nouveau refuge pour accueillir plus de chats abandonnés.',
    'Notre refuge actuel est saturé. Nous avons besoin de fonds pour construire de nouveaux espaces d''accueil pour les chats abandonnés de notre région.',
    15000.00,
    8500.00,
    '/placeholder.svg?height=200&width=300',
    'Collectif',
    'chat',
    true,
    false,
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    CURRENT_TIMESTAMP + INTERVAL '55 days'
);

-- Dons d'exemple
INSERT INTO donations (
    id, campaign_id, donor_email, donor_first_name, amount,
    payment_method, payment_status, message, created_at
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440401',
    '550e8400-e29b-41d4-a716-446655440301',
    'donateur1@email.fr',
    'Pierre',
    50.00,
    'card',
    'completed',
    'Bon courage à Bella !',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    '550e8400-e29b-41d4-a716-446655440402',
    '550e8400-e29b-41d4-a716-446655440301',
    'donateur2@email.fr',
    'Claire',
    100.00,
    'paypal',
    'completed',
    'J''espère que Bella va vite guérir.',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
    '550e8400-e29b-41d4-a716-446655440403',
    '550e8400-e29b-41d4-a716-446655440302',
    'donateur3@email.fr',
    'Marc',
    200.00,
    'card',
    'completed',
    'Pour tous les chats qui ont besoin d''aide.',
    CURRENT_TIMESTAMP - INTERVAL '3 hours'
);

-- Abonnés newsletter
INSERT INTO newsletter_subscribers (email, first_name, status, source, confirmed_at) VALUES
('newsletter1@email.fr', 'Alice', 'active', 'website', CURRENT_TIMESTAMP - INTERVAL '30 days'),
('newsletter2@email.fr', 'Bob', 'active', 'article', CURRENT_TIMESTAMP - INTERVAL '15 days'),
('newsletter3@email.fr', 'Caroline', 'active', 'donation', CURRENT_TIMESTAMP - INTERVAL '7 days');

-- Commentaires d'articles
INSERT INTO article_comments (
    article_id, user_id, content, is_approved, created_at
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440101',
    '550e8400-e29b-41d4-a716-446655440003',
    'Excellent article ! J''ai appliqué ces conseils avec mon chiot et ça marche très bien.',
    true,
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    '550e8400-e29b-41d4-a716-446655440102',
    '550e8400-e29b-41d4-a716-446655440002',
    'Très utile pour mon chat de 12 ans. Merci pour ces conseils !',
    true,
    CURRENT_TIMESTAMP - INTERVAL '1 day'
);

-- Avis produits
INSERT INTO product_reviews (
    product_id, user_id, rating, title, content, is_verified_purchase, is_approved
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440201',
    '550e8400-e29b-41d4-a716-446655440002',
    5,
    'Excellent produit',
    'Mon chien adore ces croquettes et sa santé s''est nettement améliorée depuis qu''il les mange.',
    true,
    true
),
(
    '550e8400-e29b-41d4-a716-446655440202',
    '550e8400-e29b-41d4-a716-446655440003',
    4,
    'Bon rapport qualité-prix',
    'Mes chats aiment bien, même si ce n''est pas leur préféré. Bon rapport qualité-prix.',
    true,
    true
);

-- Statistiques de pages vues (données d'exemple)
INSERT INTO page_views (url, title, user_id, created_at) VALUES
('/', 'Accueil - Animal Lovers', '550e8400-e29b-41d4-a716-446655440002', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
('/dressage-sante', 'Dressage & Santé', '550e8400-e29b-41d4-a716-446655440003', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
('/faire-un-don', 'Faire un don', NULL, CURRENT_TIMESTAMP - INTERVAL '30 minutes'),
('/produits', 'Nos produits', '550e8400-e29b-41d4-a716-446655440002', CURRENT_TIMESTAMP - INTERVAL '15 minutes');

-- Événements analytics
INSERT INTO analytics_events (event_name, event_category, event_data, user_id) VALUES
('donation_completed', 'donation', '{"amount": 50, "campaign": "sauvons-bella"}', '550e8400-e29b-41d4-a716-446655440002'),
('product_view', 'product', '{"product_id": "royal-canin-adult-medium", "category": "nourriture"}', '550e8400-e29b-41d4-a716-446655440003'),
('newsletter_signup', 'engagement', '{"source": "homepage"}', NULL),
('article_share', 'content', '{"article": "bases-dressage-chiot", "platform": "facebook"}', '550e8400-e29b-41d4-a716-446655440002');
