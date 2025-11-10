# Instructions pour Configurer Supabase Storage

## 🚀 Méthode Automatique (Recommandée)

### Option 1: Avec credentials PostgreSQL (100% automatique)

1. **Ajoutez les credentials PostgreSQL dans `.env.local`**:
   ```env
   SUPABASE_DB_HOST=db.xxxxx.supabase.co
   SUPABASE_DB_PASSWORD=votre_mot_de_passe
   SUPABASE_DB_USER=postgres
   SUPABASE_DB_NAME=postgres
   SUPABASE_DB_PORT=5432
   ```
   
   > 💡 Vous pouvez trouver ces informations dans Supabase Dashboard > Settings > Database > Connection string

2. **Installez le package `pg`** (si ce n'est pas déjà fait):
   ```bash
   pnpm add pg
   ```

3. **Exécutez le script**:
   ```bash
   node scripts/setup-storage-complete.js
   ```
   
   Ou avec pnpm:
   ```bash
   pnpm setup:storage
   ```

Le script va :
- ✅ Créer le bucket "ebooks" automatiquement
- ✅ Créer les politiques RLS automatiquement (si les credentials sont fournis)
- ✅ Tout configurer en une seule commande

### Option 2: Sans credentials PostgreSQL (semi-automatique)

1. **Exécutez le script**:
   ```bash
   node scripts/setup-storage-complete.js
   ```

2. **Le script va**:
   - ✅ Créer le bucket "ebooks" automatiquement
   - ✅ Générer le script SQL dans `scripts/setup-storage-policies.sql`

3. **Exécutez le script SQL dans Supabase**:
   - Ouvrez Supabase SQL Editor
   - Copiez le contenu de `scripts/setup-storage-policies.sql`
   - Exécutez le script

## 📋 Script SQL à Exécuter

Si vous préférez exécuter le SQL manuellement, le script est dans:

**`scripts/setup-storage-policies.sql`**

Ou **`scripts/setup-supabase-storage.sql`**

## 🔍 Vérification

Pour vérifier que tout est configuré:

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%ebooks%';
```

Vous devriez voir 4 politiques créées.

## 🎯 Résumé

**Pour une configuration 100% automatique:**
1. Ajoutez les credentials PostgreSQL dans `.env.local`
2. Installez `pg`: `pnpm add pg`
3. Exécutez: `node scripts/setup-storage-complete.js`

**Pour une configuration semi-automatique:**
1. Exécutez: `node scripts/setup-storage-complete.js`
2. Exécutez le SQL généré dans Supabase SQL Editor

