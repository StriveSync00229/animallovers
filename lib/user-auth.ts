// Utilitaire d'authentification côté client pour le dashboard utilisateur

export interface UserAuth {
  id: string
  email: string
  name: string
}

const STORAGE_KEY = "animal-lovers-user-auth"

// Vérifie si l'utilisateur est authentifié
export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  try {
    const auth = localStorage.getItem(STORAGE_KEY)
    return Boolean(auth)
  } catch {
    return false
  }
}

// Récupère les infos de l'utilisateur depuis localStorage
export function getUserAuth(): UserAuth | null {
  if (typeof window === "undefined") return null
  try {
    const auth = localStorage.getItem(STORAGE_KEY)
    return auth ? JSON.parse(auth) : null
  } catch {
    return null
  }
}

// Nettoie la session utilisateur (logout)
export function clearUserAuth() {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore error
  }
}

// Permet de simuler la connexion pour développement/tests
export function setUserAuth(auth: UserAuth) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
}
