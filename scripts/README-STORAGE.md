# Configuration Automatique de Supabase Storage

## 🚀 Installation Rapide

Exécutez simplement cette commande :

```bash
pnpm setup:storage
```

Ou directement :

```bash
node scripts/setup-storage-complete.js
```

## 📋 Ce que fait le script

1. ✅ **Crée le bucket "ebooks"** automatiquement
2. ✅ **Génère le script SQL** pour les politiques RLS
3. ⚠️ **Vous devez exécuter le script SQL** dans Supabase SQL Editor

## 🔧 Étapes Détaillées

### Étape 1: Exécuter le script Node.js

```bash
pnpm setup:storage
```

Le script va :
- Créer le bucket "ebooks" dans Supabase Storage
- Générer le fichier `scripts/setup-storage-policies.sql`
- Afficher le script SQL à exécuter

### Étape 2: Exécuter le script SQL

1. Ouvrez votre dashboard Supabase
2. Allez dans **SQL Editor**
3. Créez une nouvelle query
4. Copiez le contenu de `scripts/setup-storage-policies.sql`
5. Exécutez le script (Run ou Ctrl+Enter)

### Étape 3: Vérifier

Pour vérifier que tout fonctionne :

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%ebooks%';
```

Vous devriez voir 4 politiques créées.

## 📁 Fichiers

- `setup-storage-complete.js` - Script principal (crée le bucket)
- `setup-storage-policies.sql` - Script SQL pour les politiques RLS
- `setup-supabase-storage.sql` - Script SQL complet (ancienne version)

## 🔍 Dépannage

### Le bucket n'est pas créé

Vérifiez que :
- `NEXT_PUBLIC_SUPABASE_URL` est défini dans `.env.local`
- `SUPABASE_SERVICE_ROLE_KEY` est défini dans `.env.local`
- La clé service role a les bonnes permissions

### Les politiques ne sont pas créées

- Exécutez le script SQL dans Supabase SQL Editor
- Vérifiez que vous avez les permissions nécessaires
- Vérifiez que RLS est activé sur `storage.objects`

### Erreur "Bucket already exists"

C'est normal si le bucket existe déjà. Le script continue.

## 📝 Notes

- Le bucket doit être **public** pour que les fichiers soient accessibles
- Les politiques RLS sont nécessaires même si le bucket est public
- L'API admin utilise `SUPABASE_SERVICE_ROLE_KEY` qui bypass RLS

