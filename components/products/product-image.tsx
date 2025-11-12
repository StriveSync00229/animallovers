"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ProductImageProps {
  src: string | null | undefined
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fallbackSrc?: string
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"

export default function ProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  fallbackSrc = DEFAULT_IMAGE,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(fallbackSrc)
  const [hasError, setHasError] = useState(false)

  // Mettre à jour l'image source quand src change
  useEffect(() => {
    if (src && src.trim() !== "") {
      setImgSrc(src)
      setHasError(false)
    } else {
      setImgSrc(fallbackSrc)
      setHasError(false)
    }
  }, [src, fallbackSrc])

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  // Vérifier si l'URL est valide
  const isValidUrl = (url: string) => {
    if (!url || url.trim() === "") return false
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Déterminer la source finale de l'image
  const finalSrc = isValidUrl(imgSrc) ? imgSrc : fallbackSrc

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized={true}
      />
    )
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width || 400}
      height={height || 400}
      className={className}
      onError={handleError}
      priority={priority}
      unoptimized={true}
    />
  )
}

