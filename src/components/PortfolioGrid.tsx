import { useEffect, useState, type MouseEvent } from 'react'
import { ChevronLeft, ChevronRight, Edit3, Save, X } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
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
  items?: PortfolioItem[]
  showFilters?: boolean
}

/**
 * Portfolio grid with category filtering
 * Displays portfolio items in a responsive grid with optional category filters
 */
export function PortfolioGrid({ items = [], showFilters = true }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category)))]
  const filteredItems =
    selectedCategory === 'all' ? items : items.filter((item) => item.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <div className="flex flex-wrap gap-2">
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

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const { isAdmin } = useAuth()
  const queryClient = useQueryClient()
  const [currentImage, setCurrentImage] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [category, setCategory] = useState(item.category)
  const [description, setDescription] = useState(item.description)
  const [client, setClient] = useState(item.client || '')
  const [imageUrl, setImageUrl] = useState(item.imageUrl ?? item.images?.[0] ?? '')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    setTitle(item.title)
    setCategory(item.category)
    setDescription(item.description)
    setClient(item.client || '')
    setImageUrl(item.imageUrl ?? item.images?.[0] ?? '')
  }, [item])

  const imageSources = item.images && item.images.length > 0 ? item.images : imageUrl ? [imageUrl] : []
  const hasMultipleImages = imageSources.length > 1

  const showPrevious = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setCurrentImage((prev) => (prev - 1 + imageSources.length) % imageSources.length)
  }

  const showNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setCurrentImage((prev) => (prev + 1) % imageSources.length)
  }

  const goToImage = (index: number) => {
    setCurrentImage(index)
  }

  const parseMissingColumn = (message: string | undefined): string | undefined => {
    if (!message) return undefined
    const regex1 = /column .*?\.?"?([a-zA-Z0-9_]+)"? does not exist/i
    const regex2 = /Could not find the '(.+?)' column/i
    return regex1.exec(message)?.[1] ?? regex2.exec(message)?.[1]
  }

  async function handleSave() {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    if (!title.trim()) {
      setError('Title is required.')
      setIsSaving(false)
      return
    }

    try {
      let updatedImageUrl: string | undefined

      if (uploadFile) {
        const safeName = uploadFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const filePath = `portfolio/${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, uploadFile, {
            cacheControl: '3600',
            upsert: true,
          })

        if (uploadError) {
          throw uploadError
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath)
        updatedImageUrl = data.publicUrl
      }

      const payload: Record<string, unknown> = {
        title: title.trim(),
        description: description.trim() || null,
        client: client.trim() || null,
      }

      if (category.trim()) {
        payload.category = category.trim()
      }

      if (updatedImageUrl) {
        payload.image_url = updatedImageUrl
      }

      let updatePayload = { ...payload }

      while (true) {
        const { error: updateError } = await supabase
          .from('portfolio_items')
          .update(updatePayload)
          .eq('id', item.id)
          .select()

        if (!updateError) {
          break
        }

        const missingColumn = parseMissingColumn(updateError.message)
        if (!missingColumn || !(missingColumn in updatePayload)) {
          throw updateError
        }

        delete updatePayload[missingColumn]
      }

      queryClient.setQueryData<PortfolioItem[]>(['portfolio-items'], (currentData = []) =>
        (Array.isArray(currentData) ? currentData : []).map((existing) =>
          existing.id === item.id
            ? {
                ...existing,
                title: title.trim(),
                category: category.trim() || existing.category,
                description: description.trim() || existing.description,
                client: client.trim() || existing.client,
                imageUrl: updatedImageUrl || existing.imageUrl,
                images: updatedImageUrl ? [updatedImageUrl] : existing.images,
              }
            : existing
        )
      )

      if (updatedImageUrl) {
        setImageUrl(updatedImageUrl)
      }

      setSuccess('Portfolio item updated successfully.')
      setUploadFile(null)
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save changes.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-xl group">
      {/* Image slider */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {imageSources.map((src, index) => (
          <img
            key={`${item.id}-${index}`}
            src={src}
            alt={`${item.title} - view ${index + 1}`}
            loading="lazy"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out',
              index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
          />
        ))}

        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

        {isAdmin && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={isEditing ? 'secondary' : 'outline'}
              className="bg-white/90 text-gray-900 shadow-sm"
              onClick={() => {
                setIsEditing((value) => !value)
                setError(null)
                setSuccess(null)
              }}
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            </Button>
          </div>
        )}

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

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1">
              {imageSources.map((_, index) => (
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

      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">{item.category}</span>
          <span className="text-xs text-muted-foreground">{item.year}</span>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor={`title-${item.id}`}>Title</Label>
                <Input
                  id={`title-${item.id}`}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`category-${item.id}`}>Category</Label>
                <Input
                  id={`category-${item.id}`}
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`client-${item.id}`}>Client</Label>
                <Input
                  id={`client-${item.id}`}
                  value={client}
                  onChange={(event) => setClient(event.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`description-${item.id}`}>Description</Label>
                <Textarea
                  id={`description-${item.id}`}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`image-${item.id}`}>Replace image</Label>
                <Input
                  id={`image-${item.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button type="button" size="sm" variant="secondary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <span>Saving...</span> : <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Save</span>}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setTitle(item.title)
                  setCategory(item.category)
                  setDescription(item.description)
                  setClient(item.client || '')
                  setUploadFile(null)
                  setError(null)
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-success">{success}</p>}
          </div>
        ) : (
          <>
            <CardTitle className="line-clamp-1 font-brand text-lg">{item.title}</CardTitle>
            {item.client && <CardDescription>Client: {item.client}</CardDescription>}
          </>
        )}
      </CardHeader>

      {!isEditing && (
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground font-brand">{item.description}</p>
        </CardContent>
      )}
    </Card>
  )
}
