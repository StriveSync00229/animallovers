-- =====================================================
-- CONFIGURATION DES POLITIQUES RLS POUR LE BUCKET EBOOKS
-- =====================================================
-- 
-- Ce script configure les politiques RLS pour le bucket "ebooks"
-- dans Supabase Storage pour permettre l'upload d'images et de PDFs
--
-- IMPORTANT: Ce script utilise une fonction avec SECURITY DEFINER
-- pour éviter les problèmes de permissions (must be owner of table objects)
--
-- INSTRUCTIONS:
-- 1. Exécutez d'abord: node scripts/setup-storage-complete.js (pour créer le bucket)
-- 2. Exécutez ce script SQL dans Supabase SQL Editor
--
-- =====================================================

-- Créer une fonction helper avec SECURITY DEFINER
-- Cette fonction aura les permissions nécessaires pour créer les politiques
CREATE OR REPLACE FUNCTION setup_ebooks_storage_policies()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Activer RLS sur storage.objects si ce n'est pas déjà fait
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

  -- =====================================================
  -- POLITIQUE 1: Lecture publique (pour que tout le monde puisse voir les fichiers)
  -- =====================================================
  DROP POLICY IF EXISTS "Allow public read access for ebooks" ON storage.objects;
  CREATE POLICY "Allow public read access for ebooks"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'ebooks');

  -- =====================================================
  -- POLITIQUE 2: Upload pour les utilisateurs authentifiés
  -- =====================================================
  -- Cette politique permet aux utilisateurs authentifiés d'uploader des fichiers
  DROP POLICY IF EXISTS "Allow authenticated users to upload ebooks" ON storage.objects;
  CREATE POLICY "Allow authenticated users to upload ebooks"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'ebooks');

  -- =====================================================
  -- POLITIQUE 3: Mise à jour pour les utilisateurs authentifiés
  -- =====================================================
  -- Cette politique permet aux utilisateurs authentifiés de mettre à jour leurs fichiers
  DROP POLICY IF EXISTS "Allow authenticated users to update ebooks" ON storage.objects;
  CREATE POLICY "Allow authenticated users to update ebooks"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'ebooks');

  -- =====================================================
  -- POLITIQUE 4: Suppression pour les utilisateurs authentifiés
  -- =====================================================
  -- Cette politique permet aux utilisateurs authentifiés de supprimer leurs fichiers
  DROP POLICY IF EXISTS "Allow authenticated users to delete ebooks" ON storage.objects;
  CREATE POLICY "Allow authenticated users to delete ebooks"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'ebooks');
END;
$$;

-- Exécuter la fonction pour créer les politiques
SELECT setup_ebooks_storage_policies();

-- Nettoyer: supprimer la fonction helper (optionnel, mais recommandé)
DROP FUNCTION IF EXISTS setup_ebooks_storage_policies();

-- =====================================================
-- VÉRIFICATION
-- =====================================================
-- 
-- Pour vérifier que les politiques sont bien créées, exécutez:
--
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%ebooks%';
--
-- Vous devriez voir 4 politiques créées
--
-- =====================================================
-- NOTES IMPORTANTES
-- =====================================================
-- 
-- 1. Le bucket doit être PUBLIC pour que les fichiers soient accessibles publiquement
-- 2. Les politiques RLS sont nécessaires même si le bucket est public
-- 3. L'API admin utilise SUPABASE_SERVICE_ROLE_KEY qui bypass RLS par défaut
-- 4. Les utilisateurs authentifiés peuvent uploader grâce aux politiques ci-dessus
-- 5. Les fichiers seront organisés dans le bucket comme suit:
--    - ebooks/images/ (images de couverture)
--    - ebooks/pdfs/ (fichiers PDF)
-- 6. Ce script utilise SECURITY DEFINER pour avoir les permissions nécessaires
--    sur la table storage.objects (qui appartient au système Supabase)
--
-- =====================================================
