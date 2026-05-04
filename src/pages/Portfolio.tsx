import { PortfolioAdminForm } from '@/components/PortfolioAdminForm'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { SEO } from '@/components/SEO'
import { usePortfolioItems } from '@/hooks/usePortfolioItems'

const fallbackPortfolioItems = [
  {
    id: 'corporate-identity',
    title: 'Corporate Identity Package',
    category: 'Branding',
    description: 'Complete brand identity including logo, business cards, and letterheads for a tech startup.',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    year: 2024,
    client: 'TechStart Solutions',
  },
  {
    id: 'annual-report-design',
    title: 'Annual Report Design & Printing',
    category: 'Printing',
    description: 'Professional annual report design and printing for a financial institution with 120 pages.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    year: 2024,
    client: 'Confidential Financial Institution',
  },
  {
    id: 'vehicle-branding-dhl',
    title: 'Fleet Vehicle Branding',
    category: 'Vehicle Branding',
    description: 'Complete vehicle wrap design and installation for a logistics company fleet of 15 vehicles.',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop',
    year: 2023,
    client: 'DHL',
  },
  {
    id: 'cancer-awareness-documentary',
    title: 'Cancer Awareness Documentary',
    category: 'Media/Photography',
    description: 'Documentary production for Breakthrough Cancer Trust raising awareness about early detection.',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop',
    year: 2023,
    client: 'Breakthrough Cancer Trust',
  },
]

/**
 * Portfolio page component
 * Displays all portfolio items with category filtering
 */
export function Portfolio() {
  const { data: portfolioItems = [], error, isLoading } = usePortfolioItems()
  const visibleItems = portfolioItems.length > 0 ? portfolioItems : fallbackPortfolioItems

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
                Could not load portfolio items. Check Supabase table policies.
              </div>
            ) : (
              <PortfolioGrid items={visibleItems} showFilters={true} />
            )}
          </div>
        </section>
      </main>
    </>
  )
}
