# Ajouter les colonnes ebook à la table articles

## Problème
Si vous rencontrez l'erreur `Could not find the 'is_ebook' column of 'articles' in the schema cache`, cela signifie que les colonnes pour les ebooks n'ont pas encore été ajoutées à votre base de données.

## Solution

### Option 1 : Via l'interface Supabase (Recommandé)

1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**
3. Copiez et collez le contenu du fichier `scripts/add-ebook-fields.sql`
4. Cliquez sur **Run** pour exécuter le script

### Option 2 : Via psql (ligne de commande)

```bash
psql -h [VOTRE_HOST] -U [VOTRE_USER] -d [VOTRE_DATABASE] -f scripts/add-ebook-fields.sql
```

### Option 3 : Via l'API Supabase

Vous pouvez également exécuter le script via l'API REST de Supabase en utilisant le service role key.

## Contenu du script

Le script `add-ebook-fields.sql` ajoute les colonnes suivantes à la table `articles` :

- `pdf_url TEXT` - URL du fichier PDF de l'ebook
- `price DECIMAL(10,2)` - Prix de l'ebook
- `is_ebook BOOLEAN DEFAULT false` - Indicateur si l'article est un ebook

Il crée également des index pour améliorer les performances des requêtes sur les ebooks.

## Après l'exécution

Une fois le script exécuté, vous devrez peut-être redémarrer votre serveur Next.js pour que les changements soient pris en compte.

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez-le
npm run dev
```

## Vérification

Pour vérifier que les colonnes ont été ajoutées, vous pouvez exécuter cette requête dans Supabase SQL Editor :

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'articles' 
AND column_name IN ('is_ebook', 'pdf_url', 'price');
```

Vous devriez voir les trois colonnes listées.

