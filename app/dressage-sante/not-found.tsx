import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <PawPrint className="w-16 h-16 mb-6 text-rose-300" />
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Article introuvable</h1>
      <p className="max-w-md mb-8 text-gray-600">
        L'article que vous recherchez n'existe pas ou a été déplacé. Veuillez vérifier l'URL ou explorer nos autres
        articles.
      </p>
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button asChild className="bg-rose-500 hover:bg-rose-600">
          <Link href="/dressage-sante">
            <Search className="w-5 h-5 mr-2" />
            Explorer les articles
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  )
}
