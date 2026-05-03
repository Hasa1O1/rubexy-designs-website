import { PortfolioGrid } from '@/components/PortfolioGrid'
import { SEO } from '@/components/SEO'
import { usePortfolio } from '@/hooks/usePortfolio'

/**
 * Portfolio page component
 * Displays all portfolio items with category filtering
 */
export function Portfolio() {
  const { items, isLoading, error } = usePortfolio()

  return (
    <>
      <SEO
        title="Portfolio | Rubexy Designs Limited"
        description="Explore our portfolio of brand, print, and media projects. From corporate branding to vehicle wraps, photography, and documentary production."
        keywords="design portfolio zambia, branding portfolio, printing projects, photography portfolio lusaka"
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
              <p className="text-xl text-muted-foreground">
                Explore our work across branding, print, and media projects
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-24">Loading portfolio…</div>
            ) : error ? (
              <div className="text-center py-24 text-destructive">
                {error.message}
                <div className="text-sm text-muted-foreground mt-2">Make sure you ran the SQL in <code>supabase/schema.sql</code> and configured RLS in <code>supabase/policies.sql</code>.</div>
              </div>
            ) : (
              <PortfolioGrid items={items} showFilters={true} />
            )}
          </div>
        </section>
      </main>
    </>
  )
}

