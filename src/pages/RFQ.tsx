import { FileText } from 'lucide-react'
import { RFQForm } from '@/components/RFQForm'
import { Card, CardContent } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

/**
 * Request for Quote (RFQ) page component
 * Detailed quote request form with file upload capability
 */
export function RFQ() {
  return (
    <>
      <SEO
        title="Request a Quote | Rubexy Designs Limited"
        description="Request a detailed quote for your printing, branding, or media project. Upload specifications and get a response within 24 hours."
        keywords="request quote zambia, printing quote, branding quote, get estimate rubexy designs"
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <FileText className="h-16 w-16 text-primary mx-auto mb-6" aria-hidden="true" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Request a Quote</h1>
              <p className="text-xl text-muted-foreground">
                Tell us about your project and we'll get back to you within 24 hours
              </p>
            </div>
          </div>
        </section>

        {/* RFQ Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Information card */}
              <Card className="mb-8 bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h2 className="text-lg font-semibold mb-4">What to Expect</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Quick Response:</strong> We'll review your request and respond 
                        within 24 business hours with a detailed quote.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Transparent Pricing:</strong> Our quotes include a complete breakdown 
                        of costs with no hidden fees.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Expert Consultation:</strong> Need help refining your requirements? 
                        We'll schedule a call to discuss your project in detail.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>File Upload:</strong> You can attach design files, specifications, 
                        or reference materials (max 10MB).
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Form */}
              <Card>
                <CardContent className="pt-6">
                  <RFQForm />
                </CardContent>
              </Card>

              {/* Help text */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>
                  Need immediate assistance?{' '}
                  <a href="tel:+260972188566" className="text-primary hover:underline">
                    Call us at +260 972 188566
                  </a>{' '}
                  or{' '}
                  <a href="mailto:rubexydesigns@gmail.com" className="text-primary hover:underline">
                    email rubexydesigns@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services reminder */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Services We Quote For</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Print & Publishing</h3>
                    <p className="text-sm text-muted-foreground">
                      Books, magazines, brochures, business cards, certificates, and more
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Branding & Signage</h3>
                    <p className="text-sm text-muted-foreground">
                      Vehicle branding, billboards, banners, office signage, and corporate identity
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Media Production</h3>
                    <p className="text-sm text-muted-foreground">
                      Photography, documentaries, corporate videos, and promotional content
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

