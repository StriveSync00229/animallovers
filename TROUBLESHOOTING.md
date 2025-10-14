# Guide de dépannage - Page d'administration des articles

## Problème
La page `/admin/articles` n'affiche pas les articles disponibles dans la table `articles`.

## Solutions possibles

### 1. Vérifier la configuration Supabase

#### Étape 1 : Vérifier les variables d'environnement
Créez un fichier `.env.local` à la racine du projet avec vos clés Supabase :

\`\`\`bash
# Copiez le fichier d'exemple
cp .env.local.example .env.local

# Éditez le fichier avec vos vraies clés
nano .env.local
\`\`\`

#### Étape 2 : Tester la connexion
Visitez `/api/test-connection` dans votre navigateur pour vérifier :
- Les variables d'environnement sont définies
- La connexion à Supabase fonctionne
- Les tables existent et contiennent des données

### 2. Insérer des données de test

Si la base de données est vide, insérez des données de test :

\`\`\`bash
# Installer les dépendances si nécessaire
npm install

# Insérer les données de test
npm run seed
\`\`\`

### 3. Vérifier la structure de la base de données

Assurez-vous que les tables suivantes existent :
- `articles`
- `article_categories`
- `users`

Exécutez les scripts SQL dans l'ordre :
1. `scripts/create-database-schema.sql`
2. `scripts/create-articles-schema.sql`
3. `scripts/seed-sample-data.sql`
4. `scripts/seed-articles-data.sql`

### 4. Vérifier les logs

#### Dans la console du navigateur
Ouvrez les outils de développement (F12) et regardez :
- Les erreurs JavaScript
- Les requêtes réseau vers `/api/admin/articles`

#### Dans la console du serveur
Regardez les logs du serveur Next.js pour voir :
- Les erreurs de connexion à Supabase
- Les erreurs dans les API routes

### 5. Tester l'API directement

Testez l'API directement dans votre navigateur :
\`\`\`
http://localhost:3000/api/admin/articles
\`\`\`

Vous devriez voir une réponse JSON avec les articles.

### 6. Vérifier les permissions Supabase

Assurez-vous que :
- La clé de service a les permissions nécessaires
- Les politiques RLS (Row Level Security) permettent la lecture
- Les tables sont accessibles en lecture

### 7. Problèmes courants

#### Erreur "Failed to fetch articles"
- Vérifiez les variables d'environnement
- Vérifiez la connexion internet
- Vérifiez les permissions Supabase

#### Page blanche ou erreur 500
- Vérifiez les logs du serveur
- Vérifiez la syntaxe des requêtes SQL
- Vérifiez les types TypeScript

#### Articles vides mais pas d'erreur
- Vérifiez que les données existent dans la base
- Vérifiez les filtres appliqués
- Vérifiez les relations entre tables

## Commandes utiles

\`\`\`bash
# Démarrer le serveur de développement
npm run dev

# Tester la connexion
curl http://localhost:3000/api/test-connection

# Insérer des données de test
npm run seed

# Vérifier les logs
npm run dev 2>&1 | grep -i error
\`\`\`

## Structure attendue des données

### Table `articles`
\`\`\`sql
- id (uuid, primary key)
- title (varchar)
- slug (varchar, unique)
- excerpt (text)
- content (text)
- category_id (uuid, foreign key)
- is_published (boolean)
- created_at (timestamp)
- updated_at (timestamp)
\`\`\`

### Table `article_categories`
\`\`\`sql
- id (uuid, primary key)
- name (varchar)
- slug (varchar)
- color (varchar)
- is_active (boolean)
\`\`\`

### Relations
- `articles.category_id` → `article_categories.id`
- `articles.author_id` → `users.id` (optionnel)

## Support

Si le problème persiste :
1. Vérifiez les logs complets
2. Testez avec des données minimales
3. Vérifiez la configuration Supabase
4. Consultez la documentation Supabase
