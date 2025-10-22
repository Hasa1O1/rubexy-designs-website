import { Link } from 'react-router-dom'
import { Hero } from '@/components/Hero'
import { ComplianceStrip } from '@/components/ComplianceStrip'
import { LogoWall } from '@/components/LogoWall'
import { PortfolioGrid, PortfolioItem } from '@/components/PortfolioGrid'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { SEO } from '@/components/SEO'

/**
 * Home page component
 * Features: Hero section, featured portfolio, compliance badges, CSR note, contact CTA
 */
export function Home() {
  // Featured portfolio items (would be loaded from MDX/CMS in production)
  const featuredPortfolio: PortfolioItem[] = [
    {
      id: '1',
      title: 'Corporate Identity Package',
      category: 'Branding',
      description: 'Complete brand identity including logo, business cards, and letterheads for a tech startup.',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
      year: 2024,
    },
    {
      id: '2',
      title: 'Annual Report Design',
      category: 'Printing',
      description: 'Professional annual report design and printing for a financial institution.',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
      year: 2024,
    },
    {
      id: '3',
      title: 'Fleet Vehicle Branding',
      category: 'Vehicle Branding',
      description: 'Complete vehicle wrap design and installation for a logistics company fleet.',
      imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop',
      client: 'DHL',
      year: 2023,
    },
    {
      id: '4',
      title: 'Corporate Photography',
      category: 'Media/Photography',
      description: 'Professional corporate headshots and team photos for annual company profile.',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&h=600&fit=crop',
      year: 2024,
    },
    {
      id: '5',
      title: 'Billboard Campaign',
      category: 'Large Format',
      description: 'Large-format billboard design and installation for citywide awareness campaign.',
      imageUrl: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&h=600&fit=crop',
      year: 2024,
    },
    {
      id: '6',
      title: 'Branded Corporate Wear',
      category: 'Corporate Wear',
      description: 'Custom embroidered polo shirts and uniforms for hospitality staff.',
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop',
      year: 2023,
    },
  ]

  return (
    <>
      <SEO
        title="Rubexy Designs Limited | Creativity Unlimited"
        description="Rubexy Designs Limited delivers high-quality brand, print, and media solutions for businesses in Zambia and beyond—from corporate wear and large-format signage to photography and documentaries."
        keywords="printing services zambia, branding lusaka, corporate wear zambia, vehicle branding, photography zambia, documentary production"
      />

      <main>
        {/* Hero section */}
        <Hero />

        {/* Featured portfolio */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
              <p className="text-muted-foreground mt-2">
                Explore some of our recent projects
              </p>
            </div>
            <PortfolioGrid items={featuredPortfolio} showFilters={false} />
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link to="/portfolio">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Compliance badges */}
        <ComplianceStrip />

        {/* Client logos */}
        <LogoWall />

        {/* CSR Section */}
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Heart className="h-12 w-12 text-orange-500 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800 font-brand">Corporate Social Responsibility</h2>
              <p className="text-gray-700 font-brand">
                Proud media partner in cancer-awareness initiatives supporting{' '}
                <strong>Breakthrough Cancer Trust</strong>. We believe in using our skills to make
                a positive impact in our community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-brand">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg mb-8 opacity-90 font-brand">
              Let's discuss how we can help bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100 font-brand">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-brand">
                <Link to="/rfq">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

