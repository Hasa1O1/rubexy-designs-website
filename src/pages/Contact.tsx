import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

/**
 * Contact page component
 * Features contact form, office address, map, and contact information
 */
export function Contact() {
  return (
    <>
      <SEO
        title="Contact Us | Rubexy Designs Limited"
        description="Get in touch with Rubexy Designs Limited. Located in Lusaka, Zambia. Call us at +260 972 188566 or email rubexydesigns@gmail.com"
        keywords="contact rubexy designs, design company lusaka, zambia printing contact, get a quote"
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-50 to-orange-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="/logo.svg" 
                  alt="RDL Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-brand">Contact Us</h1>
              <p className="text-xl text-gray-600 font-brand">
                Let's discuss how we can help bring your vision to life
              </p>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
              {/* Contact form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>

              {/* Contact information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    Have a question or want to discuss a project? We'd love to hear from you. 
                    Fill out the form or reach us through any of the contact methods below.
                  </p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <CardTitle className="text-lg">Office Address</CardTitle>
                          <CardDescription className="mt-2">
                            FINDECO House<br />
                            Floor 12, Room 16/18<br />
                            Lusaka, Zambia
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <CardTitle className="text-lg">Phone</CardTitle>
                          <CardDescription className="mt-2 space-y-1">
                            <div>
                              <a 
                                href="tel:+260972188566" 
                                className="hover:text-primary transition-colors"
                              >
                                +260 972 188566
                              </a>
                            </div>
                            <div>
                              <a 
                                href="tel:+260955530293" 
                                className="hover:text-primary transition-colors"
                              >
                                +260 955 530293
                              </a>
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <CardTitle className="text-lg">Email</CardTitle>
                          <CardDescription className="mt-2">
                            <a 
                              href="mailto:rubexydesigns@gmail.com" 
                              className="hover:text-primary transition-colors"
                            >
                              rubexydesigns@gmail.com
                            </a>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <CardTitle className="text-lg">Business Hours</CardTitle>
                          <CardDescription className="mt-2">
                            Monday - Friday: 8:00 AM - 5:00 PM<br />
                            Saturday - Sunday: Closed
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
              <div className="aspect-video rounded-2xl overflow-hidden border bg-muted">
                {/* Google Maps embed - placeholder */}
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
                    <p className="text-muted-foreground">
                      FINDECO House, Floor 12<br />
                      Lusaka, Zambia
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Map integration available in production
                    </p>
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

