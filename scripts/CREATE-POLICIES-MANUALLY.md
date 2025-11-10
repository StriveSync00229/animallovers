# Comment Créer les Politiques RLS pour le Bucket Ebooks

## ⚠️ Problème de Permissions

Les politiques RLS sur la table `storage.objects` ne peuvent pas être créées directement via SQL Editor dans Supabase à cause des limitations de permissions. La table `storage.objects` est une table système qui appartient à Supabase.

## ✅ Solution Recommandée: Interface Web

### Étapes à Suivre

1. **Connectez-vous à votre dashboard Supabase**
   - Allez sur https://app.supabase.com
   - Sélectionnez votre projet

2. **Accédez à Storage Policies**
   - Dans le menu latéral, cliquez sur **"Storage"**
   - Cliquez sur **"Policies"** dans le sous-menu
   - Ou allez directement sur: **Storage** > **Buckets** > **ebooks** > **Policies**

3. **Créez les 4 politiques suivantes:**

#### Politique 1: Lecture publique

- **Name**: `Allow public read access for ebooks`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = 'ebooks'`

#### Politique 2: Upload authentifié

- **Name**: `Allow authenticated users to upload ebooks`
- **Allowed operation**: `INSERT`
- **Target roles**: `authenticated`
- **WITH CHECK expression**: `bucket_id = 'ebooks'`

#### Politique 3: Update authentifié

- **Name**: `Allow authenticated users to update ebooks`
- **Allowed operation**: `UPDATE`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = 'ebooks'`

#### Politique 4: Delete authentifié

- **Name**: `Allow authenticated users to delete ebooks`
- **Allowed operation**: `DELETE`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = 'ebooks'`

## 🔍 Vérification

Pour vérifier que les politiques sont créées:

1. Allez dans **Storage** > **Policies**
2. Filtrez par bucket "ebooks"
3. Vous devriez voir 4 politiques créées

Ou exécutez cette requête SQL dans SQL Editor:

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%ebooks%';
```

Vous devriez voir 4 politiques.

## 🚀 Alternative: Script Node.js avec Service Role

Si vous préférez automatiser via un script, vous devez utiliser les credentials PostgreSQL du **service role** (super-utilisateur):

1. **Trouvez les credentials du service role:**
   - Allez dans Supabase Dashboard > Settings > Database
   - Trouvez "Connection string" > "Connection pooling" > "Transaction"
   - Ou utilisez les credentials de la base de données directement

2. **Ajoutez dans `.env.local`:**
   ```env
   SUPABASE_DB_HOST=db.xxxxx.supabase.co
   SUPABASE_DB_PASSWORD=votre_mot_de_passe_service_role
   SUPABASE_DB_USER=postgres
   SUPABASE_DB_NAME=postgres
   SUPABASE_DB_PORT=5432
   ```

3. **Installez le package `pg`:**
   ```bash
   pnpm add pg
   ```

4. **Exécutez le script:**
   ```bash
   node scripts/setup-storage-complete.js
   ```

Le script utilisera les credentials du service role pour créer les politiques automatiquement.

## 📝 Notes Importantes

- Les politiques RLS sont nécessaires même si le bucket est public
- L'API admin utilise `SUPABASE_SERVICE_ROLE_KEY` qui bypass RLS par défaut
- Les utilisateurs authentifiés peuvent uploader grâce aux politiques ci-dessus
- Le bucket doit être marqué comme **public** pour que les fichiers soient accessibles publiquement

## 🆘 Dépannage

### Les politiques ne s'affichent pas

- Vérifiez que vous avez créé les politiques pour le bon bucket ("ebooks")
- Vérifiez que les politiques sont activées (elles devraient l'être par défaut)

### Les fichiers ne sont pas accessibles

- Vérifiez que le bucket est marqué comme **public**
- Vérifiez que la politique de lecture publique est créée
- Vérifiez que les URLs des fichiers sont correctes

### Erreur lors de l'upload

- Vérifiez que les politiques d'upload, update et delete sont créées
- Vérifiez que l'utilisateur est authentifié
- Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est correctement configurée dans `.env.local`
