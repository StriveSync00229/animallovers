import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function getAuthUser() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      return null
    }
    
    return user
  } catch (error) {
    console.error("Erreur lors de la création du client Supabase:", error)
    return null
  }
}

export async function getSession() {
  try {
    const supabase = await createClient()
    
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error("Erreur lors de la récupération de la session:", error)
      return null
    }
    
    return session
  } catch (error) {
    console.error("Erreur lors de la création du client Supabase:", error)
    return null
  }
}
