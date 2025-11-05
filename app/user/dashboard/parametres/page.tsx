"use client"

import { useState } from "react"
import { Settings, User, CreditCard, Bell, Shield, Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function UserParametresPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "payment" | "notifications" | "security">("profile")
  const [showPassword, setShowPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "user@animallovers.fr",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la Paix, 75001 Paris",
    birthdate: "1990-01-15",
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: "**** **** **** 1234",
    cardHolder: "JEAN DUPONT",
    expiryDate: "12/25",
    cvv: "***",
  })

  const [notifications, setNotifications] = useState({
    emailNewsletter: true,
    emailPromotions: true,
    emailOrders: true,
    pushNotifications: false,
    smsNotifications: false,
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSaveProfile = () => {
    alert("Profil mis à jour avec succès !")
  }

  const handleSavePayment = () => {
    alert("Informations de paiement mises à jour !")
  }

  const handleSaveNotifications = () => {
    alert("Préférences de notifications enregistrées !")
  }

  const handleChangePassword = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !")
      return
    }
    alert("Mot de passe modifié avec succès !")
    setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gray-100 rounded-lg">
          <Settings className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="p-4 h-fit">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "profile" ? "bg-red-600 text-white" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profil</span>
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "payment" ? "bg-red-600 text-white" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Paiement</span>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "notifications" ? "bg-red-600 text-white" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "security" ? "bg-red-600 text-white" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium">Sécurité</span>
            </button>
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card className="p-6 animate-fadeInUp">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <Input
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                  <Input
                    type="date"
                    value={profileData.birthdate}
                    onChange={(e) => setProfileData({ ...profileData, birthdate: e.target.value })}
                  />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer les modifications
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card className="p-6 animate-fadeInUp">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations de paiement</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de carte</label>
                  <Input
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titulaire de la carte</label>
                  <Input
                    value={paymentData.cardHolder}
                    onChange={(e) => setPaymentData({ ...paymentData, cardHolder: e.target.value })}
                    placeholder="NOM PRÉNOM"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration</label>
                    <Input
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <Input
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Vos informations de paiement sont sécurisées et cryptées
                  </p>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleSavePayment}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer les informations
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className="p-6 animate-fadeInUp">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de notifications</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Newsletter</p>
                    <p className="text-sm text-gray-600">Recevez nos actualités et conseils</p>
                  </div>
                  <Switch
                    checked={notifications.emailNewsletter}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNewsletter: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Promotions</p>
                    <p className="text-sm text-gray-600">Offres spéciales et réductions</p>
                  </div>
                  <Switch
                    checked={notifications.emailPromotions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailPromotions: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Commandes</p>
                    <p className="text-sm text-gray-600">Suivi de vos commandes et livraisons</p>
                  </div>
                  <Switch
                    checked={notifications.emailOrders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailOrders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notifications push</p>
                    <p className="text-sm text-gray-600">Alertes sur votre navigateur</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">SMS</p>
                    <p className="text-sm text-gray-600">Notifications par message texte</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                  />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleSaveNotifications}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer les préférences
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="p-6 animate-fadeInUp">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sécurité du compte</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      placeholder="Entrez votre mot de passe actuel"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                  <Input
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    placeholder="Entrez un nouveau mot de passe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                  <Input
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                    placeholder="Confirmez le nouveau mot de passe"
                  />
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.
                  </p>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleChangePassword}>
                  <Shield className="w-4 h-4 mr-2" />
                  Modifier le mot de passe
                </Button>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-4">Authentification à deux facteurs</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">2FA désactivée</p>
                      <p className="text-sm text-gray-600">Ajoutez une couche de sécurité supplémentaire</p>
                    </div>
                    <Button variant="outline">Activer</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
