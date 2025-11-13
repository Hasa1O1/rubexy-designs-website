import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  imageUrl?: string
  images?: string[]
  client?: string
  year: number
}

interface PortfolioGridProps {
  items: PortfolioItem[]
  showFilters?: boolean
}

/**
 * Portfolio grid with category filtering
 * Displays portfolio items in a responsive grid with optional category filters
 */
export function PortfolioGrid({ items, showFilters = true }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category)))]

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}
    </div>
  )
}

interface PortfolioCardProps {
  item: PortfolioItem
}

function PortfolioCard({ item }: PortfolioCardProps) {
  const images =
    item.images && item.images.length > 0
      ? item.images
      : item.imageUrl
      ? [item.imageUrl]
      : []

  const [currentImage, setCurrentImage] = useState(0)
  const hasMultipleImages = images.length > 1

  const showPrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const showNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-xl group">
      {/* Image slider */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {images.map((src, index) => (
          <img
            key={`${item.id}-${index}`}
            src={src}
            alt={`${item.title} - view ${index + 1}`}
            loading="lazy"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out',
              index === currentImage
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            )}
          />
        ))}

        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Navigation controls */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1">
              {images.map((_, index) => (
                <button
                  key={`dot-${item.id}-${index}`}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    goToImage(index)
                  }}
                  className={cn(
                    'h-1.5 w-6 rounded-full transition-all',
                    index === currentImage ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">
            {item.category}
          </span>
          <span className="text-xs text-muted-foreground">{item.year}</span>
        </div>
        <CardTitle className="line-clamp-1 font-brand text-lg">{item.title}</CardTitle>
        {item.client && <CardDescription>Client: {item.client}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground font-brand">{item.description}</p>
      </CardContent>
    </Card>
  )
}

