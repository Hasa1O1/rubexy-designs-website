import { Award, Target, Eye, Heart } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * About page component
 * Information about company background, vision, mission, and CSR
 */
export function About() {
  return (
    <>
      <SEO
        title="About Us | Rubexy Designs Limited"
        description="Learn about Rubexy Designs Limited - founded in 2012, incorporated in 2021. Providing quality brand, print, and media solutions with a commitment to excellence."
        keywords="about rubexy designs, zambian printing company, design company lusaka, corporate social responsibility"
      />

      <main>
        {/* Hero section */}
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-brand">About Rubexy Designs</h1>
              <p className="text-xl text-gray-600 font-brand">
                Over a decade of creativity, innovation, and excellence in brand, print, and media solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Company background */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Rubexy Designs Limited</strong> was established in 2012 as a PACRA business name
                  (registered 2013) and incorporated as a Private Company Limited by Shares on{' '}
                  <strong>December 15, 2021</strong>. From our humble beginnings, we have grown into
                  one of Zambia's trusted providers of comprehensive brand, print, and media solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Based in <strong>FINDECO House, Floor 12, Lusaka</strong>, we serve clients across
                  Zambia and beyond. Our commitment to quality, professionalism, and efficiency has
                  earned us the trust of leading organizations, government entities, and private businesses.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are fully compliant with Zambian regulations, holding current certifications from
                  PACRA, ZRA (Tax Clearance valid through December 2025), NAPSA (valid through June 2025),
                  and ZPPA supplier registration (valid through March 2026).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision and Mission */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="h-8 w-8 text-primary" aria-hidden="true" />
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To maintain long-term business relations by providing quality products and
                    services professionally. We envision being the partner of choice for businesses
                    seeking reliable, innovative, and comprehensive brand and media solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-8 w-8 text-primary" aria-hidden="true" />
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide solution-based products and services in an innovative, professional,
                    and efficient manner. We are committed to understanding our clients' unique needs
                    and delivering tailored solutions that exceed expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-center">What We Do</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Brand & Print</CardTitle>
                    <CardDescription>Comprehensive printing and branding solutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Books, magazines, posters, flyers</li>
                      <li>• Certificates, business cards, letterheads</li>
                      <li>• Corporate wear supply & branding</li>
                      <li>• Vehicle branding & signage</li>
                      <li>• Billboards, light boxes, pop-up banners</li>
                      <li>• Office branding & embroidery</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Media</CardTitle>
                    <CardDescription>Professional photography and video production</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Professional photography</li>
                      <li>• Documentary production</li>
                      <li>• Video advertisements</li>
                      <li>• Corporate videography</li>
                      <li>• Event coverage</li>
                      <li>• Product photography</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CSR */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-8 w-8 text-primary" aria-hidden="true" />
                    <CardTitle className="text-2xl">Corporate Social Responsibility</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    At Rubexy Designs, we believe in giving back to the community. We are proud to
                    serve as a <strong>media partner for Breakthrough Cancer Trust</strong>, providing
                    media services for cancer-awareness initiatives.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Through our partnership, we use our expertise in photography, videography, and
                    multimedia production to help raise awareness about cancer prevention, early
                    detection, and support for those affected. This is our way of using creativity
                    for a meaningful cause.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-muted-foreground text-sm">
                    We never compromise on quality. Every project receives our full attention and expertise.
                  </p>
                </div>
                <div>
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground text-sm">
                    We stay ahead of trends and technology to deliver cutting-edge solutions.
                  </p>
                </div>
                <div>
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Partnership</h3>
                  <p className="text-muted-foreground text-sm">
                    We build lasting relationships based on trust, transparency, and mutual success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

