# Configuration du Bucket "products" pour Supabase Storage

Ce guide vous explique comment créer et configurer le bucket "products" dans Supabase Storage pour stocker les images de produits.

## 🚀 Méthode 1: Configuration Automatique (Recommandée)

### Prérequis

1. **Variables d'environnement** dans `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
   ```

2. **Service Role Key**: Vous pouvez la trouver dans:
   - Supabase Dashboard > Settings > API > Service Role Key

### Étapes

1. **Exécutez le script automatique**:
   ```bash
   node scripts/setup-products-storage-complete.js
   ```

2. **Exécutez le script SQL** dans Supabase SQL Editor:
   - Ouvrez Supabase Dashboard > SQL Editor
   - Copiez le contenu de `scripts/setup-products-storage.sql`
   - Exécutez le script

3. **Vérifiez la configuration**:
   - Allez dans Storage > Buckets
   - Vérifiez que le bucket "products" existe et est public
   - Vérifiez que les politiques RLS sont créées

## 🛠️ Méthode 2: Configuration Manuelle

### Étape 1: Créer le Bucket

1. **Ouvrez Supabase Dashboard**:
   - Allez sur https://supabase.com/dashboard
   - Sélectionnez votre projet

2. **Créez le bucket**:
   - Allez dans **Storage** (menu de gauche)
   - Cliquez sur **New bucket**
   - Remplissez les informations:
     - **Name**: `products`
     - **Public bucket**: ✅ **Oui** (cochez cette option)
     - **File size limit**: `10485760` (10MB)
     - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp,image/gif`
   - Cliquez sur **Create bucket**

### Étape 2: Configurer les Politiques RLS

1. **Ouvrez SQL Editor**:
   - Allez dans **SQL Editor** (menu de gauche)
   - Cliquez sur **New query**

2. **Exécutez le script SQL**:
   - Ouvrez le fichier `scripts/setup-products-storage.sql`
   - Copiez tout le contenu
   - Collez-le dans le SQL Editor
   - Cliquez sur **Run** (ou appuyez sur `Ctrl+Enter`)

3. **Vérifiez les politiques**:
   - Exécutez cette requête pour vérifier:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'objects' 
   AND schemaname = 'storage'
   AND policyname LIKE '%products%';
   ```
   - Vous devriez voir 4 politiques:
     - `Allow public read access for products`
     - `Allow authenticated users to upload products`
     - `Allow authenticated users to update products`
     - `Allow authenticated users to delete products`

## 🔍 Vérification

### Vérifier que le bucket existe

1. Allez dans **Storage > Buckets**
2. Vérifiez que le bucket "products" est présent
3. Vérifiez qu'il est marqué comme **Public**

### Vérifier les politiques RLS

Exécutez cette requête dans SQL Editor:
```sql
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%products%';
```

### Tester l'upload

1. Allez dans l'admin produits: `/admin/produits`
2. Cliquez sur **Ajouter un Produit**
3. Cliquez sur **Choisir une image**
4. Sélectionnez une image
5. Vérifiez que l'image s'upload correctement

## 📋 Résumé des Politiques RLS

| Politique | Accès | Action |
|-----------|-------|--------|
| `Allow public read access for products` | Public | Lecture (SELECT) |
| `Allow authenticated users to upload products` | Authentifiés | Upload (INSERT) |
| `Allow authenticated users to update products` | Authentifiés | Mise à jour (UPDATE) |
| `Allow authenticated users to delete products` | Authentifiés | Suppression (DELETE) |

## 🔧 Dépannage

### Erreur: "Bucket not found"

**Solution**: Le bucket n'existe pas. Créez-le via le dashboard Supabase (voir Méthode 2, Étape 1).

### Erreur: "new row violates row-level security policy"

**Solution**: Les politiques RLS ne sont pas configurées. Exécutez le script SQL `setup-products-storage.sql`.

### Les images ne s'affichent pas

**Vérifications**:
1. Le bucket est-il public?
2. Les politiques RLS sont-elles créées?
3. L'URL de l'image est-elle correcte?
4. Les permissions du bucket sont-elles correctes?

### L'upload échoue

**Vérifications**:
1. Le bucket existe-t-il?
2. Les politiques RLS pour INSERT sont-elles créées?
3. L'utilisateur est-il authentifié?
4. La taille du fichier est-elle < 10MB?
5. Le type MIME est-il autorisé?

## 📝 Notes

- **Bucket public**: Les images sont accessibles publiquement via une URL directe
- **Taille maximale**: 10MB par fichier (configurable dans le bucket)
- **Types autorisés**: JPEG, JPG, PNG, WebP, GIF
- **Dossier**: Les images sont stockées dans `products/` (configurable dans l'API)

## 🔗 Ressources

- [Documentation Supabase Storage](https://supabase.com/docs/guides/storage)
- [Documentation RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Script SQL complet](./setup-products-storage.sql)

## ✅ Checklist

- [ ] Bucket "products" créé dans Supabase Dashboard
- [ ] Bucket marqué comme public
- [ ] Script SQL exécuté dans SQL Editor
- [ ] 4 politiques RLS créées et vérifiées
- [ ] Test d'upload réussi dans l'admin produits
- [ ] Images affichées correctement sur le site
