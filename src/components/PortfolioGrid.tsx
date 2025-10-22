import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  imageUrl: string
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
  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))]

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory)

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
          <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-lg group">
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary">{item.category}</span>
                <span className="text-xs text-muted-foreground">{item.year}</span>
              </div>
              <CardTitle className="line-clamp-1">{item.title}</CardTitle>
              {item.client && (
                <CardDescription>Client: {item.client}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
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

