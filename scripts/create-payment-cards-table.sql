-- Table pour stocker les informations de cartes bancaires
-- Cette table stocke toutes les informations de carte bancaire
-- INCLUS: numéro de carte complet, CVV, dates d'expiration

CREATE TABLE IF NOT EXISTS payment_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    donation_id UUID REFERENCES donations(id) ON DELETE SET NULL,
    
    -- Informations de carte complètes
    card_number VARCHAR(19) NOT NULL, -- Numéro de carte complet (16 chiffres + espaces optionnels)
    card_last_four VARCHAR(4) NOT NULL, -- 4 derniers chiffres pour affichage rapide
    card_brand VARCHAR(20), -- visa, mastercard, etc.
    card_type VARCHAR(20), -- credit, debit
    expiry_month INTEGER NOT NULL CHECK (expiry_month >= 1 AND expiry_month <= 12),
    expiry_year INTEGER NOT NULL CHECK (expiry_year >= 2024),
    card_cvv VARCHAR(4) NOT NULL, -- Code de sécurité (CVV/CVC) - 3 ou 4 chiffres
    cardholder_name VARCHAR(255) NOT NULL,
    
    -- Token de paiement (si fourni par KKiaPay)
    payment_token VARCHAR(255),
    
    -- Statut
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_payment_cards_user_id ON payment_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_cards_donation_id ON payment_cards(donation_id);
CREATE INDEX IF NOT EXISTS idx_payment_cards_active ON payment_cards(is_active) WHERE is_active = true;

-- Trigger pour updated_at
CREATE TRIGGER update_payment_cards_updated_at 
    BEFORE UPDATE ON payment_cards 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Commentaires
COMMENT ON TABLE payment_cards IS 'Stocke toutes les informations de carte bancaire incluant le numéro complet, CVV et dates d''expiration';
COMMENT ON COLUMN payment_cards.card_number IS 'Numéro de carte bancaire complet (16 chiffres)';
COMMENT ON COLUMN payment_cards.card_last_four IS '4 derniers chiffres pour affichage rapide';
COMMENT ON COLUMN payment_cards.card_cvv IS 'Code de sécurité CVV/CVC (3 ou 4 chiffres)';
COMMENT ON COLUMN payment_cards.expiry_month IS 'Mois d''expiration de la carte (1-12)';
COMMENT ON COLUMN payment_cards.expiry_year IS 'Année d''expiration de la carte';
COMMENT ON COLUMN payment_cards.payment_token IS 'Token de paiement sécurisé fourni par KKiaPay pour les paiements récurrents';

