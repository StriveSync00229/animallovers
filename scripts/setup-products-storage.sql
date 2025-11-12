-- =====================================================
-- CONFIGURATION DU BUCKET "products" POUR SUPABASE STORAGE
-- =====================================================
-- Ce script crée le bucket "products" et configure les politiques RLS
-- pour permettre l'upload et la lecture des images de produits
--
-- INSTRUCTIONS:
-- 1. Connectez-vous à votre dashboard Supabase
-- 2. Allez dans SQL Editor
-- 3. Copiez et exécutez ce script
-- =====================================================

-- Activer RLS sur la table storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CRÉATION DU BUCKET "products"
-- =====================================================
-- Note: Le bucket doit être créé via l'API ou le dashboard Supabase
-- Ce script configure uniquement les politiques RLS
-- Si le bucket n'existe pas, créez-le d'abord dans le dashboard:
-- Storage > New bucket > Nom: "products" > Public: Yes

-- =====================================================
-- POLITIQUES RLS POUR LE BUCKET "products"
-- =====================================================

-- Politique 1: Lecture publique (pour afficher les images sur le site)
DROP POLICY IF EXISTS "Allow public read access for products" ON storage.objects;
CREATE POLICY "Allow public read access for products"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'products');

-- Politique 2: Upload pour les utilisateurs authentifiés (admin)
DROP POLICY IF EXISTS "Allow authenticated users to upload products" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload products"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Politique 3: Mise à jour pour les utilisateurs authentifiés (admin)
DROP POLICY IF EXISTS "Allow authenticated users to update products" ON storage.objects;
CREATE POLICY "Allow authenticated users to update products"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- Politique 4: Suppression pour les utilisateurs authentifiés (admin)
DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete products"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- =====================================================
-- VÉRIFICATION
-- =====================================================
-- Pour vérifier que les politiques sont créées:
-- SELECT * FROM pg_policies 
-- WHERE tablename = 'objects' 
-- AND schemaname = 'storage'
-- AND policyname LIKE '%products%';
-- 
-- Vous devriez voir 4 politiques.

