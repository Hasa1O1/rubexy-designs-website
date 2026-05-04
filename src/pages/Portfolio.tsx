import { PortfolioAdminForm } from '@/components/PortfolioAdminForm'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { SEO } from '@/components/SEO'
import { usePortfolioItems } from '@/hooks/usePortfolioItems'

/**
 * Portfolio page component
 * Displays all portfolio items with category filtering
 */
export function Portfolio() {
  const { data: portfolioItems = [], error, isLoading } = usePortfolioItems()

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
            <PortfolioAdminForm />
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading portfolio...</div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">
                <p>Could not load portfolio items.</p>
                <p className="mt-2 text-sm">{error.message || 'Check Supabase table policies.'}</p>
              </div>
            ) : (
              <PortfolioGrid items={portfolioItems} showFilters={true} />
            )}
          </div>
        </section>
      </main>
    </>
  )
}
