import { PortfolioGrid, PortfolioItem } from '@/components/PortfolioGrid'
import { SEO } from '@/components/SEO'

/**
 * Portfolio page component
 * Displays all portfolio items with category filtering
 */
export function Portfolio() {
  // Portfolio items (would be loaded from MDX files in production)
  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Corporate Identity Package',
      category: 'Branding',
      description: 'Complete brand identity including logo, business cards, and letterheads for a tech startup.',
      images: [
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
    {
      id: '2',
      title: 'Annual Report Design',
      category: 'Printing',
      description: 'Professional annual report design and printing for a financial institution with 120 pages.',
      images: [
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
    {
      id: '3',
      title: 'Fleet Vehicle Branding',
      category: 'Vehicle Branding',
      description: 'Complete vehicle wrap design and installation for a logistics company fleet of 15 vehicles.',
      images: [
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529429617124-aee818ac9e4b?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1487980351706-766134c54183?w=800&h=600&fit=crop&q=80',
      ],
      client: 'DHL',
      year: 2023,
    },
    {
      id: '4',
      title: 'Corporate Photography Session',
      category: 'Media/Photography',
      description: 'Professional corporate headshots and team photos for annual company profile.',
      images: [
        'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
    {
      id: '5',
      title: 'Billboard Campaign',
      category: 'Large Format',
      description: 'Large-format billboard design and installation for citywide awareness campaign.',
      images: [
        'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
    {
      id: '6',
      title: 'Branded Corporate Wear',
      category: 'Corporate Wear',
      description: 'Custom embroidered polo shirts and uniforms for 50+ hospitality staff members.',
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&h=600&fit=crop&q=80',
      ],
      year: 2023,
    },
    {
      id: '7',
      title: 'Magazine Publication',
      category: 'Printing',
      description: 'Quarterly lifestyle magazine design, layout, and printing. 64 pages, full color.',
      images: [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1423768164017-3f27c066407f?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
    {
      id: '8',
      title: 'Cancer Awareness Documentary',
      category: 'Media/Photography',
      description: 'Documentary production for Breakthrough Cancer Trust raising awareness about early detection.',
      images: [
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80',
      ],
      client: 'Breakthrough Cancer Trust',
      year: 2023,
    },
    {
      id: '9',
      title: 'Office Signage & Wayfinding',
      category: 'Branding',
      description: 'Complete office signage system including reception, directional signs, and room labels.',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1481721578171-6ef83c59056a?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
    {
      id: '10',
      title: 'Product Catalog Design',
      category: 'Printing',
      description: 'Full-color product catalog with 80 pages showcasing furniture collection.',
      images: [
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&h=600&fit=crop&q=80',
      ],
      year: 2023,
    },
    {
      id: '11',
      title: 'Promotional Banner Stand',
      category: 'Large Format',
      description: 'Retractable banner stands for trade show and conference use.',
      images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529429617124-aee818ac9e4b?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
    {
      id: '12',
      title: 'Corporate Video Production',
      category: 'Media/Photography',
      description: 'Company profile video showcasing operations, team, and values. 5-minute production.',
      images: [
        'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&h=600&fit=crop&q=80',
      ],
      year: 2024,
    },
  ]

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
            <PortfolioGrid items={portfolioItems} showFilters={true} />
          </div>
        </section>
      </main>
    </>
  )
}

