-- Ajouter les champs pour les ebooks dans la table articles
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS pdf_url TEXT,
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS is_ebook BOOLEAN DEFAULT false;

-- Index pour les ebooks
CREATE INDEX IF NOT EXISTS idx_articles_is_ebook ON articles(is_ebook, is_published) WHERE is_ebook = true;
CREATE INDEX IF NOT EXISTS idx_articles_price ON articles(price) WHERE price IS NOT NULL;

