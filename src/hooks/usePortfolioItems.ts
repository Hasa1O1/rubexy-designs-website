import { useQuery } from '@tanstack/react-query'
import type { PortfolioItem } from '@/components/PortfolioGrid'
import { supabase } from '@/lib/supabase'

interface PortfolioItemRow {
  id: string
  title: string
  image_url: string
  created_at: string
}

export function usePortfolioItems() {
  return useQuery({
    queryKey: ['portfolio-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('id,title,image_url,created_at')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return ((data ?? []) as PortfolioItemRow[]).map((item): PortfolioItem => ({
        id: item.id,
        title: item.title,
        category: 'Portfolio',
        description: 'Rubexy Designs project',
        imageUrl: item.image_url,
        year: new Date(item.created_at).getFullYear(),
      }))
    },
  })
}
