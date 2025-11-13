# Configuration KKiaPay pour les dons

Ce document explique comment configurer KKiaPay pour le système de dons.

## Variables d'environnement requises

Ajoutez les variables suivantes dans votre fichier `.env.local` :

```env
# Clé publique KKiaPay (obtenue depuis votre dashboard KKiaPay)
NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY=votre_cle_publique_kkiapay

# Clé privée KKiaPay (pour les appels API côté serveur)
# ⚠️ IMPORTANT: Ne jamais exposer cette clé côté client
NEXT_PRIVATE_KKIAPAY_PRIVATE_KEY=votre_cle_privee_kkiapay
# OU
KKIAPAY_SECRET=votre_cle_privee_kkiapay

# Mode sandbox (true pour les tests, false pour la production)
NEXT_PUBLIC_KKIAPAY_SANDBOX=true
```

## Configuration

1. **Créer un compte KKiaPay** : Rendez-vous sur [https://kkiapay.me](https://kkiapay.me) et créez un compte marchand.

2. **Obtenir votre clé API** :
   - Connectez-vous à votre dashboard KKiaPay
   - Allez dans la section "Paramètres" > "API Keys"
   - Copiez votre clé publique (Public Key)

3. **Mode Sandbox** :
   - Pour les tests, utilisez `NEXT_PUBLIC_KKIAPAY_SANDBOX=true`
   - En mode sandbox, vous pouvez utiliser les numéros de téléphone de test fournis par KKiaPay
   - Pour la production, utilisez `NEXT_PUBLIC_KKIAPAY_SANDBOX=false`

4. **Webhook (optionnel mais recommandé)** :
   - Dans votre dashboard KKiaPay, configurez l'URL du webhook : `https://votre-domaine.com/api/donations/kkiapay-callback`
   - Cela permet à KKiaPay de notifier votre serveur des transactions

## Fonctionnalités implémentées

### 1. Paiement par carte intégré (sans popup)
- Formulaire de carte bancaire intégré directement dans le site
- Pas de redirection vers un widget externe
- Traitement sécurisé via API KKiaPay côté serveur
- Support uniquement des paiements par carte bancaire

### 2. Stockage des données de carte
- Table `payment_cards` créée pour stocker toutes les informations de carte bancaire
- Numéro de carte complet stocké (16 chiffres)
- CVV stocké (3 ou 4 chiffres)
- Dates d'expiration complètes (mois et année)
- Nom du titulaire de la carte
- Support des tokens de paiement pour les paiements récurrents

### 3. Vérification des transactions
- Traitement côté serveur via `/api/donations/process-card-payment`
- Enregistrement automatique des dons dans la base de données
- Mise à jour automatique des montants des campagnes
- Enregistrement des informations de carte (partielles) pour référence

### 4. Suivi en temps réel
- Les statistiques de dons sont mises à jour en temps réel grâce à Supabase Realtime
- Les campagnes de dons affichent les montants collectés en temps réel
- Les composants `RealtimeDonationStats` et `RealtimeCampaignStats` sont disponibles

## Utilisation

### Dans le formulaire de don

Le formulaire de don (`components/donation/donation-form-section.tsx`) intègre un formulaire de carte bancaire complet. L'utilisateur saisit directement :
- **Nom du titulaire** : Nom tel qu'il apparaît sur la carte
- **Numéro de carte** : Formaté automatiquement avec des espaces (16 chiffres)
- **Date d'expiration** : Mois et année
- **CVV** : Code de sécurité à 3 ou 4 chiffres
- **Option d'enregistrement** : Pour sauvegarder la carte pour les prochains dons (toutes les informations sont stockées)

### Installation de la table de base de données

Exécutez le script SQL pour créer la table `payment_cards` :

```bash
# Via psql ou votre client SQL
psql -U votre_user -d votre_database -f scripts/create-payment-cards-table.sql
```

Ou exécutez directement le contenu du fichier `scripts/create-payment-cards-table.sql` dans votre base de données Supabase.

### Affichage des statistiques en temps réel

```tsx
import { RealtimeDonationStats } from "@/components/donation/realtime-donation-stats"
import { RealtimeCampaignStats } from "@/components/donation/realtime-campaign-stats"

// Statistiques globales
<RealtimeDonationStats />

// Statistiques d'une campagne spécifique
<RealtimeCampaignStats campaignId="id-de-la-campagne" />
```

## Sécurité

⚠️ **IMPORTANT - Sécurité des données de carte** : 

### Stockage des données
- **Toutes les informations de carte sont stockées** dans la base de données :
  - Numéro de carte complet (16 chiffres)
  - CVV (3 ou 4 chiffres)
  - Dates d'expiration (mois et année)
  - Nom du titulaire
- Les données sont transmises à KKiaPay via API sécurisée pour le traitement du paiement
- Les données sont également enregistrées localement dans la table `payment_cards`

### Bonnes pratiques de sécurité
- ✅ Ne jamais exposer votre clé privée KKiaPay côté client
- ✅ Toujours vérifier les transactions côté serveur
- ✅ Utiliser HTTPS en production (obligatoire pour les paiements)
- ✅ Valider les montants et les données avant de traiter un don
- ✅ Chiffrer la base de données au repos (recommandé)
- ✅ Limiter l'accès à la table `payment_cards` aux administrateurs uniquement
- ✅ Implémenter des logs d'audit pour les accès aux données de carte
- ✅ Utiliser des politiques RLS (Row Level Security) dans Supabase pour protéger les données

### Recommandations de sécurité
- 🔒 Chiffrer les colonnes sensibles dans la base de données
- 🔒 Implémenter un système de rotation des clés de chiffrement
- 🔒 Mettre en place des alertes pour les accès non autorisés
- 🔒 Effectuer des audits de sécurité réguliers
- 🔒 Respecter les réglementations locales sur la protection des données (RGPD, etc.)

## Support

Pour plus d'informations sur KKiaPay, consultez la documentation officielle :
- [Documentation KKiaPay](https://docs.kkiapay.me)
- [SDK Javascript](https://docs.kkiapay.me/v1/plugin-et-sdk/sdk-javascript)

