import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

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
              <Link href="#" className="text-gray-500 hover:text-rose-500">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-rose-500">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-rose-500">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-rose-500">
                <Youtube className="w-5 h-5" />
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
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-rose-500 shrink-0" />
                <span className="text-sm text-gray-600">123 Rue des Animaux, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-rose-500" />
                <span className="text-sm text-gray-600">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-rose-500" />
                <span className="text-sm text-gray-600">contact@animallovers.fr</span>
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
