import { useQuery } from '@tanstack/react-query'
import supabase from '@/lib/supabase'

export interface PortfolioRow {
  id: string
  title: string
  description?: string
  image_url?: string
  created_at?: string
}

export function usePortfolio() {
  const query = useQuery<PortfolioRow[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false })
      if (error) {
        // Provide a friendlier error for common cases
        const message = String(error.message || error.details || error.code || 'Unknown error')
        if (/relation "portfolio" does not exist/i.test(message)) {
          throw new Error('Database table `portfolio` does not exist. Run the SQL in supabase/schema.sql')
        }
        if (/permission denied/i.test(message)) {
          throw new Error('Permission denied when reading `portfolio`. Check RLS policies and anon key permissions.')
        }
        throw error
      }
      return data ?? []
    },
  })

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  }
}
