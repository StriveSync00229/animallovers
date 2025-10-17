"use client"
import Link from "next/link"
import { Heart, Mail} from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-rose-500" />
              <span className="text-lg font-bold">AnimalLovers</span>
            </div>
            <p className="text-sm text-gray-600">
              Promouvoir l'importance des chiens et des chats dans la vie humaine, en valorisant leur affection, leur
              loyauté, et leur rôle positif sur la santé mentale et émotionnelle.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-rose-500 hover:text-rose-600">
                <span className="w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Facebook">
                    <path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.1 5.66 21.22 10.4 22v-6.99H7.9v-3.01h2.5V9.41c0-2.47 1.47-3.82 3.72-3.82 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.22 0-1.6.76-1.6 1.54v1.86h2.72l-.44 3.01h-2.28V22c4.74-.78 8.54-4.9 8.54-9.93z"/>
                  </svg>
                </span>
              </Link>
              <Link href="#" className="text-rose-500 hover:text-rose-600">
                <span className="w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="TikTok">
                    <path fill="currentColor" d="M12.65 2h2.72c.18 1.02.65 1.98 1.35 2.78.86.96 2.04 1.53 3.33 1.6v2.8a6.53 6.53 0 0 1-3.68-1.09v7.47a6.98 6.98 0 1 1-7.98-6.94v2.88a4.15 4.15 0 1 0 3.05 3.99V2Z"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="text-sm text-gray-600 hover:text-rose-500">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-sm text-gray-600 hover:text-rose-500">
                  Produits recommandés
                </Link>
              </li>
              <li>
                <Link href="/dressage-sante" className="text-sm text-gray-600 hover:text-rose-500">
                  Dressage & Santé
                </Link>
              </li>
              <li>
                <Link href="/faire-un-don" className="text-sm text-gray-600 hover:text-rose-500">
                  Faire un don
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-sm text-gray-600 hover:text-rose-500">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-sm text-gray-600 hover:text-rose-500">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions-utilisation" className="text-sm text-gray-600 hover:text-rose-500">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-rose-500">
                  Gestion des cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-rose-500" />
                <span className="text-sm text-gray-600">contact@animallovers.club</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} AnimalLovers. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
