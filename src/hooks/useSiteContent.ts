import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

type SiteContentType = 'text' | 'image'

interface SiteContentRow {
  key: string
  value: string
  type: SiteContentType
}

export function useSiteContent() {
  return useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('key,value,type')

      if (error) {
        throw error
      }

      return (data ?? []) as SiteContentRow[]
    },
  })
}

export function useContentValue(key: string, fallback: string) {
  const { data } = useSiteContent()

  return useMemo(() => {
    const row = data?.find((item) => item.key === key)
    return row?.value || fallback
  }, [data, fallback, key])
}
