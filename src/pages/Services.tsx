import { 
  Printer, 
  Palette, 
  Shirt, 
  Car, 
  Camera, 
  Video,
  FileText,
  Award 
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ServiceCard } from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'

/**
 * Services page component
 * Displays all services split into Brand & Print and Media categories
 */
export function Services() {
  const brandPrintServices = [
    {
      icon: Printer,
      title: 'Printing Services',
      description: 'Professional printing for all your business needs',
      items: [
        'Books and magazines',
        'Posters and flyers',
        'Certificates and awards',
        'Business cards',
        'Letterheads and invoices',
        'Quotations and forms',
      ],
    },
    {
      icon: Palette,
      title: 'Branding & Signage',
      description: 'Create a lasting impression with professional branding',
      items: [
        'Logo design',
        'Corporate identity',
        'Sign posts and light boxes',
        'Billboards',
        'Pop-ups and banners',
        'Office branding',
      ],
    },
    {
      icon: Shirt,
      title: 'Corporate Wear',
      description: 'Professional uniforms and branded apparel',
      items: [
        'T-shirt printing',
        'Corporate wear supply',
        'Embroidery services',
        'Uniform design',
        'Branded merchandise',
        'Custom apparel',
      ],
    },
    {
      icon: Car,
      title: 'Vehicle Branding',
      description: 'Turn your fleet into mobile advertisements',
      items: [
        'Full vehicle wraps',
        'Partial vehicle graphics',
        'Fleet branding',
        'Magnetic signs',
        'Window decals',
        'Design and installation',
      ],
    },
  ]

  const mediaServices = [
    {
      icon: Camera,
      title: 'Photography',
      description: 'Professional photography for every occasion',
      items: [
        'Corporate headshots',
        'Event photography',
        'Product photography',
        'Architectural photography',
        'Team photos',
        'Marketing photography',
      ],
    },
    {
      icon: Video,
      title: 'Videography & Documentaries',
      description: 'Tell your story through compelling video',
      items: [
        'Documentary production',
        'Video advertisements',
        'Corporate videos',
        'Event coverage',
        'Training videos',
        'Promotional content',
      ],
    },
  ]

  return (
    <>
      <SEO
        title="Our Services | Rubexy Designs Limited"
        description="Comprehensive brand, print, and media services including printing, branding, corporate wear, vehicle branding, photography, and documentary production in Zambia."
        keywords="printing services zambia, branding services, corporate wear, vehicle wraps, photography lusaka, video production zambia"
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-50 to-orange-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="/RDL Logo Full Color.png" 
                  alt="RDL Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-brand">Our Services</h1>
              <p className="text-xl text-gray-600 font-brand">
                Comprehensive brand, print, and media solutions tailored to your business needs
              </p>
            </div>
          </div>
        </section>

        {/* Brand & Print Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
                <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">Brand & Print</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Brand & Print Solutions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From concept to completion, we deliver high-quality printing and branding services
                that help your business stand out.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {brandPrintServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Media Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
                <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">Media</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Media Production
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional photography and videography services to capture your brand's story
                and create compelling visual content.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {mediaServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary bg-primary/5 p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-muted-foreground mb-8">
                Can't find exactly what you're looking for? We specialize in custom solutions
                tailored to your specific needs. Let's discuss your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/rfq">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

