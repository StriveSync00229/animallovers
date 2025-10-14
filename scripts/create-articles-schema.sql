-- Création des tables pour les articles

-- Table des catégories d'articles
CREATE TABLE IF NOT EXISTS public.article_categories (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NULL,
  color VARCHAR(7) NULL,
  icon VARCHAR(50) NULL,
  parent_id UUID NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT article_categories_pkey PRIMARY KEY (id),
  CONSTRAINT article_categories_slug_key UNIQUE (slug),
  CONSTRAINT article_categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES article_categories (id)
);

-- Table des tags d'articles
CREATE TABLE IF NOT EXISTS public.article_tags (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  color VARCHAR(7) NULL,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT article_tags_pkey PRIMARY KEY (id),
  CONSTRAINT article_tags_slug_key UNIQUE (slug)
);

-- Table de relation articles-tags
CREATE TABLE IF NOT EXISTS public.article_tag_relations (
  article_id UUID NOT NULL,
  tag_id UUID NOT NULL,
  CONSTRAINT article_tag_relations_pkey PRIMARY KEY (article_id, tag_id),
  CONSTRAINT article_tag_relations_article_id_fkey FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE,
  CONSTRAINT article_tag_relations_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES article_tags (id) ON DELETE CASCADE
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_article_categories_parent ON public.article_categories USING btree (parent_id);
CREATE INDEX IF NOT EXISTS idx_article_categories_active ON public.article_categories USING btree (is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_article_tags_usage ON public.article_tags USING btree (usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_article_tag_relations_article ON public.article_tag_relations USING btree (article_id);
CREATE INDEX IF NOT EXISTS idx_article_tag_relations_tag ON public.article_tag_relations USING btree (tag_id);

-- Fonction pour mettre à jour le compteur d'usage des tags
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE article_tags 
    SET usage_count = usage_count + 1 
    WHERE id = NEW.tag_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE article_tags 
    SET usage_count = GREATEST(usage_count - 1, 0) 
    WHERE id = OLD.tag_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement le compteur d'usage des tags
CREATE TRIGGER update_tag_usage_count_trigger
  AFTER INSERT OR DELETE ON article_tag_relations
  FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

-- Fonction pour incrémenter le nombre de vues d'un article
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles 
  SET view_count = view_count + 1 
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;
