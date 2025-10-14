# Résolution du problème d'affichage des articles

## Problème identifié
La page `/admin/articles` n'affiche pas les articles disponibles dans la table `articles` de Supabase.

## Solution étape par étape

### 1. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

\`\`\`bash
# Copiez le fichier d'exemple
cp .env.local.example .env.local
\`\`\`

Éditez le fichier `.env.local` avec vos vraies clés Supabase :

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anonyme
SUPABASE_SERVICE_ROLE_KEY=votre-clé-de-service
\`\`\`

### 2. Vérification de la base de données

#### Option A : Utiliser les scripts SQL existants
Exécutez les scripts dans l'ordre :

\`\`\`sql
-- 1. Créer la structure de base
\i scripts/create-database-schema.sql

-- 2. Créer les tables d'articles
\i scripts/create-articles-schema.sql

-- 3. Insérer les données de base
\i scripts/seed-sample-data.sql

-- 4. Insérer les articles de test
\i scripts/seed-articles-data.sql
\`\`\`

#### Option B : Utiliser le script Node.js
\`\`\`bash
# Installer les dépendances
npm install

# Insérer les données de test
npm run seed
\`\`\`

### 3. Test de la connexion

#### Via l'interface web
1. Démarrez le serveur : `npm run dev`
2. Allez sur `http://localhost:3000/admin/articles`
3. Cliquez sur "Tester la connexion"
4. Vérifiez les messages dans la console

#### Via l'API directement
Visitez `http://localhost:3000/api/test-connection` dans votre navigateur.

### 4. Diagnostic des problèmes

#### Si vous obtenez une erreur de variables d'environnement :
- Vérifiez que le fichier `.env.local` existe
- Vérifiez que les clés sont correctes
- Redémarrez le serveur après modification

#### Si vous obtenez une erreur de connexion Supabase :
- Vérifiez votre connexion internet
- Vérifiez que l'URL Supabase est correcte
- Vérifiez que les clés sont valides

#### Si vous obtenez une erreur de table inexistante :
- Exécutez les scripts SQL pour créer les tables
- Vérifiez que vous êtes connecté au bon projet Supabase

#### Si les tables existent mais sont vides :
- Exécutez le script de données de test : `npm run seed`
- Vérifiez que les données ont été insérées

### 5. Vérification des logs

#### Dans la console du navigateur (F12) :
- Regardez les erreurs JavaScript
- Vérifiez les requêtes réseau vers `/api/admin/articles`

#### Dans la console du serveur :
- Regardez les logs de débogage ajoutés
- Vérifiez les erreurs de connexion à Supabase

### 6. Structure attendue des données

#### Table `articles` :
\`\`\`sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category_id UUID REFERENCES article_categories(id),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### Table `article_categories` :
\`\`\`sql
CREATE TABLE article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  color VARCHAR(7),
  is_active BOOLEAN DEFAULT TRUE
);
\`\`\`

### 7. Commandes utiles

\`\`\`bash
# Démarrer le serveur
npm run dev

# Tester la connexion
curl http://localhost:3000/api/test-connection

# Insérer des données de test
npm run seed

# Vérifier les logs d'erreur
npm run dev 2>&1 | grep -i error
\`\`\`

### 8. Problèmes courants et solutions

#### "Variables d'environnement manquantes"
\`\`\`bash
# Vérifiez que le fichier existe
ls -la .env.local

# Vérifiez le contenu (sans afficher les clés)
grep -v KEY .env.local
\`\`\`

#### "Table articles does not exist"
\`\`\`bash
# Connectez-vous à votre base Supabase et exécutez :
\i scripts/create-articles-schema.sql
\`\`\`

#### "No articles found"
\`\`\`bash
# Insérez des données de test
npm run seed
\`\`\`

#### "Connection refused"
- Vérifiez votre connexion internet
- Vérifiez que l'URL Supabase est correcte
- Vérifiez que votre projet Supabase est actif

### 9. Support

Si le problème persiste :

1. **Vérifiez les logs complets** dans la console du serveur
2. **Testez l'API directement** : `http://localhost:3000/api/test-connection`
3. **Vérifiez la configuration Supabase** dans votre dashboard
4. **Consultez la documentation Supabase** pour les problèmes de connexion

### 10. Améliorations apportées

- ✅ Ajout de logs de débogage détaillés
- ✅ Gestion d'erreurs améliorée dans l'interface
- ✅ Bouton de test de connexion
- ✅ Script d'insertion de données de test
- ✅ Route API de test de connexion
- ✅ Messages d'erreur plus informatifs

Ces améliorations permettent de diagnostiquer rapidement les problèmes de connexion et d'affichage des articles.
