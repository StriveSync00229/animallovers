# Configuration Supabase Storage - Guide Complet

## 🚀 Installation Rapide (100% Automatique)

### Méthode 1: Avec credentials PostgreSQL (Recommandée)

1. **Ajoutez les credentials PostgreSQL dans `.env.local`**:
   ```env
   SUPABASE_DB_HOST=db.xxxxx.supabase.co
   SUPABASE_DB_PASSWORD=votre_mot_de_passe
   SUPABASE_DB_USER=postgres
   SUPABASE_DB_NAME=postgres
   SUPABASE_DB_PORT=5432
   ```
   
   > 💡 Trouvez ces infos dans: Supabase Dashboard > Settings > Database > Connection string

2. **Installez le package `pg`**:
   ```bash
   pnpm add pg
   ```

3. **Exécutez le script**:
   ```bash
   pnpm setup:storage
   ```
   
   Ou directement:
   ```bash
   node scripts/setup-storage-complete.js
   ```

✅ **Tout sera configuré automatiquement!**

### Méthode 2: Sans credentials PostgreSQL (Semi-automatique)

1. **Exécutez le script**:
   ```bash
   node scripts/setup-storage-complete.js
   ```

2. **Le script va**:
   - ✅ Créer le bucket "ebooks" automatiquement
   - ✅ Générer le script SQL dans `scripts/setup-storage-policies.sql`

3. **Exécutez le SQL dans Supabase**:
   - Ouvrez Supabase SQL Editor
   - Copiez le contenu de `scripts/setup-storage-policies.sql`
   - Exécutez le script

## 📋 Scripts Disponibles

### Script Principal
- **`scripts/setup-storage-complete.js`** - Script principal (crée le bucket + génère le SQL)

### Scripts SQL
- **`scripts/setup-storage-policies.sql`** - Script SQL pour les politiques RLS (généré automatiquement)
- **`scripts/setup-supabase-storage.sql`** - Script SQL complet (version manuelle)

## 🔍 Vérification

Pour vérifier que les politiques sont créées:

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%ebooks%';
```

Vous devriez voir 4 politiques.

## 📝 Script SQL à Exécuter

Si vous préférez exécuter le SQL manuellement, voici le script complet:

```sql
-- Activer RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique
DROP POLICY IF EXISTS "Allow public read access for ebooks" ON storage.objects;
CREATE POLICY "Allow public read access for ebooks"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'ebooks');

-- Politique 2: Upload authentifié
DROP POLICY IF EXISTS "Allow authenticated users to upload ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload ebooks"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ebooks');

-- Politique 3: Update authentifié
DROP POLICY IF EXISTS "Allow authenticated users to update ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to update ebooks"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'ebooks');

-- Politique 4: Delete authentifié
DROP POLICY IF EXISTS "Allow authenticated users to delete ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete ebooks"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'ebooks');
```

## 🎯 Résumé

**Pour une configuration 100% automatique:**
1. Ajoutez les credentials PostgreSQL dans `.env.local`
2. Installez `pg`: `pnpm add pg`
3. Exécutez: `pnpm setup:storage`

**Pour une configuration semi-automatique:**
1. Exécutez: `pnpm setup:storage`
2. Exécutez le SQL généré dans Supabase SQL Editor
