import { IconImage } from '@/assets/icons/IconImage'
import { useEffect, useRef, useState } from 'react'

type LazyImageProps = {
  src: string
  alt?: string
  className?: string
  skeletonClassName?: string
}

export function LazyImage({
  src,
  alt = '',
  className = '',
  skeletonClassName = '',
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && (
        <div
          className={`absolute inset-0 flex items-center justify-center animate-pulse bg-gray-300 ${skeletonClassName}`}
        ><IconImage /></div>
      )}

      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {!isInView && <div ref={imgRef} className="h-full w-full" />}
    </div>
  )
}
