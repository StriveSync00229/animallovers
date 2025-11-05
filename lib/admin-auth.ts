// Utilitaire d'authentification côté client pour admin

export interface AdminAuth {
  id: string
  email: string
  name: string
  role?: string
}

const ADMIN_STORAGE_KEY = "animal-lovers-admin-auth"

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  try {
    const auth = localStorage.getItem(ADMIN_STORAGE_KEY)
    return Boolean(auth)
  } catch {
    return false
  }
}

export function setAdminAuth(auth: AdminAuth) {
  if (typeof window === "undefined") return
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(auth))
}

export function getAdminAuth(): AdminAuth | null {
  if (typeof window === "undefined") return null
  try {
    const auth = localStorage.getItem(ADMIN_STORAGE_KEY)
    return auth ? JSON.parse(auth) : null
  } catch {
    return null
  }
}

export function clearAdminAuth() {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
  } catch {
    // ignore
  }
}
