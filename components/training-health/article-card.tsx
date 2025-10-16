"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  // Tags optionnels: attend un tableau de chaînes, défaut géré à l'affichage
  tags?: string[];
  date?: string;
  slug?: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-52">
        <Image
          src={article.image || "/placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-5">
        {(() => {
          const tags = Array.isArray(article?.tags) ? article.tags : []
          if (tags.length === 0) return null
          return (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">#{tag}</Badge>
              ))}
            </div>
          )
        })()}

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {article.excerpt}
        </p>

        <Link
          href={`/training-health/${article.slug || article.id}`}
          className="text-green-600 text-sm font-medium hover:underline"
        >
          Lire l’article →
        </Link>
      </CardContent>
    </Card>
  );
}
