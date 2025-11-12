# 📦 Guide Complet: Création du Bucket "products" dans Supabase Storage

## 🎯 Objectif

Créer un bucket "products" dans Supabase Storage pour stocker les images de produits avec les bonnes permissions.

## 📋 Checklist des Étapes

### ✅ Étape 1: Créer le Bucket (Méthode Automatique)

**Option A: Script Automatique (Recommandé)**

1. **Vérifiez vos variables d'environnement** dans `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
   ```

2. **Exécutez le script**:
   ```bash
   npm run setup:products-storage
   ```
   
   Ou directement:
   ```bash
   node scripts/setup-products-storage-complete.js
   ```

**Option B: Création Manuelle**

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

### ✅ Étape 2: Configurer les Politiques RLS

1. **Ouvrez SQL Editor** dans Supabase Dashboard
2. **Cliquez sur "New query"**
3. **Ouvrez le fichier** `scripts/setup-products-storage.sql`
4. **Copiez tout le contenu** du fichier
5. **Collez-le dans le SQL Editor**
6. **Cliquez sur "Run"** (ou `Ctrl+Enter`)

### ✅ Étape 3: Vérifier la Configuration

**Vérifier le bucket:**
- Allez dans **Storage > Buckets**
- Vérifiez que le bucket "products" existe
- Vérifiez qu'il est marqué comme **Public**

**Vérifier les politiques RLS:**
Exécutez cette requête dans SQL Editor:
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%products%';
```

Vous devriez voir **4 politiques**:
- `Allow public read access for products`
- `Allow authenticated users to upload products`
- `Allow authenticated users to update products`
- `Allow authenticated users to delete products`

### ✅ Étape 4: Tester l'Upload

1. **Allez dans l'admin produits**: `/admin/produits`
2. **Cliquez sur "Ajouter un Produit"**
3. **Cliquez sur "Choisir une image"**
4. **Sélectionnez une image** (JPEG, PNG, WebP, GIF, max 10MB)
5. **Vérifiez que l'image s'upload correctement**
6. **Vérifiez que l'URL est remplie automatiquement**

## 🔍 Dépannage

### ❌ Erreur: "Bucket not found"

**Solution**: 
- Le bucket n'existe pas. Créez-le via le dashboard Supabase (voir Étape 1, Option B)
- Ou exécutez le script automatique: `npm run setup:products-storage`

### ❌ Erreur: "new row violates row-level security policy"

**Solution**: 
- Les politiques RLS ne sont pas configurées
- Exécutez le script SQL `setup-products-storage.sql` dans SQL Editor

### ❌ Les images ne s'affichent pas

**Vérifications**:
1. ✅ Le bucket est-il public?
2. ✅ Les politiques RLS sont-elles créées?
3. ✅ L'URL de l'image est-elle correcte?
4. ✅ Les permissions du bucket sont-elles correctes?

### ❌ L'upload échoue

**Vérifications**:
1. ✅ Le bucket existe-t-il?
2. ✅ Les politiques RLS pour INSERT sont-elles créées?
3. ✅ L'utilisateur est-il authentifié?
4. ✅ La taille du fichier est-elle < 10MB?
5. ✅ Le type MIME est-il autorisé?

## 📝 Résumé des Politiques RLS

| Politique | Accès | Action | Description |
|-----------|-------|--------|-------------|
| `Allow public read access for products` | Public | SELECT | Permet à tous de voir les images |
| `Allow authenticated users to upload products` | Authentifiés | INSERT | Permet aux admins d'uploader |
| `Allow authenticated users to update products` | Authentifiés | UPDATE | Permet aux admins de modifier |
| `Allow authenticated users to delete products` | Authentifiés | DELETE | Permet aux admins de supprimer |

## 🎉 Résultat Final

Une fois toutes les étapes terminées:
- ✅ Le bucket "products" est créé et public
- ✅ Les 4 politiques RLS sont configurées
- ✅ Les images peuvent être uploadées depuis l'admin
- ✅ Les images sont accessibles publiquement
- ✅ Les images s'affichent correctement sur le site

## 📚 Fichiers Créés

- `scripts/setup-products-storage.sql` - Script SQL pour les politiques RLS
- `scripts/setup-products-storage-complete.js` - Script automatique de création
- `scripts/README-PRODUCTS-STORAGE.md` - Documentation détaillée
- `scripts/GUIDE-PRODUCTS-STORAGE.md` - Ce guide (checklist rapide)

## 🔗 Ressources

- [Documentation Supabase Storage](https://supabase.com/docs/guides/storage)
- [Documentation RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Script SQL complet](./setup-products-storage.sql)

## ✅ Checklist Finale

- [ ] Bucket "products" créé dans Supabase Dashboard
- [ ] Bucket marqué comme public
- [ ] Script SQL exécuté dans SQL Editor
- [ ] 4 politiques RLS créées et vérifiées
- [ ] Test d'upload réussi dans l'admin produits
- [ ] Images affichées correctement sur le site
- [ ] Variables d'environnement configurées
- [ ] API d'upload configurée pour utiliser le bucket "products"

