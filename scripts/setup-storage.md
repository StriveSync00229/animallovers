# Configuration de Supabase Storage pour les Ebooks

## Étapes pour créer le bucket "ebooks" dans Supabase

1. **Connectez-vous à votre dashboard Supabase**
   - Allez sur https://app.supabase.com
   - Sélectionnez votre projet

2. **Accédez à Storage**
   - Dans le menu latéral, cliquez sur "Storage"
   - Cliquez sur "New bucket"

3. **Créez le bucket "ebooks"**
   - **Name**: `ebooks`
   - **Public bucket**: ✅ Cochez cette option (pour permettre l'accès public aux fichiers)
   - **File size limit**: 50 MB (ou plus selon vos besoins)
   - **Allowed MIME types**: 
     - Pour les images: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`
     - Pour les PDFs: `application/pdf`
   - Cliquez sur "Create bucket"

4. **Configurez les politiques de sécurité (RLS)**
   - Cliquez sur le bucket "ebooks"
   - Allez dans l'onglet "Policies"
   - Créez une politique pour permettre l'upload (si nécessaire):
     ```sql
     -- Politique pour permettre l'upload aux administrateurs
     CREATE POLICY "Allow uploads for authenticated users"
     ON storage.objects
     FOR INSERT
     TO authenticated
     WITH CHECK (bucket_id = 'ebooks');

     -- Politique pour permettre la lecture publique
     CREATE POLICY "Allow public read access"
     ON storage.objects
     FOR SELECT
     TO public
     USING (bucket_id = 'ebooks');
     ```

5. **Vérifiez les variables d'environnement**
   - Assurez-vous que `SUPABASE_SERVICE_ROLE_KEY` est définie dans votre fichier `.env.local`
   - Cette clé est nécessaire pour l'upload via l'API admin

## Structure des dossiers

Les fichiers seront organisés comme suit dans le bucket:
```
ebooks/
  ├── ebooks/images/  (images de couverture)
  └── ebooks/pdfs/    (fichiers PDF)
```

## Test de l'upload

Une fois le bucket créé, vous pouvez tester l'upload en créant un ebook depuis le dashboard admin.
Les fichiers seront automatiquement uploadés vers Supabase Storage et les URLs seront stockées dans la base de données.

