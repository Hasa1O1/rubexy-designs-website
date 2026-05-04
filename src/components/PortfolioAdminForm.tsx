import { ChangeEvent, FormEvent, useState } from 'react'
import { ImageUp, Plus } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export function PortfolioAdminForm() {
  const queryClient = useQueryClient()
  const { isAdmin } = useAuth()
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isAdmin) {
    return null
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!title.trim() || !file) {
      setError('Add a title and image before saving.')
      return
    }

    setIsSaving(true)

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath = `portfolio/${Date.now()}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (uploadError) {
      setIsSaving(false)
      setError(uploadError.message)
      return
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath)

    const { error: insertError } = await supabase
      .from('portfolio_items')
      .insert({
        title: title.trim(),
        image_url: data.publicUrl,
      })

    setIsSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setTitle('')
    setFile(null)
    event.currentTarget.reset()
    await queryClient.invalidateQueries({ queryKey: ['portfolio-items'] })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-md border border-orange-200 bg-orange-50 p-4">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <div className="space-y-2">
          <Label htmlFor="portfolio-title">Portfolio title</Label>
          <Input
            id="portfolio-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Project title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio-image">Image</Label>
          <Input id="portfolio-image" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <Button type="submit" className="gap-2" disabled={isSaving}>
          {isSaving ? (
            <>
              <ImageUp className="h-4 w-4" />
              Uploading...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add item
            </>
          )}
        </Button>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </form>
  )
}
