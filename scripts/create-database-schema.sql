-- =====================================================
-- SCHÉMA COMPLET POUR ANIMAL LOVERS
-- Base de données PostgreSQL
-- =====================================================

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE DES UTILISATEURS
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLES POUR LES ARTICLES DE BLOG
-- =====================================================

-- Catégories d'articles
CREATE TABLE article_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Code couleur hex
    icon VARCHAR(50),
    parent_id UUID REFERENCES article_categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tags pour les articles
CREATE TABLE article_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(7),
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Articles de blog
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    gallery_images TEXT[], -- Array d'URLs d'images
    author_id UUID REFERENCES users(id),
    category_id UUID REFERENCES article_categories(id),
    subcategory_id UUID REFERENCES article_categories(id),
    species VARCHAR(20) CHECK (species IN ('chien', 'chat', 'les-deux', 'autre')),
    age_range VARCHAR(20) CHECK (age_range IN ('chiot-chaton', 'adulte', 'senior', 'tous')),
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('debutant', 'intermediaire', 'avance')),
    reading_time INTEGER, -- en minutes
    is_vet_approved BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison articles-tags
CREATE TABLE article_tag_relations (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES article_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- Commentaires sur les articles
CREATE TABLE article_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    parent_id UUID REFERENCES article_comments(id), -- Pour les réponses
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLES POUR LES PRODUITS
-- =====================================================

-- Catégories de produits
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    image_url TEXT,
    parent_id UUID REFERENCES product_categories(id),
    species VARCHAR(20) CHECK (species IN ('chien', 'chat', 'mixte')),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Marques de produits
CREATE TABLE product_brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Produits
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(50),
    brand_id UUID REFERENCES product_brands(id),
    category_id UUID REFERENCES product_categories(id),
    subcategory_id UUID REFERENCES product_categories(id),
    
    -- Prix et stock
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 5,
    is_in_stock BOOLEAN DEFAULT true,
    is_unlimited_stock BOOLEAN DEFAULT false,
    
    -- Caractéristiques
    weight DECIMAL(8,2), -- en grammes
    dimensions JSONB, -- {length, width, height}
    color VARCHAR(50),
    size VARCHAR(50),
    material VARCHAR(100),
    age_range VARCHAR(50),
    species VARCHAR(20) CHECK (species IN ('chien', 'chat', 'mixte')),
    
    -- Images et médias
    featured_image TEXT,
    gallery_images TEXT[],
    video_url TEXT,
    
    -- Statuts et flags
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_on_sale BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_digital BOOLEAN DEFAULT false,
    
    -- Évaluations
    rating_average DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    
    -- SEO
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    
    -- Métadonnées
    view_count INTEGER DEFAULT 0,
    purchase_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Caractéristiques de produits (flexible)
CREATE TABLE product_attributes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'number', 'boolean', 'list')),
    is_filterable BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- Variantes de produits (tailles, couleurs, etc.)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    attributes JSONB, -- {color: "rouge", size: "M"}
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Avis sur les produits
CREATE TABLE product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    variant_id UUID REFERENCES product_variants(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    pros TEXT[],
    cons TEXT[],
    images TEXT[],
    is_verified_purchase BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLES POUR LES DONS ET CAMPAGNES
-- =====================================================

-- Causes de dons
CREATE TABLE donation_causes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Campagnes de collecte
CREATE TABLE donation_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    story TEXT,
    short_description TEXT,
    
    -- Objectifs financiers
    target_amount DECIMAL(10,2) NOT NULL,
    current_amount DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'EUR',
    
    -- Dates
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE,
    
    -- Médias
    featured_image TEXT,
    gallery_images TEXT[],
    video_url TEXT,
    
    -- Animal concerné
    animal_name VARCHAR(100),
    animal_type VARCHAR(20) CHECK (animal_type IN ('chien', 'chat', 'autre')),
    animal_age INTEGER,
    animal_breed VARCHAR(100),
    animal_story TEXT,
    animal_images TEXT[],
    
    -- Statuts
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_urgent BOOLEAN DEFAULT false,
    is_completed BOOLEAN DEFAULT false,
    
    -- Métadonnées
    view_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    donor_count INTEGER DEFAULT 0,
    
    -- SEO
    seo_title VARCHAR(255),
    seo_description TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dons individuels
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES donation_campaigns(id),
    cause_id UUID REFERENCES donation_causes(id),
    user_id UUID REFERENCES users(id),
    
    -- Informations du donateur
    donor_email VARCHAR(255),
    donor_first_name VARCHAR(100),
    donor_last_name VARCHAR(100),
    donor_phone VARCHAR(20),
    is_anonymous BOOLEAN DEFAULT false,
    
    -- Montant et récurrence
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    is_monthly BOOLEAN DEFAULT false,
    monthly_day INTEGER, -- Jour du mois pour les dons récurrents
    
    -- Paiement
    payment_method VARCHAR(20) CHECK (payment_method IN ('card', 'paypal', 'bank_transfer', 'check')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
    payment_id VARCHAR(255), -- ID de transaction externe
    payment_fee DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(10,2),
    
    -- Message et dédicace
    message TEXT,
    dedication_name VARCHAR(255),
    dedication_message TEXT,
    
    -- Reçu fiscal
    tax_receipt_requested BOOLEAN DEFAULT false,
    tax_receipt_sent BOOLEAN DEFAULT false,
    tax_receipt_number VARCHAR(50),
    
    -- Métadonnées
    ip_address INET,
    user_agent TEXT,
    referrer_url TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Abonnements de dons récurrents
CREATE TABLE donation_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donation_id UUID REFERENCES donations(id),
    user_id UUID REFERENCES users(id),
    campaign_id UUID REFERENCES donation_campaigns(id),
    
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    frequency VARCHAR(20) DEFAULT 'monthly' CHECK (frequency IN ('weekly', 'monthly', 'quarterly', 'yearly')),
    
    -- Statut de l'abonnement
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
    next_payment_date TIMESTAMP WITH TIME ZONE,
    last_payment_date TIMESTAMP WITH TIME ZONE,
    
    -- Paiement
    payment_method VARCHAR(20),
    payment_token VARCHAR(255), -- Token pour les paiements récurrents
    
    -- Compteurs
    total_payments INTEGER DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,
    failed_payments INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- TABLES POUR LA NEWSLETTER ET COMMUNICATIONS
-- =====================================================

-- Abonnés newsletter
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    preferences JSONB, -- Préférences de contenu
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    source VARCHAR(50), -- D'où vient l'abonnement
    ip_address INET,
    user_agent TEXT,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Campagnes d'email
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    template_id VARCHAR(100),
    
    -- Statistiques
    sent_count INTEGER DEFAULT 0,
    delivered_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    bounced_count INTEGER DEFAULT 0,
    unsubscribed_count INTEGER DEFAULT 0,
    
    -- Statut
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLES POUR LES STATISTIQUES ET ANALYTICS
-- =====================================================

-- Vues de pages
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    title VARCHAR(255),
    referrer TEXT,
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    country VARCHAR(2),
    city VARCHAR(100),
    device_type VARCHAR(20),
    browser VARCHAR(50),
    os VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Événements personnalisés
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name VARCHAR(100) NOT NULL,
    event_category VARCHAR(50),
    event_data JSONB,
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255),
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEX POUR LES PERFORMANCES
-- =====================================================

-- Index pour les articles
CREATE INDEX idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_species ON articles(species);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_featured ON articles(is_featured, published_at DESC);

-- Index pour les produits
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(rating_average DESC);
CREATE INDEX idx_products_slug ON products(slug);

-- Index pour les dons
CREATE INDEX idx_donations_campaign ON donations(campaign_id);
CREATE INDEX idx_donations_user ON donations(user_id);
CREATE INDEX idx_donations_date ON donations(created_at DESC);
CREATE INDEX idx_donations_amount ON donations(amount DESC);
CREATE INDEX idx_donations_status ON donations(payment_status);

-- Index pour les campagnes
CREATE INDEX idx_campaigns_active ON donation_campaigns(is_active, end_date);
CREATE INDEX idx_campaigns_featured ON donation_campaigns(is_featured);
CREATE INDEX idx_campaigns_dates ON donation_campaigns(start_date, end_date);

-- Index pour les analytics
CREATE INDEX idx_page_views_url ON page_views(url);
CREATE INDEX idx_page_views_date ON page_views(created_at DESC);
CREATE INDEX idx_page_views_user ON page_views(user_id);

-- =====================================================
-- TRIGGERS POUR LA MISE À JOUR AUTOMATIQUE
-- =====================================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON donation_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour mettre à jour les compteurs
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.payment_status = 'completed' THEN
        UPDATE donation_campaigns 
        SET current_amount = current_amount + NEW.amount,
            donor_count = donor_count + 1
        WHERE id = NEW.campaign_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.payment_status != 'completed' AND NEW.payment_status = 'completed' THEN
        UPDATE donation_campaigns 
        SET current_amount = current_amount + NEW.amount,
            donor_count = donor_count + 1
        WHERE id = NEW.campaign_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.payment_status = 'completed' AND NEW.payment_status != 'completed' THEN
        UPDATE donation_campaigns 
        SET current_amount = current_amount - OLD.amount,
            donor_count = donor_count - 1
        WHERE id = OLD.campaign_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour les montants des campagnes
CREATE TRIGGER update_campaign_amount_trigger
    AFTER INSERT OR UPDATE ON donations
    FOR EACH ROW EXECUTE FUNCTION update_campaign_amount();

-- =====================================================
-- VUES POUR LES REQUÊTES FRÉQUENTES
-- =====================================================

-- Vue pour les articles avec leurs catégories et auteurs
CREATE VIEW articles_with_details AS
SELECT 
    a.*,
    ac.name as category_name,
    ac.slug as category_slug,
    sc.name as subcategory_name,
    sc.slug as subcategory_slug,
    u.first_name || ' ' || u.last_name as author_name,
    u.avatar_url as author_avatar,
    array_agg(at.name) as tag_names
FROM articles a
LEFT JOIN article_categories ac ON a.category_id = ac.id
LEFT JOIN article_categories sc ON a.subcategory_id = sc.id
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN article_tag_relations atr ON a.id = atr.article_id
LEFT JOIN article_tags at ON atr.tag_id = at.id
GROUP BY a.id, ac.name, ac.slug, sc.name, sc.slug, u.first_name, u.last_name, u.avatar_url;

-- Vue pour les produits avec leurs détails
CREATE VIEW products_with_details AS
SELECT 
    p.*,
    pc.name as category_name,
    pc.slug as category_slug,
    sc.name as subcategory_name,
    sc.slug as subcategory_slug,
    pb.name as brand_name,
    pb.logo_url as brand_logo
FROM products p
LEFT JOIN product_categories pc ON p.category_id = pc.id
LEFT JOIN product_categories sc ON p.subcategory_id = sc.id
LEFT JOIN product_brands pb ON p.brand_id = pb.id;

-- Vue pour les statistiques des campagnes
CREATE VIEW campaign_stats AS
SELECT 
    dc.*,
    ROUND((dc.current_amount / dc.target_amount * 100), 2) as progress_percentage,
    CASE 
        WHEN dc.end_date < CURRENT_TIMESTAMP THEN 'expired'
        WHEN dc.current_amount >= dc.target_amount THEN 'completed'
        WHEN dc.is_active THEN 'active'
        ELSE 'inactive'
    END as computed_status,
    EXTRACT(DAYS FROM (dc.end_date - CURRENT_TIMESTAMP)) as days_remaining
FROM donation_campaigns dc;

-- =====================================================
-- DONNÉES DE TEST
-- =====================================================

-- Insertion des données de base pour les tests
INSERT INTO article_categories (name, slug, description, color, icon) VALUES
('Comportement & Éducation', 'comportement-education', 'Articles sur le comportement et l''éducation des animaux', '#3B82F6', '🎓'),
('Santé & Bien-être', 'sante-bien-etre', 'Conseils santé et bien-être pour vos animaux', '#10B981', '🏥'),
('Alimentation', 'alimentation', 'Guides d''alimentation et nutrition', '#F59E0B', '🍖'),
('Produits recommandés', 'produits-recommandes', 'Nos recommandations de produits', '#8B5CF6', '⭐');

INSERT INTO product_categories (name, slug, description, species, icon) VALUES
('Nourriture & Friandises', 'nourriture-friandises', 'Alimentation pour chiens et chats', 'mixte', '🍖'),
('Jouets & Activités', 'jouets-activites', 'Jouets et accessoires d''activité', 'mixte', '🎾'),
('Couchage & Confort', 'couchage-confort', 'Paniers, coussins et accessoires de confort', 'mixte', '🛏️'),
('Hygiène & Santé', 'hygiene-sante', 'Produits d''hygiène et de santé', 'mixte', '🧴');

INSERT INTO product_brands (name, slug, description) VALUES
('Royal Canin', 'royal-canin', 'Nutrition santé pour chiens et chats'),
('Hill''s', 'hills', 'Nutrition scientifiquement prouvée'),
('Purina', 'purina', 'Alimentation premium pour animaux'),
('Whiskas', 'whiskas', 'Nourriture savoureuse pour chats');

INSERT INTO donation_causes (name, slug, description, color, icon) VALUES
('Soins vétérinaires', 'soins-veterinaires', 'Financement des soins médicaux d''urgence', '#EF4444', '🏥'),
('Refuge et hébergement', 'refuge-hebergement', 'Construction et maintenance des refuges', '#3B82F6', '🏠'),
('Nourriture et soins', 'nourriture-soins', 'Alimentation et soins quotidiens', '#10B981', '🍖'),
('Stérilisation', 'sterilisation', 'Programmes de stérilisation', '#8B5CF6', '⚕️');

-- Commentaire final
-- Ce schéma est conçu pour être évolutif et performant
-- Il inclut toutes les fonctionnalités nécessaires pour Animal Lovers
-- Les index et triggers optimisent les performances
-- Les vues simplifient les requêtes complexes
