import { LogoWall } from '@/components/LogoWall'
import { Testimonial } from '@/components/Testimonial'
import { SEO } from '@/components/SEO'

/**
 * Clients page component
 * Displays client logos and testimonials
 */
export function Clients() {
  const testimonials = [
    {
      quote: 'Rubexy Designs delivered exceptional quality on our fleet branding project. The attention to detail and professional service exceeded our expectations. Highly recommended for corporate branding needs.',
      author: 'John Mwape',
      role: 'Operations Manager',
      company: 'Logistics Company',
    },
    {
      quote: 'The team at Rubexy handled our annual report with utmost professionalism. From design to print, everything was flawless. We\'ve been working with them for three years now.',
      author: 'Sarah Phiri',
      role: 'Marketing Director',
      company: 'Financial Services',
    },
    {
      quote: 'Excellent photography and documentary production services. They captured our cancer awareness campaign beautifully and professionally. A reliable partner for our media needs.',
      author: 'Dr. Grace Banda',
      role: 'Executive Director',
      company: 'Breakthrough Cancer Trust',
    },
  ]

  return (
    <>
      <SEO
        title="Our Clients | Rubexy Designs Limited"
        description="Trusted by leading organizations in Zambia. Read testimonials from our satisfied clients and see why businesses choose Rubexy Designs for their branding and media needs."
        keywords="rubexy designs clients, client testimonials, trusted branding partner zambia"
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Clients</h1>
              <p className="text-xl text-muted-foreground">
                Trusted by leading organizations across Zambia
              </p>
            </div>
          </div>
        </section>

        {/* Logo wall */}
        <LogoWall />

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground">
                Don't just take our word for it—hear from our satisfied clients
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Testimonial key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Notable clients */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Notable Projects</h2>
              
              <div className="space-y-6">
                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="text-xl font-semibold mb-2">DHL Express</h3>
                  <p className="text-muted-foreground mb-4">
                    Completed comprehensive vehicle branding for DHL's fleet in Lusaka. 
                    Successfully delivered high-quality wraps and graphics that met international 
                    brand standards. Payment advice and credentials available upon request.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Services:</strong> Vehicle Branding, Corporate Graphics
                  </div>
                </div>

                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="text-xl font-semibold mb-2">Breakthrough Cancer Trust</h3>
                  <p className="text-muted-foreground mb-4">
                    Ongoing partnership providing media services for cancer awareness initiatives. 
                    Our work includes documentary production, photography, and awareness campaign materials.
                    Proud to support this important cause through our CSR commitment.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Services:</strong> Photography, Documentaries, Media Production
                  </div>
                </div>

                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="text-xl font-semibold mb-2">Government & Private Sector</h3>
                  <p className="text-muted-foreground mb-4">
                    With our ZPPA registration and full compliance certifications, we serve various 
                    government entities and private sector organizations across multiple categories 
                    including printing, media, and ICT services.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Services:</strong> Printing, Branding, Media, ICT Equipment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

