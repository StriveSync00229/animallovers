# 🚨 Résolution de l'erreur 500 lors de l'upload d'images de produits

## Problème

L'erreur 500 se produit généralement parce que :
1. ❌ Le bucket "products" n'existe pas dans Supabase Storage
2. ❌ Les politiques RLS ne sont pas configurées
3. ❌ Les variables d'environnement ne sont pas correctement configurées

## ✅ Solution Rapide

### Étape 1: Créer le bucket "products" dans Supabase

1. **Ouvrez Supabase Dashboard**: https://supabase.com/dashboard
2. **Sélectionnez votre projet**
3. **Allez dans Storage** (menu de gauche)
4. **Cliquez sur "New bucket"**
5. **Remplissez les informations**:
   - **Name**: `products`
   - **Public bucket**: ✅ **Oui** (IMPORTANT!)
   - **File size limit**: `10485760` (10MB)
   - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp,image/gif`
6. **Cliquez sur "Create bucket"**

### Étape 2: Configurer les politiques RLS

1. **Ouvrez SQL Editor** dans Supabase Dashboard
2. **Cliquez sur "New query"**
3. **Copiez et exécutez le script suivant**:

```sql
-- Activer RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Politique 1: Lecture publique
DROP POLICY IF EXISTS "Allow public read access for products" ON storage.objects;
CREATE POLICY "Allow public read access for products"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'products');

-- Politique 2: Upload authentifié
DROP POLICY IF EXISTS "Allow authenticated users to upload products" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload products"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Politique 3: Update authentifié
DROP POLICY IF EXISTS "Allow authenticated users to update products" ON storage.objects;
CREATE POLICY "Allow authenticated users to update products"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- Politique 4: Delete authentifié
DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete products"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'products');
```

4. **Cliquez sur "Run"** (ou `Ctrl+Enter`)

### Étape 3: Vérifier la configuration

Exécutez cette requête pour vérifier que les politiques sont créées:

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%products%';
```

Vous devriez voir **4 politiques**.

### Étape 4: Vérifier les variables d'environnement

Vérifiez que votre fichier `.env.local` contient:

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

**Important**: Redémarrez le serveur de développement après avoir modifié `.env.local`:
```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm run dev
```

## 🔍 Diagnostic

Si l'erreur persiste, vérifiez les logs du serveur. L'API affiche maintenant des messages détaillés:
- 📦 Buckets disponibles
- ❌ Erreurs spécifiques
- 💡 Suggestions de solutions

## 📝 Scripts Disponibles

### Script automatique (création du bucket)

```bash
npm run setup:products-storage
```

Ce script va:
1. ✅ Créer le bucket "products" automatiquement
2. ⚠️  Vous demander d'exécuter le script SQL pour les politiques RLS

### Script SQL manuel

Le fichier `scripts/setup-products-storage.sql` contient le script SQL complet à exécuter.

## 🎯 Solution de Fallback

Si le bucket "products" n'existe pas encore, l'API utilisera automatiquement le bucket "ebooks" comme fallback. Cependant, il est recommandé de créer le bucket "products" pour une meilleure organisation.

## ✅ Checklist de Vérification

- [ ] Le bucket "products" existe dans Supabase Dashboard
- [ ] Le bucket "products" est marqué comme **Public**
- [ ] Les 4 politiques RLS sont créées et actives
- [ ] Les variables d'environnement sont correctes
- [ ] Le serveur de développement a été redémarré
- [ ] L'upload fonctionne dans l'admin produits

## 🔗 Ressources

- **Documentation complète**: `scripts/README-PRODUCTS-STORAGE.md`
- **Guide rapide**: `scripts/GUIDE-PRODUCTS-STORAGE.md`
- **Script SQL**: `scripts/setup-products-storage.sql`

## 💡 Après la Configuration

Une fois le bucket créé et les politiques configurées:
1. ✅ Les images peuvent être uploadées depuis l'admin
2. ✅ Les images sont accessibles publiquement
3. ✅ Les images s'affichent correctement sur le site
4. ✅ Les URLs sont automatiquement remplies dans le formulaire

