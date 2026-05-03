import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import supabase from '@/lib/supabase'
import { usePortfolio } from '@/hooks/usePortfolio'

export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  imageUrl?: string
  images?: string[] // storage object paths (e.g. "<id>/163...jpg")
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
  const { refetch } = usePortfolio()
  const { isAdmin } = useAuth()
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category)))]

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === 'all' ? items : items.filter((item) => item.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {isAdmin && (
            <Button
              onClick={() => setCreateOpen(true)}
              variant="outline"
              className="capitalize mr-2"
            >
              Create Card
            </Button>
          )}
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
          <PortfolioCard
            key={item.id}
            item={item}
            onUploaded={() => refetch()}
            isAdmin={isAdmin}
            onEdit={() => setEditingItem(item)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}

      <AdminEditModal
        item={editingItem}
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        onSaved={() => {
          setEditingItem(null)
          refetch()
        }}
      />
      <CreateCardModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => {
          setCreateOpen(false)
          refetch()
        }}
      />
    </div>
  )
}

interface PortfolioCardProps {
  item: PortfolioItem
  isAdmin?: boolean
  onUploaded?: () => void
  onEdit?: () => void
}

function toPublicUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return undefined
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  return supabase.storage.from('portfolio-images').getPublicUrl(pathOrUrl).data.publicUrl
}

function PortfolioCard({ item, isAdmin, onUploaded, onEdit }: PortfolioCardProps) {
  const imagesSrcs: string[] = (item.images && item.images.length > 0
    ? item.images.map((p) => toPublicUrl(p)).filter(Boolean) as string[]
    : item.imageUrl
    ? [item.imageUrl]
    : [])

  const [currentImage, setCurrentImage] = useState(0)
  const hasMultipleImages = imagesSrcs.length > 1
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const filePath = `${item.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '_')}`

      const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(filePath, file, { cacheControl: '3600', upsert: true })
      if (uploadError) throw uploadError

      // read current images array and append storage path
      const { data: current } = await supabase.from('portfolio').select('images').eq('id', item.id).single()
      const currentImages: string[] = (current?.images as string[]) ?? []
      const newImages = [...currentImages, filePath]

      const publicUrl = supabase.storage.from('portfolio-images').getPublicUrl(newImages[0]).data.publicUrl

      const { error: updateError } = await supabase.from('portfolio').update({ images: newImages, image_url: publicUrl }).eq('id', item.id)
      if (updateError) throw updateError

      setUploading(false)
      if (typeof onUploaded === 'function') onUploaded()
    } catch (err) {
      console.error('Upload error', err)
      setUploading(false)
      alert('Upload failed')
    }
  }

  function triggerUpload() {
    fileInputRef.current?.click()
  }

  const showPrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setCurrentImage((prev) => (prev - 1 + imagesSrcs.length) % imagesSrcs.length)
  }

  const showNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setCurrentImage((prev) => (prev + 1) % imagesSrcs.length)
  }

  const goToImage = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-xl group">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {/* Image slider */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {imagesSrcs.map((src, index) => (
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
              {imagesSrcs.map((_, index) => (
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
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">{item.category}</span>
          <span className="text-xs text-muted-foreground">{item.year}</span>
        </div>
        <CardTitle className="line-clamp-1 font-brand text-lg">{item.title}</CardTitle>
        {item.client && <CardDescription>Client: {item.client}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground font-brand">{item.description}</p>
      </CardContent>

      {isAdmin ? (
        <div className="p-4 pt-0">
          <div className="flex justify-between">
            <div>
              <Button onClick={triggerUpload} disabled={uploading} variant="outline" className="mr-2">
                {uploading ? 'Uploading…' : 'Upload Image'}
              </Button>
            </div>
            <div>
              <Button onClick={() => onEdit?.()} variant="ghost">
                Edit
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  )
}

// ----------------------
// Admin Edit Modal
// ----------------------
export function AdminEditModal({ item, open, onClose, onSaved }: { item: PortfolioItem | null; open: boolean; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [category, setCategory] = useState(item?.category ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [images, setImages] = useState<string[]>(item?.images ?? [])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setTitle(item?.title ?? '')
    setCategory(item?.category ?? '')
    setDescription(item?.description ?? '')
    setImages(item?.images ?? [])
  }, [item])

  if (!item) return null

  async function saveChanges() {
    setSaving(true)
    try {
      const { error } = await supabase.from('portfolio').update({ title, category, description, images }).eq('id', item.id)
      if (error) throw error
      setSaving(false)
      onSaved()
      onClose()
    } catch (err) {
      console.error(err)
      setSaving(false)
      alert('Save failed')
    }
  }

  async function handleDeleteImage(path: string) {
    try {
      const { error: delErr } = await supabase.storage.from('portfolio-images').remove([path])
      if (delErr) throw delErr

      const newImages = images.filter((p) => p !== path)
      setImages(newImages)
      const { error } = await supabase.from('portfolio').update({ images: newImages }).eq('id', item.id)
      if (error) throw error
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  async function handleAddFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    try {
      const uploadedPaths: string[] = []
      for (const file of files) {
        const filePath = `${item.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '_')}`
        const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(filePath, file, { upsert: false })
        if (uploadError) throw uploadError
        uploadedPaths.push(filePath)
      }
      const newImages = [...images, ...uploadedPaths]
      setImages(newImages)
      const { error } = await supabase.from('portfolio').update({ images: newImages }).eq('id', item.id)
      if (error) throw error
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    }
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? '' : 'pointer-events-none opacity-0'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Portfolio Item</h3>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm">Title</span>
            <input className="input mt-1 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm">Category</span>
            <input className="input mt-1 w-full" value={category} onChange={(e) => setCategory(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm">Description</span>
            <textarea className="textarea mt-1 w-full" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Images</h4>
              <div>
                <input id={`add-files-${item.id}`} type="file" accept="image/*" multiple onChange={handleAddFiles} className="hidden" />
                <label htmlFor={`add-files-${item.id}`}>
                  <Button variant="outline">Add Images</Button>
                </label>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {images.map((path) => {
                const url = supabase.storage.from('portfolio-images').getPublicUrl(path).data.publicUrl
                return (
                  <div key={path} className="relative">
                    <img src={url} alt={path} className="h-32 w-full object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(path)}
                      className="absolute top-1 right-1 rounded bg-white/80 p-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button onClick={saveChanges} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ----------------------
// Create Card Modal
// ----------------------
function CreateCardModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [client, setClient] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) {
      setTitle('')
      setCategory('')
      setDescription('')
      setClient('')
      setSaving(false)
    }
  }, [open])

  async function handleCreate() {
    if (!title.trim()) return alert('Please provide a title')
    setSaving(true)
    try {
      const newRow = {
        title: title.trim(),
        category: category.trim() || 'uncategorized',
        description: description.trim(),
        client: client.trim() || null,
      }
      const { error } = await supabase.from('portfolio').insert(newRow)
      if (error) throw error
      setSaving(false)
      onCreated()
    } catch (err) {
      console.error('Create failed', err)
      setSaving(false)
      alert('Create failed')
    }
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? '' : 'pointer-events-none opacity-0'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Create Portfolio Item</h3>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm">Title</span>
            <input className="input mt-1 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm">Category</span>
            <input className="input mt-1 w-full" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Vehicle Branding" />
          </label>
          <label className="block">
            <span className="text-sm">Client (optional)</span>
            <input className="input mt-1 w-full" value={client} onChange={(e) => setClient(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm">Description</span>
            <textarea className="textarea mt-1 w-full" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button onClick={handleCreate} disabled={saving}>{saving ? 'Creating…' : 'Create'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
