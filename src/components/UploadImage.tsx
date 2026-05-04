import { ChangeEvent, useRef, useState } from 'react'
import { ImageUp } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

interface UploadImageProps {
  contentKey: string
  label?: string
  className?: string
}

export function UploadImage({ contentKey, label = 'Upload image', className }: UploadImageProps) {
  const queryClient = useQueryClient()
  const { isAdmin } = useAuth()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isAdmin) {
    return null
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    setIsUploading(true)
    setError(null)

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath = `${contentKey}/${Date.now()}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (uploadError) {
      setIsUploading(false)
      setError(uploadError.message)
      event.target.value = ''
      return
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath)

    const { error: saveError } = await supabase
      .from('site_content')
      .upsert(
        {
          key: contentKey,
          value: data.publicUrl,
          type: 'image',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      )

    setIsUploading(false)
    event.target.value = ''

    if (saveError) {
      setError(saveError.message)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['site-content'] })
  }

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="gap-2 shadow-lg"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <ImageUp className="h-4 w-4" />
        {isUploading ? 'Uploading...' : label}
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </span>
  )
}
