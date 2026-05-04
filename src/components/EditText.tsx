import { ReactNode, useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import { useContentValue } from '@/hooks/useSiteContent'
import { supabase } from '@/lib/supabase'

interface EditTextProps {
  contentKey: string
  fallback: string
  multiline?: boolean
  render: (value: string) => ReactNode
}

export function EditText({ contentKey, fallback, multiline = false, render }: EditTextProps) {
  const queryClient = useQueryClient()
  const { isAdmin } = useAuth()
  const value = useContentValue(contentKey, fallback)
  const [draft, setDraft] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setDraft(value)
  }, [value])

  if (!isAdmin) {
    return <>{render(value)}</>
  }

  async function save() {
    setIsSaving(true)
    setError(null)

    const { error: saveError } = await supabase
      .from('site_content')
      .upsert(
        {
          key: contentKey,
          value: draft,
          type: 'text',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      )

    setIsSaving(false)

    if (saveError) {
      setError(saveError.message)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['site-content'] })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <span className="block rounded-md border border-orange-400 bg-white p-3 text-gray-900 shadow-lg">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={multiline ? 5 : 2}
          className="text-sm"
        />
        {error && <span className="mt-2 block text-sm text-destructive">{error}</span>}
        <span className="mt-3 flex justify-end gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setDraft(value)
              setIsEditing(false)
              setError(null)
            }}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="button" size="sm" onClick={save} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </span>
      </span>
    )
  }

  return (
    <span className="group relative inline-block">
      {render(value)}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="absolute -right-3 -top-3 h-8 w-8 rounded-full p-0 opacity-90 shadow-lg"
        onClick={() => setIsEditing(true)}
        aria-label={`Edit ${contentKey}`}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </span>
  )
}
